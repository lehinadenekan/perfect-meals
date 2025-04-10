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
  cookingTime: number;
  servings: number;
  difficulty: string;
  cuisineType: string;
  regionOfOrigin?: string;
  imageUrl?: string;
  videoUrl?: string;
  calories?: number;
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
  averageRating?: number;
  type: string;
  cuisineId: string;
  authenticity: string;
  cookingMethods: string[];
  spiceLevel: string;
  subCuisineType?: string;
  jobId?: string;
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