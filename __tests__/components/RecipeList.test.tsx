import { render, screen, fireEvent } from '../../src/test/utils/test-utils'
import { createMockRecipe } from '../../src/test/utils/test-utils'
import RecipeList from '../../app/components/recipe/RecipeList'

describe('RecipeList Component', () => {
  const mockRecipes = [
    createMockRecipe({
      id: '1',
      title: 'Vegetarian Pasta',
      isVegetarian: true,
      cuisineType: 'ITALIAN'
    }),
    createMockRecipe({
      id: '2',
      title: 'Chicken Curry',
      isVegetarian: false,
      cuisineType: 'INDIAN'
    }),
    createMockRecipe({
      id: '3',
      title: 'Vegan Salad',
      isVegetarian: true,
      isVegan: true,
      cuisineType: 'MEDITERRANEAN'
    })
  ]

  it('renders all recipes when no filters are applied', () => {
    render(<RecipeList recipes={mockRecipes} />)
    
    expect(screen.getByText('Vegetarian Pasta')).toBeInTheDocument()
    expect(screen.getByText('Chicken Curry')).toBeInTheDocument()
    expect(screen.getByText('Vegan Salad')).toBeInTheDocument()
  })

  it('filters recipes by dietary preference', () => {
    render(<RecipeList recipes={mockRecipes} />)
    
    // Select vegetarian filter
    fireEvent.click(screen.getByLabelText('Vegetarian'))
    
    expect(screen.getByText('Vegetarian Pasta')).toBeInTheDocument()
    expect(screen.queryByText('Chicken Curry')).not.toBeInTheDocument()
    expect(screen.getByText('Vegan Salad')).toBeInTheDocument()
  })

  it('filters recipes by cuisine', () => {
    render(<RecipeList recipes={mockRecipes} />)
    
    // Select Italian cuisine
    fireEvent.click(screen.getByLabelText('Italian'))
    
    expect(screen.getByText('Vegetarian Pasta')).toBeInTheDocument()
    expect(screen.queryByText('Chicken Curry')).not.toBeInTheDocument()
    expect(screen.queryByText('Vegan Salad')).not.toBeInTheDocument()
  })

  it('combines multiple filters', () => {
    render(<RecipeList recipes={mockRecipes} />)
    
    // Select both vegetarian and Italian filters
    fireEvent.click(screen.getByLabelText('Vegetarian'))
    fireEvent.click(screen.getByLabelText('Italian'))
    
    expect(screen.getByText('Vegetarian Pasta')).toBeInTheDocument()
    expect(screen.queryByText('Chicken Curry')).not.toBeInTheDocument()
    expect(screen.queryByText('Vegan Salad')).not.toBeInTheDocument()
  })

  it('shows "No recipes found" when no recipes match filters', () => {
    render(<RecipeList recipes={mockRecipes} />)
    
    // Select filters that no recipe matches
    fireEvent.click(screen.getByLabelText('Vegan'))
    fireEvent.click(screen.getByLabelText('Italian'))
    
    expect(screen.getByText('No recipes found')).toBeInTheDocument()
  })
}) 