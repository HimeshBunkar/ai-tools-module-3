import { Hono } from 'hono';
import { DevicesController } from './devices.controller.js';

const router = new Hono();
const controller = new DevicesController();

router.get('/', (c) => controller.listDevices(c));

export { router as devicesRouter };
