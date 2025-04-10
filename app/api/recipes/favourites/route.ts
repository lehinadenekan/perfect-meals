import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth'; // Assuming this is correct now
import { prisma } from '@/lib/prisma'; // Assuming this is correct now

// Get user's favourite recipes
export async function GET() {
  try {
    const session = await getServerSession(authOptions);

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
            nutritionFacts: true, // It's already included here
            categories: true,
            cuisines: true,
            tags: true
          }
        }
      },
    });

    // Transform the recipes based on fetched data
    const transformedRecipes = (user?.savedRecipes || []).map(recipe => {
      // This authorData construction seems overly complex and might be causing issues
      // It incorrectly includes nutritionFacts: undefined
      // Let's simplify and correct the transformation
      const author = recipe.author ? {
        id: recipe.author.id,
        name: recipe.author.name || undefined,
        email: recipe.author.email || undefined, // Include email if needed by Recipe type
        image: recipe.author.image || undefined,
      } : undefined;


      return {
        // Recipe Info
        id: recipe.id,
        title: recipe.title,
        description: recipe.description || undefined,
        cookingTime: recipe.cookingTime || undefined, // Prefer undefined over default number?
        servings: recipe.servings || undefined, // Prefer undefined over default number?
        difficulty: recipe.difficulty || undefined,
        cuisineType: recipe.cuisines[0]?.name || undefined, // Use first cuisine name
        regionOfOrigin: recipe.cuisines[0]?.region || undefined, // Use first cuisine region
        imageUrl: recipe.imageUrl || undefined,
        createdAt: recipe.createdAt,
        updatedAt: recipe.updatedAt,

        // Author Info
        authorId: recipe.authorId,
        author: author, // Use the correctly structured author object

        // Ingredients & Instructions
        ingredients: recipe.ingredients.map(i => ({
          ...i,
          notes: i.notes || undefined
        })),
        instructions: recipe.instructions,

        // Categorization & Tags (simplified, adjust if Recipe type needs more)
        type: recipe.categories[0]?.name || undefined, // Use first category name
        cuisineId: recipe.cuisines[0]?.id || undefined, // Use first cuisine ID
        tags: recipe.tags.map(t => t.name), // Assuming Recipe type wants tag names as string[]

        // Boolean Flags
        isVegetarian: recipe.isVegetarian ?? false,
        isVegan: recipe.isVegan ?? false,
        isGlutenFree: recipe.isGlutenFree ?? false,
        isNutFree: recipe.isNutFree ?? false,
        isLowFodmap: recipe.isLowFodmap ?? false,
        isLactoseFree: recipe.isLactoseFree ?? false,
        isPescatarian: recipe.isPescatarian ?? false,
        isFermented: recipe.isFermented ?? false, // Assuming this represents the whole recipe feature

        // Nutrition
        calories: recipe.nutritionFacts ?
          Math.round(
            (recipe.nutritionFacts.protein || 0) * 4 +
            (recipe.nutritionFacts.carbs || 0) * 4 +
            (recipe.nutritionFacts.fat || 0) * 9
          ) : undefined,
        // Pass the whole nutritionFacts object if it exists
        nutritionFacts: recipe.nutritionFacts || undefined,

        // No need to add fields like authenticity, cookingMethods etc. here
        // as we are no longer forcing it into the specific frontend Recipe type.
      };
    });

    // Return empty array if user not found or no saved recipes
    return NextResponse.json(transformedRecipes);
  } catch (error) {
    console.error('Error fetching favourite recipes:', error);
    // Return empty array instead of error for better UI experience
    return NextResponse.json([], { status: 200 });
  }
}

// Add or remove a recipe from favourites
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

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

    // Add or remove recipe from favourites
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
    console.error('Error updating favourite recipes:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update favourite recipes' },
      { status: 500 }
    );
  }
}