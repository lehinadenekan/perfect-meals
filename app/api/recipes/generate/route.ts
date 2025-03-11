import { NextResponse } from 'next/server';
import { PrismaClient, UserPreference, UserCuisinePreference } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

const prisma = new PrismaClient();

type UserPreferenceWithDiet = {
  id: string;
  userEmail: string;
  cookingTime: string;
  servingSize: number;
  mealPrep: boolean;
  dietTypes: string[];
  excludedFoods: string[];
};

// This function will get recipes from our local database
async function getRandomRecipesFromDB(params: any) {
  try {
    console.log('Getting recipes from local database with params:', JSON.stringify(params));
    
    // Build the where clause for the query
    const where: any = {};
    
    // Handle dietary restrictions
    if (params.diet) {
      const diets = params.diet.split(',');
      if (diets.includes('vegetarian')) where.isVegetarian = true;
      if (diets.includes('vegan')) where.isVegan = true;
      if (diets.includes('gluten free')) where.isGlutenFree = true;
      if (diets.includes('dairy free')) where.isDairyFree = true;
      if (diets.includes('nut free')) where.isNutFree = true;
    }

    // Handle cuisine preferences
    if (params.cuisine) {
      where.continent = {
        in: params.cuisine.split(',')
      };
    }

    // Get all matching recipes
    const matchingRecipes = await prisma.recipe.findMany({
      where,
      include: {
        ingredients: true,
        instructions: true,
        nutritionFacts: true
      }
    });

    // Randomly select up to 10 recipes
    const shuffled = matchingRecipes.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, params.number || 10);
  } catch (error) {
    console.error('Error fetching recipes from database:', error);
    throw error;
  }
}

export async function POST(request: Request) {
  try {
    const reqBody = await request.json();
    console.log('Recipe generation request:', reqBody);

    // Get user session (optional)
    const session = await getServerSession(authOptions);
    const userEmail = session?.user?.email;

    // Get user preferences if logged in
    let userPreferences: UserPreferenceWithDiet | null = null;
    let cuisinePreferences: UserCuisinePreference[] = [];

    if (userEmail) {
      // Get user's dietary preferences
      userPreferences = await prisma.userPreference.findFirst({
        where: { userEmail },
      }) as unknown as UserPreferenceWithDiet;

      // Get user's cuisine preferences
      cuisinePreferences = await prisma.userCuisinePreference.findMany({
        where: { userEmail },
        include: {
          cuisine: true,
        },
      });
    }

    // Override preferences if provided in request
    if (reqBody.includeDietTypes) {
      if (!userPreferences) {
        userPreferences = {
          id: 'temp',
          userEmail: userEmail || 'anonymous',
          cookingTime: '30-60',
          servingSize: 2,
          mealPrep: false,
          dietTypes: reqBody.includeDietTypes,
          excludedFoods: [],
        };
      } else {
        userPreferences.dietTypes = reqBody.includeDietTypes;
      }
    }

    if (reqBody.includeExcludedFoods) {
      if (!userPreferences) {
        userPreferences = {
          id: 'temp',
          userEmail: userEmail || 'anonymous',
          cookingTime: '30-60',
          servingSize: 2,
          mealPrep: false,
          dietTypes: [],
          excludedFoods: reqBody.includeExcludedFoods,
        };
      } else {
        userPreferences.excludedFoods = reqBody.includeExcludedFoods;
      }
    }

    // Build search parameters based on user preferences
    const searchParams: any = {
      number: 10, // Number of recipes to generate
    };

    // Add dietary restrictions if any
    if (userPreferences?.dietTypes?.length) {
      searchParams.diet = userPreferences.dietTypes.join(',');
    }

    // Add excluded foods if any
    if (userPreferences?.excludedFoods?.length) {
      searchParams.intolerances = userPreferences.excludedFoods.join(',');
    }

    // Add preferred cuisines if any
    if (cuisinePreferences?.length) {
      const preferredCuisines = cuisinePreferences
        .filter(cp => cp.preferenceLevel === 'LOVE' || cp.preferenceLevel === 'LIKE')
        .map(cp => cp.cuisineId)
        .filter(Boolean)
        .join(',');
      
      if (preferredCuisines) {
        searchParams.cuisine = preferredCuisines;
      }
    }
    
    // Fetch recipes from local database
    console.log('Fetching recipes from local database');
    console.time('local-db-request');
    const recipes = await getRandomRecipesFromDB(searchParams);
    console.timeEnd('local-db-request');
    console.log(`Retrieved ${recipes.length} recipes from local database`);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Recipe generation completed',
      recipesGenerated: recipes.length,
      recipes: recipes
    });
  } catch (error) {
    console.error('Error handling recipe generation request:', error);
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to process recipe generation request'
    }, { status: 500 });
  }
} 