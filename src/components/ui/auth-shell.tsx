import PageAura from '@/components/ui/page-aura'
import MonoBadge from '@/components/ui/mono-badge'

type AuthShellProps = {
  badge: string
  title: string
  subtitle: string
  children: React.ReactNode
  footer?: React.ReactNode
}

const AuthShell = ({ badge, title, subtitle, children, footer }: AuthShellProps) => {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-neutral-950 px-4 text-neutral-100">
      <PageAura />

      <div className="relative z-10 w-full max-w-md space-y-7 rounded-2xl border border-white/10 bg-white/[0.03] p-8 shadow-xl backdrop-blur-md">
        <div className="space-y-3 text-center">
          <div className="flex justify-center">
            <MonoBadge>{badge}</MonoBadge>
          </div>
          <h1 className="font-heading text-3xl font-bold tracking-tight">{title}</h1>
          <p className="text-sm text-neutral-400">{subtitle}</p>
        </div>

        {children}

        {footer && <div className="text-center text-sm text-neutral-400">{footer}</div>}
      </div>
    </div>
  )
}

export default AuthShell
