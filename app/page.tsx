import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
      <p className="text-sm text-foreground-muted">
        Homepage is owned by Module 1. This is a placeholder entry point.
      </p>
      <Link
        href="/tools"
        className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accent-hover transition-colors"
      >
        Browse AI Tools →
      </Link>
    </main>
  );
}
