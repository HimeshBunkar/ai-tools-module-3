import { Context } from 'hono';
import { getPrisma } from '../../lib/prisma.js';
import { VideosService } from './videos.service.js';

export class VideosController {
  async listVideos(c: Context) {
    const prisma = getPrisma(c.env);
    const service = new VideosService(prisma);

    try {
      const videos = await service.listVideos();
      return c.json(videos);
    } catch (error: any) {
      return c.json({ error: error.message }, 500);
    } finally {
      await prisma.$disconnect();
    }
  }
}
