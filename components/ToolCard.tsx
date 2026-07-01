import Image from "next/image";
import Link from "next/link";
import { Bookmark } from "lucide-react";
import { PricingBadge } from "@/components/PricingBadge";
import { CategoryChip } from "@/components/CategoryChip";
import { RatingStars } from "@/components/RatingStars";
import type { ToolCardData } from "@/lib/types";

export function ToolCard({ tool }: { tool: ToolCardData }) {
  const primaryCategory = tool.categories[0]?.category;

  return (
    <Link
      href={`/tools/${tool.slug}`}
      className="group flex h-full flex-col gap-3 rounded-lg border border-border bg-surface p-4 transition-all hover:-translate-y-0.5 hover:border-accent hover:shadow-lg hover:shadow-black/20 focus-visible:outline-2 focus-visible:outline-accent"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-md border border-border bg-white p-1.5">
            {tool.logoUrl ? (
              <Image
                src={tool.logoUrl}
                alt={`${tool.name} logo`}
                width={44}
                height={44}
                className="h-full w-full object-contain"
              />
            ) : (
              <span className="text-sm font-semibold text-neutral-900">
                {tool.name.charAt(0)}
              </span>
            )}
          </div>
          <div className="min-w-0">
            <h3 className="truncate font-medium text-foreground transition-colors group-hover:text-accent">
              {tool.name}
            </h3>
            {primaryCategory && (
              <span className="text-xs text-foreground-faint">{primaryCategory.name}</span>
            )}
          </div>
        </div>
        <Bookmark size={18} className="shrink-0 text-foreground-faint" aria-hidden="true" />
      </div>

      <p className="line-clamp-2 min-h-[2.5rem] text-sm text-foreground-muted">{tool.description}</p>

      <div className="flex flex-wrap items-center gap-2">
        <PricingBadge
          pricingModel={tool.pricingModel}
          pricingAmount={tool.pricingAmount}
          billingFrequency={tool.billingFrequency}
        />
        {tool.categories.slice(0, 2).map(({ category }) => (
          <CategoryChip key={category.slug} label={category.name} />
        ))}
      </div>

      <div className="mt-auto flex items-center justify-between border-t border-border pt-3">
        <RatingStars rating={tool.avgRating} reviewCount={tool._count.reviews} />
        <span className="text-xs text-foreground-faint">{tool._count.bookmarks} saves</span>
      </div>
    </Link>
  );
}