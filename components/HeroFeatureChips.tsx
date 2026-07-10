"use client";

import React, { useState } from "react";

export function HeroFeatureChips() {
  const [activeFilter, setActiveFilter] = useState("");

  const FILTERS = [
    { name: "Trending", emoji: "🔥", param: "sort", value: "rating" },
    { name: "Most Popular", emoji: "⭐", param: "sort", value: "rating" },
    { name: "New", emoji: "💻", param: "sort", value: "newest" },
    { name: "Free Tools", emoji: "🎁", param: "pricing", value: "FREE" },
    { name: "Top Rated", emoji: "🏆", param: "sort", value: "rating" },
  ];

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 max-w-4xl relative z-10 select-none">
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
            className={`inline-flex items-center gap-1.5 rounded-lg px-3.5 h-[32px] text-[11px] font-semibold border transition-all duration-200 active:scale-95 ${
              isActive
                ? "bg-white text-[#000000] border-transparent font-bold"
                : "bg-[#131316] border-[#232326] text-[#A1A1AA] hover:border-neutral-500 hover:text-white"
            }`}
          >
            <span className="text-xs">{f.emoji}</span>
            <span>{f.name}</span>
          </button>
        );
      })}
    </div>
  );
}
