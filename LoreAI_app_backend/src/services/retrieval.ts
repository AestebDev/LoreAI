import { supabase } from '../config/supabaseClient';

export interface RetrievedChunk {
  id: string;
  document_id: string;
  content: string;
  similarity: number;
}

export async function retrieveRelevantChunks(
  queryEmbedding: number[], 
  topK = 5,
  workspaceId?: string
): Promise<RetrievedChunk[]> {
  try {
    const { data, error } = await supabase.rpc('match_documents', {
      query_embedding: queryEmbedding,
      match_count: topK,
      workspace_filter: workspaceId || null,
    });

    if (error) {
      console.error('Error in retrieveRelevantChunks:', error);
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('Error retrieving chunks:', error);
    throw error;
  }
}