'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Navbar from '@/app/components/Navbar';
import RecipeCard from '@/app/components/recipe/RecipeCard';
import { Recipe } from '@/app/types/recipe';

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!query) {
      setLoading(false);
      setRecipes([]);
      return;
    }

    const fetchRecipes = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/recipes/search?query=${encodeURIComponent(query)}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setRecipes(data);
      } catch (e) {
        console.error('Failed to fetch search results:', e);
        setError(`Failed to load recipes. ${(e instanceof Error) ? e.message : 'An unknown error occurred'}`);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [query]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 px-4">{`Search Results for "${query}"`}</h1>
      
      {loading && <p className="text-center">Loading recipes...</p>}
      
      {error && <p className="text-center text-red-500">{error}</p>}
      
      {!loading && !error && recipes.length === 0 && query && (
        <p className="text-center">No recipes found matching your search.</p>
      )}
      
      {!loading && !error && recipes.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
      
      {!loading && !error && !query && (
        <p className="text-center">Please enter a search term in the navigation bar.</p>
      )}
    </div>
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
        {/* Add Footer here if you have one */}
      </div>
    </Suspense>
  );
} 