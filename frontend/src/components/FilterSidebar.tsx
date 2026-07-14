import Link from "next/link";
import X from 'lucide-react/dist/esm/icons/x';
import { buildToolsUrl, cn } from "@/lib/utils";
import type { ToolsSearchParams } from "@/lib/types";

const PRICING_OPTIONS = [
  { value: "FREE", label: "Free" },
  { value: "FREEMIUM", label: "Freemium" },
  { value: "PAID", label: "Paid" },
  { value: "FREE_TRIAL", label: "Free Trial" },
] as const;

type FilterSidebarProps = {
  categories: { slug: string; name: string; _count: { tools: number } }[];
  params: ToolsSearchParams;
};

export function FilterSidebar({ categories, params }: FilterSidebarProps) {
  const hasActiveFilters = Boolean(params.category || params.pricing || params.q);

  return (
    <aside className="flex w-full flex-col gap-6 lg:w-64 lg:shrink-0" aria-label="Filter tools">
      {hasActiveFilters && (
        <Link
          href="/tools"
          className="inline-flex items-center gap-1 text-xs text-foreground-muted hover:text-accent"
        >
          <X size={14} aria-hidden="true" />
          Clear all filters
        </Link>
      )}

      <div>
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-wide text-foreground-faint">
          Pricing
        </h2>
        <ul className="flex flex-col gap-1">
          {PRICING_OPTIONS.map((opt) => {
            const isActive = params.pricing === opt.value;
            return (
              <li key={opt.value}>
                <Link
                  href={buildToolsUrl(params, { pricing: isActive ? null : opt.value })}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "block rounded-md px-2 py-1.5 text-sm transition-colors",
                    isActive
                      ? "bg-accent-muted text-accent"
                      : "text-foreground-muted hover:bg-surface-raised hover:text-foreground"
                  )}
                >
                  {opt.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <div>
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-wide text-foreground-faint">
          Category
        </h2>
        <ul className="flex flex-col gap-1">
          {categories.map((cat) => {
            const isActive = params.category === cat.slug;
            return (
              <li key={cat.slug}>
                <Link
                  href={buildToolsUrl(params, { category: isActive ? null : cat.slug })}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "flex items-center justify-between rounded-md px-2 py-1.5 text-sm transition-colors",
                    isActive
                      ? "bg-accent-muted text-accent"
                      : "text-foreground-muted hover:bg-surface-raised hover:text-foreground"
                  )}
                >
                  <span>{cat.name}</span>
                  <span className="text-xs text-foreground-faint">{cat._count.tools}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}
