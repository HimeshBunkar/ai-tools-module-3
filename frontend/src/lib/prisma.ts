import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

let prismaInstance: PrismaClient;

// Use Neon serverless adapter on Edge/Cloudflare deployment runtime to prevent TCP socket crashes
if (process.env.NODE_ENV === "production" || typeof (globalThis as typeof globalThis & { EdgeRuntime?: string }).EdgeRuntime === "string") {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL is required in production environment");
  }
  const adapter = new PrismaNeon({ connectionString });
  prismaInstance = new PrismaClient({ adapter });
} else {
  // Use standard Prisma Client in local Node.js environment
  prismaInstance =
    globalForPrisma.prisma ??
    new PrismaClient({
      log: ["error"],
    });
  globalForPrisma.prisma = prismaInstance;
}

export const prisma = prismaInstance;
