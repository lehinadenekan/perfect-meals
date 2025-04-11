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
      <p className="mt-3 text-sm text-gray-600">
        Press Enter or comma to add a food item. Press Backspace to remove the last item.
      </p>
    </div>
  );
}; 