import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
// Remove v5 import: import { auth } from '@/auth';
// Add v4 imports:
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/auth';
import imageService from '@/app/services/imageService';

export async function POST() {
  try {
    // Check authentication using v4 pattern
    // Replace v5 call: const session = await auth();
    const session = await getServerSession(authOptions);

    // Check user email from v4 session
    const userEmail = session?.user?.email;
    if (!userEmail) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Add admin check if required for this route
    // const isAdmin = userEmail && process.env.ADMIN_EMAILS?.split(',').includes(userEmail);
    // if (!isAdmin) {
    //   return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    // }


    // Get all recipes with potentially external image URLs to check
    const recipes = await prisma.recipe.findMany({
      where: {
        // Select recipes that *might* have external URLs, refine if needed
        // This logic might need adjustment based on exactly which URLs you want to migrate
        OR: [
          { imageUrl: { startsWith: 'http://' } },
          { imageUrl: { startsWith: 'https://' } },
          // If you ONLY want to migrate http/https, remove the NOT clauses
          // If you want to migrate anything NOT starting with /images or /static, keep them
           { NOT: { imageUrl: { startsWith: '/images/' } } },
           { NOT: { imageUrl: { startsWith: '/static/' } } }
        ],
        // Ensure imageUrl is not null or empty before attempting migration
        imageUrl: {
          not: null,
        },
        // Add another NOT check for empty string if necessary
        // NOT: { imageUrl: '' }
      },
       select: { id: true, title: true, imageUrl: true } // Select only needed fields
    });

    console.log(`Found ${recipes.length} recipes with potentially external images`);

    // Log the URLs for debugging
    recipes.forEach(recipe => {
      console.log(`Recipe ${recipe.title} has image URL: ${recipe.imageUrl}`);
    });

    const results = {
      totalChecked: recipes.length, // Renamed for clarity
      success: 0,
      failed: 0,
      skipped: 0, // Added skipped counter
      errors: [] as string[]
    };

    // Process each recipe
    for (const recipe of recipes) {
      try {
        // Ensure imageUrl is present and looks like a URL we want to migrate
        if (!recipe.imageUrl || !recipe.imageUrl.startsWith('http')) {
             results.skipped++;
             continue; // Skip if no URL or not an external URL
        }

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
          console.warn(`Failed to download image for recipe: ${recipe.title} from URL: ${recipe.imageUrl}`);
        }
      } catch (error) {
        results.failed++;
        const errorMessage = error instanceof Error ? error.message : String(error);
        results.errors.push(`Error processing ${recipe.title}: ${errorMessage}`);
        console.error(`Error processing recipe ${recipe.title}:`, error);
      }
    }

    console.log("Image migration results:", results); // Log results

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