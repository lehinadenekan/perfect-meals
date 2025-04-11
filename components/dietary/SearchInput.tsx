import React from 'react';
import { Search } from 'lucide-react';

interface SearchInputProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  searchTerm,
  onSearchChange,
}) => {
  return (
    <div className="w-full mb-8">
      <label htmlFor="recipe-search" className="block text-lg font-semibold text-gray-900 mb-3">
        Search Recipes
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          id="recipe-search"
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search for recipes by name, ingredients, or cuisine..."
          className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent bg-white shadow-md transition-all duration-200 hover:border-yellow-300 placeholder-gray-400"
          aria-label="Search for recipes"
        />
      </div>
      <p className="mt-2 text-sm text-gray-600">
        Try searching for specific ingredients, cuisines, or dish names
      </p>
    </div>
  );
}; 