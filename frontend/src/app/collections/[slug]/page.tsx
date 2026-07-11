import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Star, ExternalLink } from "lucide-react";
import { getCollectionDetail } from "@/lib/collections";
import { CollectionGrid } from "@/components/CollectionGrid";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = await getCollectionDetail(slug);
  if (!data?.collection) return { title: "Collection not found" };

  return {
    title: `${data.collection.title} — Collections`,
    description: data.collection.description,
  };
}

export default async function CollectionDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const data = await getCollectionDetail(slug);

  if (!data?.collection) notFound();

  const { collection, related } = data;

  return (
    <main className="mx-auto max-w-container px-6 py-10">
      <Link
        href="/collections"
        className="inline-flex items-center gap-1.5 text-sm text-foreground-muted hover:text-accent transition-colors"
      >
        <ArrowLeft size={15} />
        All collections
      </Link>

      <div className="mt-6 border-b border-border pb-8">
        <h1 className="text-2xl font-semibold text-foreground sm:text-3xl">{collection.title}</h1>
        <p className="mt-3 max-w-2xl text-foreground-muted">{collection.description}</p>
        <div className="mt-4 flex items-center gap-4 text-xs text-foreground-muted">
          <span>{collection.curatedBy}</span>
          <span>{collection.toolCount} tools</span>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {collection.tools.map((tool: any) => (
          <div
            key={tool.id}
            className="flex flex-col rounded-lg border border-border bg-surface p-5"
          >
            <div className="flex items-center gap-3">
              {tool.logoUrl && (
                <div className="relative h-10 w-10 overflow-hidden rounded-lg bg-surface-raised">
                  <Image src={tool.logoUrl} alt="" fill sizes="40px" className="object-contain p-1" unoptimized />
                </div>
              )}
              <div>
                <h4 className="font-medium text-foreground">{tool.name}</h4>
                {tool.avgRating != null && (
                  <div className="flex items-center gap-1 text-xs text-foreground-muted">
                    <Star size={11} className="fill-current" />
                    {tool.avgRating.toFixed(1)}
                  </div>
                )}
              </div>
            </div>
            <p className="mt-3 line-clamp-2 text-sm text-foreground-muted">{tool.description}</p>
            <a
              href={tool.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 flex items-center justify-center gap-1.5 rounded-md border border-border px-3 py-2 text-xs font-medium text-foreground-muted transition-colors hover:border-accent/50 hover:text-accent"
            >
              Visit website
              <ExternalLink size={12} />
            </a>
          </div>
        ))}
      </div>

      {related.length > 0 && (
        <section className="mt-14">
          <h2 className="text-lg font-semibold text-foreground">Related collections</h2>
          <div className="mt-4">
            <CollectionGrid collections={related} />
          </div>
        </section>
      )}
    </main>
  );
}
