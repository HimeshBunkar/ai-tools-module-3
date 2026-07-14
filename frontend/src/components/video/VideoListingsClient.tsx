"use client";

import { useState, useMemo } from "react";
import type { Video } from "@/types/video";
import { VideoCard } from "./VideoCard";

const FILTER_CHIPS = [
  { id: "all", label: "All Videos" },
  { id: "trending", label: "Trending" },
  { id: "tutorial", label: "Tutorials" },
  { id: "demo", label: "Demos" },
  { id: "talk", label: "Talks" },
];

interface VideoListingClientProps {
  videos: Video[];
}

export function VideoListingClient({ videos }: VideoListingClientProps) {
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    let list = videos.slice();
    if (filter !== "all") {
      list = list.filter((v) => v.filters.includes(filter) || v.category.toLowerCase() === filter);
    }
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (v) =>
          v.title.toLowerCase().includes(q) ||
          v.description.toLowerCase().includes(q) ||
          v.topics.some((t) => t.toLowerCase().includes(q)) ||
          v.channel.toLowerCase().includes(q)
      );
    }
    return list;
  }, [videos, filter, query]);

  return (
    <div
      className="news-scope"
      style={{
        maxWidth: "var(--content-max)",
        margin: "0 auto",
        padding: "48px var(--page-pad-x)",
      }}
    >
      {/* Header */}
      <header style={{ marginBottom: 32 }}>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: "var(--fw-bold)",
            fontSize: "clamp(2rem, 5vw, 3.25rem)",
            letterSpacing: "var(--ls-tighter)",
            color: "var(--text-primary)",
            margin: "0 0 12px",
            lineHeight: "var(--lh-tight)",
          }}
        >
          AI Videos
        </h1>
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: "var(--fw-regular)",
            fontSize: "var(--fs-lg)",
            color: "var(--text-secondary)",
            margin: 0,
            maxWidth: 640,
            lineHeight: "var(--lh-relaxed)",
          }}
        >
          Watch the latest AI tutorials, demos, model releases and talks from
          top researchers and creators.
        </p>
      </header>

      {/* Search */}
      <div
        className="tas-search"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          background: "var(--bg-surface)",
          border: "1px solid var(--border-default)",
          borderRadius: "var(--radius-xl)",
          padding: "10px 16px",
          marginBottom: 24,
          maxWidth: 560,
          boxShadow: "var(--highlight-top)",
        }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
          <circle cx="7" cy="7" r="4.5" stroke="var(--text-tertiary)" strokeWidth="1.5" />
          <path d="M10.5 10.5L13.5 13.5" stroke="var(--text-tertiary)" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <input
          type="text"
          placeholder="Search AI videos..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="tas-cinput"
          style={{
            flex: 1,
            background: "transparent",
            border: "none",
            outline: "none",
            fontFamily: "var(--font-sans)",
            fontSize: "var(--fs-sm)",
            color: "var(--text-primary)",
          }}
        />
        <kbd
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "var(--fs-2xs)",
            color: "var(--text-quaternary)",
            background: "var(--bg-elevated)",
            border: "1px solid var(--border-subtle)",
            borderRadius: "var(--radius-xs)",
            padding: "2px 6px",
          }}
        >
          ⌘K
        </kbd>
      </div>

      {/* Filter chips */}
      <div
        className="tas-scroll-x"
        style={{
          display: "flex",
          gap: 8,
          marginBottom: 32,
          overflowX: "auto",
        }}
      >
        {FILTER_CHIPS.map((chip) => (
          <button
            key={chip.id}
            onClick={() => setFilter(chip.id)}
            data-active={filter === chip.id ? true : undefined}
            className="tas-chip"
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: "var(--fw-medium)",
              fontSize: "var(--fs-sm)",
              color: filter === chip.id ? "var(--text-on-accent)" : "var(--text-secondary)",
              background: filter === chip.id ? "var(--accent)" : "var(--bg-surface)",
              border: `1px solid ${filter === chip.id ? "transparent" : "var(--border-default)"}`,
              borderRadius: "var(--radius-pill)",
              padding: "7px 16px",
              cursor: "pointer",
              whiteSpace: "nowrap",
              transition: "var(--transition-colors)",
            }}
          >
            {chip.label}
          </button>
        ))}
      </div>

      {/* Count */}
      <div
        style={{
          fontFamily: "var(--font-sans)",
          fontWeight: "var(--fw-semibold)",
          fontSize: "var(--fs-xs)",
          letterSpacing: "var(--ls-wider)",
          textTransform: "uppercase",
          color: "var(--text-primary)",
          marginBottom: 20,
        }}
      >
        Showing {filtered.length} {filtered.length === 1 ? "video" : "videos"}
      </div>

      {/* Video grid */}
      {filtered.length > 0 ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: 20,
          }}
        >
          {filtered.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      ) : (
        <div
          style={{
            textAlign: "center",
            padding: "80px 0",
            color: "var(--text-quaternary)",
            fontFamily: "var(--font-sans)",
            fontSize: "var(--fs-sm)",
          }}
        >
          No videos found. Try a different search or filter.
        </div>
      )}
    </div>
  );
}