// components/UserCard.tsx
'use client'
import { useAuth } from '@/hooks/useAuth'

export default function UserCard() {
  const { user, loading, signOut } = useAuth()

  if (loading) {
    return (
      <div className="p-4 text-center">
        <div className="animate-pulse">Loading...</div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="p-4 text-center">
        <div>Please log in</div>
        <button 
          onClick={() => window.location.href = '/login'}
          className="text-blue-500 underline mt-2"
        >
          Go to Login
        </button>
      </div>
    )
  }

  const name = user.user_metadata?.name || user.email?.split('@')[0] || 'User'
  const email = user.email || 'No email'

  return (
    <div className="p-4">
      <div className="text-center">
        <div className="w-12 h-12 bg-blue-500 rounded-full mx-auto mb-2 flex items-center justify-center text-white font-bold">
          {name.charAt(0).toUpperCase()}
        </div>
        <h3 className="font-semibold">{name}</h3>
        <p className="text-sm text-gray-500">{email}</p>
        <button className="text-blue-500 text-sm mt-1 hover:underline">
          Go to personal space
        </button>
      </div>
    </div>
  )
}