// scripts/mark-all-recipes-admin.ts
import { PrismaClient, RecipeSource } from '@prisma/client';

// Initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  console.log('Starting script to mark all existing recipes as ADMIN...');

  try {
    // Update all recipes where the source might not be ADMIN
    // Using an empty 'where' updates all records, but it's safer
    // to be slightly more specific if possible, though not critical here.
    const result = await prisma.recipe.updateMany({
      where: {        
        // You could add conditions here if needed, e.g., 
        // source: { not: RecipeSource.ADMIN } 
        // But for this request, updating all is fine.
      }, 
      data: {
        source: RecipeSource.ADMIN, // Set the source field to ADMIN
      },
    });

    console.log(`Successfully updated ${result.count} recipes to source: ADMIN.`);

  } catch (error) {
    console.error('Error updating recipes:', error);
    process.exit(1); // Exit with an error code if something goes wrong

  } finally {
    // Ensure the Prisma Client disconnects gracefully
    await prisma.$disconnect();
    console.log('Script finished.');
  }
}

// Execute the main function
main(); 