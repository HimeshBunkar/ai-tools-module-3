import Image from "next/image";
import Link from "next/link";
import { Bookmark, Star, ArrowUpRight } from "lucide-react";
import type { ToolCardData } from "@/lib/types";

export function ToolCard({ tool }: { tool: ToolCardData }) {
  const primaryCategory = tool.categories[0]?.category;
  // Deterministic visits count for consistent rendering
  const dummyVisits = `${((tool.name.length * 17) % 80) + 15}k`;

  return (
    <Link
      href={`/tools/${tool.slug}`}
      className="group relative flex h-full flex-col gap-5 rounded-[24px] border border-[#232326] bg-[#131316] p-6 transition-all duration-250 hover:-translate-y-1.5 hover:border-[#6E56CF] hover:shadow-[0_0_30px_rgba(110,86,207,0.12)] focus-visible:outline-2 focus-visible:outline-[#6E56CF]/50"
    >
      {/* Top Row: Logo & Bookmark */}
      <div className="flex items-center justify-between">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-[#232326] bg-[#18181C] p-2 transition-transform duration-300 group-hover:scale-105">
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

      {/* Developer & Name */}
      <div className="space-y-1.5">
        <div className="flex items-center gap-2 text-[10px] font-bold tracking-wider text-[#71717A] uppercase select-none">
          <span>{tool.company?.name || "Independent"}</span>
          {primaryCategory && (
            <>
              <span>•</span>
              <span className="text-[#A1A1AA]">{primaryCategory.name}</span>
            </>
          )}
        </div>
        <h3 className="text-lg font-bold tracking-tight text-white transition-colors group-hover:text-[#8B7DFF]">
          {tool.name}
        </h3>
      </div>

      {/* Short Description */}
      <p className="line-clamp-2 min-h-[40px] text-xs text-[#A1A1AA] leading-relaxed">
        {tool.description}
      </p>

      {/* Categories / Tags Pills row */}
      <div className="flex flex-wrap items-center gap-1.5 pt-1">
        {tool.categories.slice(0, 2).map(({ category }) => (
          <span 
            key={category.slug} 
            className="text-[10px] font-medium px-2.5 py-0.5 rounded-full bg-[#18181C] text-[#A1A1AA] border border-[#232326]/60"
          >
            {category.name}
          </span>
        ))}
      </div>

      {/* Divider line */}
      <div className="w-full border-t border-[#232326]/60 my-1" />

      {/* Bottom Row: Rating, Visits, Pricing & Launch */}
      <div className="flex items-center justify-between mt-auto">
        <div className="flex items-center gap-3">
          {/* Rating */}
          <div className="flex items-center gap-1 text-[11px] font-mono text-[#A1A1AA] select-none">
            <Star size={12} className="fill-[#6E56CF] text-[#6E56CF]" />
            <span>{tool.avgRating ? tool.avgRating.toFixed(1) : "5.0"}</span>
          </div>
          {/* Visits */}
          <div className="text-[11px] font-mono text-[#71717A] select-none">
            <span>{dummyVisits} visits</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Pricing Badge */}
          <div className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#6E56CF]/10 text-[#8B7DFF] border border-[#6E56CF]/25 uppercase tracking-wide select-none">
            {tool.pricingModel.replace("_", " ")}
          </div>

          {/* Launch button */}
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#18181C] border border-[#232326] text-[#A1A1AA] group-hover:bg-[#6E56CF] group-hover:border-transparent group-hover:text-white transition-all duration-300">
            <ArrowUpRight size={13} />
          </span>
        </div>
      </div>
    </Link>
  );
}