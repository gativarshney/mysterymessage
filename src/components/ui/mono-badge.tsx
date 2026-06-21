import { cn } from '@/lib/utils'

type MonoBadgeProps = {
  children: React.ReactNode
  className?: string
  dotClassName?: string
}

const MonoBadge = ({ children, className, dotClassName }: MonoBadgeProps) => (
  <div
    className={cn(
      'inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-3.5 py-1.5',
      className
    )}
  >
    <span
      className={cn(
        'h-1.5 w-1.5 rounded-full bg-violet-400 shadow-[0_0_8px_theme(colors.violet.400)]',
        dotClassName
      )}
    />
    <span className="font-mono text-[11px] tracking-wide text-violet-200">{children}</span>
  </div>
)

export default MonoBadge
