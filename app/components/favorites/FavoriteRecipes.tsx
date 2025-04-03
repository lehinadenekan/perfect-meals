'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import LoadingSpinner from '../shared/LoadingSpinner';
import RecipeCard from '@/app/components/recipe/RecipeCard';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import FlagSubmission from '../recipe/FlagSubmission';
import { Recipe as AppRecipe } from '@/app/types/recipe';
import AlbumManager from '../albums/AlbumManager';
import type { Album as PrismaAlbum, RecipeToAlbum, Recipe } from '@prisma/client';
import AlbumDetailsView from '../albums/AlbumDetailsView';
import { useRouter } from 'next/navigation';
import MyRecipesView from '../my-recipes/MyRecipesView';

// Define the type for the fetched album data, including the nested recipe relation
// (Mirrors the definition in AlbumManager.tsx)
type FetchedAlbum = PrismaAlbum & {
  recipes: (RecipeToAlbum & {
    recipe: Recipe;
  })[];
};

// Rename original Recipe type alias to avoid conflict if needed, or remove if AppRecipe is sufficient
type FavoriteRecipe = AppRecipe;

type ViewMode = 'allFavorites' | 'allAlbums' | 'albumDetails' | 'myRecipes';

interface FavoriteRecipesProps {
  onBack: () => void;
  onAlbumUpdate: () => void;
  albumRefreshTrigger: number;
}

export default function FavoriteRecipes({ 
  onBack, 
  onAlbumUpdate, 
  albumRefreshTrigger 
}: FavoriteRecipesProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const [favoriteRecipes, setFavoriteRecipes] = useState<FavoriteRecipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [flaggedRecipe, setFlaggedRecipe] = useState<FavoriteRecipe | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('allFavorites');
  const [selectedAlbum, setSelectedAlbum] = useState<FetchedAlbum | null>(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!session?.user?.id) return;
      setIsLoading(true);
      try {
        const response = await fetch('/api/recipes/favorites');
        if (!response.ok) throw new Error('Failed to fetch favorites');
        const data = await response.json();
        setFavoriteRecipes(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Error fetching favorite recipes:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFavorites();
  }, [session]);

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

  const handleBackClick = () => {
    if (viewMode === 'albumDetails') {
      setViewMode('allAlbums');
      setSelectedAlbum(null);
    } else if (viewMode === 'allAlbums' || viewMode === 'myRecipes') {
       setViewMode('allFavorites');
    } else {
      setViewMode('allFavorites');
      setSelectedAlbum(null);
      onBack();
    }
  };

  const handleViewAlbumDetails = (album: FetchedAlbum) => {
    console.log("Viewing album details:", album);
    setSelectedAlbum(album);
    setViewMode('albumDetails');
  };

  const handleCreateRecipeClick = () => {
    router.push('/recipes/create');
  };

  return (
    <div className="w-full py-12 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative">
          <button
            onClick={handleBackClick}
            className="absolute -left-2 -top-2 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200 flex items-center justify-center group"
            aria-label="Go back"
          >
            <ArrowLeftIcon className="h-6 w-6 text-gray-600 group-hover:text-gray-800" />
          </button>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            {viewMode === 'allFavorites' && 'Favourite Recipes'}
            {viewMode === 'allAlbums' && 'Recipe Albums'}
            {viewMode === 'albumDetails' && selectedAlbum?.name}
            {viewMode === 'myRecipes' && 'My Created Recipes'}
          </h1>
        </div>

        {viewMode !== 'albumDetails' && (
           <div className="flex justify-center mb-8">
            <div className="flex space-x-1 rounded-xl bg-gray-200 p-1">
              <button
                className={`${
                  viewMode === 'allFavorites'
                    ? 'bg-white text-black shadow'
                    : 'text-gray-600 hover:text-gray-800'
                } px-4 py-2 rounded-lg transition-colors duration-200`}
                onClick={() => setViewMode('allFavorites')}
              >
                All Favorites
              </button>
              <button
                className={`${
                  viewMode === 'allAlbums'
                    ? 'bg-white text-black shadow'
                    : 'text-gray-600 hover:text-gray-800'
                } px-4 py-2 rounded-lg transition-colors duration-200`}
                onClick={() => setViewMode('allAlbums')}
              >
                Albums
              </button>
              <button
                className={`${
                  viewMode === 'myRecipes'
                    ? 'bg-white text-black shadow'
                    : 'text-gray-600 hover:text-gray-800'
                } px-4 py-2 rounded-lg transition-colors duration-200`}
                onClick={() => setViewMode('myRecipes')}
              >
                My Recipes
              </button>
            </div>
          </div>
        )}

        <div className="mt-6 w-full">
          {viewMode === 'allFavorites' && (
            favoriteRecipes.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-lg text-gray-800">
                  You haven&apos;t saved any recipes as favourites yet.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center">
                {favoriteRecipes.map(recipe => (
                  <div key={recipe.id}> 
                    <RecipeCard 
                      recipe={recipe} 
                      onFlagClick={() => setFlaggedRecipe(recipe)}
                      onAlbumUpdate={onAlbumUpdate}
                    />
                  </div>
                ))}
              </div>
            )
          )}

          {viewMode === 'allAlbums' && (
            <AlbumManager 
              refreshTrigger={albumRefreshTrigger}
              onViewAlbum={handleViewAlbumDetails}
            />
          )}

          {viewMode === 'albumDetails' && selectedAlbum && (
            <AlbumDetailsView
              album={selectedAlbum}
              onBack={() => setViewMode('allAlbums')}
              onAlbumUpdate={onAlbumUpdate}
            />
          )}

          {viewMode === 'myRecipes' && (
            <MyRecipesView onCreateClick={handleCreateRecipeClick} />
          )}
        </div>
      </div>

      {flaggedRecipe && (
        <FlagSubmission
          recipe={flaggedRecipe}
          onBack={() => setFlaggedRecipe(null)}
        />
      )}
    </div>
  );
} 