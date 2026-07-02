import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ReviewData } from "@/lib/types";

type RatingHistogramProps = {
  reviews: ReviewData[];
  avgRating: number | null;
  reviewCount: number;
};

export function RatingHistogram({ reviews, avgRating, reviewCount }: RatingHistogramProps) {
  // Star levels from 5 down to 1
  const stars = [5, 4, 3, 2, 1];
  
  // Calculate distribution
  const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  reviews.forEach((r) => {
    const star = Math.max(1, Math.min(5, Math.round(r.rating))) as 5 | 4 | 3 | 2 | 1;
    counts[star]++;
  });

  const totalReviews = reviews.length;

  return (
    <div className="rounded-xl border border-border bg-surface/30 p-5 backdrop-blur-md shadow-lg">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Visual average rating card */}
        <div className="md:col-span-4 text-center p-4 border-b border-border md:border-b-0 md:border-r border-border/80 flex flex-col items-center justify-center">
          <div className="text-5xl font-extrabold text-foreground mb-1">
            {avgRating !== null ? avgRating.toFixed(1) : "0.0"}
          </div>
          <div className="flex items-center gap-0.5 mb-2">
            {[1, 2, 3, 4, 5].map((val) => (
              <Star
                key={val}
                size={16}
                className={cn(
                  avgRating !== null && val <= Math.round(avgRating)
                    ? "fill-pricing-trial text-pricing-trial"
                    : "text-border"
                )}
                aria-hidden="true"
              />
            ))}
          </div>
          <div className="text-xs text-foreground-muted">
            Based on {reviewCount} {reviewCount === 1 ? "review" : "reviews"}
          </div>
        </div>

        {/* Histogram distribution */}
        <div className="md:col-span-8 space-y-2">
          {stars.map((starNum) => {
            const count = counts[starNum as 5 | 4 | 3 | 2 | 1];
            const pct = totalReviews > 0 ? Math.round((count / totalReviews) * 100) : 0;
            
            return (
              <div key={starNum} className="flex items-center gap-3 text-xs">
                <span className="w-12 text-foreground-muted font-medium hover:text-foreground transition-colors flex items-center gap-0.5 select-none shrink-0">
                  {starNum} <Star size={10} className="fill-foreground-faint text-foreground-faint shrink-0" />
                </span>
                <div className="h-2 flex-1 rounded-full bg-border overflow-hidden">
                  <div
                    style={{ width: `${pct}%` }}
                    className={cn(
                      "h-full rounded-full transition-all duration-500",
                      starNum >= 4 ? "bg-pricing-trial" : starNum === 3 ? "bg-pricing-freemium" : "bg-danger"
                    )}
                  ></div>
                </div>
                <span className="w-8 text-right text-foreground-faint font-semibold tracking-wide shrink-0">
                  {pct}%
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
