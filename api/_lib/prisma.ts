// Shared Prisma Client singleton for all api/ functions. Vercel reuses warm
// serverless instances between invocations (Fluid Compute); stashing the
// client on globalThis avoids opening a fresh Postgres connection pool on
// every request, which would otherwise exhaust Neon's connection limit.
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient }

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}
