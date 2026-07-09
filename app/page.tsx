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
      <section className="relative mx-auto max-w-container px-6 pt-16 pb-0 text-center flex flex-col items-center">
        {/* Headline */}
        <h1 className="max-w-4xl text-4xl sm:text-5xl font-semibold tracking-tight text-foreground leading-[1.2] mb-10">
          Where the world discovers <span className="font-semibold text-white">AI innovation</span>
        </h1>
      </section>

      {/* Three-Panel Dashboard Strip */}
      <section className="mx-auto max-w-container w-full px-6 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Panel A — Query Terminal */}
          <div className="bg-surface border border-border rounded-lg p-5 flex flex-col justify-between min-h-[170px] hover:border-neutral-700 transition-all">
            <div className="flex items-center justify-between text-[10px] font-mono tracking-widest text-foreground-faint">
              <span>QUERY TERMINAL</span>
              <span className="flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
                <span className="text-success uppercase">active</span>
              </span>
            </div>

            <form action="/tools" method="GET" className="relative flex items-center w-full my-3">
              <div className="relative flex-1">
                <Search
                  size={14}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground-faint"
                  aria-hidden="true"
                />
                <input
                  type="text"
                  name="q"
                  defaultValue={params.q}
                  placeholder="Search tools, models, news or companies..."
                  className="w-full rounded-l-md border border-r-0 border-border bg-surface-raised py-2 pl-9 pr-12 text-xs text-foreground placeholder:text-foreground-faint focus:border-accent focus:outline-none transition-all"
                />
                <kbd className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:inline-flex h-4.5 select-none items-center gap-0.5 rounded border border-border/80 bg-neutral-900/60 px-1.5 font-mono text-[8px] text-foreground-faint pointer-events-none">
                  <span>⌘</span>K
                </kbd>
              </div>
              <button
                type="submit"
                className="rounded-r-md bg-white hover:bg-neutral-200 text-black text-xs font-semibold px-4 py-2 border border-white transition-colors h-[34px] flex items-center justify-center shrink-0"
              >
                Search
              </button>
            </form>

            <div className="flex items-center gap-1.5 text-[10px] font-mono tracking-widest text-foreground-faint uppercase">
              <span>Popular:</span>
              <div className="flex items-center gap-2 font-sans lowercase text-foreground-muted">
                <Link href="/tools?q=chatgpt" className="hover:text-accent transition-colors">ChatGPT</Link>
                <span className="text-border/40">•</span>
                <Link href="/tools?q=claude" className="hover:text-accent transition-colors">Claude</Link>
                <span className="text-border/40">•</span>
                <Link href="/tools?q=cursor" className="hover:text-accent transition-colors">Cursor</Link>
              </div>
            </div>
          </div>

          {/* Panel B — Index Telemetry */}
          <div className="bg-surface border border-border rounded-lg p-5 flex flex-col justify-between min-h-[170px] hover:border-neutral-700 transition-all">
            <div className="text-[10px] font-mono tracking-widest text-foreground-faint">
              INDEX TELEMETRY
            </div>

            <div className="grid grid-cols-2 gap-4 my-2">
              <div className="flex flex-col">
                <span className="text-[9px] font-mono tracking-wider text-foreground-faint">TOOLS</span>
                <span className="text-xl font-bold tracking-tight text-foreground font-sans">50K+</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] font-mono tracking-wider text-foreground-faint">MODELS</span>
                <span className="text-xl font-bold tracking-tight text-foreground font-sans">1K+</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] font-mono tracking-wider text-foreground-faint">REPOS</span>
                <span className="text-xl font-bold tracking-tight text-foreground font-sans">20K+</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] font-mono tracking-wider text-foreground-faint">ROBOTS</span>
                <span className="text-xl font-bold tracking-tight text-foreground font-sans">500+</span>
              </div>
            </div>

            <div className="text-[10px] font-mono tracking-widest text-foreground-faint uppercase">
              UPDATED: LIVE SYNC
            </div>
          </div>

          {/* Panel C — Directory Links */}
          <div className="bg-surface border border-border rounded-lg p-5 flex flex-col justify-between min-h-[170px] hover:border-neutral-700 transition-all">
            <div className="text-[10px] font-mono tracking-widest text-foreground-faint">
              DIRECTORY LINKS
            </div>

            <div className="grid grid-cols-2 gap-2 my-2 text-xs text-foreground-muted">
              <Link href="#tools" className="hover:text-foreground transition-colors flex items-center gap-1">
                <span>→</span> <span>Tools</span>
              </Link>
              <Link href="#models" className="hover:text-foreground transition-colors flex items-center gap-1">
                <span>→</span> <span>Models</span>
              </Link>
              <Link href="#companies" className="hover:text-foreground transition-colors flex items-center gap-1">
                <span>→</span> <span>Companies</span>
              </Link>
              <Link href="#robotics" className="hover:text-foreground transition-colors flex items-center gap-1">
                <span>→</span> <span>Robotics</span>
              </Link>
            </div>

            <div className="text-[10px] font-mono tracking-widest text-foreground-faint uppercase">
              NODES: PAGE ANCHORS
            </div>
          </div>
        </div>
      </section>

      {/* 5. Entity Navigation Bar (Text-only Horizontal Scroll) */}
      <div className="w-full border-y border-border-subtle bg-transparent py-3">
        <div className="mx-auto max-w-container px-6 flex items-center gap-4 overflow-x-auto scrollbar-none">
          <span className="text-[10px] font-mono tracking-widest text-foreground-faint shrink-0 uppercase">
            BROWSE
          </span>
          <div className="flex items-center gap-5 overflow-x-auto scrollbar-none">
            {ENTITY_NAV_WITH_COUNTS.map((nav, i) => (
              <Link
                key={i}
                href={nav.href}
                className="text-xs font-semibold text-foreground-muted hover:text-white transition-colors flex items-center gap-1 whitespace-nowrap active:scale-95 group"
              >
                <span>{nav.label}</span>
                {nav.count && (
                  <span className="text-[10px] font-mono font-medium text-foreground-faint ml-0.5">
                    {nav.count}
                  </span>
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Main Grid Wrapper */}
      <div className="mx-auto max-w-container px-6 py-12 flex-1 space-y-16">
        
        {/* 5. Tools Section (PRESERVED & INTEGRATED NATURALLY) */}
        <div id="tools" className="scroll-mt-24 space-y-6">
          <div className="flex items-end justify-between border-b border-border/60 pb-3">
            <div className="space-y-1">
              <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-[26px]">
                Featured AI Tools
              </h2>
              <p className="text-sm text-foreground-muted leading-relaxed">
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
