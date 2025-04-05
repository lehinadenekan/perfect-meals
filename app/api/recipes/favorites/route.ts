import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { Recipe } from '@/app/types/recipe';

// Get user's favorite recipes
export async function GET() {
  try {
    const session = await auth();
    
    // Check for auth
    if (!session?.user?.email) {
      return NextResponse.json([], { status: 200 }); // Return empty array instead of error for unauthenticated users
    }

    // Find the user and their saved recipes
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        savedRecipes: {
          include: {
            ingredients: true,
            instructions: true,
            author: {
              select: {
                id: true,
                name: true,
                email: true,
                image: true
              }
            },
            nutritionFacts: true,
            categories: true,
            cuisines: true,
            tags: true
          }
        }
      },
    });

    // Transform the recipes to match the frontend Recipe type
    const transformedRecipes: Recipe[] = (user?.savedRecipes || []).map(recipe => ({
      id: recipe.id,
      title: recipe.title,
      description: recipe.description || undefined,
      cookingTime: recipe.cookingTime || 30,
      servings: recipe.servings || 4,
      difficulty: recipe.difficulty || 'medium',
      cuisineType: recipe.cuisineType || recipe.cuisines[0]?.name || 'Global',
      regionOfOrigin: recipe.regionOfOrigin || recipe.cuisines[0]?.region || 'Global',
      imageUrl: recipe.imageUrl || undefined,
      calories: recipe.nutritionFacts ? 
        Math.round(
          (recipe.nutritionFacts.protein || 0) * 4 + 
          (recipe.nutritionFacts.carbs || 0) * 4 + 
          (recipe.nutritionFacts.fat || 0) * 9
        ) : undefined,
      authorId: recipe.authorId,
      author: recipe.author ? {
        name: recipe.author.name || '',
        image: recipe.author.image || undefined
      } : undefined,
      type: recipe.categories[0]?.name || 'main',
      cuisineId: recipe.cuisines[0]?.id || '',
      authenticity: 'traditional',
      cookingMethods: recipe.cuisines[0]?.cookingMethods || [],
      spiceLevel: 'medium',
      showCount: 0,
      hasFeatureFermented: recipe.isFermented || false,
      hasFermentedIngredients: recipe.ingredients.some(i => i.isFermented),
      hasFish: false,
      isVegetarian: recipe.isVegetarian || false,
      isVegan: recipe.isVegan || false,
      isGlutenFree: recipe.isGlutenFree || false,
      isNutFree: recipe.isNutFree || false,
      isLowFodmap: recipe.isLowFodmap || false,
      isLactoseFree: recipe.isLactoseFree || false,
      isPescatarian: recipe.isPescatarian || false,
      isFermented: recipe.isFermented || false,
      ingredients: recipe.ingredients.map(i => ({
        ...i,
        notes: i.notes || undefined
      })),
      instructions: recipe.instructions,
      createdAt: recipe.createdAt,
      updatedAt: recipe.updatedAt
    }));

    // Return empty array if user not found or no saved recipes
    return NextResponse.json(transformedRecipes);
  } catch (error) {
    console.error('Error fetching favorite recipes:', error);
    // Return empty array instead of error for better UI experience
    return NextResponse.json([], { status: 200 });
  }
}

// Add or remove a recipe from favorites
export async function POST(request: Request) {
  try {
    const session = await auth();
    
    // Check for auth
    if (!session?.user?.email) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    // Parse request body
    const body = await request.json().catch(() => ({}));
    const { recipeId, action } = body;
    
    if (!recipeId || !['add', 'remove'].includes(action)) {
      return NextResponse.json(
        { success: false, error: 'Invalid request parameters' },
        { status: 400 }
      );
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
    }

    // Check if recipe exists
    const recipe = await prisma.recipe.findUnique({
      where: { id: recipeId },
      select: { id: true }
    });

    if (!recipe) {
      return NextResponse.json({ success: false, error: 'Recipe not found' }, { status: 404 });
    }

    // Add or remove recipe from favorites
    if (action === 'add') {
      await prisma.user.update({
        where: { id: user.id },
        data: {
          savedRecipes: {
            connect: { id: recipeId },
          },
        },
      });
    } else {
      await prisma.user.update({
        where: { id: user.id },
        data: {
          savedRecipes: {
            disconnect: { id: recipeId },
          },
        },
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating favorite recipes:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update favorite recipes' },
      { status: 500 }
    );
  }
} 