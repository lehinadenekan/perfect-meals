import React from 'react';
import { render, screen, fireEvent } from '../../src/test/utils/test-utils'
import { createMockRecipe } from '../../src/test/utils/test-utils'
import RecipeList from '../../app/components/recipe/RecipeList'
import { Recipe } from '@/app/types/recipe';

// Mock child components
jest.mock('@/app/components/recipe/RecipeCard', () => {
    return function MockRecipeCard({ recipe, onSelect, onFavoriteChange }: any) {
        return (
            <div data-testid={`recipe-card-${recipe.id}`} onClick={() => onSelect(recipe)}>
                <h3>{recipe.title}</h3>
                <button onClick={() => onFavoriteChange(recipe.id, !recipe.isFavorite)}>
                    {recipe.isFavorite ? 'Unfavorite' : 'Favorite'}
                </button>
            </div>
        );
    };
});

jest.mock('@/app/components/recipe/RecipeDetailModal', () => {
    return function MockRecipeDetailModal({ isOpen }: { isOpen: boolean }) {
        return isOpen ? <div data-testid="recipe-modal">Modal Open</div> : null;
    };
});

describe('RecipeList Component', () => {
  const mockRecipes: (Recipe & { isFavorite?: boolean })[] = [
    {
      id: '1',
      title: 'Recipe 1',
      description: 'Desc 1',
      cookingTime: 30,
      servings: 4,
      difficulty: 'Easy',
      cuisineType: 'Italian',
      regionOfOrigin: 'Italy',
      imageUrl: 'img1.jpg',
      authorId: 'author1',
      isVegetarian: false,
      isVegan: false,
      isGlutenFree: false,
      isNutFree: true,
      isLactoseFree: false,
      isLowFodmap: false,
      isPescatarian: false,
      isFermented: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      type: 'Dinner',
      cuisineId: 'italian-1',
      authenticity: 'Traditional',
      cookingMethods: ['Bake'],
      spiceLevel: 'Mild',
      averageRating: 4.0,
      showCount: 0,
      hasFeatureFermented: false,
      hasFermentedIngredients: false,
      hasFish: false,
      notes: [],
      ingredients: [],
      instructions: [],
      isFavorite: false,
    },
    {
      id: '2',
      title: 'Recipe 2',
      description: 'Desc 2',
      cookingTime: 45,
      servings: 2,
      difficulty: 'Medium',
      cuisineType: 'Mexican',
      regionOfOrigin: 'Mexico',
      imageUrl: 'img2.jpg',
      authorId: 'author2',
      isVegetarian: true,
      isVegan: false,
      isGlutenFree: true,
      isNutFree: false,
      isLactoseFree: true,
      isLowFodmap: false,
      isPescatarian: false,
      isFermented: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      type: 'Lunch',
      cuisineId: 'mexican-1',
      authenticity: 'Modern',
      cookingMethods: ['Grill'],
      spiceLevel: 'Medium',
      averageRating: 4.5,
      showCount: 0,
      hasFeatureFermented: false,
      hasFermentedIngredients: false,
      hasFish: false,
      notes: [],
      ingredients: [],
      instructions: [],
      isFavorite: true,
    },
  ]

  it('renders all recipes when no filters are applied', () => {
    render(<RecipeList recipes={mockRecipes} />)
    
    expect(screen.getByText('Recipe 1')).toBeInTheDocument()
    expect(screen.getByText('Recipe 2')).toBeInTheDocument()
  })

  it('filters recipes by dietary preference', () => {
    render(<RecipeList recipes={mockRecipes} />)
    
    // Select vegetarian filter
    fireEvent.click(screen.getByLabelText('Vegetarian'))
    
    expect(screen.getByText('Recipe 1')).toBeInTheDocument()
    expect(screen.queryByText('Recipe 2')).not.toBeInTheDocument()
  })

  it('filters recipes by cuisine', () => {
    render(<RecipeList recipes={mockRecipes} />)
    
    // Select Italian cuisine
    fireEvent.click(screen.getByLabelText('Italian'))
    
    expect(screen.getByText('Recipe 1')).toBeInTheDocument()
    expect(screen.queryByText('Recipe 2')).not.toBeInTheDocument()
  })

  it('combines multiple filters', () => {
    render(<RecipeList recipes={mockRecipes} />)
    
    // Select both vegetarian and Italian filters
    fireEvent.click(screen.getByLabelText('Vegetarian'))
    fireEvent.click(screen.getByLabelText('Italian'))
    
    expect(screen.getByText('Recipe 1')).toBeInTheDocument()
    expect(screen.queryByText('Recipe 2')).not.toBeInTheDocument()
  })

  it('shows "No recipes found" when no recipes match filters', () => {
    render(<RecipeList recipes={mockRecipes} />)
    
    // Select filters that no recipe matches
    fireEvent.click(screen.getByLabelText('Vegan'))
    fireEvent.click(screen.getByLabelText('Italian'))
    
    expect(screen.getByText('No recipes found')).toBeInTheDocument()
  })

  it('renders message when no recipes are provided', () => {
    render(<RecipeList recipes={[]} />);
    expect(screen.getByText('No recipes to display.')).toBeInTheDocument();
  });

  it('opens modal when a recipe card is clicked', () => {
    render(<RecipeList recipes={mockRecipes} />);
    fireEvent.click(screen.getByTestId('recipe-card-1'));
    expect(screen.getByTestId('recipe-modal')).toBeInTheDocument();
  });

  it('updates favorite status when favorite button is clicked (mocked)', () => {
    render(<RecipeList recipes={mockRecipes} />);
    const favoriteButtonRecipe1 = screen.getByTestId('recipe-card-1').querySelector('button');
    expect(favoriteButtonRecipe1).toHaveTextContent('Favorite');
    fireEvent.click(favoriteButtonRecipe1!);
    expect(favoriteButtonRecipe1).toHaveTextContent('Unfavorite');
  });
}) 