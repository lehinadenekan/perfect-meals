import React from 'react';
import { Recipe } from '@prisma/client';
import Image from 'next/image';

interface RecipeCardProps {
  recipe: Recipe;
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden" role="article">
      {recipe.imageUrl && (
        <div className="relative h-48">
          <Image
            src={recipe.imageUrl}
            alt={recipe.title}
            fill
            className="object-cover"
          />
        </div>
      )}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {recipe.title}
        </h3>
        <p className="text-gray-600 text-sm mb-2 line-clamp-2">
          {recipe.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {recipe.isVegetarian && (
            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
              Vegetarian
            </span>
          )}
          {recipe.isVegan && (
            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
              Vegan
            </span>
          )}
          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
            {recipe.cuisineType}
          </span>
        </div>
      </div>
    </div>
  );
}