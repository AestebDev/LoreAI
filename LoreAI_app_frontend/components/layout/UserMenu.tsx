"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from '@/hooks/useAuth';

export default function UserMenu() {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null)
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { user, loading } = useAuth();
  const API_URL = process.env.NEXT_PUBLIC_API_URL 


  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

 const handleLogOut = async () => {
    setError(null)

    try {
      const res = await fetch(`${API_URL}/auth/logout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Logout failed')

      console.log("User logged out!")

      // ✅ Redirect to logIn only when user logged out
   
    } catch (err: any) {
      setError(err.message)
    } finally {
      router.refresh()
      router.push("/login")
      setOpen(false)
    }
  }

  // Show loading state
  if (loading) {
    return (
      <div className="w-9 h-9 rounded-full bg-gray-200 animate-pulse"></div>
    );
  }

  // Don't render if no user
  if (!user) {
    return null;
  }

  // Get user info with same fallback logic as UserCard
  const name = user.user_metadata?.name || 
               user.user_metadata?.full_name || 
               user.email?.split('@')[0] || 
               'User';
  const email = user.email || 'No email';
  const initials = name.split(' ').map((n: string) => n.charAt(0)).join('').toUpperCase().slice(0, 2);

  return (
    <div className="relative" ref={menuRef}>
      {/* Avatar Button */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="w-9 h-9 rounded-full bg-blue-500 flex items-center justify-center font-semibold text-white hover:bg-blue-600 transition-colors"
        title={name}
      >
        {initials}
      </button>

      {/* Dropdown Menu */}
      {open && (
        <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-md shadow-lg py-2 z-50">
          {/* User Info Section */}
          <div className="px-4 py-3 border-b border-gray-100">
            <div className="text-sm font-medium text-gray-900">{name}</div>
            <div className="text-xs text-gray-500 truncate">{email}</div>
          </div>

          {/* Menu Items */}
          <button
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
            onClick={() => {
              router.push("/profile");
              setOpen(false);
            }}
          >
            Profile
          </button>
          <button
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
            onClick={() => {
              router.push("/settings");
              setOpen(false);
            }}
          >
            Settings
          </button>
          
          {/* Divider */}
          <div className="border-t border-gray-100 my-1"></div>
          
          <button
            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
            onClick={handleLogOut}
          >
            Log Out
          </button>
        </div>
      )}
    </div>
  );
}