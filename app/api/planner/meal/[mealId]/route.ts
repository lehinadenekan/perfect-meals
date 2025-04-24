import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // Assuming this path alias is correct
import { Prisma, MealType } from '@prisma/client'; // Import MealType
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/auth'; // Assuming this path alias is correct
import { z } from 'zod';

interface RouteParams {
  params: {
    mealId: string;
  }
}

// Zod schema for validating PUT body
const PutBodySchema = z.object({
  servings: z.number().min(0).optional(),
  isCompleted: z.boolean().optional(),
  mealType: z.nativeEnum(MealType).optional(), 
  mealTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time format (HH:mm)").optional().nullable(), // Added optional mealTime
}).refine(data => 
    data.servings !== undefined || 
    data.isCompleted !== undefined ||
    data.mealType !== undefined ||
    data.mealTime !== undefined, // Include mealTime in refine check
  {
  message: "At least one field (servings, isCompleted, mealType, mealTime) must be provided for update",
  path: ["servings", "isCompleted", "mealType", "mealTime"], 
});

// DELETE /api/planner/meal/[mealId]
export async function DELETE(request: Request, { params }: RouteParams) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  const mealId = params.mealId;

  if (!userId) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Use deleteMany to ensure ownership check via relation
    const deleteResult = await prisma.plannerMeal.deleteMany({
      where: {
        id: mealId,
        // Check ownership by traversing relation to PlannerDay
        plannerDay: {
          userId: userId,
        },
      },
    });

    // Check if any record was actually deleted
    if (deleteResult.count === 0) {
       return NextResponse.json({ message: 'Planner meal not found or you do not have permission to delete it.' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Planner meal deleted successfully.' }, { status: 200 });

  } catch (error) {
     console.error('Failed to delete planner meal:', error);
     // Catch other potential errors if needed
     return NextResponse.json({ message: 'An unexpected error occurred.' }, { status: 500 });
  }
}

// PUT /api/planner/meal/[mealId]
export async function PUT(request: Request, { params }: RouteParams) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  const mealId = params.mealId;

  if (!userId) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();

    // Validate request body
    const validationResult = PutBodySchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { message: 'Invalid request body', errors: validationResult.error.errors },
        { status: 400 }
      );
    }

    const { servings, isCompleted, mealType, mealTime } = validationResult.data; // Added mealTime

    // Construct update data object conditionally
    const updateData: { servings?: number; isCompleted?: boolean; mealType?: MealType; mealTime?: string | null } = {}; // Added mealTime type
    if (servings !== undefined) {
      updateData.servings = servings;
    }
    if (isCompleted !== undefined) {
      updateData.isCompleted = isCompleted;
    }
    if (mealType !== undefined) { 
        updateData.mealType = mealType;
    }
    if (mealTime !== undefined) { // Add mealTime to update data if provided (allow null)
        updateData.mealTime = mealTime; 
    }

    // Use updateMany to ensure ownership check via relation
    const updateResult = await prisma.plannerMeal.updateMany({
      where: {
        id: mealId,
        plannerDay: {
          userId: userId,
        },
      },
      data: updateData,
    });

    // Check if any record was actually updated
    if (updateResult.count === 0) {
        return NextResponse.json({ message: 'Planner meal not found or you do not have permission to update it.' }, { status: 404 });
    }

    // Fetch the updated meal to return it
    const updatedMeal = await prisma.plannerMeal.findUnique({
      where: { id: mealId },
      // Include necessary relations for response consistency
      include: {
        recipe: { select: { id: true, title: true, imageUrl: true } },
        customFoodEntry: { select: { id: true, name: true } },
      },
    });

    return NextResponse.json(updatedMeal);

  } catch (error) {
      console.error('Failed to update planner meal:', error);
      if (error instanceof Prisma.PrismaClientValidationError) {
         return NextResponse.json({ message: 'Invalid data provided.', details: error.message }, { status: 400 });
      }
      return NextResponse.json({ message: 'An unexpected error occurred.' }, { status: 500 });
  }
} 