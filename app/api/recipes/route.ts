import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import spoonacularService from '@/app/services/spoonacularService';
import { Recipe, Prisma } from '@prisma/client';

type RecipeWithRelations = Prisma.RecipeGetPayload<{
  include: {
    ingredients: true;
    nutritionFacts: true;
    reviews: {
      select: {
        rating: true;
      };
    };
  };
}>;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const dietTypes = searchParams.get('dietTypes')?.split(',') || [];
    const excludedFoods = searchParams.get('excludedFoods')?.split(',') || [];
    
    // Get user session to fetch their preferences
    const session = await getServerSession(authOptions);
    let userPreferences = null;
    let cuisinePreferences = null;

    if (session?.user?.email) {
      // Fetch user preferences
      userPreferences = await prisma.userPreference.findUnique({
        where: { userEmail: session.user.email },
      });
      
      // Fetch cuisine preferences
      cuisinePreferences = await prisma.userCuisinePreference.findMany({
        where: { userEmail: session.user.email },
      });
    }

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

    // If user has preferences, add them to the query
    if (userPreferences) {
      // Add cooking time preference
      if (userPreferences.cookingTime === 'QUICK') {
        where.AND.push({ cookingTime: { lte: 30 } });
      } else if (userPreferences.cookingTime === 'MEDIUM') {
        where.AND.push({ cookingTime: { lte: 60 } });
      }
    }

    // If no diet types are selected, remove the dietary preferences filter
    if (dietTypes.length === 0) {
      where.AND = where.AND.filter((clause: any) => !clause.OR);
    }

    // Fetch recipes with preferences
    let recipes = await prisma.recipe.findMany({
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
      take: 20, // Reduced initial fetch
    });

    // If we don't have enough recipes, fetch more from Spoonacular
    if (recipes.length < 10) {
      const spoonacularParams: any = {
        number: 10 - recipes.length,
      };

      // Map diet types to Spoonacular format
      if (dietTypes.length > 0) {
        spoonacularParams.diet = dietTypes.join(',');
      }

      // Map excluded foods
      if (excludedFoods.length > 0) {
        spoonacularParams.intolerances = excludedFoods.join(',');
      }

      // Add cuisine preferences if available
      if (cuisinePreferences && cuisinePreferences.length > 0) {
        const preferredCuisines = cuisinePreferences
          .filter(cp => cp.preferenceLevel === 'LOVE' || cp.preferenceLevel === 'LIKE')
          .map(cp => cp.cuisineId)
          .join(',');
        
        if (preferredCuisines) {
          spoonacularParams.cuisine = preferredCuisines;
        }
      }

      try {
        const spoonacularRecipes = await spoonacularService.searchRecipes(spoonacularParams);
        const spoonacularRecipesWithRelations = spoonacularRecipes.map(recipe => ({
          ...recipe,
          ingredients: [],
          nutritionFacts: null,
          reviews: [],
        })) as RecipeWithRelations[];
        
        recipes = [...recipes, ...spoonacularRecipesWithRelations];
      } catch (error) {
        console.error('Error fetching from Spoonacular:', error);
        // Continue with existing recipes if Spoonacular fails
      }
    }

    // Apply smart selection algorithm
    if (recipes.length > 0) {
      // Calculate recipe scores based on various factors
      const scoredRecipes = recipes.map(recipe => {
        let score = 0;

        // Base score from rating
        score += (recipe.averageRating || 3) * 10;

        // Boost score based on cuisine preferences
        if (cuisinePreferences && cuisinePreferences.length > 0) {
          const cuisinePref = cuisinePreferences.find(cp => cp.cuisineId === recipe.cuisineType);
          if (cuisinePref) {
            switch (cuisinePref.preferenceLevel) {
              case 'LOVE': score += 30; break;
              case 'LIKE': score += 20; break;
              case 'NEUTRAL': score += 10; break;
              case 'DISLIKE': score -= 20; break;
            }
          }
        }

        // Boost score for variety in meal types
        const mealTypes = ['BREAKFAST', 'LUNCH', 'DINNER', 'SNACK'];
        const mealTypeIndex = mealTypes.indexOf(recipe.type || '');
        if (mealTypeIndex !== -1) {
          score += 10; // Boost for having a defined meal type
        }

        return { ...recipe, score };
      });

      // Sort by score
      recipes = scoredRecipes.sort((a, b) => b.score - a.score);
    }

    // Calculate average rating for each recipe
    const recipesWithRating = recipes.map(recipe => ({
      ...recipe,
      averageRating: recipe.reviews?.length > 0
        ? recipe.reviews.reduce((acc, review) => acc + review.rating, 0) / recipe.reviews.length
        : null,
      totalReviews: recipe.reviews?.length || 0,
      reviews: undefined, // Remove raw reviews from response
      score: undefined, // Remove score from response
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