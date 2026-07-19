"use client";

import React, { useState } from "react";

export function HeroCategoryPills() {
  const [activeCategory, setActiveCategory] = useState("Tools");

  const CATEGORIES = [
    { name: "Tools", href: "#tools" },
    { name: "Models", href: "#models" },
    { name: "Companies", href: "#companies" },
    { name: "Repositories", href: "#repos" },
    { name: "Videos", href: "/videos", external: true },
    { name: "News", href: "#news" },
    { name: "Collections", href: "/tools", external: true },
  ];

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 select-none max-w-4xl w-full">
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
            className={`inline-flex items-center rounded-lg px-3 h-[28px] text-[10px] font-semibold border transition-all duration-200 active:scale-95 whitespace-nowrap ${
              isActive
                ? "bg-white text-[#000000] border-transparent"
                : "bg-transparent border-[#232326] text-[#A1A1AA] hover:border-neutral-500 hover:text-white"
            }`}
          >
            <span>{cat.name}</span>
          </a>
        );
      })}
    </div>
  );
}
