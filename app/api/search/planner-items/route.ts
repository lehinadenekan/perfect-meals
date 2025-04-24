import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/auth';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Type definition for the expected search result format (matches frontend)
type SearchResultItem = {
  id: string;
  name: string;
  type: 'recipe' | 'custom';
  imageUrl?: string | null;
};

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const userId = session.user.id;

  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query');

  if (!query || typeof query !== 'string' || query.trim().length === 0) {
    return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 });
  }

  try {
    // Perform searches in parallel
    const [recipeResults, customFoodResults] = await Promise.all([
      // Search public/authored recipes
      prisma.recipe.findMany({
        where: {
          title: {
            contains: query,
            mode: 'insensitive', // Case-insensitive search
          },
          // Optional: Add criteria for public recipes if needed (e.g., source: ADMIN)
        },
        select: {
          id: true,
          title: true,
          imageUrl: true,
        },
        take: 10, // Limit results
      }),
      // Search user's custom food entries
      prisma.customFoodEntry.findMany({
        where: {
          userId: userId, // Only user's own entries
          name: {
            contains: query,
            mode: 'insensitive',
          },
        },
        select: {
          id: true,
          name: true,
        },
        take: 10, // Limit results
      }),
    ]);

    // Format results into the common structure
    const formattedResults: SearchResultItem[] = [
      ...recipeResults.map((r) => ({
        id: r.id,
        name: r.title,
        type: 'recipe' as const,
        imageUrl: r.imageUrl,
      })),
      ...customFoodResults.map((c) => ({
        id: c.id,
        name: c.name,
        type: 'custom' as const,
      })),
    ];

    // Optional: Sort results (e.g., alphabetically or by relevance if available)
    formattedResults.sort((a, b) => a.name.localeCompare(b.name));

    // Optional: Limit total combined results
    const limitedResults = formattedResults.slice(0, 15);

    return NextResponse.json(limitedResults);

  } catch (error) {
    console.error('Search API Error:', error);
    return NextResponse.json({ error: 'Failed to perform search' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
} 