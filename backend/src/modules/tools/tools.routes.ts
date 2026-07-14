import { Hono } from 'hono';
import { ToolsController } from './tools.controller.js';

const router = new Hono();
const controller = new ToolsController();

router.get('/', (c) => controller.listTools(c));
router.get('/:slug', (c) => controller.getToolDetails(c));
router.post('/:slug/reviews', (c) => controller.submitReview(c));
router.post('/:slug/bookmark', (c) => controller.toggleBookmark(c));

export { router as toolsRouter };
