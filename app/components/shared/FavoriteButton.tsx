'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import toast from 'react-hot-toast';

interface FavoriteButtonProps {
  recipeId: string;
  initialIsFavorite?: boolean;
  className?: string;
  onSuccess?: (recipeId: string, newIsFavorite: boolean) => void;
}

export default function FavoriteButton({
  recipeId,
  initialIsFavorite = false,
  className = '',
  onSuccess,
}: FavoriteButtonProps) {
  const { data: session } = useSession();
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsFavorite(initialIsFavorite);
  }, [initialIsFavorite]);

  useEffect(() => {
    const checkIfFavorite = async () => {
      if (!session?.user?.email) return;

      setIsLoading(true);
      try {
        const response = await fetch('/api/recipes/favorites');
        if (!response.ok) {
          console.warn(`Failed to fetch favorites: ${response.status}`);
          return;
        }
        const favorites = await response.json();
        setIsFavorite(favorites.some((recipe: { id: string }) => recipe.id === recipeId));
      } catch (error) {
        console.error('Error checking favorite status:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkIfFavorite();
  }, [recipeId, session?.user?.email]);

  const toggleFavorite = async () => {
    if (!session?.user?.email) {
      toast.error("Please log in to add favorites.");
      return;
    }
    if (isLoading) return;

    const previousIsFavorite = isFavorite;
    setIsFavorite(!previousIsFavorite);
    setIsLoading(true);

    try {
      const response = await fetch('/api/recipes/favorites', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          recipeId,
          action: !previousIsFavorite ? 'add' : 'remove',
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Failed to update favorite: ${response.status}`);
      }

      onSuccess?.(recipeId, !previousIsFavorite);

    } catch (error) {
      setIsFavorite(previousIsFavorite);
      const message = error instanceof Error ? error.message : 'Failed to update favorite';
      console.error('Error updating favorite:', error);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  if (!session) {
    return (
      <button
        className={`${className} p-1.5 rounded-full opacity-50 cursor-not-allowed`}
        aria-label="Log in to add favorites"
        title="Log in to add favorites"
        disabled
      >
        <HeartIcon className="h-6 w-6 text-gray-400" />
      </button>
    );
  }

  return (
    <button
      onClick={toggleFavorite}
      disabled={isLoading}
      className={`${className} p-1.5 rounded-full transition-all transform hover:scale-110 ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'
        }`}
      aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      {isFavorite ? (
        <HeartIconSolid className="h-6 w-6 text-red-500" />
      ) : (
        <HeartIcon className="h-6 w-6 text-gray-400 hover:text-red-500" />
      )}
    </button>
  );
} 