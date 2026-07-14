import type { Metadata } from "next";
import { Suspense } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ModelsClient } from "@/components/models-client";

export const metadata: Metadata = {
  title: "AI Models Directory",
  description:
    "Explore state-of-the-art Large Language Models, neural architectures, parameter sizes, and release histories.",
};

export default function ModelsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#000000] text-white">
      <Header />
      <Suspense fallback={
        <main className="mx-auto max-w-[1440px] px-8 py-12 flex-1">
          <div className="mb-10 h-16 animate-pulse bg-[#131316] rounded-xl border border-[#232326]" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-44 animate-pulse rounded-2xl border border-[#232326] bg-[#131316]/50" />
            ))}
          </div>
        </main>
      }>
        <ModelsClient />
      </Suspense>
      <Footer />
    </div>
  );
}
