export type DietType = 'fermented' | 'gluten-free' | 'lactose-free' | 'low-FODMAP' | 'nut-free' | 'pescatarian' | 'vegan' | 'vegetarian';

export const DIET_TYPES: Record<DietType, { title: string; description: string }> = {
  'fermented': {
    title: 'Fermented',
    description: 'Includes foods produced or preserved through fermentation',
  },
  'gluten-free': {
    title: 'Gluten-Free',
    description: 'No wheat, barley, rye, or their derivatives',
  },
  'lactose-free': {
    title: 'Lactose-Free',
    description: 'No milk products or lactose-containing foods',
  },
  'low-FODMAP': {
    title: 'Low-FODMAP',
    description: 'Excludes fermentable carbs that may cause digestive issues',
  },
  'nut-free': {
    title: 'Nut-Free',
    description: 'No nuts or nut-derived ingredients',
  },
  'pescatarian': {
    title: 'Pescatarian',
    description: 'No meat or poultry, but includes fish and seafood',
  },
  'vegan': {
    title: 'Vegan',
    description: 'No animal products whatsoever',
  },
  'vegetarian': {
    title: 'Vegetarian',
    description: 'No meat, fish, or poultry',
  },
}; 