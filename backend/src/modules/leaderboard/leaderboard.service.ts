import { PrismaClient } from '@prisma/client';

export class LeaderboardService {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async listTools(category?: string) {
    const where: any = {};
    if (category && category !== 'All Categories') {
      where.category = { contains: category, mode: 'insensitive' };
    }
    return this.prisma.leaderboardTool.findMany({
      where,
      orderBy: { rank: 'asc' },
    });
  }

  async listModels(category?: string) {
    const where: any = {};
    if (category && category !== 'All Categories') {
      where.category = { contains: category, mode: 'insensitive' };
    }
    return this.prisma.leaderboardModel.findMany({
      where,
      orderBy: { rank: 'asc' },
    });
  }

  async listCompanies() {
    return this.prisma.leaderboardCompany.findMany({
      orderBy: { rank: 'asc' },
    });
  }
}
