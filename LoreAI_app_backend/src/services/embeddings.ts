import OpenAI from "openai";
import { supabase } from "../config/supabaseClient";
import { chunkText } from "../utils/chunker";

let client: OpenAI | null = null;

// Only initialize if a valid API key is provided
if (
  process.env.OPENAI_API_KEY &&
  !process.env.OPENAI_API_KEY.includes("your_openai_api_key_here")
) {
  client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
} else {
  console.log("⚠️ OpenAI API key missing or placeholder – skipping initialization");
}

export async function embedDocument(documentId: string, content: string) {
  if (!client) {
    console.warn(
      "⚠️ embedDocument called but OpenAI client is not configured. Skipping embedding."
    );
    return; // gracefully skip instead of throwing errors
  }

  try {
    console.log(`🔄 Generating embeddings for document ${documentId}`);

    // Fetch workspace_id from parent document
    const { data: docMeta, error: docError } = await supabase
      .from("documents")
      .select("workspace_id")
      .eq("id", documentId)
      .single();

    if (docError) {
      console.error("⚠️ Could not fetch workspace_id for document:", docError);
      throw docError;
    }

    const workspaceId = docMeta?.workspace_id || null;

    // Delete existing chunks for this document
    await supabase.from("document_chunks").delete().eq("document_id", documentId);

    const chunks = chunkText(content);
    console.log(`📄 Created ${chunks.length} chunks`);

    for (let i = 0; i < chunks.length; i++) {
      const chunk = chunks[i];

      // Generate embedding
      const embeddingRes = await client.embeddings.create({
        model: "text-embedding-3-small",
        input: chunk,
      });

      const embedding = embeddingRes.data[0].embedding;

      // Store chunk with embedding, including workspace_id
      const { error } = await supabase.from("document_chunks").insert({
        document_id: documentId,
        workspace_id: workspaceId,
        content: chunk,
        embedding,
        chunk_index: i,
      });

      if (error) {
        console.error(`❌ Error storing chunk ${i}:`, error);
        throw error;
      }
    }

    console.log(
      `✅ Successfully embedded ${chunks.length} chunks for document ${documentId} (workspace_id: ${workspaceId})`
    );
  } catch (error) {
    console.error("❌ Error in embedDocument:", error);
    throw error;
  }
}