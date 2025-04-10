// app/context/FavouritesContext.tsx
'use client';

import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
  useMemo,
  ReactNode,
} from 'react';
import { useSession } from 'next-auth/react';

interface FavouritesContextType {
  favouriteIds: string[];
  isLoading: boolean;
  error: string | null;
  addFavouriteId: (recipeId: string) => void;
  removeFavouriteId: (recipeId: string) => void;
  refetchFavourites: () => Promise<void>; // Added for manual refresh if needed
}

const FavouritesContext = createContext<FavouritesContextType | undefined>(
  undefined
);

interface FavouritesProviderProps {
  children: ReactNode;
}

export const FavouritesProvider = ({ children }: FavouritesProviderProps) => {
  const { data: session, status } = useSession();
  const [favouriteIds, setFavouriteIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchFavouriteIds = useCallback(async () => {
    // Only fetch if user is authenticated
    if (status !== 'authenticated' || !session?.user) {
      setFavouriteIds([]); // Clear favourites if logged out
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null); // Reset error before fetching

    try {
      const response = await fetch('/api/user/preferences/favourites/ids'); // Use the new endpoint

      if (!response.ok) {
        throw new Error(`Failed to fetch favourite IDs: ${response.status}`);
      }

      const ids: string[] = await response.json();
      setFavouriteIds(ids);
    } catch (err) {
      console.error('Error fetching favourite IDs:', err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      setFavouriteIds([]); // Clear favourites on error
    } finally {
      setIsLoading(false);
    }
  }, [session?.user, status]); // Depend on user session and status

  // Fetch favourites when session status changes to authenticated
  useEffect(() => {
    fetchFavouriteIds();
  }, [fetchFavouriteIds]); // fetchFavouriteIds is memoized by useCallback

  // Function to add an ID locally (for optimistic updates)
  const addFavouriteId = useCallback((recipeId: string) => {
    setFavouriteIds((prevIds) => {
      // Avoid duplicates if already added
      if (!prevIds.includes(recipeId)) {
        return [...prevIds, recipeId];
      }
      return prevIds;
    });
  }, []);

  // Function to remove an ID locally (for optimistic updates)
  const removeFavouriteId = useCallback((recipeId: string) => {
    setFavouriteIds((prevIds) => prevIds.filter((id) => id !== recipeId));
  }, []);

  // Value provided by the context
  const value = useMemo(
    () => ({
      favouriteIds,
      isLoading,
      error,
      addFavouriteId,
      removeFavouriteId,
      refetchFavourites: fetchFavouriteIds, // Expose the fetch function
    }),
    [favouriteIds, isLoading, error, addFavouriteId, removeFavouriteId, fetchFavouriteIds]
  );

  return (
    <FavouritesContext.Provider value={value}>
      {children}
    </FavouritesContext.Provider>
  );
};

// Custom hook to use the FavouritesContext
export const useFavourites = (): FavouritesContextType => {
  const context = useContext(FavouritesContext);
  if (context === undefined) {
    throw new Error('useFavourites must be used within a FavouritesProvider');
  }
  return context;
};