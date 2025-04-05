import { PrismaClient } from '@prisma/client';

// Use globalThis for broader compatibility and Prisma's recommended pattern
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Initialize prisma client using the nullish coalescing operator
// and keep the original logging configuration
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ['query', 'error', 'warn'], // Keep original logging
  });

// Prevent multiple instances in development
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

// Export the instance (default export removed as named export is standard)
// export default prisma; // Removing default export 