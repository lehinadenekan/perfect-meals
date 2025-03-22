export type Difficulty = 'EASY' | 'MEDIUM' | 'HARD';

export type PreferenceLevel = 'love' | 'like' | 'neutral' | 'dislike';

export type AllergySeverity = 'mild' | 'moderate' | 'severe';

export type CookingTime = '0-30' | '30-60' | '60+';

export type SkillLevel = 'beginner' | 'intermediate' | 'advanced';

export type MealType = 'BREAKFAST' | 'LUNCH' | 'DINNER' | 'SNACK' | 'DESSERT' | 'BEVERAGE' | 'SIDE' | 'MAIN';

export interface Recipe {
  id: string;
  title: string;
  description?: string;
  cookingTime: number;
  servings: number;
  difficulty: Difficulty;
  cuisineType: string;
  type: MealType;
  regionOfOrigin?: string;
  imageUrl?: string;
  videoUrl?: string;
  calories?: number;
  authorId: string;
  isVegetarian: boolean;
  isVegan: boolean;
  isGlutenFree: boolean;
  isLactoseFree: boolean;
  isNutFree: boolean;
  averageRating?: number | null;
  ingredients: Ingredient[];
  instructions: Instruction[];
  nutritionFacts?: NutritionFacts;
  categories: Category[];
  tags: Tag[];
}

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
  id: string;
  protein?: number;
  carbs?: number;
  fat?: number;
  fiber?: number;
  sugar?: number;
  sodium?: number;
  recipeId: string;
}

export interface Category {
  id: string;
  name: string;
}

export interface Tag {
  id: string;
  name: string;
}

export interface UserPreference {
  id: string;
  userEmail: string;
  cookingTime: CookingTime;
  skillLevel: SkillLevel;
  servingSize: number;
  mealPrep: boolean;
  isVegetarian: boolean;
  isVegan: boolean;
  isGlutenFree: boolean;
  isLactoseFree: boolean;
  isKosher: boolean;
  isHalal: boolean;
  isLowCarb: boolean;
}

export interface UserAllergy {
  id: string;
  userEmail: string;
  ingredientId: string;
  severity: AllergySeverity;
  ingredient: StandardIngredient;
}

export interface StandardIngredient {
  id: string;
  name: string;
  category: string;
}

export interface Cuisine {
  id: string;
  name: string;
  region: string;
  imageUrl?: string;
}

export interface UserCuisinePreference {
  id: string;
  userEmail: string;
  cuisineId: string;
  cuisine: Cuisine;
  preferenceLevel: PreferenceLevel;
} 