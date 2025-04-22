import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';
// Remove v5 import: import { auth } from '@/auth';
// Add v4 imports:
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/auth';

// --- Input Type for Validation ---
interface CreateRecipePayload {
  title: string;
  description: string;
  cookingTime: number;
  servings: number;
  difficulty?: string;
  cuisineType?: string;
  regionOfOrigin?: string;
  imageUrl?: string;
  isVegetarian?: boolean;
  isVegan?: boolean;
  isGlutenFree?: boolean;
  isLactoseFree?: boolean;
  isNutFree?: boolean;
  isPescatarian?: boolean;
  isFermented?: boolean;
  isLowFodmap?: boolean;
  ingredients: { name: string; amount: number; unit: string; notes?: string }[];
  instructions: { stepNumber: number; description: string }[];
}
// --- End Input Type ---

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    // --- Pagination Parameters ---
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '20', 10); // Default limit 20
    const skip = (page - 1) * limit;

    // --- Filter Parameters ---
    const dietsParam = searchParams.get('diets') || '';
    const regionsParam = searchParams.get('regions') || '';
    const excludedFoodsParam = searchParams.get('excludedFoods') || '';
    const cookingStylesParam = searchParams.get('cookingStyles') || '';
    const mealCategoriesParam = searchParams.get('mealCategories') || '';

    const diets = dietsParam ? dietsParam.split(',').map(d => d.trim()).filter(d => d) : [];
    const regions = regionsParam ? regionsParam.split(',').map(r => r.trim()).filter(r => r) : [];
    const excludedFoods = excludedFoodsParam ? excludedFoodsParam.split(',').map(f => f.trim()).filter(f => f) : [];
    const cookingStyles = cookingStylesParam ? cookingStylesParam.split(',').map(s => s.trim()).filter(s => s) : [];
    const mealCategories = mealCategoriesParam ? mealCategoriesParam.split(',').map(c => c.trim()).filter(c => c) : [];

    // --- Session for excluding recent --- 
    const session = await getServerSession(authOptions);
    const userEmail = session?.user?.email;
    // --- Get User ID --- 
    const userId = session?.user?.id; 

    // --- Build Where Clause ---
    const where: Prisma.RecipeWhereInput = {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error - Ignore error until Prisma generate issue is resolved
        source: 'ADMIN'
    };
    const andConditions: Prisma.RecipeWhereInput[] = []; // Use AND for combining different filter types

    // 1. Dietary Filters (Using AND logic now)
    // Map diet names to schema fields (adjust field names if needed)
    const dietFieldMap: { [key: string]: keyof Prisma.RecipeWhereInput } = {
      vegetarian: 'isVegetarian',
      vegan: 'isVegan',
      glutenFree: 'isGlutenFree', // Assuming 'gluten-free' maps to isGlutenFree
      lactoseFree: 'isLactoseFree', // Assuming 'dairy-free' maps to isLactoseFree
      nutFree: 'isNutFree',
      pescatarian: 'isPescatarian',
      // Add other mappings as needed
    };
    if (diets.length > 0) {
      diets.forEach(diet => {
        const field = dietFieldMap[diet.toLowerCase().replace('-', '')]; // Normalize key
        if (field) {
          andConditions.push({ [field]: true });
        }
      });
    }

    // 2. Regional Filters (Assuming 'regionOfOrigin' is the field)
    if (regions.length > 0) {
      andConditions.push({ regionOfOrigin: { in: regions, mode: 'insensitive' } });
    }

    // 3. Cooking Style Filters (Using 'tags' relation based on schema)
    if (cookingStyles.length > 0) {
       andConditions.push({
         tags: { // Filter on the 'tags' relation
           some: { // Check if *some* related tag matches
             name: { // Match based on the tag's 'name' field
               in: cookingStyles,
               mode: 'insensitive'
             }
           }
         }
       });
    }

    // 4. Meal Category Filters (Using 'categories' relation based on schema)
    if (mealCategories.length > 0) {
       andConditions.push({
         categories: { // Filter on the 'categories' relation
           some: { // Check if *some* related category matches
             name: { // Match based on the category's 'name' field
               in: mealCategories,
               mode: 'insensitive'
             }
           }
         }
       });
    }

    // 5. Excluded Foods Filters (Requires checking ingredients)
    if (excludedFoods.length > 0) {
      andConditions.push({
        NOT: {
          ingredients: {
            some: {
              name: {
                in: excludedFoods,
                mode: 'insensitive' // Case-insensitive matching
              }
            }
          }
        }
      });
    }

    // 6. Exclude Recently Shown (If user logged in)
    if (userEmail) {
      const fourMinutesAgo = new Date(Date.now() - 4 * 60 * 1000);
      const recentlyShownRecipes = await prisma.userRecipeHistory.findMany({
          where: { userEmail: userEmail, shownAt: { gte: fourMinutesAgo } },
          select: { recipeId: true }
      });
      if (recentlyShownRecipes.length > 0) {
        andConditions.push({
          id: { notIn: recentlyShownRecipes.map(r => r.recipeId) }
        });
      }
    }

    // --- Add condition to exclude user's own recipes --- 
    if (userId) {
        andConditions.push({ authorId: { not: userId } });
    }

    // Combine all conditions with AND
    if (andConditions.length > 0) {
       where.AND = andConditions;
    }

    // --- Database Queries --- 
    // Query for recipes with pagination and filtering
    const recipes = await prisma.recipe.findMany({
      where,
      include: {
        ingredients: true,
        instructions: { orderBy: { stepNumber: 'asc' } },
        categories: { select: { name: true } },
        tags: { select: { name: true } }, 
        nutritionFacts: true, 
        // author: { select: { name: true, image: true } }, 
      },
      skip: skip,
      take: limit,
      orderBy: { 
         // Define a default sort order, e.g., by creation date or title
         createdAt: 'desc' 
         // title: 'asc' 
      }
    });

    // Query for total count of recipes matching filters (for pagination)
    const totalCount = await prisma.recipe.count({
      where,
    });

    // --- Return Response --- 
    // No shuffling needed with pagination
    return NextResponse.json({ 
      recipes, 
      totalCount, 
      currentPage: page, 
      totalPages: Math.ceil(totalCount / limit) 
    });

  } catch (error) {
    console.error('Error fetching recipes:', error);
    // Log the error for debugging
    if (error instanceof Error) {
        console.error(error.message);
    }
    return NextResponse.json({ error: 'Failed to fetch recipes', details: error instanceof Error ? error.message : String(error) }, { status: 500 });
  }
}

// --- POST HANDLER ---
export async function POST(request: Request) {
  // Replace v5 call: const session = await auth();
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id; // Get user ID from v4 session

  // Check for user ID for authorization
  if (!userId) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body: CreateRecipePayload = await request.json();

    // Basic Validation (Consider using Zod for more robust validation)
    if (!body.title || !body.description || !body.cookingTime || !body.servings) {
      return NextResponse.json({ message: 'Missing required fields: title, description, cookingTime, servings' }, { status: 400 });
    }
    if (!Array.isArray(body.ingredients) || body.ingredients.length === 0) {
      return NextResponse.json({ message: 'Ingredients list is required and cannot be empty' }, { status: 400 });
    }
    if (!Array.isArray(body.instructions) || body.instructions.length === 0) {
       return NextResponse.json({ message: 'Instructions list is required and cannot be empty' }, { status: 400 });
    }
    // Add validation for ingredient/instruction content if needed

    const { ingredients, instructions, ...recipeData } = body;

    const createdRecipe = await prisma.$transaction(async (tx) => {
      const newRecipe = await tx.recipe.create({
        data: {
          // Map required fields directly
          title: recipeData.title,
          description: recipeData.description,
          cookingTime: recipeData.cookingTime,
          servings: recipeData.servings,
          authorId: userId, // Connect to the logged-in user using ID
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error - Ignore error until Prisma generate issue is resolved
          source: 'USER_CREATED', // Use string literal

          // Map optional fields, using defaults from Prisma schema if not provided
          difficulty: recipeData.difficulty,
          cuisineType: recipeData.cuisineType,
          regionOfOrigin: recipeData.regionOfOrigin,
          imageUrl: recipeData.imageUrl,
          isVegetarian: recipeData.isVegetarian,
          isVegan: recipeData.isVegan,
          isGlutenFree: recipeData.isGlutenFree,
          isLactoseFree: recipeData.isLactoseFree,
          isNutFree: recipeData.isNutFree,
          isPescatarian: recipeData.isPescatarian,
          isFermented: recipeData.isFermented,
          isLowFodmap: recipeData.isLowFodmap,
        },
      });

      // Create ingredients
      await tx.ingredient.createMany({
        data: ingredients.map(ing => ({
          name: ing.name,
          amount: ing.amount,
          unit: ing.unit,
          notes: ing.notes,
          recipeId: newRecipe.id, // Link to the created recipe
        })),
      });

      // Create instructions
      await tx.instruction.createMany({
        data: instructions.map(inst => ({
          stepNumber: inst.stepNumber,
          description: inst.description,
          recipeId: newRecipe.id, // Link to the created recipe
        })),
      });

      // Return the created recipe object from the transaction
      return newRecipe;
    });

    // Return minimal confirmation or the full created recipe object
    return NextResponse.json({ id: createdRecipe.id, title: createdRecipe.title }, { status: 201 });

  } catch (error) {
      console.error("Failed to create recipe:", error);
       // Handle specific Prisma errors if possible
       if (error instanceof Prisma.PrismaClientValidationError) {
           return NextResponse.json({ message: 'Invalid data provided for recipe creation.', details: error.message }, { status: 400 });
       }
       // Handle potential unique constraint errors (e.g., duplicate title)
       if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
            return NextResponse.json({ message: 'A recipe with this title already exists.', details: error.meta?.target }, { status: 409 }); // 409 Conflict
       }
      // Generic error response
      return NextResponse.json({ message: 'An unexpected error occurred while creating the recipe.' }, { status: 500 });
  }
}