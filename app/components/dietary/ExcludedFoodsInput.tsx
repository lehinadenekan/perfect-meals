import React from 'react';

interface ExcludedFoodsInputProps {
  excludedFoods: string[];
  onExcludedFoodsChange: (foods: string[]) => void;
}

export const ExcludedFoodsInput: React.FC<ExcludedFoodsInputProps> = ({
  excludedFoods,
  onExcludedFoodsChange,
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const foods = e.target.value.split(',').map(food => food.trim()).filter(Boolean);
    onExcludedFoodsChange(foods);
  };

  return (
    <div className="w-full">
      <label htmlFor="excluded-foods" className="block text-sm font-medium text-gray-700 mb-1">
        Excluded Foods
      </label>
      <input
        id="excluded-foods"
        type="text"
        value={excludedFoods.join(', ')}
        onChange={handleInputChange}
        placeholder="Enter foods to exclude, separated by commas"
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
        aria-label="Enter foods to exclude, separated by commas"
      />
      <p className="mt-1 text-sm text-gray-500">
        Example: shellfish, mushrooms, cilantro
      </p>
    </div>
  );
}; 