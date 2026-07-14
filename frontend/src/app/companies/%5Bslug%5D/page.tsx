import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { fetchCompanyDetails } from "@/lib/api";
import MapPin from 'lucide-react/dist/esm/icons/map-pin';
import Calendar from 'lucide-react/dist/esm/icons/calendar';
import Globe from 'lucide-react/dist/esm/icons/globe';
import ArrowLeft from 'lucide-react/dist/esm/icons/arrow-left';
import Star from 'lucide-react/dist/esm/icons/star';
import ExternalLink from 'lucide-react/dist/esm/icons/external-link';
import { Company } from "@/lib/types";

type CompanyDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-dynamic";
export const runtime = "edge";

export default async function CompanyDetailPage({ params }: CompanyDetailPageProps) {
  const { slug } = await params;
  const company: Company | null = await fetchCompanyDetails(slug);

  if (!company) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#000000] text-white selection:bg-neutral-800 selection:text-white">
      <Header />

      <main className="mx-auto max-w-[1440px] px-8 py-12 flex-1 w-full">
        {/* Back Link */}
        <Link
          href="/companies"
          className="inline-flex items-center gap-1.5 text-xs text-[#A1A1AA] hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft size={14} />
          Back to Companies
        </Link>

        {/* Company Header */}
        <div className="border border-[#232326] bg-[#131316]/40 p-8 rounded-2xl mb-10 flex flex-col md:flex-row justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="h-16 w-16 rounded-xl bg-white flex items-center justify-center font-black text-2xl text-black border border-[#232326]">
              {company.name.charAt(0)}
            </div>
            <div>
              <h1 className="text-3xl font-black text-white">{company.name}</h1>
              <div className="flex flex-wrap items-center gap-4 text-xs text-[#A1A1AA] mt-2">
                <span className="flex items-center gap-1">
                  <MapPin size={13} className="text-[#6E56CF]" />
                  {company.headquarters || "Global Headquarters"}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar size={13} className="text-[#6E56CF]" />
                  Founded in {company.foundedYear || "N/A"}
                </span>
              </div>
            </div>
          </div>

          {company.websiteUrl && (
            <a
              href={company.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 self-start md:self-center px-4 py-2 rounded-xl bg-[#6E56CF] hover:bg-[#5B3EE4] text-xs font-bold text-white transition-all active:scale-95 shadow-md"
            >
              <Globe size={14} />
              Visit Website
              <ExternalLink size={12} />
            </a>
          )}
        </div>

        {/* Company Info / Description */}
        <div className="mb-12">
          <h2 className="text-lg font-bold text-white mb-4 border-b border-[#232326]/60 pb-2">
            About Company
          </h2>
          <p className="text-sm text-[#A1A1AA] leading-relaxed max-w-4xl">
            {company.description || `${company.name} is a pioneer in Artificial Intelligence technology, building high-grade consumer and enterprise products that push the envelope of intelligence and automated capabilities.`}
          </p>
        </div>

        {/* Company Tools */}
        <div>
          <h2 className="text-lg font-bold text-white mb-6 border-b border-[#232326]/60 pb-2">
            Developed AI Tools ({company.tools?.length || 0})
          </h2>

          {company.tools && company.tools.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {company.tools.map((tool) => (
                <Link
                  key={tool.id}
                  href={`/tools/${tool.slug}`}
                  className="group flex flex-col justify-between border border-[#232326] bg-[#131316] p-5 rounded-xl hover:border-neutral-500 hover:bg-[#18181C]/40 transition-all"
                >
                  <div>
                    <div className="flex items-center gap-3 mb-3.5">
                      <div className="h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-[#232326] bg-white p-1 flex">
                        {tool.logoUrl ? (
                          <img
                            src={tool.logoUrl}
                            alt={tool.name}
                            className="h-full w-full object-contain"
                          />
                        ) : (
                          <span className="text-sm font-black text-black uppercase">
                            {tool.name.charAt(0)}
                          </span>
                        )}
                      </div>
                      <div>
                        <h3 className="font-bold text-white text-sm truncate group-hover:text-white transition-colors">
                          {tool.name}
                        </h3>
                        <span className="text-[10px] text-[#71717A] uppercase font-bold tracking-wider">
                          {tool.pricingModel}
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-[#A1A1AA] line-clamp-2 min-h-[32px] mb-4">
                      {tool.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between border-t border-[#232326]/60 pt-3 text-xs text-[#71717A]">
                    <div className="flex items-center gap-1">
                      <Star size={12} className="fill-yellow-500 text-yellow-500" />
                      <span className="font-bold text-[#A1A1AA]">
                        {tool.avgRating > 0 ? tool.avgRating.toFixed(1) : "N/A"}
                      </span>
                      <span>({tool._count.reviews} reviews)</span>
                    </div>
                    <span className="text-[#6E56CF] group-hover:underline">Explore →</span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="border border-[#232326] rounded-xl p-8 text-center bg-[#131316]/20">
              <p className="text-sm text-[#71717A]">No tools cataloged for this company yet.</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
