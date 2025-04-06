import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import getServerSession from 'next-auth';
import { authOptions } from '@/lib/auth';
// Import Session type from next-auth if not already implicitly available through augmentation
import type { Session } from 'next-auth';

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: { albumId: string } }
) {
  // Pass authOptions and assert Session type via unknown
  const session = await getServerSession(authOptions) as unknown as Session | null;
  const albumId = params.albumId;

  // Access userId via the asserted Session type
  const userId = session?.user?.id;

  if (!albumId) {
    return NextResponse.json({ error: 'Album ID is required' }, { status: 400 });
  }

  try {
    // Fetch album including full recipe details
    const album = await prisma.album.findUnique({
      where: { id: albumId },
      include: {
        recipes: {
          orderBy: { /* Optional ordering */ },
          include: {
            recipe: { // Actual Recipe
              include: {
                ingredients: true,
                instructions: true,
              },
            },
          },
        },
      },
    });

    if (!album) {
      return NextResponse.json({ error: 'Album not found' }, { status: 404 });
    }

    // If user is logged in, determine favorite status
    let recipesWithFavoriteStatus = album.recipes;
    if (userId) {
      const userWithFavorites = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          savedRecipes: {
            where: {
              id: { in: album.recipes.map(rta => rta.recipeId) }
            },
            select: {
              id: true
            }
          }
        }
      });
      const favoriteRecipeIds = new Set(userWithFavorites?.savedRecipes?.map((recipe: { id: string }) => recipe.id) ?? []);

      // Correct Mapping: Preserve existing recipe object (with relations) and add isFavorite
      recipesWithFavoriteStatus = album.recipes.map(rta => ({
        ...rta, // Keep the RecipeToAlbum fields
        recipe: {
          ...rta.recipe, // Keep the original recipe fields (incl. ingredients/instructions)
          isFavorite: favoriteRecipeIds.has(rta.recipeId), // Add/overwrite isFavorite
        },
      }));
    } else {
      // Correct Mapping: Preserve existing recipe object and set isFavorite to false
      recipesWithFavoriteStatus = album.recipes.map(rta => ({
        ...rta,
        recipe: {
          ...rta.recipe,
          isFavorite: false,
        },
      }));
    }

    // Return the album with correctly mapped recipe data
    return NextResponse.json({ ...album, recipes: recipesWithFavoriteStatus });

  } catch (error) {
    console.error("Error fetching album details:", error);
    return NextResponse.json({ error: 'Failed to fetch album details' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

// You might also want DELETE or PUT handlers here later to manage the album itself 