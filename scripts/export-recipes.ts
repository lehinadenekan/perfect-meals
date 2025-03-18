import { PrismaClient } from '@prisma/client';

/**
 * Script to export all recipes from the database to JSON format
 * This ensures we have a complete backup of the live database data
 */
async function exportRecipes() {
  const prisma = new PrismaClient();
  
  try {
    // Fetch all recipes with their related data
    const recipes = await prisma.recipe.findMany({
      include: {
        ingredients: true,
        instructions: true,
        nutritionFacts: true,
        categories: true,
        tags: true
      }
    });
    
    // Output as JSON
    console.log(JSON.stringify(recipes, null, 2));
  } catch (error) {
    console.error('Error exporting recipes:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the export
exportRecipes(); 