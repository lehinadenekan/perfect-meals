import { NextResponse } from 'next/server';
import { auth } from '@/auth'; // Import auth function
import { prisma } from '@/lib/prisma'; // Import Prisma client

export async function GET(request: Request) {
  let session;
  try {
    session = await auth(); // Fetch the session server-side
  } catch (error) {
    console.error('[API /api/recipes/user] Error fetching session:', error);
    return NextResponse.json({ error: 'Authentication check failed' }, { status: 500 });
  }

  // 1. Strict Session Check: Ensure user is authenticated
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const userId = session.user.id;

  try {
    // 2. Query Database: Fetch recipes where authorId matches the session user ID
    //    Verify 'authorId' is the correct field name in your schema
    const userRecipes = await prisma.recipe.findMany({
      where: {
        authorId: userId, // Use the verified user ID from the session
      },
      // Optional: Select only necessary fields if known
      // select: { id: true, title: true, imageUrl: true, /* ... other needed fields */ }
      orderBy: {
        createdAt: 'desc', // Optional: Order by creation date or title
      },
    });

    // 3. Return Data: Send back the fetched recipes (or empty array if none found)
    return NextResponse.json(userRecipes);

  } catch (error) {
    // 4. Error Handling: Log internal errors and return a generic 500 response
    console.error(`[API /api/recipes/user] Error fetching recipes for user ${userId}:`, error);
    return NextResponse.json({ error: 'Failed to fetch user recipes' }, { status: 500 });
  }
} 