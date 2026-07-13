import { PrismaClient } from '@prisma/client';

export class ModelsService {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async listModels() {
    return this.prisma.aIModel.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }
}
