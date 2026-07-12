export default function CollectionsLoading() {
  return (
    <main className="mx-auto max-w-container px-6 py-10">
      <div className="mb-8">
        <div className="h-8 w-40 animate-pulse rounded-md bg-surface-raised" />
        <div className="mt-2 h-4 w-56 animate-pulse rounded-md bg-surface-raised" />
      </div>
      <div className="mb-8 h-40 animate-pulse rounded-lg border border-border bg-surface" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-48 animate-pulse rounded-lg border border-border bg-surface" />
        ))}
      </div>
    </main>
  );
}
