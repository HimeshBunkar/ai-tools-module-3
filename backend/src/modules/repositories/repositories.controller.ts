import { Context } from 'hono';
import { getPrisma } from '../../lib/prisma.js';
import { RepositoriesService } from './repositories.service.js';

export class RepositoriesController {
  async listRepositories(c: Context) {
    const prisma = getPrisma(c.env);
    const service = new RepositoriesService(prisma);

    try {
      const repos = await service.listRepositories();
      return c.json(repos);
    } catch (error: any) {
      return c.json({ error: error.message }, 500);
    } finally {
      await prisma.$disconnect();
    }
  }
}
