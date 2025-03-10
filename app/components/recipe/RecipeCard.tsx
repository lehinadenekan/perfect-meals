import React from 'react';
import Image from 'next/image';
import { Recipe } from '@/types/recipe';
import { 
  ClockIcon, 
  UserIcon, 
  FireIcon, 
  GlobeAsiaAustraliaIcon,
  CakeIcon,
  BeakerIcon,
  StarIcon
} from '@heroicons/react/24/outline';

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  const getMealTypeDetails = (type: string) => {
    const types = {
      DESSERT: { label: 'Dessert', color: 'bg-pink-100 text-pink-800', icon: CakeIcon },
      BEVERAGE: { label: 'Drink', color: 'bg-cyan-100 text-cyan-800', icon: BeakerIcon },
      MAIN: { label: '', color: '', icon: null }
    };
    return types[type as keyof typeof types] || { label: '', color: '', icon: null };
  };

  const typeDetails = getMealTypeDetails(recipe.type);
  const TypeIcon = typeDetails.icon;

  return (
    <div className="flex flex-col bg-white rounded-xl shadow-lg overflow-hidden w-[300px] h-[400px] transition-transform hover:scale-105">
      {/* Image Container */}
      <div className="relative w-full" style={{ height: '140px' }}>
        <Image
          src={recipe.imageUrl || '/placeholder-recipe.jpg'}
          alt={recipe.title}
          fill
          className="object-cover"
          sizes="300px"
          priority
        />
        {/* All Labels Container */}
        <div className="absolute top-2 left-2 flex flex-wrap gap-1 max-w-[90%]">
          {/* Meal Type Badge (Dessert/Beverage) */}
          {(recipe.type === 'DESSERT' || recipe.type === 'BEVERAGE') && (
            <div className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${typeDetails.color}`}>
              {TypeIcon && <TypeIcon className="w-4 w-4" />}
              <span>{typeDetails.label}</span>
            </div>
          )}
          {/* Dietary Labels */}
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