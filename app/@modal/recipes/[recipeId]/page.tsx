'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import RecipeDetailModal from '@/components/recipe/RecipeDetailModal';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import { RecipeDetailData } from '@/lib/data/recipes'; // Assuming this is the type returned by your API
import { Recipe } from '@/lib/types/recipe'; // Base Recipe type

// This is the type RecipeDetailModal expects for its 'recipe' prop (internally initialRecipe)
type InitialRecipeData = Recipe & { isFavourite?: boolean; regions?: { id: string; name: string }[]; };

// Mapping function to ensure all required fields are present and non-null
function toInitialRecipeData(data: RecipeDetailData): InitialRecipeData {
  return {
    ...data,
    source: data.source === 'AI_GENERATED' ? 'USER_CREATED' : data.source,
    authenticity: '', // required string
    spiceLevel: '', // required string
    showCount: 0, // required number
    hasFeatureFermented: false, // required boolean
    hasFermentedIngredients: false, // required boolean
    hasFish: false, // required boolean
    isVegetarian: data.isVegetarian ?? false,
    isVegan: data.isVegan ?? false,
    isGlutenFree: data.isGlutenFree ?? false,
    isNutFree: data.isNutFree ?? false,
    isLowFodmap: data.isLowFodmap ?? false,
    isLactoseFree: data.isLactoseFree ?? false,
    isPescatarian: data.isPescatarian ?? false,
    isFermented: data.isFermented ?? false,
    cookingStyles: data.cookingStyles ?? [],
    ingredients: (data.ingredients ?? []).map(ing => ({
      ...ing,
      notes: ing.notes ?? undefined,
    })),
    instructions: data.instructions ?? [],
    createdAt: data.createdAt ? new Date(data.createdAt) : new Date(),
    updatedAt: data.updatedAt ? new Date(data.updatedAt) : new Date(),
    regions: [],
    isFavourite: data.isFavourite ?? false,
    description: data.description ?? undefined,
    cookingTime: data.cookingTime ?? 0,
    servings: data.servings ?? 0,
    difficulty: data.difficulty ?? '',
    title: data.title ?? '',
    type: data.type ?? '',
    imageUrl: data.imageUrl ?? undefined,
    calories: data.calories ?? undefined,
    notes: data.notes ?? undefined,
    authorId: data.authorId ?? '',
    cuisineId: data.cuisineId ?? undefined,
    nutritionFacts: data.nutritionFacts
      ? {
          protein: data.nutritionFacts.protein ?? undefined,
          carbs: data.nutritionFacts.carbs ?? undefined,
          fat: data.nutritionFacts.fat ?? undefined,
        }
      : undefined,
    // Remove or ignore fields not present in RecipeDetailData
    // regionOfOrigin, continent, videoUrl, subCuisineType, averageRating, etc.
  };
}

export default function RecipeModalPage({ params }: { params: { recipeId: string } }) {
  const router = useRouter();
  const [recipeData, setRecipeData] = useState<RecipeDetailData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (params.recipeId) {
      setIsLoading(true);
      setError(null);
      fetch(`/api/recipes/${params.recipeId}`)
        .then(res => {
          if (!res.ok) {
            return res.json().then(errData => {
              throw new Error(errData.error || `Failed to fetch recipe (status ${res.status})`);
            });
          }
          return res.json();
        })
        .then((data: RecipeDetailData) => {
          setRecipeData(data);
        })
        .catch(err => {
          console.error("Error fetching recipe for modal:", err);
          setError(err.message || "Could not load recipe details.");
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [params.recipeId]);

  const handleClose = () => {
    router.back();
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50 transition-opacity duration-300 ease-out opacity-100">
        <div className="bg-white p-6 sm:p-8 rounded-lg shadow-xl text-center">
          <LoadingSpinner className="mx-auto h-12 w-12 text-blue-600" />
          <p className="mt-4 text-lg font-medium text-gray-700">Loading Recipe...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50 transition-opacity duration-300 ease-out opacity-100">
        <div className="bg-white p-6 sm:p-8 rounded-lg shadow-xl text-center max-w-md mx-auto">
          <h3 className="text-xl font-semibold text-red-600">Error</h3>
          <p className="mt-2 text-gray-700">{error}</p>
          <button 
            onClick={handleClose} 
            className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  if (!recipeData) {
    return (
       <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50 transition-opacity duration-300 ease-out opacity-100">
        <div className="bg-white p-6 sm:p-8 rounded-lg shadow-xl text-center max-w-md mx-auto">
          <h3 className="text-xl font-semibold text-gray-700">Recipe Not Found</h3>
          <p className="mt-2 text-gray-600">The requested recipe could not be found.</p>
          <button 
            onClick={handleClose} 
            className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <RecipeDetailModal
      recipe={toInitialRecipeData(recipeData)}
      isOpen={true}
      onClose={handleClose}
    />
  );
}