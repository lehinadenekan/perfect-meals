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

    // Remove the time-based exclusion to allow recipes to be shown again
    // Instead, we'll use showCount to cycle through all recipes evenly
    const matchingRecipes = await prisma.recipe.findMany({
      where: whereClause,
      include: {
        ingredients: true,
        instructions: true,
        nutritionFacts: true
      }
    });

    if (matchingRecipes.length === 0) {
      // If no matches found and allowPartialMatch is true, try without dietary preferences
      if (params.allowPartialMatch) {
        console.log('No matches found, trying without dietary preferences...');
        return getRandomRecipesFromDB({ 
          ...params, 
          includeDietTypes: [],
          includeExcludedFoods: [] 
        }, userEmail);
      }
      return [];
    }

    // Sort recipes by show count (ascending) and then randomly within each show count group
    const groupedByShowCount = matchingRecipes.reduce((acc, recipe) => {
      const count = recipe.showCount || 0;
      if (!acc[count]) acc[count] = [];
      acc[count].push(recipe);
      return acc;
    }, {} as Record<number, typeof matchingRecipes>);

    // Get the group with the lowest show count
    const minShowCount = Math.min(...Object.keys(groupedByShowCount).map(Number));
    let recipesToSelect = groupedByShowCount[minShowCount];

    // If we need more recipes to reach 10, take from next show count group
    if (recipesToSelect.length < 10) {
      const allSortedRecipes = matchingRecipes.sort((a, b) => (a.showCount || 0) - (b.showCount || 0));
      recipesToSelect = allSortedRecipes.slice(0, Math.max(10, Math.floor(allSortedRecipes.length / 2)));
    }

    // Shuffle the selected group and take 10
    const shuffled = [...recipesToSelect].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, 10);

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

      // Still record in user history for analytics, but don't use it for filtering
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