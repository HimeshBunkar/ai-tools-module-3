import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { getToolBySlug, getSimilarTools, getToolReviews } from "@/lib/tools";
import { isToolBookmarked } from "@/lib/actions";
import { PricingBadge } from "@/components/PricingBadge";
import { CategoryChip, TagChip } from "@/components/CategoryChip";
import { RatingStars } from "@/components/RatingStars";
import { BookmarkButton } from "@/components/BookmarkButton";
import { ReviewForm } from "@/components/ReviewForm";
import { ReviewList } from "@/components/ReviewList";
import { ToolCard } from "@/components/ToolCard";

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
    <main className="mx-auto max-w-container px-6 py-10">
      {/* eslint-disable-next-line react/no-danger */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />

      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-foreground-faint">
        <Link href="/tools" className="hover:text-foreground">
          AI Tools
        </Link>
        <span className="mx-2">/</span>
        <span className="text-foreground-muted">{tool.name}</span>
      </nav>

      <header className="flex flex-col gap-6 rounded-lg border border-border bg-surface p-6 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-4">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-border bg-white p-2">
            {tool.logoUrl ? (
              <Image
                src={tool.logoUrl}
                alt={`${tool.name} logo`}
                width={64}
                height={64}
                className="h-full w-full object-contain"
                priority
              />
            ) : (
              <span className="text-xl font-semibold text-neutral-900">
                {tool.name.charAt(0)}
              </span>
            )}
          </div>

          <div>
            <h1 className="text-2xl font-semibold text-foreground">
              {tool.name}
            </h1>

            {tool.company && (
              <p className="mt-0.5 text-sm text-foreground-muted">
                by{" "}
                <span className="text-foreground">
                  {tool.company.name}
                </span>
              </p>
            )}

            <div className="mt-3 flex flex-wrap items-center gap-2">
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

            <div className="mt-3">
              <RatingStars
                rating={tool.avgRating}
                reviewCount={tool.reviewCount}
                size="md"
              />
            </div>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <BookmarkButton
            toolId={tool.id}
            toolSlug={tool.slug}
            initialBookmarked={bookmarked}
            initialCount={tool._count.bookmarks}
          />

          <a
            href={tool.websiteUrl}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="inline-flex items-center gap-1.5 rounded-md bg-accent px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
          >
            Visit Website
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </div>
      </header>

      <div className="mt-8 flex flex-col gap-8 lg:flex-row">
        <div className="flex-1 space-y-8">
          <section aria-labelledby="about-heading">
            <h2
              id="about-heading"
              className="mb-3 text-lg font-semibold text-foreground"
            >
              About {tool.name}
            </h2>

            <p className="text-sm leading-relaxed text-foreground-muted">
              {tool.description}
            </p>
          </section>

          {tool.features.length > 0 && (
            <section aria-labelledby="features-heading">
              <h2
                id="features-heading"
                className="mb-3 text-lg font-semibold text-foreground"
              >
                Key features
              </h2>

              <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {tool.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2 rounded-md border border-border bg-surface px-3 py-2 text-sm text-foreground-muted"
                  >
                    <Sparkles
                      size={14}
                      className="shrink-0 text-accent"
                      aria-hidden="true"
                    />
                    {feature}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {tool.tags.length > 0 && (
            <section aria-labelledby="tags-heading">
              <h2
                id="tags-heading"
                className="mb-3 text-lg font-semibold text-foreground"
              >
                Tags
              </h2>

              <div className="flex flex-wrap gap-2">
                {tool.tags.map(({ tag }) => (
                  <TagChip
                    key={tag.slug}
                    label={tag.name}
                  />
                ))}
              </div>
            </section>
          )}

          <section aria-labelledby="reviews-heading">
            <h2
              id="reviews-heading"
              className="mb-3 text-lg font-semibold text-foreground"
            >
              Reviews {tool.reviewCount > 0 && `(${tool.reviewCount})`}
            </h2>

            <div className="mb-4">
              <ReviewForm
                toolId={tool.id}
                toolSlug={tool.slug}
              />
            </div>

            <ReviewList reviews={reviews} />
          </section>
        </div>

        {similarTools.length > 0 && (
          <aside
            className="w-full shrink-0 lg:w-80"
            aria-labelledby="similar-heading"
          >
            <h2
              id="similar-heading"
              className="mb-3 text-lg font-semibold text-foreground"
            >
              Similar tools
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
    </main>
  );
}