import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      // Not authenticated or session doesn't contain user ID
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = session.user.id;

    // Fetch recipes where authorId matches the logged-in user's ID
    const userRecipes = await prisma.recipe.findMany({
      where: {
        authorId: userId,
      },
      // Optionally, select only needed fields for performance
      // select: { id: true, title: true, imageUrl: true, createdAt: true }
      orderBy: {
          createdAt: 'desc' // Optional: Order by creation date, newest first
      }
    });

    return NextResponse.json(userRecipes);

  } catch (error) {
    console.error('[API Route Error - /api/recipes/user]:', error);
    // Return a generic error response
    return NextResponse.json({ error: 'Failed to fetch user recipes' }, { status: 500 });
  }
} 