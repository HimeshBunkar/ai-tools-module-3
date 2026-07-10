"use client";

import React, { useState } from "react";

export function HeroCategoryPills() {
  const [activeCategory, setActiveCategory] = useState("Tools");
  const [activeFilter, setActiveFilter] = useState("");

  const FILTERS = [
    { name: "Trending", emoji: "🔥", param: "sort", value: "rating" },
    { name: "Most Popular", emoji: "⭐", param: "sort", value: "rating" },
    { name: "New Tools", emoji: "💻", param: "sort", value: "newest" },
    { name: "Free Tools", emoji: "🎁", param: "pricing", value: "FREE" },
    { name: "Top Rated", emoji: "🏆", param: "sort", value: "rating" },
  ];

  const CATEGORIES = [
    { name: "Tools", href: "#tools" },
    { name: "Companies", href: "#companies" },
    { name: "Tasks", href: "#tools" },
    { name: "Models", href: "#models" },
    { name: "News", href: "#news" },
    { name: "Videos", href: "/tools", external: true },
    { name: "Repositories", href: "#repos" },
    { name: "Robots", href: "/tools", external: true },
    { name: "Devices", href: "/tools", external: true },
  ];

  return (
    <div className="flex flex-col items-center gap-4 w-full relative z-10 select-none">
      {/* Row 1: Emojis + text outline pills */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        {FILTERS.map((f) => {
          const isActive = activeFilter === f.name;
          return (
            <button
              key={f.name}
              onClick={() => {
                setActiveFilter(isActive ? "" : f.name);
                const url = new URL(window.location.href);
                if (isActive) {
                  url.searchParams.delete(f.param);
                } else {
                  url.searchParams.set(f.param, f.value);
                }
                url.hash = "tools";
                window.location.href = url.toString();
              }}
              className={`inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-semibold border transition-all duration-200 active:scale-95 ${
                isActive
                  ? "bg-[#6E56CF] text-white border-transparent shadow-[0_0_15px_rgba(110,86,207,0.3)]"
                  : "bg-[#131316]/80 border-[#232326] text-[#A1A1AA] hover:border-[#6E56CF]/40 hover:text-white"
              }`}
            >
              <span>{f.emoji}</span>
              <span>{f.name}</span>
            </button>
          );
        })}
      </div>

      {/* Row 2: Standard categories outline pills */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.name;
          return (
            <a
              key={cat.name}
              href={cat.href}
              onClick={() => {
                if (!cat.external) {
                  setActiveCategory(cat.name);
                }
              }}
              className={`inline-flex items-center rounded-lg px-3.5 h-[32px] text-[11px] font-medium border transition-all duration-200 active:scale-95 ${
                isActive
                  ? "bg-white text-[#0B0B0E] border-transparent font-semibold shadow-sm"
                  : "bg-[#131316]/60 border-[#232326] text-[#A1A1AA] hover:border-[#6E56CF]/40 hover:text-white"
              }`}
            >
              <span>{cat.name}</span>
            </a>
          );
        })}
      </div>
    </div>
  );
}
