'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import RecipeCard from '@/app/components/recipe/RecipeCard';
import RecipeDetailModal from '@/app/components/recipe/RecipeDetailModal';
import LoadingSpinner from '@/app/components/shared/LoadingSpinner';
import { Recipe } from '@/lib/types/recipe';
import { PlusCircleIcon } from '@heroicons/react/24/outline';

interface MyRecipesViewProps {
  onCreateClick: () => void;
}

// Define state type, including optional isFavorite
type MyRecipe = Recipe & { isFavorite?: boolean };

export default function MyRecipesView({ onCreateClick }: MyRecipesViewProps) {
  const { data: session } = useSession();
  // State to hold user's recipes, including their favorite status
  const [myRecipes, setMyRecipes] = useState<MyRecipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // --- State for Modal Control ---
  const [selectedRecipe, setSelectedRecipe] = useState<MyRecipe | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchMyRecipes = async () => {
      if (!session?.user?.id) {
        setIsLoading(false);
        setMyRecipes([]); // Clear recipes if no user
        return;
      }
      setIsLoading(true);
      setError(null);
      try {
        // *** IMPORTANT: Ensure this API returns `isFavorite` status ***
        const response = await fetch('/api/recipes/my-recipes');
        if (!response.ok) {
          throw new Error(`Failed to fetch recipes: ${response.statusText}`);
        }
        const data = await response.json();
        // Ensure data is an array. Assume API doesn't return favorite status for user's own recipes here.
        // The FavoriteButton will determine the actual status.
        const recipesWithStatus = (Array.isArray(data) ? data : []).map((r: Recipe) => ({ ...r, isFavorite: undefined })); // Default to undefined
        setMyRecipes(recipesWithStatus);
      } catch (err: unknown) {
        console.error("Error fetching user's recipes:", err);
        setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
        setMyRecipes([]); // Clear on error
      } finally {
        setIsLoading(false);
      }
    };

    fetchMyRecipes();
  }, [session]); // Re-fetch if session changes

  // --- Callback for Favorite Changes ---
  const handleFavoriteChange = (recipeId: string, newIsFavorite: boolean) => {
    setMyRecipes(currentRecipes =>
      currentRecipes.map(recipe =>
        recipe.id === recipeId
          ? { ...recipe, isFavorite: newIsFavorite }
          : recipe
      )
    );
    // Update selected recipe in modal if it's the one changed
    if (selectedRecipe && selectedRecipe.id === recipeId) {
      setSelectedRecipe(prev => prev ? { ...prev, isFavorite: newIsFavorite } : null);
    }
  };

  // --- Modal Handlers ---
  const handleOpenModal = (recipe: MyRecipe) => {
    setSelectedRecipe(recipe);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRecipe(null);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 text-red-600">
        <p>Error loading your recipes: {error}</p>
      </div>
    );
  }

  return (
    <>
      <div className="w-full">
        {/* Button positioned at the top-right of the grid area */}
        <div className="flex justify-end mb-6">
          <button
            onClick={onCreateClick}
            className="inline-flex items-center gap-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-colors"
          >
            <PlusCircleIcon className="h-5 w-5" />
            Create New Recipe
          </button>
        </div>

        {myRecipes.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-gray-800">
              You haven&apos;t created any recipes yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center">
            {myRecipes.map(recipe => (
              <div key={recipe.id}>
                <RecipeCard
                  recipe={recipe}
                  onSelect={handleOpenModal}
                  onFavouriteChange={handleFavoriteChange}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Render Modal Conditionally */}
      {selectedRecipe && (
        <RecipeDetailModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          recipe={selectedRecipe}
          onFavouriteChange={handleFavoriteChange}
        />
      )}
    </>
  );
} 