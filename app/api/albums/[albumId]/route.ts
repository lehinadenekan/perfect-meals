import { NextResponse } from 'next/server';
// Remove unused NextRequest
// import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma'; // Use shared prisma instance
// Use correct import for getServerSession
import { getServerSession } from 'next-auth/next'; // Restore v4 import
import { authOptions } from '@/auth'; // Correct path
// import { auth } from '@/auth'; // Remove v5 import
// Zod for validation
import { z } from 'zod';

// Use correct Session type from next-auth if needed for augmentation
// import type { Session } from 'next-auth';

// No need to instantiate PrismaClient here if using shared instance from lib
// const prisma = new PrismaClient();

// Define params structure expected from the route
interface RouteContext {
  params: {
    albumId: string;
  };
}

// Zod schema for PATCH request validation (only description)
const updateAlbumSchema = z.object({
    // Allow description to be null or string (max length optional)
    description: z.string().max(500, { message: "Description cannot exceed 500 characters." }).nullable().optional(),
});

// Existing GET handler (simplified for brevity, assuming it works)
export async function GET(
  _request: Request, // Use Request, mark as unused
  { params }: RouteContext
) {
  const session = await getServerSession(authOptions); // Restore v4 call
  // const session = await auth(); // Remove v5 call
  const { albumId } = params;
  const _userId = session?.user?.id;

  if (!albumId) {
    return NextResponse.json({ error: 'Album ID is required' }, { status: 400 });
  }

  try {
    const album = await prisma.album.findUnique({
      where: { id: albumId },
      include: {
        recipes: {
          include: {
            recipe: true, // Fetch base recipe data
          },
        },
      },
    });

    if (!album) {
      return NextResponse.json({ error: 'Album not found' }, { status: 404 });
    }

    // Basic ownership check or public access logic could go here if needed
    // For now, assume public read or ownership check is handled differently

    // Example simplified response (adapt as needed for favourite status etc.)
    return NextResponse.json(album);

  } catch (error) {
    console.error("Error fetching album details:", error);
    return NextResponse.json({ error: 'Failed to fetch album details' }, { status: 500 });
  }
}


// --- PATCH Handler for Updating Description --- 
export async function PATCH(request: Request, { params }: RouteContext) {
  const session = await getServerSession(authOptions); // Restore v4 call
  // const session = await auth(); // Remove v5 call
  const { albumId } = params;

  // 1. Check Authentication
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const userId = session.user.id;

  // 2. Validate Input
  if (!albumId) {
    return NextResponse.json({ error: 'Album ID is required' }, { status: 400 });
  }

  let validatedData: { description?: string | null };
  try {
    const body = await request.json();
    const validation = updateAlbumSchema.safeParse(body);
    if (!validation.success) {
        return NextResponse.json({ error: validation.error.errors[0].message }, { status: 400 });
    }
    // We only care about the description field for this PATCH
    validatedData = { description: validation.data.description };
  } catch (_e) {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  try {
    // 3. Verify Ownership
    const album = await prisma.album.findUnique({
      where: { id: albumId },
      select: { userId: true }, // Only fetch userId to check ownership
    });

    if (!album) {
      return NextResponse.json({ error: 'Album not found' }, { status: 404 });
    }

    if (album.userId !== userId) {
      // User does not own this album
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // 4. Update Album
    const updatedAlbum = await prisma.album.update({
      where: {
        id: albumId,
        // Redundant check, but ensures we only update owned albums
        userId: userId,
      },
      data: {
        // Update description (handles null correctly if sent)
        description: validatedData.description,
      },
    });

    // 5. Return Success Response
    return NextResponse.json(updatedAlbum, { status: 200 });

  } catch (error) {
    console.error(`Error updating album ${albumId}:`, error);
    // Handle potential Prisma errors or other unexpected issues
    return NextResponse.json({ error: 'Failed to update album description' }, { status: 500 });
  }
}

// --- Optional: DELETE Handler --- 
export async function DELETE(_request: Request, { params }: RouteContext) {
    const session = await getServerSession(authOptions); // Restore v4 call
    // const session = await auth(); // Remove v5 call
    const { albumId } = params;

    // 1. Check Authentication
    if (!session?.user?.id) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const userId = session.user.id;

    // 2. Validate Input
    if (!albumId) {
        return NextResponse.json({ error: 'Album ID is required' }, { status: 400 });
    }

    try {
        // 3. Verify Ownership before deleting
        const album = await prisma.album.findUnique({
            where: { id: albumId },
            select: { userId: true },
        });

        if (!album) {
            // If not found, arguably deletion is successful (idempotent)
            // Alternatively, return 404
            return NextResponse.json({ message: 'Album not found' }, { status: 404 });
        }

        if (album.userId !== userId) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        // 4. Delete Album (Prisma handles cascading deletes based on schema)
        await prisma.album.delete({
            where: {
                id: albumId,
                userId: userId, // Ensure only owned album is deleted
            },
        });

        // 5. Return Success Response
        return NextResponse.json({ message: 'Album deleted successfully' }, { status: 200 }); // Or 204 No Content

    } catch (error) {
        console.error(`Error deleting album ${albumId}:`, error);
        return NextResponse.json({ error: 'Failed to delete album' }, { status: 500 });
    }
} 