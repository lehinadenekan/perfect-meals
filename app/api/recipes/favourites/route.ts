// app/api/recipes/favourites/route.ts
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth'; // Adjust path if needed
import { prisma } from '@/lib/prisma';   // Adjust path if needed

export const dynamic = 'force-dynamic';

// --- GET User's Favourite Recipes ---
export async function GET() {
  console.log("[API GET /favourites] Request received");
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    if (!userId) {
      console.log("[API GET /favourites] Unauthorized attempt.");
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    console.log(`[API GET /favourites] Fetching favourite recipes for user: ${userId}`);

    // Find recipes explicitly saved/favourited by the user
    const favouriteRecipes = await prisma.recipe.findMany({
      where: {
        // Find recipes where the 'savedBy' relation contains this user
        savedBy: {
          some: {
            id: userId,
          },
        },
      },
      select: {
        // Select necessary fields for RecipeCard and Modal
        id: true,
        title: true,
        description: true,
        imageUrl: true,
        servings: true,
        cookingTime: true,
        difficulty: true,
        cuisineType: true,
        regionOfOrigin: true, // <-- ADDED THIS LINE
        createdAt: true,
        updatedAt: true,
        authorId: true,
        author: {
           select: { name: true, image: true } // Select only needed author fields
        },
        nutritionFacts: {
            select: { protein: true, carbs: true, fat: true }
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
        // Select other fields as needed
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Add isFavourite: true for consistency with the component expecting it
    const recipesWithFavouriteStatus = favouriteRecipes.map(recipe => ({
        ...recipe,
        isFavourite: true // Explicitly set for this endpoint's results
    }));

    console.log(`[API GET /favourites] Found ${recipesWithFavouriteStatus.length} favourite recipes for user: ${userId}`);
    return NextResponse.json(recipesWithFavouriteStatus, { status: 200 });

  } catch (error: unknown) {
    console.error('[API GET /favourites] Error fetching favourite recipes:', error);
    const message = error instanceof Error ? error.message : 'An unexpected error occurred.';
    return NextResponse.json({ error: 'Failed to fetch favourite recipes.', details: message }, { status: 500 });
  }
}

// --- POST - Add or Remove a Recipe from Favourites ---
export async function POST(request: Request) {
  console.log("[API POST /favourites] Request received");
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id; // Use ID for DB operations

    // Check for auth using userId
    if (!userId) {
      console.log("[API POST /favourites] Unauthorized attempt.");
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }
    console.log(`[API POST /favourites] User ID: ${userId}`);

    // Parse request body
    const body = await request.json().catch(() => ({}));
    const { recipeId, action } = body;
     console.log(`[API POST /favourites] Action: ${action}, Recipe ID: ${recipeId}`);


    if (!recipeId || !['add', 'remove'].includes(action)) {
        console.log("[API POST /favourites] Invalid request parameters.");
      return NextResponse.json(
        { success: false, error: 'Invalid request parameters' },
        { status: 400 }
      );
    }

    // Check if recipe exists (optional but good practice)
    const recipeExists = await prisma.recipe.findUnique({
      where: { id: recipeId },
      select: { id: true }
    });

    if (!recipeExists) {
       console.log(`[API POST /favourites] Recipe not found: ${recipeId}`);
      return NextResponse.json({ success: false, error: 'Recipe not found' }, { status: 404 });
    }

    // Add or remove recipe from the user's savedRecipes list
    const operation = action === 'add' ? 'connect' : 'disconnect';
    console.log(`[API POST /favourites] Performing ${operation} for user ${userId} and recipe ${recipeId}`);

    await prisma.user.update({
      where: { id: userId }, // Use the user's ID
      data: {
        savedRecipes: {
          [operation]: { id: recipeId },
        },
      },
    });

    console.log(`[API POST /favourites] Successfully performed ${action} action.`);
    return NextResponse.json({ success: true });

  } catch (error: unknown) {
    console.error('[API POST /favourites] Error updating favourite recipes:', error);
    const message = error instanceof Error ? error.message : 'An unexpected error occurred.';
    return NextResponse.json(
      { success: false, error: 'Failed to update favourite recipes', details: message },
      { status: 500 }
    );
  }
}