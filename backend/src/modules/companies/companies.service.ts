import { PrismaClient } from '@prisma/client';

export class CompaniesService {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async listCompanies() {
    return this.prisma.company.findMany({
      orderBy: { name: 'asc' },
    });
  }

  async getCompanyDetails(slug: string) {
    return this.prisma.company.findUnique({
      where: { slug },
      include: {
        tools: {
          select: {
            id: true,
            slug: true,
            name: true,
            logoUrl: true,
            description: true,
            pricingModel: true,
            avgRating: true,
            _count: { select: { reviews: true } }
          }
        }
      }
    });
  }
}
