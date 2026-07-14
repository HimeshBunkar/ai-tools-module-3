/**
 * The Hono/Workers backend's origin — every real data fetch and mutation
 * goes here, never direct DB access from this app.
 *
 * Falls back to the production API, same as frontend/src/app/page.tsx's
 * own API_URL — that fallback is what's kept the homepage working
 * whether or not NEXT_PUBLIC_API_URL is actually configured in Cloudflare
 * Pages' dashboard. This was the only code path in the app that didn't
 * have it, and was throwing at module load on every /news request in
 * production as a result.
 */
function resolveApiUrl(): string {
  const raw = process.env.NEXT_PUBLIC_API_URL || "https://ai-orbit.palamrendra-pm.workers.dev";
  return raw.trim().replace(/\/$/, "");
}

/** Used by the client components (CommentBox, PublisherIcon, SaveButton, VoteButtons) — unchanged. */
export const API_URL = resolveApiUrl();

/**
 * Server-side-only origin, for the two News page.tsx server components.
 * api.aiorbit.club is a Cloudflare-proxied custom domain; a Pages Function
 * (this app's server-side render) fetching another Cloudflare-proxied zone
 * on the same account hits Cloudflare's same-account loop-prevention and
 * fails — confirmed via the news module's own build succeeding while every
 * server-side render of it failed in production. The Worker's own
 * `*.workers.dev` subdomain bypasses that proxy layer entirely (same
 * pattern already proven working in GraphOne's production app). Client-side
 * calls (API_URL above) are unaffected — a real browser request, not a
 * same-account Cloudflare-to-Cloudflare hop — so they're left untouched.
 */
function resolveServerApiUrl(): string {
  const raw = (process.env.NEWS_SERVER_API_URL || "ai-orbit.palamrendra-pm.workers.dev").trim();
  const withScheme = /^https?:\/\//.test(raw) ? raw : `https://${raw}`;
  return withScheme.replace(/\/$/, "");
}

export const SERVER_API_URL = resolveServerApiUrl();
