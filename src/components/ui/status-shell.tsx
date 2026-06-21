import PageAura from '@/components/ui/page-aura'
import type { LucideIcon } from 'lucide-react'

type StatusShellProps = {
  icon: LucideIcon
  title: string
  subtitle: string
  action: React.ReactNode
}

const StatusShell = ({ icon: Icon, title, subtitle, action }: StatusShellProps) => {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-neutral-950 px-4 text-neutral-100">
      <PageAura />
      <div className="relative z-10 w-full max-w-md space-y-4 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04]">
          <Icon className="h-6 w-6 text-violet-300" aria-hidden="true" />
        </div>
        <h1 className="font-heading text-2xl font-bold tracking-tight">{title}</h1>
        <p className="text-sm text-neutral-500">{subtitle}</p>
        {action}
      </div>
    </div>
  )
}

export default StatusShell
