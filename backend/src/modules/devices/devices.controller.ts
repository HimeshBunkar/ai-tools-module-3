import { Context } from 'hono';
import { getPrisma } from '../../lib/prisma.js';
import { DevicesService } from './devices.service.js';

export class DevicesController {
  async listDevices(c: Context) {
    const prisma = getPrisma(c.env);
    const service = new DevicesService(prisma);

    try {
      const devices = await service.listDevices();
      return c.json(devices);
    } catch (error: any) {
      return c.json({ error: error.message }, 500);
    } finally {
      await prisma.$disconnect();
    }
  }
}
