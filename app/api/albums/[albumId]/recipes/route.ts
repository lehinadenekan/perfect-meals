import { NextRequest, NextResponse } from 'next/server';
// import { auth } from '@/auth'; // Remove incorrect import
import { getServerSession } from 'next-auth/next'; // Add correct import
import { authOptions } from '@/lib/auth'; // Add correct import
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const addRecipeSchema = z.object({
  recipeId: z.string(),
});

export async function POST(
  request: NextRequest, // First argument is the Request
  // @ts-expect-error // Use this instead of @ts-ignore
  { params } // No type annotation here
) {
  // Assert the type of params when accessing albumId
  const albumId = (params as { albumId: string }).albumId;

  let body: { recipeId?: string } = {}; // Declare body with a more specific type
  try {
    // Use getServerSession(authOptions)
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = session.user.id;

    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }

    const validation = addRecipeSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json({ error: 'Invalid input', details: validation.error.errors }, { status: 400 });
    }

    const { recipeId } = validation.data;

    // 1. Verify the album exists and belongs to the user
    const album = await prisma.album.findUnique({
      where: {
        id: albumId,
        userId: userId, // Ensure the album belongs to the logged-in user
      },
      select: { id: true } // Only need to know if it exists
    });

    if (!album) {
      return NextResponse.json({ error: 'Album not found or access denied' }, { status: 404 });
    }

    // 2. Verify the recipe exists (optional but good practice)
    const recipeExists = await prisma.recipe.findUnique({
      where: { id: recipeId },
      select: { id: true }
    });

    if (!recipeExists) {
      return NextResponse.json({ error: 'Recipe not found' }, { status: 404 });
    }

    // 3. Create the link in RecipeToAlbum
    // Use upsert to handle potential duplicate additions gracefully (optional)
    // If you want to prevent duplicates, use create and handle the P2002 error
    const recipeToAlbum = await prisma.recipeToAlbum.upsert({
        where: {
            albumId_recipeId: { 
                albumId: albumId,
                recipeId: recipeId,
            }
        },
        update: {}, // No update needed if it exists
        create: {
            recipeId: recipeId,
            albumId: albumId,
        }
    });

    // Alternative using create (will throw error on duplicate):
    // try {
    //   const recipeToAlbum = await prisma.recipeToAlbum.create({
    //     data: {
    //       recipeId: recipeId,
    //       albumId: albumId,
    //     },
    //   });
    // } catch (error) {
    //   if (error.code === 'P2002') {
    //     // Already exists, maybe return 200 OK or 204 No Content instead of error?
    //     return NextResponse.json({ message: 'Recipe already in album' }, { status: 200 });
    //   }
    //   // Re-throw other errors
    //   throw error;
    // }

    return NextResponse.json(recipeToAlbum, { status: 201 }); // 201 Created (or 200 if using upsert/handling P2002)

  } catch (error) {
    // Now body is accessible here
    console.error(`Error adding recipe ${body?.recipeId ?? '(unknown recipe)'} to album ${(params as { albumId: string }).albumId}:`, error);
    return NextResponse.json({ error: 'Failed to add recipe to album' }, { status: 500 });
  }
} 