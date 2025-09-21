# Product Requirements Document (PRD)

## 1. Overview

**Product Name (working title):** LoreAI

**Description:**
A lightweight, Confluence-like knowledge management web application enhanced with an AI assistant to help users navigate, search, and extract knowledge from team documents. The assistant will leverage Retrieval-Augmented Generation (RAG) supported by Supabase as the vector database, ensuring accurate and contextual answers.

This project is part of a portfolio showcase, demonstrating applied skills in AI, Next.js frontend, Supabase backend, and RAG architectures.

**Primary Users:**
- Startup teams
- Project teams in larger organizations
- New hires needing onboarding support

**Primary Value Proposition:**
- Centralized collaboration & documentation hub
- Instant Q&A and guidance powered by an AI assistant trained on the team's knowledge base

## 2. Goals and Non-Goals

### Goals
- Provide a minimal Confluence-like platform for team documentation.
- Integrate an AI assistant that:
  - Answers user questions in natural language.
  - Provides links to relevant documents/sections.
  - Supports onboarding tasks by surfacing the right docs.
- Implement a clean, modern UI using Next.js.
- Showcase RAG + Supabase architecture for knowledge retrieval.

### Non-Goals
- Full replication of Confluence feature set (spaces, macros, integrations, etc.).
- Enterprise-grade authentication/permissions beyond basic setup.
- Advanced AI fine-tuning (initial version will use available LLM APIs with RAG).

## 3. Core Features

### 3.1. Knowledge Management (Confluence-like Basics)
- **Spaces/Projects:** Logical grouping of documents.
- **Document Editing:**
  - WYSIWYG/Markdown editor for creating and editing docs.
  - Basic support for headings, lists, links, attachments.
- **Search:** Text-based search across documents.

### 3.2. AI Assistant (RAG-based)
- **Chat Interface:**
  - Embedded assistant (right-side panel or bottom-right floating chat).
  - Users can ask natural language questions.
- **Contextual RAG:**
  - Retrieve chunks of information from Supabase vector store.
  - Provide summarized answers with references/links to source documents.
- **Onboarding Helper:**
  - Pre-configured prompts like: "I'm new—where should I start?"
  - Step-by-step guidance by linking docs like onboarding guides, policies, workflows.
- **Conversational memory (optional v2):** Keep context during a session.

### 3.3. User Management
- Basic authentication (login/signup).
- Team/workspace creation.
- Role-based permissions (Admin, Member).

## 4. Technical Architecture

### 4.1. Frontend
- **Framework:** Next.js (React-based, server-side rendering + static generation).
- **Styling:** TailwindCSS or Chakra UI (for developer speed & modern UI).
- **AI Assistant UI Options:**
  - Option 1: Build custom chat UI (lightweight, portfolio-friendly).
  - Option 2: Integrate Vercel AI SDK (copilot-style experience) with React components for minimal effort.

### 4.2. Backend
- **Data Storage:** Supabase (Postgres + vector embeddings).
  - Store raw documents, metadata (workspace, author, tags).
  - Store embeddings using Supabase vector extension.
- **RAG Enhancements:**
  - Pipeline:
    - Document chunking (split into ~500-token chunks).
    - Embedding generation (via OpenAI embeddings or similar).
    - Store embeddings in Supabase.
    - At query-time → retrieve top-k chunks → feed into LLM prompt.

### 4.3. AI Layer
- **LLM API Provider:** OpenAI / Anthropic (flexible configuration).
- **RAG Workflow:**
  - User enters query → system queries Supabase vector DB → relevant chunks retrieved → system builds augmented prompt → LLM generates response with references.

### 4.4. Hosting
- **Frontend/Backend:** Vercel (perfect for Next.js portfolio project).
- **Supabase:** Hosted Supabase cloud.

## 5. User Experience (UX)

- **Landing/dashboard:** Recent documents, AI assistant prompt ready.
- **Document view:** Right-hand sidebar / docked AI assistant.
- **Onboarding mode:** Welcome dialog with suggestions like "Ask me about company policies".
- **AI interaction:**
  - Clear distinction between AI answer vs. document sources.
  - Ability to click linked sources to open original docs.

## 6. Future Enhancements (v2, optional)

- AI-generated document summaries.
- AI-suggested tags & categorization.
- Multi-modal support (image embeddings, voice input).
- Collaborative editing (like Google Docs).

## 7. Success Metrics

- **Demo-readiness:** Can be deployed and showcased on personal landing page.
- **AI Quality:** Assistant correctly retrieves + answers ≥70% of test onboarding-style queries.
- **Portfolio Value:** Clear demonstration of Next.js + Supabase + RAG implementation.

✅ This version is lightweight enough to build quickly but still highlights cutting-edge AI integration with RAG, while also resembling Confluence enough for people to intuitively understand.