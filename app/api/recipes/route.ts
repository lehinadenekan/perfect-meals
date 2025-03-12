import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { Recipe, Prisma } from '@prisma/client';

type RecipeWithRelations = Prisma.RecipeGetPayload<{
  include: {
    ingredients: true;
    nutritionFacts: true;
    reviews: {
      select: {
        rating: true;
      };
    };
  };
}>;

type RecipeHistory = {
  recipeId: string;
};

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    // Extract filter parameters
    const dietTypesParam = searchParams.get('dietTypes') || '';
    const excludedFoodsParam = searchParams.get('excludedFoods') || '';
    const includePartialMatches = searchParams.get('includePartialMatches') === 'true';

    const dietTypes = dietTypesParam ? dietTypesParam.split(',') : [];
    const excludedFoods = excludedFoodsParam ? excludedFoodsParam.split(',') : [];

    // Get user session if available
    const session = await getServerSession(authOptions);

    // Build the base query
    let where: Prisma.RecipeWhereInput = {};

    // Only apply filters if not in partial match mode or if explicitly requested filters
    if (!includePartialMatches || dietTypes.length > 0) {
      // Process dietary preferences
      if (dietTypes.length > 0) {
        const dietConditions: Prisma.RecipeWhereInput[] = [];
        
        if (dietTypes.includes('vegetarian')) dietConditions.push({ isVegetarian: true });
        if (dietTypes.includes('vegan')) dietConditions.push({ isVegan: true });
        if (dietTypes.includes('gluten-free')) dietConditions.push({ isGlutenFree: true });
        if (dietTypes.includes('dairy-free')) dietConditions.push({ isDairyFree: true });
        if (dietTypes.includes('keto')) dietConditions.push({ type: 'KETO' });
        if (dietTypes.includes('paleo')) dietConditions.push({ type: 'PALEO' });
        if (dietTypes.includes('kosher')) dietConditions.push({ type: 'KOSHER' });
        if (dietTypes.includes('halal')) dietConditions.push({ type: 'HALAL' });
        if (dietTypes.includes('alkaline')) dietConditions.push({ type: 'ALKALINE' });
        
        if (dietConditions.length > 0) {
          where.OR = dietConditions;
        }
      }
    }

    // First, get the total count of matching recipes
    const totalRecipes = await prisma.recipe.count({ where });

    // If user is logged in, exclude recently shown recipes
    if (session?.user?.email) {
      const fourMinutesAgo = new Date(Date.now() - 4 * 60 * 1000);
      const recentlyShownRecipes = await prisma.$queryRaw<RecipeHistory[]>`
        SELECT "recipeId"
        FROM "UserRecipeHistory"
        WHERE "userEmail" = ${session.user.email}
        AND "shownAt" >= ${fourMinutesAgo}
      `;

      if (recentlyShownRecipes.length > 0) {
        where.NOT = {
          id: {
            in: recentlyShownRecipes.map(r => r.recipeId)
          }
        };
      }
    }

    // Get recipes with a random offset
    const recipes = await prisma.recipe.findMany({
      where,
      include: {
        ingredients: true,
        nutritionFacts: true,
        reviews: {
          select: {
            rating: true,
          },
        },
      }
    });

    // If user is logged in, record these recipes as shown
    if (session?.user?.email) {
      for (const recipe of recipes) {
        await prisma.$executeRaw`
          INSERT INTO "UserRecipeHistory" ("id", "userEmail", "recipeId", "shownAt")
          VALUES (gen_random_uuid(), ${session.user.email}, ${recipe.id}, NOW())
        `;
      }
    }

    // Shuffle the results for additional randomness
    const shuffledRecipes = [...recipes].sort(() => Math.random() - 0.5);

    return NextResponse.json(shuffledRecipes);
  } catch (error) {
    console.error('Error fetching recipes:', error);
    return NextResponse.json({ error: 'Failed to fetch recipes' }, { status: 500 });
  }
} 