import { NextResponse } from 'next/server';
import { PrismaClient, Prisma } from '@prisma/client';
import { auth } from '@/auth';
import { Recipe } from '@/app/types/recipe';

const prisma = new PrismaClient();

type RecipeParams = {
  dietTypes: string[];
  selectedRegions: string[];
  excludedFoods: string[];
  allowPartialMatch: boolean;
  searchInput?: string;
};

type DbRecipe = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  description: string | null;
  cookingTime: number | null;
  servings: number | null;
  difficulty: string | null;
  cuisineType: string | null;
  regionOfOrigin: string | null;
  imageUrl: string | null;
  authorId: string;
  isVegetarian: boolean | null;
  isVegan: boolean | null;
  isGlutenFree: boolean | null;
  isNutFree: boolean | null;
  jobId: string | null;
  isFermented: boolean | null;
  isLactoseFree: boolean | null;
  isLowFodmap: boolean | null;
  isPescatarian: boolean | null;
  needsDietaryReview: boolean;
  ingredients: {
    id: string;
    name: string;
    amount: number;
    unit: string;
    notes: string | null;
    recipeId: string;
    isFermented: boolean;
  }[];
  instructions: {
    id: string;
    stepNumber: number;
    description: string;
    recipeId: string;
  }[];
  nutritionFacts: {
    id: string;
    protein: number | null;
    carbs: number | null;
    fat: number | null;
    fiber: number | null;
    sugar: number | null;
    sodium: number | null;
    recipeId: string;
  } | null;
  categories: {
    id: string;
    name: string;
  }[];
  cuisines: {
    id: string;
    name: string;
    region: string;
    cookingMethods: string[];
  }[];
  tags: {
    id: string;
    name: string;
  }[];
};

// This function will get recipes from our local database
async function getRandomRecipesFromDB(
  params: RecipeParams,
  userId?: string,
): Promise<Recipe[]> {
  const whereClause: Prisma.RecipeWhereInput = {};

  // Add dietary preferences to where clause if they exist
  if (params.dietTypes?.length > 0) {
    const dietConditions: Prisma.RecipeWhereInput[] = [];
    
    // Handle each dietary preference
    params.dietTypes.forEach(diet => {
      console.log(`Processing dietary preference: ${diet}`);
      const normalizedDiet = diet.toLowerCase();
      switch (normalizedDiet) {
        case 'vegetarian':
          dietConditions.push({ isVegetarian: true });
          break;
        case 'vegan':
          dietConditions.push({ isVegan: true });
          break;
        case 'gluten-free':
          dietConditions.push({ isGlutenFree: true });
          break;
        case 'lactose-free':
          dietConditions.push({ isLactoseFree: true });
          break;
        case 'nut-free':
          dietConditions.push({ isNutFree: true });
          break;
        case 'fermented':
          console.log('Adding fermented food conditions');
          dietConditions.push({
            OR: [
              { isFermented: true },
              { ingredients: { some: { isFermented: true } } }
            ]
          });
          break;
        case 'low-fodmap':
          dietConditions.push({ isLowFodmap: true });
          break;
        case 'pescatarian':
          dietConditions.push({ isPescatarian: true });
          break;
      }
    });

    if (dietConditions.length > 0) {
      console.log('Diet conditions:', JSON.stringify(dietConditions, null, 2));
      // Use AND to combine multiple dietary preferences
      whereClause.AND = dietConditions;
    }
  }

  // Add cuisine region filters if provided
  if (params.selectedRegions?.length > 0) {
    console.log('Adding region filters:', params.selectedRegions);
    whereClause.cuisineType = {
      in: params.selectedRegions
    };
  }

  // Add excluded foods filter if provided
  if (params.excludedFoods?.length > 0) {
    console.log('Adding excluded foods filters:', params.excludedFoods);
    const excludedFoodConditions = params.excludedFoods.map((food: string) => ({
      AND: [
        {
          title: {
            not: {
              contains: food,
              mode: Prisma.QueryMode.insensitive
            }
          }
        },
        {
          ingredients: {
            none: {
              name: {
                contains: food,
                mode: Prisma.QueryMode.insensitive
              }
            }
          }
        }
      ]
    }));

    // Combine with existing AND conditions if they exist
    if (Array.isArray(whereClause.AND)) {
      whereClause.AND = [...whereClause.AND, ...excludedFoodConditions];
    } else if (whereClause.AND) {
      whereClause.AND = [whereClause.AND, ...excludedFoodConditions];
    } else {
      whereClause.AND = excludedFoodConditions;
    }
  }

  // Log the constructed where clause for debugging
  console.log('Final query where clause:', JSON.stringify(whereClause, null, 2));

  try {
    // First, count matching recipes
    const recipeCount = await prisma.recipe.count({
      where: whereClause
    });

    console.log(`Found ${recipeCount} recipes matching criteria`);

    // Log individual counts for each dietary preference
    if (params.dietTypes?.length > 0) {
      for (const diet of params.dietTypes) {
        const normalizedDiet = diet.toLowerCase();
        const singleDietCount = await prisma.recipe.count({
          where: {
            [normalizedDiet === 'fermented' ? 'isFermented' : 
             normalizedDiet === 'gluten-free' ? 'isGlutenFree' :
             normalizedDiet === 'lactose-free' ? 'isLactoseFree' :
             normalizedDiet === 'low-fodmap' ? 'isLowFodmap' :
             normalizedDiet === 'nut-free' ? 'isNutFree' :
             normalizedDiet === 'pescatarian' ? 'isPescatarian' :
             `is${diet.charAt(0).toUpperCase() + diet.slice(1)}`]: true
          }
        });
        console.log(`Found ${singleDietCount} recipes for dietary preference: ${diet}`);
      }
    }

    if (recipeCount === 0) {
      return [];
    }

    let dbRecipes = await prisma.recipe.findMany({
      where: whereClause,
      include: {
        ingredients: true,
        instructions: true,
        nutritionFacts: true,
        categories: true,
        cuisines: true,
        tags: true,
      },
    }) as unknown as DbRecipe[];

    // Shuffle the recipes
    dbRecipes = dbRecipes.sort(() => Math.random() - 0.5);

    // Take only 8 recipes after shuffling
    dbRecipes = dbRecipes.slice(0, 8);

    // Convert database recipes to frontend Recipe type
    const frontendRecipes = dbRecipes.map((dbRecipe): Recipe => ({
      id: dbRecipe.id,
      title: dbRecipe.title,
      description: dbRecipe.description || undefined,
      cookingTime: dbRecipe.cookingTime || 30, // Default to 30 minutes if null
      servings: dbRecipe.servings || 4, // Default to 4 servings if null
      difficulty: dbRecipe.difficulty || 'medium',
      cuisineType: dbRecipe.cuisineType || dbRecipe.cuisines[0]?.name || 'Global',
      regionOfOrigin: dbRecipe.regionOfOrigin || dbRecipe.cuisines[0]?.region || 'Global',
      imageUrl: dbRecipe.imageUrl || `/images/recipes/${dbRecipe.id}.jpg`,
      calories: dbRecipe.nutritionFacts?.protein ? 
        Math.round((dbRecipe.nutritionFacts.protein * 4) + 
                  (dbRecipe.nutritionFacts.carbs || 0) * 4 + 
                  (dbRecipe.nutritionFacts.fat || 0) * 9) : 
        undefined,
      authorId: dbRecipe.authorId,
      isVegetarian: dbRecipe.isVegetarian || false,
      isVegan: dbRecipe.isVegan || false,
      isGlutenFree: dbRecipe.isGlutenFree || false,
      isNutFree: dbRecipe.isNutFree || false,
      isLowFodmap: dbRecipe.isLowFodmap || false,
      isLactoseFree: dbRecipe.isLactoseFree || false,
      isPescatarian: dbRecipe.isPescatarian || false,
      isFermented: dbRecipe.isFermented || false,
      type: dbRecipe.categories[0]?.name || 'main',
      cuisineId: dbRecipe.cuisines[0]?.id || '',
      authenticity: 'traditional',
      cookingMethods: dbRecipe.cuisines[0]?.cookingMethods || [],
      spiceLevel: 'medium',
      showCount: 0,
      hasFeatureFermented: dbRecipe.isFermented || false,
      hasFermentedIngredients: dbRecipe.ingredients.some(i => i.isFermented),
      hasFish: false, // This would need to be determined by ingredient analysis
      ingredients: dbRecipe.ingredients.map(i => ({
        ...i,
        notes: i.notes || undefined // Convert null to undefined
      })),
      instructions: dbRecipe.instructions,
      createdAt: dbRecipe.createdAt,
      updatedAt: dbRecipe.updatedAt,
    }));

    return frontendRecipes;
  } catch (error) {
    console.error('Error in database query:', error);
    throw error; // Let the caller handle the error
  }
}

export async function POST(request: Request) {
  try {
    const reqBody = await request.json();
    const session = await auth();
    const userEmail = session?.user?.email || undefined;

    console.log('Recipe generation request:', {
      userEmail: userEmail || 'anonymous',
      params: reqBody,
      timestamp: new Date().toISOString()
    });

    const recipes = await getRandomRecipesFromDB(reqBody, userEmail);
    
    if (!recipes || recipes.length === 0) {
      console.log('No recipes found matching criteria. Request details:', {
        dietTypes: reqBody.dietTypes,
        selectedRegions: reqBody.selectedRegions,
        excludedFoods: reqBody.excludedFoods,
        timestamp: new Date().toISOString()
      });
      
      // Check if there are any recipes at all in the database
      const totalRecipes = await prisma.recipe.count();
      console.log(`Total recipes in database: ${totalRecipes}`);
      
      // Check counts for each dietary preference
      if (reqBody.dietTypes?.length > 0) {
        for (const diet of reqBody.dietTypes) {
          const normalizedDiet = diet.toLowerCase();
          const count = await prisma.recipe.count({
            where: {
              [normalizedDiet === 'fermented' ? 'isFermented' : 
               normalizedDiet === 'gluten-free' ? 'isGlutenFree' :
               normalizedDiet === 'lactose-free' ? 'isLactoseFree' :
               normalizedDiet === 'low-fodmap' ? 'isLowFodmap' :
               normalizedDiet === 'nut-free' ? 'isNutFree' :
               normalizedDiet === 'pescatarian' ? 'isPescatarian' :
               `is${diet.charAt(0).toUpperCase() + diet.slice(1)}`]: true
            }
          });
          console.log(`Total recipes for ${diet}: ${count}`);
        }
      }
      
      return NextResponse.json(
        { 
          error: 'No recipes found matching your criteria. Try adjusting your preferences.',
          success: false
        },
        { status: 404 }
      );
    }

    console.log(`Returning ${recipes.length} recipes to user. Recipe IDs:`, recipes.map(r => r.id));
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