'use client';

import React, { useEffect, useState, useRef } from "react";
import Play from 'lucide-react/dist/esm/icons/play';
import { Video } from "@/lib/types";
import { fetchAllVideos } from "@/lib/api";

export function VideosClient() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [visibleCount, setVisibleCount] = useState(15);
  const [isLoading, setIsLoading] = useState(true);

  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function getVideos() {
      try {
        const data = await fetchAllVideos();
        setVideos(data || []);
      } catch (e) {
        console.error("Failed to fetch videos:", e);
      } finally {
        setIsLoading(false);
      }
    }
    getVideos();
  }, []);

  // IntersectionObserver for client-side endless scroll
  useEffect(() => {
    if (isLoading || visibleCount >= videos.length) return;

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
  }, [isLoading, visibleCount, videos.length]);

  const visibleVideos = videos.slice(0, visibleCount);

  return (
    <div className="min-h-screen flex flex-col bg-[#000000] text-white selection:bg-neutral-800 selection:text-white">
      <main className="mx-auto max-w-[1440px] px-8 py-12 flex-1 w-full">
        <div className="mb-10">
          <h1 className="text-3xl font-black tracking-tight text-white flex items-center gap-2">
            <Play className="text-[#6E56CF]" />
            Trending AI Videos & Tutorials
          </h1>
          <p className="text-sm text-[#A1A1AA] mt-2">
            Learn and master advanced machine learning concepts, tool tutorials, and model breakdowns.
          </p>
        </div>

        {isLoading ? (
          <div className="flex flex-col gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-20 animate-pulse rounded-xl border border-[#232326] bg-[#131316]/50" />
            ))}
          </div>
        ) : videos.length === 0 ? (
          <div className="text-center py-20 border border-[#232326] bg-[#131316] rounded-xl">
            <p className="text-[#A1A1AA] text-sm">No videos found.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {visibleVideos.map((video: Video) => (
              <a
                key={video.id}
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between border border-[#232326] bg-[#131316] p-4 rounded-xl hover:border-neutral-500 hover:bg-[#18181C]/40 transition-all shadow-lg w-full"
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div className="h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-red-600/10 border border-red-600/20 flex text-red-500">
                    <Play size={20} className="fill-red-500" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-bold text-white text-sm truncate group-hover:text-white transition-colors">
                      {video.title}
                    </h3>
                    <div className="flex items-center gap-2.5 mt-1 text-[11px] font-mono text-[#71717A]">
                      <span>by {video.channel}</span>
                      <span className="h-1 w-1 rounded-full bg-[#232326]" />
                      <span>Duration: <strong className="text-white">{video.duration}</strong></span>
                      <span className="h-1 w-1 rounded-full bg-[#232326]" />
                      <span>{video.views}</span>
                    </div>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-[#71717A] shrink-0 sm:block hidden">
                  {video.publishedAt}
                </span>
              </a>
            ))}

            {/* Sentinel for infinite scroll */}
            {videos.length > 0 && visibleCount < videos.length && (
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
