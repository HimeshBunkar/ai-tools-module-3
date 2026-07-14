import { Star, MessageSquareOff } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ReviewData } from "@/lib/types";

function initials(name: string | null) {
  if (!name) return "?";
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function formatDate(dateStr: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(dateStr));
}

export function ReviewList({ reviews }: { reviews: ReviewData[] }) {
  if (reviews.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 rounded-lg border border-dashed border-border py-10 text-center">
        <MessageSquareOff size={24} className="text-foreground-faint" aria-hidden="true" />
        <p className="text-sm text-foreground-muted">No reviews yet — be the first to share your experience.</p>
      </div>
    );
  }

  return (
    <ul className="flex flex-col gap-4">
      {reviews.map((review) => (
        <li key={review.id} className="rounded-lg border border-border bg-surface p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-surface-raised text-xs font-semibold text-foreground-muted">
                {initials(review.user.name)}
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{review.user.name ?? "Anonymous"}</p>
                <p className="text-xs text-foreground-faint">{formatDate(review.createdAt)}</p>
              </div>
            </div>
            <div className="flex items-center gap-0.5" aria-label={`${review.rating} out of 5 stars`}>
              {[1, 2, 3, 4, 5].map((value) => (
                <Star
                  key={value}
                  size={14}
                  className={cn(value <= review.rating ? "fill-pricing-trial text-pricing-trial" : "text-border")}
                  aria-hidden="true"
                />
              ))}
            </div>
          </div>
          <p className="mt-3 text-sm text-foreground-muted">{review.comment}</p>
        </li>
      ))}
    </ul>
  );
}
