"use client";

import React, { useState } from "react";
import Link from "next/link";
import Search from 'lucide-react/dist/esm/icons/search';
import ChevronDown from 'lucide-react/dist/esm/icons/chevron-down';
import { useUser } from '@/hooks/use-user';

export function Header() {
  const { user, isLoading } = useUser();
  const [tasksDropdownOpen, setTasksDropdownOpen] = useState(false);
  
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/20 bg-background/50 backdrop-blur-md py-4">
      <div className="mx-auto max-w-[1440px] px-8 flex items-center justify-between">
        {/* Left: The AI Signal Logo */}
        <Link href="/" className="flex items-center gap-2.5 group shrink-0">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-black font-black text-base transition-transform group-hover:scale-105 active:scale-95 border border-border">
            S
          </div>
          <span className="text-base font-bold tracking-tight text-white transition-colors">
            The AI Signal
          </span>
        </Link>

        {/* Right Aligned Navigation & Action Elements */}
        <div className="flex items-center gap-8">
          {/* Center Navigation links moved here to be right-aligned */}
          <nav className="hidden lg:flex items-center gap-6">
            <Link
              href="/tools"
              className="text-[13px] font-medium text-foreground-muted hover:text-white transition-colors"
            >
              AI Tools
            </Link>
            <Link
              href="/leaderboard"
              className="text-[13px] font-medium text-[#6E56CF] hover:text-white transition-colors font-semibold"
            >
              Leaderboard
            </Link>
            
            {/* Tasks Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setTasksDropdownOpen(true)}
              onMouseLeave={() => setTasksDropdownOpen(false)}
            >
              <button
                type="button"
                className="text-[13px] font-medium text-foreground-muted hover:text-white transition-colors flex items-center gap-1 focus:outline-none py-1"
              >
                Tasks
                <ChevronDown size={14} className={`transition-transform duration-200 ${tasksDropdownOpen ? 'rotate-180 text-white' : 'text-foreground-muted'}`} />
              </button>
              
              {tasksDropdownOpen && (
                <div className="absolute left-0 mt-2 w-32 rounded-lg border border-border bg-[#0C0C0E] p-1.5 shadow-xl transition-all z-50">
                  <Link
                    href="/search/tasks?type=personal"
                    className="block rounded-md px-3 py-2 text-xs text-foreground-muted hover:bg-[#18181C] hover:text-white transition-colors"
                  >
                    Personal
                  </Link>
                  <Link
                    href="/search/tasks?type=work"
                    className="block rounded-md px-3 py-2 text-xs text-foreground-muted hover:bg-[#18181C] hover:text-white transition-colors"
                  >
                    Work
                  </Link>
                </div>
              )}
            </div>
          </nav>

          {/* Action buttons */}
          <div className="flex items-center gap-5">
            <Link
              href="/search"
              className="p-1.5 text-foreground-muted hover:text-white rounded-lg transition-colors"
              aria-label="Search site"
            >
              <Search size={17} />
            </Link>

            <Link
              href="/tools"
              className="text-[13px] font-medium text-foreground-muted hover:text-white transition-colors"
            >
              Submit Tool
            </Link>

            {isLoading ? (
              <div className="h-[32px] w-[80px] animate-pulse rounded-lg bg-white/10" />
            ) : user ? (
              <Link
                href="/dashboard"
                className="inline-flex h-[32px] items-center justify-center rounded-lg bg-white px-4 text-[13px] font-bold text-black hover:bg-neutral-200 transition-colors shrink-0"
              >
                Dashboard
              </Link>
            ) : (
              <>
                <Link
                  href="/auth/signin"
                  className="text-[13px] font-medium text-foreground-muted hover:text-white transition-colors px-2"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/signup"
                  className="inline-flex h-[32px] items-center justify-center rounded-lg bg-white px-4 text-[13px] font-bold text-black hover:bg-neutral-200 transition-colors shrink-0"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
