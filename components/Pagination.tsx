import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { buildToolsUrl, cn } from "@/lib/utils";
import type { ToolsSearchParams } from "@/lib/types";

type PaginationProps = {
  page: number;
  totalPages: number;
  params: ToolsSearchParams;
};

export function Pagination({ page, totalPages, params }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pageNumbers = getPageWindow(page, totalPages);

  return (
    <nav aria-label="Pagination" className="flex items-center justify-center gap-1 pt-4">
      <Link
        href={buildToolsUrl(params, { page: String(Math.max(1, page - 1)) })}
        aria-disabled={page === 1}
        aria-label="Previous page"
        className={cn(
          "flex h-8 w-8 items-center justify-center rounded-md border border-border text-foreground-muted transition-colors",
          page === 1
            ? "pointer-events-none opacity-40"
            : "hover:border-neutral-500 hover:text-foreground"
        )}
      >
        <ChevronLeft size={16} aria-hidden="true" />
      </Link>

      {pageNumbers.map((n, i) =>
        n === "ellipsis" ? (
          <span key={`e-${i}`} className="px-1 text-foreground-faint">
            …
          </span>
        ) : (
          <Link
            key={n}
            href={buildToolsUrl(params, { page: String(n) })}
            aria-current={n === page ? "page" : undefined}
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-md text-sm transition-colors",
              n === page
                ? "bg-white text-black font-semibold hover:bg-neutral-200"
                : "text-foreground-muted hover:bg-surface-raised hover:text-foreground"
            )}
          >
            {n}
          </Link>
        )
      )}

      <Link
        href={buildToolsUrl(params, { page: String(Math.min(totalPages, page + 1)) })}
        aria-disabled={page === totalPages}
        aria-label="Next page"
        className={cn(
          "flex h-8 w-8 items-center justify-center rounded-md border border-border text-foreground-muted transition-colors",
          page === totalPages
            ? "pointer-events-none opacity-40"
            : "hover:border-neutral-500 hover:text-foreground"
        )}
      >
        <ChevronRight size={16} aria-hidden="true" />
      </Link>
    </nav>
  );
}

function getPageWindow(page: number, totalPages: number): (number | "ellipsis")[] {
  const window = 1;
  const pages: (number | "ellipsis")[] = [];

  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= page - window && i <= page + window)) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== "ellipsis") {
      pages.push("ellipsis");
    }
  }

  return pages;
}