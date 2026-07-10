import { prisma } from "@/lib/prisma";

/**
 * TEMPORARY: Module 11 (User & Authentication) owns real sessions/cookies.
 * Until that lands, every write in this module (bookmarks, reviews) acts as
 * this single seeded demo user so the feature is fully wired end-to-end and
 * only needs its identity source swapped out later — no call-site changes.
 */
const DEMO_USER_EMAIL = "demo@example.com";

export async function getCurrentUserId(): Promise<string> {
  const user = await prisma.user.upsert({
    where: { email: DEMO_USER_EMAIL },
    update: {},
    create: { email: DEMO_USER_EMAIL, name: "Demo User" },
  });
  return user.id;
}