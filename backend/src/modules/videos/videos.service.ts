import { PrismaClient } from '@prisma/client';

export class VideosService {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async listVideos() {
    return this.prisma.video.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }
}
