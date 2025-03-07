import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const dietTypes = searchParams.get('dietTypes')?.split(',') || [];
    const excludedFoods = searchParams.get('excludedFoods')?.split(',') || [];

    // Build the where clause based on dietary preferences
    const where: any = {
      AND: [
        // Match dietary preferences
        {
          OR: [
            ...dietTypes.map(diet => {
              switch (diet) {
                case 'vegetarian':
                  return { isVegetarian: true };
                case 'vegan':
                  return { isVegan: true };
                case 'gluten-free':
                  return { isGlutenFree: true };
                case 'dairy-free':
                  return { isDairyFree: true };
                default:
                  return {};
              }
            }),
          ],
        },
        // Exclude recipes with excluded ingredients
        {
          NOT: {
            ingredients: {
              some: {
                name: {
                  in: excludedFoods,
                },
              },
            },
          },
        },
      ],
    };

    // If no diet types are selected, remove the dietary preferences filter
    if (dietTypes.length === 0) {
      where.AND = where.AND.filter((clause: any) => !clause.OR);
    }

    const recipes = await prisma.recipe.findMany({
      where,
      include: {
        ingredients: true,
        nutritionFacts: true,
        reviews: {
          select: {
            rating: true,
          },
        },
      },
      take: 20, // Limit to 20 recipes
      orderBy: {
        averageRating: 'desc', // Sort by rating
      },
    });

    // Calculate average rating for each recipe
    const recipesWithRating = recipes.map(recipe => ({
      ...recipe,
      averageRating: recipe.reviews.length > 0
        ? recipe.reviews.reduce((acc, review) => acc + review.rating, 0) / recipe.reviews.length
        : null,
      totalReviews: recipe.reviews.length,
      reviews: undefined, // Remove raw reviews from response
    }));

    return NextResponse.json(recipesWithRating);
  } catch (error) {
    console.error('Error fetching recipes:', error);
    return NextResponse.json(
      { error: 'Failed to fetch recipes' },
      { status: 500 }
    );
  }
} 