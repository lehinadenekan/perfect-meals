'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
// REMOVE: import { getRecipeById } from '@/lib/data/recipes'; 
// import type { RecipeDetailData } from '@/lib/data/recipes'; // REMOVED
import RecipeDetailModal from '@/components/recipe/RecipeDetailModal';
import type { Recipe } from '@/lib/types/recipe'; // REMOVED Ingredient, Instruction, RecipeSource

export default function RecipeModalPage({ params }: { params: { recipeId: string } }) {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (params.recipeId === 'create') {
      router.back();
      return;
    }

    const fetchRecipeFromApi = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/recipes/${params.recipeId}`);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const fetchedRecipe: any = await response.json();

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const modalRecipe: any = {
          ...fetchedRecipe,
          regions: fetchedRecipe.regions || [],
          description: fetchedRecipe.description ?? undefined,
          cookingTime: fetchedRecipe.cookingTime ?? 30,
          servings: fetchedRecipe.servings ?? 4,
          difficulty: fetchedRecipe.difficulty ?? 'Medium',
          imageUrl: fetchedRecipe.imageUrl ?? undefined,
          calories: fetchedRecipe.calories ?? undefined,
          isVegetarian: fetchedRecipe.isVegetarian ?? false,
          isVegan: fetchedRecipe.isVegan ?? false,
          isGlutenFree: fetchedRecipe.isGlutenFree ?? false,
          isNutFree: fetchedRecipe.isNutFree ?? false,
          isLowFodmap: fetchedRecipe.isLowFodmap ?? false,
          isLactoseFree: fetchedRecipe.isLactoseFree ?? false,
          isPescatarian: fetchedRecipe.isPescatarian ?? false,
          isFermented: fetchedRecipe.isFermented ?? false,
          source: fetchedRecipe.source,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ingredients: (fetchedRecipe.ingredients || []).map((ing: any) => ({
            ...ing,
            recipeId: fetchedRecipe.id,
            notes: ing.notes ?? undefined,
          })),
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          instructions: (fetchedRecipe.instructions || []).map((inst: any) => ({
            ...inst,
            recipeId: fetchedRecipe.id,
          })),
          type: fetchedRecipe.type || 'main',
          cuisineId: fetchedRecipe.cuisineId || '',
          authenticity: fetchedRecipe.authenticity || 'unknown',
          cookingStyles: fetchedRecipe.cookingStyles || [],
          spiceLevel: fetchedRecipe.spiceLevel || 'medium',
          subCuisineType: fetchedRecipe.subCuisineType ?? undefined,
          showCount: fetchedRecipe.showCount || 0,
          hasFeatureFermented: fetchedRecipe.isFermented ?? false,
          hasFermentedIngredients: false,
          hasFish: false,
          notes: fetchedRecipe.notes || [],
          authorId: fetchedRecipe.authorId || 'default-author-id',
          nutritionFacts: fetchedRecipe.nutritionFacts,
          averageRating: fetchedRecipe.averageRating ?? undefined,
          createdAt: fetchedRecipe.createdAt ? new Date(fetchedRecipe.createdAt) : new Date(),
          updatedAt: fetchedRecipe.updatedAt ? new Date(fetchedRecipe.updatedAt) : new Date(),
        };

        setRecipe(modalRecipe as Recipe);

      } catch (err) {
        console.error('Failed to fetch recipe for modal:', err);
        setError(err instanceof Error ? err.message : 'Failed to load recipe.');
      } finally {
        setIsLoading(false);
      }
    };

    if (params.recipeId) {
      fetchRecipeFromApi();
    } else {
      router.back();
    }

  }, [params.recipeId, router]);

  const handleClose = () => {
    router.back();
  };

  if (isLoading) {
    return null;
  }

  if (error || !recipe) {
    console.error("Error loading recipe modal:", error);
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={handleClose}>
        <div className="bg-white p-4 rounded shadow-lg text-red-600" onClick={(e) => e.stopPropagation()}>
          Error loading recipe: {error || 'Recipe data missing.'}
          <button onClick={handleClose} className="ml-4 text-sm text-blue-500">Close</button>
        </div>
      </div>
    );
  }

  return (
    <RecipeDetailModal
      recipe={recipe}
      isOpen={true}
      onClose={handleClose}
    />
  );
} 