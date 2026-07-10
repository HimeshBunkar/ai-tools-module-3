"use client";

import React, { useState } from "react";

export function HeroCategoryPills() {
  const [activeCategory, setActiveCategory] = useState("AI Tools");

  const CATEGORIES = [
    { name: "AI Tools", href: "#tools" },
    { name: "Models", href: "#models" },
    { name: "Companies", href: "#companies" },
    { name: "Repositories", href: "#repos" },
    { name: "News", href: "#news" },
    { name: "Collections", href: "/tools", external: true },
    { name: "Videos", href: "/tools", external: true },
    { name: "Agents", href: "/tools?category=agents", external: true },
  ];

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 max-w-4xl relative z-10">
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
            className={`inline-flex items-center rounded-full px-3.5 h-[32px] text-[11px] font-medium border transition-all duration-200 active:scale-95 ${
              isActive
                ? "bg-white text-[#0B0B0E] border-transparent shadow-sm font-semibold"
                : "bg-[#131316]/80 border-[#232326] text-[#A1A1AA] hover:border-[#6E56CF]/40 hover:text-white"
            }`}
          >
            <span>{cat.name}</span>
          </a>
        );
      })}
    </div>
  );
}
