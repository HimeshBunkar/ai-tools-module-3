"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

// NOTE: This is deliberately an in-page component, not part of the shared
// root layout/header. The site's real top nav is shared infrastructure —
// this menu only concerns Collections' own category filtering and lives
// entirely inside app/collections/page.tsx.
const MENUS = [
  { emoji: "🚀", label: "Build", items: ["Agents", "Coding", "Developers", "Automation", "Data", "Productivity", "No-Code"] },
  { emoji: "💼", label: "Business", items: ["Marketing", "Sales", "HR", "Finance", "Legal", "Customer Service", "Recruiting", "Email", "Scheduling", "E-commerce"] },
  { emoji: "🎨", label: "Create", items: ["Writing", "Design", "Image", "Video", "Audio", "Social Media", "Translation", "Content"] },
  { emoji: "🔬", label: "Research", items: ["Research", "Healthcare", "Health", "Insurance", "Real Estate", "Career"] },
];

export function CategoryMenu({ categoryCounts }: { categoryCounts: Record<string, number> }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category");

  return (
    <div className="flex flex-wrap gap-6">
      {MENUS.map((menu) => (
        <div key={menu.label} className="min-w-[140px]">
          <div className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-foreground-muted">
            <span aria-hidden="true">{menu.emoji}</span>
            {menu.label}
          </div>
          <ul className="space-y-1">
            {menu.items.map((item) => {
              const isActive = activeCategory === item;
              const count = categoryCounts[item] ?? 0;
              return (
                <li key={item}>
                  <Link
                    href={isActive ? pathname : `${pathname}?category=${encodeURIComponent(item)}`}
                    className={cn(
                      "flex items-center justify-between rounded-md px-2 py-1 text-sm transition-colors",
                      isActive
                        ? "bg-accent/10 text-accent"
                        : "text-foreground-muted hover:bg-surface-raised hover:text-foreground"
                    )}
                  >
                    {item}
                    <span className="font-mono text-xs opacity-60">{count}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}
