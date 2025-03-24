'use client';

import { useState, useEffect, useCallback } from 'react';
import { debounce } from 'lodash';
import { Recipe } from '@/app/types/recipe';

interface RecipeSearchProps {
  onSearchResults?: (recipes: Recipe[]) => void;
}

export default function RecipeSearch({ onSearchResults }: RecipeSearchProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const searchRecipes = async (query: string) => {
    if (!query.trim()) {
      onSearchResults?.([]);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`/api/recipes/search?q=${encodeURIComponent(query)}`);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to search recipes');
      }

      onSearchResults?.(data.recipes);
    } catch (error) {
      console.error('Search failed:', error);
      // You might want to handle errors differently
      onSearchResults?.([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Debounce the search function to avoid too many API calls
  const debouncedSearch = useCallback(
    debounce((term: string) => {
      searchRecipes(term);
    }, 300),
    []
  );

  useEffect(() => {
    debouncedSearch(searchTerm);
    
    // Cleanup
    return () => {
      debouncedSearch.cancel();
    };
  }, [searchTerm, debouncedSearch]);

  return (
    <div className="relative w-full">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search Recipes"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
        aria-label="Search recipes"
      />
      {isLoading && (
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-yellow-500"></div>
        </div>
      )}
    </div>
  );
} 