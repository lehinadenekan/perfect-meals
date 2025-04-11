// app/components/my-recipes/MyRecipesView.tsx
import React from 'react';

// 1. Define the props interface
interface MyRecipesViewProps {
  onCreateClick: () => void;
}

// 2. Update component signature to accept props
const MyRecipesView = ({ onCreateClick }: MyRecipesViewProps) => {
  // Placeholder content
  return (
    <div className="p-4 bg-white rounded-lg shadow"> {/* Added some basic styling */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">My Created Recipes</h2>
         {/* 3. Add a button to use the prop */}
        <button
          onClick={onCreateClick}
          className="px-4 py-2 bg-yellow-500 text-black rounded-md hover:bg-yellow-600 transition-colors text-sm font-medium"
        >
          + Create New Recipe
        </button>
      </div>
      <p className="text-gray-600">Your created recipes will appear here.</p>
      {/* Placeholder for recipe list */}
    </div>
  );
};

export default MyRecipesView;