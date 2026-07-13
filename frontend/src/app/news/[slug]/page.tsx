import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/news/PageShell";
import { ArticleDetail } from "@/components/news/ArticleDetail";
import { SERVER_API_URL } from "@/lib/api";
import type { NewsArticle, NewsComment, NewsSource } from "@/types/news";

export const dynamic = "force-dynamic";
export const runtime = "edge";

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

interface NewsDetailResponse {
  article: NewsArticle;
  related: NewsArticle[];
  sources: Record<string, NewsSource>;
  popularSources: string[];
  comments: NewsComment[];
}

// No generateStaticParams/ISR pre-warming here — the old app pre-rendered
// the newest ~40 slugs at build time against a direct DB connection, which
// doesn't apply now that the frontend has no DB access at all (see
// API_URL). Every slug renders on first request instead; functionally
// identical, just without that build-time optimization.
async function fetchArticle(slug: string): Promise<NewsDetailResponse | null> {
  const res = await fetch(`${SERVER_API_URL}/api/news/${encodeURIComponent(slug)}`, { cache: "no-store" });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`Failed to load article: ${res.status}`);
  return res.json();
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = await fetchArticle(slug);
  if (!data) return { title: "Story not found — The AI Signal" };
  return {
    title: `${data.article.headline} — The AI Signal`,
    description: data.article.dek,
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const data = await fetchArticle(slug);

  if (!data) {
    notFound();
  }

  return (
    <PageShell>
      <ArticleDetail
        article={data.article}
        related={data.related}
        sources={data.sources}
        popularSources={data.popularSources}
        comments={data.comments}
      />
    </PageShell>
  );
}
