'use client';

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { PageShell } from "@/components/news/PageShell";
import { NewsListingClient } from "@/components/news/NewsListingClient";
import { API_URL } from "@/lib/api";
import type { NewsArticle, NewsCategory, NewsFilterChip, NewsSource } from "@/types/news";

interface NewsListingResponse {
  articles: NewsArticle[];
  sources: Record<string, NewsSource>;
  categories: NewsCategory[];
  filterChips: NewsFilterChip[];
}

export function NewsPageClient() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category") || undefined;
  const topic = searchParams.get("topic") || undefined;

  const [data, setData] = useState<NewsListingResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchNews() {
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetch(`${API_URL}/api/news`);
        if (!res.ok) throw new Error(`Failed to load news: ${res.status}`);
        const json: NewsListingResponse = await res.json();
        setData(json);
      } catch (e: any) {
        console.error("Failed to fetch news:", e);
        setError(e.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchNews();
  }, []);

  if (isLoading) {
    return (
      <PageShell>
        <div className="space-y-4 py-10">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-20 animate-pulse rounded-lg border border-[#232326] bg-[#131316]" />
          ))}
        </div>
      </PageShell>
    );
  }

  if (error || !data) {
    return (
      <PageShell>
        <div className="py-10 text-center text-sm text-[#A1A1AA]">
          Failed to load news. Please try again later.
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <NewsListingClient
        articles={data.articles}
        sources={data.sources}
        categories={data.categories}
        filterChips={data.filterChips}
        category={category}
        initialTopic={topic}
      />
    </PageShell>
  );
}
