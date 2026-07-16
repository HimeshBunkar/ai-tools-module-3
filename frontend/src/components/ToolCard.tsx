import Image from "next/image";
import Link from "next/link";
import Bookmark from 'lucide-react/dist/esm/icons/bookmark';
import { PricingBadge } from "@/components/PricingBadge";
import { CategoryChip } from "@/components/CategoryChip";
import { RatingStars } from "@/components/RatingStars";
import type { ToolCardData } from "@/lib/types";

export function ToolCard({ tool }: { tool: ToolCardData }) {
  const primaryCategory = tool.categories[0]?.category;

  return (
    <Link
      href={`/tools/${tool.slug}`}
      className="group flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between py-4 px-5 transition-all hover:bg-[#18181C]/40 focus-visible:bg-[#18181C]/40 focus-visible:outline-none"
    >
      {/* Left section: Logo + Title/Description */}
      <div className="flex items-start gap-4 flex-1 min-w-0">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-border bg-white p-2">
          {tool.logoUrl ? (
            <Image
              src={tool.logoUrl}
              alt={`${tool.name} logo`}
              width={48}
              height={48}
              className="h-full w-full object-contain"
            />
          ) : (
            <span className="text-base font-bold text-neutral-900">
              {tool.name.charAt(0)}
            </span>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3">
            <h3 className="font-bold text-white text-base truncate group-hover:text-white transition-colors">
              {tool.name}
            </h3>
            <Bookmark size={16} className="shrink-0 text-foreground-faint group-hover:text-accent transition-colors" aria-hidden="true" />
          </div>

          {/* Inline info row */}
          <div className="flex flex-wrap items-center gap-3 mt-1 text-[11px] text-[#71717A]">
            {primaryCategory && (
              <span className="font-semibold text-[#8F8F94]">{primaryCategory.name}</span>
            )}
            <span className="h-1 w-1 rounded-full bg-[#232326]" />
            <RatingStars rating={tool.avgRating} reviewCount={tool._count.reviews} />
            <span className="h-1 w-1 rounded-full bg-[#232326]" />
            <span>{tool._count.bookmarks} saves</span>
          </div>

          <p className="text-xs text-[#A1A1AA] line-clamp-2 mt-2 max-w-2xl leading-relaxed">
            {tool.description}
          </p>
        </div>
      </div>

      {/* Right section: Pricing + Badges */}
      <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-3 w-full sm:w-auto shrink-0 border-t border-[#232326]/60 sm:border-t-0 pt-4 sm:pt-0 mt-4 sm:mt-0">
        <div className="flex flex-wrap items-center gap-2">
          <PricingBadge
            pricingModel={tool.pricingModel}
            pricingAmount={tool.pricingAmount}
            billingFrequency={tool.billingFrequency}
          />
          {tool.categories.slice(1, 2).map(({ category }) => (
            <CategoryChip key={category.slug} label={category.name} />
          ))}
        </div>
        
        <span className="text-[11px] font-semibold text-[#71717A] hover:text-white transition-colors sm:block hidden">
          View details &rarr;
        </span>
      </div>
    </Link>
  );
}
