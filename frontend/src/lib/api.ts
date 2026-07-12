/** The Hono/Workers backend's origin — every real data fetch and mutation goes here, never direct DB access from this app. */
function requireApiUrl(): string {
  const url = process.env.NEXT_PUBLIC_API_URL;
  if (!url) throw new Error("NEXT_PUBLIC_API_URL is not set — see .env.example");
  return url;
}

export const API_URL = requireApiUrl();
