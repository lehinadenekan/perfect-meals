"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
var client_1 = require("@prisma/client");
// Use globalThis for broader compatibility and Prisma's recommended pattern
var globalForPrisma = globalThis;
// Initialize prisma client using the nullish coalescing operator
// and keep the original logging configuration
exports.prisma = (_a = globalForPrisma.prisma) !== null && _a !== void 0 ? _a : new client_1.PrismaClient({
    log: ['query', 'error', 'warn'], // Keep original logging
});
// Prevent multiple instances in development
if (process.env.NODE_ENV !== 'production')
    globalForPrisma.prisma = exports.prisma;
// Export the instance (default export removed as named export is standard)
// export default prisma; // Removing default export 
