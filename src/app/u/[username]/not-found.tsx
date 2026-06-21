import Link from 'next/link'
import { UserX } from 'lucide-react'
import StatusShell from '@/components/ui/status-shell'

export default function UserNotFound() {
  return (
    <StatusShell
      icon={UserX}
      title="User not found"
      subtitle="This profile doesn't exist, or the link may be incorrect."
      action={
        <Link
          href="/"
          className="inline-flex h-10 items-center justify-center rounded-xl bg-neutral-100 px-5 text-sm font-medium text-neutral-950 transition-all hover:bg-neutral-200 active:scale-95"
        >
          Go home
        </Link>
      }
    />
  )
}
