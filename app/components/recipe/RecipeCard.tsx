import React from 'react';
import { Recipe } from '@/app/types/recipe';
import Image from 'next/image';
import { GlobeAltIcon } from '@heroicons/react/24/outline';

interface RecipeCardProps {
  recipe: Recipe;
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <div 
      className="w-[300px] min-w-[300px] max-w-[300px] h-[700px] min-h-[700px] max-h-[700px] bg-white rounded-lg shadow-md overflow-hidden relative" 
      role="article"
      style={{ width: '300px', height: '700px' }}
    >
      {recipe.imageUrl && (
        <div className="w-[300px] min-w-[300px] max-w-[300px] h-[250px] min-h-[250px] max-h-[250px] relative overflow-hidden">
          <Image
            src={recipe.imageUrl}
            alt={recipe.title}
            width={300}
            height={250}
            className="object-cover"
            style={{ width: '300px', height: '250px' }}
            priority
          />
        </div>
      )}
      <div className="p-6 h-[450px] min-h-[450px] max-h-[450px] flex flex-col">
        <h3 className="text-2xl font-semibold text-gray-900 mb-3 line-clamp-2">
          {recipe.title}
        </h3>
        
        <p className="text-base text-gray-600 mb-4 line-clamp-4">
          {recipe.description}
        </p>
        
        {/* Dietary preferences */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {recipe.isVegetarian && (
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full whitespace-nowrap">
                Vegetarian
              </span>
            )}
            {recipe.isVegan && (
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full whitespace-nowrap">
                Vegan
              </span>
            )}
            {recipe.isGlutenFree && (
              <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full whitespace-nowrap">
                Gluten-Free
              </span>
            )}
            {recipe.isLactoseFree && (
              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full whitespace-nowrap">
                Lactose-Free
              </span>
            )}
            {recipe.isNutFree && (
              <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full whitespace-nowrap">
                Nut-Free
              </span>
            )}
            {recipe.isLowFodmap && (
              <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full whitespace-nowrap">
                Low FODMAP
              </span>
            )}
            {recipe.isPescatarian && (
              <span className="px-2 py-1 bg-cyan-100 text-cyan-800 text-xs rounded-full whitespace-nowrap">
                Pescatarian
              </span>
            )}
            {recipe.isFermented && (
              <span className="px-2 py-1 bg-rose-100 text-rose-800 text-xs rounded-full whitespace-nowrap">
                Fermented
              </span>
            )}
          </div>
        </div>
        
        {/* Footer with nutritional info and region */}
        <div className="mt-auto">
          {/* Nutritional information - vertical layout */}
          <div className="flex flex-col gap-2 mb-3">
            <div className="flex items-center whitespace-nowrap">
              <div className="w-3 h-3 rounded-full bg-blue-700 flex-shrink-0 mr-2"></div>
              <span className="text-xs text-gray-700 whitespace-nowrap">Carbs: ~{Math.round((recipe.calories || 0) * 0.5)}g</span>
            </div>
            <div className="flex items-center whitespace-nowrap">
              <div className="w-3 h-3 rounded-full bg-green-700 flex-shrink-0 mr-2"></div>
              <span className="text-xs text-gray-700 whitespace-nowrap">Protein: ~{Math.round((recipe.calories || 0) * 0.25)}g</span>
            </div>
            <div className="flex items-center whitespace-nowrap">
              <div className="w-3 h-3 rounded-full bg-yellow-700 flex-shrink-0 mr-2"></div>
              <span className="text-xs text-gray-700 whitespace-nowrap">Fat: ~{Math.round((recipe.calories || 0) * 0.25)}g</span>
            </div>
          </div>

          {/* Region of origin with globe icon - positioned below nutritional info */}
          {recipe.regionOfOrigin && (
            <div className="flex items-center">
              <GlobeAltIcon className="w-4 h-4 mr-1 text-blue-500 flex-shrink-0" />
              <span className="text-xs text-gray-700 whitespace-nowrap">{recipe.regionOfOrigin}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}