import { NextResponse } from 'next/server';
import { PrismaClient, Prisma, Instruction, NutritionFacts } from '@prisma/client'; // Ensure NutritionFacts is imported
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import type { Session } from 'next-auth';
import { FOOD_VARIATIONS } from '@/app/config/foodVariations';

const prisma = new PrismaClient();

// Define the structure of the transformed recipe object
type TransformedRecipe = {
  id: string;
  title: string;
  description?: string;
  cookingTime?: number;
  servings?: number;
  difficulty?: string;
  cuisineType?: string;
  regionOfOrigin?: string; // This is the field we expect on the frontend
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
  authorId?: string | null;
  author?: {
    id: string;
    name?: string;
    email?: string;
    image?: string;
  };
  ingredients: {
    id: string;
    name: string;
    amount: number;
    unit: string;
    notes?: string | null;
    recipeId: string;
    isFermented: boolean;
  }[];
  instructions: Instruction[]; // Use the imported Instruction type
  type?: string;
  cuisineId?: string;
  tags: string[];
  isVegetarian: boolean;
  isVegan: boolean;
  isGlutenFree: boolean;
  isNutFree: boolean;
  isLowFodmap: boolean;
  isLactoseFree: boolean;
  isPescatarian: boolean;
  isFermented: boolean;
  calories?: number;
  nutritionFacts?: NutritionFacts | null; // Use the imported NutritionFacts type
};


type RecipeParams = {
  dietTypes: string[];
  selectedRegions: string[];
  excludedFoods: string[];
  allowPartialMatch: boolean;
  searchInput?: string;
};

// Define DbRecipe type directly using the validator structure
type DbRecipe = Prisma.RecipeGetPayload<{
    include: {
        ingredients: true;
        instructions: true;
        nutritionFacts: true;
        categories: true;
        cuisines: true; // Still include cuisines if needed for cuisineType
        tags: true;
        author: true;
    };
}>;


// This function will get recipes from our local database
async function getRandomRecipesFromDB(
  params: RecipeParams,
  userId?: string,
): Promise<TransformedRecipe[]> {
  console.log('[Generate Fn Start] Starting recipe generation with params:', {
    dietTypes: params.dietTypes?.length || 0,
    selectedRegions: params.selectedRegions?.length || 0,
    excludedFoods: params.excludedFoods?.length || 0, // Log count
    searchInputProvided: !!params.searchInput,       // Log if search input exists
    userId: userId || 'anonymous',
    timestamp: new Date().toISOString()
  });

  // Step 1: Build base query conditions
  const conditions: Prisma.RecipeWhereInput[] = [];

  // Add search term filter if provided
  if (params.searchInput) {
    const searchTerm = params.searchInput.toLowerCase();
    console.log(`[Filter] Adding search term condition for: "${searchTerm}"`);
    conditions.push({
      OR: [
        { title: { contains: searchTerm, mode: 'insensitive' } },
        { description: { contains: searchTerm, mode: 'insensitive' } },
        { ingredients: { some: { name: { contains: searchTerm, mode: 'insensitive' } } } }
      ]
    });
  }

  // Add dietary preferences to where clause if they exist
  if (params.dietTypes?.length > 0) {
    const dietConditions: Prisma.RecipeWhereInput[] = [];
    console.log(`[Filter] Adding dietary conditions for: ${params.dietTypes.join(', ')}`);
    params.dietTypes.forEach(diet => {
      const normalizedDiet = diet.toLowerCase();
      switch (normalizedDiet) {
        case 'vegetarian': dietConditions.push({ isVegetarian: true }); break;
        case 'vegan': dietConditions.push({ isVegan: true }); break;
        case 'gluten-free': dietConditions.push({ isGlutenFree: true }); break;
        case 'lactose-free': dietConditions.push({ isLactoseFree: true }); break;
        case 'nut-free': dietConditions.push({ isNutFree: true }); break;
        case 'fermented': dietConditions.push({ OR: [{ isFermented: true }, { ingredients: { some: { isFermented: true } } }] }); break;
        case 'low-fodmap': dietConditions.push({ isLowFodmap: true }); break;
        case 'pescatarian': dietConditions.push({ isPescatarian: true }); break;
      }
    });
    if (dietConditions.length > 0) {
      conditions.push({ AND: dietConditions });
    }
  }

  // Add cuisine region filters if provided
  if (params.selectedRegions?.length > 0) {
    console.log(`[Filter] Adding DIRECT regionOfOrigin conditions for: ${params.selectedRegions.join(', ')}`);
    // --- CHANGE HERE ---
    // Filter directly on the Recipe.regionOfOrigin field
    conditions.push({
      regionOfOrigin: {
        in: params.selectedRegions, // Check if regionOfOrigin is one of the selected regions
        mode: 'insensitive'        // Keep case-insensitivity
      }
    });
    // --- END CHANGE ---
  }

  // Combine all conditions with AND
  const baseWhereClause: Prisma.RecipeWhereInput = {
    AND: conditions.length > 0 ? conditions : undefined // Avoid empty AND {}
  };

  try {
    // Step 2: Get initial set of recipes (limited for performance)
    const initialFetchLimit = 100;
    console.log(`[DB Query] Fetching up to ${initialFetchLimit} recipes with base filters: ${JSON.stringify(baseWhereClause)}`);

    let dbRecipes: DbRecipe[] = await prisma.recipe.findMany({
      where: baseWhereClause,
      include: {
        ingredients: true, instructions: true, nutritionFacts: true,
        categories: true, cuisines: true, tags: true, author: true
      },
      take: initialFetchLimit,
    });

    console.log(`[DB Result] Initial fetch count (after base filters): ${dbRecipes.length}`);

    // Step 3: Apply word boundary filter if search term is provided
    if (params.searchInput && dbRecipes.length > 0) {
      const searchTerm = params.searchInput.toLowerCase();
      const searchTerms = [searchTerm];
      if (searchTerm.endsWith('s')) searchTerms.push(searchTerm.slice(0, -1));
      else searchTerms.push(`${searchTerm}s`);

      console.log(`[Post-Filter] Applying word boundary filter for terms: ${searchTerms.join(', ')}`);

      dbRecipes = dbRecipes.filter(recipe => {
        const titleMatch = searchTerms.some(term => new RegExp(`\\b${term}\\b`, 'i').test(recipe.title));
        const ingredientMatch = recipe.ingredients.some(ingredient => searchTerms.some(term => new RegExp(`\\b${term}\\b`, 'i').test(ingredient.name)));
        const descriptionMatch = recipe.description ? searchTerms.some(term => new RegExp(`\\b${term}\\b`, 'i').test(recipe.description || '')) : false;
        return titleMatch || ingredientMatch || descriptionMatch;
      });

      console.log(`[Post-Filter] Count after word boundary filter: ${dbRecipes.length}`);

      // Sort results by relevance if search term exists
      dbRecipes = dbRecipes.sort((a, b) => {
        const getScore = (recipe: DbRecipe): number => {
          let score = 0;
          if (searchTerms.some(term => new RegExp(`\\b${term}\\b`, 'i').test(recipe.title))) score += 100;
          if (recipe.ingredients.some(i => searchTerms.some(term => new RegExp(`\\b${term}\\b`, 'i').test(i.name)))) score += 50;
          if (recipe.description && searchTerms.some(term => new RegExp(`\\b${term}\\b`, 'i').test(recipe.description || ''))) score += 25;
          return score;
        };
        return getScore(b) - getScore(a);
      });
      console.log(`[Post-Filter] Recipes sorted by search relevance.`);
    }

    // Step 4: Apply excluded foods filtering in memory if needed
    if (params.excludedFoods?.length > 0 && dbRecipes.length > 0) {
      console.log(`[Post-Filter] Applying excluded foods filter for: ${params.excludedFoods.join(', ')}`);

      const termsToExclude = params.excludedFoods.reduce((acc: string[], food) => {
        const foodLower = food.toLowerCase();
        const variations = FOOD_VARIATIONS[foodLower] || [];
        return [...acc, foodLower, ...variations];
      }, []);

      console.log(`[Post-Filter] All terms being excluded: ${termsToExclude.join(', ')}`);

      const initialCountBeforeExclusion = dbRecipes.length;
      dbRecipes = dbRecipes.filter(recipe => {
        const hasExcludedFood = termsToExclude.some(term => {
          const titleContainsTerm = recipe.title.toLowerCase().includes(term);
          const ingredientsContainTerm = recipe.ingredients.some(i => i.name.toLowerCase().includes(term));
          const descriptionContainsTerm = recipe.description?.toLowerCase().includes(term) || false;
          return titleContainsTerm || ingredientsContainTerm || descriptionContainsTerm;
        });
        return !hasExcludedFood; // Keep if it DOES NOT contain excluded term
      });

      console.log(`[Post-Filter] Count after exclusion filter: ${dbRecipes.length} (excluded ${initialCountBeforeExclusion - dbRecipes.length})`);
    }

    // Step 5: Handle no results case
    if (dbRecipes.length === 0) {
      console.warn('[Result] No recipes found after all filters.');
      return []; // Return empty array
    }

    // Step 6: Select random recipes from the filtered list
    const count = 8; // Number of recipes to return
    const randomSelection = dbRecipes.sort(() => 0.5 - Math.random()).slice(0, count);

    console.log(`[Result] Selected ${randomSelection.length} random recipes from ${dbRecipes.length} potential matches.`);

    // Step 7: Map the final selection to the expected frontend structure
    const transformedRecipes: TransformedRecipe[] = randomSelection.map(recipe => {
      const region = recipe.regionOfOrigin || undefined;
      const relevantCuisine = recipe.cuisines?.find(c => c.name);
      const cuisineType = relevantCuisine?.name || recipe.cuisines?.[0]?.name || undefined;
      const cuisineId = relevantCuisine?.id || recipe.cuisines?.[0]?.id || undefined;
      const author = recipe.author ? {
        id: recipe.author.id, name: recipe.author.name || undefined,
        email: recipe.author.email || undefined, image: recipe.author.image || undefined,
      } : undefined;
      const calories = recipe.nutritionFacts ? Math.round(
          (recipe.nutritionFacts.protein || 0) * 4 +
          (recipe.nutritionFacts.carbs || 0) * 4 +
          (recipe.nutritionFacts.fat || 0) * 9
      ) : undefined;

      return {
        id: recipe.id, title: recipe.title, description: recipe.description || undefined,
        cookingTime: recipe.cookingTime || undefined, servings: recipe.servings || undefined,
        difficulty: recipe.difficulty || undefined, cuisineType: cuisineType,
        regionOfOrigin: region, imageUrl: recipe.imageUrl || undefined,
        createdAt: recipe.createdAt, updatedAt: recipe.updatedAt, authorId: recipe.authorId,
        author: author, ingredients: recipe.ingredients.map(i => ({ ...i, notes: i.notes || null })),
        instructions: recipe.instructions, type: recipe.categories?.[0]?.name || undefined,
        cuisineId: cuisineId, tags: recipe.tags?.map(t => t.name) || [],
        isVegetarian: recipe.isVegetarian ?? false, isVegan: recipe.isVegan ?? false,
        isGlutenFree: recipe.isGlutenFree ?? false, isNutFree: recipe.isNutFree ?? false,
        isLowFodmap: recipe.isLowFodmap ?? false, isLactoseFree: recipe.isLactoseFree ?? false,
        isPescatarian: recipe.isPescatarian ?? false, isFermented: recipe.isFermented ?? false,
        calories: calories, nutritionFacts: recipe.nutritionFacts || null,
      };
    });

    console.log(`[Generate Fn Result] Returning ${transformedRecipes.length} transformed recipes.`);
    return transformedRecipes;

  } catch (error: unknown) {
    console.error('[Generate Fn Error] Recipe generation failed in getRandomRecipesFromDB:', {
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
      query: JSON.stringify(baseWhereClause),
      params: params,
      timestamp: new Date().toISOString()
    });
    return []; // Return empty array on error
  }
}

export async function POST(request: Request) {
  const session: Session | null = await getServerSession(authOptions);
  const userId = session?.user?.id;

  console.log(`[API Start] /api/recipes/generate POST request by user: ${userId || 'anonymous'}`);

  try {
    const reqBody: RecipeParams = await request.json();

    console.log('[API Request Body]', reqBody);

    // Get recipes using the main logic function
    const recipes = await getRandomRecipesFromDB(reqBody, userId);

    // --- MODIFIED RESPONSE FOR NO RECIPES ---
    if (!recipes || recipes.length === 0) {
      console.warn('[API Response] No recipes found matching criteria. Returning 200 OK with empty list.');
      // Log diagnostic info about DB state if no recipes found
      const totalRecipes = await prisma.recipe.count();
      console.log(`[API Diagnostics] Total recipes in DB: ${totalRecipes}`);
      // Add more specific counts if helpful (e.g., count by region)
      if (reqBody.selectedRegions?.length > 0) {
         try {
             const regionCounts = await prisma.cuisine.groupBy({
                 by: ['region'],
                 _count: { region: true },
                 where: { region: { in: reqBody.selectedRegions, mode: 'insensitive' } }
             });
             console.log(`[API Diagnostics] Counts for selected regions:`, regionCounts);
         } catch (regionCountError) {
             console.error("[API Diagnostics] Error fetching region counts:", regionCountError);
         }
      }

      // Return 200 OK, but indicate no recipes found in the payload
      return NextResponse.json(
        {
          recipes: [], // Send empty array
          success: true, // Indicate API call succeeded
          message: 'No recipes found matching your criteria. Try adjusting your preferences.', // Informative message
        },
        { status: 200 } // Use 200 OK status
      );
    }
    // --- END OF MODIFICATION ---

    console.log(`[API Response] Returning ${recipes.length} recipes. Success. Status 200.`);
    return NextResponse.json({
      recipes,
      success: true
    });

  } catch (error) {
    console.error('[API Error] Unhandled error in POST /api/recipes/generate:', error);
    return NextResponse.json(
      {
        error: 'Failed to generate recipes due to a server error.',
        success: false,
        details: process.env.NODE_ENV === 'development' ? String(error) : undefined // Only show details in dev
      },
      { status: 500 }
    );
  } finally {
      console.log(`[API End] /api/recipes/generate POST request finished.`);
      // Consider Prisma disconnect implications in serverless environments
      // await prisma.$disconnect();
  }
}