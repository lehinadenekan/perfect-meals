// app/api/recipes/my-recipes/route.ts
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next'; // Restore v4 import
import { authOptions } from '@/auth'; // Correct path
// import { auth } from '@/auth'; // Remove v5 import
import { prisma } from '@/lib/prisma';   // Adjust path if needed

// Force dynamic rendering, disable static generation
export const dynamic = 'force-dynamic';

export async function GET() {
  console.log("[API GET /my-recipes] Request received");
  try {
    const session = await getServerSession(authOptions); // Restore v4 call
    // const session = await auth(); // Remove v5 call
    const userId = session?.user?.id;

    if (!userId) {
      console.log("[API GET /my-recipes] Unauthorized attempt.");
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    console.log(`[API GET /my-recipes] Fetching recipes for user: ${userId}`);

    const userRecipes = await prisma.recipe.findMany({
      where: {
        authorId: userId, // Fetch recipes authored/imported by the user
      },
      select: {
        // Select necessary fields for RecipeCard and Modal
        id: true,
        title: true,
        description: true,
        imageUrl: true,
        source: true,
        servings: true,
        cookingTime: true,
        difficulty: true,
        // continent: true, // Ensure REMOVED
        // regionOfOrigin: true, // Ensure REMOVED
        createdAt: true,
        updatedAt: true,
        authorId: true,
        author: {
           select: { name: true, image: true } // Select only needed author fields
        },
        nutritionFacts: {
            select: { protein: true, carbs: true, fat: true }
        },
        savedBy: { // Keep specific select to check relation existence
          where: { id: userId },
          select: { id: true }
        },
        // Select other boolean flags if needed by RecipeCard
        isVegetarian: true,
        isVegan: true,
        isGlutenFree: true,
        isNutFree: true,
        isLowFodmap: true,
        isLactoseFree: true,
        isPescatarian: true,
        isFermented: true,
        // Add other fields as needed by RecipeCard/Modal
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Map the result to add the simple `isFavourite` boolean
    const recipesWithFavouriteStatus = userRecipes.map(recipe => {
      const isFavourite = recipe.savedBy?.length > 0;
      // Rename the destructured 'savedBy' variable to '_savedBy' to mark it as unused
      const { savedBy: _savedBy, ...recipeData } = recipe;
      return {
          ...recipeData,
          isFavourite: isFavourite
      };
    });

    console.log(`[API GET /my-recipes] Found ${recipesWithFavouriteStatus.length} recipes for user: ${userId}`);
    return NextResponse.json(recipesWithFavouriteStatus, { status: 200 });

  } catch (error: unknown) {
    console.error('[API GET /my-recipes] Error fetching user recipes:', error);
    const message = error instanceof Error ? error.message : 'An unexpected error occurred.';
    return NextResponse.json({ error: 'Failed to fetch recipes.', details: message }, { status: 500 });
  }
}