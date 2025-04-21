'use server';

import 'server-only';
import { prisma } from '@/lib/prisma'; // Use named import
import { getServerSession } from 'next-auth/next'; // Import getServerSession
import { authOptions } from '@/auth'; // Correct import path
import { z } from 'zod'; // Import Zod
import { Album, Prisma } from '@prisma/client'; // Import Album type and Prisma namespace
import { put } from '@vercel/blob'; // Import Vercel Blob upload function

// Define a type for the structure returned by the Prisma query for getRecipeImagesForAlbum
type RecipeRelation = {
  recipe: {
    imageUrl: string | null;
  };
};

/**
 * Fetches the image URLs of recipes contained within a specific album owned by the current user.
 * @param albumId The ID of the album.
 * @returns A promise that resolves to an array of recipe image URLs or throws an error.
 */
export async function getRecipeImagesForAlbum(albumId: string): Promise<string[]> {
  // Use getServerSession with authOptions to get the session
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  if (!userId) {
    throw new Error('User not authenticated');
  }

  if (!albumId) {
    throw new Error('Album ID is required');
  }

  try {
    const albumWithRecipes = await prisma.album.findUnique({
      where: {
        id: albumId,
        userId: userId, // Ensure the user owns the album
      },
      select: {
        recipes: { // Select the join table entries
          select: {
            recipe: { // Select the related recipe
              select: {
                imageUrl: true, // Select only the image URL from the recipe
              },
            },
          },
        },
      },
    });

    if (!albumWithRecipes) {
      throw new Error('Album not found or user does not have access');
    }

    // Extract image URLs, filtering out null/empty values and duplicates
    const imageUrls = albumWithRecipes.recipes
      // Add explicit type to map parameter
      .map((recipeRelation: RecipeRelation) => recipeRelation.recipe.imageUrl)
      // Add explicit type to filter parameter
      .filter((url: string | null): url is string => !!url);

    // Optional: Remove duplicate image URLs if recipes share images
    return Array.from(new Set(imageUrls));

  } catch (error) {
    console.error("Error fetching recipe images for album:", error);
    // Re-throw or return a more specific error structure
    if (error instanceof Error) {
        throw new Error(`Failed to fetch recipe images: ${error.message}`);
    }
    throw new Error('An unknown error occurred while fetching recipe images.');
  }
}


// Zod schema for updating cover with URL
const UpdateAlbumCoverUrlSchema = z.object({
  albumId: z.string().cuid({ message: 'Invalid Album ID format' }), // Use .uuid() if your IDs are UUIDs
  imageUrl: z.string().url({ message: 'Invalid image URL format' }),
});

/**
 * Updates the cover image URL for a specific album owned by the current user using a pre-existing URL.
 * @param albumId The ID of the album to update.
 * @param imageUrl The new image URL to set as the cover.
 * @returns A promise that resolves to the updated Album object or throws an error.
 */
export async function updateAlbumCoverWithUrl(
  albumId: string,
  imageUrl: string
): Promise<Album> {
  // Validate input using Zod
  const validationResult = UpdateAlbumCoverUrlSchema.safeParse({ albumId, imageUrl });
  if (!validationResult.success) {
    // Combine Zod errors into a single message
    const errorMessage = validationResult.error.errors.map((e) => e.message).join(', ');
    throw new Error(`Input validation failed: ${errorMessage}`);
  }

  // Get authenticated user session
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  if (!userId) {
    throw new Error('User not authenticated');
  }

  try {
    // Update the album, ensuring user ownership in the where clause
    const updatedAlbum = await prisma.album.update({
      where: {
        // Use validated data and ensure user owns the album
        id: validationResult.data.albumId,
        userId: userId, // CRITICAL: Ensures user owns the album
      },
      data: {
        coverImage: validationResult.data.imageUrl, // Use validated imageUrl and correct field name
      },
    });

    // Return the updated album object
    return updatedAlbum;

  } catch (error) {
    console.error("Error updating album cover URL:", error);

    // Handle specific Prisma error for record not found (covers album not found OR wrong user)
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
         throw new Error('Album not found or user does not have access.');
    }

    // Re-throw other errors
    if (error instanceof Error) {
        throw new Error(`Failed to update album cover: ${error.message}`);
    }
    throw new Error('An unknown error occurred while updating album cover.');
  }
}


// --- Start of Upload Function ---

// Zod schema for validating album ID during upload
const UploadAlbumCoverSchema = z.object({
    albumId: z.string().cuid({ message: 'Invalid Album ID format' }), // Or .uuid() / .nonempty()
});

// Define allowed image types and max size (e.g., 2MB)
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
const MAX_IMAGE_SIZE_MB = 2;
const MAX_IMAGE_SIZE_BYTES = MAX_IMAGE_SIZE_MB * 1024 * 1024;

/**
 * Handles uploading a new cover image file for a specific album owned by the current user
 * and updates the album's coverImageUrl.
 * @param albumId The ID of the album to update.
 * @param formData The FormData object containing the image file under the key 'coverImageFile'.
 * @returns A promise that resolves to the updated Album object or throws an error.
 */
export async function updateAlbumCoverWithUpload(
    albumId: string,
    formData: FormData
): Promise<Album> {

    // 1. Validate Album ID
    const albumIdValidation = UploadAlbumCoverSchema.safeParse({ albumId });
    if (!albumIdValidation.success) {
        const errorMessage = albumIdValidation.error.errors.map((e) => e.message).join(', ');
        throw new Error(`Invalid Album ID: ${errorMessage}`);
    }
    const validatedAlbumId = albumIdValidation.data.albumId;

    // 2. Authenticate User
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;
    if (!userId) {
        throw new Error('User not authenticated');
    }

    // 3. Extract and Validate File
    const file = formData.get('coverImageFile') as File; // Adjust key if needed

    if (!file) {
        throw new Error('No image file provided.');
    }
    if (!(file instanceof File)) {
        throw new Error('Invalid file data provided.');
    }
     if (!file.name || file.size === 0) {
        throw new Error('Invalid file (missing name or size).');
    }
    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
        throw new Error(`Invalid file type. Allowed types: ${ALLOWED_IMAGE_TYPES.join(', ')}`);
    }
    if (file.size > MAX_IMAGE_SIZE_BYTES) {
        throw new Error(`File size exceeds the limit of ${MAX_IMAGE_SIZE_MB}MB.`);
    }

    // 4. Upload to Vercel Blob
    let blobUrl = '';
    try {
        const fileExtension = file.name.split('.').pop() || 'png'; // Default extension if needed
        const blobPath = `albums/${validatedAlbumId}/cover-${Date.now()}.${fileExtension}`;

        const blob = await put(blobPath, file, {
            access: 'public',
            // Add cache control headers if desired, e.g., for 1 year
            // cacheControlMaxAge: 31536000,
        });
        blobUrl = blob.url; // Get the public URL

    } catch (uploadError) {
        console.error("Error uploading file to Vercel Blob:", uploadError);
        throw new Error('Failed to upload cover image.');
    }

    // 5. Update Database
    if (!blobUrl) {
         throw new Error('Failed to get URL after upload.'); // Should not happen if put() succeeds
    }

    try {
        const updatedAlbum = await prisma.album.update({
            where: {
                id: validatedAlbumId,
                userId: userId, // CRITICAL: Ensure user owns the album
            },
            data: {
                coverImage: blobUrl, // Save the Vercel Blob URL using the correct field name
            },
        });
        return updatedAlbum;

    } catch (dbError) {
        console.error("Error updating album cover URL in DB:", dbError);

        // Attempt to delete the uploaded blob if DB update fails (best effort)
        // Requires importing 'del' from '@vercel/blob'
        // try {
        //     await del(blobUrl);
        //     console.log(`Deleted orphaned blob: ${blobUrl}`);
        // } catch (deleteError) {
        //     console.error("Failed to delete orphaned blob:", deleteError);
        // }


        if (dbError instanceof Prisma.PrismaClientKnownRequestError && dbError.code === 'P2025') {
            throw new Error('Album not found or user does not have access.');
        }
        if (dbError instanceof Error) {
            throw new Error(`Failed to update database: ${dbError.message}`);
        }
        throw new Error('An unknown error occurred while updating the database.');
    }
}

// --- End of Upload Function ---

// --- Start Remove Cover Function --- 

// Zod schema for validating album ID during removal
const RemoveAlbumCoverSchema = z.object({
    albumId: z.string().cuid({ message: 'Invalid Album ID format' }),
});

/**
 * Removes the cover image URL (sets it to null) for a specific album 
 * owned by the current user.
 * 
 * @param albumId The ID of the album to update.
 * @returns A promise that resolves when the operation is complete or throws an error.
 */
export async function removeAlbumCover(albumId: string): Promise<void> {
    // 1. Validate Album ID
    const validationResult = RemoveAlbumCoverSchema.safeParse({ albumId });
    if (!validationResult.success) {
        const errorMessage = validationResult.error.errors.map((e) => e.message).join(', ');
        throw new Error(`Invalid Album ID: ${errorMessage}`);
    }
    const validatedAlbumId = validationResult.data.albumId;

    // 2. Authenticate User
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;
    if (!userId) {
        throw new Error('User not authenticated');
    }

    // 3. Update Database
    try {
        await prisma.album.update({
            where: {
                id: validatedAlbumId,
                userId: userId, // CRITICAL: Ensure user owns the album
            },
            data: {
                coverImage: null, // Set cover image to null
            },
        });
        console.log(`Removed cover image for album ${validatedAlbumId}`);

    } catch (dbError) {
        console.error("Error removing album cover URL in DB:", dbError);
        if (dbError instanceof Prisma.PrismaClientKnownRequestError && dbError.code === 'P2025') {
            // Record to update not found (could be wrong albumId or wrong user)
            throw new Error('Album not found or user does not have access.');
        }
        if (dbError instanceof Error) {
            throw new Error(`Failed to remove cover image: ${dbError.message}`);
        }
        throw new Error('An unknown error occurred while removing the cover image.');
    }
}

// --- End Remove Cover Function ---

// --- Start Rename Album Function ---

const RenameAlbumSchema = z.object({
    albumId: z.string().cuid({ message: 'Invalid Album ID format' }),
    newName: z.string().min(1, { message: 'Album name cannot be empty' }).max(100, { message: 'Album name cannot exceed 100 characters' }),
});

/**
 * Renames a specific album owned by the current user.
 * 
 * @param albumId The ID of the album to rename.
 * @param newName The new name for the album.
 * @returns A promise that resolves to the updated Album object or throws an error.
 */
export async function renameAlbum(albumId: string, newName: string): Promise<Album> {
    // 1. Validate Input
    const validationResult = RenameAlbumSchema.safeParse({ albumId, newName });
    if (!validationResult.success) {
        const errorMessage = validationResult.error.errors.map((e) => e.message).join(', ');
        throw new Error(`Input validation failed: ${errorMessage}`);
    }
    const { albumId: validatedAlbumId, newName: validatedNewName } = validationResult.data;

    // 2. Authenticate User
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;
    if (!userId) {
        throw new Error('User not authenticated');
    }

    // 3. Update Database
    try {
        const updatedAlbum = await prisma.album.update({
            where: {
                // Ensure user owns the album they are trying to update
                id: validatedAlbumId,
                userId: userId, 
            },
            data: {
                name: validatedNewName,
            },
        });
        console.log(`Renamed album ${validatedAlbumId} to "${validatedNewName}"`);
        return updatedAlbum;

    } catch (dbError) {
        console.error("Error renaming album in DB:", dbError);
        if (dbError instanceof Prisma.PrismaClientKnownRequestError) {
            // Handle unique constraint violation (duplicate name for the same user)
            if (dbError.code === 'P2002' && dbError.meta?.target === 'Album_userId_name_key') {
                 throw new Error('An album with this name already exists.');
            }
            // Handle record not found (wrong albumId or wrong user)
            if (dbError.code === 'P2025') {
                 throw new Error('Album not found or user does not have access.');
            }
        }
        // Handle other potential errors
        if (dbError instanceof Error) {
            throw new Error(`Failed to rename album: ${dbError.message}`);
        }
        throw new Error('An unknown error occurred while renaming the album.');
    }
}

// --- End Rename Album Function ---
