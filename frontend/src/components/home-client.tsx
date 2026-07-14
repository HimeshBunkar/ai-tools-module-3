'use client';

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Search } from "lucide-react";

import { API_URL } from "@/lib/api";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { DiscoverySection } from "@/components/DiscoverySection";
import { HeroFeatureChips } from "@/components/HeroFeatureChips";
import { HeroCategoryPills } from "@/components/HeroCategoryPills";
import { SortDropdown } from "@/components/SortDropdown";
import { ToolGrid } from "@/components/ToolGrid";
import { Pagination } from "@/components/Pagination";

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

  // Build params object from URL search params
  const params = {
    q: searchParams.get("q") || undefined,
    category: searchParams.get("category") || undefined,
    pricing: searchParams.get("pricing") || undefined,
    sort: (searchParams.get("sort") || undefined) as SortOption | undefined,
    page: searchParams.get("page") || undefined,
  };

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        // Fetch tools
        const query = new URLSearchParams();
        if (params.q) query.set("q", params.q);
        if (params.category) query.set("category", params.category);
        if (params.pricing) query.set("pricing", params.pricing);
        if (params.sort) query.set("sort", params.sort);
        if (params.page) query.set("page", params.page);

        const [toolsRes, homepageRes] = await Promise.all([
          fetch(`${API_URL}/api/v1/tools?${query.toString()}`),
          fetch(`${API_URL}/api/v1/homepage`),
        ]);

        if (toolsRes.ok) {
          const toolsData = await toolsRes.json();
          setTools(toolsData.tools || []);
          setPage(toolsData.page || 1);
          setTotalPages(toolsData.totalPages || 1);
        }

        if (homepageRes.ok) {
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
      }
    }

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams.toString()]);

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
      <div className="mx-auto max-w-[1440px] px-8 py-8 flex-1 space-y-12">
        
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
            {isLoading ? (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {[1,2,3,4,5,6,7,8].map((i) => (
                  <div key={i} className="h-48 animate-pulse rounded-xl border border-[#232326] bg-[#131316]" />
                ))}
              </div>
            ) : (
              <>
                <ToolGrid tools={tools} />
                <Pagination page={page} totalPages={totalPages} params={params} />
              </>
            )}
          </div>
        </div>

        {/* Companies Section */}
        <DiscoverySection
          id="companies"
          title="Top AI Companies"
          description="Explore leading AI companies, labs, and startups building the future."
          viewAllHref="/tools"
        >
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {topCompanies.map((c) => (
              <Link 
                key={c.id}
                href={`/tools?q=${encodeURIComponent(c.name)}`}
                className="flex flex-col justify-between gap-3 rounded-[24px] border border-[#232326] bg-[#131316] p-5 hover:border-neutral-500 hover:bg-[#18181C]/40 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-lg bg-[#18181C] flex items-center justify-center font-bold text-white uppercase border border-[#232326]/60">
                    {c.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold text-white truncate">{c.name}</h3>
                    <p className="text-[11px] text-[#A1A1AA] truncate">AI Company</p>
                  </div>
                </div>
                <p className="text-xs text-[#A1A1AA] line-clamp-2 mt-1 min-h-[32px]">
                  Explore tools and applications developed by {c.name}.
                </p>
              </Link>
            ))}
          </div>
        </DiscoverySection>

        {/* Models Section */}
        <DiscoverySection
          id="models"
          title="Top AI Models"
          description="Discover state-of-the-art open source and proprietary AI models."
          viewAllHref="/tools"
        >
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {topModels.map((m) => (
              <Link 
                key={m.id}
                href={`/tools?q=${encodeURIComponent(m.name)}`}
                className="flex flex-col justify-between gap-3 rounded-[24px] border border-[#232326] bg-[#131316] p-5 hover:border-neutral-500 hover:bg-[#18181C]/40 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-lg bg-[#18181C] flex items-center justify-center font-bold text-white uppercase border border-[#232326]/60">
                    {m.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold text-white truncate">{m.name}</h3>
                    <p className="text-[11px] text-[#A1A1AA] truncate">{m.creator}</p>
                  </div>
                </div>
                <p className="text-xs text-[#A1A1AA] line-clamp-2 mt-1 min-h-[32px]">
                  {m.description}
                </p>
                <div className="mt-2 pt-2 border-t border-[#232326]/60 flex items-center justify-between text-[10px] font-mono text-[#71717A]">
                  <span>WINDOW</span>
                  <span className="text-white">{m.contextWindow}</span>
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
          viewAllHref="/tools"
        >
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {topRepos.map((repo) => (
              <a 
                key={repo.id}
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col justify-between gap-3 rounded-[24px] border border-[#232326] bg-[#131316] p-5 hover:border-neutral-500 hover:bg-[#18181C]/40 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-lg bg-[#18181C] flex items-center justify-center font-bold text-white uppercase border border-[#232326]/60">
                    {repo.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold text-white truncate">{repo.name}</h3>
                    <p className="text-[11px] text-[#A1A1AA] truncate">⭐ {repo.stars.toLocaleString()} stars</p>
                  </div>
                </div>
                <p className="text-xs text-[#A1A1AA] line-clamp-2 mt-1 min-h-[32px]">
                  {repo.description}
                </p>
                <div className="mt-2 pt-2 border-t border-[#232326]/60 flex items-center justify-between text-[10px] font-mono text-[#71717A]">
                  <span>LANG</span>
                  <span className="text-white">{repo.language}</span>
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
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {topNews.map((n) => (
              <a
                key={n.id}
                href={`/news/${n.slug}`}
                className="flex flex-col justify-between gap-3 rounded-[24px] border border-[#232326] bg-[#131316] p-5 hover:border-neutral-500 hover:bg-[#18181C]/40 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-lg bg-[#18181C] flex items-center justify-center font-bold text-white uppercase border border-[#232326]/60">
                    N
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold text-white truncate">{n.title}</h3>
                    <p className="text-[11px] text-[#A1A1AA] truncate">{n.publisher?.name}</p>
                  </div>
                </div>
                <div className="mt-2 pt-2 border-t border-[#232326]/60 flex items-center justify-between text-[10px] font-mono text-[#71717A]">
                  <span>PUBLISHED</span>
                  <span className="text-white">
                    {new Date(n.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
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
