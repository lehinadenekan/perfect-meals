import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/auth';

// --- Input Type for Validation ---
interface CreateRecipePayload {
  title: string;
  description: string;
  cookingTime: number;
  servings: number;
  difficulty?: string;
  regionNames?: string[]; // ADDED
  imageUrl?: string;
  calories?: number;
  cookingStyles?: string[];
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

    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '20', 10);
    const skip = (page - 1) * limit;

    const dietsParam = searchParams.get('diets') || '';
    const regionsParam = searchParams.get('regions') || '';
    const excludedFoodsParam = searchParams.get('excludedFoods') || '';
    const mealCategoriesParam = searchParams.get('mealCategories') || '';
    const cookingStylesParam = searchParams.get('cookingStyles') || '';

    const diets = dietsParam ? dietsParam.split(',').map(d => d.trim()).filter(d => d) : [];
    const regions = regionsParam ? regionsParam.split(',').map(r => r.trim()).filter(r => r) : [];
    const excludedFoods = excludedFoodsParam ? excludedFoodsParam.split(',').map(f => f.trim()).filter(f => f) : [];
    const mealCategories = mealCategoriesParam ? mealCategoriesParam.split(',').map(c => c.trim()).filter(c => c) : [];
    const cookingStyles = cookingStylesParam ? cookingStylesParam.split(',').map(s => s.trim()).filter(s => s) : [];

    const session = await getServerSession(authOptions);
    const userEmail = session?.user?.email;

    const where: Prisma.RecipeWhereInput = {
        source: 'ADMIN'
    };
    const andConditions: Prisma.RecipeWhereInput[] = [];

    const dietFieldMap: { [key: string]: keyof Prisma.RecipeWhereInput } = {
      vegetarian: 'isVegetarian',
      vegan: 'isVegan',
      glutenFree: 'isGlutenFree',
      lactoseFree: 'isLactoseFree',
      nutFree: 'isNutFree',
      pescatarian: 'isPescatarian',
    };
    if (diets.length > 0) {
      diets.forEach(diet => {
        const field = dietFieldMap[diet.toLowerCase().replace('-', '')];
        if (field) {
          andConditions.push({ [field]: true });
        }
      });
    }

    if (regions.length > 0) {
      andConditions.push({
        regions: { // Updated for many-to-many
          some: {
            name: {
              in: regions,
              mode: 'insensitive'
            }
          }
        }
      });
    }

    if (cookingStyles.length > 0) {
       andConditions.push({
         cookingStyles: {
           hasSome: cookingStyles
         }
       });
    }

    if (mealCategories.length > 0) {
       andConditions.push({
         categories: {
           some: {
             name: {
               in: mealCategories,
               mode: 'insensitive'
             }
           }
         }
       });
    }

    if (excludedFoods.length > 0) {
      andConditions.push({
        NOT: {
          ingredients: {
            some: {
              name: {
                in: excludedFoods,
                mode: 'insensitive'
              }
            }
          }
        }
      });
    }

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

    if (andConditions.length > 0) {
       where.AND = andConditions;
    }

    console.log("Constructed Prisma Where Clause:", JSON.stringify(where, null, 2));

    const recipes = await prisma.recipe.findMany({
      where,
      include: {
        ingredients: true,
        instructions: { orderBy: { stepNumber: 'asc' } },
        categories: { select: { name: true } },
        nutritionFacts: true,
        regions: true, // ADDED
      },
      skip: skip,
      take: limit,
      orderBy: { 
         createdAt: 'desc' 
      }
    });

    const totalCount = await prisma.recipe.count({
      where,
    });

    return NextResponse.json({ 
      recipes, 
      totalCount, 
      currentPage: page, 
      totalPages: Math.ceil(totalCount / limit) 
    });

  } catch (error) {
    console.error('Error fetching recipes:', error);
    if (error instanceof Error) {
        console.error(error.message);
    }
    return NextResponse.json({ error: 'Failed to fetch recipes', details: error instanceof Error ? error.message : String(error) }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  if (!userId) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body: CreateRecipePayload = await request.json();

    if (!body.title || !body.description) {
      return NextResponse.json({ message: 'Missing required fields: title, description' }, { status: 400 });
    }
    if (typeof body.cookingTime !== 'number' || typeof body.servings !== 'number') {
        return NextResponse.json({ message: 'cookingTime and servings must be numbers and are required' }, { status: 400 });
    }
    if (!Array.isArray(body.ingredients) || body.ingredients.length === 0) {
      return NextResponse.json({ message: 'Ingredients list is required and cannot be empty' }, { status: 400 });
    }
    if (!Array.isArray(body.instructions) || body.instructions.length === 0) {
       return NextResponse.json({ message: 'Instructions list is required and cannot be empty' }, { status: 400 });
    }

    const { ingredients, instructions, regionNames, ...recipeData } = body;

    const createdRecipe = await prisma.$transaction(async (tx) => {
      let regionConnections: { id: string }[] = [];
      if (regionNames && regionNames.length > 0) {
        const existingRegions = await tx.region.findMany({ // Corrected: tx.region
          where: { name: { in: regionNames, mode: 'insensitive' } },
          select: { id: true }
        });
        regionConnections = existingRegions.map((r: { id: string }) => ({ id: r.id }));
      }

      const newRecipe = await tx.recipe.create({
        data: {
          title: recipeData.title,
          description: recipeData.description,
          cookingTime: recipeData.cookingTime,
          servings: recipeData.servings,
          authorId: userId, 
          source: 'USER_CREATED',
          difficulty: recipeData.difficulty,
          imageUrl: recipeData.imageUrl,
          calories: recipeData.calories,
          cookingStyles: recipeData.cookingStyles ?? [],
          isVegetarian: recipeData.isVegetarian,
          isVegan: recipeData.isVegan,
          isGlutenFree: recipeData.isGlutenFree,
          isLactoseFree: recipeData.isLactoseFree,
          isNutFree: recipeData.isNutFree,
          isPescatarian: recipeData.isPescatarian,
          isFermented: recipeData.isFermented,
          isLowFodmap: recipeData.isLowFodmap,
          ...(regionConnections.length > 0 && { regions: { connect: regionConnections } }), // ADDED
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

    return NextResponse.json({ id: createdRecipe.id, title: createdRecipe.title }, { status: 201 });

  } catch (error) {
      console.error("Failed to create recipe:", error);
       if (error instanceof Prisma.PrismaClientValidationError) {
           return NextResponse.json({ message: 'Invalid data provided for recipe creation.', details: error.message }, { status: 400 });
       }
       if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
            return NextResponse.json({ message: 'A recipe with this title already exists.', details: error.meta?.target }, { status: 409 });
       }
      return NextResponse.json({ message: 'An unexpected error occurred while creating the recipe.' }, { status: 500 });
  }
}