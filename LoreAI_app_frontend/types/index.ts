// Core types for LoreAI

export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  role: 'admin' | 'member'
  createdAt: string
  updatedAt: string
}

export interface Space {
  id: string
  name: string
  description: string
  slug: string
  documentCount: number
  createdBy: string
  createdAt: string
  updatedAt: string
}

export interface Document {
  id: string
  title: string
  content: string
  spaceId: string
  authorId: string
  tags: string[]
  isPublished: boolean
  createdAt: string
  updatedAt: string
}

export interface ChatMessage {
  id: string
  content: string
  role: 'user' | 'assistant'
  timestamp: string
  sources?: DocumentReference[]
}

export interface DocumentReference {
  documentId: string
  title: string
  excerpt: string
  relevanceScore: number
}

export interface AIResponse {
  content: string
  sources: DocumentReference[]
  confidence: number
}