'use client'

import { useEffect } from 'react'

export default function GlobalError({
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
    <html lang="en">
      <body className="font-sans antialiased text-neutral-200 bg-neutral-950">
        <div className="min-h-screen flex items-center justify-center px-4">
          <div className="max-w-md w-full text-center space-y-4">
            <h1 className="text-2xl font-bold tracking-tight">Application error</h1>
            <p className="text-sm text-neutral-500">
              A critical error occurred. Please refresh the page.
            </p>
            <button
              onClick={reset}
              className="inline-flex h-10 items-center justify-center rounded-xl bg-neutral-100 px-5 text-sm font-medium text-neutral-950 hover:bg-neutral-200 transition-all active:scale-95"
            >
              Try again
            </button>
          </div>
        </div>
      </body>
    </html>
  )
}
