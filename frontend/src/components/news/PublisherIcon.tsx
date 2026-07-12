"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { ICONS } from "@/lib/icons";
import { API_URL } from "@/lib/api";
import type { NewsSource } from "@/types/news";

interface PublisherIconProps {
  source: NewsSource;
  box?: number;
}

/**
 * Resolves a stored logoUrl to an actually-fetchable URL. The backend
 * returns three different shapes depending on which tier resolved the logo
 * (see backend/src/modules/ingestion/publisherRegistry.ts):
 *   - `/logos/<file>.svg`            bundled brand SVG — served by THIS app
 *     (public/logos/*.svg, copied straight from the same bundled set the
 *     backend's SOURCE_LOGOS map references)
 *   - `/logos/publishers/<file>`     R2-backed, downloaded at ingestion —
 *     only the backend serves this path, so it needs the backend's origin
 *   - a full `https://...` URL        the live favicon-aggregator fallback —
 *     already absolute, needs no rewriting
 * This split didn't exist in the old app, where frontend and backend were
 * the same Next.js origin and every path just worked as-is.
 */
function resolveLogoSrc(logoUrl: string | null): string | null {
  if (!logoUrl) return null;
  if (logoUrl.startsWith("/logos/publishers/")) return `${API_URL}${logoUrl}`;
  return logoUrl;
}

/**
 * Renders a publisher's logo. Resolution itself now happens ONCE, server-side,
 * at Publisher-creation time (see ingestion/publisherRegistry.ts) and is
 * cached on source.logoUrl — this component just displays that, falling back
 * through the same tiers only if the stored URL turns out to 404 at render
 * time: domain favicon -> Google's favicon aggregator -> a tinted generic
 * icon as the last resort (never a text-initial avatar).
 */
export function PublisherIcon({ source, box = 44 }: PublisherIconProps) {
  const candidates = [
    resolveLogoSrc(source.logoUrl),
    `https://${source.domain}/favicon.ico`,
    `https://www.google.com/s2/favicons?domain=${source.domain}&sz=128`,
  ].filter((u): u is string => Boolean(u));

  const [index, setIndex] = useState(0);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    setIndex(0);
  }, [source.domain, source.logoUrl]);

  // Belt-and-suspenders: some blocked/unreachable hosts never fire a load or
  // error event at all (the request just hangs) instead of failing cleanly,
  // which would leave the icon stuck forever. A timeout forces it to the
  // next candidate regardless.
  useEffect(() => {
    if (index >= candidates.length) return;
    // Fires on the very next paint (~16ms after mount) — far too soon for a
    // real network image request to have finished normally, so this must
    // NOT treat "still loading" (!img.complete) as failure, or it advances
    // past every real logo before it had any chance to load (invisible on
    // localhost, where same-machine requests often do finish within a
    // frame — but on any real network, i.e. production, this fired on
    // nearly every image and cascaded straight to the last-resort
    // placeholder). Only catches a request that has ALREADY synchronously
    // resolved to a broken image before this effect ran.
    const checkImmediate = () => {
      const img = imgRef.current;
      if (img && img.complete && img.naturalWidth === 0) {
        setIndex((i) => i + 1);
      }
    };
    // By 2.5s, any real image load should be long done — if it still hasn't
    // fired load/error at all, that's a genuine hang, so the broader
    // "not complete OR zero-width" check is correct here.
    const checkAfterTimeout = () => {
      const img = imgRef.current;
      if (img && (!img.complete || img.naturalWidth === 0)) {
        setIndex((i) => i + 1);
      }
    };
    const immediate = requestAnimationFrame(checkImmediate);
    const timeout = setTimeout(checkAfterTimeout, 2500);
    return () => {
      cancelAnimationFrame(immediate);
      clearTimeout(timeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- candidates is derived fresh each render from source; index is the real dependency
  }, [index, source.domain, source.logoUrl]);

  const radius = box <= 18 ? "var(--radius-xs)" : box >= 40 ? "var(--news-radius-md)" : "var(--news-radius-sm)";
  const imgSize = Math.round(box * 0.72);
  const c = source.color;
  const src = candidates[index];

  return (
    <span
      style={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: box,
        height: box,
        flex: "none",
        borderRadius: radius,
        background: "#F3F3F5",
        border: "1px solid rgba(0, 0, 0, 0.06)",
        boxShadow: box >= 40 ? "0 1px 2px rgba(0, 0, 0, 0.25)" : "none",
        overflow: "hidden",
      }}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element -- mixes bundled local assets and arbitrary external favicon URLs; next/image optimization isn't needed for a tiny icon.
        <img
          key={src}
          ref={imgRef}
          src={src}
          alt={`${source.name} logo`}
          width={imgSize}
          height={imgSize}
          style={{ objectFit: "contain", width: imgSize, height: imgSize }}
          onError={() => setIndex((i) => i + 1)}
        />
      ) : (
        <Icon path={ICONS.newspaper} size={Math.round(box * 0.46)} stroke={1.6} style={{ color: c }} />
      )}
    </span>
  );
}
