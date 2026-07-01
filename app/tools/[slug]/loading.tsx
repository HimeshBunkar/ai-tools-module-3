function Block({ className }: { className?: string }) {
  return <div className={`animate-pulse rounded-md bg-surface-raised ${className ?? ""}`} />;
}

export default function ToolDetailLoading() {
  return (
    <main className="mx-auto max-w-container px-6 py-10" aria-busy="true" aria-label="Loading tool details">
      <Block className="mb-6 h-4 w-40" />

      <div className="flex flex-col gap-6 rounded-lg border border-border bg-surface p-6 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-4">
          <Block className="h-16 w-16 rounded-lg" />
          <div className="flex flex-col gap-2">
            <Block className="h-6 w-40" />
            <Block className="h-4 w-24" />
            <Block className="h-6 w-56" />
          </div>
        </div>
        <div className="flex gap-2">
          <Block className="h-9 w-20" />
          <Block className="h-9 w-32" />
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-8 lg:flex-row">
        <div className="flex-1 space-y-8">
          <Block className="h-24 w-full" />
          <Block className="h-32 w-full" />
          <Block className="h-40 w-full" />
        </div>
        <div className="w-full shrink-0 lg:w-80">
          <Block className="h-64 w-full" />
        </div>
      </div>
    </main>
  );
}