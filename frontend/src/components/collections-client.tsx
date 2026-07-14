'use client';

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CategoryMenu } from "@/components/CategoryMenu";
import { CollectionGrid } from "@/components/CollectionGrid";
import { API_URL } from "@/lib/api";

export function CollectionsClient() {
  const searchParams = useSearchParams();

  const [items, setItems] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [categoryCounts, setCategoryCounts] = useState<Record<string, number>>({});
  const [isLoading, setIsLoading] = useState(true);

  const params = {
    category: searchParams.get("category") || undefined,
    page: searchParams.get("page") || undefined,
  };

  useEffect(() => {
    async function fetchCollections() {
      setIsLoading(true);
      try {
        const query = new URLSearchParams();
        if (params.category) query.set("category", params.category);
        if (params.page) query.set("page", params.page);

        const res = await fetch(`${API_URL}/api/v1/collections?${query.toString()}`);
        if (res.ok) {
          const data = await res.json();
          setItems(data.items || []);
          setTotal(data.pagination?.total || 0);
          setCategoryCounts(data.categoryCounts || {});
        }
      } catch (error) {
        console.error("Failed to fetch collections:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCollections();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams.toString()]);

  return (
    <main className="mx-auto max-w-container px-6 py-10">
      <header className="mb-8">
        <h1 className="text-2xl font-semibold text-foreground">Collections</h1>
        <p className="mt-1 text-sm text-foreground-muted">
          {total} curated bundle{total === 1 ? "" : "s"} of the best AI tools
        </p>
      </header>

      <div className="mb-8 rounded-lg border border-border bg-surface p-5">
        <CategoryMenu categoryCounts={categoryCounts} />
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-40 animate-pulse rounded-xl border border-[#232326] bg-[#131316]" />
          ))}
        </div>
      ) : (
        <CollectionGrid collections={items} />
      )}
    </main>
  );
}
