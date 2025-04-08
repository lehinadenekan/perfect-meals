'use client';

import React, { useState, useEffect } from 'react'
// Revert to using the frontend Recipe type
import { Recipe } from '@/app/types/recipe'; 
import RecipeCard from './RecipeCard'
import RecipeDetailModal from './RecipeDetailModal'

// Revert prop type
interface RecipeListProps {
  recipes: (Recipe & { isFavorite?: boolean })[]; 
}

export default function RecipeList({ recipes: initialRecipes }: RecipeListProps) {
  // Revert state type
  const [recipes, setRecipes] = useState(initialRecipes);

  // Revert modal state type
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setRecipes(initialRecipes);
  }, [initialRecipes]);

  const handleFavoriteChange = (recipeId: string, newIsFavorite: boolean) => {
    setRecipes(currentRecipes =>
      currentRecipes.map(recipe =>
        recipe.id === recipeId
          ? { ...recipe, isFavorite: newIsFavorite }
          : recipe
      )
    );
    if (selectedRecipe && selectedRecipe.id === recipeId) {
      // Ensure the update here matches the Recipe type
      setSelectedRecipe(prev => prev ? { ...prev, isFavorite: newIsFavorite } : null);
    }
  };

  // Revert handleOpenModal parameter type
  const handleOpenModal = (recipe: Recipe) => { 
    const currentRecipeData = recipes.find(r => r.id === recipe.id) || recipe;
    // Ensure selectedRecipe state matches Recipe type
    setSelectedRecipe(currentRecipeData);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRecipe(null);
  };

  // Revert filter logic check if needed (assuming FrontendRecipeType has these fields)
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
    return <p className="text-center text-gray-500 py-8">No recipes to display.</p>;
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
              recipe={recipe} // Should now match RecipeCard's expected prop type
              onSelect={handleOpenModal} // Parameter type matches again
              onFavoriteChange={handleFavoriteChange}
            />
          ))
        ) : (
          <p>No recipes found</p>
        )}
      </div>

      {selectedRecipe && (
        <RecipeDetailModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          recipe={selectedRecipe} // Should now match RecipeDetailModal's expected prop type
          onFavoriteChange={handleFavoriteChange}
        />
      )}
    </>
  )
} 