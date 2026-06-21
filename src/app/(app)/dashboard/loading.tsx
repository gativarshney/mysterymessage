export default function Loading() {
  return (
    <div className="min-h-screen bg-neutral-950 px-4 py-12 text-neutral-100 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl animate-pulse space-y-8">
        <div className="space-y-3">
          <div className="h-9 w-64 rounded bg-white/[0.06]" />
          <div className="h-4 w-80 rounded bg-white/[0.06]" />
        </div>

        <div className="space-y-3 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <div className="h-4 w-48 rounded bg-white/[0.06]" />
          <div className="h-11 w-full rounded-xl bg-white/[0.06]" />
        </div>

        <div className="h-12 w-64 rounded-xl border border-white/[0.08] bg-white/[0.02]" />

        <div className="h-px w-full bg-white/10" />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-28 rounded-2xl border border-white/10 bg-white/[0.03]" />
          ))}
        </div>
      </div>
    </div>
  )
}
