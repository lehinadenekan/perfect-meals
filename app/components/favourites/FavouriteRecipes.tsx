'use client';

import React, { useState, useEffect} from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation'; // Added if needed, e.g., for create recipe nav
import toast from 'react-hot-toast';
import type { Album as PrismaAlbum, RecipeToAlbum, Recipe as PrismaRecipe } from '@prisma/client';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

import LoadingSpinner from '../shared/LoadingSpinner';
import RecipeCard from '@/app/components/recipe/RecipeCard';
import FlagSubmission from '../recipe/FlagSubmission';
import { Recipe } from '@/lib/types/recipe'; // Ensure this type uses 'isFavourite' if necessary
import AlbumManager from '../albums/AlbumManager';
import AlbumDetailsView from '../albums/AlbumDetailsView';
import MyRecipesView from '../my-recipes/MyRecipesView';
import RecipeDetailModal from '@/app/components/recipe/RecipeDetailModal';

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
  const [flaggedRecipe, setFlaggedRecipe] = useState<FavouriteRecipe | null>(null);
  // Default to 'allFavourites', but maybe change based on where user came from?
  const [viewMode, setViewMode] = useState<ViewMode>('allFavourites');
  const [selectedAlbum, setSelectedAlbum] = useState<FetchedAlbum | null>(null);

  // --- State for Modal Control ---
  const [selectedRecipe, setSelectedRecipe] = useState<FavouriteRecipe | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch favourites when component mounts or session status changes
  useEffect(() => {
    const fetchFavourites = async () => {
      // Only fetch if authenticated
      if (status === 'authenticated') {
        setIsLoading(true);
        try {
          // Use the updated API path
          const response = await fetch('/api/recipes/favourites');
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
        setIsLoading(false);
        setFavouriteRecipes([]);
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

  // --- Callback for Favourite Changes (e.g., from RecipeCard or Modal) ---
  const handleFavouriteChange = (recipeId: string, newIsFavourite: boolean) => {
    let updatedRecipes = favouriteRecipes;
    if (!newIsFavourite) {
      // Remove from favourites list locally
      updatedRecipes = favouriteRecipes.filter(recipe => recipe.id !== recipeId);
      setFavouriteRecipes(updatedRecipes);

      // If the removed recipe was open in the modal, close it
      if (selectedRecipe && selectedRecipe.id === recipeId) {
        handleCloseModal();
      }
      // Adjust index if item before current index was removed
      else if (currentIndex !== null) {
        const originalIndex = favouriteRecipes.findIndex(r => r.id === recipeId);
        if (originalIndex !== -1 && originalIndex < currentIndex) {
          setCurrentIndex(currentIndex - 1);
        }
      }
      toast.success("Removed from favourites");
    } else {
      // Add to favourites (or update status if needed) - less likely in this specific view
      updatedRecipes = favouriteRecipes.map(recipe =>
        recipe.id === recipeId ? { ...recipe, isFavourite: true } : recipe
      );
      // If adding, maybe fetch the recipe details if not fully present?
      // For now, just update state, assuming recipe object is sufficient
      setFavouriteRecipes(updatedRecipes);
       toast.success("Added to favourites");
    }
  };

  // --- Modal Handlers ---
  const handleOpenModal = (recipe: Recipe) => {
    // Find the recipe in the current state to ensure we have isFavourite status
    const recipeFromState = favouriteRecipes.find(r => r.id === recipe.id);
    if (recipeFromState) {
      const index = favouriteRecipes.indexOf(recipeFromState);
      setSelectedRecipe(recipeFromState);
      setCurrentIndex(index);
      setIsModalOpen(true);
    } else {
      // Fallback: If somehow not found, open with basic data + assume favourite
      console.warn("Recipe not found in local favourites state, opening modal with basic data.");
      setSelectedRecipe({ ...recipe, isFavourite: true });
      setCurrentIndex(null); // Can't guarantee index
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRecipe(null);
    setCurrentIndex(null);
  };

  // --- Modal Navigation Handlers ---
  const goToPreviousRecipe = () => {
    if (currentIndex !== null && currentIndex > 0) {
      const newIndex = currentIndex - 1;
      setSelectedRecipe(favouriteRecipes[newIndex]);
      setCurrentIndex(newIndex);
    }
  };

  const goToNextRecipe = () => {
    if (currentIndex !== null && currentIndex < favouriteRecipes.length - 1) {
      const newIndex = currentIndex + 1;
      setSelectedRecipe(favouriteRecipes[newIndex]);
      setCurrentIndex(newIndex);
    }
  };

  const canGoPrevious = currentIndex !== null && currentIndex > 0;
  const canGoNext = currentIndex !== null && currentIndex < favouriteRecipes.length - 1;

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
        <div className="mt-6 w-full">
          {/* All Favourites View */}
          {viewMode === 'allFavourites' && (
            favouriteRecipes.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-lg text-gray-800">
                  You haven&apos;t saved any recipes as favourites yet.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center">
                {favouriteRecipes.map(recipe => (
                  <div key={recipe.id}>
                    <RecipeCard
                      recipe={recipe} // Pass the recipe with isFavourite status
                      onFlagClick={() => setFlaggedRecipe(recipe)}
                      onAlbumUpdate={onAlbumUpdate}
                      onSelect={handleOpenModal}
                      onFavouriteChange={handleFavouriteChange} // Pass the correct handler
                    />
                  </div>
                ))}
              </div>
            )
          )}

          {/* All Albums View */}
          {viewMode === 'allAlbums' && (
            <AlbumManager
              refreshTrigger={albumRefreshTrigger}
              onViewAlbum={handleViewAlbumDetails}
            />
          )}

          {/* Album Details View */}
          {viewMode === 'albumDetails' && selectedAlbum && (
            <AlbumDetailsView
              album={selectedAlbum}
              onBack={() => { // Go back to all albums view
                  setViewMode('allAlbums');
                  setSelectedAlbum(null);
              }}
              onAlbumUpdate={onAlbumUpdate}
            />
          )}

          {/* My Recipes View */}
          {viewMode === 'myRecipes' && (
            <MyRecipesView onCreateClick={handleCreateRecipeClick} />
          )}
        </div>
      </div>

      {/* Modals */}
      {/* Flag Submission Modal */}
      {flaggedRecipe && (
        <FlagSubmission
          recipe={flaggedRecipe}
          onBack={() => setFlaggedRecipe(null)}
        />
      )}

      {/* Recipe Detail Modal */}
      {selectedRecipe && isModalOpen && (
        <RecipeDetailModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          recipe={selectedRecipe} // Pass the selected recipe with status
          onFavouriteChange={handleFavouriteChange} // Pass correct handler
          onGoToPrevious={goToPreviousRecipe}
          onGoToNext={goToNextRecipe}
          canGoPrevious={canGoPrevious}
          canGoNext={canGoNext}
        />
      )}
    </div>
  );
}