import React from 'react';
import { Recipe } from '@/app/types/recipe';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import LoadingSpinner from '../shared/LoadingSpinner';
import RecipeCard from '../recipe/RecipeCard';

interface SearchResultsProps {
  searchTerm: string;
  recipes: Recipe[];
  isLoading: boolean;
  onBackToPreferences: () => void;
  onGenerateMore: () => void;
  onAlbumUpdate: () => void;
}

export default function SearchResults({
  searchTerm,
  recipes,
  isLoading,
  onBackToPreferences,
  onGenerateMore,
  onAlbumUpdate,
}: SearchResultsProps) {
  return (
    <div className="w-full py-12 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative">
          <button
            onClick={onBackToPreferences}
            className="absolute -left-2 -top-2 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200 flex items-center justify-center group"
            aria-label="Go back"
          >
            <ArrowLeftIcon className="h-6 w-6 text-gray-600 group-hover:text-gray-800" />
          </button>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-2xl font-bold text-gray-900">
            Search Results: {searchTerm}
          </h1>
        </div>

        {isLoading ? (
          <div className="w-full py-12 flex items-center justify-center">
            <LoadingSpinner />
          </div>
        ) : recipes.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-gray-800">
              No recipes found. Try a different search term.
            </p>
            <button
              onClick={onBackToPreferences}
              className="mt-4 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors duration-200"
            >
              Back to Preferences
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center">
            {recipes.map(recipe => (
              <RecipeCard 
                key={recipe.id} 
                recipe={recipe} 
                onAlbumUpdate={onAlbumUpdate}
              />
            ))}
          </div>
        )}

        {recipes.length > 0 && (
          <div className="flex justify-center mt-8">
            <button
              onClick={onGenerateMore}
              className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors duration-200"
            >
              Generate More Recipes
            </button>
          </div>
        )}
      </div>
    </div>
  );
} 