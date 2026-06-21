export default function Loading() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto space-y-8 animate-pulse">
        <div className="space-y-3 text-center">
          <div className="h-4 w-40 bg-neutral-800 rounded mx-auto" />
          <div className="h-9 w-56 bg-neutral-800 rounded mx-auto" />
        </div>

        <div className="space-y-4 bg-neutral-900/40 border border-neutral-800 p-6 rounded-2xl">
          <div className="h-32 w-full bg-neutral-800 rounded-xl" />
          <div className="h-11 w-full bg-neutral-800 rounded-xl" />
        </div>

        <div className="h-px w-full bg-neutral-800" />

        <div className="space-y-3">
          <div className="h-4 w-32 bg-neutral-800 rounded" />
          <div className="h-12 w-full bg-neutral-800 rounded-xl" />
          <div className="h-12 w-full bg-neutral-800 rounded-xl" />
        </div>
      </div>
    </div>
  )
}
