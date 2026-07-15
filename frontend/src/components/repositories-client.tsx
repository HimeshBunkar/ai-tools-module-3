'use client';

import React, { useEffect, useState, useRef } from "react";
import Github from 'lucide-react/dist/esm/icons/github';
import { Repository } from "@/lib/types";
import { fetchAllRepos } from "@/lib/api";

export function RepositoriesClient() {
  const [repos, setRepos] = useState<Repository[]>([]);
  const [visibleCount, setVisibleCount] = useState(15);
  const [isLoading, setIsLoading] = useState(true);

  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function getRepos() {
      try {
        const data = await fetchAllRepos();
        setRepos(data || []);
      } catch (e) {
        console.error("Failed to fetch repositories:", e);
      } finally {
        setIsLoading(false);
      }
    }
    getRepos();
  }, []);

  // IntersectionObserver for client-side endless scroll
  useEffect(() => {
    if (isLoading || visibleCount >= repos.length) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setVisibleCount(prev => prev + 15);
      }
    }, { threshold: 0.1 });

    const currentSentinel = sentinelRef.current;
    if (currentSentinel) {
      observer.observe(currentSentinel);
    }

    return () => {
      if (currentSentinel) {
        observer.unobserve(currentSentinel);
      }
    };
  }, [isLoading, visibleCount, repos.length]);

  const visibleRepos = repos.slice(0, visibleCount);

  return (
    <div className="min-h-screen flex flex-col bg-[#000000] text-white selection:bg-neutral-800 selection:text-white">
      <main className="mx-auto max-w-[1440px] px-8 py-12 flex-1 w-full">
        <div className="mb-10">
          <h1 className="text-3xl font-black tracking-tight text-white flex items-center gap-2">
            <Github className="text-[#6E56CF]" />
            Trending AI Repositories
          </h1>
          <p className="text-sm text-[#A1A1AA] mt-2">
            Discover popular open-source projects, tools, and models pushing developer capabilities on GitHub.
          </p>
        </div>

        {isLoading ? (
          <div className="flex flex-col gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-20 animate-pulse rounded-xl border border-[#232326] bg-[#131316]/50" />
            ))}
          </div>
        ) : repos.length === 0 ? (
          <div className="text-center py-20 border border-[#232326] bg-[#131316] rounded-xl">
            <p className="text-[#A1A1AA] text-sm">No repositories found.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {visibleRepos.map((repo: Repository) => (
              <a
                key={repo.id}
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between border border-[#232326] bg-[#131316] p-4 rounded-xl hover:border-neutral-500 hover:bg-[#18181C]/40 transition-all shadow-lg w-full"
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div className="h-10 w-10 rounded-lg bg-[#18181C] flex items-center justify-center font-bold text-white uppercase border border-[#232326]/60 shrink-0">
                    {repo.name.charAt(0)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline gap-2">
                      <h3 className="font-bold text-white text-sm truncate group-hover:text-white transition-colors">
                        {repo.name}
                      </h3>
                      <span className="text-[10px] text-[#71717A]">by {repo.owner}</span>
                    </div>
                    <p className="text-xs text-[#A1A1AA] line-clamp-1 mt-1 leading-relaxed">
                      {repo.description}
                    </p>
                    <div className="flex items-center gap-3 mt-1.5 text-[10px] font-mono text-[#71717A]">
                      <span>⭐ {repo.stars.toLocaleString()} stars</span>
                      <span className="h-1 w-1 rounded-full bg-[#232326]" />
                      <span>Lang: <strong className="text-white">{repo.language}</strong></span>
                    </div>
                  </div>
                </div>
                <span className="text-xs font-semibold text-[#71717A] group-hover:text-white transition-colors shrink-0">
                  Github &rarr;
                </span>
              </a>
            ))}

            {/* Sentinel for infinite scroll */}
            {repos.length > 0 && visibleCount < repos.length && (
              <div ref={sentinelRef} className="h-20 flex items-center justify-center py-8">
                <div className="h-6 w-6 animate-spin rounded-full border-2 border-white/20 border-t-white" />
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
