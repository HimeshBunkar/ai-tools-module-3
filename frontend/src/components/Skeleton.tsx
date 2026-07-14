function SkeletonBlock({ className }: { className?: string }) {
  return <div className={`animate-pulse rounded-md bg-surface-raised ${className ?? ""}`} />;
}

export function ToolCardSkeleton() {
  return (
    <div className="flex flex-col gap-3 rounded-lg border border-border bg-surface p-4">
      <div className="flex items-center gap-3">
        <SkeletonBlock className="h-10 w-10 rounded-md" />
        <div className="flex flex-col gap-1.5">
          <SkeletonBlock className="h-4 w-24" />
          <SkeletonBlock className="h-3 w-16" />
        </div>
      </div>
      <SkeletonBlock className="h-3 w-full" />
      <SkeletonBlock className="h-3 w-2/3" />
      <div className="flex gap-2">
        <SkeletonBlock className="h-6 w-16 rounded-full" />
        <SkeletonBlock className="h-6 w-14 rounded-md" />
      </div>
    </div>
  );
}

export function ToolGridSkeleton() {
  return (
    <div
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      aria-busy="true"
      aria-label="Loading tools"
    >
      {Array.from({ length: 12 }).map((_, i) => (
        <ToolCardSkeleton key={i} />
      ))}
    </div>
  );
}
