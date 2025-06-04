// lib/prisma.ts

import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Create a PrismaClient instance with type-safe bypass for __internal config
const prisma =
  globalForPrisma.prisma ??
  (new PrismaClient({
    log: ['query'],
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
    // ⬇️ This bypass allows internal config like statement_cache_size
  } as any))

// Optional: disable statement caching in dev to prevent "prepared statement already exists"
if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma

  // Disable statement cache (only needed in dev)
  ;(prisma as any)._engineConfig = {
    ...((prisma as any)._engineConfig || {}),
    __internal: {
      engine: {
        statement_cache_size: 0,
      },
    },
  }
}

export { prisma }
