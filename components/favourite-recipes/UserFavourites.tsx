// components/favourite-recipes/UserFavourites.tsx
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';

import LoadingSpinner from '@/components/shared/LoadingSpinner';
import RecipeCard from '@/components/recipe/RecipeCard'; // Assuming this is the correct RecipeCard component
import { Recipe } from '@/lib/types/recipe'; // Adjust path if needed
import RecipeDetailModal from '@/components/recipe/RecipeDetailModal'; // Import modal

// Define the type for the fetched favourite recipe, including isFavourite
type FavouriteRecipe = Recipe & { isFavourite: boolean }; // isFavourite should always be true here

export default function UserFavourites() {
  const { status } = useSession();
  // State variable reverted to favouriteRecipes
  const [favouriteRecipes, setFavouriteRecipes] = useState<FavouriteRecipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // --- State for Modal Control ---
  const [selectedRecipe, setSelectedRecipe] = useState<FavouriteRecipe | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // --- Fetch Favourites Logic ---
  // Reverted fetch function name and endpoint
  const fetchFavourites = useCallback(async () => {
    if (status === 'authenticated') {
      setIsLoading(true);
      console.log("UserFavourites: Status is authenticated. Attempting fetch..."); // Reverted log
      try {
        // --- Reverted API endpoint ---
        const response = await fetch('/api/recipes/favourites'); // GET request
        // --- End Revert ---

        console.log(`UserFavourites: Fetch response status: ${response.status}`); // Reverted log
        if (!response.ok) {
          throw new Error(`Failed to fetch favourite recipes: ${response.status}`); // Reverted error message
        }
        const data = await response.json();

        // Map data, ensuring isFavourite is set to true from this endpoint
        const recipesWithFavouriteStatus = data.map((recipe: Recipe) => ({
          ...recipe,
          isFavourite: true, // Assume true as it comes from favourites endpoint
        }));

        // Update state with the fetched recipes
        setFavouriteRecipes(recipesWithFavouriteStatus);
      } catch (err) {
        console.error('UserFavourites: Error fetching favourite recipes:', err); // Reverted log
        toast.error("Could not load your favourite recipes."); // Reverted toast message
        setFavouriteRecipes([]); // Clear on error
      } finally {
        setIsLoading(false);
      }
    } else {
      setFavouriteRecipes([]);
      setIsLoading(status === 'loading');
    }
  }, [status]);

  // Fetch recipes when component mounts or session status changes
  useEffect(() => {
    console.log("--- UserFavourites useEffect triggered ---"); // Reverted log
    fetchFavourites();
  }, [fetchFavourites]); // Use fetchFavourites callback


  // --- Callback for Favourite Changes (from RecipeCard or Modal) ---
  // Reverted logic: If unfavourited, remove from this list.
  const handleFavouriteChange = useCallback((recipeId: string, newIsFavourite: boolean) => {
    if (!newIsFavourite) {
      // Remove from favourites list locally if unfavorited
      setFavouriteRecipes((prevRecipes) => {
        const updatedRecipes = prevRecipes.filter(recipe => recipe.id !== recipeId);
        // Adjust modal state if the unfavorited recipe was open
        if (selectedRecipe && selectedRecipe.id === recipeId) {
            handleCloseModal(); // Close modal if current recipe is unfavorited
        }
        // Adjust index if item before current index was removed (needed for modal navigation)
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
       // If a recipe is somehow re-favorited from this view (unlikely but possible),
       // refetch the list to ensure consistency.
       toast.success("Added back to favourites");
       fetchFavourites(); // Re-fetch the whole list
    }
  }, [selectedRecipe, currentIndex, fetchFavourites]); // Added fetchFavourites dependency


  // --- Modal Handlers ---
  const handleOpenModal = useCallback((recipe: Recipe) => {
    // Type assertion needed if RecipeCard passes base Recipe type
    const recipeFromState = favouriteRecipes.find(r => r.id === recipe.id);
    const index = recipeFromState ? favouriteRecipes.indexOf(recipeFromState) : -1;

    // Ensure the selected recipe object has isFavourite = true for consistency here
    setSelectedRecipe(recipeFromState || { ...recipe, isFavourite: true });
    setCurrentIndex(index !== -1 ? index : null);
    setIsModalOpen(true);
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
      setSelectedRecipe(favouriteRecipes[newIndex]); // Use favouriteRecipes state
      setCurrentIndex(newIndex);
    }
  };

  const goToNextRecipe = () => {
    if (currentIndex !== null && currentIndex < favouriteRecipes.length - 1) {
      const newIndex = currentIndex - 1; // ERROR: Should be + 1
      setSelectedRecipe(favouriteRecipes[newIndex]); // Use favouriteRecipes state
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
      {/* Reverted Title */}
      <h2 className="text-xl font-semibold mb-4">Favourite Recipes</h2>
      {favouriteRecipes.length === 0 ? (
        // Reverted empty state message
        <p className="text-gray-600">Your favourite recipes will appear here.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center">
          {/* Map over favouriteRecipes */}
          {favouriteRecipes.map(recipe => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe} // Pass the recipe object (which includes isFavourite: true)
              onSelect={handleOpenModal}
              onFavouriteChange={handleFavouriteChange}
              // isFavourite={recipe.isFavourite} // Explicitly pass if needed
            />
          ))}
        </div>
      )}

       {/* Recipe Detail Modal */}
       {selectedRecipe && isModalOpen && (
        <RecipeDetailModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          recipe={selectedRecipe} // Pass selected recipe
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