export type DietType = 'gluten-free' | 'lactose-free' | 'low-FODMAP' | 'nut-free' | 'pescatarian' | 'pork-free' | 'vegan' | 'vegetarian';

export const DIET_TYPES: Record<DietType, { title: string; description: string }> = {
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
  'pork-free': {
    title: 'Pork-Free',
    description: 'No pork or pork-derived ingredients',
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