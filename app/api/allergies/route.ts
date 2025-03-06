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
    const userAllergies = await prisma.userAllergy.findMany({
      where: {
        userEmail: session.user.email,
      },
      include: {
        ingredient: true,
      },
    });

    return NextResponse.json(userAllergies);
  } catch (error) {
    console.error('Error fetching user allergies:', error);
    return NextResponse.json(
      { error: 'Failed to fetch allergies' },
      { status: 500 }
    );
  }
}

interface AllergyInput {
  ingredient: string;
  severity: 'mild' | 'moderate' | 'severe';
}

export async function PUT(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const data = await request.json();
    const { allergies } = data as { allergies: AllergyInput[] };

    // Delete existing allergies
    await prisma.userAllergy.deleteMany({
      where: {
        userEmail: session.user.email,
      },
    });

    // Create new allergies
    const createdAllergies = await Promise.all(
      allergies.map(async (allergy) => {
        // First, ensure the ingredient exists in StandardIngredient
        const ingredient = await prisma.standardIngredient.upsert({
          where: { name: allergy.ingredient.toLowerCase() },
          update: {},
          create: {
            name: allergy.ingredient.toLowerCase(),
            category: 'other', // Default category
          },
        });

        // Then create the user allergy
        return prisma.userAllergy.create({
          data: {
            userEmail: session.user.email,
            ingredientId: ingredient.id,
            severity: allergy.severity,
          },
          include: {
            ingredient: true,
          },
        });
      })
    );

    return NextResponse.json(createdAllergies);
  } catch (error) {
    console.error('Error updating user allergies:', error);
    return NextResponse.json(
      { error: 'Failed to update allergies' },
      { status: 500 }
    );
  }
} 