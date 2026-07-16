'use client';

import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { SearchBar } from "@/components/SearchBar";
import { TopFilters } from "@/components/TopFilters";
import { SortDropdown } from "@/components/SortDropdown";
import { ToolGrid } from "@/components/ToolGrid";
import { API_URL } from "@/lib/api";
import type { SortOption } from "@/lib/types";

export function ToolsClient() {
  const searchParams = useSearchParams();

  const [tools, setTools] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [categories, setCategories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  const sentinelRef = useRef<HTMLDivElement>(null);

  const params = {
    q: searchParams.get("q") || undefined,
    category: searchParams.get("category") || undefined,
    pricing: searchParams.get("pricing") || undefined,
    sort: (searchParams.get("sort") || undefined) as SortOption | undefined,
  };

  const filterKey = `${params.q || ''}-${params.category || ''}-${params.pricing || ''}-${params.sort || ''}`;

  // Reset page and tools when filters change
  useEffect(() => {
    setTools([]);
    setPage(1);
    setTotalPages(1);
  }, [filterKey]);

  useEffect(() => {
    async function fetchTools() {
      if (page === 1) {
        setIsLoading(true);
      } else {
        setIsFetchingMore(true);
      }

      try {
        const query = new URLSearchParams();
        if (params.q) query.set("q", params.q);
        if (params.category) query.set("category", params.category);
        if (params.pricing) query.set("pricing", params.pricing);
        if (params.sort) query.set("sort", params.sort);
        query.set("page", page.toString());

        const res = await fetch(`${API_URL}/api/v1/tools?${query.toString()}`);
        if (res.ok) {
          const data = await res.json();
          if (page === 1) {
            setTools(data.tools || []);
          } else {
            setTools(prev => [...prev, ...(data.tools || [])]);
          }
          setTotal(data.total || 0);
          setTotalPages(data.totalPages || 1);
          setCategories(data.categories || []);
        }
      } catch (error) {
        console.error("Failed to fetch tools:", error);
      } finally {
        setIsLoading(false);
        setIsFetchingMore(false);
      }
    }

    fetchTools();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterKey, page]);

  // IntersectionObserver for endless scrolling
  useEffect(() => {
    if (isLoading || isFetchingMore || page >= totalPages) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setPage(prev => prev + 1);
      }
    }, { threshold: 0.1 });

    const currentSentinel = sentinelRef.current;
    if (currentSentinel) {
      observer.observe(currentSentinel);
    }

    return () => {
      if (currentSentinel) {
        observer.unobserve(currentSentinel);
      }
    };
  }, [isLoading, isFetchingMore, page, totalPages]);

  return (
    <main className="mx-auto max-w-[1070px] px-6 py-10">
      <header className="mb-8 flex flex-col gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">AI Tools</h1>
          <p className="mt-1 text-sm text-foreground-muted">
            {total} tool{total === 1 ? "" : "s"} across every category
          </p>
        </div>
        <SearchBar defaultValue={params.q} />
      </header>

      <TopFilters categories={categories} params={{ ...params, page: page.toString() }} />

      <div className="space-y-6">
        <div className="flex items-center justify-end">
          <SortDropdown />
        </div>

        {isLoading && page === 1 ? (
          <div className="flex flex-col gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-24 animate-pulse rounded-xl border border-[#232326] bg-[#131316]" />
            ))}
          </div>
        ) : (
          <>
            <ToolGrid tools={tools} />
            
            {/* Sentinel for infinite scroll */}
            {tools.length > 0 && page < totalPages && (
              <div ref={sentinelRef} className="h-20 flex items-center justify-center py-8">
                <div className="h-6 w-6 animate-spin rounded-full border-2 border-white/20 border-t-white" />
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
