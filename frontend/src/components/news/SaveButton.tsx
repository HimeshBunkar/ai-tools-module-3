"use client";

import { useEffect, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { ICONS } from "@/lib/icons";
import { API_URL } from "@/lib/api";
import { getClientId } from "@/lib/clientId";

interface SaveButtonProps {
  id: string;
  /** Fixed width filling its container (no content-driven growth) — used in the mobile equal-width grid. */
  fluid?: boolean;
}

/**
 * Real, persisted bookmarking via POST/DELETE /api/news/:slug/bookmark —
 * replaces the old app's localStorage-only toggle. `id` is the article's
 * slug (see VoteButtons.tsx's comment on why NewsArticleDTO.id is a slug).
 *
 * The "is this saved" indicator itself is still read from localStorage on
 * mount, same as before — the backend does persist a real NewsBookmark row,
 * but there's no GET endpoint yet to check "is clientId X's bookmark set
 * for this article", so a cleared-localStorage/different-browser session
 * won't show the saved state even though the server-side bookmark still
 * exists. Not a bug — a known, narrower scope than votes/comments for this
 * pass; flagged rather than silently left as a gap.
 */
export function SaveButton({ id, fluid }: SaveButtonProps) {
  const key = "tas_bm_" + id;
  const [saved, setSaved] = useState(false);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    try {
      setSaved(window.localStorage.getItem(key) === "1");
    } catch {
      // localStorage unavailable — ignore
    }
  }, [key]);

  const toggle = async () => {
    if (pending) return;
    setPending(true);
    const next = !saved;
    try {
      const clientId = getClientId();
      const res = next
        ? await fetch(`${API_URL}/api/news/${encodeURIComponent(id)}/bookmark`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ clientId }),
          })
        : await fetch(`${API_URL}/api/news/${encodeURIComponent(id)}/bookmark?clientId=${encodeURIComponent(clientId)}`, {
            method: "DELETE",
          });
      if (!res.ok) throw new Error(`bookmark failed: ${res.status}`);
      setSaved(next);
      try {
        if (next) window.localStorage.setItem(key, "1");
        else window.localStorage.removeItem(key);
      } catch {
        // localStorage unavailable — ignore
      }
    } catch (err) {
      console.error("Bookmark failed:", err);
    } finally {
      setPending(false);
    }
  };

  return (
    <button
      onClick={toggle}
      disabled={pending}
      aria-pressed={saved}
      className="tas-savebtn"
      data-on={saved ? "" : undefined}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: fluid ? "center" : "flex-start",
        width: fluid ? "100%" : "auto",
        gap: 8,
        height: 40,
        padding: "0 16px",
        borderRadius: "var(--news-radius-md)",
        cursor: pending ? "default" : "pointer",
        opacity: pending ? 0.7 : 1,
        transition: "var(--transition-colors)",
        font: "var(--fw-medium) var(--fs-body)/1 var(--font-sans)",
        color: saved ? "var(--purple-text)" : "var(--text-secondary)",
        background: saved ? "var(--purple-soft)" : "var(--bg-elevated)",
        border: `1px solid ${saved ? "var(--purple-border)" : "var(--border-default)"}`,
        boxShadow: "var(--highlight-top)",
      }}
    >
      <Icon path={ICONS.bookmark} size={17} fill={saved} />
      {saved ? "Saved" : "Save"}
    </button>
  );
}
