"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { buildToolsUrl } from "@/lib/utils";

const SORT_OPTIONS = [
  { value: "newest", label: "Newest" },
  { value: "oldest", label: "Oldest" },
  { value: "rating", label: "Top Rated" },
  { value: "name-asc", label: "Name (A-Z)" },
  { value: "name-desc", label: "Name (Z-A)" },
] as const;

export function SortDropdown() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const current = Object.fromEntries(searchParams.entries());

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="sort-select" className="text-sm text-foreground-muted">
        Sort by
      </label>
      <select
        id="sort-select"
        value={current.sort ?? "newest"}
        onChange={(e) => {
          const url = buildToolsUrl(current, { sort: e.target.value, page: null });
          router.push(url);
        }}
        className="rounded-md border border-border bg-surface px-3 py-1.5 text-sm text-foreground focus:border-accent focus:outline-none"
      >
        {SORT_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}