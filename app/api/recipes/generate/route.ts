import { NextResponse } from 'next/server';
import { PrismaClient, Prisma } from '@prisma/client';
import { auth } from '@/auth';
import { Recipe } from '@/app/types/recipe';
import { FOOD_VARIATIONS } from '@/app/config/foodVariations';

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
    conditions.push({
      cuisineType: {
        in: params.selectedRegions
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
    let dbRecipes = await prisma.recipe.findMany({
      where: baseWhereClause,
      include: {
        ingredients: true,
        instructions: true,
        nutritionFacts: true,
        categories: true,
        cuisines: true,
        tags: true,
      },
      take: 100, // Limit initial fetch for performance
    }) as unknown as DbRecipe[];

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

    // Step 5: Shuffle and limit results
    dbRecipes = dbRecipes.sort(() => Math.random() - 0.5);
    dbRecipes = dbRecipes.slice(0, 8);

    console.log('Final recipe selection:', {
      selectedCount: dbRecipes.length,
      sampleRecipeId: dbRecipes[0]?.id,
      timestamp: new Date().toISOString()
    });

    // Convert database recipes to frontend Recipe type
    const frontendRecipes = dbRecipes.map((dbRecipe): Recipe => ({
      id: dbRecipe.id,
      title: dbRecipe.title,
      description: dbRecipe.description || undefined,
      cookingTime: dbRecipe.cookingTime || 30,
      servings: dbRecipe.servings || 4,
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
      hasFish: false,
      ingredients: dbRecipe.ingredients.map(i => ({
        ...i,
        notes: i.notes || undefined
      })),
      instructions: dbRecipe.instructions,
      createdAt: dbRecipe.createdAt,
      updatedAt: dbRecipe.updatedAt,
    }));

    return frontendRecipes;
  } catch (error: unknown) {
    console.error('Recipe generation error context:', {
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
      baseQuery: JSON.stringify(baseWhereClause, null, 2),
      excludedFoods: params.excludedFoods,
      timestamp: new Date().toISOString()
    });
    throw error;
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
          const dietField = normalizedDiet === 'fermented' ? 'isFermented' : 
                           normalizedDiet === 'gluten-free' ? 'isGlutenFree' :
                           normalizedDiet === 'lactose-free' ? 'isLactoseFree' :
                           normalizedDiet === 'low-fodmap' ? 'isLowFodmap' :
                           normalizedDiet === 'nut-free' ? 'isNutFree' :
                           normalizedDiet === 'pescatarian' ? 'isPescatarian' :
                           `is${diet.charAt(0).toUpperCase() + diet.slice(1)}`;
          
          console.log(`Checking count for ${diet} using field ${dietField}`);
          const count = await prisma.recipe.count({
            where: {
              [dietField]: true
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