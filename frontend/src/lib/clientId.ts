"use client";

/**
 * Stable anonymous per-browser identity for votes/bookmarks/comments — the
 * same clientId-keyed pattern the backend's NewsVote/NewsBookmark/
 * NewsComment models use. Generated once and persisted in localStorage;
 * there's no real auth system yet (a separate module's concern), so this is
 * the whole identity story for now.
 */
const STORAGE_KEY = "tas_client_id";

export function getClientId(): string {
  if (typeof window === "undefined") return "";
  try {
    let id = window.localStorage.getItem(STORAGE_KEY);
    if (!id) {
      id = crypto.randomUUID();
      window.localStorage.setItem(STORAGE_KEY, id);
    }
    return id;
  } catch {
    // localStorage unavailable — fall back to a per-render id rather than crash;
    // votes/bookmarks just won't persist across a reload in that edge case.
    return crypto.randomUUID();
  }
}
