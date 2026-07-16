import { PrismaClient } from '@prisma/client';

export class RobotsService {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async listRobots() {
    return this.prisma.robot.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }
}
