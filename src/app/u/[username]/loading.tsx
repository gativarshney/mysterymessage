export default function Loading() {
  return (
    <div className="min-h-screen bg-neutral-950 px-4 py-12 text-neutral-100 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl animate-pulse space-y-8">
        <div className="space-y-3 text-center">
          <div className="mx-auto h-4 w-40 rounded bg-white/[0.06]" />
          <div className="mx-auto h-9 w-56 rounded bg-white/[0.06]" />
        </div>

        <div className="space-y-4 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <div className="h-32 w-full rounded-xl bg-white/[0.06]" />
          <div className="h-11 w-full rounded-xl bg-white/[0.06]" />
        </div>

        <div className="h-px w-full bg-white/10" />

        <div className="space-y-3">
          <div className="h-4 w-32 rounded bg-white/[0.06]" />
          <div className="h-12 w-full rounded-xl bg-white/[0.06]" />
          <div className="h-12 w-full rounded-xl bg-white/[0.06]" />
        </div>
      </div>
    </div>
  )
}
