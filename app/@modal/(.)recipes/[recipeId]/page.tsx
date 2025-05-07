'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
// REMOVE: import { getRecipeById } from '@/'lib/data/recipes''; 
import type { RecipeDetailData } from '@/lib/data/recipes';
import RecipeDetailModal from '@/components/recipe/RecipeDetailModal';
import type { Recipe, Ingredient, Instruction, RecipeSource } from '@/lib/types/recipe';

export default function RecipeModalPage({ params }: { params: { recipeId: string } }) {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // --- START: Add this check ---
    if (params.recipeId === 'create') {
      // If the route intercepted is '/recipes/create',
      // don't treat 'create' as an ID. Close the modal immediately.
      router.back();
      return; // Stop executing this useEffect
    }
    // --- END: Add this check ---

    const fetchRecipeFromApi = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/recipes/${params.recipeId}`);
        if (!response.ok) {
          // Handle HTTP errors (e.g., 404 Not Found, 500 Server Error)
          const errorData = await response.json();
          throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
        }

        const fetchedRecipe: RecipeDetailData = await response.json();

        // Transform RecipeDetailData to Recipe
        const modalRecipe: Recipe = {
          // Spread the base fields from fetchedRecipe (Prisma Recipe)
          ...fetchedRecipe,
          // Explicitly handle null/undefined mismatches
          continent: fetchedRecipe.continent ?? undefined,
          description: fetchedRecipe.description ?? undefined,
          cookingTime: fetchedRecipe.cookingTime ?? 30, // Default if null
          servings: fetchedRecipe.servings ?? 4, // Default if null
          difficulty: fetchedRecipe.difficulty ?? 'Medium', // Default if null
          regionOfOrigin: fetchedRecipe.regionOfOrigin ?? undefined, // Convert null to undefined
          imageUrl: fetchedRecipe.imageUrl ?? undefined, // Convert null to undefined
          calories: fetchedRecipe.calories ?? undefined, // Convert null to undefined
          // Provide defaults for boolean flags if null
          isVegetarian: fetchedRecipe.isVegetarian ?? false,
          isVegan: fetchedRecipe.isVegan ?? false,
          isGlutenFree: fetchedRecipe.isGlutenFree ?? false,
          isNutFree: fetchedRecipe.isNutFree ?? false,
          isLowFodmap: fetchedRecipe.isLowFodmap ?? false,
          isLactoseFree: fetchedRecipe.isLactoseFree ?? false,
          isPescatarian: fetchedRecipe.isPescatarian ?? false,
          isFermented: fetchedRecipe.isFermented ?? false,

          // --- Explicitly map RecipeSource --- 
          source: fetchedRecipe.source as RecipeSource, // Cast Prisma enum to local enum

          // Map ingredients, adding recipeId
          // Let TS infer input type, map to target type Ingredient
          ingredients: (fetchedRecipe.ingredients || []).map((ing): Ingredient => ({
            ...ing,
            id: ing.id, // Ensure ID is mapped if needed by target type
            recipeId: fetchedRecipe.id, // Add the recipeId
            notes: ing.notes ?? undefined, // Coalesce null to undefined
          })),

          // Map instructions, adding recipeId
          // Let TS infer input type, map to target type Instruction
          instructions: (fetchedRecipe.instructions || []).map((inst): Instruction => ({
            ...inst,
            id: inst.id, // Ensure ID is mapped if needed by target type
            recipeId: fetchedRecipe.id, // Add the recipeId
          })),

          // --- Provide defaults for fields missing in Prisma Recipe / RecipeDetailData ---
          // Use direct access and nullish coalescing for defaults
          type: ('type' in fetchedRecipe && typeof fetchedRecipe.type === 'string') ? fetchedRecipe.type : 'main',
          cuisineId: ('cuisineId' in fetchedRecipe && typeof fetchedRecipe.cuisineId === 'string') ? fetchedRecipe.cuisineId : '',
          authenticity: ('authenticity' in fetchedRecipe && typeof fetchedRecipe.authenticity === 'string') ? fetchedRecipe.authenticity : 'unknown',
          cookingStyles: ('cookingStyles' in fetchedRecipe && Array.isArray(fetchedRecipe.cookingStyles)) ? fetchedRecipe.cookingStyles : [],
          spiceLevel: ('spiceLevel' in fetchedRecipe && typeof fetchedRecipe.spiceLevel === 'string') ? fetchedRecipe.spiceLevel : 'medium',
          subCuisineType: ('subCuisineType' in fetchedRecipe && typeof fetchedRecipe.subCuisineType === 'string') ? fetchedRecipe.subCuisineType : undefined,
          showCount: ('showCount' in fetchedRecipe && typeof fetchedRecipe.showCount === 'number') ? fetchedRecipe.showCount : 0,
          hasFeatureFermented: fetchedRecipe.isFermented ?? false,
          hasFermentedIngredients: false,
          hasFish: false,
          notes: ('notes' in fetchedRecipe && Array.isArray(fetchedRecipe.notes)) ? fetchedRecipe.notes : [],
          authorId: ('authorId' in fetchedRecipe && typeof fetchedRecipe.authorId === 'string') ? fetchedRecipe.authorId : 'default-author-id',
          nutritionFacts: undefined,
          averageRating: ('averageRating' in fetchedRecipe && typeof fetchedRecipe.averageRating === 'number') ? fetchedRecipe.averageRating : undefined,

          // Ensure date types are Date objects
          createdAt: typeof fetchedRecipe.createdAt === 'string' ? new Date(fetchedRecipe.createdAt) : fetchedRecipe.createdAt,
          updatedAt: typeof fetchedRecipe.updatedAt === 'string' ? new Date(fetchedRecipe.updatedAt) : fetchedRecipe.updatedAt,
          // Remove fields not present in the target Recipe type
          // categories: (fetchedRecipe as any).categories || [], // Removed
          // tags: (fetchedRecipe as any).tags || [],       // Removed
        };

        setRecipe(modalRecipe);

      } catch (err) {
        console.error('Failed to fetch recipe for modal:', err);
        setError(err instanceof Error ? err.message : 'Failed to load recipe.');
        // Optionally close modal on error
        // router.back();
      } finally {
        setIsLoading(false);
      }
    };

    if (params.recipeId) {
      // Call the new fetch function
      fetchRecipeFromApi();
    } else {
      // If no recipeId, likely an error state, close the modal
      router.back();
    }

    // Cleanup function if needed
    // return () => {};

  }, [params.recipeId, router]);

  const handleClose = () => {
    router.back(); // Navigate back to close the modal
  };

  // Optional: Render a loading state within the modal structure if desired
  // Or rely on RecipeDetailModal's internal handling if it exists
  if (isLoading) {
    // You could return a skeleton/loading version of the modal
    // Or just null/fragment while loading, letting the overlay show
    return null; // Or <ModalLoadingSkeleton />;
  }

  if (error || !recipe) {
    // Handle error state - maybe show error in a simple modal or just close
    console.error("Error loading recipe modal:", error);
    // You might want to show a toast notification here
    // For now, just close the modal route
    // Temporarily disable closing on error to see potential error messages
    // useEffect(() => { router.back(); }, [router]); 
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={handleClose}>
        <div className="bg-white p-4 rounded shadow-lg text-red-600" onClick={(e) => e.stopPropagation()}>
          Error loading recipe: {error || 'Recipe data missing.'}
          <button onClick={handleClose} className="ml-4 text-sm text-blue-500">Close</button>
        </div>
      </div>
    );
  }

  // Render the actual modal content
  return (
    <RecipeDetailModal
      recipe={recipe}
      isOpen={true} // This component only renders when the route is matched (intercepted)
      onClose={handleClose}
    // Pass other necessary props like onFavoriteChange if needed/available
    />
  );
} 