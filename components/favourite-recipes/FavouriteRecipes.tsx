'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation'; // Added if needed, e.g., for create recipe nav
import toast from 'react-hot-toast';
import type { Album as PrismaAlbum, RecipeToAlbum, Recipe as PrismaRecipe } from '@prisma/client';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

import LoadingSpinner from '@/components/shared/LoadingSpinner';
import RecipeCard from '@/components/recipe/RecipeCard';
import { Recipe } from '@/lib/types/recipe'; // Ensure this type uses 'isFavourite' if necessary
import AlbumManager from '@/components/albums/AlbumManager';
import AlbumDetailsView from '@/components/albums/AlbumDetailsView';
import MyRecipesView from '@/components/my-recipes/MyRecipesView';

// Define the type for the fetched favourite recipe, ensuring it includes isFavourite
type FavouriteRecipe = Recipe & { isFavourite?: boolean }; // Allow optional for consistency

// Define the type for the fetched album data using Prisma aliases
type FetchedAlbum = PrismaAlbum & {
  recipes: (RecipeToAlbum & {
    recipe: PrismaRecipe;
  })[];
};

type ViewMode = 'allFavourites' | 'allAlbums' | 'albumDetails' | 'myRecipes';

interface FavouriteRecipesProps { // Keeping original name used by parent component for now
  onBack: () => void;
  onAlbumUpdate: () => void;
  albumRefreshTrigger: number;
}

export default function FavouriteRecipes({ // Keeping original name
  onBack,
  onAlbumUpdate,
  albumRefreshTrigger
}: FavouriteRecipesProps) {
  const router = useRouter();
  const { status } = useSession(); // Get session data
  const [favouriteRecipes, setFavouriteRecipes] = useState<FavouriteRecipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<ViewMode>('allFavourites');
  const [selectedAlbum, setSelectedAlbum] = useState<FetchedAlbum | null>(null);

  // Fetch favourites when component mounts or session status changes
  useEffect(() => {
    console.log("--- FavouriteRecipes useEffect triggered ---"); // Log effect start
    const fetchFavourites = async () => {
      console.log(`fetchFavourites called. Session status: ${status}`); // Log status inside async function
      // Only fetch if authenticated
      if (status === 'authenticated') {
        setIsLoading(true);
        console.log("Status is authenticated. Attempting fetch..."); // Log before fetch
        try {
          // Use the updated API path
          const response = await fetch('/api/recipes/favourites');
          console.log(`Fetch response status: ${response.status}`); // Log response status
          if (!response.ok) {
            throw new Error('Failed to fetch favourite recipes');
          }
          const data = await response.json();
          // Map data, ensuring isFavourite is set (should be true from this endpoint)
          const recipesWithFavouriteStatus = data.map((recipe: Recipe) => ({
            ...recipe,
            // Explicitly set isFavourite based on API or default to true for this view
            isFavourite: recipe.isFavourite !== undefined ? recipe.isFavourite : true,
          }));
          setFavouriteRecipes(recipesWithFavouriteStatus);
        } catch (err) {
          console.error('Error fetching favourite recipes:', err);
          toast.error("Could not load favourites.");
        } finally {
          setIsLoading(false);
        }
      } else if (status === 'unauthenticated') {
        // Clear data if user logs out or is not logged in
        console.log("Status is unauthenticated. Clearing data."); // Log unauthenticated case
        setIsLoading(false);
        setFavouriteRecipes([]);
      } else {
        console.log(`Status is ${status}. Waiting...`); // Log other statuses (e.g., loading)
      }
      // If status is 'loading', do nothing, wait for it to resolve
    };

    fetchFavourites();
  }, [status]); // Dependency array includes session status

  // --- Render loading state ---
  if (status === 'loading' || isLoading) {
    return (
      <div className="w-full py-12 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  // --- Render unauthenticated state ---
  if (status === 'unauthenticated') {
    return (
      <div className="w-full py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Please sign in to view your favourite recipes
            </h2>
            {/* Optionally add a sign-in button here */}
          </div>
        </div>
      </div>
    );
  }

  // --- Button Handlers ---
  const handleBackClick = () => {
    if (viewMode === 'albumDetails') {
      setViewMode('allAlbums');
      setSelectedAlbum(null);
    } else if (viewMode === 'allAlbums' || viewMode === 'myRecipes') {
      // If coming from Albums or My Recipes, go back to All Favourites view
      setViewMode('allFavourites');
    } else {
      // If already in All Favourites, trigger the onBack prop (likely goes to home)
      setViewMode('allFavourites'); // Reset just in case
      setSelectedAlbum(null);
      onBack(); // Call the function passed from parent (e.g., navigate home)
    }
  };

  const handleViewAlbumDetails = (album: FetchedAlbum) => {
    console.log("Viewing album details:", album);
    setSelectedAlbum(album);
    setViewMode('albumDetails');
  };

  const handleCreateRecipeClick = () => {
    // Navigate to the dedicated create recipe page
    router.push('/create-recipe');
  };

  const handleFavouriteChange = (recipeId: string, newIsFavourite: boolean) => {
    let updatedRecipes = favouriteRecipes;
    if (!newIsFavourite) {
      updatedRecipes = favouriteRecipes.filter(recipe => recipe.id !== recipeId);
      setFavouriteRecipes(updatedRecipes);
      toast.success("Removed from favourites");
    } else {
      updatedRecipes = favouriteRecipes.map(recipe =>
        recipe.id === recipeId ? { ...recipe, isFavourite: true } : recipe
      );
      setFavouriteRecipes(updatedRecipes);
       toast.success("Added to favourites");
    }
  };

  // --- Main Render ---
  return (
    <div className="w-full py-12 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back button (conditionally rendered or always points home?) */}
        {/* Using the logic from handleBackClick */}
        <div className="relative">
          <button
            onClick={handleBackClick}
            className="absolute -left-2 -top-2 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200 flex items-center justify-center group"
            aria-label="Go back"
          >
            <ArrowLeftIcon className="h-6 w-6 text-gray-600 group-hover:text-gray-800" />
          </button>
        </div>

        {/* Title Section */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            {viewMode === 'allFavourites' && 'Favourite Recipes'}
            {viewMode === 'allAlbums' && 'Recipe Albums'}
            {viewMode === 'albumDetails' && selectedAlbum?.name}
            {viewMode === 'myRecipes' && 'My Created Recipes'}
          </h1>
        </div>

        {/* View Mode Tabs (only if not showing album details) */}
        {viewMode !== 'albumDetails' && (
          <div className="flex justify-center mb-8">
            <div className="flex space-x-1 rounded-xl bg-gray-200 p-1">
              {/* All Favourites Button */}
              <button
                className={`${viewMode === 'allFavourites'
                  ? 'bg-white text-black shadow'
                  : 'text-gray-600 hover:text-gray-800'
                  } px-4 py-2 rounded-lg transition-colors duration-200`}
                onClick={() => setViewMode('allFavourites')}
              >
                All Favourites
              </button>
              {/* Albums Button */}
              <button
                className={`${viewMode === 'allAlbums'
                  ? 'bg-white text-black shadow'
                  : 'text-gray-600 hover:text-gray-800'
                  } px-4 py-2 rounded-lg transition-colors duration-200`}
                onClick={() => setViewMode('allAlbums')}
              >
                Albums
              </button>
              {/* My Recipes Button */}
              <button
                className={`${viewMode === 'myRecipes'
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

        {/* Content Area based on View Mode */}
        <div className="mt-8">
          {/* All Favourites View */}
          {viewMode === 'allFavourites' && (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center">
              {favouriteRecipes.length > 0 ? (
                favouriteRecipes.map((recipe) => (
                  <div key={recipe.id} className="w-72">
                    <RecipeCard
                      recipe={recipe}
                      onFavouriteChange={handleFavouriteChange}
                    />
                  </div>
                ))
              ) : (
                <p className="col-span-full text-center text-gray-500 py-8">
                  You haven&apos;t added any favourite recipes yet.
                </p>
              )}
              </div>
          )}

          {/* Albums View */}
          {viewMode === 'allAlbums' && (
            <AlbumManager
              onViewAlbum={handleViewAlbumDetails}
              refreshTrigger={albumRefreshTrigger}
            />
          )}

          {/* Album Details View */}
          {viewMode === 'albumDetails' && selectedAlbum && (
            <AlbumDetailsView
              album={selectedAlbum}
              onBack={() => setViewMode('allAlbums')}
              onAlbumUpdate={onAlbumUpdate}
            />
          )}

          {/* My Recipes View */}
          {viewMode === 'myRecipes' && (
            <MyRecipesView onCreateClick={handleCreateRecipeClick} />
          )}
        </div>
      </div>
    </div>
  );
}