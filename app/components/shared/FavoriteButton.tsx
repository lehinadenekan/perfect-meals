'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';

interface FavoriteButtonProps {
  recipeId: string;
  initialIsFavorite?: boolean;
}

export default function FavoriteButton({
  recipeId,
  initialIsFavorite = false,
}: FavoriteButtonProps) {
  const { data: session } = useSession();
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const checkIfFavorite = async () => {
      if (!session?.user?.email) return;

      try {
        const response = await fetch('/api/recipes/favorites');
        if (!response.ok) throw new Error('Failed to fetch favorites');
        const favorites = await response.json();
        setIsFavorite(favorites.some((recipe: { id: string }) => recipe.id === recipeId));
      } catch (error) {
        console.error('Error checking favorite status:', error);
      }
    };

    checkIfFavorite();
  }, [recipeId, session?.user?.email]);

  const toggleFavorite = async () => {
    if (!session?.user?.email) return;
    if (isLoading) return;

    setIsLoading(true);
    try {
      const response = await fetch('/api/recipes/favorites', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          recipeId,
          action: isFavorite ? 'remove' : 'add',
        }),
      });

      if (!response.ok) throw new Error('Failed to update favorite');
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error('Error updating favorite:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!session?.user?.email) return null;

  return (
    <button
      onClick={toggleFavorite}
      disabled={isLoading}
      className={`p-1.5 rounded-full transition-all transform hover:scale-110 ${
        isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'
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