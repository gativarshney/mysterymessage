'use client'

import { useEffect } from 'react'
import { TriangleAlert } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function RootError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-4">
        <div className="mx-auto w-14 h-14 rounded-2xl bg-neutral-900 border border-neutral-800 flex items-center justify-center">
          <TriangleAlert className="w-6 h-6 text-neutral-500" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight">Something went wrong</h1>
        <p className="text-sm text-neutral-500">
          An unexpected error occurred. Please try again.
        </p>
        <Button
          onClick={reset}
          className="bg-neutral-100 text-neutral-950 hover:bg-neutral-200 h-10 px-5 rounded-xl font-medium transition-all active:scale-95"
        >
          Try again
        </Button>
      </div>
    </div>
  )
}
