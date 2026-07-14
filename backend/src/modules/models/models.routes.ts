import { Hono } from 'hono';
import { ModelsController } from './models.controller.js';

const router = new Hono();
const controller = new ModelsController();

router.get('/', (c) => controller.listModels(c));

export { router as modelsRouter };
