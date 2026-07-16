import { Hono } from 'hono';
import { LeaderboardController } from './leaderboard.controller.js';
const router = new Hono();
const controller = new LeaderboardController();
router.get('/tools', (c) => controller.getTools(c));
router.get('/models', (c) => controller.getModels(c));
router.get('/companies', (c) => controller.getCompanies(c));
export { router as leaderboardRouter };
