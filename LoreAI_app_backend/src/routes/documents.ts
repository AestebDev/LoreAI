import { Router } from 'express';
import { supabase } from '../config/supabaseClient';
import { embedDocument } from '../services/embeddings';

const router = Router();

// Get all documents
router.get('/', async (req, res) => {
  try {
    const { workspace_id } = req.query;

    let query = supabase
      .from('documents')
      .select(`
        *,
        workspaces (
          id,
          name
        )
      `)
      .order('created_at', { ascending: false });

    if (workspace_id) {
      query = query.eq('workspace_id', workspace_id);
    }

    const { data, error } = await query;
    if (error) throw error;

    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get single document
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from('documents')
      .select(`
        *,
        workspaces (
          id,
          name
        )
      `)
      .eq('id', id)
      .single();

    if (error) throw error;
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Create new document
router.post('/', async (req, res) => {
  try {
    const { title, content, workspace_id, tags } = req.body;

    // Get default workspace if none provided
    let finalWorkspaceId = workspace_id;
    if (!finalWorkspaceId) {
      const { data: defaultWorkspace } = await supabase
        .from('workspaces')
        .select('id')
        .eq('name', 'Default Workspace')
        .single();
      finalWorkspaceId = defaultWorkspace?.id;
    }

    const { data, error } = await supabase
      .from('documents')
      .insert([{ 
        title, 
        content, 
        workspace_id: finalWorkspaceId,
        tags: tags || []
      }])
      .select()
      .single();

    if (error) throw error;

    // Generate embeddings in background
    embedDocument(data.id, content).catch(console.error);

    res.status(201).json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Update document
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, tags, workspace_id } = req.body;

    const { data, error } = await supabase
      .from('documents')
      .update({ title, content, tags, workspace_id })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    // Re-generate embeddings if content changed
    if (content) {
      // Delete old chunks
      await supabase.from('document_chunks').delete().eq('document_id', id);
      // Generate new embeddings
      embedDocument(id, content).catch(console.error);
    }

    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Delete document
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from('documents')
      .delete()
      .eq('id', id);

    if (error) throw error;
    res.status(204).send();
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;