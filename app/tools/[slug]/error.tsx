"use client";

import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";

export default function ToolDetailError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="mx-auto flex max-w-container flex-col items-center justify-center gap-4 px-6 py-24 text-center">
      <AlertTriangle size={32} className="text-danger" aria-hidden="true" />
      <div>
        <h1 className="font-medium text-foreground">Couldn&apos;t load this tool</h1>
        <p className="mt-1 text-sm text-foreground-muted">
          Something went wrong loading this tool&apos;s details. Please try again.
        </p>
      </div>
      <button
        onClick={reset}
        className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accent-hover transition-colors"
      >
        Retry
      </button>
    </main>
  );
}