import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // Assuming prisma client is here
import { Prisma } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/auth'; // Assuming authOptions are here
import { getRecipeById, RecipeDetailData } from '@/lib/data/recipes';


// --- Interface for Update Payload ---
interface UpdateRecipePayload {
  title?: string;
  description?: string;
  cookingTime?: number; // Stays as number, consistent with CreateRecipePayload and schema
  servings?: number;
  difficulty?: string;
  regionNames?: string[]; // To manage region connections
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
  // Ingredients and instructions updates are more complex and often handled separately
  // For simplicity, this basic update payload won't handle direct ingredient/instruction updates here.
  // That would typically involve deleting old ones and creating new ones within a transaction.
}
// --- End Interface ---

export async function GET(
  request: Request,
  { params }: { params: { recipeId: string } }
): Promise<NextResponse<RecipeDetailData | { error: string }>> {
  const id = params.recipeId;

  if (!id) {
    return NextResponse.json({ error: 'Recipe ID is required' }, { status: 400 });
  }

  try {
    // Assuming getRecipeById already includes regions after previous updates
    const recipe = await getRecipeById(id); 

    if (!recipe) {
      return NextResponse.json({ error: 'Recipe not found' }, { status: 404 });
    }

    return NextResponse.json(recipe);
  } catch (error) {
    console.error(`[API Route Error] Failed to fetch recipe ${id}:`, error);
    return NextResponse.json({ error: 'Failed to fetch recipe data' }, { status: 500 });
  }
} 

// --- PUT HANDLER for UPDATING a recipe ---
export async function PUT(
  request: Request,
  { params }: { params: { recipeId: string } }
) {
  const session = await getServerSession(authOptions);
  const currentUserId = session?.user?.id;

  if (!currentUserId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const recipeId = params.recipeId;
  if (!recipeId) {
    return NextResponse.json({ error: 'Recipe ID is required' }, { status: 400 });
  }

  try {
    const body: UpdateRecipePayload = await request.json();

    // Fetch the existing recipe to check authorship
    const existingRecipe = await prisma.recipe.findUnique({
      where: { id: recipeId },
      select: { authorId: true }
    });

    if (!existingRecipe) {
      return NextResponse.json({ error: 'Recipe not found' }, { status: 404 });
    }

    // Authorization: Only allow author to update
    if (existingRecipe.authorId !== currentUserId) {
      return NextResponse.json({ error: 'Forbidden: You are not the author of this recipe' }, { status: 403 });
    }

    const { regionNames, ...recipeUpdateData } = body;
    
    const dataToUpdate: Prisma.RecipeUpdateInput = {
      ...recipeUpdateData, // Spread other updatable fields
      ...(recipeUpdateData.cookingTime !== undefined && { cookingTime: recipeUpdateData.cookingTime }), // Ensure it's an Int
    };

    // Handle regions update
    if (regionNames !== undefined) { // if regionNames is explicitly provided (even if empty array)
      if (regionNames.length > 0) {
        const existingRegions = await prisma.region.findMany({
          where: { name: { in: regionNames, mode: 'insensitive' } },
          select: { id: true }
        });
        // Only connect to regions that were found by name
        dataToUpdate.regions = { set: existingRegions.map(r => ({ id: r.id })) };
      } else {
        // If regionNames is an empty array, disconnect all regions
        dataToUpdate.regions = { set: [] };
      }
    }
    // If regionNames is not in the payload, regions are not changed.

    const updatedRecipe = await prisma.recipe.update({
      where: { id: recipeId },
      data: dataToUpdate,
      include: {
        regions: true, // Include regions in the response
        // ingredients: true, // Optionally include other relations
        // instructions: true,
      }
    });

    return NextResponse.json(updatedRecipe);

  } catch (error) {
    console.error(`[API PUT Error] Failed to update recipe ${recipeId}:`, error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') { // Record to update not found
        return NextResponse.json({ error: 'Recipe not found during update' }, { status: 404 });
      }
      if (error.code === 'P2002') { // Unique constraint failed (e.g. title)
         return NextResponse.json({ error: 'Failed to update recipe due to a conflict (e.g., title already exists).', details: error.meta?.target }, { status: 409 });
      }
    } else if (error instanceof Prisma.PrismaClientValidationError) {
      return NextResponse.json({ error: 'Invalid data provided for recipe update.', details: error.message }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to update recipe' }, { status: 500 });
  }
}