import { Hono } from 'hono';
import { VideosController } from './videos.controller.js';

const router = new Hono();
const controller = new VideosController();

router.get('/', (c) => controller.listVideos(c));

export { router as videosRouter };
