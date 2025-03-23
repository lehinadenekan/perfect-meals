import { rest } from 'msw';

export const handlers = [
  // Mock user preferences API
  rest.get('http://localhost:3000/api/preferences', (req, res, ctx) => {
    return res(
      ctx.json({
        dietTypes: ['vegan', 'gluten-free'],
        excludedFoods: ['peanuts'],
        selectedRegions: [],
        searchInput: ''
      })
    );
  }),

  // Mock update preferences API
  rest.post('http://localhost:3000/api/preferences', (req, res, ctx) => {
    return res(
      ctx.json({
        message: 'Preferences updated successfully'
      })
    );
  }),

  // Mock delete preferences API
  rest.delete('http://localhost:3000/api/preferences', (req, res, ctx) => {
    return res(
      ctx.json({
        message: 'Preferences cleared successfully'
      })
    );
  }),

  // Mock recipe generation API
  rest.post('http://localhost:3000/api/recipes/generate', (req, res, ctx) => {
    return res(
      ctx.json({
        recipes: [
          {
            id: '1',
            title: 'Vegan Pasta',
            description: 'A delicious vegan pasta dish',
            cookingTime: '30 minutes',
            servings: 4,
            ingredients: [
              '400g pasta',
              '2 cups marinara sauce',
              '1 cup mushrooms',
              'Fresh basil'
            ],
            instructions: [
              'Cook pasta according to package instructions',
              'Sauté mushrooms',
              'Mix with marinara sauce',
              'Garnish with fresh basil'
            ],
            dietaryInfo: ['vegan', 'gluten-free'],
            imageUrl: '/images/vegan-pasta.jpg'
          }
        ]
      })
    );
  }),

  // Mock debug recipe generation API
  rest.post('/api/debug/recipe-generation', (req, res, ctx) => {
    return res(
      ctx.json({
        duration_ms: 1234,
        success: true,
        logs: {
          preferences: req.body,
          steps: ['Fetched preferences', 'Generated recipes']
        }
      })
    );
  })
];