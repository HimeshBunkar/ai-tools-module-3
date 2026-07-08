"use client";

import React from "react";
import Link from "next/link";
import { AlertCircle, FileQuestion, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type DiscoverySectionProps = {
  id: string;
  title: string;
  description: string;
  viewAllHref: string;
  isLoading?: boolean;
  isError?: boolean;
  isEmpty?: boolean;
  children: React.ReactNode;
  className?: string;
};

export function DiscoverySection({
  id,
  title,
  description,
  viewAllHref,
  isLoading = false,
  isError = false,
  isEmpty = false,
  children,
  className,
}: DiscoverySectionProps) {
  return (
    <section id={id} className={cn("space-y-6 scroll-mt-24", className)}>
      {/* Header Row */}
      <div className="flex items-end justify-between gap-4 border-b border-border/60 pb-3">
        <div className="space-y-1">
          <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
            {title}
          </h2>
          <p className="text-xs text-foreground-muted sm:text-sm">
            {description}
          </p>
        </div>
        <Link
          href={viewAllHref}
          className="inline-flex items-center gap-1 text-xs font-semibold text-accent hover:text-accent-hover transition-colors whitespace-nowrap group"
        >
          <span>View All</span>
          <ArrowRight size={12} className="transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>

      {/* Content States */}
      {isError ? (
        <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-danger/20 bg-danger/5 py-12 text-center">
          <AlertCircle size={24} className="text-danger" />
          <div>
            <p className="font-medium text-foreground">Failed to load content</p>
            <p className="mt-1 text-xs text-foreground-muted">
              An error occurred while fetching items. Please refresh or try again.
            </p>
          </div>
        </div>
      ) : isEmpty ? (
        <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border py-12 text-center">
          <FileQuestion size={24} className="text-foreground-faint" />
          <div>
            <p className="font-medium text-foreground">No items found</p>
            <p className="mt-1 text-xs text-foreground-muted">
              There are currently no featured items available in this section.
            </p>
          </div>
        </div>
      ) : isLoading ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, idx) => (
            <div
              key={idx}
              className="flex flex-col gap-3 rounded-xl border border-border bg-surface p-5 animate-pulse"
            >
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-lg bg-surface-raised" />
                <div className="flex-1 space-y-2">
                  <div className="h-3 w-2/3 rounded bg-surface-raised" />
                  <div className="h-2 w-1/3 rounded bg-surface-raised" />
                </div>
              </div>
              <div className="space-y-2 pt-2">
                <div className="h-2.5 w-full rounded bg-surface-raised" />
                <div className="h-2.5 w-4/5 rounded bg-surface-raised" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        children
      )}
    </section>
  );
}
