import React from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { fetchAllRepos } from "@/lib/api";
import { Github, Star, Code, ExternalLink } from "lucide-react";
import { Repository } from "@/lib/types";

export const dynamic = "force-dynamic";
export const runtime = "edge";

export default async function RepositoriesPage() {
  const repos = await fetchAllRepos();

  return (
    <div className="min-h-screen flex flex-col bg-[#000000] text-white selection:bg-neutral-800 selection:text-white">
      <Header />

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
      </main>

      <Footer />
    </div>
  );
}
