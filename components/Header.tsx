"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, Plus, User, Compass } from "lucide-react";
import { cn } from "@/lib/utils";

export function Header() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/tools?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled
          ? "border-b border-border bg-background/75 backdrop-blur-md shadow-lg shadow-black/10 py-3"
          : "border-b border-transparent bg-transparent py-4"
      )}
    >
      <div className="mx-auto max-w-container px-6 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group shrink-0">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-white font-black text-lg transition-transform group-hover:scale-105 active:scale-95 shadow-md shadow-accent/20">
            S
          </div>
          <span className="text-lg font-bold tracking-tight text-foreground transition-colors group-hover:text-white">
            The AI Signal
          </span>
        </Link>

        {/* Global Search Bar (stays visible while scrolling) */}
        <form
          onSubmit={handleSearchSubmit}
          className="relative max-w-md flex-1 hidden md:block"
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
            className="w-full rounded-full border border-border bg-surface/50 py-2 pl-9 pr-4 text-xs text-foreground placeholder:text-foreground-faint focus:border-accent focus:bg-surface focus:outline-none transition-all"
          />
          {searchQuery && (
            <button
              type="submit"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-semibold text-accent hover:text-accent-hover"
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
            className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-border bg-surface-raised px-4 py-2 text-xs font-medium text-foreground hover:bg-border transition-all active:scale-95"
          >
            <Plus size={12} />
            <span>Submit Tool</span>
          </Link>
          
          <button
            onClick={() => router.push("/tools")}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-accent/15 border border-accent/25 hover:border-accent/40 text-accent hover:bg-accent/20 transition-all active:scale-95 shadow-sm"
            aria-label="Profile"
          >
            <User size={14} />
          </button>
        </div>
      </div>
    </header>
  );
}
