import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // Assuming this path alias is correct
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/auth'; // Assuming this path alias is correct
import { z } from 'zod';
import { Prisma, MealType } from '@prisma/client';

// Zod schema for validating query parameters
const QueryParamsSchema = z.object({
  startDate: z.coerce.date(), // Coerce string to Date
  endDate: z.coerce.date(),   // Coerce string to Date
});

// Zod schema for validating POST body
const PostBodySchema = z.object({
  date: z.coerce.date(), // Coerce string YYYY-MM-DD to Date
  mealType: z.nativeEnum(MealType), // Validate against prisma enum
  mealTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time format (HH:mm)").optional().nullable(), // Added optional mealTime with HH:mm validation
  recipeId: z.string().cuid().optional(),
  customFoodEntryId: z.string().cuid().optional(),
  servings: z.number().min(0).optional().default(1.0),
}).refine(data => !!data.recipeId !== !!data.customFoodEntryId, {
  // Ensure either recipeId or customFoodEntryId is provided, but not both
  message: "Either recipeId or customFoodEntryId must be provided, but not both",
  path: ["recipeId", "customFoodEntryId"], // Indicate which fields are related to the error
});

// GET /api/planner?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD
export async function GET(request: Request) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  if (!userId) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);

  // Validate query parameters
  const validationResult = QueryParamsSchema.safeParse({
    startDate: searchParams.get('startDate'),
    endDate: searchParams.get('endDate'),
  });

  if (!validationResult.success) {
    return NextResponse.json(
      { message: 'Invalid query parameters', errors: validationResult.error.errors },
      { status: 400 }
    );
  }

  const { startDate, endDate } = validationResult.data;

  // Optional: Add check if endDate is before startDate
  if (endDate < startDate) {
      return NextResponse.json({ message: 'endDate cannot be before startDate' }, { status: 400 });
  }

  try {
    const plannerDays = await prisma.plannerDay.findMany({
      where: {
        userId: userId,
        date: {
          gte: startDate,
          lte: endDate,
        },
      },
      select: {
        id: true,
        userId: true,
        date: true,
        notes: true,
        meals: {
          select: {
            id: true,
            plannerDayId: true,
            mealType: true,
            mealTime: true,
            servings: true,
            recipeId: true,
            customFoodEntryId: true,
            isCompleted: true,
            recipe: {
              select: {
                id: true,
                title: true,
                imageUrl: true,
                nutritionFacts: true,
                servings: true,
                ingredients: true,
                instructions: true,
              },
            },
            customFoodEntry: {
              select: {
                id: true,
                name: true,
                servingSize: true,
                calories: true,
                protein: true,
                carbs: true,
                fat: true,
              },
            },
          },
          orderBy: {
            mealType: 'asc',
          },
        },
      },
      orderBy: {
        date: 'asc',
      },
    });

    return NextResponse.json(plannerDays);

  } catch (error) {
    console.error('Failed to fetch planner data:', error);
    return NextResponse.json({ message: 'An unexpected error occurred.' }, { status: 500 });
  }
}

// POST /api/planner
export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  if (!userId) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();

    // Validate request body
    const validationResult = PostBodySchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        { message: 'Invalid request body', errors: validationResult.error.errors },
        { status: 400 }
      );
    }

    const { date, mealType, mealTime, recipeId, customFoodEntryId, servings } = validationResult.data;

    // Use UTC methods to construct the target date to avoid local timezone shifts
    const targetDate = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));

    // Find or create the PlannerDay
    const plannerDay = await prisma.plannerDay.upsert({
      where: {
        userId_date: { // Use the compound unique key
          userId: userId,
          date: targetDate,
        },
      },
      update: {}, // No updates needed if it exists
      create: {
        userId: userId,
        date: targetDate,
      },
    });

    // Create the PlannerMeal
    const newPlannerMeal = await prisma.plannerMeal.create({
      data: {
        plannerDayId: plannerDay.id,
        mealType: mealType,
        mealTime: mealTime,
        recipeId: recipeId,
        customFoodEntryId: customFoodEntryId,
        servings: servings,
      },
      // Optionally include relations in the response
      include: {
          recipe: { select: { id: true, title: true, imageUrl: true }},
          customFoodEntry: { select: { id: true, name: true }}
      }
    });

    return NextResponse.json(newPlannerMeal, { status: 201 });

  } catch (error) {
    console.error('Failed to add planner meal:', error);
     if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // Handle specific errors like foreign key constraints if a recipe/custom food doesn't exist
        if (error.code === 'P2003') { // Foreign key constraint failed
             return NextResponse.json({ message: 'Invalid recipeId or customFoodEntryId provided.' }, { status: 400 });
        }
     }
    return NextResponse.json({ message: 'An unexpected error occurred.' }, { status: 500 });
  }
} 