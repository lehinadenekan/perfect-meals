import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import spoonacularService from '@/app/services/spoonacularService';
import { Recipe, Prisma } from '@prisma/client';
import { SpoonacularService } from '@/app/services/spoonacularService';

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
    const spoonacularService = new SpoonacularService();

    // Build the base query
    let where: Prisma.RecipeWhereInput = {};
    let cuisinePreferences: any[] = [];

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

    // Handle excluded foods - only apply if explicitly requested or not in partial match mode
    if (!includePartialMatches || excludedFoods.length > 0) {
      if (excludedFoods.length > 0) {
        // If in partial match mode, we make exclusions optional
        if (includePartialMatches) {
          // No strict exclusions in partial match mode
        } else {
          where.NOT = {
            ingredients: {
              some: {
                name: {
                  in: excludedFoods.map(food => food.toLowerCase()),
                },
              },
            },
          };
        }
      }
    }

    // Get user cuisine preferences if logged in
    if (session?.user?.email) {
      cuisinePreferences = await prisma.userCuisinePreference.findMany({
        where: { userEmail: session.user.email },
        include: { cuisine: true },
      });
    }

    // First try to find recipes that match the criteria strictly
    const strictWhere = { ...where };
    
    // Try to find recipes with the current criteria
    let recipes = await prisma.recipe.findMany({
      where,
      include: {
        ingredients: true,
        nutritionFacts: true,
        reviews: {
          select: {
            rating: true,
          },
        },
      },
      take: 50,
    }) as RecipeWithRelations[];

    // If no recipes found and partial matches are allowed, try with relaxed criteria
    if (recipes.length === 0 && includePartialMatches) {
      console.log('No recipes found with strict criteria, trying relaxed criteria');
      recipes = await prisma.recipe.findMany({
        include: {
          ingredients: true,
          nutritionFacts: true,
          reviews: {
            select: {
              rating: true,
            },
          },
        },
        take: 50,
      }) as RecipeWithRelations[];
    }

    // If we still don't have enough recipes, fetch more from Spoonacular
    if (recipes.length < 10) {
      const spoonacularParams: any = {
        number: 10 - recipes.length,
        // Add timestamp to prevent caching
        _: Date.now().toString()
      };

      // Map diet types to Spoonacular format
      if (dietTypes.length > 0) {
        spoonacularParams.diet = dietTypes.join(',');
      }

      // Map excluded foods
      if (excludedFoods.length > 0 && !includePartialMatches) {
        spoonacularParams.intolerances = excludedFoods.join(',');
      }

      // Add cuisine preferences if available
      if (cuisinePreferences && cuisinePreferences.length > 0) {
        const preferredCuisines = cuisinePreferences
          .filter(cp => cp.preferenceLevel === 'LOVE' || cp.preferenceLevel === 'LIKE')
          .map(cp => cp.cuisineId)
          .join(',');
        
        if (preferredCuisines) {
          spoonacularParams.cuisine = preferredCuisines;
        }
      }

      try {
        // Use random offset to ensure variety
        spoonacularParams.offset = Math.floor(Math.random() * 900);
        
        const spoonacularRecipes = await spoonacularService.searchRecipes(spoonacularParams);
        const spoonacularRecipesWithRelations = spoonacularRecipes.map(recipe => ({
          ...recipe,
          ingredients: [],
          nutritionFacts: null,
          reviews: [],
        })) as RecipeWithRelations[];
        
        recipes = [...recipes, ...spoonacularRecipesWithRelations];
      } catch (error) {
        console.error('Error fetching from Spoonacular:', error);
        // Continue with existing recipes if Spoonacular fails
      }
    }

    return NextResponse.json(recipes);
  } catch (error) {
    console.error('Error fetching recipes:', error);
    return NextResponse.json({ error: 'Failed to fetch recipes' }, { status: 500 });
  }
} 