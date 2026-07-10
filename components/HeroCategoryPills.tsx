"use client";

import React, { useState } from "react";
import { Cpu, Layers, Building2, Terminal, Newspaper, Flame, Video, Bot } from "lucide-react";

export function HeroCategoryPills() {
  const [activeCategory, setActiveCategory] = useState("AI Tools");

  const CATEGORIES = [
    { name: "AI Tools", icon: Cpu, href: "#tools" },
    { name: "Models", icon: Layers, href: "#models" },
    { name: "Companies", icon: Building2, href: "#companies" },
    { name: "Repositories", icon: Terminal, href: "#repos" },
    { name: "News", icon: Newspaper, href: "#news" },
    { name: "Collections", icon: Flame, href: "/tools", external: true },
    { name: "Videos", icon: Video, href: "/tools", external: true },
    { name: "Agents", icon: Bot, href: "/tools?category=agents", external: true },
  ];

  return (
    <div className="flex flex-wrap items-center justify-center gap-2.5 max-w-4xl relative z-10">
      {CATEGORIES.map((cat) => {
        const Icon = cat.icon;
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
            className={`inline-flex items-center gap-1.5 rounded-full px-4 h-[36px] text-xs font-semibold border transition-all duration-200 active:scale-95 ${
              isActive
                ? "bg-white text-[#0B0B0E] border-transparent shadow-sm"
                : "bg-transparent border-[#232326] text-[#A1A1AA] hover:border-[#6E56CF]/40 hover:text-white"
            }`}
          >
            <Icon size={11} />
            <span>{cat.name}</span>
          </a>
        );
      })}
    </div>
  );
}
