// components/my-recipes/UserRecipes.tsx
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';

import LoadingSpinner from '@/components/shared/LoadingSpinner';
import RecipeCard from '@/components/recipe/RecipeCard';
import { Recipe } from '@/lib/types/recipe';
// import RecipeDetailModal from '@/components/recipe/RecipeDetailModal'; // Removed import

// Removed UserRecipesProps interface

// Define type for fetched user recipe (includes isFavourite status from API)
type UserRecipe = Recipe & { isFavourite: boolean };

const UserRecipes: React.FC = () => {
  const { status } = useSession();
  const [userRecipes, setUserRecipes] = useState<UserRecipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // --- Removed Modal State ---
  // const [selectedRecipe, setSelectedRecipe] = useState<UserRecipe | null>(null);
  // const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  // const [isModalOpen, setIsModalOpen] = useState(false);

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

  useEffect(() => {
    fetchUserRecipes();
  }, [fetchUserRecipes]);

  // --- Callback for Favourite Changes ---
  const handleFavouriteChange = useCallback((recipeId: string, newIsFavourite: boolean) => {
    setUserRecipes((prevRecipes) =>
      prevRecipes.map((recipe) =>
        recipe.id === recipeId ? { ...recipe, isFavourite: newIsFavourite } : recipe
      )
    );
    // Removed update logic for selectedRecipe
    // if (selectedRecipe && selectedRecipe.id === recipeId) { ... }
    toast.success(`Recipe ${newIsFavourite ? 'added to' : 'removed from'} favourites.`);
    // Removed selectedRecipe dependency
  }, []);

  // --- Removed Modal Handlers & Navigation Logic ---
  // const handleOpenModal = useCallback(...);
  // const handleCloseModal = () => { ... };
  // const goToPreviousRecipe = () => { ... };
  // const goToNextRecipe = () => { ... };
  // const canGoPrevious = ...;
  // const canGoNext = ...;

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
            <div key={recipe.id} className="w-72"> {/* Added wrapper div */}
              <RecipeCard
                key={recipe.id} // key should be on wrapper
                recipe={recipe}
                // onSelect={handleOpenModal} // Removed prop
                onFavouriteChange={handleFavouriteChange}
              />
            </div>
          ))}
        </div>
      )}

      {/* Removed Recipe Detail Modal */}
      {/* {selectedRecipe && isModalOpen && ( ...modal jsx... )} */}
    </div>
  );
};

export default UserRecipes;