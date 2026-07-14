import { ToolGridSkeleton } from "@/components/Skeleton";

export default function ToolsLoading() {
  return (
    <main className="mx-auto max-w-container px-6 py-10">
      <div className="mb-8 flex flex-col gap-4">
        <div>
          <div className="h-8 w-32 animate-pulse rounded-md bg-surface-raised" />
          <div className="mt-2 h-4 w-40 animate-pulse rounded-md bg-surface-raised" />
        </div>
        <div className="h-11 w-full animate-pulse rounded-md bg-surface-raised" />
      </div>
      <div className="flex flex-col gap-8 lg:flex-row">
        <div className="hidden w-64 shrink-0 lg:block" />
        <div className="flex-1">
          <ToolGridSkeleton />
        </div>
      </div>
    </main>
  );
}
