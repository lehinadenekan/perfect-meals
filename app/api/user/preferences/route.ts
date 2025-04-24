import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // Assuming this path alias is correct
import { Prisma } from '@prisma/client';
// Import v4 session getter and options
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/auth'; // Assuming this path alias is correct
import { z } from 'zod';

const updatePreferencesSchema = z.object({
  dailyCalorieGoal: z.number().int().positive().optional().nullable(),
  dailyProteinGoal: z.number().int().positive().optional().nullable(),
  dailyCarbGoal: z.number().int().positive().optional().nullable(),
  dailyFatGoal: z.number().int().positive().optional().nullable(),
  // Include other preferences from the schema if they should be updatable here
  // cookingTime: z.string().optional(),
  // mealPrep: z.boolean().optional(),
  // servingSize: z.number().int().positive().optional(),
  // dietTypes: z.array(z.string()).optional(),
  // excludedFoods: z.array(z.string()).optional(),
  // regions: z.array(z.string()).optional(),
  // cookingStyles: z.array(z.string()).optional(),
  // mealCategories: z.array(z.string()).optional(),
});

// GET /api/user/preferences
export async function GET() {
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;

  if (!userEmail) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const userPreferences = await prisma.userPreference.findUnique({
      where: {
        userEmail: userEmail,
      },
    });

    return NextResponse.json({
      success: true,
      // Return default structure including macro goals if not found
      preferences: userPreferences || {
        userEmail: userEmail,
        dietTypes: [],
        excludedFoods: [],
        regions: [],
        cookingStyles: [],
        mealCategories: [],
        dailyProteinGoal: null, // Default added
        dailyCarbGoal: null,    // Default added
        dailyFatGoal: null,     // Default added
        dailyCalorieGoal: null  // Default added
      },
    });
  } catch (error) {
    console.error('Error fetching preferences:', error);
    return NextResponse.json(
      { error: 'Failed to fetch preferences' },
      { status: 500 }
    );
  }
}

// POST /api/user/preferences
export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;

  if (!userEmail) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Destructure all expected fields from request body
    const {
      dietTypes,
      excludedFoods,
      regions,
      cookingStyles,
      mealCategories,
      dailyProteinGoal, // Added
      dailyCarbGoal,    // Added
      dailyFatGoal,     // Added
      dailyCalorieGoal  // Added
    } = await request.json() as {
      dietTypes?: string[];
      excludedFoods?: string[];
      regions?: string[];
      cookingStyles?: string[];
      mealCategories?: string[];
      // Define types for macro fields (allow null/undefined from client)
      dailyProteinGoal?: number | null;
      dailyCarbGoal?: number | null;
      dailyFatGoal?: number | null;
      dailyCalorieGoal?: number | null;
    };

    // Upsert preferences by userEmail
    const updatedPreferences = await prisma.userPreference.upsert({
      where: {
        userEmail: userEmail,
      },
      update: {
        dietTypes: { set: dietTypes || [] },
        excludedFoods: { set: excludedFoods || [] },
        regions: { set: regions || [] },
        cookingStyles: { set: cookingStyles || [] },
        mealCategories: { set: mealCategories || [] },
        // Update macro fields (set to null if not provided or explicitly null)
        dailyProteinGoal: dailyProteinGoal ?? null,
        dailyCarbGoal:    dailyCarbGoal ?? null,
        dailyFatGoal:     dailyFatGoal ?? null,
        dailyCalorieGoal: dailyCalorieGoal ?? null,
      },
      create: {
        userEmail: userEmail,
        dietTypes: dietTypes || [],
        excludedFoods: excludedFoods || [],
        regions: regions || [],
        cookingStyles: cookingStyles || [],
        mealCategories: mealCategories || [],
        // Add new macro fields defaulted to null
        dailyProteinGoal: dailyProteinGoal ?? null,
        dailyCarbGoal:    dailyCarbGoal ?? null,
        dailyFatGoal:     dailyFatGoal ?? null,
        dailyCalorieGoal: dailyCalorieGoal ?? null,
        // Keep existing defaults for other fields
        cookingTime: 'MEDIUM',
        servingSize: 2,
        mealPrep: false,
      },
    });

    return NextResponse.json({
      success: true,
      preferences: updatedPreferences,
    });
  } catch (error) {
    console.error('Error saving preferences:', error);
    // Handle potential validation errors specifically if needed
    if (error instanceof Prisma.PrismaClientValidationError) {
       return NextResponse.json({ message: 'Invalid data provided for preferences.', details: error.message }, { status: 400 });
    }
    // Generic error response
    return NextResponse.json(
      { error: 'An unexpected error occurred while saving preferences' },
      { status: 500 }
    );
  }
}

// DELETE /api/user/preferences
export async function DELETE() {
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;

  if (!userEmail) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await prisma.userPreference.delete({
      where: {
        userEmail: userEmail,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    // Handle case where preferences might not exist (P2025) gracefully
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      return NextResponse.json({ success: true, message: 'No preferences found to delete.' });
    }
    console.error('Error deleting preferences:', error);
    return NextResponse.json(
      { error: 'Failed to delete preferences' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const parsedBody = updatePreferencesSchema.safeParse(body);

    if (!parsedBody.success) {
      return NextResponse.json({ error: 'Invalid input', details: parsedBody.error.errors }, { status: 400 });
    }

    const dataToUpdate = parsedBody.data;

    const updatedPreferences = await prisma.userPreference.upsert({
      where: { userEmail: session.user.email },
      update: dataToUpdate,
      create: {
        userEmail: session.user.email,
        ...dataToUpdate, // Spread validated data for creation
      },
    });

    return NextResponse.json(updatedPreferences);
  } catch (error) {
    console.error('Failed to update user preferences:', error);
    // Check for specific Prisma errors if needed
    return NextResponse.json({ error: 'Failed to update preferences' }, { status: 500 });
  }
}