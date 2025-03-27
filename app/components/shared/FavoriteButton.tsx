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
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkIfFavorite = async () => {
      if (!session?.user?.email) return;
      
      try {
        // Use a timeout to prevent infinite loading
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Request timeout')), 5000)
        );
        
        const fetchPromise = fetch('/api/recipes/favorites');
        
        // Race between the fetch and the timeout
        const response = await Promise.race([fetchPromise, timeoutPromise]) as Response;
        
        if (!response.ok) {
          throw new Error(`Failed to fetch favorites: ${response.status}`);
        }
        
        const favorites = await response.json();
        setIsFavorite(favorites.some((recipe: { id: string }) => recipe.id === recipeId));
        setError(null); // Clear any previous errors
      } catch (error) {
        console.error('Error checking favorite status:', error);
        // Don't change the favorite state on error, just log it
        setError(error instanceof Error ? error.message : 'Unknown error');
      }
    };

    checkIfFavorite();
  }, [recipeId, session?.user?.email]);

  const toggleFavorite = async () => {
    if (!session?.user?.email) return;
    if (isLoading) return;

    setIsLoading(true);
    setError(null);
    
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

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Failed to update favorite: ${response.status}`);
      }
      
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error('Error updating favorite:', error);
      setError(error instanceof Error ? error.message : 'Unknown error');
      // Don't change state on error
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
      title={error ? `There was an error: ${error}` : undefined}
    >
      {isFavorite ? (
        <HeartIconSolid className="h-6 w-6 text-red-500" />
      ) : (
        <HeartIcon className="h-6 w-6 text-gray-400 hover:text-red-500" />
      )}
    </button>
  );
} 