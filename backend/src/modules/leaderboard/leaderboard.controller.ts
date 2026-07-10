import type { Context } from "hono";
import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { fetchLeaderboardData } from "./leaderboard.services.js";
import { QuerySchema } from "./leaderboard.schemas.js";

export async function getLeaderboard(c: Context) {
  let prisma: PrismaClient | null = null;
  try {
    const connectionString = c.env.DATABASE_URL;
    if (!connectionString) {
      return c.json({ error: "DATABASE_URL is not configured" }, 500);
    }

    const adapter = new PrismaNeon({ connectionString });
    prisma = new PrismaClient({ adapter });

    const queryParams = c.req.query();
    const result = QuerySchema.safeParse(queryParams);
    if (!result.success) {
      return c.json({ error: "Invalid query parameters", details: result.error.format() }, 400);
    }

    const queryInput = result.data;
    const data = await fetchLeaderboardData(prisma, queryInput);

    if (queryInput.tab === "tools") {
      data.items = data.items.map((item) => {
        let parsedTags = [];
        try {
          parsedTags = JSON.parse(item.tags || "[]");
        } catch {
          parsedTags = [];
        }
        return {
          ...item,
          tags: parsedTags
        };
      });
    }

    return c.json(data);
  } catch (error: any) {
    console.error("Leaderboard API Controller Error:", error);
    return c.json({ error: "Internal server error.", message: error.message }, 500);
  } finally {
    if (prisma) {
      await prisma.$disconnect();
    }
  }
}
