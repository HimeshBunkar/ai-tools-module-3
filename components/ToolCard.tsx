"use client";

import Image from "next/image";
import Link from "next/link";
import { Bookmark, Star, ArrowUpRight } from "lucide-react";
import type { ToolCardData } from "@/lib/types";

export function ToolCard({ tool }: { tool: ToolCardData }) {
  const primaryCategory = tool.categories[0]?.category;
  const pricingLabel = tool.pricingModel.replace("_", " ");

  return (
    <Link
      href={`/tools/${tool.slug}`}
      className="group relative flex flex-col justify-between rounded-[24px] border border-[#232326] bg-[#131316] p-6 transition-all duration-250 hover:-translate-y-1.5 hover:border-[#6E56CF] hover:shadow-[0_0_30px_rgba(110,86,207,0.15)] focus-visible:outline-2 focus-visible:outline-[#6E56CF]/50 h-full"
    >
      <div className="space-y-4">
        {/* Top Row: Logo & Bookmark */}
        <div className="flex items-center justify-between">
          <div className="h-12 w-12 shrink-0 overflow-hidden rounded-2xl border border-[#232326] bg-[#18181C] p-2 flex items-center justify-center">
            {tool.logoUrl ? (
              <Image
                src={tool.logoUrl}
                alt={`${tool.name} logo`}
                width={48}
                height={48}
                className="h-full w-full object-contain"
              />
            ) : (
              <span className="text-base font-bold text-white uppercase select-none">
                {tool.name.charAt(0)}
              </span>
            )}
          </div>

          <button 
            type="button"
            className="p-2 rounded-full bg-[#18181C] border border-[#232326] text-[#71717A] hover:text-[#8B7DFF] hover:border-[#6E56CF]/40 transition-colors z-10"
            aria-label="Bookmark tool"
            onClick={(e) => {
              e.preventDefault();
              // Prevents link navigation click trigger
            }}
          >
            <Bookmark size={15} />
          </button>
        </div>

        {/* Title, Developer & Description */}
        <div className="space-y-1.5">
          <div>
            <h3 className="text-[15px] font-bold text-white tracking-tight truncate group-hover:text-[#8B7DFF] transition-colors">
              {tool.name}
            </h3>
            <p className="text-[11px] text-[#71717A] mt-0.5 select-none">
              by {tool.company?.name || primaryCategory?.name || "Independent"}
            </p>
          </div>
          <p className="text-xs text-[#A1A1AA] leading-relaxed line-clamp-1">
            {tool.description}
          </p>
        </div>

        {/* Pricing & Categories Tags */}
        <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
          <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#18181C] border border-[#232326] text-[#A1A1AA] uppercase tracking-wide select-none">
            {pricingLabel}
          </span>
          {tool.categories.slice(0, 2).map(({ category }) => (
            <span 
              key={category.slug} 
              className="text-[10px] font-medium px-2.5 py-0.5 rounded-full bg-[#18181C] border border-[#232326]/60 text-[#71717A] select-none"
            >
              {category.name}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom Row: Rating & Launch */}
      <div className="mt-5 pt-3 border-t border-[#232326]/40 flex items-center justify-between text-[11px] text-[#71717A] select-none">
        {/* Rating display */}
        <div className="flex items-center gap-1 font-mono text-[#A1A1AA]">
          <Star size={12} className="fill-[#6E56CF] text-[#6E56CF]" />
          <span>{tool.avgRating ? tool.avgRating.toFixed(1) : "5.0"}</span>
        </div>

        {/* Launch Button */}
        <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#18181C] border border-[#232326] text-[10px] font-bold text-white group-hover:bg-[#6E56CF] group-hover:border-transparent transition-all duration-200">
          <span>Launch</span>
          <ArrowUpRight size={11} />
        </span>
      </div>
    </Link>
  );
}