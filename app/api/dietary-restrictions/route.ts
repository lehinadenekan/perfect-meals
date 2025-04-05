import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const session = await auth();
  const userEmail = session?.user?.email;

  if (!userEmail) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const userPreferences = await prisma.userPreference.findUnique({
      where: {
        userEmail: userEmail,
      },
      select: {
        dietTypes: true,
      },
    });

    return NextResponse.json(userPreferences?.dietTypes || []);
  } catch (error) {
    console.error('Error fetching dietary restrictions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dietary restrictions' },
      { status: 500 }
    );
  }
}

type DietaryRestriction =
  | 'vegetarian'
  | 'vegan'
  | 'gluten-free'
  | 'dairy-free'
  | 'kosher'
  | 'halal'
  | 'low-carb';

export async function PUT(request: Request) {
  const session = await auth();
  const userEmail = session?.user?.email;

  if (!userEmail) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const data = await request.json();
    const { restrictions } = data as { restrictions: DietaryRestriction[] };

    const updateData = {
      dietTypes: restrictions,
    };

    const updatedPreferences = await prisma.userPreference.upsert({
      where: {
        userEmail: userEmail,
      },
      update: updateData,
      create: {
        userEmail: userEmail,
        cookingTime: 'MEDIUM',
        mealPrep: false,
        servingSize: 2,
        ...updateData,
      },
    });

    return NextResponse.json(updatedPreferences);
  } catch (error) {
    console.error('Error updating dietary restrictions:', error);
    return NextResponse.json(
      { error: 'Failed to update dietary restrictions' },
      { status: 500 }
    );
  }
} 