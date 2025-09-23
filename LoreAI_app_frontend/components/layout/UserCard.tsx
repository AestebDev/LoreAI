'use client'

import Link from 'next/link'
import Image from 'next/image'
import { UserCircleIcon, StarIcon, ClockIcon, DocumentIcon } from '@heroicons/react/24/outline'


interface UserCardProps {
  user: {
    name: string
    avatarUrl?: string
    email?: string
  }
}

export default function UserCard({ user }: UserCardProps) {
  
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden w-full">
      {/* Header with Avatar */}
      <div className="flex flex-col items-center p-6 border-b border-gray-200">
        {user.avatarUrl ? (
          <Image
            src={user.avatarUrl}
            alt={user.name}
            width={72}
            height={72}
            className="rounded-full"
          />
        ) : (
          <UserCircleIcon className="w-16 h-16 text-gray-400" />
        )}
        <h2 className="mt-3 text-lg font-semibold text-gray-900">{user.name}</h2>
        {user.email && <p className="text-sm text-gray-500">{user.email}</p>}
        <Link
          href="/spaces/personal"
          className="mt-3 text-sm font-medium text-primary-600 hover:text-primary-700"
        >
          Go to personal space
        </Link>
      </div>

      {/* Sidebar Navigation */}
      <nav className="p-2">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-50"
        >
          <DocumentIcon className="w-4 h-4 text-gray-400" />
          Overview
        </Link>
        <Link
          href="/recent"
          className="flex items-center gap-2 px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-50"
        >
          <ClockIcon className="w-4 h-4 text-gray-400" />
          Recent
        </Link>
        <Link
          href="/starred"
          className="flex items-center gap-2 px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-50"
        >
          <StarIcon className="w-4 h-4 text-gray-400" />
          Starred
        </Link>
        <Link
          href="/drafts"
          className="flex items-center gap-2 px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-50"
        >
          <DocumentIcon className="w-4 h-4 text-gray-400" />
          Drafts
        </Link>
      </nav>
    </div>
  )
}