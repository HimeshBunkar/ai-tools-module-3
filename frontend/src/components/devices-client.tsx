'use client';

import React, { useEffect, useState } from "react";
import { Smartphone } from "lucide-react";
import { Device } from "@/lib/types";
import { fetchAllDevices } from "@/lib/api";

export function DevicesClient() {
  const [devices, setDevices] = useState<Device[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getDevices() {
      try {
        const data = await fetchAllDevices();
        setDevices(data || []);
      } catch (e) {
        console.error("Failed to fetch devices:", e);
      } finally {
        setIsLoading(false);
      }
    }
    getDevices();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#000000] text-white selection:bg-neutral-800 selection:text-white">
      <main className="mx-auto max-w-[1440px] px-8 py-12 flex-1">
        <div className="mb-10">
          <h1 className="text-3xl font-black tracking-tight text-white flex items-center gap-2">
            <Smartphone className="text-[#6E56CF]" />
            AI Wearables & Companion Devices
          </h1>
          <p className="text-sm text-[#A1A1AA] mt-2">
            Discover consumer tech, pocket assistants, and wearable pins utilizing Large Action Models (LAMs) and voice inputs.
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-44 animate-pulse rounded-2xl border border-[#232326] bg-[#131316]/50" />
            ))}
          </div>
        ) : devices.length === 0 ? (
          <div className="text-center py-20 border border-[#232326] bg-[#131316] rounded-2xl">
            <p className="text-[#A1A1AA] text-sm">No devices found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {devices.map((device: Device) => (
              <div
                key={device.id}
                className="flex flex-col justify-between border border-[#232326] bg-[#131316] p-6 rounded-2xl hover:border-neutral-500 transition-all shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <h3 className="font-bold text-white text-base truncate">
                      {device.name}
                    </h3>
                    <span className="px-2 py-0.5 rounded bg-[#18181C] text-[10px] text-[#A1A1AA] border border-[#232326] shrink-0 font-mono">
                      {device.category}
                    </span>
                  </div>

                  <p className="text-xs text-[#A1A1AA] mb-6 leading-relaxed">
                    {device.description}
                  </p>
                </div>

                <div className="border-t border-[#232326]/60 pt-4 flex items-center justify-between text-[11px] font-mono text-[#71717A]">
                  <div className="flex items-center gap-1.5">
                    <span>Manufacturer: <strong className="text-white">{device.manufacturer}</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span>Year: <strong className="text-white">{device.year}</strong></span>
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
