import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const userPreferences = await prisma.userPreference.findUnique({
      where: {
        userEmail: session.user.email,
      },
      select: {
        isVegetarian: true,
        isVegan: true,
        isGlutenFree: true,
        isLactoseFree: true,
        isKosher: true,
        isHalal: true,
        isLowCarb: true,
      },
    });

    if (!userPreferences) {
      return NextResponse.json([]);
    }

    const restrictions = Object.entries(userPreferences)
      .filter(([_, value]) => value)
      .map(([key]) => key.replace('is', '').toLowerCase());

    return NextResponse.json(restrictions);
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
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const data = await request.json();
    const { restrictions } = data as { restrictions: DietaryRestriction[] };

    const updateData = {
      isVegetarian: restrictions.includes('vegetarian'),
      isVegan: restrictions.includes('vegan'),
      isGlutenFree: restrictions.includes('gluten-free'),
      isLactoseFree: restrictions.includes('dairy-free'),
      isKosher: restrictions.includes('kosher'),
      isHalal: restrictions.includes('halal'),
      isLowCarb: restrictions.includes('low-carb'),
    };

    const updatedPreferences = await prisma.userPreference.upsert({
      where: {
        userEmail: session.user.email,
      },
      update: updateData,
      create: {
        userEmail: session.user.email,
        cookingTime: '30-60', // Default value
        skillLevel: 'beginner', // Default value
        servingSize: 2, // Default value
        mealPrep: false, // Default value
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