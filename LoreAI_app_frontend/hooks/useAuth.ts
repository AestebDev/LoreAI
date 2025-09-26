'use client'
import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'

interface User {
  id: string
  email?: string
  [key: string]: any
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  // 🔹 Read backend URL from env instead of hardcoding
  const API_URL =
    process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001'

  // Fetch session from backend cookies
  const fetchSession = useCallback(async () => {
    try {
      setLoading(true)
      const res = await fetch(`${API_URL}/auth/session`, {
        credentials: 'include',
      })

      if (!res.ok) throw new Error('Session fetch failed')
      const data = await res.json()

      setUser(data.user ?? null)
      setError(null)
    } catch (err: any) {
      console.error('Session error:', err)
      setUser(null)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [API_URL])

  // Load session once
  useEffect(() => {
    fetchSession()
  }, [fetchSession])

  // Logout
  const signOut = async () => {
    try {
      await fetch(`${API_URL}/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      })
    } catch (err) {
      console.error('Logout error:', err)
    } finally {
      setUser(null)
      router.push('/login')
    }
  }

  return {
    user,
    loading,
    error,
    signOut,
    refetchSession: fetchSession, // handy if you need to manually refresh
  }
}