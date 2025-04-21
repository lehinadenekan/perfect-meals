import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';
// Import v4 session getter and options
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/auth';
// Remove v5 import
// import { auth } from '@/auth';

// GET /api/user/preferences
export async function GET() {
  // Use v4 session getter
  const session = await getServerSession(authOptions);
  // Get userEmail from v4 session
  const userEmail = session?.user?.email; // Use email

  // Check for userEmail
  if (!userEmail) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Find preferences by userEmail
    const userPreferences = await prisma.userPreference.findUnique({
      where: {
        userEmail: userEmail, // Use userEmail
      },
    });

    return NextResponse.json({
      success: true,
      // Return default structure with userEmail if not found
      preferences: userPreferences || { userEmail: userEmail, dietTypes: [], excludedFoods: [] },
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
  // Use v4 session getter
  const session = await getServerSession(authOptions);
  // Get userEmail from v4 session
  const userEmail = session?.user?.email; // Use email

  // Check for userEmail
  if (!userEmail) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { dietTypes, excludedFoods } = await request.json() as {
      dietTypes: string[];
      excludedFoods: string[];
    };

    // // No need to separately find the user, upsert handles it via relation
    // const user = await prisma.user.findUnique({
    //   where: { id: userId } // Check user exists by ID
    // });
    // if (!user) {
    //   return NextResponse.json(
    //     { error: 'User not found' },
    //     { status: 404 }
    //   );
    // }

    // Upsert preferences by userEmail
    const updatedPreferences = await prisma.userPreference.upsert({
      where: {
        userEmail: userEmail, // Use userEmail
      },
      update: {
        dietTypes: { set: dietTypes || [] },
        excludedFoods: { set: excludedFoods || [] },
      },
      create: {
        // userEmail is the primary key, Prisma handles relation implicitly if user exists
        userEmail: userEmail, // Use userEmail
        dietTypes: dietTypes || [],
        excludedFoods: excludedFoods || [],
        // You might need default values for other fields if they are required
        cookingTime: 'MEDIUM', // Example default
        servingSize: 2,       // Example default
        mealPrep: false,      // Example default
      },
      // Include the user relation in the response if needed
      // include: { user: true }
    });

    return NextResponse.json({
      success: true,
      preferences: updatedPreferences,
    });
  } catch (error) {
    console.error('Error saving preferences:', error);
    // Return a more specific error structure if possible
    return NextResponse.json(
      // { error: 'Failed to save preferences' }, // Generic error
      { error: 'An unexpected error occurred while saving preferences' }, // Client-facing error
      { status: 500 }
    );
  }
}

// DELETE /api/user/preferences
export async function DELETE() {
  // Use v4 session getter
  const session = await getServerSession(authOptions);
  // Get userEmail from v4 session
  const userEmail = session?.user?.email; // Use email

  // Check for userEmail
  if (!userEmail) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Delete preferences by userEmail
    await prisma.userPreference.delete({
      where: {
        userEmail: userEmail, // Use userEmail
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