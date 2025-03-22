import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import imageService from '@/app/services/imageService';

export async function POST() {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get all recipes with external image URLs
    const recipes = await prisma.recipe.findMany({
      where: {
        OR: [
          // Check for any external URLs
          { imageUrl: { startsWith: 'http://' } },
          { imageUrl: { startsWith: 'https://' } },
          // Exclude local URLs
          { NOT: { imageUrl: { startsWith: '/images/' } } },
          { NOT: { imageUrl: { startsWith: '/static/' } } }
        ]
      }
    });

    console.log(`Found ${recipes.length} recipes with external images`);

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