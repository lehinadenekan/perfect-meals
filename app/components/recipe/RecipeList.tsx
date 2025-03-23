import React, { useState } from 'react'
import { Recipe } from '@prisma/client'
import RecipeCard from './RecipeCard'

interface RecipeListProps {
  recipes: Recipe[]
}

export default function RecipeList({ recipes }: RecipeListProps) {
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

  return (
    <div>
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map(recipe => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))
        ) : (
          <p>No recipes found</p>
        )}
      </div>
    </div>
  )
} 