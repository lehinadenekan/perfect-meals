import React from 'react';
import Image from 'next/image';
import { Recipe } from '@/types/recipe';
import { ClockIcon, UserIcon, FireIcon } from '@heroicons/react/24/outline';

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  return (
    <div className="flex flex-col bg-white rounded-xl shadow-lg overflow-hidden w-[300px] h-[400px] transition-transform hover:scale-105">
      {/* Image Container */}
      <div className="relative h-48 w-full">
        <Image
          src={recipe.imageUrl || '/placeholder-recipe.jpg'}
          alt={recipe.title}
          fill
          className="object-cover"
        />
        {/* Dietary Tags Overlay */}
        <div className="absolute bottom-2 left-2 flex flex-wrap gap-1">
          {recipe.isVegetarian && (
            <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
              Vegetarian
            </span>
          )}
          {recipe.isVegan && (
            <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
              Vegan
            </span>
          )}
          {recipe.isGlutenFree && (
            <span className="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
              Gluten-Free
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {recipe.title}
        </h3>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {recipe.description}
        </p>

        {/* Recipe Metrics */}
        <div className="mt-auto flex flex-col gap-2">
          <div className="flex items-center text-sm text-gray-600">
            <ClockIcon className="h-4 w-4 mr-2" />
            {recipe.cookingTime} mins
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <UserIcon className="h-4 w-4 mr-2" />
            {recipe.servings} servings
          </div>
          {recipe.calories && (
            <div className="flex items-center text-sm text-gray-600">
              <FireIcon className="h-4 w-4 mr-2" />
              {recipe.calories} calories
            </div>
          )}
        </div>

        {/* Rating */}
        {recipe.averageRating && (
          <div className="mt-2 flex items-center">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.round(recipe.averageRating || 0)
                      ? 'text-yellow-400'
                      : 'text-gray-300'
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="ml-2 text-sm text-gray-600">
              ({recipe.totalReviews} reviews)
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeCard; 