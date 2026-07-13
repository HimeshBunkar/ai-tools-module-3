import type { Metadata } from "next";
import { PageShell } from "@/components/news/PageShell";
import { NewsListingClient } from "@/components/news/NewsListingClient";
import { API_URL } from "@/lib/api";
import type { NewsArticle, NewsCategory, NewsFilterChip, NewsSource } from "@/types/news";

export const dynamic = "force-dynamic";
export const runtime = "edge";

export const metadata: Metadata = {
  title: "AI News — The AI Signal",
  description: "AI news across the AI ecosystem — models, research, funding, and policy.",
};

interface NewsListingResponse {
  articles: NewsArticle[];
  sources: Record<string, NewsSource>;
  categories: NewsCategory[];
  filterChips: NewsFilterChip[];
}

interface NewsPageProps {
  searchParams: Promise<{ category?: string; topic?: string }>;
}

export default async function NewsPage({ searchParams }: NewsPageProps) {
  const { category, topic } = await searchParams;

  const res = await fetch(`${API_URL}/api/news`, { cache: "no-store" });
  if (!res.ok) throw new Error(`Failed to load news: ${res.status}`);
  const { articles, sources, categories, filterChips }: NewsListingResponse = await res.json();

  return (
    <PageShell>
      <NewsListingClient
        articles={articles}
        sources={sources}
        categories={categories}
        filterChips={filterChips}
        category={category}
        initialTopic={topic}
      />
    </PageShell>
  );
}
