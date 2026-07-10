"use client";

import Image from "next/image";
import Link from "next/link";
import { Bookmark, Star } from "lucide-react";
import type { ToolCardData } from "@/lib/types";

export function ToolCard({ tool }: { tool: ToolCardData }) {
  const primaryCategory = tool.categories[0]?.category;

  // Dot color helper based on pricing model
  const getDotColor = (model: string) => {
    switch (model.toUpperCase()) {
      case "FREE":
        return "bg-[#00F5D4]"; // Green
      case "FREEMIUM":
        return "bg-[#00BBF9]"; // Blue
      case "PAID":
      default:
        return "bg-[#6E56CF]"; // Violet
    }
  };

  const pricingLabel = tool.pricingModel.charAt(0) + tool.pricingModel.slice(1).toLowerCase();

  return (
    <Link
      href={`/tools/${tool.slug}`}
      className="group flex flex-col justify-between rounded-[16px] border border-[#232326] bg-[#131316] p-5 transition-all duration-250 hover:-translate-y-1 hover:border-[#6E56CF] hover:shadow-[0_0_24px_rgba(110,86,207,0.1)] focus-visible:outline-2 focus-visible:outline-[#6E56CF]/50 h-full"
    >
      <div>
        {/* Top Row: Logo, Name & Sub, Bookmark */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            {/* Logo */}
            <div className="h-11 w-11 shrink-0 overflow-hidden rounded-xl border border-[#232326] bg-[#18181C] p-1.5 flex items-center justify-center">
              {tool.logoUrl ? (
                <Image
                  src={tool.logoUrl}
                  alt={`${tool.name} logo`}
                  width={44}
                  height={44}
                  className="h-full w-full object-contain"
                />
              ) : (
                <span className="text-sm font-bold text-white uppercase select-none">
                  {tool.name.charAt(0)}
                </span>
              )}
            </div>
            {/* Title & Developer */}
            <div className="min-w-0">
              <h3 className="text-sm font-semibold text-white tracking-tight truncate group-hover:text-[#8B7DFF] transition-colors">
                {tool.name}
              </h3>
              <p className="text-[11px] text-[#71717A] truncate mt-0.5">
                {tool.company?.name || primaryCategory?.name || "Customer Support"}
              </p>
            </div>
          </div>
          {/* Bookmark */}
          <button 
            type="button"
            className="p-1.5 rounded-lg text-[#71717A] hover:text-[#8B7DFF] transition-colors z-10"
            aria-label="Bookmark tool"
            onClick={(e) => {
              e.preventDefault();
              // Prevents link navigation click trigger
            }}
          >
            <Bookmark size={15} />
          </button>
        </div>

        {/* Middle Row: Description */}
        <p className="line-clamp-2 min-h-[34px] text-xs text-[#A1A1AA] leading-relaxed mt-4">
          {tool.description}
        </p>

        {/* Tags Row: Pricing & Categories */}
        <div className="flex flex-wrap items-center gap-1.5 mt-4">
          {/* Pricing Model with Colored Dot */}
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#18181C] border border-[#232326] text-[10px] font-medium text-[#A1A1AA]">
            <span className={`w-1.5 h-1.5 rounded-full ${getDotColor(tool.pricingModel)}`} />
            <span>{pricingLabel}</span>
          </span>

          {/* Categories */}
          {tool.categories.slice(0, 2).map(({ category }) => (
            <span 
              key={category.slug} 
              className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-[#18181C] border border-[#232326] text-[10px] font-medium text-[#A1A1AA]"
            >
              {category.name}
            </span>
          ))}
        </div>
      </div>

      {/* Footer Row: Divider & Saves/Reviews */}
      <div className="mt-5 pt-3 border-t border-[#232326]/40 flex items-center justify-between text-[10px] text-[#71717A] font-mono select-none">
        {tool.avgRating ? (
          <span className="flex items-center gap-1">
            <Star size={10} className="fill-[#6E56CF] text-[#6E56CF]" />
            <span>{tool.avgRating.toFixed(1)} ({tool._count.reviews} reviews)</span>
          </span>
        ) : (
          <span>No reviews yet</span>
        )}
        <span>{tool._count.bookmarks} saves</span>
      </div>
    </Link>
  );
}