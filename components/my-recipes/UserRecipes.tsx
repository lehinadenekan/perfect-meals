// components/my-recipes/UserRecipes.tsx
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';

import LoadingSpinner from '@/components/shared/LoadingSpinner';
import RecipeCard from '@/components/recipe/RecipeCard';
import { Recipe } from '@/lib/types/recipe';
import RecipeDetailModal from '@/components/recipe/RecipeDetailModal';

// Removed UserRecipesProps interface as it's empty

// Define type for fetched user recipe (includes isFavourite status from API)
type UserRecipe = Recipe & { isFavourite: boolean };

const UserRecipes: React.FC = () => {
  const { status } = useSession();
  const [userRecipes, setUserRecipes] = useState<UserRecipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // --- State for Modal Control ---
  const [selectedRecipe, setSelectedRecipe] = useState<UserRecipe | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // --- Fetch User Recipes Logic ---
  const fetchUserRecipes = useCallback(async () => {
    if (status === 'authenticated') {
      setIsLoading(true);
      setError(null); // Clear previous errors on fetch
      console.log("UserRecipes: Status is authenticated. Attempting fetch...");
      try {
        // Fetch from the endpoint that returns all recipes authored by the user
        const response = await fetch('/api/recipes/my-recipes');
        console.log(`UserRecipes: Fetch response status: ${response.status}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch user recipes: ${response.status}`);
        }
        const data: UserRecipe[] = await response.json(); // Expecting array including isFavourite

        // Update state with the fetched recipes
        setUserRecipes(data);
      } catch (err) {
        console.error('UserRecipes: Error fetching user recipes:', err);
        toast.error("Could not load your created/imported recipes.");
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        setUserRecipes([]); // Clear on error
      } finally {
        setIsLoading(false);
      }
    } else {
      setUserRecipes([]); // Clear data if not authenticated
      setIsLoading(status === 'loading'); // Show loading only if session is loading
      setError(null);
    }
  }, [status]);

  // Fetch recipes when component mounts or session status changes
  useEffect(() => {
    console.log("--- UserRecipes useEffect triggered ---");
    fetchUserRecipes();
  }, [fetchUserRecipes]);


  // --- Callback for Favourite Changes (from RecipeCard or Modal) ---
  // Updates the favourite status locally for immediate UI feedback
  const handleFavouriteChange = useCallback((recipeId: string, newIsFavourite: boolean) => {
      // Optimistic update: update local state first
      setUserRecipes((prevRecipes) =>
          prevRecipes.map((recipe) =>
              recipe.id === recipeId ? { ...recipe, isFavourite: newIsFavourite } : recipe
          )
      );
      // Also update the selected recipe if it's the one being changed in the modal
       if (selectedRecipe && selectedRecipe.id === recipeId) {
            setSelectedRecipe(prev => prev ? { ...prev, isFavourite: newIsFavourite } : null);
       }
      // Show toast notification
      toast.success(`Recipe ${newIsFavourite ? 'added to' : 'removed from'} favourites.`);

  }, [selectedRecipe]); // Dependency on selectedRecipe


  // --- Modal Handlers ---
  const handleOpenModal = useCallback((recipe: Recipe) => {
    // Find the recipe in the current state which includes the isFavourite status
    const recipeFromState = userRecipes.find(r => r.id === recipe.id);
    const index = recipeFromState ? userRecipes.indexOf(recipeFromState) : -1;

    setSelectedRecipe(recipeFromState || { ...recipe, isFavourite: false }); // Use state version or fallback (assume false if not found)
    setCurrentIndex(index !== -1 ? index : null);
    setIsModalOpen(true);
  }, [userRecipes]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRecipe(null);
    setCurrentIndex(null);
  };

  // --- Modal Navigation Handlers ---
  const goToPreviousRecipe = () => {
    if (currentIndex !== null && currentIndex > 0) {
      const newIndex = currentIndex - 1;
      setSelectedRecipe(userRecipes[newIndex]);
      setCurrentIndex(newIndex);
    }
  };

  const goToNextRecipe = () => {
    if (currentIndex !== null && currentIndex < userRecipes.length - 1) {
      const newIndex = currentIndex + 1;
      setSelectedRecipe(userRecipes[newIndex]);
      setCurrentIndex(newIndex);
    }
  };

  const canGoPrevious = currentIndex !== null && currentIndex > 0;
  const canGoNext = currentIndex !== null && currentIndex < userRecipes.length - 1;


  // --- Render loading state ---
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <LoadingSpinner />
      </div>
    );
  }

  // --- Render error state ---
  if (error) {
     return <div className="text-red-600 p-4 text-center">Error loading recipes: {error}</div>;
  }

  // --- Render content ---
  return (
    <div className="p-4 bg-white rounded-lg shadow space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">My Recipes</h2>
      </div>

      {userRecipes.length === 0 ? (
        <div className="p-4 border rounded bg-gray-50 text-center text-gray-500">
            <p>Your created and imported recipes will appear here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center">
          {userRecipes.map(recipe => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe} // Pass the full recipe object including isFavourite
              onSelect={handleOpenModal}
              onFavouriteChange={handleFavouriteChange}
            />
          ))}
        </div>
      )}

       {/* Recipe Detail Modal */}
       {selectedRecipe && isModalOpen && (
        <RecipeDetailModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          recipe={selectedRecipe} // Pass selected recipe with its favourite status
          onFavouriteChange={handleFavouriteChange} // Pass correct handler
          onGoToPrevious={goToPreviousRecipe}
          onGoToNext={goToNextRecipe}
          canGoPrevious={canGoPrevious}
          canGoNext={canGoNext}
        />
      )}
    </div>
  );
};

export default UserRecipes;