import Link from 'next/link'
import { UserX } from 'lucide-react'

export default function UserNotFound() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-4">
        <div className="mx-auto w-14 h-14 rounded-2xl bg-neutral-900 border border-neutral-800 flex items-center justify-center">
          <UserX className="w-6 h-6 text-neutral-500" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight">User not found</h1>
        <p className="text-sm text-neutral-500">
          This profile doesn&apos;t exist, or the link may be incorrect.
        </p>
        <Link
          href="/"
          className="inline-flex h-10 items-center justify-center rounded-xl bg-neutral-100 px-5 text-sm font-medium text-neutral-950 hover:bg-neutral-200 transition-all active:scale-95"
        >
          Go home
        </Link>
      </div>
    </div>
  )
}
