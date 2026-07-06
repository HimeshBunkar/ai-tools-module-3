"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { buildToolsUrl, cn } from "@/lib/utils";
import type { ToolsSearchParams } from "@/lib/types";

const PRICING_OPTIONS = [
  { value: "FREE", label: "Free" },
  { value: "FREEMIUM", label: "Freemium" },
  { value: "PAID", label: "Paid" },
  { value: "FREE_TRIAL", label: "Free Trial" },
] as const;

type TopFiltersProps = {
  categories: { slug: string; name: string; _count: { tools: number } }[];
  params: ToolsSearchParams;
};

export function TopFilters({ categories, params }: TopFiltersProps) {
  const hasActiveFilters = Boolean(params.category || params.pricing || params.q);

  return (
    <div className="space-y-5 mb-8 relative">
      <style jsx global>{`
        /* Hide scrollbars for the categories horizontal container */
        .scrollbar-none::-webkit-scrollbar {
          display: none !important;
        }
        .scrollbar-none {
          -ms-overflow-style: none !important;
          scrollbar-width: none !important;
        }
      `}</style>

      {/* Category Tags scroll row */}
      <div className="space-y-2">
        <span className="block text-xs font-semibold uppercase tracking-wide text-foreground-faint">
          Categories
        </span>
        <div className="flex flex-wrap gap-2 overflow-x-auto scrollbar-none pb-1">
          {/* "All" category chip */}
          <Link
            href={buildToolsUrl(params, { category: null })}
            className={cn(
              "rounded-full px-3.5 py-1.5 text-xs font-medium border transition-all active:scale-95 whitespace-nowrap",
              !params.category
                ? "bg-accent/15 text-accent border-accent/35 shadow-sm"
                : "bg-surface border-border text-foreground-muted hover:bg-surface-raised hover:text-foreground"
            )}
          >
            All Categories
          </Link>
          
          {categories.map((cat) => {
            const isActive = params.category === cat.slug;
            return (
              <Link
                key={cat.slug}
                href={buildToolsUrl(params, { category: isActive ? null : cat.slug })}
                className={cn(
                  "rounded-full px-3.5 py-1.5 text-xs font-medium border transition-all active:scale-95 whitespace-nowrap flex items-center gap-1.5",
                  isActive
                    ? "bg-accent/15 text-accent border-accent/35 shadow-sm"
                    : "bg-surface border-border text-foreground-muted hover:bg-surface-raised hover:text-foreground"
                )}
              >
                <span>{cat.name}</span>
                <span className={cn(
                  "rounded-full px-1.5 py-0.5 text-[10px] font-bold",
                  isActive ? "bg-accent/20 text-accent" : "bg-surface-raised text-foreground-faint"
                )}>
                  {cat._count.tools}
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Pricing Tags row */}
      <div className="space-y-2">
        <span className="block text-xs font-semibold uppercase tracking-wide text-foreground-faint">
          Pricing
        </span>
        <div className="flex flex-wrap gap-2">
          {/* "All" pricing chip */}
          <Link
            href={buildToolsUrl(params, { pricing: null })}
            className={cn(
              "rounded-full px-3.5 py-1.5 text-xs font-medium border transition-all active:scale-95",
              !params.pricing
                ? "bg-accent/15 text-accent border-accent/35 shadow-sm"
                : "bg-surface border-border text-foreground-muted hover:bg-surface-raised hover:text-foreground"
            )}
          >
            All Pricing
          </Link>

          {PRICING_OPTIONS.map((opt) => {
            const isActive = params.pricing === opt.value;
            return (
              <Link
                key={opt.value}
                href={buildToolsUrl(params, { pricing: isActive ? null : opt.value })}
                className={cn(
                  "rounded-full px-3.5 py-1.5 text-xs font-medium border transition-all active:scale-95",
                  isActive
                    ? "bg-accent/15 text-accent border-accent/35 shadow-sm"
                    : "bg-surface border-border text-foreground-muted hover:bg-surface-raised hover:text-foreground"
                )}
              >
                {opt.label}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Clear Filters row */}
      {hasActiveFilters && (
        <div className="pt-2">
          <Link
            href="/tools"
            className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface px-3 py-1.5 text-xs font-medium text-foreground-muted hover:bg-surface-raised hover:text-foreground transition-all active:scale-95"
          >
            <X size={12} aria-hidden="true" />
            Clear all filters
          </Link>
        </div>
      )}
    </div>
  );
}
