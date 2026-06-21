type PageAuraProps = {
  variant?: 'violet' | 'mixed'
}

const PageAura = ({ variant = 'violet' }: PageAuraProps) => {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div
        className="absolute inset-0 opacity-100 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,#000_40%,transparent_90%)]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />
      <div className="absolute -top-32 left-1/2 h-80 w-[520px] -translate-x-1/2 rounded-full bg-violet-500/25 blur-[80px]" />
      {variant === 'mixed' && (
        <div className="absolute -top-16 left-[15%] h-72 w-72 rounded-full bg-pink-500/20 blur-[80px]" />
      )}
    </div>
  )
}

export default PageAura
