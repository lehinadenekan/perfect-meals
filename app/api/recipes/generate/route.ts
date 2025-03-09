import { NextResponse } from 'next/server';
import { PrismaClient, UserPreference, UserCuisinePreference } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { SpoonacularService } from '@/app/services/spoonacularService';

const prisma = new PrismaClient();
const spoonacular = new SpoonacularService();

type UserPreferenceWithDiet = {
  id: string;
  userEmail: string;
  cookingTime: string;
  servingSize: number;
  mealPrep: boolean;
  dietTypes: string[];
  excludedFoods: string[];
};

// This function will get recipes directly from Spoonacular without saving to DB
async function getRandomRecipesDirectly(params: any) {
  try {
    console.log('Getting recipes directly from Spoonacular with params:', JSON.stringify(params));
    
    // Generate unique cache-busting parameters
    const timestamp = Date.now();
    const randomOffset = Math.floor(Math.random() * 1000);
    const uniqueId = `${timestamp}-${randomOffset}-${Math.random().toString(36).substring(7)}`;
    
    const searchParams: Record<string, string> = {
      number: String(params.number || 10),
      addRecipeInformation: 'true',
      addRecipeNutrition: 'true',
      limitLicense: 'false',
      // Add multiple cache-busting parameters
      _: uniqueId,
      offset: String(randomOffset),
      random: 'true'
    };

    if (params.diet) searchParams.diet = params.diet;
    if (params.cuisine) searchParams.cuisine = params.cuisine;
    if (params.intolerances) searchParams.intolerances = params.intolerances;
    if (params.tags && params.tags.length > 0) {
      searchParams.tags = params.tags.join(',');
    }
    
    // Use the SpoonacularService to make the API call, but don't store in DB
    const recipes = await spoonacular.getRandomRecipesRaw(searchParams);
    return recipes;
  } catch (error) {
    console.error('Error fetching recipes directly:', error);
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
      _: Date.now().toString() // Add timestamp to avoid caching
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
    
    // Always fetch recipes directly from Spoonacular without saving to DB
    console.log('Fetching recipes directly from Spoonacular.');
    console.time('spoonacular-direct-request');
    const directRecipes = await getRandomRecipesDirectly(searchParams);
    console.timeEnd('spoonacular-direct-request');
    console.log(`Generated ${directRecipes.length} recipes directly from Spoonacular`);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Recipe generation completed directly',
      recipesGenerated: directRecipes.length,
      recipes: directRecipes
    });
  } catch (error) {
    console.error('Error handling recipe generation request:', error);
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to process recipe generation request'
    }, { status: 500 });
  }
} 