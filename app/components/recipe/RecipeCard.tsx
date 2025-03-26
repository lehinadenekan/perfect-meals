import React from 'react';
import { Recipe } from '@/app/types/recipe';
import Image from 'next/image';
import { GlobeAltIcon } from '@heroicons/react/24/outline';
import { analyzeDietary } from '@/app/utils/dietary-classification';
import DietaryInfo from './DietaryInfo';
import { DietaryFeedback } from './DietaryFeedback';
import FavoriteButton from '../shared/FavoriteButton';

interface RecipeCardProps {
  recipe: Recipe;
  isLoggedIn?: boolean;
  onFlagClick?: () => void;
}

export default function RecipeCard({ recipe, onFlagClick }: RecipeCardProps) {
  const dietaryAnalysis = analyzeDietary(recipe);

  // Calculate approximate macros based on calories if available
  const calories = recipe.calories || 0;
  const approximateCarbs = Math.round(calories * 0.5 / 4); // 50% of calories from carbs, 4 calories per gram
  const approximateProtein = Math.round(calories * 0.25 / 4); // 25% of calories from protein, 4 calories per gram
  const approximateFat = Math.round(calories * 0.25 / 9); // 25% of calories from fat, 9 calories per gram

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden w-[240px] h-[555px] transition-all duration-300 hover:shadow-lg hover:translate-y-[-2px]">
      {/* Image container with gradient overlay */}
      <div className="relative h-[140px] w-full">
        <Image
          src={recipe.imageUrl || '/images/default-recipe.jpg'}
          alt={recipe.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col h-[415px]">
        {/* Title section - fixed height for up to 6 lines */}
        <div className="h-[144px] mb-4 flex flex-col justify-between">
          <h3 className="font-semibold text-lg break-words">
            {recipe.title}
          </h3>
          {/* Description - now part of the title container for consistent positioning */}
          <p className="text-sm text-gray-600 line-clamp-2 break-words mt-auto" title={recipe.description}>
            {recipe.description}
          </p>
        </div>

        {/* Dietary Information - fixed height */}
        <div className="h-[80px] mb-4">
          <DietaryInfo analysis={dietaryAnalysis} recipe={recipe} />
        </div>

        {/* Nutritional Information - fixed height */}
        <div className="h-[72px] mb-4">
          <div className="flex flex-col space-y-2 text-sm text-gray-600">
            <div className="flex items-center space-x-2 whitespace-nowrap">
              <span className="w-2 h-2 rounded-full bg-red-500"></span>
              <span>Carbs: {approximateCarbs}g</span>
            </div>
            <div className="flex items-center space-x-2 whitespace-nowrap">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              <span>Protein: {approximateProtein}g</span>
            </div>
            <div className="flex items-center space-x-2 whitespace-nowrap">
              <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
              <span>Fat: {approximateFat}g</span>
            </div>
          </div>
        </div>

        {/* Region of origin - aligned with the bullet points */}
        <div className="mb-4">
          <div className="flex items-center space-x-2 whitespace-nowrap">
            <GlobeAltIcon className="w-5 h-5 text-gray-500 flex-shrink-0" />
            <span className="text-sm text-gray-600">{recipe.regionOfOrigin || 'Global'}</span>
          </div>
        </div>

        {/* Bottom row with flag and heart icons - aligned with bullet points */}
        <div className="flex items-center justify-between w-full h-[24px]">
          <div className="flex items-center whitespace-nowrap">
            <DietaryFeedback recipe={recipe} onFlagClick={onFlagClick} />
          </div>
          <FavoriteButton recipeId={recipe.id} />
        </div>
      </div>
    </div>
  );
}