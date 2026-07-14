import type { Metadata } from "next";
import { Suspense } from "react";
import { CollectionsClient } from "@/components/collections-client";

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

export default function CollectionsPage() {
  return (
    <Suspense fallback={
      <main className="mx-auto max-w-container px-6 py-10">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-40 animate-pulse rounded-xl border border-[#232326] bg-[#131316]" />
          ))}
        </div>
      </main>
    }>
      <CollectionsClient />
    </Suspense>
  );
}
