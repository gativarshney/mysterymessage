'use client'

import { useEffect } from 'react'
import { TriangleAlert } from 'lucide-react'
import { Button } from '@/components/ui/button'
import StatusShell from '@/components/ui/status-shell'

export default function ProfileError({
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
    <StatusShell
      icon={TriangleAlert}
      title="Something went wrong"
      subtitle="We couldn't load this profile. Please try again."
      action={
        <Button
          onClick={reset}
          className="h-10 rounded-xl bg-neutral-100 px-5 font-medium text-neutral-950 transition-all hover:bg-neutral-200 active:scale-95"
        >
          Try again
        </Button>
      }
    />
  )
}
