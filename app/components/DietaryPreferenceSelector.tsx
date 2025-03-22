const DIETARY_PREFERENCES = [
  'Gluten-Free',
  'Fermented',
  'Low-FODMAP',
  'Lactose-Free',
  'Pescatarian',
  'Nut-Free',
  'Vegan',
  'Vegetarian',
] as const;

type DietaryPreference = typeof DIETARY_PREFERENCES[number]; 