import { CollectionCard } from "@/components/CollectionCard";
import type { CollectionListItem } from "@/lib/types";

export function CollectionGrid({ collections }: { collections: CollectionListItem[] }) {
  if (collections.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-border bg-surface/50 px-6 py-16 text-center">
        <h3 className="font-medium text-foreground">No collections match this filter</h3>
        <p className="mt-1.5 text-sm text-foreground-muted">Try a different category.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {collections.map((c) => (
        <CollectionCard key={c.id} collection={c} />
      ))}
    </div>
  );
}
