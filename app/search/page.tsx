'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import RecipeCard from '@/components/recipe/RecipeCard';
// import RecipeDetailModal from '@/components/recipe/RecipeDetailModal'; // Removed import
import { Recipe } from '@/lib/types/recipe';

interface SearchResult extends Omit<Recipe, 'description' | 'imageUrl'> {
  description?: string;
  imageUrl?: string;
  isFavourite?: boolean;
}

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('query') || '';
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Removed modal state
  // const [selectedRecipe, setSelectedRecipe] = useState<SearchResult | null>(null);
  // const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) {
        setResults([]);
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/search?query=${encodeURIComponent(query)}`);
        if (!response.ok) {
          throw new Error('Failed to fetch search results');
        }
        const data = await response.json();
        setResults(data.recipes || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, [query]);

  const handleFavouriteChange = (recipeId: string, newIsFavourite: boolean) => {
    setResults(currentResults =>
      currentResults.map(recipe =>
        recipe.id === recipeId ? { ...recipe, isFavourite: newIsFavourite } : recipe
      )
    );
    // Removed update logic for selectedRecipe
    // if (selectedRecipe && selectedRecipe.id === recipeId) {
    //   setSelectedRecipe(prev => prev ? { ...prev, isFavourite: newIsFavourite } : null);
    // }
  };

  // Removed modal handlers
  // const handleOpenModal = (recipe: SearchResult) => {
  //   setSelectedRecipe(recipe);
  //   setIsModalOpen(true);
  // };

  // const handleCloseModal = () => {
  //   setIsModalOpen(false);
  //   setSelectedRecipe(null);
  // };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <>
      <h2 className="text-2xl font-semibold mb-6">
        Search results for &quot;{query}&quot;
      </h2>

      {/* Apply similar grid/width styling as other pages */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center">
        {results.length > 0 ? (
          results.map((recipe) => (
            <div key={recipe.id} className="w-72"> {/* Added wrapper div with w-72 */}
            <RecipeCard
                key={recipe.id} // key should ideally be on the wrapper
              recipe={recipe}
                // onSelect={handleOpenModal} // Removed prop
              onFavouriteChange={handleFavouriteChange}
            />
            </div>
          ))
        ) : (
          !loading && <div>No recipes found for &quot;{query}&quot;.</div>
        )}
      </div>

      {/* Removed modal rendering */}
      {/* {selectedRecipe && (
        <RecipeDetailModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          recipe={selectedRecipe}
          onFavouriteChange={handleFavouriteChange}
        />
      )} */}
    </>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div>Loading search...</div>}>
      <main className="flex-grow container mx-auto py-8">
        <SearchResults />
      </main>
    </Suspense>
  );
} 