import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/auth';
import { z } from 'zod';
import { Prisma } from '@prisma/client';

const UpdateNotesSchema = z.object({
  date: z.coerce.date(), // Expect YYYY-MM-DD string, coerce to Date
  notes: z.string().nullable().optional(), // Allow null or empty string for notes
});

// PUT /api/planner/day/notes
export async function PUT(request: Request) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  if (!userId) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const validationResult = UpdateNotesSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        { message: 'Invalid request body', errors: validationResult.error.errors },
        { status: 400 }
      );
    }

    const { date, notes } = validationResult.data;
    const targetDate = new Date(date.getFullYear(), date.getMonth(), date.getDate()); // Ensure only date part is used

    // Update the notes for the specific PlannerDay belonging to the user
    // Use upsert to handle cases where the day might not exist yet (e.g., user added notes before adding a meal)
    const updatedDay = await prisma.plannerDay.upsert({
        where: {
            userId_date: {
                userId: userId,
                date: targetDate,
            },
        },
        update: {
            notes: notes, // Update notes field
        },
        create: {
            userId: userId,
            date: targetDate,
            notes: notes, // Set notes on creation
        },
        select: { // Select only necessary fields for response
            id: true,
            date: true,
            notes: true,
        }
    });

    // It should ideally always find or create a day, but check just in case
    if (!updatedDay) {
      // This case is less likely with upsert but good practice
      return NextResponse.json({ message: 'Planner day not found for the given date.' }, { status: 404 });
    }

    return NextResponse.json(updatedDay);

  } catch (error) {
    console.error('Failed to update planner day notes:', error);
     if (error instanceof Prisma.PrismaClientKnownRequestError) {
         // Handle potential known errors if needed
     }
    return NextResponse.json({ message: 'An unexpected error occurred while updating notes.' }, { status: 500 });
  }
} 