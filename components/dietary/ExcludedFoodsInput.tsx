import React, { useState, KeyboardEvent } from 'react';

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
      const newFood = inputValue.trim().toLowerCase();
      if (newFood && !excludedFoods.includes(newFood)) {
        onExcludedFoodsChange([...excludedFoods, newFood]);
        setInputValue('');
      }
    } else if (e.key === 'Backspace' && !inputValue && excludedFoods.length > 0) {
      onExcludedFoodsChange(excludedFoods.slice(0, -1));
    }
  };

  // --- Handler to remove a specific food --- 
  const handleRemoveFood = (foodToRemove: string) => {
    onExcludedFoodsChange(excludedFoods.filter(food => food !== foodToRemove));
  };

  return (
    <div className="w-full">
      <div className="w-full border-2 border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-yellow-400 focus-within:border-transparent bg-white shadow-md transition-all duration-200 hover:border-yellow-300">
        <input
          id="excluded-foods"
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleInputKeyDown}
          placeholder="Type foods to exclude and press Enter (e.g. pork, mushrooms)"
          className="w-full border-none py-2 px-4 focus:ring-0 focus:outline-none placeholder-gray-400"
          aria-label="Enter foods to exclude"
        />
      </div>
      
      {/* --- Display Excluded Food Pills --- */}
      {excludedFoods.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {excludedFoods.map((food, index) => (
            <span
              key={`${food}-${index}`}
              className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800"
            >
              {food}
              <button
                type="button"
                onClick={() => handleRemoveFood(food)}
                className="ml-1.5 flex-shrink-0 inline-flex items-center justify-center h-4 w-4 rounded-full text-red-500 hover:bg-red-200 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                aria-label={`Remove ${food}`}
              >
                <span className="sr-only">Remove {food}</span>
                <svg className="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
                  <path strokeLinecap="round" strokeWidth="1.5" d="M1 1l6 6m0-6L1 7" />
                </svg>
              </button>
            </span>
          ))}
        </div>
      )}

      <p className="mt-3 text-sm text-gray-600">
        Press Enter or comma to add a food item. Press Backspace to remove the last item.
      </p>
    </div>
  );
}; 