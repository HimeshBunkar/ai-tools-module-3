'use client';

import React, { useEffect, useState } from "react";
import { Cpu } from "lucide-react";
import { Robot } from "@/lib/types";
import { fetchAllRobots } from "@/lib/api";

export function RobotsClient() {
  const [robots, setRobots] = useState<Robot[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getRobots() {
      try {
        const data = await fetchAllRobots();
        setRobots(data || []);
      } catch (e) {
        console.error("Failed to fetch robots:", e);
      } finally {
        setIsLoading(false);
      }
    }
    getRobots();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#000000] text-white selection:bg-neutral-800 selection:text-white">
      <main className="mx-auto max-w-[1440px] px-8 py-12 flex-1">
        <div className="mb-10">
          <h1 className="text-3xl font-black tracking-tight text-white flex items-center gap-2">
            <Cpu className="text-[#6E56CF]" />
            Humanoid & Autonomous Robotics
          </h1>
          <p className="text-sm text-[#A1A1AA] mt-2">
            Explore advanced bipedal, wheeled, and multi-joint humanoid agents deploying AI control loop systems.
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-44 animate-pulse rounded-2xl border border-[#232326] bg-[#131316]/50" />
            ))}
          </div>
        ) : robots.length === 0 ? (
          <div className="text-center py-20 border border-[#232326] bg-[#131316] rounded-2xl">
            <p className="text-[#A1A1AA] text-sm">No robots found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {robots.map((robot: Robot) => (
              <div
                key={robot.id}
                className="flex flex-col justify-between border border-[#232326] bg-[#131316] p-6 rounded-2xl hover:border-neutral-500 transition-all shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <h3 className="font-bold text-white text-base truncate">
                      {robot.name}
                    </h3>
                    <span className="px-2 py-0.5 rounded bg-[#18181C] text-[10px] text-[#A1A1AA] border border-[#232326] shrink-0 font-mono">
                      {robot.category}
                    </span>
                  </div>

                  <p className="text-xs text-[#A1A1AA] mb-6 leading-relaxed">
                    {robot.description}
                  </p>
                </div>

                <div className="border-t border-[#232326]/60 pt-4 flex items-center justify-between text-[11px] font-mono text-[#71717A]">
                  <div className="flex items-center gap-1.5">
                    <span>Manufacturer: <strong className="text-white">{robot.manufacturer}</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span>Year: <strong className="text-white">{robot.year}</strong></span>
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
