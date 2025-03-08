import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

async function createAdminUser() {
  try {
    const admin = await prisma.user.upsert({
      where: { email: 'admin@perfectmeals.com' },
      update: {},
      create: {
        email: 'admin@perfectmeals.com',
        name: 'Perfect Meals Admin',
      }
    });

    console.log('Admin user created:', admin);
  } catch (error) {
    console.error('Error creating admin user:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createAdminUser(); 