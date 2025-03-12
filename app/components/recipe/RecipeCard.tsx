import React from 'react';
import Image from 'next/image';
import { Recipe } from '@/types/recipe';
import { 
  ClockIcon, 
  UserIcon, 
  FireIcon, 
  GlobeAsiaAustraliaIcon,
  StarIcon
} from '@heroicons/react/24/outline';

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  return (
    <div className="flex flex-col bg-white rounded-xl shadow-lg overflow-hidden w-[300px] h-[400px] transition-transform hover:scale-105">
      {/* Image Container */}
      <div className="relative w-full" style={{ height: '140px' }}>
        <Image
          src={recipe.imageUrl?.startsWith('/') ? recipe.imageUrl : (recipe.imageUrl || '/placeholder-recipe.jpg')}
          alt={recipe.title}
          fill
          className="object-cover"
          sizes="300px"
          priority
          unoptimized={recipe.imageUrl?.startsWith('/') ?? false}
        />
        {/* All Labels Container */}
        <div className="absolute top-2 left-2 flex flex-wrap gap-1 max-w-[90%]">
          {/* Dietary Labels */}
          <div className="flex flex-wrap gap-1">
            {recipe.isVegetarian && (
              <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                Vegetarian
              </span>
            )}
            {recipe.isVegan && (
              <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                Vegan
              </span>
            )}
            {recipe.isGlutenFree && (
              <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
                Gluten Free
              </span>
            )}
            {recipe.isDairyFree && (
              <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                Dairy Free
              </span>
            )}
            {recipe.isNutFree && (
              <span className="px-2 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-800">
                Nut Free
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {recipe.title}
        </h3>
        <p className="text-sm text-gray-600 mb-4 line-clamp-3">
          {recipe.description}
        </p>

        {/* Recipe Metrics */}
        <div className="mt-auto flex flex-col gap-2">
          {typeof recipe.cookingTime === 'number' && recipe.cookingTime > 0 && (
            <div className="flex items-center text-sm text-gray-600">
              <ClockIcon className="h-4 w-4 mr-2" />
              {recipe.cookingTime} mins
            </div>
          )}
          {typeof recipe.servings === 'number' && recipe.servings > 0 && (
            <div className="flex items-center text-sm text-gray-600">
              <UserIcon className="h-4 w-4 mr-2" />
              {recipe.servings} servings
            </div>
          )}
          {typeof recipe.calories === 'number' && recipe.calories > 0 && (
            <div className="flex items-center text-sm text-gray-600">
              <FireIcon className="h-4 w-4 mr-2" />
              {recipe.calories} calories
            </div>
          )}
          {recipe.regionOfOrigin && (
            <div className="flex items-center text-sm text-gray-600">
              <GlobeAsiaAustraliaIcon className="h-4 w-4 mr-2" />
              {recipe.regionOfOrigin}
            </div>
          )}
          {typeof recipe.averageRating === 'number' && recipe.averageRating > 0 && (
            <div className="flex items-center text-sm text-gray-600">
              <StarIcon className="h-4 w-4 mr-2" />
              {recipe.averageRating.toFixed(1)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeCard; 