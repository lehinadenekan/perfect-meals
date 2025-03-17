import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function countRecipes() {
  try {
    const recipeCount = await prisma.recipe.count();
    console.log(`Total number of recipes in database: ${recipeCount}`);
  } catch (error) {
    console.error('Error counting recipes:', error);
  } finally {
    await prisma.$disconnect();
  }
}

countRecipes(); 