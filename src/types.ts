// pH influence levels enum
export type pHInfluence = 
  | 'HIGHLY_ACIDIC' 
  | 'MODERATELY_ACIDIC' 
  | 'SLIGHTLY_ACIDIC' 
  | 'NEUTRAL' 
  | 'SLIGHTLY_ALKALINE' 
  | 'MODERATELY_ALKALINE' 
  | 'HIGHLY_ALKALINE';

// Interface for ingredient pH data
export interface IngredientpHData {
  name: string;
  standardName: string;
  pHInfluence: pHInfluence;
  category: string;
  notes?: string;
  variations?: string[];
}

// Additional types for the application

// Dietary preference options
export type DietaryPreference = 
  | 'Fermented'
  | 'Gluten-Free'
  | 'Lactose-Free'
  | 'Low-FODMAP'
  | 'Mediterranean'
  | 'Pescatarian'
  | 'Vegan'
  | 'Vegetarian';

// Meal interface
export interface Meal {
  id: string;
  name: string;
  description: string;
  ingredients: string[];
  dietaryTags: string[];
  cuisineRegion?: string;
  imageUrl?: string;
}

// Cuisine regions
export type CuisineRegion = 'Africa' | 'Americas' | 'Asia' | 'Europe' | 'Oceania'; 