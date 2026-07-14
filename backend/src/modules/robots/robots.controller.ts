import { Context } from 'hono';
import { getPrisma } from '../../lib/prisma.js';
import { RobotsService } from './robots.service.js';

export class RobotsController {
  async listRobots(c: Context) {
    const prisma = getPrisma(c.env);
    const service = new RobotsService(prisma);

    try {
      const robots = await service.listRobots();
      return c.json(robots);
    } catch (error: any) {
      return c.json({ error: error.message }, 500);
    } finally {
      await prisma.$disconnect();
    }
  }
}
