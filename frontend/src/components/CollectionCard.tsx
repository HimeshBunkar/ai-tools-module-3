import Link from "next/link";
import Image from "next/image";
import ArrowUpRight from 'lucide-react/dist/esm/icons/arrow-up-right';
import type { CollectionListItem } from "@/lib/types";

export function CollectionCard({ collection }: { collection: CollectionListItem }) {
  return (
    <Link
      href={`/collections/${collection.slug}`}
      className="group flex flex-col justify-between rounded-lg border border-border bg-surface p-5 transition-colors hover:border-accent/50"
    >
      <div>
        <div className="mb-4 flex items-center gap-1.5">
          {collection.previewLogos.slice(0, 4).map((logo, i) =>
            logo ? (
              <div
                key={i}
                className="relative h-9 w-9 overflow-hidden rounded-lg border border-border bg-surface-raised"
                style={{ marginLeft: i === 0 ? 0 : -12 }}
              >
                <Image src={logo} alt="" fill sizes="36px" className="object-contain p-1" unoptimized />
              </div>
            ) : null
          )}
          {collection.featured && (
            <span className="ml-auto rounded-full bg-accent/10 px-2.5 py-1 text-xs font-medium text-accent">
              Featured
            </span>
          )}
        </div>

        <h3 className="font-medium text-foreground group-hover:text-accent transition-colors">
          {collection.title}
        </h3>
        <p className="mt-1.5 line-clamp-2 text-sm text-foreground-muted">{collection.description}</p>
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-border pt-4 text-xs">
        <span className="text-foreground-muted">{collection.toolCount} tools</span>
        <span className="flex items-center gap-1 font-medium text-foreground-muted group-hover:text-accent transition-colors">
          View collection
          <ArrowUpRight size={13} />
        </span>
      </div>
    </Link>
  );
}
