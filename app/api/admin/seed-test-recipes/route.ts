import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

// Sample image URLs for testing
const SAMPLE_IMAGES = [
  'https://images.unsplash.com/photo-1546069901-ba9599a7e63c',
  'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38',
  'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445',
  'https://images.unsplash.com/photo-1565958011703-44f9829ba187',
  'https://images.unsplash.com/photo-1482049016688-2d3e1b311543'
];

export async function POST() {
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

    // Add test recipes with sample images
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
          isLactoseFree: false,
          isNutFree: true,
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
      message: `Created ${createdRecipes.length} test recipes with sample images`,
      recipes: createdRecipes
    });
  } catch (error) {
    console.error('Error creating test recipes:', error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: `Failed to create test recipes: ${errorMessage}` }, { status: 500 });
  }
} 