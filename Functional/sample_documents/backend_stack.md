# Backend Stack Overview (LoreAI)

## Database
- **Supabase (Postgres)** → stores docs, users, teams.
- Vector extension → embedding storage.

## RAG Pipeline
1. Document chunking (~500 tokens).  
2. Embedding generation (OpenAI embeddings).  
3. Store embeddings in Supabase.  
4. At query time → retrieve top-k → feed into LLM.

## APIs
- REST endpoints via **Supabase functions**.  
- Authentication managed with Supabase Auth.

## LLM Layer
- Configurable (OpenAI / Anthropic).  
- Augmented prompt → retrieved docs → **LLM generates response**.  

## Hosting
- **Supabase Cloud** backend.