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
      if (!session?.user?.email) {
        setIsFavorite(false);
        return;
      }

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

  const handleClick = async () => {
    if (!session?.user?.email) {
      toast.error("Log In to add favourite recipes");
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

  return (
    <button
      onClick={handleClick}
      disabled={isLoading && !!session}
      className={`${className} p-1.5 rounded-full transition-all transform hover:scale-110 ${isLoading && !!session ? 'opacity-50 cursor-wait' : 'hover:bg-gray-100'
        }`}
      aria-label={isFavorite && !!session ? 'Remove from favorites' : 'Add to favorites'}
      title={!session ? "Log In to add favourite recipes" : (isFavorite ? 'Remove from favorites' : 'Add to favorites')}
    >
      {isFavorite && !!session ? (
        <HeartIconSolid className="h-6 w-6 text-red-500" />
      ) : (
        <HeartIcon className="h-6 w-6 text-gray-400 hover:text-red-500" />
      )}
    </button>
  );
}
