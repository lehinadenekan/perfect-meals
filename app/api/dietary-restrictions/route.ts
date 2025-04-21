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
    const userPreferences = await prisma.userPreference.findUnique({
      where: {
        userEmail: userEmail, // Use email from session
      },
      select: {
        dietTypes: true, // Select only the dietTypes field
      },
    });

    // Return the array of dietTypes or an empty array if no preferences found
    return NextResponse.json(userPreferences?.dietTypes || []);
  } catch (error) {
    console.error('Error fetching dietary restrictions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dietary restrictions' },
      { status: 500 }
    );
  }
}

// Consider defining this type more globally if used elsewhere
// Also, these seem more like diet types than restrictions based on the DB field name
// type DietaryRestriction =
//   | 'vegetarian'
//   | 'vegan'
//   | 'gluten-free'
//   | 'dairy-free' // Note: dairy-free might not be directly in your DIET_TYPES enum
//   | 'kosher'     // Note: kosher might not be directly in your DIET_TYPES enum
//   | 'halal'      // Note: halal might not be directly in your DIET_TYPES enum
//   | 'low-carb';   // Note: low-carb might not be directly in your DIET_TYPES enum

// Suggestion: Use string[] to align with other parts, unless strict validation against DIET_TYPES is needed
// type DietaryRestrictionInput = { restrictions: string[] }; // More flexible
type DietaryRestrictionInput = { restrictions: string[] }; // Changed type to string[]

export async function PUT(request: Request) {
  // Replace v5 call: const session = await auth();
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email; // Get email from v4 session

  if (!userEmail) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Add validation for the request body (e.g., using Zod)
    const data = await request.json();
    // Validate the received data shape and type
    const { restrictions } = data as DietaryRestrictionInput;

    if (!Array.isArray(restrictions)) {
      return NextResponse.json({ error: 'Invalid input: restrictions must be an array' }, { status: 400 });
    }
    // Optional: Validate each string against your known DIET_TYPES enum/object keys if needed

    // Prepare the data for the 'dietTypes' field in UserPreference model
    const updateData = {
      dietTypes: restrictions, // Store the array of strings directly
    };

    // Use upsert to create or update the user's preferences
    const updatedPreferences = await prisma.userPreference.upsert({
      where: {
        userEmail: userEmail, // Use email as the unique identifier
      },
      update: updateData, // Update the dietTypes field
      create: {
        userEmail: userEmail,
        // Add default values for other required fields if not provided
        cookingTime: 'MEDIUM', // Example default
        mealPrep: false,      // Example default
        servingSize: 2,       // Example default
        ...updateData,        // Include the dietTypes from the request
      },
      select: { dietTypes: true } // Select only the updated field to return
    });

    // Return only the updated restrictions array
    return NextResponse.json(updatedPreferences.dietTypes);
  } catch (error) {
    console.error('Error updating dietary restrictions:', error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { error: `Failed to update dietary restrictions: ${errorMessage}` },
      { status: 500 }
    );
  }
}