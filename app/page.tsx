"use client";

import React, { useState } from "react";
import { 
  Search, 
  Cpu, 
  Building2, 
  Terminal, 
  Newspaper, 
  Layers, 
  Video, 
  Bot, 
  Flame 
} from "lucide-react";

// Helper components
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState("AI Tools");

  const CATEGORIES = [
    { name: "AI Tools", icon: Cpu },
    { name: "Models", icon: Layers },
    { name: "Companies", icon: Building2 },
    { name: "Repositories", icon: Terminal },
    { name: "News", icon: Newspaper },
    { name: "Collections", icon: Flame },
    { name: "Videos", icon: Video },
    { name: "Agents", icon: Bot },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0B0E] text-white selection:bg-[#6E56CF]/30 selection:text-white">
      {/* 1. Sticky Header */}
      <Header />

      {/* 2. Hero Section with CSS Grid Overlay */}
      <section 
        className="flex-1 relative w-full flex flex-col items-center pt-[140px] pb-24 px-6 overflow-hidden"
        style={{
          backgroundImage: 'linear-gradient(to right, rgba(35, 35, 38, 0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(35, 35, 38, 0.12) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      >
        {/* Subtle Radial Spotlight behind the Hero */}
        <div 
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#6E56CF]/5 blur-[120px] rounded-full pointer-events-none z-0" 
          aria-hidden="true"
        />

        <div className="mx-auto max-w-[1440px] w-full flex flex-col items-center text-center relative z-10">
          
          {/* Announcement Badge */}
          <div className="inline-flex items-center gap-1.5 rounded-full border border-[#232326] bg-[#131316] px-3.5 py-1 text-xs font-semibold text-[#A1A1AA] hover:border-neutral-700 hover:text-white transition-all mb-8 cursor-default select-none">
            <span>The AI Signal 2026</span>
            <span className="text-[#232326]">|</span>
            <span className="text-[#6E56CF] flex items-center gap-0.5">Ecosystem Update</span>
          </div>

          {/* Headline (72px - 80px) */}
          <h1 className="max-w-[900px] text-5xl sm:text-6xl lg:text-[76px] font-black tracking-tight text-white leading-[1.05] mb-6 select-none">
            Where the world discovers <br className="hidden sm:inline" />
            <span className="bg-gradient-to-b from-white to-neutral-400 bg-clip-text text-transparent">Where the world discovers </span>
            <span className="text-[#6E56CF]">AI innovation</span>
          </h1>

          {/* Subtitle */}
          <p className="max-w-2xl text-base sm:text-xl text-[#A1A1AA] leading-relaxed mb-10 select-none">
            Discover and explore AI tools, companies, models, repositories, robotics and developer infrastructure from one unified platform.
          </p>

          {/* Large Pill Search Input */}
          <form action="/tools" method="GET" className="relative w-full max-w-2xl mx-auto mb-10 group">
            <div className="relative w-full rounded-full border border-[#232326] bg-[#131316] px-6 py-4.5 pr-14 focus-within:border-[#6E56CF] focus-within:shadow-[0_0_24px_rgba(110,86,207,0.15)] transition-all duration-300">
              <input
                type="text"
                name="q"
                placeholder="Search AI tools, models, companies..."
                className="w-full bg-transparent text-sm text-white placeholder:text-[#71717A] focus:outline-none"
              />
              <button 
                type="submit" 
                className="absolute right-6 top-1/2 -translate-y-1/2 text-[#71717A] hover:text-[#6E56CF] transition-colors"
                aria-label="Search"
              >
                <Search size={20} />
              </button>
            </div>
          </form>

          {/* Category Pills below Search */}
          <div className="flex flex-wrap items-center justify-center gap-3 max-w-4xl mb-24">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.name;
              return (
                <button
                  key={cat.name}
                  onClick={() => setActiveCategory(cat.name)}
                  className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold border transition-all duration-200 active:scale-95 ${
                    isActive
                      ? "bg-white text-[#0B0B0E] border-transparent shadow-sm"
                      : "bg-[#131316] border-[#232326] text-[#A1A1AA] hover:border-[#6E56CF]/40 hover:text-white"
                  }`}
                >
                  <Icon size={12} />
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </div>

          {/* Bottom Visual: Premium Floating Developer Interface Panels (Empty Placeholders Only) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full max-w-[1200px] mt-8 text-left">
            
            {/* Panel 1: Code editor placeholder */}
            <div className="rounded-[24px] border border-[#232326] bg-[#131316] p-6 aspect-[4/3] flex flex-col justify-between shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:border-[#6E56CF]/30 group">
              <div className="flex items-center justify-between border-b border-[#232326]/60 pb-3">
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#232326]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#232326]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#232326]" />
                </div>
                <div className="w-16 h-2 rounded bg-[#18181C]" />
              </div>
              <div className="flex-1 flex flex-col gap-3.5 pt-4">
                <div className="w-[85%] h-2.5 rounded bg-[#18181C]" />
                <div className="w-[60%] h-2.5 rounded bg-[#18181C]" />
                <div className="w-[75%] h-2.5 rounded bg-[#18181C]" />
                <div className="w-[45%] h-2.5 rounded bg-[#18181C]" />
                <div className="w-[65%] h-2.5 rounded bg-[#18181C]" />
                <div className="w-[80%] h-2.5 rounded bg-[#18181C]" />
              </div>
              <div className="flex justify-between items-center pt-3 border-t border-[#232326]/60">
                <div className="w-12 h-2.5 rounded bg-[#18181C]" />
                <div className="w-8 h-2.5 rounded bg-[#18181C]" />
              </div>
            </div>

            {/* Panel 2: Dashboard telemetry monitor placeholder */}
            <div className="rounded-[24px] border border-[#232326] bg-[#131316] p-6 aspect-[4/3] flex flex-col justify-between shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:border-[#6E56CF]/30 group">
              <div className="flex items-center justify-between border-b border-[#232326]/60 pb-3">
                <div className="w-8 h-8 rounded-lg bg-[#18181C]" />
                <div className="w-24 h-2.5 rounded bg-[#18181C]" />
              </div>
              <div className="flex-1 flex items-center justify-center py-4 relative">
                {/* SVG Empty chart path */}
                <svg className="w-full h-24 overflow-visible" viewBox="0 0 100 30" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="chartGlow" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#6E56CF" stopOpacity="0.12" />
                      <stop offset="100%" stopColor="#6E56CF" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path 
                    d="M0,25 Q15,10 30,22 T60,5 T90,28 T100,15" 
                    fill="none" 
                    stroke="#6E56CF" 
                    strokeWidth="1.2" 
                    strokeLinecap="round"
                    className="opacity-70 group-hover:opacity-100 transition-opacity"
                  />
                  <path 
                    d="M0,25 Q15,10 30,22 T60,5 T90,28 T100,15 L100,30 L0,30 Z" 
                    fill="url(#chartGlow)"
                  />
                </svg>
              </div>
              <div className="flex justify-between items-center pt-3 border-t border-[#232326]/60">
                <div className="w-16 h-2 rounded bg-[#18181C]" />
                <div className="w-10 h-2 rounded bg-[#18181C]" />
              </div>
            </div>

            {/* Panel 3: Settings/Parameters panel placeholder */}
            <div className="rounded-[24px] border border-[#232326] bg-[#131316] p-6 aspect-[4/3] flex flex-col justify-between shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:border-[#6E56CF]/30 group">
              <div className="flex items-center justify-between border-b border-[#232326]/60 pb-3">
                <div className="w-16 h-2.5 rounded bg-[#18181C]" />
                <div className="w-4 h-4 rounded-full bg-[#18181C]" />
              </div>
              <div className="flex-1 flex gap-4 pt-4">
                <div className="w-16 border-r border-[#232326]/60 flex flex-col gap-2.5 pr-2">
                  <div className="w-full h-2 rounded bg-[#18181C]" />
                  <div className="w-3/4 h-2 rounded bg-[#18181C]" />
                  <div className="w-5/6 h-2 rounded bg-[#18181C]" />
                </div>
                <div className="flex-1 flex flex-col gap-4 pl-2 justify-center">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-2 rounded bg-[#18181C]" />
                    <div className="w-8 h-4 rounded-full bg-[#1D1D22] border border-[#232326] relative">
                      <span className="absolute left-1 top-1 w-2 h-2 rounded-full bg-[#71717A]" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="w-16 h-2 rounded bg-[#18181C]" />
                    <div className="w-8 h-4 rounded-full bg-[#6E56CF]/20 border border-[#6E56CF]/50 relative">
                      <span className="absolute right-1 top-1 w-2 h-2 rounded-full bg-[#6E56CF]" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="pt-3 border-t border-[#232326]/60 flex justify-end">
                <div className="w-12 h-4 rounded bg-[#18181C]" />
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 3. Footer */}
      <Footer />
    </div>
  );
}
