// test-db.js
const { PrismaClient } = require('@prisma/client');

async function main() {
  try {
    console.log('DATABASE_URL from .env:', process.env.DATABASE_URL);

    // Create a new instance explicitly with the connection string
    const prisma = new PrismaClient({
      datasources: {
        db: {
          url: "postgresql://postgres:postgres@localhost:5432/perfect_meals"
        }
      }
    });

    // Test connection
    const result = await prisma.$queryRaw`SELECT 1 as test`;
    console.log('Database connection successful:', result);
    
    await prisma.$disconnect();
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
}

main(); 