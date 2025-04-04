import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import prisma from '@/lib/prisma';

export async function GET() {
  const session = await auth();

  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const userCuisinePreferences = await prisma.userCuisinePreference.findMany({
      where: {
        userEmail: session.user.email,
      },
      include: {
        cuisine: true,
      },
    });

    return NextResponse.json(userCuisinePreferences);
  } catch (error) {
    console.error('Error fetching cuisine preferences:', error);
    return NextResponse.json(
      { error: 'Failed to fetch cuisine preferences' },
      { status: 500 }
    );
  }
}

interface CuisinePreferenceInput {
  cuisineId: string;
  level: 'love' | 'like' | 'neutral' | 'dislike';
}

export async function PUT(request: Request) {
  const session = await auth();
  const userEmail = session?.user?.email;

  if (!userEmail) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const data = await request.json();
    const { preferences } = data as { preferences: CuisinePreferenceInput[] };

    // Delete existing preferences
    await prisma.userCuisinePreference.deleteMany({
      where: {
        userEmail: userEmail,
      },
    });

    // Create new preferences
    const createdPreferences = await Promise.all(
      preferences.map(async (pref) => {
        // Ensure the cuisine exists
        const cuisine = await prisma.cuisine.findUnique({
          where: { id: pref.cuisineId },
        });

        if (!cuisine) {
          throw new Error(`Cuisine with ID ${pref.cuisineId} not found`);
        }

        return prisma.userCuisinePreference.create({
          data: {
            userEmail: userEmail,
            cuisineId: pref.cuisineId,
            preferenceLevel: pref.level,
          },
          include: {
            cuisine: true,
          },
        });
      })
    );

    return NextResponse.json(createdPreferences);
  } catch (error) {
    console.error('Error updating cuisine preferences:', error);
    return NextResponse.json(
      { error: 'Failed to update cuisine preferences' },
      { status: 500 }
    );
  }
} 