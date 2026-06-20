'use client'
import React from 'react'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { Button } from '@/components/ui/button'

const Navbar = () => {
  const { data: session } = useSession()
  const user = session?.user

  return (
    <nav className="w-full border-b border-neutral-800 bg-neutral-950/80 backdrop-blur-md text-neutral-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* LOGO */}
        <Link href="/" className="text-xl font-bold tracking-tight hover:text-neutral-300 transition-colors">
          mystery message
        </Link>

        {/* AUTHENTICATION CONTENT */}
        <div className="flex items-center gap-6">
          {session ? (
            <>
              <span className="text-sm text-neutral-400 hidden sm:inline">
                Welcome, <span className="text-neutral-200 font-medium">{user?.name || user?.email}</span>
              </span>
              
              <Button 
                onClick={() => signOut({ callbackUrl: '/' })}
                variant="outline"
                className="border-neutral-800 hover:bg-neutral-900 text-neutral-200 text-sm h-9 px-4 rounded-xl transition-all"
              >
                Logout
              </Button>
            </>
          ) : (
            <Link href="/sign-in">
              <Button className="bg-neutral-100 text-neutral-950 hover:bg-neutral-200 text-sm h-9 px-4 rounded-xl font-medium transition-all shadow-sm">
                Login
              </Button>
            </Link>
          )}
        </div>

      </div>
    </nav>
  )
}

export default Navbar