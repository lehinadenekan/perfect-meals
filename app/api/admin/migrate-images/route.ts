import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import imageService from '@/app/services/imageService';

export async function POST(request: Request) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get all recipes with Spoonacular image URLs - using broader matching patterns
    const recipes = await prisma.recipe.findMany({
      where: {
        OR: [
          { imageUrl: { contains: 'spoonacular.com' } },
          { imageUrl: { contains: 'spoonacular.io' } }, 
          { imageUrl: { contains: 'spoonacular' } },
          // If the images are stored with a CDN domain
          { imageUrl: { startsWith: 'https://images.spoonacular' } },
          { imageUrl: { startsWith: 'https://cdn.spoonacular' } },
          // Check for specific spoonacular URL patterns
          { imageUrl: { contains: '-312x231.jpg' } }, // Common Spoonacular image size pattern
          { imageUrl: { contains: '-556x370.jpg' } }, // Another common Spoonacular image size
          // More general check for external URLs
          { imageUrl: { startsWith: 'http' } }
        ]
      }
    });

    console.log(`Found ${recipes.length} recipes with potential external images`);

    // Log the URLs for debugging
    recipes.forEach(recipe => {
      console.log(`Recipe ${recipe.title} has image URL: ${recipe.imageUrl}`);
    });

    const results = {
      total: recipes.length,
      success: 0,
      failed: 0,
      errors: [] as string[]
    };

    // Process each recipe
    for (const recipe of recipes) {
      try {
        if (!recipe.imageUrl) continue;

        console.log(`Processing recipe: ${recipe.title}`);
        
        // Download and store the image
        const localImageUrl = await imageService.downloadAndStoreImage(recipe.imageUrl, recipe.title);
        
        if (localImageUrl) {
          // Update the recipe with the local image URL
          await prisma.recipe.update({
            where: { id: recipe.id },
            data: { imageUrl: localImageUrl }
          });
          results.success++;
          console.log(`Updated image for recipe: ${recipe.title}`);
        } else {
          results.failed++;
          results.errors.push(`Failed to download image for ${recipe.title}`);
        }
      } catch (error) {
        results.failed++;
        const errorMessage = error instanceof Error ? error.message : String(error);
        results.errors.push(`Error processing ${recipe.title}: ${errorMessage}`);
        console.error(`Error processing recipe ${recipe.title}:`, error);
      }
    }

    return NextResponse.json({
      message: 'Image migration completed',
      results
    });
  } catch (error) {
    console.error('Error during image migration:', error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: `Failed to migrate images: ${errorMessage}` }, { status: 500 });
  }
} 