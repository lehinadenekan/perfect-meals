import { NextResponse } from 'next/server';
// Remove v5 import: import { auth } from '@/auth';
// Add v4 imports:
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/auth';
import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';

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
      // Consider selecting specific fields if not all are needed
      // select: { dietTypes: true, excludedFoods: true, ... }
    });

    // Return default preferences structure if none exist for the user
    // Ensure the default object structure matches the expected full UserPreference type
    const defaults = {
      // id: '', // ID is usually generated, don't include unless needed
      userEmail: userEmail, // Include userEmail in default response
      dietTypes: [],
      excludedFoods: [],
      // selectedRegions: [], // This field isn't in the UserPreference schema
      // searchInput: '',    // This field isn't in the UserPreference schema
      cookingTime: 'MEDIUM',
      servingSize: 2,
      mealPrep: false
    };

    return NextResponse.json(userPreferences || defaults);
  } catch (error) {
    console.error('Error fetching user preferences:', error);
    return NextResponse.json(
      { error: 'Failed to fetch preferences' },
      { status: 500 }
    );
  }
}

// Define expected input type for validation (adjust based on actual requirements)
interface UpdatePreferencesInput {
    cookingTime?: 'SHORT' | 'MEDIUM' | 'LONG'; // Use enum/literal types if possible
    servingSize?: number;
    mealPrep?: boolean;
    dietTypes?: string[];
    excludedFoods?: string[];
}


export async function PUT(request: Request) {
  // Replace v5 call: const session = await auth();
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email; // Get email from v4 session

  if (!userEmail) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Add validation for the request body (e.g., using Zod)
    const data = await request.json() as UpdatePreferencesInput;

    // Validate input data types and values here if necessary

    // Use the correct Prisma type for the update payload
    const updatePayload: Prisma.UserPreferenceUpdateInput = {}; // Changed 'any' to specific Prisma type
    if (data.cookingTime !== undefined) updatePayload.cookingTime = data.cookingTime;
    if (data.servingSize !== undefined) updatePayload.servingSize = data.servingSize;
    if (data.mealPrep !== undefined) updatePayload.mealPrep = data.mealPrep;
    if (data.dietTypes !== undefined) updatePayload.dietTypes = { set: data.dietTypes || [] };
    if (data.excludedFoods !== undefined) updatePayload.excludedFoods = { set: data.excludedFoods || [] };

    // Construct create data, providing defaults for missing fields
    const createPayload = {
        userEmail: userEmail,
        cookingTime: data.cookingTime || 'MEDIUM',
        servingSize: data.servingSize || 2,
        mealPrep: data.mealPrep !== undefined ? data.mealPrep : false, // Handle boolean default explicitly
        dietTypes: data.dietTypes || [],
        excludedFoods: data.excludedFoods || [],
    };

    const updatedPreferences = await prisma.userPreference.upsert({
      where: {
        userEmail: userEmail, // Use email as the unique identifier
      },
      update: updatePayload,
      create: createPayload
    });

    return NextResponse.json(updatedPreferences);
  } catch (error) {
    console.error('Error updating user preferences:', error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { error: `Failed to update preferences: ${errorMessage}` },
      { status: 500 } // Consider 400 for validation errors
    );
  }
}