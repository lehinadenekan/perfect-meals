// components/my-recipes/UserRecipes.tsx
import React from 'react';

// 1. Define the props interface
interface UserRecipesProps {
  onCreateClick: () => void;
}

// 2. Update component signature to accept props
const UserRecipes = ({ onCreateClick }: UserRecipesProps) => {

  // Add logic here later to fetch and display user's created recipes

  return (
    <div className="p-4 md:p-6 bg-white rounded-lg shadow"> {/* Card styling */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl md:text-2xl font-semibold">My Created Recipes</h2>
        {/* 3. Add a button that uses the passed function */}
        <button
          onClick={onCreateClick}
          className="px-3 py-2 bg-yellow-400 text-black rounded-md hover:bg-yellow-500 transition-colors text-sm font-medium shadow-sm"
        >
          + Create New Recipe
        </button>
      </div>
      <div className="text-center text-gray-500 py-8">
         <p>Your created recipes will appear here.</p>
         {/* Placeholder for recipe list or empty state */}
      </div>
    </div>
  );
};

export default UserRecipes;