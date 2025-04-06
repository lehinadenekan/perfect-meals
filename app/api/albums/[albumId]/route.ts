import { NextResponse, NextRequest } from 'next/server';
// import { PrismaClient } from '@prisma/client';
// import { auth } from "@/lib/auth"; // Import auth from v5 config

// const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  context: { params: { albumId: string } }
) {
  // --- Start Simplified Code ---
  const albumId = context.params.albumId;
  // console.log("Received request for albumId:", albumId);
  return NextResponse.json({ message: "Simplified response", albumId: albumId });
  // --- End Simplified Code ---

  /* --- Start Original Code (Commented Out) ---
  // Get session using v5 auth()
  const session = await auth();
  const albumId = context.params.albumId;

  // Access user ID from v5 session object (type should be augmented)
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
          orderBy: {  },
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
  --- End Original Code --- */
}

// You might also want DELETE or PUT handlers here later to manage the album itself 