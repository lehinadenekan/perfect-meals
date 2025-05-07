import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

const MAX_SUGGESTIONS = 7; // Limit the number of suggestions

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query');

    if (!query || query.trim().length < 1) { // Require at least 1 character
      return NextResponse.json([], { status: 200 }); // Return empty array if query is too short
    }

    const suggestions = await prisma.recipe.findMany({
      where: {
        title: {
          contains: query,
          mode: 'insensitive', // Case-insensitive search
        },
        // Optionally add more filters, e.g., only show ADMIN recipes
        // source: 'ADMIN',
      },
      select: {
        id: true,
        title: true,
      },
      take: MAX_SUGGESTIONS, // Limit the number of results
      orderBy: {
        // Optional: Sort results, e.g., by title or relevance if using full-text search later
        title: 'asc',
      },
    });

    return NextResponse.json(suggestions);

  } catch (error) {
    console.error('Error fetching search suggestions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch search suggestions' }, 
      { status: 500 }
    );
  }
} 