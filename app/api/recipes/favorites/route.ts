import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import prisma from '@/lib/prisma';

// Get user's favorite recipes
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        savedRecipes: {
          select: {
            id: true,
            title: true,
            description: true,
            imageUrl: true,
            cookingTime: true,
            difficulty: true,
          },
        },
      },
    });

    return NextResponse.json(user?.savedRecipes || []);
  } catch (error) {
    console.error('Error fetching favorite recipes:', error);
    return NextResponse.json(
      { error: 'Failed to fetch favorite recipes' },
      { status: 500 }
    );
  }
}

// Add or remove a recipe from favorites
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { recipeId, action } = await request.json();
    if (!recipeId || !['add', 'remove'].includes(action)) {
      return NextResponse.json(
        { error: 'Invalid request parameters' },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    if (action === 'add') {
      await prisma.user.update({
        where: { id: user.id },
        data: {
          savedRecipes: {
            connect: { id: recipeId },
          },
        },
      });
    } else {
      await prisma.user.update({
        where: { id: user.id },
        data: {
          savedRecipes: {
            disconnect: { id: recipeId },
          },
        },
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating favorite recipes:', error);
    return NextResponse.json(
      { error: 'Failed to update favorite recipes' },
      { status: 500 }
    );
  }
} 