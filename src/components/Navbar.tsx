'use client'
import React from 'react'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { Button } from '@/components/ui/button'

const Navbar = () => {
  const { data: session } = useSession()
  const user = session?.user

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-neutral-950/70 text-neutral-100 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2 font-heading text-lg font-bold tracking-tight transition-colors hover:text-violet-200">
          <span className="h-1.5 w-1.5 rounded-full bg-violet-400 shadow-[0_0_8px_theme(colors.violet.400)]" />
          mystery message
        </Link>

        {/* AUTHENTICATION CONTENT */}
        <div className="flex items-center gap-6">
          {session ? (
            <>
              <span className="hidden text-sm text-neutral-400 sm:inline">
                Welcome, <span className="font-medium text-neutral-200">{user?.username || user?.name || user?.email}</span>
              </span>

              <Button
                onClick={() => signOut({ callbackUrl: '/' })}
                variant="outline"
                className="h-9 rounded-xl border-white/10 bg-white/[0.03] px-4 text-sm text-neutral-200 transition-all hover:bg-white/[0.07]"
              >
                Logout
              </Button>
            </>
          ) : (
            <Link href="/sign-in">
              <Button className="h-9 rounded-xl bg-neutral-100 px-4 text-sm font-medium text-neutral-950 shadow-sm transition-all hover:bg-neutral-200">
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
