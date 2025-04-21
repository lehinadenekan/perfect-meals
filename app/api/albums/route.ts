import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

// Zod schema for request body validation
const createAlbumSchema = z.object({
  name: z.string().min(1, { message: "Album name cannot be empty" }).max(100, { message: "Album name too long" }),
  description: z.string().max(500, { message: "Description too long" }).optional(),
  recipeId: z.string().optional(),
});

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const albums = await prisma.album.findMany({
      where: {
        userId: session.user.id
      },
      select: {
        id: true,
        name: true,
        description: true,
        coverImage: true,
        createdAt: true,
        updatedAt: true,
        isPublic: true,
        userId: true,
        _count: {
          select: { recipes: true },
        },
        recipes: {
          orderBy: { addedAt: 'desc' },
          take: 3,
          select: {
            recipe: {
              select: {
                id: true,
                title: true,
                imageUrl: true,
              }
            }
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    const formattedAlbums = albums.map(album => ({
      ...album,
      recipeCount: album._count.recipes,
      recipePreviews: album.recipes.map(r => r.recipe)
    }));

    return NextResponse.json(formattedAlbums);
  } catch (error) {
    console.error("Error fetching albums:", error);
    return NextResponse.json({ error: 'Failed to fetch albums' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = session.user.id;
    let body;

    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }

    const validation = createAlbumSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json({ error: 'Invalid input', details: validation.error.errors }, { status: 400 });
    }

    const { name, description, recipeId } = validation.data;

    // Use transaction if recipeId is provided
    if (recipeId) {
      // Check if recipe exists (optional but good practice)
      const recipeExists = await prisma.recipe.findUnique({
        where: { id: recipeId },
        select: { id: true } // Only select id for efficiency
      });
      if (!recipeExists) {
        return NextResponse.json({ error: 'Recipe not found' }, { status: 404 });
      }
      
      const newAlbumWithRecipe = await prisma.$transaction(async (tx) => {
        const createdAlbum = await tx.album.create({
          data: {
            name,
            description,
            userId: userId,
          },
        });

        await tx.recipeToAlbum.create({
          data: {
            recipeId: recipeId,
            albumId: createdAlbum.id,
          }
        });

        return createdAlbum; // Return the created album
      });

      return NextResponse.json(newAlbumWithRecipe, { status: 201 });

    } else {
      // Original behavior: Create album without linking a recipe
      const newAlbum = await prisma.album.create({
        data: {
          name,
          description,
          userId: userId,
        },
      });
      return NextResponse.json(newAlbum, { status: 201 });
    }

  } catch (error) {
    console.error("Error creating album:", error);
    // Handle potential Prisma errors like unique constraints
    // Check if error is an object and has a 'code' property
    if (typeof error === 'object' && error !== null && 'code' in error && (error as { code?: unknown }).code === 'P2002') { 
        return NextResponse.json({ error: 'Album name already exists' }, { status: 409 }); // 409 Conflict
    }
    return NextResponse.json({ error: 'Failed to create album' }, { status: 500 });
  }
} 