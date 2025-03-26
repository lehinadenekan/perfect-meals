'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import LoadingSpinner from '@/app/components/shared/LoadingSpinner';
import RecipeCard from '@/app/components/recipe/RecipeCard';
import { Recipe as AppRecipe } from '@/app/types/recipe';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

interface Recipe extends Partial<AppRecipe> {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  cookingTime: number;
  difficulty: string;
}

interface FavoriteRecipesProps {
  isVisible: boolean;
  onBack: () => void;
}

export default function FavoriteRecipes({ isVisible, onBack }: FavoriteRecipesProps) {
  const { data: session } = useSession();
  const [favoriteRecipes, setFavoriteRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFavoriteRecipes = async () => {
      if (!isVisible || !session?.user?.email) return;
      
      try {
        setIsLoading(true);
        const response = await fetch('/api/recipes/favorites');
        if (!response.ok) throw new Error('Failed to fetch favorite recipes');
        const data = await response.json();
        setFavoriteRecipes(data);
      } catch (error) {
        console.error('Error fetching favorite recipes:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFavoriteRecipes();
  }, [isVisible, session?.user?.email]);

  if (!isVisible) return null;

  if (!session) {
    return (
      <div className="w-full py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Please sign in to view your favourite recipes
            </h2>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="w-full py-12 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="w-full py-12 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative">
          <button
            onClick={onBack}
            className="absolute -left-2 -top-2 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200 flex items-center justify-center group"
            aria-label="Go back"
          >
            <ArrowLeftIcon className="h-6 w-6 text-gray-600 group-hover:text-gray-800" />
          </button>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-2xl font-bold text-gray-900">
            Favourite Recipes
          </h1>
        </div>

        {favoriteRecipes.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-gray-800">
              You haven&apos;t saved any recipes as favourites yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center">
            {favoriteRecipes.map(recipe => (
              <RecipeCard key={recipe.id} recipe={recipe as unknown as import('@/app/types/recipe').Recipe} isLoggedIn={true} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 