import Link from 'next/link'
import { PlusIcon, DocumentTextIcon, FolderIcon } from '@heroicons/react/24/outline'
import UserCard from '@/components/layout/UserCard' // ✅ import our new component
import UserMenu from '@/components/layout/UserMenu';

// inside Navbar component JSX:


export default function DashboardPage() {
  const mockUser = {
    name: 'Jane Doe',
    email: 'jane.doe@loreai.app',
    avatarUrl: '/avatar.png', // replace later with Supabase user profile
  }

  const recentDocuments = [
    { id: '1', title: 'Getting Started Guide', space: 'Onboarding', updatedAt: '2 hours ago' },
    { id: '2', title: 'API Documentation', space: 'Engineering', updatedAt: '1 day ago' },
    { id: '3', title: 'Company Policies', space: 'HR', updatedAt: '3 days ago' },
  ]

  const spaces = [
    { id: '1', name: 'Onboarding', documentCount: 12 },
    { id: '2', name: 'Engineering', documentCount: 24 },
    { id: '3', name: 'HR', documentCount: 8 },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
         
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">LoreAI</h1>
            <div className="flex items-center gap-4">
              <button className="btn-primary inline-flex items-center gap-2">
                <PlusIcon className="w-4 h-4" />
                Create
              </button>
              <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-white font-medium">
                <UserMenu userEmail="jane.doe@loreai.app" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Layout - 4-column grid: UserCard | Main | Right Sidebar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Left Sidebar (User info card) */}
          <aside className="lg:col-span-1 space-y-6">
            <UserCard user={mockUser} />
          </aside>

          {/* Main Content (center) */}
          <main className="lg:col-span-2 space-y-8">
            {/* Welcome Section */}
            <div className="card">
              <h2 className="text-xl font-semibold mb-4">Welcome back!</h2>
              <p className="text-gray-600 mb-4">
                Ready to explore your knowledge base? Ask the AI assistant anything or browse your recent documents.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-800 text-sm">
                  💡 <strong>Tip:</strong> Try asking "I'm new here, where should I start?" to get personalized guidance.
                </p>
              </div>
            </div>

            {/* Recent Documents */}
            <div className="card">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Recent Documents</h2>
                <Link href="/documents" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                  View all
                </Link>
              </div>
              <div className="space-y-3">
                {recentDocuments.map((doc) => (
                  <Link
                    key={doc.id}
                    href={`/documents/${doc.id}`}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <DocumentTextIcon className="w-5 h-5 text-gray-400" />
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{doc.title}</h3>
                      <p className="text-sm text-gray-500">{doc.space} • {doc.updatedAt}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </main>

          {/* Right Sidebar (Spaces + AI Assistant) */}
          <aside className="lg:col-span-1 space-y-6">
            {/* Spaces */}
            <div className="card">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold">Spaces</h3>
                <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                  + New Space
                </button>
              </div>
              <div className="space-y-2">
                {spaces.map((space) => (
                  <Link
                    key={space.id}
                    href={`/spaces/${space.id}`}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <FolderIcon className="w-4 h-4 text-gray-400" />
                    <div className="flex-1">
                      <p className="font-medium text-sm">{space.name}</p>
                      <p className="text-xs text-gray-500">{space.documentCount} docs</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* AI Assistant Placeholder */}
            <div className="card">
              <h3 className="font-semibold mb-3">AI Assistant</h3>
              <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <div className="text-2xl mb-2">🤖</div>
                <p className="text-sm text-gray-600 mb-3">
                  AI chat interface will be implemented here
                </p>
                <button className="btn-secondary text-xs">
                  Coming Soon
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}