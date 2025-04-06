'use client'; // Need client component for localStorage and hooks

import React, { useState, useEffect } from 'react';
import RecipeCard from '../recipe/RecipeCard';
import RecipeDetailModal from '../recipe/RecipeDetailModal'; // Import modal
import { getRecentlyViewed } from '@/app/utils/recentlyViewed';
import LoadingSpinner from '../shared/LoadingSpinner'; // Assuming exists
import { Recipe } from '@/app/types/recipe'; // Import the actual Recipe type RecipeCard uses
import { ArrowLeftIcon } from '@heroicons/react/24/outline'; // Correct import for outline icon

interface RecentlyViewedRecipesProps {
  onBack: () => void;
  onAlbumUpdate: () => void; // Pass this down to RecipeCard
}

// Define state type, including optional isFavorite
type RecentlyViewedRecipe = Recipe & { isFavorite?: boolean };

export default function RecentlyViewedRecipes({ onBack, onAlbumUpdate }: RecentlyViewedRecipesProps) {
  // Local state to manage recipes and their favorite status within this view
  const [recipes, setRecipes] = useState<RecentlyViewedRecipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // --- State for Modal Control ---
  const [selectedRecipe, setSelectedRecipe] = useState<RecentlyViewedRecipe | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Fetch from localStorage on mount
    const viewedRecipes: Recipe[] = getRecentlyViewed(); // Get base recipes
    // Initialize state - isFavorite will be undefined initially
    setRecipes(viewedRecipes.map(r => ({ ...r, isFavorite: undefined })));
    setIsLoading(false);
  }, []);

  // --- Callback for Favorite Changes ---
  const handleFavoriteChange = (recipeId: string, newIsFavorite: boolean) => {
    setRecipes(currentRecipes =>
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
  const handleOpenModal = (recipe: Recipe) => { // Accept base Recipe type
    // Find the latest version from local state to get current favorite status (if known)
    const currentRecipeData = recipes.find(r => r.id === recipe.id);
    setSelectedRecipe(currentRecipeData || { ...recipe, isFavorite: undefined }); // Set selected, favorite status might be unknown initially
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRecipe(null);
  };

  return (
    <>
      <div className="w-full max-w-6xl mx-auto">
        <div className="flex items-center mb-6">
          <button
            onClick={onBack}
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
              <div key={recipeData.id}>
                <RecipeCard
                  recipe={recipeData}
                  onSelect={handleOpenModal}
                  onFavoriteChange={handleFavoriteChange}
                  onAlbumUpdate={onAlbumUpdate}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedRecipe && (
        <RecipeDetailModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          recipe={selectedRecipe as Recipe}
          onFavoriteChange={handleFavoriteChange}
        />
      )}
    </>
  );
} 