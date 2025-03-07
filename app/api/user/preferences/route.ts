import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import prisma from '@/lib/prisma';

// GET /api/user/preferences
export async function GET() {
  const session = await getServerSession();
  
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const userPreferences = await prisma.userPreference.findUnique({
      where: {
        userEmail: session.user.email,
      },
    });

    return NextResponse.json({
      success: true,
      preferences: userPreferences || { dietType: null, excludedFoods: [] },
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
  const session = await getServerSession();
  
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { dietType, excludedFoods } = await request.json();

    const updatedPreferences = await prisma.userPreference.upsert({
      where: {
        userEmail: session.user.email,
      },
      update: {
        dietType,
        excludedFoods,
      },
      create: {
        userEmail: session.user.email,
        dietType,
        excludedFoods,
      },
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
  const session = await getServerSession();
  
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await prisma.userPreference.delete({
      where: {
        userEmail: session.user.email,
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