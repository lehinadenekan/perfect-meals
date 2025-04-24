import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/auth';
import { z } from 'zod';
import { MealType, Prisma } from '@prisma/client';

// Zod schema for validating POST body
const QuickAddBodySchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format (YYYY-MM-DD)"), // Expect YYYY-MM-DD string
  mealType: z.nativeEnum(MealType),
  itemName: z.string().min(1, "Item name cannot be empty"),
  // Optional macro fields can be added here later if needed
  // calories: z.number().optional(),
  // protein: z.number().optional(),
  // carbs: z.number().optional(),
  // fat: z.number().optional(),
});

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  if (!userId) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();

    // Validate request body
    const validationResult = QuickAddBodySchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        { message: 'Invalid request body', errors: validationResult.error.errors },
        { status: 400 }
      );
    }

    const { date: dateString, mealType, itemName } = validationResult.data;

    // --- Date Handling (Consistent with main planner API) ---
    // Parse the YYYY-MM-DD string into UTC components
    const [year, month, day] = dateString.split('-').map(Number);
    // Create a Date object representing UTC midnight for the target day
    const targetDate = new Date(Date.UTC(year, month - 1, day)); // month is 0-indexed

    // --- Database Operations in Transaction ---
    const newPlannerMeal = await prisma.$transaction(async (tx) => {
      // 1. Find or create the PlannerDay
      const plannerDay = await tx.plannerDay.upsert({
        where: {
          userId_date: { userId: userId, date: targetDate },
        },
        update: {},
        create: { userId: userId, date: targetDate },
      });

      // 2. Create the CustomFoodEntry
      const customFood = await tx.customFoodEntry.create({
        data: {
          userId: userId,
          name: itemName,
          // Add optional macros here if they were included in validation/data
          // calories: validationResult.data.calories,
          // protein: validationResult.data.protein,
          // carbs: validationResult.data.carbs,
          // fat: validationResult.data.fat,
          servingSize: '1 serving', // Default serving size
        },
      });

      // 3. Create the PlannerMeal linking the two
      const plannerMeal = await tx.plannerMeal.create({
        data: {
          plannerDayId: plannerDay.id,
          mealType: mealType,
          customFoodEntryId: customFood.id,
          servings: 1, // Default servings for quick add
          mealTime: null, // Default mealTime to null for quick add
        },
         // Include the new custom food entry details in the response
        include: {
            customFoodEntry: true
        }
      });

      return plannerMeal;
    });

    return NextResponse.json(newPlannerMeal, { status: 201 });

  } catch (error) {
    console.error('Failed to quick add planner meal:', error);
     if (error instanceof Prisma.PrismaClientKnownRequestError) {
       // Handle potential known errors, though less likely here than FK errors
        return NextResponse.json({ message: `Database error: ${error.code}` }, { status: 409 }); // Conflict or other DB issue
     }
    return NextResponse.json({ message: 'An unexpected error occurred.' }, { status: 500 });
  }
} 