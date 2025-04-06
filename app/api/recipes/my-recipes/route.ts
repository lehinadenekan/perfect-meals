import { NextResponse } from 'next/server';
import { auth } from '@/auth'; // Adjust path based on your auth setup
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Force dynamic rendering, disable static generation
export const dynamic = 'force-dynamic';

export async function GET() {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const userId = session.user.id;

  try {
    const userRecipes = await prisma.recipe.findMany({
      where: {
        authorId: userId,
      },
      include: {
        // Include relevant relations if needed by RecipeCard, adjust as necessary
        ingredients: true,
        instructions: {
          orderBy: {
            stepNumber: 'asc', // Ensure instructions are ordered
          },
        },
        // nutritionFacts: true, // Add if needed
        // author: true, // Author might be implicit here
      },
      orderBy: {
        createdAt: 'desc', // Or updatedAt, or title, etc.
      },
    });

    return NextResponse.json(userRecipes, { status: 200 });

  } catch (error) {
    console.error("Failed to fetch user's recipes:", error);
    return NextResponse.json({ message: 'Error fetching recipes' }, { status: 500 });
  } finally {
    // Disconnect Prisma Client - Important in serverless environments
    await prisma.$disconnect();
  }
} 