import { PrismaClient } from '@prisma/client'

const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined
}

const prisma = globalForPrisma.prisma ?? (
  new PrismaClient({
    log: ['query'],
    datasources: {
      db: {
        url: process.env.DATABASE_URL
      }
    }
    // Add connection management
  })
)

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export { prisma }