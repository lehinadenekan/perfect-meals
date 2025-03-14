'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import LoadingSpinner from '@/app/components/shared/LoadingSpinner';
import FavoriteButton from '@/app/components/shared/FavoriteButton';

interface Recipe {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  cookingTime: number;
  difficulty: string;
}

export default function FavoriteMealsPage() {
  const { data: session } = useSession();
  const [favoriteRecipes, setFavoriteRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFavoriteRecipes = async () => {
      try {
        const response = await fetch('/api/recipes/favorites');
        if (!response.ok) throw new Error('Failed to fetch favorite recipes');
        const data = await response.json();
        setFavoriteRecipes(data);
      } catch (error) {
        console.error('Error fetching favorite recipes:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (session?.user?.email) {
      fetchFavoriteRecipes();
    }
  }, [session?.user?.email]);

  if (!session) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Please sign in to view your favorite meals
            </h2>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Your Favorite Meals
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Here are all the recipes you've saved as favorites
          </p>
        </div>

        {favoriteRecipes.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600">
              You haven't saved any recipes as favorites yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {favoriteRecipes.map((recipe) => (
              <div
                key={recipe.id}
                className="bg-white overflow-hidden shadow-sm rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="relative h-48">
                  <Image
                    src={recipe.imageUrl || '/placeholder-recipe.jpg'}
                    alt={recipe.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-2 right-2 z-10">
                    <FavoriteButton recipeId={recipe.id} initialIsFavorite={true} />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {recipe.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-500 line-clamp-2">
                    {recipe.description}
                  </p>
                  <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                    <span>{recipe.cookingTime} mins</span>
                    <span className="capitalize">{recipe.difficulty.toLowerCase()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 