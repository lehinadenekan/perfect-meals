// app/api/user/preferences/favourites/ids/route.ts
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next'; // Restore v4 import
import { authOptions } from '@/auth'; // Correct path
// import { auth } from '@/auth'; // Remove v5 import
import { prisma } from '@/lib/prisma';

// Force dynamic execution for this route
export const dynamic = 'force-dynamic';

export async function GET() {
  // const session = await auth(); // Remove v5 call
  const session = await getServerSession(authOptions); // Restore v4 call

  if (!session?.user?.id) {
    // Not authenticated
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const userId = session.user.id;

  try {
    const userWithFavouriteIds = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        savedRecipes: {
          select: {
            id: true, // Select only the ID of each favourite recipe
          },
          // Note: Cannot order by createdAt on the relation directly
          // If order is important, fetch IDs and then sort, or adjust schema if possible
          // orderBy: { 
          //   createdAt: 'desc',
          // }
        },
      },
    });

    // If user not found or has no favourites, return empty array
    const favouriteIds = userWithFavouriteIds?.savedRecipes.map((recipe: { id: string }) => recipe.id) || []; // Corrected field name

    return NextResponse.json(favouriteIds);

  } catch (error) {
    console.error('API Error fetching favourite IDs:', error);
    return NextResponse.json({ error: 'Failed to fetch favourite recipe IDs' }, { status: 500 });
  }
}
