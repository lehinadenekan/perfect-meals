'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import RecipeCard from '@/app/components/recipe/RecipeCard';
import LoadingSpinner from '@/app/components/shared/LoadingSpinner';
import { Recipe } from '@/app/types/recipe'; // Assuming this type covers necessary fields
import { PlusCircleIcon } from '@heroicons/react/24/outline';

interface MyRecipesViewProps {
  onCreateClick: () => void;
}

export default function MyRecipesView({ onCreateClick }: MyRecipesViewProps) {
  const { data: session } = useSession();
  const [myRecipes, setMyRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMyRecipes = async () => {
      if (!session?.user?.id) {
        // No user session, maybe show a message or handle appropriately
        // For now, we might just not load anything or wait for session
        setIsLoading(false); // Stop loading if no session
        return;
      }
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch('/api/recipes/my-recipes');
        if (!response.ok) {
          throw new Error(`Failed to fetch recipes: ${response.statusText}`);
        }
        const data = await response.json();
        setMyRecipes(Array.isArray(data) ? data : []);
      } catch (err: unknown) {
        console.error("Error fetching user's recipes:", err);
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unexpected error occurred.');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchMyRecipes();
  }, [session]); // Re-fetch if session changes

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 text-red-600">
        <p>Error loading your recipes: {error}</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Button positioned at the top-right of the grid area */}
      <div className="flex justify-end mb-6">
        <button
          onClick={onCreateClick}
          className="inline-flex items-center gap-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-colors"
        >
          <PlusCircleIcon className="h-5 w-5" />
          Create New Recipe
        </button>
      </div>

      {myRecipes.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg text-gray-800">
            You haven&apos;t created any recipes yet.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center">
          {myRecipes.map(recipe => (
            <div key={recipe.id}>
              <RecipeCard
                recipe={recipe}
                // Add relevant props if RecipeCard needs them for user-created recipes
                // e.g., onEditClick, onDeleteClick - requires further implementation
                // For now, onFlagClick might not be relevant, and onAlbumUpdate either
                // We might need a different variant of RecipeCard or conditional props later
                onFlagClick={() => { /* Maybe disable/hide for own recipes */ }}
                onAlbumUpdate={() => { /* Maybe disable/hide for own recipes */ }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 