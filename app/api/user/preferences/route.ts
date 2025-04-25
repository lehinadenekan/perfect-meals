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
}).strict(); // Use strict to prevent extra fields

// GET /api/user/preferences
export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const userEmail = session.user.email;

  try {
    const preferences = await prisma.userPreference.findUnique({
      where: { userEmail: userEmail },
    });

    // If preferences don't exist, return null or an empty object 
    // consistent with how the frontend might expect it.
    if (!preferences) {
      // Option 1: Return 404 (perhaps less user-friendly for frontend)
      // return NextResponse.json({ error: 'Preferences not found' }, { status: 404 });
      // Option 2: Return null (frontend needs to handle null)
      // return NextResponse.json(null, { status: 200 });
      // Option 3: Return an empty object (frontend can use default values)
       return NextResponse.json({}, { status: 200 });
    }

    return NextResponse.json(preferences, { status: 200 });

  } catch (error) {
    console.error("Error fetching user preferences:", error);
    return NextResponse.json({ error: 'Failed to fetch preferences' }, { status: 500 });
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

  const userEmail = session.user.email;

  try {
    const body = await request.json();
    const validation = updatePreferencesSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json({ error: 'Invalid input', details: validation.error.errors }, { status: 400 });
    }

    const dataToUpsert = validation.data;

    // Remove keys with undefined values, but keep nulls (as user might want to clear a goal)
    Object.keys(dataToUpsert).forEach(key => {
      if (dataToUpsert[key as keyof typeof dataToUpsert] === undefined) {
        delete dataToUpsert[key as keyof typeof dataToUpsert];
      }
    });

    const upsertedPreference = await prisma.userPreference.upsert({
      where: { userEmail: userEmail },
      update: dataToUpsert,
      create: {
        userEmail: userEmail,
        ...dataToUpsert,
        // Set defaults for other fields if needed during creation
        // Example: dietTypes: [], excludedFoods: [], etc. 
        // Ensure all required fields for create are present
      },
    });

    return NextResponse.json(upsertedPreference, { status: 200 });

  } catch (error) {
    console.error("Error updating user preferences:", error);
    if (error instanceof z.ZodError) { // Catch Zod validation errors specifically if needed
        return NextResponse.json({ error: 'Invalid input format', details: error.errors }, { status: 400 });
    }
    // Generic error for other issues (DB connection, etc.)
    return NextResponse.json({ error: 'Failed to update preferences' }, { status: 500 });
  }
}