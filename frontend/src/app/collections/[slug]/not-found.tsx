import Link from "next/link";

export default function CollectionNotFound() {
  return (
    <main className="mx-auto flex max-w-container flex-col items-center justify-center gap-4 px-6 py-24 text-center">
      <h1 className="font-medium text-foreground">Collection not found</h1>
      <p className="text-sm text-foreground-muted">
        This collection may have been renamed or removed.
      </p>
      <Link
        href="/collections"
        className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accent-hover transition-colors"
      >
        Browse collections
      </Link>
    </main>
  );
}
