import React from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { fetchAllVideos } from "@/lib/api";
import { Play } from "lucide-react";
import { Video } from "@/lib/types";

export const dynamic = "force-dynamic";
export const runtime = "edge";

export default async function VideosPage() {
  const videos = await fetchAllVideos();

  return (
    <div className="min-h-screen flex flex-col bg-[#000000] text-white selection:bg-neutral-800 selection:text-white">
      <Header />

      <main className="mx-auto max-w-[1440px] px-8 py-12 flex-1">
        <div className="mb-10">
          <h1 className="text-3xl font-black tracking-tight text-white flex items-center gap-2">
            <Play className="text-[#6E56CF]" />
            Trending AI Videos & Tutorials
          </h1>
          <p className="text-sm text-[#A1A1AA] mt-2">
            Learn and master advanced machine learning concepts, tool tutorials, and model breakdowns.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {videos.map((video: Video) => (
            <a
              key={video.id}
              href={video.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col justify-between border border-[#232326] bg-[#131316] p-6 rounded-2xl hover:border-neutral-500 hover:bg-[#18181C]/40 transition-all shadow-lg"
            >
              <div>
                <div className="flex items-center gap-3.5 mb-4">
                  <div className="h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-red-600/10 border border-red-600/20 flex text-red-500">
                    <Play size={20} className="fill-red-500" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-white text-sm truncate leading-snug group-hover:text-white transition-colors">
                      {video.title}
                    </h3>
                    <span className="text-[11px] text-[#71717A] mt-0.5 block">by {video.channel}</span>
                  </div>
                </div>
              </div>

              <div className="border-t border-[#232326]/60 pt-4 flex items-center justify-between text-[11px] font-mono text-[#71717A]">
                <div className="flex items-center gap-1.5">
                  <span>Duration: <strong className="text-white">{video.duration}</strong></span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span>{video.views}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span>{video.publishedAt}</span>
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
