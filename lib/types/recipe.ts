export type RecipeSource = 'ADMIN' | 'USER_CREATED' | 'USER_IMPORTED';

export interface Ingredient {
  id: string;
  name: string;
  amount: number;
  unit: string;
  notes?: string;
  recipeId: string;
}

export interface Instruction {
  id: string;
  stepNumber: number;
  description: string;
  recipeId: string;
  imageUrl?: string;
}

export interface NutritionFacts {
  protein?: number;
  carbs?: number;
  fat?: number;
}

export interface Author {
  name: string;
  image?: string;
  imageUrl?: string;
  videoUrl?: string;
  authorId: string;
  author?: Author;
  isVegetarian: boolean;
  isVegan: boolean;
  isGlutenFree: boolean;
  isNutFree: boolean;
  isLowFodmap: boolean;
  isLactoseFree: boolean;
  isPescatarian: boolean;
  isFermented: boolean;
  updatedAt: Date;
  notes?: string[];
  nutritionFacts?: NutritionFacts;

}

export interface Recipe {
  id: string;
  title: string;
  description?: string;
  source: RecipeSource;
  cookingTime: number;
  servings: number;
  difficulty: string;
  continent?: string;
  regionOfOrigin?: string;
  imageUrl?: string;
  videoUrl?: string;
  calories?: number;
  authorId: string;
  isVegetarian: boolean;
  isVegan: boolean;
  isGlutenFree: boolean;
  isNutFree: boolean;
  isLowFodmap: boolean;
  isLactoseFree: boolean;
  isPescatarian: boolean;
  isFermented: boolean;
  averageRating?: number;
  type: string;
  cuisineId?: string;
  authenticity: string;
  cookingStyles: string[];
  spiceLevel: string;
  subCuisineType?: string;
  showCount: number;
  hasFeatureFermented: boolean;
  hasFermentedIngredients: boolean;
  hasFish: boolean;
  ingredients: Ingredient[];
  instructions: Instruction[];
  createdAt: Date;
  updatedAt: Date;
  notes?: string[];
  nutritionFacts?: NutritionFacts;
  isFavourite?: boolean;
} 