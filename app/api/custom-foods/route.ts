import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // Assuming this path alias is correct
import { Prisma } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/auth'; // Assuming this path alias is correct

// POST /api/custom-foods
export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id; // Use ID from session

  if (!userId) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();

    // Basic Validation
    if (!body.name) {
      return NextResponse.json({ message: 'Missing required field: name' }, { status: 400 });
    }

    const { name, servingSize, calories, protein, carbs, fat } = body;

    const newCustomFood = await prisma.customFoodEntry.create({
      data: {
        userId: userId, // Link to the logged-in user
        name: name,
        servingSize: servingSize ?? null,
        calories: calories ? parseInt(String(calories), 10) : null, // Ensure integer or null
        protein: protein ? parseInt(String(protein), 10) : null,   // Ensure integer or null
        carbs: carbs ? parseInt(String(carbs), 10) : null,     // Ensure integer or null
        fat: fat ? parseInt(String(fat), 10) : null,         // Ensure integer or null
      },
    });

    return NextResponse.json(newCustomFood, { status: 201 });

  } catch (error) {
    console.error('Failed to create custom food entry:', error);
    if (error instanceof Prisma.PrismaClientValidationError) {
      return NextResponse.json({ message: 'Invalid data provided.', details: error.message }, { status: 400 });
    }
    // Generic error response
    return NextResponse.json({ message: 'An unexpected error occurred.' }, { status: 500 });
  }
}

// Placeholder for GET handler (implement later)
export async function GET() {
   const session = await getServerSession(authOptions);
   const userId = session?.user?.id;

   if (!userId) {
       return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
   }

   try {
        const customFoods = await prisma.customFoodEntry.findMany({
            where: { userId: userId },
            orderBy: { createdAt: 'desc' } // Example ordering
        });
        return NextResponse.json(customFoods);
   } catch (error) {
       console.error('Failed to fetch custom food entries:', error);
       return NextResponse.json({ message: 'An unexpected error occurred.' }, { status: 500 });
   }
} 