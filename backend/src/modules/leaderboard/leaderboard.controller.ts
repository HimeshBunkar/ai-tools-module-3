import { Context } from "hono";
import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { LeaderboardService } from "./leaderboard.services.js";
import type { LeaderboardQueryInput } from "./leaderboard.schemas.js";

export class LeaderboardController {
  static async getLeaderboard(c: Context) {
    try {
      const query = c.req.valid("query" as never) as unknown as LeaderboardQueryInput;

      // Simulate delay for testing if specified
      if (query.delay) {
        const delayMs = parseInt(query.delay, 10);
        await new Promise((resolve) => setTimeout(resolve, delayMs));
      }

      // Simulate error for testing if specified
      if (query.error === "true") {
        return c.json(
          { error: "Database connection failed. Please try again." },
          500
        );
      }

      // Setup database client with connection pooling neon adapter
      const connectionString = c.env.DATABASE_URL;
      if (!connectionString) {
        return c.json({ error: "DATABASE_URL is not set on the server." }, 500);
      }

      const adapter = new PrismaNeon({ connectionString });
      const prisma = new PrismaClient({ adapter });
      const service = new LeaderboardService(prisma);

      const data = await service.getLeaderboard(query);
      return c.json(data);
    } catch (error: any) {
      console.error("Leaderboard Controller Error:", error);
      return c.json({ error: "Internal server error." }, 500);
    }
  }
}
