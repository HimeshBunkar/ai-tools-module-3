"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Twitter, Github, MessageSquare, ArrowRight } from "lucide-react";

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="w-full border-t border-border bg-background/50 pt-16 pb-12 mt-20">
      <div className="mx-auto max-w-container px-6 grid grid-cols-2 gap-8 md:grid-cols-6 lg:gap-12">
        {/* Brand info & Newsletter */}
        <div className="col-span-2 space-y-5">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-black font-black text-base border border-border">
              S
            </div>
            <span className="text-base font-bold tracking-tight text-foreground">
              The AI Signal
            </span>
          </div>
          <p className="text-xs leading-relaxed text-foreground-muted max-w-[280px]">
            The premium discovery engine for tools, models, news, and humanoid robotics in the global AI ecosystem.
          </p>
          <form onSubmit={handleSubscribe} className="space-y-2 max-w-[300px]">
            <label htmlFor="footer-email" className="block text-[11px] font-semibold uppercase tracking-wider text-foreground-faint">
              Subscribe to newsletter
            </label>
            <div className="relative">
              <input
                id="footer-email"
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-border bg-surface/50 py-2 pl-3 pr-10 text-xs text-foreground placeholder:text-foreground-faint focus:border-neutral-500 focus:bg-surface focus:outline-none transition-all"
              />
              <button
                type="submit"
                className="absolute right-1 top-1 bottom-1 px-2.5 rounded-md bg-white hover:bg-neutral-200 text-black flex items-center justify-center transition-colors"
                aria-label="Subscribe"
              >
                <ArrowRight size={12} />
              </button>
            </div>
            {subscribed && (
              <span className="block text-[11px] text-success animate-fade-in">
                Thank you! You are now subscribed.
              </span>
            )}
          </form>
        </div>

        {/* Column 1: Products */}
        <div className="space-y-4">
          <h4 className="text-xs font-semibold text-foreground tracking-wider uppercase">Products</h4>
          <ul className="space-y-2 text-xs">
            <li>
              <Link href="/tools" className="text-foreground-muted hover:text-foreground transition-colors">
                AI Tools Directory
              </Link>
            </li>
            <li>
              <Link href="#companies" className="text-foreground-muted hover:text-foreground transition-colors">
                AI Companies
              </Link>
            </li>
            <li>
              <Link href="#models" className="text-foreground-muted hover:text-foreground transition-colors">
                AI Models
              </Link>
            </li>
            <li>
              <Link href="/tools" className="text-foreground-muted hover:text-foreground transition-colors">
                AI Tasks List
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 2: Resources */}
        <div className="space-y-4">
          <h4 className="text-xs font-semibold text-foreground tracking-wider uppercase">Resources</h4>
          <ul className="space-y-2 text-xs">
            <li>
              <Link href="/tools" className="text-foreground-muted hover:text-foreground transition-colors">
                API Reference
              </Link>
            </li>
            <li>
              <Link href="/tools" className="text-foreground-muted hover:text-foreground transition-colors">
                Site Documentation
              </Link>
            </li>
            <li>
              <Link href="/tools" className="text-foreground-muted hover:text-foreground transition-colors">
                Monthly Changelog
              </Link>
            </li>
            <li>
              <Link href="/tools" className="text-foreground-muted hover:text-foreground transition-colors">
                Integration Guides
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Collections */}
        <div className="space-y-4">
          <h4 className="text-xs font-semibold text-foreground tracking-wider uppercase">Collections</h4>
          <ul className="space-y-2 text-xs">
            <li>
              <Link href="/tools" className="text-foreground-muted hover:text-foreground transition-colors">
                Curated Bundles
              </Link>
            </li>
            <li>
              <Link href="/tools?pricing=FREE" className="text-foreground-muted hover:text-foreground transition-colors">
                Free AI Tools
              </Link>
            </li>
            <li>
              <Link href="/tools?category=coding" className="text-foreground-muted hover:text-foreground transition-colors">
                Developer Kits
              </Link>
            </li>
            <li>
              <Link href="/tools?category=writing" className="text-foreground-muted hover:text-foreground transition-colors">
                Writing Copilots
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 4: Legal / Social */}
        <div className="space-y-4 col-span-1">
          <h4 className="text-xs font-semibold text-foreground tracking-wider uppercase">Company</h4>
          <ul className="space-y-2 text-xs">
            <li>
              <Link href="/tools" className="text-foreground-muted hover:text-foreground transition-colors">
                About The AI Signal
              </Link>
            </li>
            <li>
              <Link href="/tools" className="text-foreground-muted hover:text-foreground transition-colors">
                Careers (Hiring)
              </Link>
            </li>
            <li>
              <Link href="/tools" className="text-foreground-muted hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/tools" className="text-foreground-muted hover:text-foreground transition-colors">
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="mx-auto max-w-container px-6 border-t border-border mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-[11px] text-foreground-faint">
          &copy; {new Date().getFullYear()} The AI Signal Inc. All rights reserved.
        </p>
        <div className="flex items-center gap-4 text-foreground-faint">
          <Link href="https://twitter.com" target="_blank" className="hover:text-foreground transition-colors" aria-label="Twitter">
            <Twitter size={14} />
          </Link>
          <Link href="https://github.com" target="_blank" className="hover:text-foreground transition-colors" aria-label="GitHub">
            <Github size={14} />
          </Link>
          <Link href="https://discord.com" target="_blank" className="hover:text-foreground transition-colors" aria-label="Discord">
            <MessageSquare size={14} />
          </Link>
        </div>
      </div>
    </footer>
  );
}
