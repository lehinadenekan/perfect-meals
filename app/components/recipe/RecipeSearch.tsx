'use client';

import React, { useState, useEffect } from 'react';
import { Recipe } from '@/app/types/recipe';
import RecipeCard from './RecipeCard';
import { Spinner } from '../ui/spinner';

type DietaryPreference = 
  | 'gluten-free'
  | 'lactose-free'
  | 'low-fodmap'
  | 'nut-free'
  | 'pescatarian'
  | 'fermented'
  | 'vegan'
  | 'vegetarian';

interface DietaryOption {
  value: DietaryPreference;
  label: string;
  description: string;
}

export default function RecipeSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDiets, setSelectedDiets] = useState<DietaryPreference[]>([]);
  const [error, setError] = useState<string | null>(null);

  const dietaryOptions: DietaryOption[] = [
    {
      value: 'gluten-free',
      label: 'Gluten-Free',
      description: 'Excludes wheat, barley, rye, and their derivatives'
    },
    {
      value: 'lactose-free',
      label: 'Lactose-Free',
      description: 'Excludes dairy products containing lactose'
    },
    {
      value: 'low-fodmap',
      label: 'Low-FODMAP',
      description: 'Excludes fermentable carbs that may cause digestive issues'
    },
    {
      value: 'nut-free',
      label: 'Nut-Free',
      description: 'Excludes all tree nuts and peanuts'
    },
    {
      value: 'pescatarian',
      label: 'Pescatarian',
      description: 'Excludes meat but includes fish and seafood'
    },
    {
      value: 'fermented',
      label: 'Fermented',
      description: 'Includes foods produced or preserved through fermentation'
    },
    {
      value: 'vegan',
      label: 'Vegan',
      description: 'Excludes all animal products'
    },
    {
      value: 'vegetarian',
      label: 'Vegetarian',
      description: 'Excludes meat and fish, includes dairy and eggs'
    }
  ];

  const searchRecipes = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Build the search URL with dietary preferences
      const searchParams = new URLSearchParams();
      if (searchQuery) {
        searchParams.append('q', searchQuery);
      }
      
      // Add all selected dietary preferences
      selectedDiets.forEach(diet => {
        const paramName = diet === 'gluten-free' ? 'isGlutenFree' :
                         diet === 'nut-free' ? 'isNutFree' :
                         diet === 'low-fodmap' ? 'isLowFodmap' :
                         diet === 'lactose-free' ? 'isLactoseFree' :
                         diet === 'pescatarian' ? 'isPescatarian' :
                         diet === 'fermented' ? 'isFermented' :
                         `is${diet.charAt(0).toUpperCase() + diet.slice(1)}`;
        searchParams.append(paramName, 'true');
      });

      const response = await fetch(`/api/recipes/search?${searchParams.toString()}`);
      if (!response.ok) {
        throw new Error('Failed to fetch recipes');
      }

      const data = await response.json();
      
      // Apply client-side filtering for additional validation
      const filteredRecipes = data.filter((recipe: Recipe) => {
        return selectedDiets.every(diet => {
          switch (diet) {
            case 'vegetarian':
              return recipe.isVegetarian;
            case 'vegan':
              return recipe.isVegan;
            case 'gluten-free':
              return recipe.isGlutenFree;
            case 'nut-free':
              return recipe.isNutFree;
            case 'low-fodmap':
              return recipe.isLowFodmap;
            case 'lactose-free':
              return recipe.isLactoseFree;
            case 'pescatarian':
              return recipe.isPescatarian;
            case 'fermented':
              return recipe.isFermented || recipe.hasFeatureFermented || recipe.hasFermentedIngredients;
            default:
              return true;
          }
        });
      });

      setRecipes(filteredRecipes);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setRecipes([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      searchRecipes();
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery, selectedDiets]);

  const toggleDiet = (diet: DietaryPreference) => {
    setSelectedDiets(prev =>
      prev.includes(diet)
        ? prev.filter(d => d !== diet)
        : [...prev, diet]
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="space-y-6">
        {/* Search input */}
        <div className="flex flex-col space-y-2">
          <input
            type="text"
            placeholder="Search recipes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Dietary filters */}
        <div className="flex flex-wrap gap-3">
          {dietaryOptions.map(option => (
            <button
              key={option.value}
              onClick={() => toggleDiet(option.value)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors relative group
                ${selectedDiets.includes(option.value)
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              title={option.description}
            >
              {option.label}
              {/* Tooltip */}
              <span className="invisible group-hover:visible absolute -top-12 left-1/2 transform -translate-x-1/2 
                             whitespace-nowrap bg-gray-800 text-white text-xs rounded px-2 py-1 z-10">
                {option.description}
              </span>
            </button>
          ))}
        </div>

        {/* Selected filters summary */}
        {selectedDiets.length > 0 && (
          <div className="text-sm text-gray-600">
            Showing recipes that are{' '}
            {selectedDiets.map((diet, index) => (
              <span key={diet}>
                {index > 0 && index === selectedDiets.length - 1 ? ' and ' : index > 0 ? ', ' : ''}
                <span className="font-medium">
                  {dietaryOptions.find(option => option.value === diet)?.label.toLowerCase()}
                </span>
              </span>
            ))}
          </div>
        )}

        {/* Error message */}
        {error && (
          <div className="text-red-500 text-center py-4">
            {error}
          </div>
        )}

        {/* Loading state */}
        {isLoading && (
          <div className="flex justify-center py-8">
            <Spinner />
          </div>
        )}

        {/* Results */}
        {!isLoading && recipes.length === 0 && (
          <div className="text-center text-gray-500 py-8">
            No recipes found. Try adjusting your search or filters.
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {recipes.map(recipe => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </div>
    </div>
  );
} 