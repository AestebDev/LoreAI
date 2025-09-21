'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeftIcon, DocumentTextIcon, PlusIcon } from '@heroicons/react/24/outline'

export default function SpacePage() {
  const params = useParams()
  const spaceId = params.spaceId

  // Mock data - will be replaced with real data from Supabase
  const space = {
    id: spaceId,
    name: 'Engineering',
    description: 'Technical documentation and guides',
    documentCount: 24
  }

  const documents = [
    { id: '1', title: 'API Documentation', updatedAt: '2 hours ago', author: 'John Doe' },
    { id: '2', title: 'Database Schema', updatedAt: '1 day ago', author: 'Jane Smith' },
    { id: '3', title: 'Deployment Guide', updatedAt: '3 days ago', author: 'Bob Wilson' },
  ]

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
                <h1 className="text-2xl font-bold text-gray-900">{space.name}</h1>
                <p className="text-sm text-gray-600">{space.description}</p>
              </div>
            </div>
            <button className="btn-primary inline-flex items-center gap-2">
              <PlusIcon className="w-4 h-4" />
              New Document
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="card">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Documents ({space.documentCount})</h2>
          </div>

          <div className="space-y-3">
            {documents.map((doc) => (
              <Link
                key={doc.id}
                href={`/documents/${doc.id}`}
                className="flex items-center gap-3 p-4 rounded-lg hover:bg-gray-50 transition-colors border border-gray-200"
              >
                <DocumentTextIcon className="w-5 h-5 text-gray-400" />
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{doc.title}</h3>
                  <p className="text-sm text-gray-500">Updated {doc.updatedAt} by {doc.author}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}