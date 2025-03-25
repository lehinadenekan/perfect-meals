import React, { useState, KeyboardEvent } from 'react';
import { X } from 'lucide-react';

interface ExcludedFoodsInputProps {
  excludedFoods: string[];
  onExcludedFoodsChange: (foods: string[]) => void;
}

export const ExcludedFoodsInput: React.FC<ExcludedFoodsInputProps> = ({
  excludedFoods,
  onExcludedFoodsChange,
}) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const newFood = inputValue.trim();
      if (newFood && !excludedFoods.includes(newFood)) {
        onExcludedFoodsChange([...excludedFoods, newFood]);
        setInputValue('');
      }
    } else if (e.key === 'Backspace' && !inputValue && excludedFoods.length > 0) {
      // Remove the last tag when backspace is pressed on empty input
      onExcludedFoodsChange(excludedFoods.slice(0, -1));
    }
  };

  const removeFood = (foodToRemove: string) => {
    onExcludedFoodsChange(excludedFoods.filter(food => food !== foodToRemove));
  };

  return (
    <div className="w-full mb-12">
      <label htmlFor="excluded-foods" className="block text-lg font-semibold text-gray-900 mb-3">
        Excluded Foods
      </label>
      <div className="min-h-[56px] w-full px-4 py-2 border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-yellow-400 focus-within:border-transparent bg-white shadow-sm">
        <div className="flex flex-wrap gap-2 mb-2">
          {excludedFoods.map((food) => (
            <span
              key={food}
              className="inline-flex items-center bg-yellow-100 px-3 py-1 rounded-full text-sm font-medium text-yellow-800 shadow-sm"
            >
              {food}
              <button
                type="button"
                onClick={() => removeFood(food)}
                className="ml-1.5 inline-flex items-center justify-center hover:bg-yellow-200 rounded-full p-0.5"
              >
                <X size={14} className="text-yellow-800" />
                <span className="sr-only">Remove {food}</span>
              </button>
            </span>
          ))}
        </div>
        <input
          id="excluded-foods"
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleInputKeyDown}
          placeholder={excludedFoods.length === 0 ? "Type a food and press Enter (e.g. shellfish, mushrooms)" : "Add another food..."}
          className="border-none p-0 w-full focus:ring-0 focus:outline-none text-sm"
          aria-label="Enter foods to exclude"
        />
      </div>
      <p className="mt-3 text-sm text-gray-600">
        Press Enter or comma to add a food item. Press Backspace to remove the last item.
      </p>
    </div>
  );
}; 