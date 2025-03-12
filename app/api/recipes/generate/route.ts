import { NextResponse } from 'next/server';
import { PrismaClient, UserPreference, UserCuisinePreference, Prisma } from '@prisma/client';
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
async function getRandomRecipesFromDB(params: any, userEmail: string | undefined) {
  try {
    console.log('Getting recipes from local database with params:', JSON.stringify(params));
    
    // Build the where clause for the query
    let whereClause: Prisma.RecipeWhereInput = {};
    
    // Add dietary preferences to where clause
    if (params.includeDietTypes?.length > 0) {
      const dietConditions: Prisma.RecipeWhereInput[] = [];
      
      if (params.includeDietTypes.includes('vegetarian')) dietConditions.push({ isVegetarian: true });
      if (params.includeDietTypes.includes('vegan')) dietConditions.push({ isVegan: true });
      if (params.includeDietTypes.includes('gluten-free')) dietConditions.push({ isGlutenFree: true });
      if (params.includeDietTypes.includes('dairy-free')) dietConditions.push({ isDairyFree: true });
      if (params.includeDietTypes.includes('keto')) dietConditions.push({ type: 'KETO' });
      if (params.includeDietTypes.includes('paleo')) dietConditions.push({ type: 'PALEO' });
      if (params.includeDietTypes.includes('kosher')) dietConditions.push({ type: 'KOSHER' });
      if (params.includeDietTypes.includes('halal')) dietConditions.push({ type: 'HALAL' });
      if (params.includeDietTypes.includes('alkaline')) dietConditions.push({ type: 'ALKALINE' });
      
      if (dietConditions.length > 0) {
        whereClause.OR = dietConditions;
      }
    }

    // Add cuisine region filters if provided
    if (params.selectedRegions?.length > 0) {
      whereClause.regionOfOrigin = {
        in: params.selectedRegions
      };
    }

    // Add excluded foods filter if provided
    if (params.includeExcludedFoods?.length > 0) {
      const excludedFoodConditions = params.includeExcludedFoods.map((food: string) => ({
        OR: [
          { title: { not: { contains: food, mode: 'insensitive' } } },
          { ingredients: { none: { name: { contains: food, mode: 'insensitive' } } } }
        ]
      }));
      whereClause.AND = excludedFoodConditions;
    }

    // If we have a user, exclude recipes shown in the last 4 minutes
    if (userEmail) {
      const fourMinutesAgo = new Date(Date.now() - 4 * 60 * 1000);
      const recentlyShownRecipes = await prisma.$queryRaw<{ recipeId: string }[]>`
        SELECT "recipeId"
        FROM "UserRecipeHistory"
        WHERE "userEmail" = ${userEmail}
        AND "shownAt" >= ${fourMinutesAgo}
      `;

      if (recentlyShownRecipes.length > 0) {
        whereClause.NOT = {
          id: {
            in: recentlyShownRecipes.map(r => r.recipeId)
          }
        };
      }
    }

    // Get all matching recipes with their show counts
    const matchingRecipes = await prisma.recipe.findMany({
      where: whereClause,
      include: {
        ingredients: true,
        instructions: true,
        nutritionFacts: true
      },
      orderBy: {
        showCount: 'asc' // Prioritize less shown recipes
      }
    });

    if (matchingRecipes.length === 0) {
      // If no matches found and allowPartialMatch is true, try without dietary preferences
      if (params.allowPartialMatch && params.includeDietTypes?.length > 0) {
        console.log('No matches found, trying without dietary preferences...');
        return getRandomRecipesFromDB({ 
          ...params, 
          includeDietTypes: [] 
        }, userEmail);
      }
      return [];
    }

    // Calculate weights based on show counts
    const minShowCount = Math.min(...matchingRecipes.map(r => r.showCount));
    const weights = matchingRecipes.map(r => {
      // The weight is inversely proportional to how many times it's been shown
      // Add 1 to avoid division by zero
      return 1 / (r.showCount - minShowCount + 1);
    });

    // Normalize weights to sum to 1
    const totalWeight = weights.reduce((a, b) => a + b, 0);
    const normalizedWeights = weights.map(w => w / totalWeight);

    // Select 10 recipes using weighted random selection
    const selected: typeof matchingRecipes = [];
    const numToSelect = matchingRecipes.length;

    while (selected.length < numToSelect) {
      // Generate a random number between 0 and 1
      const r = Math.random();
      let sum = 0;
      
      // Find the recipe corresponding to this random number
      for (let i = 0; i < matchingRecipes.length; i++) {
        sum += normalizedWeights[i];
        if (r <= sum && !selected.includes(matchingRecipes[i])) {
          selected.push(matchingRecipes[i]);
          break;
        }
      }
    }

    // Update show counts for selected recipes
    if (selected.length > 0) {
      await prisma.$transaction(
        selected.map(recipe => 
          prisma.recipe.update({
            where: { id: recipe.id },
            data: { showCount: { increment: 1 } }
          })
        )
      );

      // Record in user history if logged in
      if (userEmail) {
        await prisma.$transaction(
          selected.map(recipe => 
            prisma.userRecipeHistory.create({
              data: {
                id: crypto.randomUUID(),
                userEmail,
                recipeId: recipe.id,
                shownAt: new Date()
              }
            })
          )
        );
      }
    }

    return selected;
  } catch (error) {
    console.error('Error fetching recipes from database:', error);
    throw error;
  }
}

export async function POST(request: Request) {
  try {
    const reqBody = await request.json();
    const session = await getServerSession(authOptions);
    const userEmail = session?.user?.email || undefined;

    console.log('Recipe generation request:', {
      userEmail: userEmail || 'anonymous',
      params: reqBody
    });

    const recipes = await getRandomRecipesFromDB(reqBody, userEmail);
    
    if (!recipes || recipes.length === 0) {
      console.log('No recipes found matching criteria');
      return NextResponse.json(
        { 
          error: 'No recipes found matching your criteria. Try adjusting your preferences.',
          success: false
        },
        { status: 404 }
      );
    }

    console.log(`Returning ${recipes.length} recipes to user`);
    return NextResponse.json({ 
      recipes,
      success: true
    });
  } catch (error) {
    console.error('Error in recipe generation:', error);
    return NextResponse.json(
      { 
        error: 'Failed to generate recipes. Please try again.',
        success: false,
        details: process.env.NODE_ENV === 'development' ? String(error) : undefined
      },
      { status: 500 }
    );
  }
} 