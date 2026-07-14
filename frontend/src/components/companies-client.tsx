'use client';

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Building from 'lucide-react/dist/esm/icons/building';
import MapPin from 'lucide-react/dist/esm/icons/map-pin';
import Calendar from 'lucide-react/dist/esm/icons/calendar';
import Globe from 'lucide-react/dist/esm/icons/globe';
import { Company } from "@/lib/types";
import { fetchAllCompanies } from "@/lib/api";

export function CompaniesClient() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getCompanies() {
      try {
        const data = await fetchAllCompanies();
        setCompanies(data || []);
      } catch (e) {
        console.error("Failed to fetch companies:", e);
      } finally {
        setIsLoading(false);
      }
    }
    getCompanies();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#000000] text-white selection:bg-neutral-800 selection:text-white">
      <main className="mx-auto max-w-[1440px] px-8 py-12 flex-1">
        <div className="mb-10">
          <h1 className="text-3xl font-black tracking-tight text-white flex items-center gap-2">
            <Building className="text-[#6E56CF]" />
            AI Companies
          </h1>
          <p className="text-sm text-[#A1A1AA] mt-2">
            Explore leading AI research labs, software vendors, and hardware makers in the global ecosystem.
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-44 animate-pulse rounded-2xl border border-[#232326] bg-[#131316]/50" />
            ))}
          </div>
        ) : companies.length === 0 ? (
          <div className="text-center py-20 border border-[#232326] bg-[#131316] rounded-2xl">
            <p className="text-[#A1A1AA] text-sm">No companies found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {companies.map((company: Company) => (
              <Link
                key={company.id}
                href={`/companies/${company.slug}`}
                className="group flex flex-col justify-between border border-[#232326] bg-[#131316] p-6 rounded-2xl hover:border-neutral-500 hover:bg-[#18181C]/40 transition-all shadow-lg"
              >
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-12 w-12 rounded-lg bg-[#18181C] flex items-center justify-center font-black text-lg text-white border border-[#232326]">
                      {company.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-base truncate group-hover:text-white transition-colors">
                        {company.name}
                      </h3>
                      <span className="inline-flex items-center gap-1 text-[11px] text-[#71717A] mt-0.5">
                        <MapPin size={10} />
                        {company.headquarters || "Global HQ"}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-[#A1A1AA] line-clamp-3 mb-6 min-h-[48px]">
                    {company.description || `Explore advanced artificial intelligence tools and open models developed by ${company.name}.`}
                  </p>
                </div>

                <div className="border-t border-[#232326]/60 pt-4 flex items-center justify-between text-[11px] font-semibold text-[#71717A]">
                  <div className="flex items-center gap-1">
                    <Calendar size={12} />
                    <span>Founded: {company.foundedYear || "N/A"}</span>
                  </div>
                  <div className="flex items-center gap-1 hover:text-white transition-colors">
                    <Globe size={12} />
                    <span>View Details</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
