export interface Workspace {
  id: string;
  name: string;
  description?: string;
  created_at: string;
  updated_at: string;
}

export interface Document {
  id: string;
  workspace_id: string;
  title: string;
  content: string;
  author_id?: string;
  tags: string[];
  created_at: string;
  updated_at: string;
  workspaces?: {
    id: string;
    name: string;
  };
}

export interface DocumentChunk {
  id: string;
  document_id: string;
  content: string;
  embedding: number[];
  chunk_index: number;
  created_at: string;
}

export interface AIQueryRequest {
  question: string;
  workspace_id?: string;
}

export interface AIQueryResponse {
  answer: string;
  sources: Array<{
    document_id: string;
    document_title: string;
    similarity: number;
  }>;
  timestamp: string;
}