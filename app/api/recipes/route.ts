import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { auth } from '@/auth';

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

    const session = await auth();

    // Use const for where, properties can still be assigned
    const where: Prisma.RecipeWhereInput = {};

    if (!includePartialMatches || dietTypes.length > 0) {
      if (dietTypes.length > 0) {
        const dietConditions: Prisma.RecipeWhereInput[] = [];
        if (dietTypes.includes('vegetarian')) dietConditions.push({ isVegetarian: true });
        if (dietTypes.includes('vegan')) dietConditions.push({ isVegan: true });
        if (dietTypes.includes('gluten-free')) dietConditions.push({ isGlutenFree: true });
        if (dietTypes.includes('dairy-free')) dietConditions.push({ isLactoseFree: true });
        if (dietConditions.length > 0) {
          where.OR = dietConditions; // Assign directly to const object property
        }
      }
    }

    // Filter by userEmail if session exists
    if (session?.user?.email) { // Use email as per schema relation
      const fourMinutesAgo = new Date(Date.now() - 4 * 60 * 1000);
      const recentlyShownRecipes = await prisma.userRecipeHistory.findMany({
          where: {
              userEmail: session.user.email, // Filter by userEmail
              shownAt: { gte: fourMinutesAgo }
          },
          select: { recipeId: true }
      });

      if (recentlyShownRecipes.length > 0) {
        where.NOT = { // Assign directly to const object property
          id: {
            in: recentlyShownRecipes.map(r => r.recipeId)
          }
        };
      }
      // Remove the logic to add shown recipes here - better handled elsewhere
    }

    const recipes = await prisma.recipe.findMany({
      where,
      include: {
        ingredients: true,
        instructions: { orderBy: { stepNumber: 'asc' } }, // Keep instruction include from MyRecipesView
        // nutritionFacts: true,
      },
      take: 50,
    });

    const shuffledRecipes = [...recipes].sort(() => Math.random() - 0.5);
    return NextResponse.json(shuffledRecipes);

  } catch (error) {
    console.error('Error fetching recipes:', error);
    return NextResponse.json({ error: 'Failed to fetch recipes' }, { status: 500 });
  }
}

// --- POST HANDLER --- (Ensured fields match schema)
export async function POST(request: Request) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  const userId = session.user.id;

  try {
    const body: CreateRecipePayload = await request.json();

    // Basic Validation
    if (!body.title || !body.description || !body.cookingTime || !body.servings) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }
    if (!Array.isArray(body.ingredients) || body.ingredients.length === 0) {
      return NextResponse.json({ message: 'Ingredients are required' }, { status: 400 });
    }
    if (!Array.isArray(body.instructions) || body.instructions.length === 0) {
       return NextResponse.json({ message: 'Instructions are required' }, { status: 400 });
    }

    const { ingredients, instructions, ...recipeData } = body;

    const createdRecipe = await prisma.$transaction(async (tx) => {
      const newRecipe = await tx.recipe.create({
        data: {
          title: recipeData.title,
          description: recipeData.description,
          cookingTime: recipeData.cookingTime,
          servings: recipeData.servings,
          difficulty: recipeData.difficulty,         // optional string
          cuisineType: recipeData.cuisineType,       // optional string
          regionOfOrigin: recipeData.regionOfOrigin, // optional string
          imageUrl: recipeData.imageUrl,           // optional string
          isVegetarian: recipeData.isVegetarian,     // optional boolean
          isVegan: recipeData.isVegan,               // optional boolean
          isGlutenFree: recipeData.isGlutenFree,     // optional boolean
          isLactoseFree: recipeData.isLactoseFree,   // optional boolean
          isNutFree: recipeData.isNutFree,           // optional boolean
          isPescatarian: recipeData.isPescatarian,   // optional boolean
          isFermented: recipeData.isFermented,       // optional boolean
          isLowFodmap: recipeData.isLowFodmap,       // optional boolean
          authorId: userId,                       // Required string
          // Ensure no invalid fields like 'type', 'cuisineId' are included
        },
      });

      await tx.ingredient.createMany({
        data: ingredients.map(ing => ({
          name: ing.name,
          amount: ing.amount,
          unit: ing.unit,
          notes: ing.notes,
          recipeId: newRecipe.id,
        })),
      });

      await tx.instruction.createMany({
        data: instructions.map(inst => ({
          stepNumber: inst.stepNumber,
          description: inst.description,
          recipeId: newRecipe.id,
        })),
      });

      return newRecipe;
    });

    // Return minimal confirmation
    return NextResponse.json({ id: createdRecipe.id, title: createdRecipe.title }, { status: 201 });

  } catch (error) {
      console.error("Failed to create recipe:", error);
       if (error instanceof Prisma.PrismaClientValidationError) {
           return NextResponse.json({ message: 'Invalid data provided', details: error.message }, { status: 400 });
       }
      return NextResponse.json({ message: 'Error creating recipe' }, { status: 500 });
  }
}
