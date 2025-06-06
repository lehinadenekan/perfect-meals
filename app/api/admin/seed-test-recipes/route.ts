import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
// Remove v5 import: import { auth } from '@/auth';
// Add v4 imports:
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/auth';

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
    // Check authentication using v4 pattern
    // Replace v5 call: const session = await auth();
    const session = await getServerSession(authOptions);
    const userEmail = session?.user?.email;

    if (!userEmail) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Add admin check if required for this route
    // const isAdmin = userEmail && process.env.ADMIN_EMAILS?.split(',').includes(userEmail);
    // if (!isAdmin) {
    //   return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    // }


    // Try to find a user for recipe authorship - using multiple fallbacks
    let authorUser = null;

    // First try the current user
    authorUser = await prisma.user.findUnique({
      where: { email: userEmail }
    });

    // If current user not found, try admin (adjust email if necessary)
    if (!authorUser) {
      authorUser = await prisma.user.findFirst({
        where: { email: process.env.ADMIN_EMAIL || 'admin@example.com' } // Use env var or a default admin
      });
    }

    // If still no user, try to find any user
    if (!authorUser) {
      authorUser = await prisma.user.findFirst();
    }

    // If still no user, create a system user
    if (!authorUser) {
      console.log('No users found, creating system user for recipe creation');
      // Use upsert to avoid errors if system user already exists
      authorUser = await prisma.user.upsert({
        where: { email: 'system@example.com'}, // Use a consistent system email
        update: {}, // No updates needed if exists
        create: {
          // Removed ID as it's auto-generated by cuid()
          name: 'System',
          email: 'system@example.com',
        }
      });
    }

    console.log(`Using user ${authorUser.name} (${authorUser.email}) for recipe creation`);

    // Add test recipes with sample images
    const createdRecipes = [];

    for (let i = 0; i < SAMPLE_IMAGES.length; i++) {
       // Use upsert to avoid creating duplicate test recipes if run multiple times
       const recipe = await prisma.recipe.upsert({
          where: { title: `Test Recipe ${i + 1} for Migration` }, // Use title as a unique identifier
          update: { // Update fields if recipe already exists
            imageUrl: SAMPLE_IMAGES[i],
            // Add any other fields you might want to update
          },
          create: { // Create if it doesn't exist
              title: `Test Recipe ${i + 1} for Migration`,
              description: `This is a test recipe created to test the image migration system.`,
              cookingTime: 30,
              servings: 4,
              difficulty: 'MEDIUM',
              imageUrl: SAMPLE_IMAGES[i],
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
      message: `Upserted ${createdRecipes.length} test recipes with sample images`, // Updated message
      recipes: createdRecipes
    });
  } catch (error) {
    console.error('Error creating/updating test recipes:', error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: `Failed to create/update test recipes: ${errorMessage}` }, { status: 500 });
  }
}