'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import RecipeCard from '@/app/components/recipe/RecipeCard';
import RecipeDetailModal from '@/app/components/recipe/RecipeDetailModal';
import { Recipe } from '@/app/types/recipe';
import toast from 'react-hot-toast';

// Define a type for the fetched favorite recipe, ensuring it includes isFavorite
// (it should always be true when fetched for this page)
type FavoriteRecipe = Recipe & { isFavorite: true };

export default function FavoriteMealsPage() {
  const { status } = useSession();
  const [favoriteRecipes, setFavoriteRecipes] = useState<FavoriteRecipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // --- State for Modal Control ---
  const [selectedRecipe, setSelectedRecipe] = useState<FavoriteRecipe | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (status === 'authenticated') {
        setIsLoading(true);
        setError(null);
        try {
          const response = await fetch('/api/recipes/favorites'); // Your API endpoint for favorites
          if (!response.ok) {
            throw new Error('Failed to fetch favorite recipes');
          }
          const data = await response.json();
          // Ensure fetched data includes isFavorite = true, or set it
          const recipesWithFavoriteStatus = data.map((recipe: Recipe) => ({ ...recipe, isFavorite: true as const }));
          setFavoriteRecipes(recipesWithFavoriteStatus);
        } catch (err) {
          setError(err instanceof Error ? err.message : 'An unknown error occurred');
          toast.error("Could not load favorites.");
        } finally {
          setIsLoading(false);
        }
      } else if (status === 'unauthenticated') {
        setIsLoading(false);
        setFavoriteRecipes([]); // Clear recipes if user logs out
      }
      // Do nothing if status is 'loading'
    };

    fetchFavorites();
  }, [status]); // Re-run when authentication status changes

  // --- Callback for Favorite Changes ---
  const handleFavoriteChange = (recipeId: string, newIsFavorite: boolean) => {
    if (!newIsFavorite) {
      // Remove from favorites: Filter out the recipe locally
      setFavoriteRecipes(currentRecipes =>
        currentRecipes.filter(recipe => recipe.id !== recipeId)
      );
      // Close the modal if the currently selected recipe was removed
      if (selectedRecipe && selectedRecipe.id === recipeId) {
        handleCloseModal();
      }
      toast.success("Removed from favorites");
    } else {
      // This case shouldn't technically happen from this page (can't favorite an already favorite item again)
      // But if it did, we'd update the state (though it should already be isFavorite: true)
      setFavoriteRecipes(currentRecipes =>
        currentRecipes.map(recipe =>
          recipe.id === recipeId
            ? { ...recipe, isFavorite: true }
            : recipe
        )
      );
    }
  };

  // --- Modal Handlers ---
  const handleOpenModal = (recipe: Recipe) => {
    // We still find the most up-to-date version from local state
    const currentRecipeData = favoriteRecipes.find(r => r.id === recipe.id)
    setSelectedRecipe(currentRecipeData || { ...recipe, isFavorite: true }); // Set selected, ensure isFavorite is true if somehow missing
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRecipe(null);
  };

  if (status === 'loading' || isLoading) {
    return <div className="text-center py-10">Loading your favorite meals...</div>;
  }

  if (status === 'unauthenticated') {
    return <div className="text-center py-10">Please log in to see your favorite meals.</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">Error loading favorites: {error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Favorite Meals</h1>
      {favoriteRecipes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favoriteRecipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onSelect={handleOpenModal}
              onFavoriteChange={handleFavoriteChange}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">You haven&apos;t added any favorite meals yet.</p>
      )}

      {selectedRecipe && (
        <RecipeDetailModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          recipe={selectedRecipe}
          onFavoriteChange={handleFavoriteChange}
        />
      )}
    </div>
  );
} 