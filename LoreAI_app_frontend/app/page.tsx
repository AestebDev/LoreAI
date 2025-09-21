import Link from 'next/link'
import { ArrowRightIcon } from '@heroicons/react/24/outline'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Welcome to <span className="text-primary-600">LoreAI</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Knowledge management reimagined with AI. Create, organize, and discover 
            your team's knowledge with the power of intelligent assistance.
          </p>

          <div className="flex gap-4 justify-center mb-12">
            <Link href="/dashboard" className="btn-primary inline-flex items-center gap-2">
              Get Started
              <ArrowRightIcon className="w-4 h-4" />
            </Link>
            <Link href="/auth/login" className="btn-secondary">
              Sign In
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="card text-center">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                📚
              </div>
              <h3 className="text-lg font-semibold mb-2">Organize Knowledge</h3>
              <p className="text-gray-600">Create spaces and documents to organize your team's knowledge efficiently.</p>
            </div>

            <div className="card text-center">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                🤖
              </div>
              <h3 className="text-lg font-semibold mb-2">AI Assistant</h3>
              <p className="text-gray-600">Get instant answers from your knowledge base with our intelligent AI assistant.</p>
            </div>

            <div className="card text-center">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                🚀
              </div>
              <h3 className="text-lg font-semibold mb-2">Quick Onboarding</h3>
              <p className="text-gray-600">Help new team members get up to speed with AI-powered guidance.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}