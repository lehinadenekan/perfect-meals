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
  console.log('Starting recipe generation with params:', {
    dietTypes: params.dietTypes?.length || 0,
    selectedRegions: params.selectedRegions?.length || 0,
    excludedFoods: params.excludedFoods,
    userId: userId || 'anonymous',
    timestamp: new Date().toISOString()
  });

  // Step 1: Build base query without excluded foods
  const conditions: Prisma.RecipeWhereInput[] = [];

  // Add search term filter if provided
  if (params.searchInput) {
    const searchTerm = params.searchInput.toLowerCase();

    // Add both singular and plural forms to search
    const searchTerms = [searchTerm];
    if (searchTerm.endsWith('s')) {
      // If plural, add singular
      searchTerms.push(searchTerm.slice(0, -1));
    } else {
      // If singular, add plural
      searchTerms.push(`${searchTerm}s`);
    }

    // First get a broader set of potential matches
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
      conditions.push({ AND: dietConditions });
    }
  }

  // Add cuisine region filters if provided
  if (params.selectedRegions?.length > 0) {
    console.log('Region filter metrics:', {
      count: params.selectedRegions.length,
      regions: params.selectedRegions,
      timestamp: new Date().toISOString()
    });
    // Filter by related Cuisine region instead of direct field
    conditions.push({
      cuisines: {          // Target the relation
        some: {             // Check if at least one related cuisine matches
          region: {         // Check the region field of the related cuisine
            in: params.selectedRegions, // Must be one of the selected regions
            mode: 'insensitive' // Optional: Add case-insensitivity if needed
          }
        }
      }
    });
  }

  // Combine all conditions with AND
  const baseWhereClause: Prisma.RecipeWhereInput = {
    AND: conditions
  };

  try {
    // Step 2: Get initial set of recipes (limited to 100 for performance)
    console.log('Fetching initial recipe set with base filters');

    let dbRecipes: DbRecipe[] = await prisma.recipe.findMany({
      where: baseWhereClause,
      include: { // Ensure relations needed for transformation are included
        ingredients: true,
        instructions: true,
        nutritionFacts: true,
        categories: true,
        cuisines: true, // Keep if needed for cuisineType
        tags: true,
        author: true
      },
      take: 100, // Limit initial fetch for performance
    });

    // --- Log after initial fetch ---
    console.log(`[LOG] Initial fetch count: ${dbRecipes.length}`);
    console.log(`[LOG] Base where clause used: ${JSON.stringify(baseWhereClause)}`);
    // --- End Log ---

    console.log('Initial recipe fetch metrics:', {
      fetchedCount: dbRecipes.length,
      hasExcludedFoods: params.excludedFoods?.length > 0,
      timestamp: new Date().toISOString()
    });

    // Apply word boundary filter if search term is provided
    if (params.searchInput) {
      const searchTerm = params.searchInput.toLowerCase();

      // Add both singular and plural forms to search
      const searchTerms = [searchTerm];
      if (searchTerm.endsWith('s')) {
        // If plural, add singular
        searchTerms.push(searchTerm.slice(0, -1));
      } else {
        // If singular, add plural
        searchTerms.push(`${searchTerm}s`);
      }

      console.log('Filtering with word boundaries for terms:', searchTerms);

      dbRecipes = dbRecipes.filter(recipe => {
        // Check title for whole word match
        const titleMatch = searchTerms.some(term => {
          const regex = new RegExp(`\\b${term}\\b`, 'i');
          return regex.test(recipe.title);
        });

        // Check ingredients for whole word match
        const ingredientMatch = recipe.ingredients.some(ingredient => {
          return searchTerms.some(term => {
            const regex = new RegExp(`\\b${term}\\b`, 'i');
            return regex.test(ingredient.name);
          });
        });

        // Check description for whole word match
        const descriptionMatch = recipe.description ? searchTerms.some(term => {
          const regex = new RegExp(`\\b${term}\\b`, 'i');
          return regex.test(recipe.description || '');
        }) : false;

        return titleMatch || ingredientMatch || descriptionMatch;
      });

      console.log('After word boundary filtering:', {
        remainingRecipes: dbRecipes.length,
        searchTerms
      });

      // Sort results by relevance
      dbRecipes = dbRecipes.sort((a, b) => {
        // Calculate relevance score for each recipe
        const getScore = (recipe: DbRecipe): number => {
          let score = 0;

          // Title match (highest priority)
          if (searchTerms.some(term => {
            const regex = new RegExp(`\\b${term}\\b`, 'i');
            return regex.test(recipe.title);
          })) {
            score += 100;
          }

          // Ingredient match (medium priority)
          if (recipe.ingredients.some(i => {
            return searchTerms.some(term => {
              const regex = new RegExp(`\\b${term}\\b`, 'i');
              return regex.test(i.name);
            });
          })) {
            score += 50;
          }

          // Description match (lowest priority)
          if (recipe.description && searchTerms.some(term => {
            const regex = new RegExp(`\\b${term}\\b`, 'i');
            return regex.test(recipe.description || '');
          })) {
            score += 25;
          }

          return score;
        };

        // Sort by score (higher first)
        return getScore(b) - getScore(a);
      });
    }

    // Step 3: Apply excluded foods filtering in memory
    if (params.excludedFoods?.length > 0) {
      console.log('Applying excluded foods filtering:', params.excludedFoods);

      // Create an array of all terms to check (original terms + variations)
      const termsToExclude = params.excludedFoods.reduce((acc: string[], food) => {
        const foodLower = food.toLowerCase();
        const variations = FOOD_VARIATIONS[foodLower] || [];
        console.log(`Excluding terms for ${foodLower}:`, [foodLower, ...variations]);
        return [...acc, foodLower, ...variations];
      }, []);

      console.log('All terms being excluded:', termsToExclude);

      dbRecipes = dbRecipes.filter(recipe => {
        // Check if any excluded term appears in title or ingredients
        const hasExcludedFood = termsToExclude.some(term => {
          const titleContainsTerm = recipe.title.toLowerCase().includes(term);
          const ingredientsContainTerm = recipe.ingredients.some(
            ingredient => ingredient.name.toLowerCase().includes(term)
          );
          const descriptionContainsTerm = recipe.description?.toLowerCase().includes(term) || false;

          if (titleContainsTerm || ingredientsContainTerm || descriptionContainsTerm) {
            console.log(`Excluding recipe ${recipe.title} due to term: ${term}`);
            if (titleContainsTerm) console.log(`- Found in title`);
            if (ingredientsContainTerm) console.log(`- Found in ingredients`);
            if (descriptionContainsTerm) console.log(`- Found in description`);
          }

          return titleContainsTerm || ingredientsContainTerm || descriptionContainsTerm;
        });

        // Keep recipe if it doesn't contain any excluded terms
        return !hasExcludedFood;
      });

      // --- Log after exclusion filter ---
      console.log(`[LOG] Recipe count after exclusion filter: ${dbRecipes.length}`);
      // --- End Log ---

      console.log('Post-exclusion filtering metrics:', {
        remainingRecipes: dbRecipes.length,
        excludedFoods: params.excludedFoods,
        totalExcludedTerms: termsToExclude.length,
        timestamp: new Date().toISOString()
      });
    }

    // Step 4: Handle no results case
    if (dbRecipes.length === 0) {
      console.log('No recipes found after all filters. Context:', {
        baseFilters: JSON.stringify(baseWhereClause, null, 2),
        excludedFoods: params.excludedFoods,
        timestamp: new Date().toISOString()
      });
      return [];
    }

    // Step 5: Select random recipes from the filtered list
    const count = 8; // Number of recipes to return
    const randomSelection = dbRecipes.sort(() => 0.5 - Math.random()).slice(0, count);

    console.log('Final recipe selection:', {
      selectedCount: randomSelection.length,
      sampleRecipeId: randomSelection[0]?.id,
      timestamp: new Date().toISOString()
    });

    // =====================================================================
    // Map the final filtered recipes to the expected frontend structure
    // =====================================================================
    const transformedRecipes: TransformedRecipe[] = randomSelection.map(recipe => {

      // --- START OF CHANGE ---
      // Prioritize the direct regionOfOrigin field from the Recipe model
      // This assumes 'regionOfOrigin' exists as a field in your Recipe schema
      // If the field doesn't exist or is null/undefined, region will be undefined.
      const region = recipe.regionOfOrigin || undefined;

      // You might still want to derive cuisineType from the first associated cuisine
      // or use a direct field from Recipe if that exists too.
      const relevantCuisine = recipe.cuisines?.find(c => c.name); // Find first named cuisine
      const cuisineType = relevantCuisine?.name || recipe.cuisines?.[0]?.name || undefined;
      const cuisineId = relevantCuisine?.id || recipe.cuisines?.[0]?.id || undefined;
      // --- END OF CHANGE ---


      const author = recipe.author ? {
        id: recipe.author.id,
        name: recipe.author.name || undefined,
        email: recipe.author.email || undefined,
        image: recipe.author.image || undefined,
      } : undefined;

      const calories = recipe.nutritionFacts ?
        Math.round(
          (recipe.nutritionFacts.protein || 0) * 4 +
          (recipe.nutritionFacts.carbs || 0) * 4 +
          (recipe.nutritionFacts.fat || 0) * 9
        ) : undefined;

      // Return the transformed object matching frontend expectations
      return {
        id: recipe.id,
        title: recipe.title,
        description: recipe.description || undefined,
        cookingTime: recipe.cookingTime || undefined,
        servings: recipe.servings || undefined,
        difficulty: recipe.difficulty || undefined,
        cuisineType: cuisineType,   // Using derived value
        regionOfOrigin: region,     // *** USING DIRECT VALUE FROM RECIPE ***
        imageUrl: recipe.imageUrl || undefined,
        createdAt: recipe.createdAt,
        updatedAt: recipe.updatedAt,
        authorId: recipe.authorId,
        author: author,
        ingredients: recipe.ingredients.map(i => ({ ...i, notes: i.notes || null })),
        instructions: recipe.instructions,
        type: recipe.categories?.[0]?.name || undefined,
        cuisineId: cuisineId,       // Using derived value
        tags: recipe.tags?.map(t => t.name) || [],
        isVegetarian: recipe.isVegetarian ?? false,
        isVegan: recipe.isVegan ?? false,
        isGlutenFree: recipe.isGlutenFree ?? false,
        isNutFree: recipe.isNutFree ?? false,
        isLowFodmap: recipe.isLowFodmap ?? false,
        isLactoseFree: recipe.isLactoseFree ?? false,
        isPescatarian: recipe.isPescatarian ?? false,
        isFermented: recipe.isFermented ?? false,
        calories: calories,
        nutritionFacts: recipe.nutritionFacts || null,
      };
    });
    // =====================================================================

    console.log("--- [API GENERATE] Returning transformed recipes from getRandomRecipesFromDB ---");
    return transformedRecipes;

  } catch (error: unknown) {
    console.error('Recipe generation error context:', {
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
      baseQuery: JSON.stringify(baseWhereClause, null, 2),
      excludedFoods: params.excludedFoods,
      timestamp: new Date().toISOString()
    });
    return []; // Return empty array on error
  }
}

export async function POST(request: Request) {
  // Get session using v4 method, but don't require it
  const session: Session | null = await getServerSession(authOptions);
  const userId = session?.user?.id; // Will be undefined if not logged in

  console.log(`Recipe generation request initiated by user: ${userId || 'anonymous'}`);

  try {
    const reqBody = await request.json();

    // Log the request details (keeping user ID anonymous if not logged in)
    console.log('Recipe generation request body:', {
      userId: userId || 'anonymous',
      params: reqBody,
      timestamp: new Date().toISOString()
    });

    // Pass userId (which might be undefined) to the generation logic
    const recipes = await getRandomRecipesFromDB(reqBody, userId);

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
          // Simplified field mapping (adjust if specific fields differ drastically)
          const dietField = `is${diet.charAt(0).toUpperCase() + diet.slice(1).replace('-', '')}`;

          console.log(`Checking count for ${diet} using field ${dietField}`);

          try {
             const count = await prisma.recipe.count({
                where: { [dietField]: true } as Prisma.RecipeWhereInput
              });
              console.log(`Total recipes for ${diet}: ${count}`);
          } catch (fieldError) {
             console.error(`Could not query count for diet field ${dietField}:`, fieldError);
             // Fallback or alternative logic if needed
             if (normalizedDiet === 'gluten-free') {
                 const count = await prisma.recipe.count({ where: { isGlutenFree: true } });
                 console.log(`Total recipes for ${diet} (fallback query): ${count}`);
             } else if (normalizedDiet === 'lactose-free') {
                  const count = await prisma.recipe.count({ where: { isLactoseFree: true } });
                 console.log(`Total recipes for ${diet} (fallback query): ${count}`);
             } else if (normalizedDiet === 'nut-free') {
                  const count = await prisma.recipe.count({ where: { isNutFree: true } });
                 console.log(`Total recipes for ${diet} (fallback query): ${count}`);
             } else if (normalizedDiet === 'low-fodmap') {
                  const count = await prisma.recipe.count({ where: { isLowFodmap: true } });
                 console.log(`Total recipes for ${diet} (fallback query): ${count}`);
             } // Add other specific fallbacks if necessary
          }
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
