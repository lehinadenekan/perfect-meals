import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import prisma from '@/lib/prisma';
import { z } from 'zod';

// Zod schema for request body validation
const createAlbumSchema = z.object({
  name: z.string().min(1, { message: "Album name cannot be empty" }).max(100, { message: "Album name too long" }),
  description: z.string().max(500, { message: "Description too long" }).optional(),
});

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const albums = await prisma.album.findMany({
      where: {
        userId: session.user.id
      },
      include: {
        recipes: {
          include: {
            recipe: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(albums);
  } catch (error) {
    console.error("Error fetching albums:", error);
    return NextResponse.json({ error: 'Failed to fetch albums' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth();
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

    const { name, description } = validation.data;

    const newAlbum = await prisma.album.create({
      data: {
        name,
        description,
        userId: userId,
      },
    });

    return NextResponse.json(newAlbum, { status: 201 }); // 201 Created

  } catch (error) {
    console.error("Error creating album:", error);
    // Consider more specific error handling (e.g., Prisma unique constraint violation)
    return NextResponse.json({ error: 'Failed to create album' }, { status: 500 });
  }
} 