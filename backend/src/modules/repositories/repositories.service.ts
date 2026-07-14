import { PrismaClient } from '@prisma/client';

export class RepositoriesService {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async listRepositories() {
    return this.prisma.repository.findMany({
      orderBy: { stars: 'desc' },
    });
  }
}
