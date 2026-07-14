import { Hono } from 'hono';
import { HomepageController } from './homepage.controller.js';

const router = new Hono();
const controller = new HomepageController();

router.get('/', (c) => controller.getHomepageData(c));

export { router as homepageRouter };
