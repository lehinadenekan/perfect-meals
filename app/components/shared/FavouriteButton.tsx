// app/components/shared/FavouriteButton.tsx
'use client';

import { useState, useEffect, useMemo } from 'react';
import { useSession } from 'next-auth/react';
import { HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import toast from 'react-hot-toast';
import { useFavourites } from '../../context/FavouritesContext'; // <-- Import useFavourites

interface FavouriteButtonProps {
  recipeId: string;
  initialIsFavourite?: boolean; // Prop remains useful for initial render before context loads
  className?: string;
  onSuccess?: (recipeId: string, newIsFavourite: boolean) => void; // Keep onSuccess if needed elsewhere
}

export default function FavouriteButton({
  recipeId,
  initialIsFavourite = false, // Default to false if not provided
  className = '',
  onSuccess,
}: FavouriteButtonProps) {
  const { data: session } = useSession();
  const {
    favouriteIds,
    isLoading: favouritesLoading, // Loading state from context
    addFavouriteId,               // Function to add ID to context state
    removeFavouriteId,            // Function to remove ID from context state
  } = useFavourites();

  // State specifically for the API call in progress
  const [isUpdating, setIsUpdating] = useState(false); // Ensure this is false initially

  // Determine if the recipe is favourited based on context
  const isFavFromContext = useMemo(() => favouriteIds.includes(recipeId), [favouriteIds, recipeId]);

  // Use local state for optimistic UI, initialized by prop or context
  // This allows immediate UI feedback during the API call
  const [isOptimisticFavourite, setIsOptimisticFavourite] = useState(initialIsFavourite ?? isFavFromContext);

  // Sync optimistic state if the context or prop changes after initial render
  useEffect(() => {
    // Prioritize context state once loaded, otherwise use prop
    const authoritativeState = !favouritesLoading ? isFavFromContext : initialIsFavourite;
    setIsOptimisticFavourite(authoritativeState);
  }, [isFavFromContext, initialIsFavourite, favouritesLoading]);


  // --- REMOVED ---
  // Removed the useEffect that called checkIfFavourite and its isLoading state.
  // The favouritesLoading state from useFavourites handles the initial load indicator.
  // --- END REMOVED ---

  const handleClick = async () => {
    if (!session?.user?.email) {
      toast.error("Log In to add favourite recipes");
      return;
    }

    // Prevent clicking while an update is already in progress
    if (isUpdating) return;

    const previousIsFavourite = isOptimisticFavourite;

    // --- Optimistic UI Update ---
    setIsOptimisticFavourite(!previousIsFavourite);
    setIsUpdating(true); // Indicate API call started

    try {
      const response = await fetch('/api/recipes/favourites', { // Keep using the original POST endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          recipeId,
          action: !previousIsFavourite ? 'add' : 'remove', // Action based on optimistic state before click
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Failed to update favourite: ${response.status}`);
      }

      // --- Update Context on Success ---
      // This synchronizes the central state AFTER the API confirms success
      if (!previousIsFavourite) {
        addFavouriteId(recipeId);
      } else {
        removeFavouriteId(recipeId);
      }

      // Call external success handler if provided
      onSuccess?.(recipeId, !previousIsFavourite);

    } catch (error) {
      // --- Revert Optimistic UI on Error ---
      setIsOptimisticFavourite(previousIsFavourite);
      const message = error instanceof Error ? error.message : 'Failed to update favourite';
      console.error('Error updating favourite:', error);
      toast.error(message);
    } finally {
      setIsUpdating(false); // Indicate API call finished
    }
  };

  // Determine the actual displayed state
  // Show initial state if context is loading, otherwise show optimistic state
  const displayAsFavourite = favouritesLoading ? initialIsFavourite : isOptimisticFavourite;

  // Determine if the button should be visually disabled (styling)
  // Disable clicks if not logged in OR an update is happening OR the context is initially loading
  const isDisabled = !session || isUpdating || (favouritesLoading && !initialIsFavourite); // Refined disabled logic


  return (
    <button
      onClick={handleClick}
      disabled={isDisabled} // Disable based on session, update status, or initial load
      // --- START OF CHANGE ---
      className={`${className} p-1.5 rounded-full transition-all transform hover:scale-110 ${
         isUpdating ? 'opacity-50 cursor-wait is-updating' : 'hover:bg-gray-100' // Keep is-updating class
      } 
      // Forcefully disable border and animation on pseudo-elements when updating
      [&.is-updating]:before:!border-none [&.is-updating]:before:!animate-none 
      [&.is-updating]:after:!border-none [&.is-updating]:after:!animate-none
      `}
      // --- END OF CHANGE ---
      aria-label={displayAsFavourite ? 'Remove from favourites' : 'Add to favourites'}
      title={!session ? "Log In to add favourite recipes" : (displayAsFavourite ? 'Remove from favourites' : 'Add to favourites')}
    >
      {/* Icon rendering depends on the displayed state */}
      {displayAsFavourite ? (
        <HeartIconSolid className="h-6 w-6 text-red-500" />
      ) : (
        <HeartIcon className="h-6 w-6 text-gray-400 hover:text-red-500" />
      )}
    </button>
  );
}