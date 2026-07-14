'use client';

import React, { useEffect, useState } from "react";
import Github from 'lucide-react/dist/esm/icons/github';
import Star from 'lucide-react/dist/esm/icons/star';
import Code from 'lucide-react/dist/esm/icons/code';
import ExternalLink from 'lucide-react/dist/esm/icons/external-link';
import { Repository } from "@/lib/types";
import { fetchAllRepos } from "@/lib/api";

export function RepositoriesClient() {
  const [repos, setRepos] = useState<Repository[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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

  return (
    <div className="min-h-screen flex flex-col bg-[#000000] text-white selection:bg-neutral-800 selection:text-white">
      <main className="mx-auto max-w-[1440px] px-8 py-12 flex-1">
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-44 animate-pulse rounded-2xl border border-[#232326] bg-[#131316]/50" />
            ))}
          </div>
        ) : repos.length === 0 ? (
          <div className="text-center py-20 border border-[#232326] bg-[#131316] rounded-2xl">
            <p className="text-[#A1A1AA] text-sm">No repositories found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {repos.map((repo: Repository) => (
              <a
                key={repo.id}
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col justify-between border border-[#232326] bg-[#131316] p-6 rounded-2xl hover:border-neutral-500 hover:bg-[#18181C]/40 transition-all shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="h-8 w-8 rounded-lg bg-[#18181C] flex items-center justify-center font-bold text-white border border-[#232326]">
                        {repo.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-bold text-white text-base truncate">
                          {repo.name}
                        </h3>
                        <span className="text-[11px] text-[#71717A]">by {repo.owner}</span>
                      </div>
                    </div>
                    <ExternalLink size={14} className="shrink-0 text-[#71717A] group-hover:text-white transition-colors" />
                  </div>

                  <p className="text-xs text-[#A1A1AA] leading-relaxed mb-6">
                    {repo.description}
                  </p>
                </div>

                <div className="border-t border-[#232326]/60 pt-4 flex items-center justify-between text-[11px] font-mono text-[#71717A]">
                  <div className="flex items-center gap-1.5">
                    <Star size={12} className="fill-[#6E56CF] text-[#6E56CF]" />
                    <span>Stars: <strong className="text-white">{repo.stars.toLocaleString()}</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Code size={12} className="text-[#6E56CF]" />
                    <span>Language: <strong className="text-white">{repo.language}</strong></span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
