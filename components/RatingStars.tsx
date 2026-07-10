import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

type RatingStarsProps = {
  rating: number | null;
  reviewCount?: number;
  size?: "sm" | "md";
  className?: string;
};

export function RatingStars({ rating, reviewCount, size = "sm", className }: RatingStarsProps) {
  const iconSize = size === "sm" ? 14 : 18;

  if (rating === null) {
    return (
      <span className={cn("text-xs text-foreground-faint", className)}>No reviews yet</span>
    );
  }

  return (
    <span className={cn("inline-flex items-center gap-1", className)}>
      <Star size={iconSize} className="fill-white text-white" aria-hidden="true" />
      <span className="text-sm font-medium text-foreground">{rating.toFixed(1)}</span>
      {typeof reviewCount === "number" && (
        <span className="text-xs text-foreground-faint">({reviewCount})</span>
      )}
    </span>
  );
}