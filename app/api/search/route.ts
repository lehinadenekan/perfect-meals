import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query');

  if (!query) {
    return NextResponse.json([]);
  }

  // Get singular and plural forms
  const searchTerms = [query];
  if (query.endsWith('s')) {
    // If plural, add singular
    searchTerms.push(query.slice(0, -1));
  } else {
    // If singular, add plural
    searchTerms.push(`${query}s`);
  }

  // First fetch potential matches using contains
  const recipes = await prisma.recipe.findMany({
    where: {
      OR: [
        { title: { contains: query, mode: 'insensitive' } },
        { description: { contains: query, mode: 'insensitive' } },
        { ingredients: { some: { name: { contains: query, mode: 'insensitive' } } } }
      ]
    },
    include: {
      ingredients: true,
      instructions: true,
      nutritionFacts: true,
      categories: true,
      cuisine: true,
    },
    orderBy: {
      title: 'asc'
    },
    take: 50 // Fetch more to filter down afterward
  });

  // Post-process to filter for word boundaries
  const filteredRecipes = recipes.filter((recipe: typeof recipes[0]) => {
    // Check if any searchTerm appears as a whole word in title
    const titleMatches = searchTerms.some(term => {
      const regex = new RegExp(`\\b${term}\\b`, 'i');
      return regex.test(recipe.title);
    });
    
    // Check if any searchTerm appears as a whole word in description
    const descriptionMatches = recipe.description ? searchTerms.some(term => {
      const regex = new RegExp(`\\b${term}\\b`, 'i');
      return regex.test(recipe.description || '');
    }) : false;
    
    // Check if any searchTerm appears as a whole word in ingredients
    const ingredientMatches = recipe.ingredients.some((ingredient: { name: string }) => {
      return searchTerms.some(term => {
        const regex = new RegExp(`\\b${term}\\b`, 'i');
        return regex.test(ingredient.name);
      });
    });
    
    return titleMatches || descriptionMatches || ingredientMatches;
  });

  // Sort results by relevance
  const sortedRecipes = filteredRecipes.sort((a, b) => {
    // Higher score = more relevant
    const getRelevanceScore = (recipe: typeof recipes[0]) => {
      let score = 0;
      
      // Title match (highest priority)
      if (searchTerms.some(term => {
        const regex = new RegExp(`\\b${term}\\b`, 'i');
        return regex.test(recipe.title);
      })) {
        score += 100;
      }
      
      // Ingredient match (medium priority)
      if (recipe.ingredients.some((i: { name: string }) => {
        return searchTerms.some(term => {
          const regex = new RegExp(`\\b${term}\\b`, 'i');
          return regex.test(i.name);
        });
      })) {
        score += 50;
      }
      
      // Description match (lowest priority)
      if (recipe.description && searchTerms.some(term => {
        const regex = new RegExp(`\\b${term}\\b`, 'i');
        return regex.test(recipe.description || '');
      })) {
        score += 25;
      }
      
      return score;
    };

    return getRelevanceScore(b) - getRelevanceScore(a);
  });

  // Return top 20 results, wrapped in a { recipes: ... } object
  return NextResponse.json({ recipes: sortedRecipes.slice(0, 20) });
} 