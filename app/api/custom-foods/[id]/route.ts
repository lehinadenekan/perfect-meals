import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // Assuming this path alias is correct
import { Prisma } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/auth'; // Assuming this path alias is correct

interface RouteParams {
  params: {
    id: string;
  }
}

// PUT /api/custom-foods/[id]
export async function PUT(request: Request, { params }: RouteParams) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  const customFoodId = params.id;

  if (!userId) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { name, servingSize, calories, protein, carbs, fat } = body;

    // Basic Validation
    if (!name) {
      return NextResponse.json({ message: 'Missing required field: name' }, { status: 400 });
    }

    const updatedCustomFood = await prisma.customFoodEntry.update({
      where: {
        id: customFoodId,
        userId: userId, // Ensure user owns this entry
      },
      data: {
        name: name,
        servingSize: servingSize ?? null,
        calories: calories ? parseInt(String(calories), 10) : null,
        protein: protein ? parseInt(String(protein), 10) : null,
        carbs: carbs ? parseInt(String(carbs), 10) : null,
        fat: fat ? parseInt(String(fat), 10) : null,
      },
    });

    return NextResponse.json(updatedCustomFood);

  } catch (error) {
    console.error('Failed to update custom food entry:', error);
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
        // P2025: Record to update not found.
        return NextResponse.json({ message: 'Custom food entry not found or you do not have permission to update it.' }, { status: 404 });
    }
    if (error instanceof Prisma.PrismaClientValidationError) {
      return NextResponse.json({ message: 'Invalid data provided.', details: error.message }, { status: 400 });
    }
    return NextResponse.json({ message: 'An unexpected error occurred.' }, { status: 500 });
  }
}

// DELETE /api/custom-foods/[id]
export async function DELETE(request: Request, { params }: RouteParams) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  const customFoodId = params.id;

  if (!userId) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    await prisma.customFoodEntry.delete({
      where: {
        id: customFoodId,
        userId: userId, // Ensure user owns this entry
      },
    });

    return NextResponse.json({ message: 'Custom food entry deleted successfully.' }, { status: 200 });

  } catch (error) {
     console.error('Failed to delete custom food entry:', error);
     if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
         // P2025: Record to delete not found.
         return NextResponse.json({ message: 'Custom food entry not found or you do not have permission to delete it.' }, { status: 404 });
     }
     return NextResponse.json({ message: 'An unexpected error occurred.' }, { status: 500 });
  }
} 