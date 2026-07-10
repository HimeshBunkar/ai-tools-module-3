import type { Metadata } from "next";
export const dynamic = "force-dynamic";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { getToolBySlug, getSimilarTools, getToolReviews } from "@/lib/tools";
import { isToolBookmarked } from "@/lib/actions";
import { PricingBadge } from "@/components/PricingBadge";
import { CategoryChip } from "@/components/CategoryChip";
import { RatingStars } from "@/components/RatingStars";
import { BookmarkButton } from "@/components/BookmarkButton";
import { ToolCard } from "@/components/ToolCard";
import { ToolTabs } from "@/components/ToolTabs";
import { StickyCTA } from "@/components/StickyCTA";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = await getToolBySlug(slug);
  if (!tool) return { title: "Tool not found" };

  const title = `${tool.name} — AI Tool Details, Pricing & Reviews`;
  const description = tool.description;

  return {
    title,
    description,
    openGraph: { title, description, type: "website", images: tool.logoUrl ? [tool.logoUrl] : undefined },
    twitter: { card: "summary", title, description },
    alternates: { canonical: `/tools/${tool.slug}` },
  };
}

export default async function ToolDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const tool = await getToolBySlug(slug);
  if (!tool) notFound();

  const [similarTools, reviews, bookmarked] = await Promise.all([
    getSimilarTools(tool.id, 4),
    getToolReviews(tool.id),
    isToolBookmarked(tool.id),
  ]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.name,
    description: tool.description,
    applicationCategory: tool.categories[0]?.category.name ?? "AI Tool",
    url: tool.websiteUrl,
    ...(tool.avgRating
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: tool.avgRating,
            reviewCount: tool.reviewCount,
          },
        }
      : {}),
  };

  return (
    <main className="mx-auto max-w-container px-4 py-6 md:px-6 md:py-10 relative overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-0 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl pointer-events-none z-0"></div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />

      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="mb-4 md:mb-6 text-sm text-foreground-faint relative z-10">
        <Link href="/tools" className="hover:text-foreground transition-colors">
          AI Tools
        </Link>
        <span className="mx-2">/</span>
        <span className="text-foreground-muted">{tool.name}</span>
      </nav>

      {/* Premium Glassmorphic Header */}
      <header className="relative z-10 flex flex-col gap-6 rounded-xl border border-border/80 bg-surface/40 p-4 md:p-6 backdrop-blur-md shadow-2xl shadow-black/30 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-4 xs:flex-row xs:items-start sm:gap-4">
          {/* Logo with Radial Glow backdrop */}
          <div className="relative flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-border/60 bg-white/95 p-2.5 shadow-xl shadow-black/20 self-start xs:self-auto">
            {tool.logoUrl ? (
              <Image
                src={tool.logoUrl}
                alt={`${tool.name} logo`}
                width={80}
                height={80}
                className="h-full w-full object-contain"
                priority
              />
            ) : (
              <span className="text-2xl font-bold text-neutral-900 select-none">
                {tool.name.charAt(0)}
              </span>
            )}
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
              {tool.name}
            </h1>

            {tool.company && (
              <p className="text-xs text-foreground-muted">
                by{" "}
                <span className="text-foreground font-semibold">
                  {tool.company.name}
                </span>
              </p>
            )}

            <div className="flex flex-col gap-2 pt-1.5 sm:flex-row sm:items-center sm:gap-2">
              <div className="flex flex-wrap items-center gap-1.5">
                <PricingBadge
                  pricingModel={tool.pricingModel}
                  pricingAmount={tool.pricingAmount}
                  billingFrequency={tool.billingFrequency}
                />
                {tool.categories.map(({ category }) => (
                  <CategoryChip
                    key={category.slug}
                    label={category.name}
                    href={`/tools?category=${category.slug}`}
                  />
                ))}
              </div>
            </div>

            <div className="pt-1">
              <RatingStars
                rating={tool.avgRating}
                reviewCount={tool.reviewCount}
                size="md"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 w-full sm:w-auto mt-2 sm:mt-0">
          <BookmarkButton
            toolId={tool.id}
            toolSlug={tool.slug}
            initialBookmarked={bookmarked}
            initialCount={tool._count.bookmarks}
            className="w-full sm:w-auto justify-center py-2.5 sm:py-1.5"
          />

          <a
            href={tool.websiteUrl}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="inline-flex w-full sm:w-auto justify-center items-center gap-1.5 rounded-lg bg-accent px-4 py-2.5 sm:py-2 text-sm font-semibold text-white shadow-lg shadow-accent/20 transition-all hover:bg-accent-hover hover:-translate-y-0.5"
          >
            Visit Website
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </div>
      </header>

      {/* Main Content Layout */}
      <div className="mt-8 flex flex-col gap-8 lg:flex-row relative z-10 pb-20 md:pb-0">
        {/* Left Interactive Tabs column */}
        <div className="flex-1 min-w-0">
          <ToolTabs tool={tool} reviews={reviews} />
        </div>

        {/* Right Sidebar */}
        {similarTools.length > 0 && (
          <aside
            className="w-full shrink-0 lg:w-80 space-y-4"
            aria-labelledby="similar-heading"
          >
            <h2
              id="similar-heading"
              className="text-lg font-bold text-foreground border-b border-border/40 pb-2 flex items-center gap-2"
            >
              Similar Tools
            </h2>

            <div role="list" className="flex flex-col gap-4">
              {similarTools.map((similar) => (
                <div key={similar.id} role="listitem">
                  <ToolCard tool={similar} />
                </div>
              ))}
            </div>
          </aside>
        )}
      </div>

      {/* Floating Sticky CTA on mobile screens */}
      <StickyCTA
        name={tool.name}
        logoUrl={tool.logoUrl}
        websiteUrl={tool.websiteUrl}
        avgRating={tool.avgRating}
        reviewCount={tool.reviewCount}
      />
    </main>
  );
}