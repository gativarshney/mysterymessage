import { Loader2 } from 'lucide-react'

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-950">
      <Loader2 className="h-6 w-6 animate-spin text-violet-300" />
    </div>
  )
}
