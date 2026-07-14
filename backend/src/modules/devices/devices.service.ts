import { PrismaClient } from '@prisma/client';

export class DevicesService {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async listDevices() {
    return this.prisma.device.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }
}
