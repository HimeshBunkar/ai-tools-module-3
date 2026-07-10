import { Hono } from "hono";
import { getLeaderboard } from "./leaderboard.controller.js";

const leaderboardRouter = new Hono();

leaderboardRouter.get("/", getLeaderboard);

export { leaderboardRouter };
