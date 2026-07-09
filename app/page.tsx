import React from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import type { ToolsSearchParams } from "@/lib/types";

// Helper components
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ParticleGlobe } from "@/components/ParticleGlobe";

type PageProps = {
  searchParams: Promise<ToolsSearchParams>;
};

export default async function HomePage({ searchParams }: PageProps) {
  const params = await searchParams;

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground selection:bg-accent-muted selection:text-foreground">
      {/* 1. Sticky Header */}
      <Header />

      {/* Hero Section / Globe Search console */}
      <section 
        className="flex-1 relative w-full flex flex-col items-center justify-center py-24 px-6 overflow-hidden"
        style={{
          backgroundImage: 'linear-gradient(to right, rgba(35, 35, 38, 0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(35, 35, 38, 0.08) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      >
        {/* Interactive HTML5 Canvas Particle Globe */}
        <ParticleGlobe />

        <div className="mx-auto max-w-container w-full flex flex-col items-center text-center relative z-10 my-auto">
          
          {/* Subtle Floating AI Nodes around the Hero */}
          <div className="absolute top-[22%] left-[8%] hidden xl:flex items-center gap-1.5 opacity-30 animate-pulse pointer-events-none">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            <span className="h-px w-8 bg-gradient-to-r from-accent to-transparent" />
            <span className="text-[9px] font-mono text-foreground-faint">NODE_ALPHA_12</span>
          </div>
          <div className="absolute bottom-[35%] right-[10%] hidden xl:flex items-center gap-1.5 opacity-25 animate-pulse pointer-events-none" style={{ animationDelay: '1.2s' }}>
            <span className="text-[9px] font-mono text-foreground-faint">NODE_BETA_99</span>
            <span className="h-px w-8 bg-gradient-to-l from-accent to-transparent" />
            <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
          </div>
          <div className="absolute top-[40%] right-[6%] hidden xl:flex items-center gap-1.5 opacity-25 animate-pulse pointer-events-none" style={{ animationDelay: '2.4s' }}>
            <span className="h-1 w-1 rounded-full bg-indigo-500 animate-ping" />
            <span className="text-[9px] font-mono text-foreground-faint">SYS_ACTIVE_PING</span>
          </div>

          {/* Headline */}
          <h1 className="max-w-4xl text-5xl sm:text-6xl lg:text-7.5xl font-black tracking-tight text-white leading-[1.1] mb-6 relative z-10">
            The <span className="text-accent font-black">Best AI</span> in One Place
          </h1>

          {/* Subtitle */}
          <p className="max-w-2xl text-sm sm:text-base text-foreground-muted leading-relaxed mb-8 relative z-10">
            The AI Signal helps you find the best AI tools of 2026 easily!
          </p>

          {/* Large Pill Search Input */}
          <form action="/tools" method="GET" className="relative w-full max-w-2xl mx-auto mb-8 group relative z-10">
            <input
              type="text"
              name="q"
              defaultValue={params.q}
              placeholder="Discover AI tools with intelligent search..."
              className="w-full rounded-full border border-border bg-surface px-6 py-4.5 pr-14 text-sm text-white placeholder:text-foreground-faint focus:border-accent focus:bg-surface focus:outline-none transition-all shadow-xl shadow-black/20"
            />
            <button type="submit" className="absolute right-5 top-1/2 -translate-y-1/2 text-foreground-faint hover:text-accent transition-colors">
              <Search size={20} />
            </button>
          </form>

          {/* Emojis Category Badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-foreground-muted relative z-10 font-semibold">
            <Link href="/tools?category=text-writing" className="hover:text-white transition-colors flex items-center gap-1.5">
              <span>✏️</span> <span>Text & Writing</span>
            </Link>
            <Link href="/tools?category=image" className="hover:text-white transition-colors flex items-center gap-1.5">
              <span>🖼️</span> <span>Image</span>
            </Link>
            <Link href="/tools?category=voice-language" className="hover:text-white transition-colors flex items-center gap-1.5">
              <span>🔊</span> <span>Voice & Language</span>
            </Link>
            <Link href="/tools?category=video" className="hover:text-white transition-colors flex items-center gap-1.5">
              <span>🎬</span> <span>Video</span>
            </Link>
            <Link href="/tools" className="hover:text-white transition-colors flex items-center gap-1.5 text-accent font-bold">
              <span>🚀</span> <span>All Category</span>
            </Link>
          </div>

        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
