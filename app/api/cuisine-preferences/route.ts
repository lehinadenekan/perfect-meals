import { NextResponse } from 'next/server';
// Remove v5 import: import { auth } from '@/auth';
// Add v4 imports:
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/auth';
import { prisma } from '@/lib/prisma';

// Force dynamic rendering, disable static generation
export const dynamic = 'force-dynamic';

export async function GET() {
  // Replace v5 call: const session = await auth();
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email; // Get email from v4 session

  if (!userEmail) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const userCuisinePreferences = await prisma.userCuisinePreference.findMany({
      where: {
        userEmail: userEmail, // Use email from session
      },
      include: {
        cuisine: true, // Include related cuisine data
      },
    });

    return NextResponse.json(userCuisinePreferences);
  } catch (error) {
    console.error('Error fetching cuisine preferences:', error);
    return NextResponse.json(
      { error: 'Failed to fetch cuisine preferences' },
      { status: 500 }
    );
  }
}

interface CuisinePreferenceInput {
  cuisineId: string;
  level: 'love' | 'like' | 'neutral' | 'dislike'; // Consider using an enum if levels are fixed
}

export async function PUT(request: Request) {
  // Replace v5 call: const session = await auth();
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email; // Get email from v4 session

  if (!userEmail) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Validate the request body structure if needed (e.g., using Zod)
    const data = await request.json();
    const { preferences } = data as { preferences: CuisinePreferenceInput[] };

    if (!Array.isArray(preferences)) {
        return NextResponse.json({ error: 'Invalid input: preferences must be an array' }, { status: 400 });
    }

    // Use a transaction to ensure atomicity (delete old and create new)
    const createdPreferences = await prisma.$transaction(async (tx) => {
        // Delete existing preferences for this user
        await tx.userCuisinePreference.deleteMany({
          where: {
            userEmail: userEmail,
          },
        });

        // Validate and prepare new preferences data
        const preferencesToCreate = [];
        for (const pref of preferences) {
            // Add more validation for pref.level if needed
            if (!pref.cuisineId || !pref.level) {
                throw new Error('Invalid preference item: cuisineId and level are required.');
            }
            // Ensure the cuisine exists before attempting to create preference
            const cuisine = await tx.cuisine.findUnique({
               where: { id: pref.cuisineId },
               select: { id: true } // Only select ID for existence check
            });

            if (!cuisine) {
               throw new Error(`Cuisine with ID ${pref.cuisineId} not found`);
            }
            preferencesToCreate.push({
                userEmail: userEmail,
                cuisineId: pref.cuisineId,
                preferenceLevel: pref.level,
            });
        }

         // Bulk create new preferences if there are any
         if (preferencesToCreate.length > 0) {
            await tx.userCuisinePreference.createMany({
                data: preferencesToCreate,
            });
         }

        // Return the newly created preferences with included cuisine data
        // Need to fetch them again after createMany
        return tx.userCuisinePreference.findMany({
            where: { userEmail: userEmail },
            include: { cuisine: true },
        });
    });


    return NextResponse.json(createdPreferences);
  } catch (error) {
    console.error('Error updating cuisine preferences:', error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    // Provide more specific error response if possible (e.g., bad request vs server error)
    return NextResponse.json(
      { error: `Failed to update cuisine preferences: ${errorMessage}` },
      { status: 500 } // Consider 400 for validation errors caught in the try block
    );
  }
}