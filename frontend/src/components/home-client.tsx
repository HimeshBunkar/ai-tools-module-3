'use client';

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Search from 'lucide-react/dist/esm/icons/search';
import MapPin from 'lucide-react/dist/esm/icons/map-pin';

import { API_URL } from "@/lib/api";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { DiscoverySection } from "@/components/DiscoverySection";
import { HeroFeatureChips } from "@/components/HeroFeatureChips";
import { HeroCategoryPills } from "@/components/HeroCategoryPills";
import { SortDropdown } from "@/components/SortDropdown";
import { ToolGrid } from "@/components/ToolGrid";

import type { SortOption } from "@/lib/types";

export function HomeClient() {
  const searchParams = useSearchParams();

  const [tools, setTools] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [topCompanies, setTopCompanies] = useState<any[]>([]);
  const [topModels, setTopModels] = useState<any[]>([]);
  const [topRepos, setTopRepos] = useState<any[]>([]);
  const [topNews, setTopNews] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  const sentinelRef = useRef<HTMLDivElement>(null);

  // Build params object from URL search params
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
    async function fetchData() {
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

        const [toolsRes, homepageRes] = await Promise.all([
          fetch(`${API_URL}/api/v1/tools?${query.toString()}`),
          page === 1 ? fetch(`${API_URL}/api/v1/homepage`) : Promise.resolve(null),
        ]);

        if (toolsRes.ok) {
          const toolsData = await toolsRes.json();
          if (page === 1) {
            setTools(toolsData.tools || []);
          } else {
            setTools(prev => [...prev, ...(toolsData.tools || [])]);
          }
          setTotalPages(toolsData.totalPages || 1);
        }

        if (homepageRes && homepageRes.ok) {
          const data = await homepageRes.json();
          setTopCompanies(data.topCompanies || []);
          setTopModels(data.topModels || []);
          setTopRepos(data.topRepos || []);
          setTopNews(data.topNews || []);
        }
      } catch (error) {
        console.error("Failed to fetch homepage data:", error);
      } finally {
        setIsLoading(false);
        setIsFetchingMore(false);
      }
    }

    fetchData();
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
    <div className="min-h-screen flex flex-col bg-[#000000] text-white selection:bg-neutral-800 selection:text-white">
      {/* 1. Sticky Header */}
      <Header />

      {/* 2. Hero Section */}
      <section 
        className="relative w-full flex flex-col items-center pt-8 px-6 overflow-hidden"
        style={{
          backgroundImage: 'linear-gradient(to right, rgba(35, 35, 38, 0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(35, 35, 38, 0.08) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      >
        <div className="mx-auto max-w-[1440px] w-full flex flex-col items-center text-center relative z-10">
          <h1 className="max-w-[900px] text-3xl sm:text-4xl lg:text-[44px] font-black tracking-tight leading-none mb-5 select-none text-white whitespace-nowrap">
            The Best AI in One Place
          </h1>

          <p className="max-w-3xl text-[13px] text-[#A1A1AA] leading-none mb-[30px] select-none whitespace-nowrap">
            The AI Signal helps you find the best AI tools of 2026 easily!
          </p>

          <form action="/tools" method="GET" className="relative w-full max-w-[900px] mx-auto mb-[22px] group">
            <div className="relative w-full rounded-lg border border-[#232326] bg-[#111113] h-[48px] flex items-center px-5 pr-20 focus-within:border-neutral-500 transition-all duration-300">
              <input
                type="text"
                name="q"
                defaultValue={params.q}
                placeholder="Search AI tools, models, companies..."
                className="w-full bg-transparent text-sm text-white placeholder:text-[#71717A] focus:outline-none"
              />
              <div className="absolute right-5 top-1/2 -translate-y-1/2 flex items-center gap-2">
                <kbd className="hidden sm:inline-flex h-5 select-none items-center gap-0.5 rounded border border-[#232326] bg-[#18181C] px-1.5 font-mono text-[9px] text-[#71717A] pointer-events-none">
                  <span>⌘</span>K
                </kbd>
                <button 
                  type="submit" 
                  className="text-[#71717A] hover:text-white transition-colors"
                  aria-label="Search"
                >
                  <Search size={16} />
                </button>
              </div>
            </div>
          </form>

          <div className="mb-[18px]">
            <HeroFeatureChips />
          </div>

          <div className="mb-[30px] w-full flex justify-center">
            <HeroCategoryPills />
          </div>
        </div>
      </section>

      <div className="border-b border-[#232326]/40 w-full z-10 relative" />

      {/* 3. Main Grid Content Wrapper */}
      <div className="mx-auto max-w-[1070px] px-8 py-8 flex-1 space-y-12 w-full">
        
        {/* Tools Section */}
        <div id="tools" className="scroll-mt-28 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 border-b border-[#232326]/60 pb-2">
            <div className="space-y-1">
              <h2 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
                Featured AI Tools
              </h2>
              <p className="text-xs text-[#A1A1AA] leading-relaxed">
                Filter and sort the absolute best active AI tools in the directory database.
              </p>
            </div>
            <SortDropdown />
          </div>

          <div className="space-y-4 pt-1">
            {isLoading && page === 1 ? (
              <div className="flex flex-col gap-4">
                {[1, 2, 3].map((i) => (
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
        </div>

        {/* Companies Section */}
        <DiscoverySection
          id="companies"
          title="Top AI Companies"
          description="Explore leading AI companies, labs, and startups building the future."
          viewAllHref="/companies"
        >
          <div className="flex flex-col divide-y divide-[#232326]/60 border border-[#232326]/60 rounded-xl overflow-hidden bg-[#131316]/10">
            {topCompanies.map((c) => (
              <Link 
                key={c.id}
                href={`/companies/${c.slug}`}
                className="group flex items-center justify-between gap-4 p-4 bg-transparent hover:bg-[#18181C]/40 transition-all focus-visible:bg-[#18181C]/40 focus-visible:outline-none"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="h-10 w-10 rounded-lg bg-[#18181C] flex items-center justify-center font-bold text-white uppercase border border-[#232326]/60 shrink-0">
                    {c.name.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm font-bold text-white truncate">{c.name}</h3>
                    <div className="flex items-center gap-2 mt-0.5 text-[11px] text-[#71717A]">
                      <span>AI Company</span>
                      {c.headquarters && (
                        <>
                          <span className="h-1 w-1 rounded-full bg-[#232326]" />
                          <span className="flex items-center gap-0.5"><MapPin size={10} />{c.headquarters}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <span className="text-xs font-semibold text-[#71717A] group-hover:text-white transition-colors">
                  Details &rarr;
                </span>
              </Link>
            ))}
          </div>
        </DiscoverySection>

        {/* Models Section */}
        <DiscoverySection
          id="models"
          title="Top AI Models"
          description="Discover state-of-the-art open source and proprietary AI models."
          viewAllHref="/models"
        >
          <div className="flex flex-col divide-y divide-[#232326]/60 border border-[#232326]/60 rounded-xl overflow-hidden bg-[#131316]/10">
            {topModels.map((m) => (
              <Link 
                key={m.id}
                href={`/models`}
                className="group flex items-center justify-between gap-4 p-4 bg-transparent hover:bg-[#18181C]/40 transition-all focus-visible:bg-[#18181C]/40 focus-visible:outline-none"
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div className="h-10 w-10 rounded-lg bg-[#18181C] flex items-center justify-center font-bold text-white uppercase border border-[#232326]/60 shrink-0">
                    {m.name.charAt(0)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline gap-2">
                      <h3 className="text-sm font-bold text-white truncate">{m.name}</h3>
                      <span className="text-[10px] font-mono text-[#71717A] uppercase">{m.creator}</span>
                    </div>
                    <p className="text-xs text-[#A1A1AA] line-clamp-1 mt-1 leading-relaxed">
                      {m.description}
                    </p>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-[10px] font-mono text-[#71717A] block">CONTEXT WINDOW</span>
                  <span className="text-xs text-white font-medium">{m.contextWindow}</span>
                </div>
              </Link>
            ))}
          </div>
        </DiscoverySection>

        {/* Repositories Section */}
        <DiscoverySection
          id="repos"
          title="Trending GitHub Repositories"
          description="Explore popular open-source repositories pushing AI boundaries on GitHub."
          viewAllHref="/repositories"
        >
          <div className="flex flex-col divide-y divide-[#232326]/60 border border-[#232326]/60 rounded-xl overflow-hidden bg-[#131316]/10">
            {topRepos.map((repo) => (
              <a 
                key={repo.id}
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between gap-4 p-4 bg-transparent hover:bg-[#18181C]/40 transition-all focus-visible:bg-[#18181C]/40 focus-visible:outline-none"
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div className="h-10 w-10 rounded-lg bg-[#18181C] flex items-center justify-center font-bold text-white uppercase border border-[#232326]/60 shrink-0">
                    {repo.name.charAt(0)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline gap-2">
                      <h3 className="text-sm font-bold text-white truncate">{repo.name}</h3>
                      <span className="text-[10px] font-mono text-[#71717A]">⭐ {repo.stars.toLocaleString()} stars</span>
                    </div>
                    <p className="text-xs text-[#A1A1AA] line-clamp-1 mt-1 leading-relaxed">
                      {repo.description}
                    </p>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-[10px] font-mono text-[#71717A] block">LANGUAGE</span>
                  <span className="text-xs text-white font-medium">{repo.language}</span>
                </div>
              </a>
            ))}
          </div>
        </DiscoverySection>

        {/* News Section */}
        <DiscoverySection
          id="news"
          title="Latest AI News & Insights"
          description="Stay informed with critical announcements and ecosystem coverage."
          viewAllHref="/news"
        >
          <div className="flex flex-col divide-y divide-[#232326]/60 border border-[#232326]/60 rounded-xl overflow-hidden bg-[#131316]/10">
            {topNews.map((n) => (
              <a
                key={n.id}
                href={`/news/${n.slug}`}
                className="group flex items-center justify-between gap-4 p-4 bg-transparent hover:bg-[#18181C]/40 transition-all focus-visible:bg-[#18181C]/40 focus-visible:outline-none"
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div className="h-10 w-10 rounded-lg bg-[#18181C] flex items-center justify-center font-bold text-white uppercase border border-[#232326]/60 shrink-0">
                    N
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-bold text-white truncate">{n.title}</h3>
                    <p className="text-[11px] text-[#71717A] mt-0.5 truncate">{n.publisher?.name}</p>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-[10px] font-mono text-[#71717A] block">PUBLISHED</span>
                  <span className="text-xs text-white font-medium">
                    {new Date(n.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </DiscoverySection>

      </div>

      {/* 4. Footer */}
      <Footer />
    </div>
  );
}
