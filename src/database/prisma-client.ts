import { PrismaClient } from "@prisma/client";
import { env } from "~/constants/env";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

const prismaClient =
  globalForPrisma.prisma ||
  new PrismaClient({
    datasources: {
      db: {
        url: env.DATABASE_URL,
      },
    },
    log: ["error", "warn"],
  });

globalForPrisma.prisma = prismaClient;

export { prismaClient };
