import { Context } from 'hono';
import { getPrisma } from '../../lib/prisma.js';
import { ModelsService } from './models.service.js';

export class ModelsController {
  async listModels(c: Context) {
    const prisma = getPrisma(c.env);
    const service = new ModelsService(prisma);

    try {
      const models = await service.listModels();
      return c.json(models);
    } catch (error: any) {
      return c.json({ error: error.message }, 500);
    } finally {
      await prisma.$disconnect();
    }
  }
}
