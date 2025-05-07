"use client";

import React from 'react';
// --- Import Shadcn Checkbox --- 
import { Checkbox } from "@/components/ui/checkbox";

// Define possible meal categories
const MEAL_CATEGORIES = [
  'Main', 
  'Dessert',
  'Beverage'
  // Removed old categories
] as const;

// Removed unused type alias
// type _MealCategory = typeof MEAL_CATEGORIES[number]; // Or simply string

interface MealCategorySelectorProps {
  selectedCategories: string[];
  onChange: (categories: string[]) => void;
}

const MealCategorySelector: React.FC<MealCategorySelectorProps> = ({ selectedCategories, onChange }) => {

  // --- Sort the categories alphabetically --- 
  const sortedMealCategories = [...MEAL_CATEGORIES].sort((a, b) => a.localeCompare(b));

  const handleToggle = (category: string) => {
    const newSelection = selectedCategories.includes(category)
      ? selectedCategories.filter(c => c !== category)
      : [...selectedCategories, category];
    onChange(newSelection);
  };

  return (
    <div className="w-full mb-6">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {/* --- Map over sorted categories --- */}
        {sortedMealCategories.map((category) => {
          const isSelected = selectedCategories.includes(category);
          return (
            <label
              key={category}
              className={`flex items-center p-3 rounded-lg border cursor-pointer transition-colors duration-200 ${
                isSelected
                  ? 'border-gray-400 bg-gray-50' // Subtle border/bg change on select
                  : 'bg-white border-gray-300 hover:border-gray-400'
              }`}
            >
              <Checkbox 
                checked={isSelected}
                onCheckedChange={() => handleToggle(category)}
                className="mr-2" // Add margin for spacing
                id={`meal-category-${category}`} // Add id for label association
              />
              <label 
                htmlFor={`meal-category-${category}`}
                className={`text-sm cursor-pointer ${isSelected ? 'font-medium text-black' : 'font-normal text-gray-700'}`}
              >
                {category}
              </label>
            </label>
          );
        })}
      </div>
       <p className="mt-3 text-xs text-gray-500">
          Select one or more meal categories.
       </p>
    </div>
  );
};

export default MealCategorySelector; 