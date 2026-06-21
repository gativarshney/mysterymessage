import Link from 'next/link'
import { Compass } from 'lucide-react'
import StatusShell from '@/components/ui/status-shell'

export default function NotFound() {
  return (
    <StatusShell
      icon={Compass}
      title="Page not found"
      subtitle="The page you're looking for doesn't exist or has moved."
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
