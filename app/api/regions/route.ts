import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export async function GET(_request: Request) {
  try {
    // Fetch only top-level continents
    const continents = await prisma.region.findMany({
      where: {
        type: 'CONTINENT',
      },
      orderBy: {
        name: 'asc',
      },
      include: {
        childCountries: { // These should be the SUB_REGIONs parented by the CONTINENT
          orderBy: { name: 'asc' },
          // Temporarily removed: where: { type: 'SUB_REGION' }, to see if any children are fetched
          include: {
            childCountries: { // These are the COUNTRYs parented by the SUB_REGION
              where: { type: 'COUNTRY' }, // Filter to ensure these are indeed countries
              orderBy: { name: 'asc' },
            },
          },
        },
      },
    });
    return NextResponse.json(continents);
  } catch (error) {
    console.error('Failed to fetch regions:', error);
    let errorMessage = 'Failed to fetch regions';
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // Handle known Prisma errors
      errorMessage = `Database error: ${error.message}`;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
} 