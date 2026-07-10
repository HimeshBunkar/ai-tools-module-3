import React from "react";
import Link from "next/link";
import { Search } from "lucide-react";

import { prisma } from "@/lib/prisma";
import { getTools, getAllCategories } from "@/lib/tools";
import type { ToolsSearchParams } from "@/lib/types";

// Helper components
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { DiscoverySection } from "@/components/DiscoverySection";
import { HeroCategoryPills } from "@/components/HeroCategoryPills";

// Existing tools components
import { DiscoveryFilters } from "@/components/DiscoveryFilters";
import { ToolGrid } from "@/components/ToolGrid";
import { Pagination } from "@/components/Pagination";

type PageProps = {
  searchParams: Promise<ToolsSearchParams>;
};

export default async function HomePage({ searchParams }: PageProps) {
  const params = await searchParams;

  // 1. Fetch AI Tools listing parameters dynamically
  const [{ tools, page, totalPages }, categories] = await Promise.all([
    getTools(params),
    getAllCategories(),
  ]);

  // 2. Fetch Top Companies dynamically from the database
  const topCompanies = await prisma.company.findMany({
    take: 4,
    orderBy: { createdAt: "desc" },
  });

  // 3. Fetch Top Models dynamically
  const topModels = await prisma.aIModel.findMany({
    take: 4,
    orderBy: { createdAt: "desc" },
  });

  // 4. Fetch Top Repositories dynamically
  const topRepos = await prisma.repository.findMany({
    take: 4,
    orderBy: { createdAt: "desc" },
  });

  // 5. Fetch Top News dynamically
  const topNews = await prisma.news.findMany({
    take: 4,
    orderBy: { createdAt: "desc" },
  });



  return (
    <div className="min-h-screen flex flex-col bg-[#0B0B0E] text-white selection:bg-[#6E56CF]/30 selection:text-white">
      {/* 1. Sticky Header */}
      <Header />

      {/* 2. Hero Section with CSS Grid Overlay (Height reduced by 30%, spacing brought closer) */}
      <section 
        className="relative w-full flex flex-col items-center pt-[45px] pb-12 px-6 overflow-hidden"
        style={{
          backgroundImage: 'linear-gradient(to right, rgba(35, 35, 38, 0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(35, 35, 38, 0.12) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      >
        {/* Subtle Radial Spotlight behind the Hero */}
        <div 
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-[#6E56CF]/5 blur-[120px] rounded-full pointer-events-none z-0" 
          aria-hidden="true"
        />

        <div className="mx-auto max-w-[1440px] w-full flex flex-col items-center text-center relative z-10">
          
          {/* Announcement Badge */}
          <div className="inline-flex items-center gap-1.5 rounded-full border border-[#232326] bg-[#131316] px-3.5 py-1 text-xs font-semibold text-[#A1A1AA] hover:border-neutral-700 hover:text-white transition-all mb-5 cursor-default select-none">
            <span>The AI Signal 2026</span>
            <span className="text-[#232326]">|</span>
            <span className="text-[#6E56CF] flex items-center gap-0.5">Ecosystem Update</span>
          </div>

          {/* Headline (72px - 80px style refined to matches AIOrbit proportions) */}
          <h1 className="max-w-[900px] text-4xl sm:text-5xl lg:text-[56px] font-black tracking-tight leading-[1.08] mb-3 select-none">
            <span className="bg-gradient-to-b from-white to-neutral-300 bg-clip-text text-transparent">Where the world discovers</span>{" "}
            <br className="hidden sm:inline" />
            <span className="text-[#6E56CF]">AI innovation</span>
          </h1>

          {/* Subtitle */}
          <p className="max-w-2xl text-xs sm:text-sm text-[#A1A1AA] leading-relaxed mb-6 select-none">
            Discover and explore AI tools, companies, models, repositories, robotics and developer infrastructure from one unified platform.
          </p>

          {/* Large Pill Search Input (760px - 820px, height fixed to h-[58px] to prevent shrunk vertical state) */}
          <form action="/tools" method="GET" className="relative w-full max-w-[800px] mx-auto mb-6 group">
            <div className="relative w-full rounded-full border border-[#232326] bg-[#131316] h-[58px] flex items-center px-6 pr-24 focus-within:border-[#6E56CF] focus-within:shadow-[0_0_24px_rgba(110,86,207,0.15)] transition-all duration-300">
              <input
                type="text"
                name="q"
                defaultValue={params.q}
                placeholder="Search AI tools, models, companies..."
                className="w-full bg-transparent text-base text-white placeholder:text-[#71717A] focus:outline-none"
              />
              <div className="absolute right-6 top-1/2 -translate-y-1/2 flex items-center gap-2">
                <kbd className="hidden sm:inline-flex h-5 select-none items-center gap-0.5 rounded border border-[#232326] bg-[#18181C] px-1.5 font-mono text-[9px] text-[#71717A] pointer-events-none">
                  <span>⌘</span>K
                </kbd>
                <button 
                  type="submit" 
                  className="text-[#71717A] hover:text-[#6E56CF] transition-colors"
                  aria-label="Search"
                >
                  <Search size={20} />
                </button>
              </div>
            </div>
          </form>

          {/* Compact Category Pills directly under the search bar (height 34-38px) */}
          <HeroCategoryPills />

        </div>
      </section>

      {/* Thin Horizontal Divider directly after Hero */}
      <div className="border-b border-[#232326]/40 w-full z-10 relative" />

      {/* 3. Main Grid Wrapper (Naturally continuing into AI directory content) */}
      <div className="mx-auto max-w-[1440px] px-8 py-16 flex-1 space-y-20">
        
        {/* Tools Section */}
        <div id="tools" className="scroll-mt-28 space-y-6">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-[26px]">
              Featured AI Tools
            </h2>
            <p className="text-sm text-[#A1A1AA] leading-relaxed">
              Filter and sort the absolute best active AI tools in the directory database.
            </p>
          </div>

          {/* Combined Discovery Bar & Secondary Filter Row */}
          <DiscoveryFilters categories={categories} />

          <div className="space-y-6 pt-2">
            <ToolGrid tools={tools} />

            <Pagination page={page} totalPages={totalPages} params={params} />
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
                className="flex flex-col justify-between gap-3 rounded-[24px] border border-[#232326] bg-[#131316] p-5 hover:border-[#6E56CF]/40 hover:bg-[#18181C]/40 transition-all group"
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
                className="flex flex-col justify-between gap-3 rounded-[24px] border border-[#232326] bg-[#131316] p-5 hover:border-[#6E56CF]/40 hover:bg-[#18181C]/40 transition-all group"
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
                className="flex flex-col justify-between gap-3 rounded-[24px] border border-[#232326] bg-[#131316] p-5 hover:border-[#6E56CF]/40 hover:bg-[#18181C]/40 transition-all group"
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
          viewAllHref="/tools"
        >
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {topNews.map((n) => (
              <a 
                key={n.id}
                href={n.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col justify-between gap-3 rounded-[24px] border border-[#232326] bg-[#131316] p-5 hover:border-[#6E56CF]/40 hover:bg-[#18181C]/40 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-lg bg-[#18181C] flex items-center justify-center font-bold text-white uppercase border border-[#232326]/60">
                    N
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold text-white truncate">{n.title}</h3>
                    <p className="text-[11px] text-[#A1A1AA] truncate">{n.source}</p>
                  </div>
                </div>
                <p className="text-xs text-[#A1A1AA] line-clamp-2 mt-1 min-h-[32px]">
                  {n.summary}
                </p>
                <div className="mt-2 pt-2 border-t border-[#232326]/60 flex items-center justify-between text-[10px] font-mono text-[#71717A]">
                  <span>PUBLISHED</span>
                  <span className="text-white">{n.publishedAt}</span>
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
