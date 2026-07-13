import Image from "next/image";
import Link from "next/link";
import { RatingStars } from "@/components/RatingStars";
import { PricingBadge } from "@/components/PricingBadge";
import type { SimilarToolData } from "@/lib/types";

export function SimilarTools({ tools }: { tools: SimilarToolData[] }) {
  if (tools.length === 0) return null;

  return (
    <section aria-labelledby="similar-tools-heading" className="flex flex-col gap-4">
      <h2 id="similar-tools-heading" className="text-lg font-semibold text-foreground">
        Similar tools
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {tools.map((tool) => (
          <Link
            key={tool.id}
            href={`/tools/${tool.slug}`}
            className="group flex gap-3 rounded-lg border border-border bg-surface p-4 transition-colors hover:border-accent"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-md bg-white">
              {tool.logoUrl ? (
                <Image
                  src={tool.logoUrl}
                  alt={`${tool.name} logo`}
                  width={40}
                  height={40}
                  className="h-full w-full object-contain p-1"
                />
              ) : (
                <span className="text-sm font-semibold text-foreground-muted">
                  {tool.name.charAt(0)}
                </span>
              )}
            </div>
            <div className="flex min-w-0 flex-col gap-1">
              <h3 className="truncate font-medium text-foreground group-hover:text-accent transition-colors">
                {tool.name}
              </h3>
              <p className="line-clamp-2 text-xs text-foreground-muted">{tool.description}</p>
              <div className="mt-1 flex items-center gap-2">
                <PricingBadge pricingModel={tool.pricingModel} />
                <RatingStars rating={tool.avgRating} size="sm" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
