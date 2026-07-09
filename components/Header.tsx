"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, Plus, User, Compass } from "lucide-react";

export function Header() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/tools?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background py-3.5">
      <div className="mx-auto max-w-container px-6 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group shrink-0">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-black font-black text-base transition-transform group-hover:scale-105 active:scale-95 shadow-sm border border-border">
            S
          </div>
          <span className="text-lg font-bold tracking-tight text-foreground transition-colors group-hover:text-white">
            The AI Signal
          </span>
        </Link>

        {/* Global Search Bar (stays visible while scrolling) */}
        <form
          onSubmit={handleSearchSubmit}
          className="relative max-w-[480px] flex-1 hidden md:block"
        >
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground-faint pointer-events-none"
            aria-hidden="true"
          />
          <input
            type="text"
            placeholder="Search the AI ecosystem..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-full border border-border bg-surface py-2 pl-9 pr-4 text-xs text-foreground placeholder:text-foreground-faint focus:border-accent focus:bg-surface focus:outline-none transition-all"
          />
          {searchQuery && (
            <button
              type="submit"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-semibold text-foreground-muted hover:text-white"
            >
              Search
            </button>
          )}
        </form>

        {/* Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6">
          <Link
            href="/tools"
            className="text-xs font-medium text-foreground-muted hover:text-foreground transition-colors"
          >
            AI Tools
          </Link>
          <Link
            href="#models"
            className="text-xs font-medium text-foreground-muted hover:text-foreground transition-colors"
          >
            Models
          </Link>
          <Link
            href="#news"
            className="text-xs font-medium text-foreground-muted hover:text-foreground transition-colors"
          >
            News
          </Link>
          <Link
            href="#robotics"
            className="text-xs font-medium text-foreground-muted hover:text-foreground transition-colors"
          >
            Robotics
          </Link>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <Link
            href="/tools"
            className="p-2 text-foreground-muted hover:text-foreground hover:bg-surface-raised rounded-lg lg:hidden"
            aria-label="Browse all"
          >
            <Compass size={18} />
          </Link>
          
          <Link
            href="/tools"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-semibold text-black hover:bg-neutral-200 transition-all active:scale-95"
          >
            <Plus size={12} />
            <span>Submit Tool</span>
          </Link>
          
          <button
            onClick={() => router.push("/tools")}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-surface-raised border border-border hover:bg-neutral-800 text-white transition-all active:scale-95 shadow-sm"
            aria-label="Profile"
          >
            <User size={14} />
          </button>
        </div>
      </div>
    </header>
  );
}
