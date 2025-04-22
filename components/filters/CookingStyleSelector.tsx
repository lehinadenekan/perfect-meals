"use client";

import React from 'react';
// --- Import Shadcn Checkbox --- 
import { Checkbox } from "@/components/ui/checkbox";

// Define possible cooking styles
const COOKING_STYLES = [
  'Oven',
  'Stovetop',
  'Grill',
  'Slow Cooker',
  'Instant Pot',
  'Microwave',
  'Air Fryer',
  'No-Cook',
  'BBQ',
  'Bake',
  'Roast',
  'Fry',
  'Boil',
  'Steam',
] as const; // Use "as const" for stronger typing if needed, or just string[]

// Prefix unused type alias
type _CookingStyle = typeof COOKING_STYLES[number]; // Or simply string

interface CookingStyleSelectorProps {
  selectedStyles: string[];
  onChange: (styles: string[]) => void;
}

const CookingStyleSelector: React.FC<CookingStyleSelectorProps> = ({ selectedStyles, onChange }) => {

  // --- Sort the styles alphabetically --- 
  const sortedCookingStyles = [...COOKING_STYLES].sort((a, b) => a.localeCompare(b));

  const handleToggle = (style: string) => {
    const newSelection = selectedStyles.includes(style)
      ? selectedStyles.filter(s => s !== style)
      : [...selectedStyles, style];
    onChange(newSelection);
  };

  return (
    <div className="w-full mb-6">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {/* --- Map over sorted styles --- */}
        {sortedCookingStyles.map((style) => {
          const isSelected = selectedStyles.includes(style);
          return (
            <label
              key={style}
              className={`flex items-center p-3 rounded-lg border cursor-pointer transition-colors duration-200 ${
                isSelected
                  ? 'border-gray-400 bg-gray-50' // Subtle border/bg change on select
                  : 'bg-white border-gray-300 hover:border-gray-400' 
              }`}
            >
              <Checkbox 
                checked={isSelected}
                onCheckedChange={() => handleToggle(style)}
                className="mr-2" // Add margin for spacing
                id={`cooking-style-${style}`} // Add id for label association
              />
              <label 
                htmlFor={`cooking-style-${style}`}
                className={`text-sm cursor-pointer ${isSelected ? 'font-medium text-black' : 'font-normal text-gray-700'}`}
              >
                 {style}
              </label>
            </label>
          );
        })}
      </div>
       <p className="mt-3 text-xs text-gray-500">
          Select one or more cooking styles.
       </p>
    </div>
  );
};

export default CookingStyleSelector; 