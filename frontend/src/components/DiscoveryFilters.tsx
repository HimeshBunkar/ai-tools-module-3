"use client";

import React from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import LayoutGrid from 'lucide-react/dist/esm/icons/layout-grid';
import List from 'lucide-react/dist/esm/icons/list';
import SlidersHorizontal from 'lucide-react/dist/esm/icons/sliders-horizontal';
import ChevronDown from 'lucide-react/dist/esm/icons/chevron-down';

type CategoryData = {
  slug: string;
  name: string;
  _count: { tools: number };
};

type DiscoveryFiltersProps = {
  categories: CategoryData[];
};

export function DiscoveryFilters({ categories }: DiscoveryFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Extract search params
  const currentSort = searchParams.get("sort") || "newest";
  const currentCategory = searchParams.get("category") || null;
  const currentPricing = searchParams.get("pricing") || null;

  const updateParam = (overrides: Record<string, string | null>) => {
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    
    Object.entries(overrides).forEach(([key, value]) => {
      if (value === null) {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });

    // Reset page pagination on filter change
    params.delete("page");

    const qs = params.toString();
    router.push(`${pathname}${qs ? `?${qs}` : ""}`);
  };

  return (
    <div className="space-y-4 w-full">
      {/* 1. Discovery Bar (Toolbar) */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-3 border-b border-[#232326]/60">
        {/* Left: small rounded pills */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => updateParam({ sort: "rating", pricing: null })}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all active:scale-95 ${
              currentSort === "rating" && !currentPricing
                ? "bg-[#6E56CF] text-white border-transparent shadow-sm"
                : "bg-[#131316] border-[#232326] text-[#A1A1AA] hover:border-[#6E56CF]/40 hover:text-white"
            }`}
          >
            Trending
          </button>
          <button
            onClick={() => updateParam({ sort: "rating", pricing: null })}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all active:scale-95 ${
              currentSort === "rating" && !currentPricing
                ? "bg-[#6E56CF] text-white border-transparent shadow-sm"
                : "bg-[#131316] border-[#232326] text-[#A1A1AA] hover:border-[#6E56CF]/40 hover:text-white"
            }`}
          >
            Popular
          </button>
          <button
            onClick={() => updateParam({ sort: "newest", pricing: null })}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all active:scale-95 ${
              currentSort === "newest" && !currentPricing
                ? "bg-[#6E56CF] text-white border-transparent shadow-sm"
                : "bg-[#131316] border-[#232326] text-[#A1A1AA] hover:border-[#6E56CF]/40 hover:text-white"
            }`}
          >
            Newest
          </button>
          <button
            onClick={() => updateParam({ pricing: currentPricing === "FREE" ? null : "FREE" })}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all active:scale-95 ${
              currentPricing === "FREE"
                ? "bg-[#6E56CF] text-white border-transparent shadow-sm"
                : "bg-[#131316] border-[#232326] text-[#A1A1AA] hover:border-[#6E56CF]/40 hover:text-white"
            }`}
          >
            Free
          </button>
          <button
            onClick={() => updateParam({ sort: "rating", pricing: null })}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all active:scale-95 ${
              currentSort === "rating" && !currentPricing
                ? "bg-[#6E56CF] text-white border-transparent shadow-sm"
                : "bg-[#131316] border-[#232326] text-[#A1A1AA] hover:border-[#6E56CF]/40 hover:text-white"
            }`}
          >
            Top Rated
          </button>
        </div>

        {/* Right: Sort select dropdown, View toggle, Filter button */}
        <div className="flex items-center gap-3 self-end sm:self-auto">
          {/* Custom Sort selector */}
          <div className="relative inline-flex items-center">
            <select
              value={currentSort}
              onChange={(e) => updateParam({ sort: e.target.value })}
              className="appearance-none rounded-lg border border-[#232326] bg-[#131316] pl-3 pr-8 py-1.5 text-xs font-semibold text-[#A1A1AA] hover:text-white hover:border-[#6E56CF]/40 focus:outline-none transition-all cursor-pointer h-8"
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="rating">Top Rated</option>
              <option value="name-asc">Name (A-Z)</option>
              <option value="name-desc">Name (Z-A)</option>
            </select>
            <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#71717A] pointer-events-none" />
          </div>

          {/* View Toggle */}
          <div className="flex items-center border border-[#232326] bg-[#131316] rounded-lg p-0.5 h-8">
            <button 
              className="p-1 rounded bg-[#18181C] text-white hover:bg-neutral-800 transition-colors" 
              aria-label="Grid view"
            >
              <LayoutGrid size={13} />
            </button>
            <button 
              className="p-1 rounded text-[#A1A1AA] hover:text-white hover:bg-neutral-800 transition-colors" 
              aria-label="List view"
            >
              <List size={13} />
            </button>
          </div>

          {/* Filter button */}
          <button 
            onClick={() => updateParam({ category: null, pricing: null, sort: null })}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#232326] bg-[#131316] text-xs font-semibold text-[#A1A1AA] hover:text-white hover:border-[#6E56CF]/40 transition-all h-8"
          >
            <SlidersHorizontal size={12} />
            <span>Filters</span>
          </button>
        </div>
      </div>

      {/* 2. Secondary Filter Row (Category chips scrolling) */}
      <div className="relative w-full">
        <div className="flex flex-nowrap gap-3 overflow-x-auto scrollbar-none pb-2 w-full">
          {/* All category pill */}
          <button
            onClick={() => updateParam({ category: null })}
            className={`rounded-full px-3.5 py-1.5 text-xs font-semibold border transition-all active:scale-95 whitespace-nowrap ${
              !currentCategory
                ? "bg-white text-[#0B0B0E] border-transparent shadow-sm"
                : "bg-[#131316] border-[#232326] text-[#A1A1AA] hover:border-[#6E56CF]/40 hover:text-white"
            }`}
          >
            All Tools
          </button>

          {/* Dynamic Category list */}
          {categories.map((cat) => {
            const isActive = currentCategory === cat.slug;
            return (
              <button
                key={cat.slug}
                onClick={() => updateParam({ category: isActive ? null : cat.slug })}
                className={`rounded-full px-3.5 py-1.5 text-xs font-semibold border transition-all active:scale-95 whitespace-nowrap flex items-center gap-1.5 ${
                  isActive
                    ? "bg-white text-[#0B0B0E] border-transparent shadow-sm"
                    : "bg-[#131316] border-[#232326] text-[#A1A1AA] hover:border-[#6E56CF]/40 hover:text-white"
                }`}
              >
                <span>{cat.name}</span>
                <span className={`text-[10px] ${isActive ? "text-black/60 font-bold" : "text-[#71717A]"}`}>
                  {cat._count.tools}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
