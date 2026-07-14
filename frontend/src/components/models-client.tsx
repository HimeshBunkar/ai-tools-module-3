'use client';

import React, { useEffect, useState } from "react";
import { Sparkles, Cpu, Layers, Maximize, Calendar } from "lucide-react";
import { AIModel } from "@/lib/types";
import { fetchAllModels } from "@/lib/api";

export function ModelsClient() {
  const [models, setModels] = useState<AIModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getModels() {
      try {
        const data = await fetchAllModels();
        setModels(data || []);
      } catch (e) {
        console.error("Failed to fetch models:", e);
      } finally {
        setIsLoading(false);
      }
    }
    getModels();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#000000] text-white selection:bg-neutral-800 selection:text-white">
      <main className="mx-auto max-w-[1440px] px-8 py-12 flex-1">
        <div className="mb-10">
          <h1 className="text-3xl font-black tracking-tight text-white flex items-center gap-2">
            <Sparkles className="text-[#6E56CF]" />
            AI Language Models
          </h1>
          <p className="text-sm text-[#A1A1AA] mt-2">
            Discover and explore state-of-the-art LLMs, neural architectures, and vision models pushing machine intelligence limits.
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-44 animate-pulse rounded-2xl border border-[#232326] bg-[#131316]/50" />
            ))}
          </div>
        ) : models.length === 0 ? (
          <div className="text-center py-20 border border-[#232326] bg-[#131316] rounded-2xl">
            <p className="text-[#A1A1AA] text-sm">No models found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {models.map((model: AIModel) => (
              <div
                key={model.id}
                className="flex flex-col justify-between border border-[#232326] bg-[#131316] p-6 rounded-2xl hover:border-neutral-500 transition-all shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <h3 className="font-bold text-white text-base truncate">
                      {model.name}
                    </h3>
                    <span className="px-2 py-0.5 rounded bg-[#18181C] text-[10px] text-[#A1A1AA] border border-[#232326] shrink-0 font-mono">
                      {model.modality}
                    </span>
                  </div>

                  <p className="text-xs text-[#A1A1AA] mb-6 leading-relaxed">
                    {model.description}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 border-t border-[#232326]/60 pt-4 text-[11px] font-mono text-[#71717A]">
                  <div className="flex items-center gap-1.5">
                    <Cpu size={12} className="text-[#6E56CF]" />
                    <span>Creator: <strong className="text-white">{model.creator}</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Layers size={12} className="text-[#6E56CF]" />
                    <span>Params: <strong className="text-white">{model.parameterSize}</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Maximize size={12} className="text-[#6E56CF]" />
                    <span>Context: <strong className="text-white">{model.contextWindow}</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar size={12} className="text-[#6E56CF]" />
                    <span>Release: <strong className="text-white">{model.releaseDate}</strong></span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
