'use client';

import { DietaryAnalysis } from '@/app/utils/dietary-classification';
import { Recipe } from '@/app/types/recipe';

interface DietaryInfoProps {
  analysis: DietaryAnalysis;
  recipe: Recipe;
}

export default function DietaryInfo({ analysis, recipe }: DietaryInfoProps) {
  // Organize badges by category for better visual grouping
  const dietaryBadges = [
    // Diet type badges (from recipe object)
    { condition: recipe.isVegetarian, label: 'Vegetarian', bgColor: 'bg-green-100', textColor: 'text-green-800' },
    { condition: recipe.isVegan, label: 'Vegan', bgColor: 'bg-green-100', textColor: 'text-green-800' },
    // Pescatarian comes from ingredient analysis
    { condition: analysis.isPescatarian, label: 'Pescatarian', bgColor: 'bg-cyan-100', textColor: 'text-cyan-800' }, 
    
    // Allergen badges (from recipe object)
    { condition: recipe.isGlutenFree, label: 'Gluten Free', bgColor: 'bg-yellow-100', textColor: 'text-yellow-800' },
    { condition: recipe.isLactoseFree, label: 'Lactose Free', bgColor: 'bg-blue-100', textColor: 'text-blue-800' },
    { condition: recipe.isNutFree, label: 'Nut Free', bgColor: 'bg-orange-100', textColor: 'text-orange-800' },
    
    // Special content badges (from ingredient analysis)
    // Assuming isLowFodmap and isFermented are reliable results from analyzeDietary
    { condition: analysis.isLowFodmap, label: 'Low FODMAP', bgColor: 'bg-emerald-100', textColor: 'text-emerald-800' },
    { condition: analysis.isFermented, label: 'Fermented', bgColor: 'bg-purple-100', textColor: 'text-purple-800' },
  ];

  const activeBadges = dietaryBadges.filter(badge => badge.condition);

  return (
    <div className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
      <div className="flex flex-wrap gap-1">
        {activeBadges.map((badge, index) => (
          <span
            key={index}
            className={`px-2 py-0.5 text-xs font-medium ${badge.bgColor} ${badge.textColor} rounded-full inline-flex items-center justify-center transition-colors duration-200 hover:brightness-95`}
          >
            {badge.label}
          </span>
        ))}
      </div>
    </div>
  );
} 