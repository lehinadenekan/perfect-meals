'use client';

import React, { useState, useEffect } from 'react'
// Import the frontend Recipe type definition instead of the Prisma one
// import { Recipe } from '@prisma/client' 
import { Recipe } from '@/app/types/recipe'; // Assuming this is the correct path
import RecipeCard from './RecipeCard'
import RecipeDetailModal from './RecipeDetailModal'

interface RecipeListProps {
  recipes: (Recipe & { isFavorite?: boolean })[]; // Expect recipes with favorite status
}

export default function RecipeList({ recipes: initialRecipes }: RecipeListProps) {
  // Use state to manage the list locally, allowing updates to favorite status
  const [recipes, setRecipes] = useState(initialRecipes);

  // --- State for Modal Control ---
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Effect to update local state if the initialRecipes prop changes
  useEffect(() => {
    setRecipes(initialRecipes);
  }, [initialRecipes]);

  // --- Callback for Favorite Changes ---
  const handleFavoriteChange = (recipeId: string, newIsFavorite: boolean) => {
    setRecipes(currentRecipes =>
      currentRecipes.map(recipe =>
        recipe.id === recipeId
          ? { ...recipe, isFavorite: newIsFavorite }
          : recipe
      )
    );
    // If the updated recipe is the one in the modal, update modal state too
    if (selectedRecipe && selectedRecipe.id === recipeId) {
      setSelectedRecipe(prev => prev ? { ...prev, isFavorite: newIsFavorite } : null);
    }
  };

  // --- Modal Handlers ---
  const handleOpenModal = (recipe: Recipe) => {
    // Find the latest version from state to ensure modal gets correct favorite status
    const currentRecipeData = recipes.find(r => r.id === recipe.id) || recipe;
    setSelectedRecipe(currentRecipeData);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRecipe(null);
  };

  const [filters, setFilters] = useState({
    vegetarian: false,
    vegan: false,
    cuisine: ''
  })

  const filteredRecipes = recipes.filter(recipe => {
    if (filters.vegetarian && !recipe.isVegetarian) return false
    if (filters.vegan && !recipe.isVegan) return false
    if (filters.cuisine && recipe.cuisineType !== filters.cuisine) return false
    return true
  })

  if (!recipes || recipes.length === 0) {
    return <p className="text-center text-gray-500 py-8">No recipes to display.</p>; // Added some styling
  }

  return (
    <>
      <div className="mb-4">
        <label className="mr-4">
          <input
            type="checkbox"
            checked={filters.vegetarian}
            onChange={e => setFilters({ ...filters, vegetarian: e.target.checked })}
            aria-label="Vegetarian"
          />
          <span className="ml-2">Vegetarian</span>
        </label>
        <label className="mr-4">
          <input
            type="checkbox"
            checked={filters.vegan}
            onChange={e => setFilters({ ...filters, vegan: e.target.checked })}
            aria-label="Vegan"
          />
          <span className="ml-2">Vegan</span>
        </label>
        <label>
          <input
            type="radio"
            name="cuisine"
            value="ITALIAN"
            checked={filters.cuisine === 'ITALIAN'}
            onChange={e => setFilters({ ...filters, cuisine: e.target.value })}
            aria-label="Italian"
          />
          <span className="ml-2">Italian</span>
        </label>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map(recipe => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onSelect={handleOpenModal}
              onFavoriteChange={handleFavoriteChange}
            />
          ))
        ) : (
          <p>No recipes found</p>
        )}
      </div>

      {/* Render Modal Conditionally */}
      {selectedRecipe && (
        <RecipeDetailModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          recipe={selectedRecipe}
          onFavoriteChange={handleFavoriteChange}
        />
      )}
    </>
  )
} 