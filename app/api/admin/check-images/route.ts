import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
// Remove v5 import: import { auth } from '@/auth';
// Add v4 imports:
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/auth';

// Force dynamic rendering, disable static generation
export const dynamic = 'force-dynamic';

// Helper function to safely convert BigInt to Number
function safeNumber(value: unknown): number {
  if (typeof value === 'bigint') {
    return Number(value);
  }
  if (typeof value === 'number') {
    return value;
  }
  return 0;
}

export async function GET() {
  try {
    // Check authentication using v4 pattern
    // Replace v5 call: const session = await auth();
    const session = await getServerSession(authOptions);

    // Check user email from v4 session
    const userEmail = session?.user?.email;
    if (!userEmail) {
      return NextResponse.json({ error: 'Unauthorized - No user email found' }, { status: 401 });
    }

    // Add your admin check logic here if needed (e.g., checking against a list)
    // const isAdmin = userEmail && process.env.ADMIN_EMAILS?.split(',').includes(userEmail);
    // if (!isAdmin) {
    //   return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    // }

    // Count all recipes
    const totalRecipes = await prisma.recipe.count();

    // Count recipes with no image
    const recipesWithNoImage = await prisma.recipe.count({
      where: {
        OR: [
          { imageUrl: null },
          { imageUrl: '' }
        ]
      }
    });

    // Count recipes with local images
    const recipesWithLocalImages = await prisma.recipe.count({
      where: {
        imageUrl: {
          startsWith: '/recipe-images/'
        }
      }
    });

    // Count recipes with placeholder images
    const recipesWithPlaceholder = await prisma.recipe.count({
      where: {
        imageUrl: {
          startsWith: '/placeholder'
        }
      }
    });

    // Count recipes with external images
    const recipesWithExternalImages = await prisma.recipe.count({
      where: {
        imageUrl: {
          startsWith: 'http'
        }
      }
    });

    // Get a sample of external image URLs
    const externalImageSamples = await prisma.recipe.findMany({
      where: {
        imageUrl: {
          startsWith: 'http'
        }
      },
      select: {
        id: true,
        title: true,
        imageUrl: true
      },
      take: 10
    });

    // Get a sample of all image URLs by pattern
    const rawImagePatterns = await prisma.$queryRaw`
      SELECT
        CASE
          WHEN "imageUrl" IS NULL OR "imageUrl" = '' THEN 'No image'
          WHEN "imageUrl" LIKE '/recipe-images/%' THEN 'Local image'
          WHEN "imageUrl" LIKE '/placeholder%' THEN 'Placeholder'
          WHEN "imageUrl" LIKE 'http%' THEN 'External image'
          ELSE 'Other'
        END AS image_type,
        COUNT(*) as count
      FROM "Recipe"
      GROUP BY image_type
    `;

    // Convert any BigInt values to regular numbers
    const allImagePatterns = Array.isArray(rawImagePatterns)
      ? rawImagePatterns.map(pattern => ({
        ...pattern,
        count: safeNumber(pattern.count)
      }))
      : [];

    return NextResponse.json({
      stats: {
        totalRecipes: safeNumber(totalRecipes),
        recipesWithNoImage: safeNumber(recipesWithNoImage),
        recipesWithLocalImages: safeNumber(recipesWithLocalImages),
        recipesWithPlaceholder: safeNumber(recipesWithPlaceholder),
        recipesWithExternalImages: safeNumber(recipesWithExternalImages),
        unknown: safeNumber(totalRecipes - recipesWithNoImage - recipesWithLocalImages - recipesWithPlaceholder - recipesWithExternalImages)
      },
      externalImageSamples,
      allImagePatterns
    });
  } catch (error) {
    console.error('Error checking images:', error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: `Failed to check images: ${errorMessage}` }, { status: 500 });
  }
}