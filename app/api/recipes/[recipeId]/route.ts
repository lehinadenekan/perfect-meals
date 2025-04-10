import { NextResponse } from 'next/server';
import { getRecipeById, RecipeDetailData } from '@/lib/data/recipes'; // Adjust import path if needed

export async function GET(
  request: Request, // Keep request parameter even if unused for now
  { params }: { params: { recipeId: string } }
): Promise<NextResponse<RecipeDetailData | { error: string }>> {
  const id = params.recipeId;

  if (!id) {
    return NextResponse.json({ error: 'Recipe ID is required' }, { status: 400 });
  }

  try {
    const recipe = await getRecipeById(id);

    if (!recipe) {
      return NextResponse.json({ error: 'Recipe not found' }, { status: 404 });
    }

    return NextResponse.json(recipe);
  } catch (error) {
    console.error(`[API Route Error] Failed to fetch recipe ${id}:`, error);
    // In production, avoid sending detailed error messages to the client
    return NextResponse.json({ error: 'Failed to fetch recipe data' }, { status: 500 });
  }
} 