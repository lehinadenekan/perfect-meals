import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

// Spoonacular sample image URLs
const SAMPLE_IMAGES = [
  'https://spoonacular.com/recipeImages/716429-556x370.jpg',
  'https://spoonacular.com/recipeImages/715538-556x370.jpg',
  'https://spoonacular.com/recipeImages/715421-556x370.jpg',
  'https://spoonacular.com/recipeImages/716276-556x370.jpg',
  'https://spoonacular.com/recipeImages/667917-556x370.jpg'
];

export async function POST(request: Request) {
  try {
    // Check authentication for the API call
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Try to find a user for recipe authorship - using multiple fallbacks
    let authorUser = null;
    
    // First try the current user
    authorUser = await prisma.user.findUnique({
      where: { email: session.user.email }
    });
    
    // If current user not found, try admin
    if (!authorUser) {
      authorUser = await prisma.user.findFirst({
        where: { email: 'admin@perfectmeals.com' }
      });
    }
    
    // If still no user, try to find any user
    if (!authorUser) {
      authorUser = await prisma.user.findFirst();
    }
    
    // If still no user, create a system user
    if (!authorUser) {
      console.log('No users found, creating system user for recipe creation');
      authorUser = await prisma.user.create({
        data: {
          id: 'system',
          name: 'System',
          email: 'system@perfectmeals.com',
        }
      });
    }

    console.log(`Using user ${authorUser.name} (${authorUser.email}) for recipe creation`);

    // Add test recipes with Spoonacular images
    const createdRecipes = [];
    
    for (let i = 0; i < SAMPLE_IMAGES.length; i++) {
      const recipe = await prisma.recipe.create({
        data: {
          title: `Test Recipe ${i + 1} for Migration`,
          description: `This is a test recipe created to test the image migration system.`,
          cookingTime: 30,
          servings: 4,
          difficulty: 'MEDIUM',
          cuisineType: 'International',
          type: 'DINNER',
          regionOfOrigin: 'International',
          imageUrl: SAMPLE_IMAGES[i],
          calories: 500,
          isVegetarian: false,
          isVegan: false,
          isGlutenFree: false,
          isDairyFree: false,
          isNutFree: true,
          totalReviews: 0,
          author: {
            connect: { id: authorUser.id }
          },
          cuisine: {
            connectOrCreate: {
              where: { name: 'International' },
              create: {
                name: 'International',
                region: 'Global',
                difficultyLevel: 'MEDIUM',
                averagePreparationTime: 30,
                commonIngredients: [],
                cookingMethods: [],
                spiceProfile: [],
                dietaryConsiderations: [],
                mealTypes: ['DINNER']
              }
            }
          },
          ingredients: {
            create: [
              { name: 'Ingredient 1', amount: 1, unit: 'cup', notes: 'Notes for ingredient 1' },
              { name: 'Ingredient 2', amount: 2, unit: 'tbsp', notes: 'Notes for ingredient 2' }
            ]
          },
          instructions: {
            create: [
              { stepNumber: 1, description: 'First step of the recipe' },
              { stepNumber: 2, description: 'Second step of the recipe' }
            ]
          },
          nutritionFacts: {
            create: {
              protein: 20,
              carbs: 30,
              fat: 10,
              fiber: 5,
              sugar: 5,
              sodium: 200
            }
          }
        }
      });
      
      createdRecipes.push({ id: recipe.id, title: recipe.title, imageUrl: recipe.imageUrl });
    }

    return NextResponse.json({
      message: `Created ${createdRecipes.length} test recipes with Spoonacular images`,
      recipes: createdRecipes
    });
  } catch (error) {
    console.error('Error creating test recipes:', error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: `Failed to create test recipes: ${errorMessage}` }, { status: 500 });
  }
} 