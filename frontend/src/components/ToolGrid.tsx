import { SearchX } from "lucide-react";
import { ToolCard } from "@/components/ToolCard";
import type { ToolCardData } from "@/lib/types";

export function ToolGrid({ tools }: { tools: ToolCardData[] }) {
  if (tools.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-border py-20 text-center">
        <SearchX size={32} className="text-foreground-faint" aria-hidden="true" />
        <div>
          <p className="font-medium text-foreground">No tools match your filters</p>
          <p className="mt-1 text-sm text-foreground-muted">
            Try a different search term or clear a filter to see more results.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      role="list"
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
    >
      {tools.map((tool) => (
        <div key={tool.id} role="listitem" className="h-full">
          <ToolCard tool={tool} />
        </div>
      ))}
    </div>
  );
}
