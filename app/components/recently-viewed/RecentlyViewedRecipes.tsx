'use client'; // Need client component for localStorage and hooks

import React, { useState, useEffect } from 'react';
import RecipeCard from '../recipe/RecipeCard';
import { getRecentlyViewed } from '@/app/utils/recentlyViewed';
import LoadingSpinner from '../shared/LoadingSpinner'; // Assuming exists
import { Recipe } from '@/app/types/recipe'; // Import the actual Recipe type RecipeCard uses

interface RecentlyViewedRecipesProps {
  onBack: () => void;
  onAlbumUpdate: () => void; // Pass this down to RecipeCard
}

export default function RecentlyViewedRecipes({ onBack, onAlbumUpdate }: RecentlyViewedRecipesProps) {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch from localStorage on mount
    const viewedRecipes = getRecentlyViewed();
    setRecipes(viewedRecipes);
    setIsLoading(false);
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="flex items-center mb-6">
        <button
          onClick={onBack}
          className="mr-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Back"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
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
                onAlbumUpdate={onAlbumUpdate}
                // Add other necessary props like onFlagClick if needed
                // onFlagClick={() => { /* Handle flagging? */ }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 