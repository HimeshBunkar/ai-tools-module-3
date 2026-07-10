import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { leaderboardQuerySchema } from "./leaderboard.schemas.js";
import { LeaderboardController } from "./leaderboard.controller.js";
const router = new Hono();
router.get("/", zValidator("query", leaderboardQuerySchema), LeaderboardController.getLeaderboard);
export default router;
