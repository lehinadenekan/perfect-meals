// components/favourite-recipes/UserFavourites.tsx
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';

import LoadingSpinner from '@/components/shared/LoadingSpinner';
import RecipeCard from '@/components/recipe/RecipeCard';
import { Recipe } from '@/lib/types/recipe';

// Define the type for the fetched favourite recipe, including isFavourite
type FavouriteRecipe = Recipe & { isFavourite: boolean }; // isFavourite should always be true here

export default function UserFavourites() {
  const { status } = useSession();
  const [favouriteRecipes, setFavouriteRecipes] = useState<FavouriteRecipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // --- Fetch Favourites Logic ---
  const fetchFavourites = useCallback(async () => {
    if (status === 'authenticated') {
      setIsLoading(true);
      console.log("UserFavourites: Status is authenticated. Attempting fetch...");
      try {
        const response = await fetch('/api/recipes/favourites'); // GET request

        console.log(`UserFavourites: Fetch response status: ${response.status}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch favourite recipes: ${response.status}`);
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
        console.error('UserFavourites: Error fetching favourite recipes:', err);
        toast.error("Could not load your favourite recipes.");
        setFavouriteRecipes([]); // Clear on error
      } finally {
        setIsLoading(false);
      }
    } else {
      setFavouriteRecipes([]);
      setIsLoading(status === 'loading');
    }
  }, [status]);

  useEffect(() => {
    console.log("--- UserFavourites useEffect triggered ---");
    fetchFavourites();
  }, [fetchFavourites]);

  // --- Callback for Favourite Changes ---
  const handleFavouriteChange = useCallback((recipeId: string, newIsFavourite: boolean) => {
    if (!newIsFavourite) {
      setFavouriteRecipes((prevRecipes) => prevRecipes.filter(recipe => recipe.id !== recipeId));
      toast.success("Removed from favourites");
    } else {
      toast.success("Added back to favourites");
      fetchFavourites(); // Re-fetch the whole list
    }
  }, [fetchFavourites]);

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
      <h2 className="text-xl font-semibold mb-4">Favourite Recipes</h2>
      {favouriteRecipes.length === 0 ? (
        <p className="text-gray-600">Your favourite recipes will appear here.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center">
          {favouriteRecipes.map(recipe => (
            <div key={recipe.id} className="w-72">
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                onFavouriteChange={handleFavouriteChange}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}