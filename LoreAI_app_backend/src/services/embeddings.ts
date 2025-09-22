import OpenAI from 'openai';
import { supabase } from '../config/supabaseClient';
import { chunkText } from '../utils/chunker';

const client = new OpenAI({ 
   apiKey: process.env.OPENAI_API_KEY 
});

export async function embedDocument(documentId: string, content: string) {
  try {
    console.log(`🔄 Generating embeddings for document ${documentId}`);

    // Delete existing chunks for this document
    await supabase
      .from('document_chunks')
      .delete()
      .eq('document_id', documentId);

    const chunks = chunkText(content);
    console.log(`📄 Created ${chunks.length} chunks`);

    for (let i = 0; i < chunks.length; i++) {
      const chunk = chunks[i];

      // Generate embedding
      const embeddingRes = await client.embeddings.create({
        model: 'text-embedding-3-small',
        input: chunk,
      });

      const embedding = embeddingRes.data[0].embedding;

      // Store chunk with embedding
      const { error } = await supabase
        .from('document_chunks')
        .insert({
          document_id: documentId,
          content: chunk,
          embedding,
          chunk_index: i,
        });

      if (error) {
        console.error(`Error storing chunk ${i}:`, error);
        throw error;
      }
    }

    console.log(`✅ Successfully embedded ${chunks.length} chunks for document ${documentId}`);
  } catch (error) {
    console.error('Error in embedDocument:', error);
    throw error;
  }
}