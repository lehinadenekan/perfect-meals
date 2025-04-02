'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import LoadingSpinner from '@/app/components/shared/LoadingSpinner';
import RecipeCard from '@/app/components/recipe/RecipeCard';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import FlagSubmission from '../recipe/FlagSubmission';
import { Recipe as AppRecipe } from '@/app/types/recipe';
import AlbumManager from '../albums/AlbumManager';

type Recipe = AppRecipe;

type Tab = 'all' | 'albums';

interface FavoriteRecipesProps {
  isVisible: boolean;
  onBack: () => void;
}

export default function FavoriteRecipes({ isVisible, onBack }: FavoriteRecipesProps) {
  const { data: session } = useSession();
  const [favoriteRecipes, setFavoriteRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [flaggedRecipe, setFlaggedRecipe] = useState<Recipe | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>('all');

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
      {/* Flag Submission Modal */}
      {flaggedRecipe && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4">
            <FlagSubmission
              recipe={flaggedRecipe}
              onBack={() => setFlaggedRecipe(null)}
            />
          </div>
        </div>
      )}

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

        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Favourite Recipes
          </h1>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-1 rounded-xl bg-gray-200 p-1">
            <button
              className={`${
                activeTab === 'all'
                  ? 'bg-white text-black shadow'
                  : 'text-gray-600 hover:text-gray-800'
              } px-4 py-2 rounded-lg transition-colors duration-200`}
              onClick={() => setActiveTab('all')}
            >
              All Favorites
            </button>
            <button
              className={`${
                activeTab === 'albums'
                  ? 'bg-white text-black shadow'
                  : 'text-gray-600 hover:text-gray-800'
              } px-4 py-2 rounded-lg transition-colors duration-200`}
              onClick={() => setActiveTab('albums')}
            >
              Albums
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'all' ? (
          favoriteRecipes.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-gray-800">
                You haven&apos;t saved any recipes as favourites yet.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center">
              {favoriteRecipes.map(recipe => (
                <RecipeCard 
                  key={recipe.id} 
                  recipe={recipe} 
                  isLoggedIn={true}
                  onFlagClick={() => setFlaggedRecipe(recipe)}
                />
              ))}
            </div>
          )
        ) : (
          <AlbumManager />
        )}
      </div>
    </div>
  );
} 