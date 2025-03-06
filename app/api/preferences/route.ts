import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import prisma from '@/lib/prisma';

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

    return NextResponse.json(userPreferences);
  } catch (error) {
    console.error('Error fetching user preferences:', error);
    return NextResponse.json(
      { error: 'Failed to fetch preferences' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  const session = await getServerSession();

  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const data = await request.json();
    const { cookingTime, skillLevel, servingSize, mealPrep } = data;

    const updatedPreferences = await prisma.userPreference.upsert({
      where: {
        userEmail: session.user.email,
      },
      update: {
        cookingTime,
        skillLevel,
        servingSize,
        mealPrep,
      },
      create: {
        userEmail: session.user.email,
        cookingTime,
        skillLevel,
        servingSize,
        mealPrep,
      },
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