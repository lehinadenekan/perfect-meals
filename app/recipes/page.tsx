'use client';

import { useState } from 'react';
import Image from 'next/image';
import RecipeSearch from '@/app/components/recipe/RecipeSearch';
import { Recipe } from '@/app/types/recipe';

export default function RecipesPage() {
  const [searchResults, setSearchResults] = useState<Recipe[]>([]);

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Recipe Search</h1>
      
      <div className="max-w-7xl mx-auto">
        <div className="max-w-2xl mx-auto mb-8">
          <RecipeSearch onSearchResults={setSearchResults} />
        </div>
        
        <div className="mt-8">
          {searchResults.length === 0 ? (
            <p className="text-gray-500 text-center">No recipes found. Try a different search term.</p>
          ) : (
            <div className="grid grid-cols-12 gap-4">
              {searchResults.map((recipe) => (
                <div
                  key={recipe.id}
                  className="col-span-1 w-12 max-w-[48px] bg-white rounded-lg shadow overflow-hidden"
                >
                  <div className="relative w-12 h-12">
                    {recipe.imageUrl ? (
                      <Image
                        src={recipe.imageUrl}
                        alt={recipe.title}
                        width={48}
                        height={48}
                        className="object-cover"
                        style={{ width: '48px', height: '48px' }}
                      />
                    ) : (
                      <div className="w-12 h-12 bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-400 text-[6px]">No image</span>
                      </div>
                    )}
                  </div>
                  <div className="p-0.5">
                    <h2 className="text-[8px] font-semibold truncate">{recipe.title}</h2>
                    <div className="text-[6px] text-gray-500">
                      {recipe.cookingTime}m
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
} 