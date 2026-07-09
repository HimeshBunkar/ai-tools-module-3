import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Cpu, Laptop, Star } from "lucide-react";

import { prisma } from "@/lib/prisma";
import { getTools, getAllCategories } from "@/lib/tools";
import type { ToolsSearchParams } from "@/lib/types";

// Helper components
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { DiscoverySection } from "@/components/DiscoverySection";

// Existing tools components
import { TopFilters } from "@/components/TopFilters";
import { SortDropdown } from "@/components/SortDropdown";
import { ToolGrid } from "@/components/ToolGrid";
import { Pagination } from "@/components/Pagination";



type PageProps = {
  searchParams: Promise<ToolsSearchParams>;
};

export default async function HomePage({ searchParams }: PageProps) {
  const params = await searchParams;

  // 1. Fetch AI Tools listing parameters dynamically (natural reuse of the tools section)
  const [{ tools, page, totalPages }, categories] = await Promise.all([
    getTools(params),
    getAllCategories(),
  ]);

  // 2. Fetch Top Companies dynamically from the database
  const topCompanies = await prisma.company.findMany({
    take: 4,
    orderBy: {
      tools: {
        _count: "desc",
      },
    },
    select: {
      id: true,
      slug: true,
      name: true,
      logoUrl: true,
      _count: {
        select: { tools: true },
      },
    },
  });

  // 3. Fetch discovery items from dynamic database tables
  const [models, news, repos, videos, robots, devices] = await Promise.all([
    prisma.aIModel.findMany({ take: 4, orderBy: { createdAt: "desc" } }),
    prisma.news.findMany({ take: 4, orderBy: { createdAt: "desc" } }),
    prisma.repository.findMany({ take: 4, orderBy: { stars: "desc" } }),
    prisma.video.findMany({ take: 4, orderBy: { createdAt: "desc" } }),
    prisma.robot.findMany({ take: 4, orderBy: { createdAt: "desc" } }),
    prisma.device.findMany({ take: 4, orderBy: { createdAt: "desc" } }),
  ]);

  const ENTITY_NAV_WITH_COUNTS = [
    { label: "AI Tools", href: "#tools", count: "50K+" },
    { label: "Companies", href: "#companies", count: "7K+" },
    { label: "Models", href: "#models", count: "1K+" },
    { label: "Tasks", href: "#tasks", count: "10K+" },
    { label: "News", href: "#news", count: "5K+" },
    { label: "Videos", href: "#videos", count: "7K+" },
    { label: "Collections", href: "/tools", count: null },
    { label: "Repositories", href: "#repos", count: "20K+" },
    { label: "Robotics", href: "#robotics", count: "500+" },
    { label: "Devices", href: "#devices", count: "200+" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground selection:bg-accent-muted selection:text-foreground">
      {/* 1. Sticky Header */}
      <Header />

      {/* Hero Section */}
      <section className="relative mx-auto max-w-container w-full px-6 pt-6 pb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6 border-b border-border/40">
        {/* Glowing Background Radial */}
        <div 
          className="absolute top-[-20%] left-1/2 -translate-x-1/2 h-[300px] w-[300px] rounded-full bg-white/5 blur-[80px] pointer-events-none" 
          aria-hidden="true" 
        />

        {/* Left Side: Headline & description */}
        <div className="flex-1 text-left max-w-xl">
          <h1 className="text-xl font-black tracking-tight text-foreground sm:text-2xl lg:text-3xl">
            Where the world discovers{" "}
            <span className="bg-gradient-to-b from-white to-neutral-400 bg-clip-text text-transparent block md:inline">
              AI Innovation
            </span>
          </h1>
          <p className="mt-1 text-xs text-foreground-muted leading-relaxed">
            The premium discovery engine mapping tools, models, news, and robotics.
          </p>
        </div>

        {/* Right Side: Global Search Box & Popular Queries */}
        <div className="w-full md:max-w-md lg:max-w-lg flex flex-col items-stretch shrink-0">
          <form
            action="/tools"
            method="GET"
            role="search"
            className="relative group w-full"
          >
            <Search
              size={14}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground-faint pointer-events-none group-focus-within:text-white transition-colors"
              aria-hidden="true"
            />
            <input
              type="text"
              name="q"
              defaultValue={params.q}
              placeholder="Search tools, models, news or companies..."
              className="w-full rounded-full border border-border bg-surface/50 py-2 pl-9 pr-24 text-[11px] text-foreground placeholder:text-foreground-faint focus:border-neutral-500 focus:bg-surface focus:outline-none transition-all shadow-sm"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1 pointer-events-none">
              <kbd className="hidden sm:inline-flex h-4.5 select-none items-center gap-0.5 rounded border border-border bg-surface-raised px-1 font-mono text-[8px] font-medium text-foreground-faint">
                <span>⌘</span>K
              </kbd>
              <button
                type="submit"
                className="rounded-full bg-white hover:bg-neutral-200 text-black text-[9px] font-semibold px-2 py-0.5 pointer-events-auto transition-colors"
              >
                Search
              </button>
            </div>
          </form>

          {/* Popular / Trending Searches */}
          <div className="mt-2 flex flex-wrap gap-1.5 text-[9px] items-center">
            <span className="text-foreground-faint font-medium">Popular:</span>
            {["ChatGPT", "Claude", "Cursor", "Midjourney"].map((tag) => (
              <Link
                key={tag}
                href={`/tools?q=${tag.toLowerCase()}`}
                className="text-foreground-muted hover:text-white transition-colors bg-surface-raised/40 hover:bg-white/5 px-2 py-0.5 rounded-full border border-border/40 hover:border-neutral-600"
              >
                {tag}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Entity Navigation Sticky Bar (Counts integrated inline) */}
      <div className="sticky top-[73px] z-40 w-full border-b border-border/80 bg-background/90 backdrop-blur-sm py-2">
        <div className="mx-auto max-w-container px-6 flex items-center gap-2 overflow-x-auto scrollbar-none">
          <span className="text-[10px] font-bold uppercase tracking-wider text-foreground-faint shrink-0 mr-1">
            Browse
          </span>
          {ENTITY_NAV_WITH_COUNTS.map((nav, i) => (
            <Link
              key={i}
              href={nav.href}
              className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium border border-border bg-surface text-foreground-muted hover:border-neutral-600 hover:text-foreground hover:bg-surface-raised transition-all whitespace-nowrap active:scale-95 group"
            >
              <span>{nav.label}</span>
              {nav.count && (
                <span className="rounded bg-surface-raised border border-border/60 px-1 py-0.2 text-[8px] font-bold text-foreground-faint group-hover:text-foreground-muted group-hover:border-neutral-700 transition-colors">
                  {nav.count}
                </span>
              )}
            </Link>
          ))}
        </div>
      </div>

      {/* Main Grid Wrapper */}
      <div className="mx-auto max-w-container px-6 py-12 flex-1 space-y-16">
        
        {/* 5. Tools Section (PRESERVED & INTEGRATED NATURALLY) */}
        <div id="tools" className="scroll-mt-24 space-y-6">
          <div className="flex items-end justify-between border-b border-border/60 pb-3">
            <div className="space-y-1">
              <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                Featured AI Tools
              </h2>
              <p className="text-xs text-foreground-muted sm:text-sm">
                Filter and sort the absolute best active AI tools in the directory database.
              </p>
            </div>
          </div>

          {/* Top Filters (Category tags) */}
          <TopFilters categories={categories} params={params} />

          <div className="space-y-6">
            <div className="flex items-center justify-end">
              <SortDropdown />
            </div>

            {/* Reuse existing ToolGrid exactly as it is */}
            <ToolGrid tools={tools} />

            {/* Pagination Controls */}
            <Pagination page={page} totalPages={totalPages} params={params} />
          </div>
        </div>

        {/* Top Companies Section */}
        <DiscoverySection
          id="companies"
          title="Top AI Companies"
          description="Explore leading research labs and venture-backed organizations building the future of intelligence."
          viewAllHref="/tools"
          isEmpty={topCompanies.length === 0}
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {topCompanies.map((c) => (
              <Link
                key={c.id}
                href={`/tools?q=${encodeURIComponent(c.name)}`}
                className="group flex items-center gap-4 rounded-xl border border-border bg-surface p-5 hover:-translate-y-0.5 hover:border-neutral-600 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-border bg-white p-2">
                  <Image
                    src={c.logoUrl || "https://www.google.com/s2/favicons?domain=github.com&sz=128"}
                    alt={`${c.name} logo`}
                    width={48}
                    height={48}
                    className="h-full w-full object-contain"
                  />
                </div>
                <div className="min-w-0">
                  <h3 className="truncate font-semibold text-foreground group-hover:text-white transition-colors">
                    {c.name}
                  </h3>
                  <p className="mt-1 text-xs text-foreground-muted">
                    {c._count.tools} tool{c._count.tools === 1 ? "" : "s"} listed
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </DiscoverySection>

        {/* Latest Models Section */}
        <DiscoverySection
          id="models"
          title="Latest AI Models"
          description="Track active foundational neural network releases, context specifications, and parameter bounds."
          viewAllHref="/tools"
          isEmpty={models.length === 0}
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {models.map((m) => (
              <div
                key={m.id}
                className="group flex flex-col rounded-xl border border-border bg-surface p-5 hover:-translate-y-0.5 hover:border-neutral-600 transition-all duration-300"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold text-foreground-muted uppercase tracking-wider">{m.creator}</span>
                  <span className="rounded-full bg-surface-raised border border-border px-2 py-0.5 text-[9px] font-bold text-foreground-muted">{m.releaseDate}</span>
                </div>
                <h3 className="mt-3 font-semibold text-foreground group-hover:text-white transition-colors">{m.name}</h3>
                <p className="mt-2 text-xs text-foreground-muted line-clamp-3 leading-relaxed flex-1">
                  {m.description}
                </p>
                <div className="mt-4 pt-3 border-t border-border/60 grid grid-cols-2 gap-2 text-[10px] text-foreground-faint font-semibold uppercase tracking-wider">
                  <div>
                    <span className="block text-[8px] text-foreground-muted font-normal lowercase">context</span>
                    {m.contextWindow}
                  </div>
                  <div>
                    <span className="block text-[8px] text-foreground-muted font-normal lowercase">parameters</span>
                    {m.parameterSize}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </DiscoverySection>

        {/* Latest News Section */}
        <DiscoverySection
          id="news"
          title="Latest AI News"
          description="Read curated summaries on corporate releases, tech benchmarks, and regulatory actions."
          viewAllHref="/tools"
          isEmpty={news.length === 0}
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {news.map((n) => (
              <Link
                key={n.id}
                href={n.url}
                target="_blank"
                className="group flex flex-col justify-between rounded-xl border border-border bg-surface p-5 hover:-translate-y-0.5 hover:border-neutral-600 transition-all duration-300"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2 text-[10px] font-bold uppercase tracking-wider text-foreground-muted">
                    <span>{n.category}</span>
                    <span className="text-foreground-faint">{n.publishedAt}</span>
                  </div>
                  <h3 className="font-semibold text-foreground group-hover:text-white transition-colors leading-snug line-clamp-2">
                    {n.title}
                  </h3>
                  <p className="text-xs text-foreground-muted line-clamp-3 leading-relaxed">
                    {n.summary}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-border/60 flex items-center justify-between text-[10px] text-foreground-faint font-semibold uppercase">
                  <span>{n.source}</span>
                  <span>{n.readTime}</span>
                </div>
              </Link>
            ))}
          </div>
        </DiscoverySection>

        {/* Trending Repositories Section */}
        <DiscoverySection
          id="repos"
          title="Trending Repositories"
          description="Browse trending open-source machine learning weights, Gradio setups, and terminal frameworks."
          viewAllHref="/tools"
          isEmpty={repos.length === 0}
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {repos.map((r) => (
              <Link
                key={r.id}
                href={r.url}
                target="_blank"
                className="group flex flex-col justify-between rounded-xl border border-border bg-surface p-5 hover:-translate-y-0.5 hover:border-neutral-600 transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-semibold text-foreground-muted">{r.owner} /</span>
                    <div className="flex items-center gap-1 text-xs text-foreground-muted">
                      <Star size={12} className="text-[#E8A64C]" />
                      <span>{(r.stars / 1000).toFixed(1)}k</span>
                    </div>
                  </div>
                  <h3 className="mt-2 font-semibold text-foreground group-hover:text-white transition-colors">{r.name}</h3>
                  <p className="mt-2 text-xs text-foreground-muted line-clamp-3 leading-relaxed">
                    {r.description}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-border/60 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-foreground-faint" />
                  <span className="text-[10px] text-foreground-faint font-bold uppercase tracking-wider">{r.language}</span>
                </div>
              </Link>
            ))}
          </div>
        </DiscoverySection>

        {/* Latest Videos Section */}
        <DiscoverySection
          id="videos"
          title="Latest AI Videos"
          description="Watch model walkthroughs, visual tutorial workflows, and developer IDE setup deep dives."
          viewAllHref="/tools"
          isEmpty={videos.length === 0}
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {videos.map((v) => (
              <Link
                key={v.id}
                href={v.url}
                target="_blank"
                className="group flex flex-col justify-between rounded-xl border border-border bg-surface p-5 hover:-translate-y-0.5 hover:border-neutral-600 transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 text-[10px] text-foreground-faint font-bold uppercase">
                    <span>{v.channel}</span>
                    <span className="rounded bg-surface-raised border border-border px-1.5 py-0.5 text-[9px]">{v.duration}</span>
                  </div>
                  <h3 className="mt-3 font-semibold text-foreground group-hover:text-white transition-colors leading-snug line-clamp-2">
                    {v.title}
                  </h3>
                </div>
                <div className="mt-4 pt-3 border-t border-border/60 flex items-center justify-between text-[10px] text-foreground-faint font-semibold uppercase">
                  <span>{v.views}</span>
                  <span>{v.publishedAt}</span>
                </div>
              </Link>
            ))}
          </div>
        </DiscoverySection>

        {/* Robotics & Devices Section */}
        <div id="robotics" className="scroll-mt-24 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Robotics Column */}
          <div className="space-y-4">
            <div className="border-b border-border/60 pb-2">
              <h2 className="text-lg font-bold text-foreground">AI Robotics</h2>
              <p className="text-xs text-foreground-muted">Advanced humanoids, bipedals, and mechanical platforms.</p>
            </div>
            <div className="space-y-3">
              {robots.map((r) => (
                <div
                  key={r.id}
                  className="flex items-start gap-4 rounded-xl border border-border bg-surface p-4 hover:border-neutral-600 transition-colors animate-fade-in"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-surface-raised text-foreground-muted">
                    <Cpu size={24} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-foreground">{r.name}</h3>
                      <span className="text-[10px] text-foreground-faint">| {r.manufacturer} ({r.year})</span>
                    </div>
                    <p className="mt-1 text-xs text-foreground-muted leading-relaxed">
                      {r.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Devices Column */}
          <div id="devices" className="scroll-mt-24 space-y-4">
            <div className="border-b border-border/60 pb-2">
              <h2 className="text-lg font-bold text-foreground">AI Devices</h2>
              <p className="text-xs text-foreground-muted">Edge compute accessories, pocket assistants, and wearables.</p>
            </div>
            <div className="space-y-3">
              {devices.map((d) => (
                <div
                  key={d.id}
                  className="flex items-start gap-4 rounded-xl border border-border bg-surface p-4 hover:border-neutral-600 transition-colors animate-fade-in"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-surface-raised text-foreground-muted">
                    <Laptop size={24} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-foreground">{d.name}</h3>
                      <span className="text-[10px] text-foreground-faint">| {d.manufacturer} ({d.year})</span>
                    </div>
                    <p className="mt-1 text-xs text-foreground-muted leading-relaxed">
                      {d.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
