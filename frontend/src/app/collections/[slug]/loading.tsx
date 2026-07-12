export default function CollectionDetailLoading() {
  return (
    <main className="mx-auto max-w-container px-6 py-10">
      <div className="h-4 w-28 animate-pulse rounded-md bg-surface-raised" />
      <div className="mt-8 border-b border-border pb-8">
        <div className="h-8 w-2/3 max-w-md animate-pulse rounded-md bg-surface-raised" />
        <div className="mt-3 h-4 w-full max-w-lg animate-pulse rounded-md bg-surface-raised" />
      </div>
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-40 animate-pulse rounded-lg border border-border bg-surface" />
        ))}
      </div>
    </main>
  );
}
