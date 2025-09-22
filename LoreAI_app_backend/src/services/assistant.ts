import OpenAI from 'openai';
import { retrieveRelevantChunks } from './retrieval';
import { supabase } from '../config/supabaseClient';

const client = new OpenAI({ 
   apiKey: process.env.OPENAI_API_KEY 
});

export interface AssistantResponse {
  answer: string;
  sources: Array<{
    document_id: string;
    document_title: string;
    similarity: number;
  }>;
}

export async function runAssistant(
  question: string, 
  workspaceId?: string
): Promise<AssistantResponse> {
  try {
    console.log(`🤖 Processing question: "${question}"`);

    // Generate embedding for the question
    const embed = await client.embeddings.create({
      model: 'text-embedding-3-small',
      input: question,
    });

    const embedding = embed.data[0].embedding;

    // Retrieve relevant chunks
    const chunks = await retrieveRelevantChunks(embedding, 5, workspaceId);
    console.log(`📚 Retrieved ${chunks.length} relevant chunks`);

    if (chunks.length === 0) {
      return {
        answer: "I couldn't find any relevant information in the knowledge base to answer your question. Please try rephrasing your question or check if the relevant documents have been uploaded.",
        sources: []
      };
    }

    // Get document titles for sources
    const documentIds = [...new Set(chunks.map(chunk => chunk.document_id))];
    const { data: documents } = await supabase
      .from('documents')
      .select('id, title')
      .in('id', documentIds);

    const documentMap = new Map(documents?.map(doc => [doc.id, doc.title]) || []);

    // Prepare context for LLM
    const context = chunks
      .map((chunk, index) => `[${index + 1}] ${chunk.content}`)
      .join('\n\n');

    // Generate response
    const completion = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `You are LoreAI, a helpful knowledge base assistant. Use the provided context to answer questions accurately and concisely. 

          Guidelines:
          - Base your answers primarily on the provided context
          - If the context doesn't contain enough information, say so clearly
          - Provide specific, actionable answers when possible
          - Reference the source material when relevant
          - Be conversational but professional`
        },
        {
          role: 'user',
          content: `Question: ${question}

Context from knowledge base:
${context}

Please provide a helpful answer based on the context above.`
        }
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    const answer = completion.choices[0].message.content || 'Sorry, I could not generate a response.';

    // Prepare sources
    const sources = chunks.map(chunk => ({
      document_id: chunk.document_id,
      document_title: documentMap.get(chunk.document_id) || 'Unknown Document',
      similarity: chunk.similarity,
    }));

    console.log(`✅ Generated response with ${sources.length} sources`);

    return {
      answer,
      sources,
    };
  } catch (error) {
    console.error('Error in runAssistant:', error);
    throw error;
  }
}