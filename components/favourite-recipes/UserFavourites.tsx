// components/favourite-recipes/UserFavourites.tsx
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';

import LoadingSpinner from '@/components/shared/LoadingSpinner';
import RecipeCard from '@/components/recipe/RecipeCard';
import { Recipe } from '@/lib/types/recipe'; // Adjust path if needed
import RecipeDetailModal from '@/components/recipe/RecipeDetailModal'; // Import modal

// Define the type for the fetched favourite recipe, including optional isFavourite
type FavouriteRecipe = Recipe & { isFavourite?: boolean };

export default function UserFavourites() {
  const { status } = useSession(); // Get session status
  const [favouriteRecipes, setFavouriteRecipes] = useState<FavouriteRecipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // --- State for Modal Control ---
  const [selectedRecipe, setSelectedRecipe] = useState<FavouriteRecipe | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // --- Fetch Favourites Logic ---
  const fetchFavourites = useCallback(async () => {
    // Only fetch if authenticated
    if (status === 'authenticated') {
      setIsLoading(true);
      console.log("UserFavourites: Status is authenticated. Attempting fetch...");
      try {
        // Use the correct API path
        const response = await fetch('/api/recipes/favourites'); // GET request
        console.log(`UserFavourites: Fetch response status: ${response.status}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch favourite recipes: ${response.status}`);
        }
        const data = await response.json();
        // Map data, ensuring isFavourite is set (should be true from this endpoint)
        const recipesWithFavouriteStatus = data.map((recipe: Recipe) => ({
          ...recipe,
          // Explicitly set isFavourite as true for recipes fetched from this endpoint
          isFavourite: true,
        }));
        setFavouriteRecipes(recipesWithFavouriteStatus);
      } catch (err) {
        console.error('UserFavourites: Error fetching favourite recipes:', err);
        toast.error("Could not load your favourite recipes.");
        setFavouriteRecipes([]); // Clear on error
      } finally {
        setIsLoading(false);
      }
    } else {
        // Clear data if status is not authenticated (e.g., loading or unauthenticated)
        // Let the parent page component handle the main loading/unauthenticated UI
        setFavouriteRecipes([]);
        setIsLoading(status === 'loading'); // Only show loading spinner if session is loading
    }
  }, [status]);

  // Fetch favourites when component mounts or session status changes
  useEffect(() => {
    console.log("--- UserFavourites useEffect triggered ---");
    fetchFavourites();
  }, [fetchFavourites]); // Use fetchFavourites callback which depends on status


  // --- Callback for Favourite Changes (from RecipeCard) ---
  // This function is called when the FavoriteButton within RecipeCard succeeds
  const handleFavouriteChange = useCallback((recipeId: string, newIsFavourite: boolean) => {
    if (!newIsFavourite) {
      // Remove from favourites list locally if unfavorited
      setFavouriteRecipes((prevRecipes) => {
        const updatedRecipes = prevRecipes.filter(recipe => recipe.id !== recipeId);
        // Adjust modal state if the unfavorited recipe was open
        if (selectedRecipe && selectedRecipe.id === recipeId) {
            handleCloseModal();
        }
        // Adjust index if item before current index was removed
        else if (currentIndex !== null) {
            const originalIndex = prevRecipes.findIndex(r => r.id === recipeId);
            if (originalIndex !== -1 && originalIndex < currentIndex) {
              setCurrentIndex(current => (current !== null ? current - 1 : null));
            }
        }
        return updatedRecipes;
      });
      toast.success("Removed from favourites");
    } else {
       // If a recipe is re-favorited (less common from this view), refetch the list
       // Or simply update the specific item if needed, but refetching ensures consistency
       toast.success("Added back to favourites");
       // Optionally add the item back optimistically or refetch:
       // fetchFavourites(); // Re-fetch the whole list
       // Or, more optimistically (requires fetching recipe details):
       // setFavouriteRecipes(prev => [...prev, { ...details, isFavourite: true }]);
    }
  }, [selectedRecipe, currentIndex]); // Include dependencies


  // --- Modal Handlers ---
  const handleOpenModal = useCallback((recipe: Recipe) => {
    // Find the recipe in the current state to ensure we have isFavourite status
    const recipeFromState = favouriteRecipes.find(r => r.id === recipe.id);
    if (recipeFromState) {
      const index = favouriteRecipes.indexOf(recipeFromState);
      setSelectedRecipe(recipeFromState);
      setCurrentIndex(index);
      setIsModalOpen(true);
    } else {
      // Fallback: Should ideally not happen if state is synced
      console.warn("UserFavourites: Recipe not found in local state, opening modal with basic data.");
      setSelectedRecipe({ ...recipe, isFavourite: true }); // Assume favourite=true here
      setCurrentIndex(null); // Can't guarantee index
      setIsModalOpen(true);
    }
  }, [favouriteRecipes]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRecipe(null);
    setCurrentIndex(null);
  };

  // --- Modal Navigation Handlers ---
  const goToPreviousRecipe = () => {
    if (currentIndex !== null && currentIndex > 0) {
      const newIndex = currentIndex - 1;
      setSelectedRecipe(favouriteRecipes[newIndex]);
      setCurrentIndex(newIndex);
    }
  };

  const goToNextRecipe = () => {
    if (currentIndex !== null && currentIndex < favouriteRecipes.length - 1) {
      const newIndex = currentIndex + 1;
      setSelectedRecipe(favouriteRecipes[newIndex]);
      setCurrentIndex(newIndex);
    }
  };

  const canGoPrevious = currentIndex !== null && currentIndex > 0;
  const canGoNext = currentIndex !== null && currentIndex < favouriteRecipes.length - 1;


  // --- Render loading state ---
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <LoadingSpinner />
      </div>
    );
  }

  // --- Render content ---
  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">All Favourite Recipes</h2>
      {favouriteRecipes.length === 0 ? (
        <p className="text-gray-600">Your favourite recipes will appear here.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center">
          {favouriteRecipes.map(recipe => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe} // Pass the recipe with isFavourite status
              onSelect={handleOpenModal} // Pass handler to open modal
              onFavouriteChange={handleFavouriteChange} // Pass handler for fav changes
              // Add other necessary props like onAlbumUpdate if needed by RecipeCard
              // onAlbumUpdate={() => { /* Trigger album refresh if needed */ }}
              // onFlagClick={() => { /* Handle flag click if needed */ }}
            />
          ))}
        </div>
      )}

       {/* Recipe Detail Modal */}
       {selectedRecipe && isModalOpen && (
        <RecipeDetailModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          recipe={selectedRecipe} // Pass the selected recipe with status
          onFavouriteChange={handleFavouriteChange} // Pass correct handler
          onGoToPrevious={goToPreviousRecipe}
          onGoToNext={goToNextRecipe}
          canGoPrevious={canGoPrevious}
          canGoNext={canGoNext}
        />
      )}
    </div>
  );
}