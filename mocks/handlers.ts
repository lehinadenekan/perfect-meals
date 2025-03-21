import { http, HttpResponse } from 'msw';
import type { StrictResponse } from 'msw';

export const handlers = [
  // Mock user preferences API
  http.get('/api/user/preferences', () => {
    return HttpResponse.json({
      success: true,
      preferences: {
        dietTypes: ['vegan', 'gluten-free'],
        excludedFoods: ['peanuts'],
        selectedRegions: ['asian', 'mediterranean'],
        searchInput: '',
      },
    });
  }),

  // Mock preferences update API
  http.post('/api/user/preferences', () => {
    return HttpResponse.json({
      success: true,
      message: 'Preferences updated successfully',
    });
  }),

  // Mock recipe generation API
  http.post('/api/recipes/generate', () => {
    return HttpResponse.json({
      success: true,
      recipes: [
        {
          id: '1',
          title: 'Vegan Pasta',
          description: 'Delicious vegan pasta dish',
          cookingTime: '30 mins',
          servings: 4,
          difficulty: 'easy',
          cuisineType: 'italian',
          type: 'main',
          regionOfOrigin: 'mediterranean',
          imageUrl: '/images/vegan-pasta.jpg',
          calories: 400,
          isVegetarian: true,
          isVegan: true,
          isGlutenFree: false,
          isDairyFree: true,
          isNutFree: true,
          ingredients: ['pasta', 'tomatoes', 'basil'],
          instructions: ['Boil pasta', 'Add sauce'],
          nutritionFacts: null,
          notes: [],
          averageRating: 4.5,
        },
      ],
    });
  }),

  // Mock recipes API
  http.get('/api/recipes', () => {
    return HttpResponse.json([
      {
        id: '1',
        title: 'Vegan Pasta',
        description: 'Delicious vegan pasta dish',
        cookingTime: '30 mins',
        servings: 4,
        difficulty: 'easy',
        cuisineType: 'italian',
        type: 'main',
        regionOfOrigin: 'mediterranean',
        imageUrl: '/images/vegan-pasta.jpg',
        calories: 400,
        isVegetarian: true,
        isVegan: true,
        isGlutenFree: false,
        isDairyFree: true,
        isNutFree: true,
        ingredients: ['pasta', 'tomatoes', 'basil'],
        instructions: ['Boil pasta', 'Add sauce'],
        nutritionFacts: null,
        notes: [],
        averageRating: 4.5,
      },
    ]);
  }),
];