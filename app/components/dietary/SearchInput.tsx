import React from 'react';

interface SearchInputProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  searchTerm,
  onSearchChange,
}) => {
  return (
    <div className="w-full">
      <label htmlFor="recipe-search" className="block text-sm font-medium text-gray-700 mb-1">
        Search Recipes
      </label>
      <input
        id="recipe-search"
        type="text"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search for recipes..."
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
        aria-label="Search for recipes"
      />
    </div>
  );
}; 