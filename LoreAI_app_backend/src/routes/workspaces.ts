import { Router } from 'express';
import { supabase } from '../config/supabaseClient';

const router = Router();

// Get all workspaces
router.get('/', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('workspaces')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Create workspace
router.post('/', async (req, res) => {
  try {
    const { name, description } = req.body;

    const { data, error } = await supabase
      .from('workspaces')
      .insert([{ name, description }])
      .select()
      .single();

    if (error) throw error;
    res.status(201).json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;