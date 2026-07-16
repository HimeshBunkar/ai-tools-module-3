import { Context } from 'hono';
import { getPrisma } from '../../lib/prisma.js';
import { HomepageService } from './homepage.service.js';

export class HomepageController {
  async getHomepageData(c: Context) {
    const prisma = getPrisma(c.env);
    const service = new HomepageService(prisma);

    try {
      const data = await service.getHomepageData();
      return c.json(data);
    } catch (error: any) {
      return c.json({ error: error.message }, 500);
    } finally {
      await prisma.$disconnect();
    }
  }
}
