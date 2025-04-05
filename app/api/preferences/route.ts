import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const session = await auth();

  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const userPreferences = await prisma.userPreference.findUnique({
      where: {
        userEmail: session.user.email,
      },
    });

    // Return default preferences if none exist
    return NextResponse.json(userPreferences || {
      dietTypes: [],
      excludedFoods: [],
      selectedRegions: [],
      searchInput: '',
      cookingTime: 'MEDIUM',
      servingSize: 2,
      mealPrep: false
    });
  } catch (error) {
    console.error('Error fetching user preferences:', error);
    return NextResponse.json(
      { error: 'Failed to fetch preferences' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  const session = await auth();

  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const data = await request.json();
    const { 
      cookingTime, 
      servingSize, 
      mealPrep,
      dietTypes,
      excludedFoods
    } = data;

    const updatedPreferences = await prisma.userPreference.upsert({
      where: {
        userEmail: session.user.email,
      },
      update: {
        cookingTime: cookingTime || 'MEDIUM',
        servingSize: servingSize || 2,
        mealPrep: mealPrep || false,
        dietTypes: { set: dietTypes || [] },
        excludedFoods: { set: excludedFoods || [] }
      },
      create: {
        userEmail: session.user.email,
        cookingTime: cookingTime || 'MEDIUM',
        servingSize: servingSize || 2,
        mealPrep: mealPrep || false,
        dietTypes: dietTypes || [],
        excludedFoods: excludedFoods || []
      }
    });

    return NextResponse.json(updatedPreferences);
  } catch (error) {
    console.error('Error updating user preferences:', error);
    return NextResponse.json(
      { error: 'Failed to update preferences' },
      { status: 500 }
    );
  }
} 