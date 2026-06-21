export default function Loading() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8 animate-pulse">
        <div className="space-y-3">
          <div className="h-9 w-64 bg-neutral-800 rounded" />
          <div className="h-4 w-80 bg-neutral-800 rounded" />
        </div>

        <div className="space-y-3 bg-neutral-900/40 border border-neutral-800 p-6 rounded-2xl">
          <div className="h-4 w-48 bg-neutral-800 rounded" />
          <div className="h-11 w-full bg-neutral-800 rounded-xl" />
        </div>

        <div className="h-12 w-64 bg-neutral-900/20 border border-neutral-800/60 rounded-xl" />

        <div className="h-px w-full bg-neutral-800" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-28 bg-neutral-900/40 border border-neutral-800 rounded-2xl" />
          ))}
        </div>
      </div>
    </div>
  )
}
