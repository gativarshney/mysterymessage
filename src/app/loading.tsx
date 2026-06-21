import { Loader2 } from 'lucide-react'

export default function Loading() {
  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
      <Loader2 className="w-6 h-6 text-neutral-500 animate-spin" />
    </div>
  )
}
