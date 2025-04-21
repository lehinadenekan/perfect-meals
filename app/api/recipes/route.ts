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
    const dietTypesParam = searchParams.get('dietTypes') || '';
    const includePartialMatches = searchParams.get('includePartialMatches') === 'true';
    const dietTypes = dietTypesParam ? dietTypesParam.split(',') : [];

    // Replace v5 call: const session = await auth();
    const session = await getServerSession(authOptions);
    const userEmail = session?.user?.email; // Get email from v4 session

    // Use const for where, properties can still be assigned
    const where: Prisma.RecipeWhereInput = {};

    // Apply dietary filters if needed
    if (!includePartialMatches || dietTypes.length > 0) {
      if (dietTypes.length > 0) {
        const dietConditions: Prisma.RecipeWhereInput[] = [];
        // Map provided diet types to corresponding boolean fields
        if (dietTypes.includes('vegetarian')) dietConditions.push({ isVegetarian: true });
        if (dietTypes.includes('vegan')) dietConditions.push({ isVegan: true });
        if (dietTypes.includes('gluten-free')) dietConditions.push({ isGlutenFree: true });
        // Map 'dairy-free' to 'isLactoseFree' based on previous examples
        if (dietTypes.includes('dairy-free')) dietConditions.push({ isLactoseFree: true });
        if (dietTypes.includes('pescatarian')) dietConditions.push({ isPescatarian: true });
        if (dietTypes.includes('nut-free')) dietConditions.push({ isNutFree: true });
        // Add mappings for other potential diet types if necessary

        if (dietConditions.length > 0) {
          // Use AND for multiple selections if user wants *all* applied,
          // or OR if *any* apply (current logic uses OR)
          where.OR = dietConditions;
        }
      }
    }

    // Filter out recently shown recipes for logged-in users
    if (userEmail) { // Check if user is logged in using email
      const fourMinutesAgo = new Date(Date.now() - 4 * 60 * 1000);
      const recentlyShownRecipes = await prisma.userRecipeHistory.findMany({
          where: {
              userEmail: userEmail, // Filter by userEmail
              shownAt: { gte: fourMinutesAgo }
          },
          select: { recipeId: true }
      });

      if (recentlyShownRecipes.length > 0) {
        // Ensure NOT clause doesn't overwrite other potential where clauses
        if (!where.NOT) {
            where.NOT = {};
        }
        // Add the ID filter to the NOT clause
        (where.NOT as Prisma.RecipeWhereInput).id = {
            in: recentlyShownRecipes.map(r => r.recipeId)
        };
      }
    }

    const recipes = await prisma.recipe.findMany({
      where,
      include: {
        ingredients: true,
        instructions: { orderBy: { stepNumber: 'asc' } }, // Keep instruction include
        // Consider including other relations if needed by the frontend
        // nutritionFacts: true,
        // author: { select: { name: true, image: true } }, // Example
      },
      take: 50, // Limit results
    });

    // Shuffle recipes before returning
    const shuffledRecipes = [...recipes].sort(() => Math.random() - 0.5);
    return NextResponse.json(shuffledRecipes);

  } catch (error) {
    console.error('Error fetching recipes:', error);
    return NextResponse.json({ error: 'Failed to fetch recipes' }, { status: 500 });
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