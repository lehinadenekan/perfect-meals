import { PrismaClient } from '@prisma/client';
import imageService from '../app/services/imageService';

const prisma = new PrismaClient();

async function migrateImages() {
  console.log('Starting image migration...');
  
  // Get all recipes with Spoonacular image URLs
  const recipes = await prisma.recipe.findMany({
    where: {
      imageUrl: {
        startsWith: 'https://spoonacular.com'
      }
    }
  });

  console.log(`Found ${recipes.length} recipes with Spoonacular images`);

  // Process each recipe
  for (const recipe of recipes) {
    try {
      if (!recipe.imageUrl) continue;

      console.log(`Processing recipe: ${recipe.title}`);
      
      // Download and store the image
      const localImageUrl = await imageService.downloadAndStoreImage(recipe.imageUrl);
      
      if (localImageUrl) {
        // Update the recipe with the local image URL
        await prisma.recipe.update({
          where: { id: recipe.id },
          data: { imageUrl: localImageUrl }
        });
        console.log(`Updated image for recipe: ${recipe.title}`);
      }
    } catch (error) {
      console.error(`Error processing recipe ${recipe.title}:`, error);
    }
  }

  console.log('Image migration completed');
}

// Run the migration
migrateImages()
  .catch(console.error)
  .finally(() => prisma.$disconnect()); 