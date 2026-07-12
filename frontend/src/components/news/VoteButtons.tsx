"use client";

import { useEffect, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { ICONS } from "@/lib/icons";
import { API_URL } from "@/lib/api";
import { getClientId } from "@/lib/clientId";

type Vote = "up" | "down" | null;

interface VoteButtonsProps {
  up: number;
  down: number;
  id: string;
  layout?: "row" | "col";
  size?: "sm" | "lg";
  /** Equal-width buttons filling their container (CSS grid, 1fr each) — used in the mobile equal-width grid. */
  fluid?: boolean;
}

/**
 * Real, persisted voting via POST /api/news/:slug/vote — replaces the old
 * app's localStorage-only fake tally (see the component's own git history:
 * it used to add +1 to a static server-seeded count and never sent
 * anything anywhere). `id` here is the article's slug (NewsArticleDTO.id
 * IS the slug — see backend/src/modules/news/news.services.ts).
 *
 * The server is authoritative: a click always sends the clicked direction,
 * and the server's response (`myVote`) — not client-side toggle logic —
 * decides whether that was a new vote or an un-vote, matching exactly how
 * the backend itself decides it. UI updates only once that response comes
 * back, not optimistically, so what's on screen always reflects what's
 * actually persisted.
 */
export function VoteButtons({ up, down, id, layout = "row", size = "sm", fluid = false }: VoteButtonsProps) {
  const key = "tas_vote_" + id;
  const [vote, setVote] = useState<Vote>(null);
  const [counts, setCounts] = useState({ up, down });
  const [pending, setPending] = useState(false);
  const lg = size === "lg";

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(key);
      if (stored === "up" || stored === "down") setVote(stored);
    } catch {
      // localStorage unavailable — ignore
    }
  }, [key]);

  const cast = async (dir: "up" | "down") => {
    if (pending) return;
    setPending(true);
    try {
      const res = await fetch(`${API_URL}/api/news/${encodeURIComponent(id)}/vote`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clientId: getClientId(), value: dir === "up" ? 1 : -1 }),
      });
      if (!res.ok) throw new Error(`vote failed: ${res.status}`);
      const data: { upvotes: number; downvotes: number; myVote: 1 | -1 | null } = await res.json();
      setCounts({ up: data.upvotes, down: data.downvotes });
      const nextVote: Vote = data.myVote === 1 ? "up" : data.myVote === -1 ? "down" : null;
      setVote(nextVote);
      try {
        if (nextVote) window.localStorage.setItem(key, nextVote);
        else window.localStorage.removeItem(key);
      } catch {
        // localStorage unavailable — ignore
      }
    } catch (err) {
      console.error("Vote failed:", err);
    } finally {
      setPending(false);
    }
  };

  const renderButton = (dir: "up" | "down", count: number, path: string) => {
    const on = vote === dir;
    return (
      <button
        onClick={(e) => {
          e.stopPropagation();
          cast(dir);
        }}
        disabled={pending}
        aria-pressed={on}
        aria-label={dir === "up" ? "Upvote" : "Downvote"}
        className="tas-vote"
        data-on={on ? "" : undefined}
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          gap: lg ? 8 : 5,
          height: lg ? 40 : 30,
          padding: lg ? "0 16px" : "0 9px",
          width: fluid ? "100%" : undefined,
          minWidth: lg ? 44 : 30,
          font: lg ? "var(--fw-medium) var(--fs-body)/1 var(--font-sans)" : "var(--fw-medium) var(--fs-xs)/1 var(--font-mono)",
          color: on ? "var(--purple-text)" : "var(--text-secondary)",
          background: on ? "var(--purple-soft)" : lg ? "var(--bg-elevated)" : "transparent",
          border: `1px solid ${on ? "var(--purple-border)" : "var(--border-default)"}`,
          borderRadius: lg ? "var(--news-radius-md)" : "var(--news-radius-sm)",
          boxShadow: lg && !on ? "var(--highlight-top)" : "none",
          cursor: pending ? "default" : "pointer",
          opacity: pending ? 0.7 : 1,
          transition: "var(--transition-colors)",
        }}
      >
        <Icon path={path} size={lg ? 17 : 14} />
        <span style={{ minWidth: 8 }}>{count.toLocaleString()}</span>
      </button>
    );
  };

  if (fluid) {
    return (
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, width: "100%" }} onClick={(e) => e.stopPropagation()}>
        {renderButton("up", counts.up, ICONS.arrowUp)}
        {renderButton("down", counts.down, ICONS.arrowDown)}
      </div>
    );
  }

  return (
    <div
      style={{ display: "inline-flex", flexDirection: layout === "col" ? "column" : "row", gap: lg ? 8 : 6 }}
      onClick={(e) => e.stopPropagation()}
    >
      {renderButton("up", counts.up, ICONS.arrowUp)}
      {renderButton("down", counts.down, ICONS.arrowDown)}
    </div>
  );
}
