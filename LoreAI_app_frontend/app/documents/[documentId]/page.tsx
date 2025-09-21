'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeftIcon, PencilIcon } from '@heroicons/react/24/outline'

export default function DocumentPage() {
  const params = useParams()
  const documentId = params.documentId

  // Mock data - will be replaced with real data from Supabase
  const document = {
    id: documentId,
    title: 'API Documentation',
    content: `# API Documentation

## Overview
This document provides comprehensive information about our REST API endpoints.

## Authentication
All API requests require authentication using Bearer tokens.

\`\`\`bash
curl -H "Authorization: Bearer YOUR_TOKEN" https://api.example.com/v1/users
\`\`\`

## Endpoints

### Users
- \`GET /api/v1/users\` - List all users
- \`POST /api/v1/users\` - Create a new user
- \`GET /api/v1/users/:id\` - Get user by ID

### Projects
- \`GET /api/v1/projects\` - List all projects
- \`POST /api/v1/projects\` - Create a new project

## Error Handling
The API returns standard HTTP status codes and JSON error responses.`,
    space: 'Engineering',
    author: 'John Doe',
    updatedAt: '2 hours ago'
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-4">
              <Link href="/dashboard" className="text-gray-500 hover:text-gray-700">
                <ArrowLeftIcon className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{document.title}</h1>
                <p className="text-sm text-gray-600">
                  {document.space} • Updated {document.updatedAt} by {document.author}
                </p>
              </div>
            </div>
            <button className="btn-primary inline-flex items-center gap-2">
              <PencilIcon className="w-4 h-4" />
              Edit
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="card">
          <div className="prose max-w-none">
            <pre className="whitespace-pre-wrap font-sans text-gray-900 leading-relaxed">
              {document.content}
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
}