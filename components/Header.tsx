"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, ChevronDown } from "lucide-react";

export function Header() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchInput, setShowSearchInput] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/tools?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/20 bg-background/50 backdrop-blur-md py-3.5">
      <div className="mx-auto max-w-container px-6 flex items-center justify-between gap-4">
        {/* Left: Logo & Wordmark */}
        <Link href="/" className="flex items-center gap-2 group shrink-0">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-black font-black text-base transition-transform group-hover:scale-105 active:scale-95 shadow-sm border border-border">
            S
          </div>
          <span className="text-lg font-bold tracking-tight text-foreground transition-colors group-hover:text-white">
            The AI Signal
          </span>
        </Link>

        {/* Center: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6">
          <Link
            href="/tools"
            className="text-xs font-semibold text-foreground-muted hover:text-foreground transition-colors"
          >
            Category
          </Link>
          <button
            className="text-xs font-semibold text-foreground-muted hover:text-foreground transition-colors flex items-center gap-1"
          >
            <span>Ranking</span>
            <ChevronDown size={12} className="text-foreground-faint" />
          </button>
          <Link
            href="/tools"
            className="text-xs font-semibold text-foreground-muted hover:text-foreground transition-colors"
          >
            Articles
          </Link>
          <Link
            href="/tools"
            className="text-xs font-semibold text-foreground-muted hover:text-foreground transition-colors flex items-center gap-1.5 relative group"
          >
            <span>Submit & Promote</span>
            <span className="bg-accent/20 text-accent border border-accent/20 px-1 py-0.5 rounded text-[8px] font-bold tracking-wide uppercase">
              New
            </span>
          </Link>
        </nav>

        {/* Right: Language selection, Search Trigger, Login capsule */}
        <div className="flex items-center gap-4">
          {showSearchInput ? (
            <form onSubmit={handleSearchSubmit} className="relative w-40 md:w-56">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-full border border-border bg-surface py-1 pl-3 pr-8 text-xs text-foreground focus:border-accent focus:outline-none"
                onBlur={() => setShowSearchInput(false)}
                autoFocus
              />
              <Search size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-foreground-faint" />
            </form>
          ) : (
            <button
              onClick={() => setShowSearchInput(true)}
              className="p-1.5 text-foreground-muted hover:text-foreground rounded-lg transition-colors"
              aria-label="Search site"
            >
              <Search size={16} />
            </button>
          )}

          <button
            className="text-xs font-semibold text-foreground-muted hover:text-foreground transition-colors flex items-center gap-1"
          >
            <span>English</span>
            <ChevronDown size={12} className="text-foreground-faint" />
          </button>

          <Link
            href="/tools"
            className="rounded-full border border-accent px-5 py-1.5 text-xs font-bold text-accent hover:bg-accent hover:text-white transition-all active:scale-95"
          >
            Login
          </Link>
        </div>
      </div>
    </header>
  );
}
