'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Navbar from '@/app/components/Navbar';
import RecipeCard from '@/app/components/recipe/RecipeCard';
import RecipeDetailModal from '@/app/components/recipe/RecipeDetailModal';
import { Recipe } from '@/app/types/recipe';

interface SearchResult extends Omit<Recipe, 'description' | 'imageUrl'> {
  description?: string;
  imageUrl?: string;
  isFavorite?: boolean;
}

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('query') || '';
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [selectedRecipe, setSelectedRecipe] = useState<SearchResult | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleFavoriteChange = (recipeId: string, newIsFavorite: boolean) => {
    setResults(currentResults =>
      currentResults.map(recipe =>
        recipe.id === recipeId
          ? { ...recipe, isFavorite: newIsFavorite }
          : recipe
      )
    );
    if (selectedRecipe && selectedRecipe.id === recipeId) {
      setSelectedRecipe(prev => prev ? { ...prev, isFavorite: newIsFavorite } : null);
    }
  };

  const handleOpenModal = (recipe: SearchResult) => {
    setSelectedRecipe(recipe);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRecipe(null);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {results.length > 0 ? (
          results.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onSelect={handleOpenModal}
              onFavoriteChange={handleFavoriteChange}
            />
          ))
        ) : (
          !loading && <div>No recipes found for "{query}".</div>
        )}
      </div>

      {selectedRecipe && (
        <RecipeDetailModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          recipe={selectedRecipe}
          onFavoriteChange={handleFavoriteChange}
        />
      )}
    </>
  );
}

export default function SearchPage() {
  const router = useRouter();

  const handleHomeClick = () => {
    router.push('/');
  };

  const handleSearch = async (term: string) => {
    router.push(`/search?q=${encodeURIComponent(term)}`);
  };

  return (
    <Suspense fallback={<div>Loading search...</div>}>
      <div className="flex flex-col min-h-screen">
        <Navbar onHomeClick={handleHomeClick} onSearch={handleSearch} />
        <main className="flex-grow container mx-auto py-8">
          <SearchResults />
        </main>
      </div>
    </Suspense>
  );
} 