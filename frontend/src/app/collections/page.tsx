import type { Metadata } from "next";
export const dynamic = "force-dynamic";
export const runtime = "edge";
import { getCollections } from "@/lib/collections";
import { CategoryMenu } from "@/components/CategoryMenu";
import { CollectionGrid } from "@/components/CollectionGrid";
import type { CollectionsSearchParams } from "@/lib/types";

export const metadata: Metadata = {
  title: "Collections — Curated AI Tool Bundles",
  description:
    "Hand-picked bundles of the best AI tools, grouped by what you're trying to get done — build, run a business, create, or research.",
  openGraph: {
    title: "Collections — Curated AI Tool Bundles",
    description: "Hand-picked bundles of the best AI tools, grouped by task.",
    type: "website",
  },
  alternates: {
    canonical: "/collections",
  },
};

type PageProps = {
  searchParams: Promise<CollectionsSearchParams>;
};

export default async function CollectionsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const { items, pagination, categoryCounts } = await getCollections(params);

  return (
    <main className="mx-auto max-w-container px-6 py-10">
      <header className="mb-8">
        <h1 className="text-2xl font-semibold text-foreground">Collections</h1>
        <p className="mt-1 text-sm text-foreground-muted">
          {pagination.total} curated bundle{pagination.total === 1 ? "" : "s"} of the best AI tools
        </p>
      </header>

      <div className="mb-8 rounded-lg border border-border bg-surface p-5">
        <CategoryMenu categoryCounts={categoryCounts ?? {}} />
      </div>

      <CollectionGrid collections={items} />
    </main>
  );
}
