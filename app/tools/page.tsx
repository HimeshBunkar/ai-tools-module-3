import type { Metadata } from "next";
import { getTools, getAllCategories } from "@/lib/tools";
import { SearchBar } from "@/components/SearchBar";
import { TopFilters } from "@/components/TopFilters";
import { SortDropdown } from "@/components/SortDropdown";
import { ToolGrid } from "@/components/ToolGrid";
import { Pagination } from "@/components/Pagination";
import type { ToolsSearchParams } from "@/lib/types";

export const metadata: Metadata = {
  title: "AI Tools — Browse the Full Directory",
  description:
    "Search and filter AI tools by category, pricing, and rating. Find the right tool for writing, coding, image generation, and more.",
  openGraph: {
    title: "AI Tools — Browse the Full Directory",
    description:
      "Search and filter AI tools by category, pricing, and rating.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "AI Tools — Browse the Full Directory",
    description: "Search and filter AI tools by category, pricing, and rating.",
  },
  alternates: {
    canonical: "/tools",
  },
};

type PageProps = {
  searchParams: Promise<ToolsSearchParams>;
};

export default async function ToolsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const [{ tools, total, page, totalPages }, categories] = await Promise.all([
    getTools(params),
    getAllCategories(),
  ]);

  return (
    <main className="mx-auto max-w-container px-6 py-10">
      <header className="mb-8 flex flex-col gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">AI Tools</h1>
          <p className="mt-1 text-sm text-foreground-muted">
            {total} tool{total === 1 ? "" : "s"} across every category
          </p>
        </div>
        <SearchBar defaultValue={params.q} />
      </header>

      {/* Horizontal Category & Pricing tag filters on top */}
      <TopFilters categories={categories} params={params} />

      <div className="space-y-6">
        <div className="flex items-center justify-end">
          <SortDropdown />
        </div>

        <ToolGrid tools={tools} />

        <Pagination page={page} totalPages={totalPages} params={params} />
      </div>
    </main>
  );
}