'use client'; // Need client component for localStorage and hooks

import React, { useState, useEffect } from 'react';
import RecipeCard from '../recipe/RecipeCard';
// import RecipeDetailModal from '../recipe/RecipeDetailModal'; // Removed import
import { getRecentlyViewed } from '@/lib/utils/recentlyViewed';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import { Recipe } from '@/lib/types/recipe'; // Import the actual Recipe type RecipeCard uses
import { ArrowLeftIcon } from '@heroicons/react/24/outline'; // Correct import for outline icon

// In components/recently-viewed/RecentlyViewedRecipes.tsx
interface RecentlyViewedRecipesProps {
  // onRecipeSelect?: (recipe: Recipe) => void; // Removed prop
  onAlbumUpdate: () => void;
  onBack: () => void;
}

// Define state type, including optional isFavourite
type RecentlyViewedRecipe = Recipe & { isFavourite?: boolean };

export default function RecentlyViewedRecipes({
  // onRecipeSelect: _onRecipeSelect, // Removed parameter
  onAlbumUpdate: _onAlbumUpdate,
  onBack
}: RecentlyViewedRecipesProps) {
  // Local state to manage recipes and their favourite status within this view
  const [recipes, setRecipes] = useState<RecentlyViewedRecipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // --- Removed State for Modal Control ---
  // const [selectedRecipe, setSelectedRecipe] = useState<RecentlyViewedRecipe | null>(null);
  // const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Fetch from localStorage on mount
    const viewedRecipes: Recipe[] = getRecentlyViewed(); // Get base recipes
    // Initialize state - isFavourite will be undefined initially
    setRecipes(viewedRecipes.map(r => ({ ...r, isFavourite: undefined })));
    setIsLoading(false);
  }, []);

  // --- Callback for Favourite Changes ---
  const handleFavouriteChange = (recipeId: string, newIsFavourite: boolean) => {
    setRecipes(currentRecipes =>
      currentRecipes.map(recipe =>
        recipe.id === recipeId
          ? { ...recipe, isFavourite: newIsFavourite }
          : recipe
      )
    );
    // Removed update logic for selectedRecipe in modal
    // if (selectedRecipe && selectedRecipe.id === recipeId) {
    //   setSelectedRecipe(prev => prev ? { ...prev, isFavourite: newIsFavourite } : null);
    // }
  };

  // --- Removed Modal Handlers ---
  // const handleOpenModal = (recipe: Recipe) => {
  //   const currentRecipeData = recipes.find(r => r.id === recipe.id);
  //   setSelectedRecipe(currentRecipeData || { ...recipe, isFavourite: undefined }); 
  //   setIsModalOpen(true);
  // };

  // const handleCloseModal = () => {
  //   setIsModalOpen(false);
  //   setSelectedRecipe(null);
  // };

  return (
    <>
      <div className="w-full max-w-6xl mx-auto">
        <div className="flex items-center mb-6">
          <button
            onClick={onBack} // Use the onBack prop for the button's click handler
            className="mr-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Back"
          >
            <ArrowLeftIcon className="w-6 h-6" />
          </button>
          <h1 className="text-3xl font-bold">Recently Viewed Recipes</h1>
        </div>

        {isLoading ? (
          <div className="flex justify-center mt-10"><LoadingSpinner /></div>
        ) : recipes.length === 0 ? (
          <p className="text-center text-gray-500 py-8">You haven&apos;t viewed any recipes recently.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center">
            {recipes.map((recipeData) => (
              <div key={recipeData.id} className="w-72">
                <RecipeCard
                  recipe={recipeData}
                  // onSelect={handleOpenModal} // Removed prop
                  onFavouriteChange={handleFavouriteChange}
                  // Note: onAlbumUpdate prop is not passed to RecipeCard here
                  // as RecipeCard now handles the modal internally.
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Removed RecipeDetailModal rendering */}
      {/* {selectedRecipe && (
        <RecipeDetailModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          recipe={selectedRecipe as Recipe}
          onFavouriteChange={handleFavouriteChange}
        />
      )} */}
    </>
  );
}