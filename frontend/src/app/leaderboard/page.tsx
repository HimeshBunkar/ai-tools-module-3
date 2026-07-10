"use client";

import { useState, useEffect, useCallback } from "react";
import { Sparkles, Cpu, Building2, Bookmark, AlertTriangle, TrendingUp, TrendingDown, Search, ChevronDown, Languages, Menu, Globe, Layers3, RotateCcw, ArrowLeft } from "lucide-react";
import Filters from "@/components/Filters";
import LeaderboardTable from "@/components/LeaderboardTable";
import LeaderboardCard from "@/components/LeaderboardCard";
import SkeletonLoader from "@/components/SkeletonLoader";
import EmptyState from "@/components/EmptyState";

// Dynamic emojis for categories mapping
const CATEGORY_EMOJIS: Record<string, string> = {
  "all": "🗂️",
  "audio & voice": "🔊",
  "chatbot": "🤖",
  "code assistant": "💻",
  "copywriting": "✍️",
  "data analysis": "📊",
  "image generation": "🎨",
  "productivity": "🚀",
  "search & answer": "🔍",
  "translation": "🌐",
  "ui/ux design": "📐",
  "video generation": "🎬"
};

const TRANSLATIONS = {
  en: {
    aiTools: "AI Tools",
    aiModels: "AI Models",
    aiCompanies: "AI Companies",
    bookmarks: "Bookmarks",
    login: "Login",
    emptyTitleSaved: "No bookmarked items found",
    emptyDescSaved: "You haven't bookmarked any items in this category yet. Click the bookmark icon next to items to save them here.",
    emptyTitleFilter: "No results matched filters",
    emptyDescFilter: "We couldn't find any listings matching your search or active filters. Try resetting to defaults.",
    emptyActionSaved: "View all listings",
    emptyActionFilter: "Reset all filters",
    toolsMatched: "AI Tools matched",
    modelsMatched: "AI Models matched",
    companiesMatched: "AI Companies matched",
    noToolsMatched: "No matching AI tools found.",
    noModelsMatched: "No matching models found.",
    noCompaniesMatched: "No matching companies found.",
  },
  hi: {
    aiTools: "एआई टूल्स",
    aiModels: "एआई मॉडल्स",
    aiCompanies: "एआई कंपनियाँ",
    bookmarks: "बुकमार्क्स",
    login: "लॉगिन",
    emptyTitleSaved: "कोई बुकमार्क नहीं मिला",
    emptyDescSaved: "आपने अभी तक इस श्रेणी में कोई आइटम बुकमार्क नहीं किया है। उन्हें सहेजने के लिए आइटम के बगल में बुकमार्क आइकन पर क्लिक करें।",
    emptyTitleFilter: "कोई परिणाम नहीं मिला",
    emptyDescFilter: "हमें आपके खोज या सक्रिय फ़िल्टर से मेल खाता कोई परिणाम नहीं मिला। डिफ़ॉल्ट पर रीसेट करने का प्रयास करें।",
    emptyActionSaved: "सभी आइटम देखें",
    emptyActionFilter: "सभी फ़िल्टर रीसेट करें",
    toolsMatched: "एआई टूल्स मिले",
    modelsMatched: "एआई मॉडल्स मिले",
    companiesMatched: "एआई कंपनियाँ मिलीं",
    noToolsMatched: "कोई मेल खाने वाला एआई टूल नहीं मिला।",
    noModelsMatched: "कोई मेल खाने वाला मॉडल नहीं मिला।",
    noCompaniesMatched: "कोई मेल खाने वाली कंपनी नहीं मिली।",
  }
};

const getApiUrl = (path: string) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8787";
  return `${baseUrl}${path}`;
};

export default function LeaderboardPage() {
  // State Management
  const [tab, setTab] = useState<"tools" | "models" | "companies">("tools");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [sort, setSort] = useState("rank");
  const [category, setCategory] = useState("all");
  const [page, setPage] = useState(1);
  const [showSavedOnly, setShowSavedOnly] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [language, setLanguage] = useState<"en" | "hi">("en");
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);

  // Data States
  const [items, setItems] = useState<any[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [stats, setStats] = useState<any>(null);

  // Global Search Results State
  const [globalSearchResults, setGlobalSearchResults] = useState<{
    tools: any[];
    models: any[];
    companies: any[];
  } | null>(null);

  // UX States
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [savedIds, setSavedIds] = useState<string[]>([]);

  // 1. Debounce Search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1); // Reset page on search change
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  // 2. Load Saved bookmarks from LocalStorage (pre-populate with default popular items if empty)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("ai_signal_saved");
      const defaultBookmarks = [
        "tool-1", "tool-2", "tool-3", "tool-4",
        "model-2", "model-3", "model-5",
        "company-1", "company-2", "company-3"
      ];

      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (parsed.length === 3 && parsed.includes("tool-1") && parsed.includes("company-1") && parsed.includes("model-3")) {
            localStorage.setItem("ai_signal_saved", JSON.stringify(defaultBookmarks));
            setSavedIds(defaultBookmarks);
          } else {
            setSavedIds(parsed);
          }
        } catch (e) {
          console.error("Failed to parse saved items", e);
        }
      } else {
        localStorage.setItem("ai_signal_saved", JSON.stringify(defaultBookmarks));
        setSavedIds(defaultBookmarks);
      }
    }
  }, []);

  // 3. Toggle Bookmark function
  const toggleSave = useCallback((id: string) => {
    setSavedIds((prev) => {
      const updated = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      localStorage.setItem("ai_signal_saved", JSON.stringify(updated));
      return updated;
    });
  }, []);

  // Reset all filters
  const resetFilters = useCallback(() => {
    setSearch("");
    setSort("rank");
    setCategory("all");
    setShowSavedOnly(false);
    setPage(1);
    setError(null);
  }, []);

  // Complete reset to Home State
  const resetToHome = useCallback(() => {
    setTab("tools");
    resetFilters();
  }, [resetFilters]);

  // Check if current state deviates from default homepage state
  const isCustomState = tab !== "tools" || category !== "all" || search !== "" || showSavedOnly;

  // 4. Fetch Leaderboard Data (high limit of 150 to render all rows at once and disable pagination)
  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      if (debouncedSearch.trim() !== "") {
        // Fetch all three datasets in parallel for the Unified Global Search Results page
        const [toolsRes, modelsRes, companiesRes] = await Promise.all([
          fetch(getApiUrl(`/api/leaderboard?tab=tools&search=${encodeURIComponent(debouncedSearch)}&sort=${sort}&category=${category}&limit=150`)).then((r) => r.json()),
          fetch(getApiUrl(`/api/leaderboard?tab=models&search=${encodeURIComponent(debouncedSearch)}&sort=${sort}&category=${category}&limit=150`)).then((r) => r.json()),
          fetch(getApiUrl(`/api/leaderboard?tab=companies&search=${encodeURIComponent(debouncedSearch)}&sort=${sort}&category=${category}&limit=150`)).then((r) => r.json())
        ]);

        setGlobalSearchResults({
          tools: toolsRes.items || [],
          models: modelsRes.items || [],
          companies: companiesRes.items || []
        });

        setCategories(toolsRes.categories || []);
        setStats(toolsRes.stats);
      } else {
        setGlobalSearchResults(null);

        // Fetch standard active tab directory normally
        const params = new URLSearchParams({
          tab,
          search: "",
          sort,
          category,
          page: "1",
          limit: "150",
        });

        const response = await fetch(getApiUrl(`/api/leaderboard?${params.toString()}`));
        if (!response.ok) {
          throw new Error("Failed to load leaderboard data.");
        }

        const data = await response.json();
        
        if (showSavedOnly) {
          const filtered = data.items.filter((item: any) => savedIds.includes(item.id));
          setItems(filtered);
        } else {
          setItems(data.items);
        }

        setCategories(data.categories || []);
        setStats(data.stats);
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  }, [tab, debouncedSearch, sort, category, showSavedOnly, savedIds]);

  // Trigger fetch on query change
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const t = TRANSLATIONS[language];

  return (
    <div className="min-h-screen bg-black text-white antialiased font-sans selection:bg-neutral-800 selection:text-white">
      {/* 1. Header Navigation Bar */}
      <header className="sticky top-0 z-50 w-full border-b border-[#1c1c1e] bg-black/90 backdrop-blur-md">
        <div className="mx-auto max-w-7xl flex h-16 items-center justify-between px-6">
          {/* Logo Brand */}
          <div onClick={resetToHome} className="flex cursor-pointer items-center gap-2 group transition-all duration-300">
            <div className="relative flex h-10 w-10 items-center justify-between rounded-lg bg-white p-1.5 transition-transform duration-300 group-hover:scale-105 shadow-md">
              <div className="flex h-full w-[4px] rounded bg-black"></div>
              <div className="flex h-full w-[4px] rounded bg-neutral-400"></div>
              <div className="flex h-full w-[4px] rounded bg-neutral-200"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-black uppercase tracking-widest leading-none text-white">
                AiOrbit
              </span>
              <span className="text-[10px] font-medium tracking-tight text-[#86868b] leading-none mt-1">
                Leaderboard
              </span>
            </div>
          </div>

          {/* Desktop Tab Selector */}
          <nav className="hidden md:flex items-center gap-1 bg-[#0d0d0d] border border-[#1c1c1e] rounded-full p-1 leading-none">
            <button
              onClick={() => { setTab("tools"); setShowSavedOnly(false); }}
              className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold tracking-tight transition-all duration-300 ${
                tab === "tools" && !showSavedOnly
                  ? "bg-white text-black shadow"
                  : "text-[#86868b] hover:text-white"
              }`}
            >
              <Sparkles className="h-3.5 w-3.5" />
              {t.aiTools}
            </button>
            <button
              onClick={() => { setTab("models"); setShowSavedOnly(false); }}
              className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold tracking-tight transition-all duration-300 ${
                tab === "models" && !showSavedOnly
                  ? "bg-white text-black shadow"
                  : "text-[#86868b] hover:text-white"
              }`}
            >
              <Cpu className="h-3.5 w-3.5" />
              {t.aiModels}
            </button>
            <button
              onClick={() => { setTab("companies"); setShowSavedOnly(false); }}
              className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold tracking-tight transition-all duration-300 ${
                tab === "companies" && !showSavedOnly
                  ? "bg-white text-black shadow"
                  : "text-[#86868b] hover:text-white"
              }`}
            >
              <Building2 className="h-3.5 w-3.5" />
              {t.aiCompanies}
            </button>
            <button
              onClick={() => { setShowSavedOnly(true); }}
              className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold tracking-tight transition-all duration-300 ${
                showSavedOnly
                  ? "bg-white text-black shadow"
                  : "text-[#86868b] hover:text-white"
              }`}
            >
              <Bookmark className="h-3.5 w-3.5" />
              {t.bookmarks}
              {savedIds.length > 0 && (
                <span className={`inline-flex items-center justify-center rounded-full px-1.5 py-0.5 text-[9px] font-bold ${showSavedOnly ? 'bg-black text-white' : 'bg-neutral-800 text-white'}`}>
                  {savedIds.length}
                </span>
              )}
            </button>
          </nav>

          {/* Right Header actions (Language selector & Back link) */}
          <div className="flex items-center gap-3">
            <a 
              href="/" 
              className="hidden sm:flex items-center gap-1 text-xs font-semibold text-[#86868b] hover:text-white transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to Portal
            </a>

            <div className="relative">
              <button
                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                className="flex items-center gap-1 rounded-full border border-[#1c1c1e] bg-[#0d0d0d] px-3 py-1.5 text-[11px] font-semibold text-[#86868b] hover:border-neutral-500 hover:text-white transition-all duration-300"
              >
                <Languages className="h-3.5 w-3.5" />
                <span className="uppercase">{language}</span>
                <ChevronDown className="h-3 w-3" />
              </button>
              
              {isLangDropdownOpen && (
                <div className="absolute right-0 mt-2 w-28 rounded-lg border border-[#1c1c1e] bg-[#0d0d0d] p-1 shadow-xl">
                  <button
                    onClick={() => { setLanguage("en"); setIsLangDropdownOpen(false); }}
                    className="flex w-full items-center justify-between rounded px-2.5 py-1.5 text-left text-xs font-medium text-white hover:bg-neutral-900"
                  >
                    English 🇺🇸
                  </button>
                  <button
                    onClick={() => { setLanguage("hi"); setIsLangDropdownOpen(false); }}
                    className="flex w-full items-center justify-between rounded px-2.5 py-1.5 text-left text-xs font-medium text-white hover:bg-neutral-900"
                  >
                    हिंदी 🇮🇳
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Nav toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="rounded border border-[#1c1c1e] bg-[#0d0d0d] p-1.5 text-[#86868b] hover:text-white md:hidden"
            >
              <Menu className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation bar */}
        {isMobileMenuOpen && (
          <div className="border-t border-[#1c1c1e] bg-[#0d0d0d] px-4 py-3 md:hidden">
            <div className="flex flex-col gap-2">
              <button
                onClick={() => { setTab("tools"); setShowSavedOnly(false); setIsMobileMenuOpen(false); }}
                className={`flex items-center gap-2 rounded px-3 py-2 text-xs font-semibold ${
                  tab === "tools" && !showSavedOnly ? "bg-white text-black" : "text-white"
                }`}
              >
                <Sparkles className="h-3.5 w-3.5" />
                {t.aiTools}
              </button>
              <button
                onClick={() => { setTab("models"); setShowSavedOnly(false); setIsMobileMenuOpen(false); }}
                className={`flex items-center gap-2 rounded px-3 py-2 text-xs font-semibold ${
                  tab === "models" && !showSavedOnly ? "bg-white text-black" : "text-white"
                }`}
              >
                <Cpu className="h-3.5 w-3.5" />
                {t.aiModels}
              </button>
              <button
                onClick={() => { setTab("companies"); setShowSavedOnly(false); setIsMobileMenuOpen(false); }}
                className={`flex items-center gap-2 rounded px-3 py-2 text-xs font-semibold ${
                  tab === "companies" && !showSavedOnly ? "bg-white text-black" : "text-white"
                }`}
              >
                <Building2 className="h-3.5 w-3.5" />
                {t.aiCompanies}
              </button>
              <button
                onClick={() => { setShowSavedOnly(true); setIsMobileMenuOpen(false); }}
                className={`flex items-center gap-2 rounded px-3 py-2 text-xs font-semibold ${
                  showSavedOnly ? "bg-white text-black" : "text-white"
                }`}
              >
                <Bookmark className="h-3.5 w-3.5" />
                {t.bookmarks} ({savedIds.length})
              </button>
              <a
                href="/"
                className="flex items-center gap-2 rounded px-3 py-2 text-xs font-semibold text-[#86868b]"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Back to Portal
              </a>
            </div>
          </div>
        )}
      </header>

      {/* 2. Hero Section (Compact stats header banner) */}
      <section className="relative w-full border-b border-[#1c1c1e] bg-[#08080a] py-6 px-6 overflow-hidden">
        <div className="mx-auto max-w-7xl relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex flex-col">
            <h1 className="text-xl sm:text-2xl font-black tracking-tight leading-none text-white flex items-center gap-2">
              <Layers3 className="h-5 w-5 text-neutral-400" />
              AiOrbit Industry Leaderboard
            </h1>
            <p className="text-xs text-[#86868b] mt-1.5 leading-none">
              Tracking growth velocity, usage volume, and developer votes across top AI assets.
            </p>
          </div>

          {/* Stats Metrics header */}
          {stats && (
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-[#86868b] uppercase tracking-wider leading-none">Total Votes</span>
                <span className="text-sm font-extrabold text-white mt-1 leading-none">
                  {stats.totalVotes.toLocaleString()}
                </span>
              </div>
              <div className="h-8 w-px bg-[#1c1c1e] hidden sm:block"></div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-[#86868b] uppercase tracking-wider leading-none">Active Tools</span>
                <span className="text-sm font-extrabold text-white mt-1 leading-none">{stats.totalTools}</span>
              </div>
              <div className="h-8 w-px bg-[#1c1c1e] hidden sm:block"></div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-[#86868b] uppercase tracking-wider leading-none">Active Models</span>
                <span className="text-sm font-extrabold text-white mt-1 leading-none">{stats.totalModels}</span>
              </div>
              <div className="h-8 w-px bg-[#1c1c1e] hidden sm:block"></div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-[#86868b] uppercase tracking-wider leading-none">Hot Area</span>
                <span className="text-xs font-bold text-black bg-white rounded px-2 py-0.5 mt-1 leading-none shadow-sm">
                  {stats.hotCategory}
                </span>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 3. Main Dashboard Body */}
      <main className="mx-auto max-w-7xl px-6 py-6 flex flex-col lg:flex-row gap-6 items-start">
        {/* Left Filters Panel */}
        <aside className="w-full lg:w-64 flex-shrink-0 lg:sticky lg:top-24">
          <div className="relative w-full rounded-lg border border-[#1c1c1e] bg-[#0d0d0d] px-4 py-1.5 h-11 flex items-center mb-4 focus-within:border-neutral-500 transition-all duration-300">
            <Search className="h-4 w-4 text-[#86868b] flex-shrink-0 mr-2" />
            <input
              type="text"
              placeholder="Search products, details..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent text-xs text-white placeholder:text-[#86868b] focus:outline-none"
            />
          </div>

          <Filters
            tab={tab}
            selectedCategory={category}
            setSelectedCategory={setCategory}
            categories={categories}
            sort={sort}
            setSort={setSort}
            allItems={items}
            language={language}
          />
        </aside>

        {/* Right Directory Content Grid */}
        <section className="w-full flex-grow">
          {isLoading ? (
            <SkeletonLoader />
          ) : error ? (
            <div className="rounded-lg border border-red-950 bg-red-950/20 p-4 text-center text-xs text-red-200 flex items-center justify-center gap-2">
              <AlertTriangle className="h-4 w-4 text-red-500" />
              <span>{error}</span>
              <button onClick={fetchData} className="ml-2 underline font-semibold hover:text-white">
                Retry
              </button>
            </div>
          ) : globalSearchResults ? (
            /* Search Result Overlays */
            <div className="flex flex-col gap-8">
              {/* Tools search results */}
              <div>
                <h3 className="text-xs font-bold text-[#86868b] uppercase tracking-widest mb-4 px-1">
                  {t.toolsMatched} ({globalSearchResults.tools.length})
                </h3>
                {globalSearchResults.tools.length > 0 ? (
                  <>
                    <div className="hidden md:block">
                      <LeaderboardTable
                        items={globalSearchResults.tools}
                        tab="tools"
                        savedIds={savedIds}
                        toggleSave={toggleSave}
                      />
                    </div>
                    <div className="block md:hidden">
                      <LeaderboardCard
                        tab="tools"
                        items={globalSearchResults.tools}
                        savedIds={savedIds}
                        toggleSave={toggleSave}
                      />
                    </div>
                  </>
                ) : (
                  <p className="text-xs text-[#86868b] italic py-3 px-1">{t.noToolsMatched}</p>
                )}
              </div>

              {/* Models search results */}
              <div>
                <h3 className="text-xs font-bold text-[#86868b] uppercase tracking-widest mb-4 px-1">
                  {t.modelsMatched} ({globalSearchResults.models.length})
                </h3>
                {globalSearchResults.models.length > 0 ? (
                  <>
                    <div className="hidden md:block">
                      <LeaderboardTable
                        items={globalSearchResults.models}
                        tab="models"
                        savedIds={savedIds}
                        toggleSave={toggleSave}
                      />
                    </div>
                    <div className="block md:hidden">
                      <LeaderboardCard
                        tab="models"
                        items={globalSearchResults.models}
                        savedIds={savedIds}
                        toggleSave={toggleSave}
                      />
                    </div>
                  </>
                ) : (
                  <p className="text-xs text-[#86868b] italic py-3 px-1">{t.noModelsMatched}</p>
                )}
              </div>

              {/* Companies search results */}
              <div>
                <h3 className="text-xs font-bold text-[#86868b] uppercase tracking-widest mb-4 px-1">
                  {t.companiesMatched} ({globalSearchResults.companies.length})
                </h3>
                {globalSearchResults.companies.length > 0 ? (
                  <>
                    <div className="hidden md:block">
                      <LeaderboardTable
                        items={globalSearchResults.companies}
                        tab="companies"
                        savedIds={savedIds}
                        toggleSave={toggleSave}
                      />
                    </div>
                    <div className="block md:hidden">
                      <LeaderboardCard
                        tab="companies"
                        items={globalSearchResults.companies}
                        savedIds={savedIds}
                        toggleSave={toggleSave}
                      />
                    </div>
                  </>
                ) : (
                  <p className="text-xs text-[#86868b] italic py-3 px-1">{t.noCompaniesMatched}</p>
                )}
              </div>
            </div>
          ) : items.length > 0 ? (
            /* Standard Listing Table */
            <>
              <div className="hidden md:block">
                <LeaderboardTable
                  items={items}
                  tab={tab}
                  savedIds={savedIds}
                  toggleSave={toggleSave}
                />
              </div>
              <div className="block md:hidden">
                <LeaderboardCard
                  tab={tab}
                  items={items}
                  savedIds={savedIds}
                  toggleSave={toggleSave}
                />
              </div>
            </>
          ) : (
            /* Empty State */
            <EmptyState
              title={showSavedOnly ? t.emptyTitleSaved : t.emptyTitleFilter}
              description={showSavedOnly ? t.emptyDescSaved : t.emptyDescFilter}
              actionLabel={showSavedOnly ? t.emptyActionSaved : t.emptyActionFilter}
              onAction={showSavedOnly ? () => setShowSavedOnly(false) : resetFilters}
            />
          )}
        </section>
      </main>

      {/* 4. Footer */}
      <footer className="w-full border-t border-[#1c1c1e] bg-[#050507] py-12 px-6 mt-12 text-center text-xs text-[#86868b]">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 AiOrbit Portal. All rights reserved. Data updated hourly.</p>
          <div className="flex items-center gap-4">
            <a href="/" className="hover:text-white transition-colors">Portal Home</a>
            <span className="text-[#1c1c1e]">•</span>
            <a href="#" className="hover:text-white transition-colors">Documentation</a>
            <span className="text-[#1c1c1e]">•</span>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
