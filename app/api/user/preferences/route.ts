import { NextResponse } from 'next/server';
// import { getServerSession } from 'next-auth'; // Remove
import prisma from '@/lib/prisma';
// import { authOptions } from '@/app/api/auth/[...nextauth]/route'; // Remove
import { auth } from '@/auth'; // Add

// GET /api/user/preferences
export async function GET() {
  const session = await auth(); // Replace
  const userEmail = session?.user?.email; // Use variable

  if (!userEmail) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const userPreferences = await prisma.userPreference.findUnique({
      where: {
        userEmail: userEmail, // Use variable
      },
    });

    return NextResponse.json({
      success: true,
      preferences: userPreferences || { dietTypes: [], excludedFoods: [] },
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
  const session = await auth(); // Replace
  const userEmail = session?.user?.email; // Use variable

  if (!userEmail) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { dietTypes, excludedFoods } = await request.json() as {
      dietTypes: string[];
      excludedFoods: string[];
    };

    // First ensure the user exists
    const user = await prisma.user.findUnique({
      where: { email: userEmail } // Use variable
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Now create or update the preferences using upsert
    const updatedPreferences = await prisma.userPreference.upsert({
      where: {
        userEmail: userEmail // Use variable
      },
      update: {
        dietTypes: { set: dietTypes || [] },
        excludedFoods: { set: excludedFoods || [] }
      },
      create: {
        userEmail: userEmail, // Use variable
        dietTypes: dietTypes || [],
        excludedFoods: excludedFoods || [],
        cookingTime: 'MEDIUM',
        servingSize: 2,
        mealPrep: false
      }
    });

    return NextResponse.json({
      success: true,
      preferences: updatedPreferences,
    });
  } catch (error) {
    console.error('Error saving preferences:', error);
    return NextResponse.json(
      { error: 'Failed to save preferences' },
      { status: 500 }
    );
  }
}

// DELETE /api/user/preferences
export async function DELETE() {
  const session = await auth(); // Replace
  const userEmail = session?.user?.email; // Use variable

  if (!userEmail) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await prisma.userPreference.delete({
      where: {
        userEmail: userEmail, // Use variable
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting preferences:', error);
    return NextResponse.json(
      { error: 'Failed to delete preferences' },
      { status: 500 }
    );
  }
} 