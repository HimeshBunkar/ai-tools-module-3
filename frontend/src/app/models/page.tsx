import React from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { fetchAllModels } from "@/lib/api";
import { Sparkles, Cpu, Layers, Maximize, Calendar } from "lucide-react";
import { AIModel } from "@/lib/types";

export const dynamic = "force-dynamic";
export const runtime = "edge";

export default async function ModelsPage() {
  const models = await fetchAllModels();

  return (
    <div className="min-h-screen flex flex-col bg-[#000000] text-white selection:bg-neutral-800 selection:text-white">
      <Header />

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
      </main>

      <Footer />
    </div>
  );
}
