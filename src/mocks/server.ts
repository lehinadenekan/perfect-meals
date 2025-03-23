import { setupServer } from 'msw/node';
import { rest } from 'msw';

// Define handlers for your API endpoints
const handlers = [
  rest.get('http://localhost:3000/api/preferences', (req, res, ctx) => {
    return res(
      ctx.json({
        dietTypes: [],
        excludedFoods: [],
        selectedRegions: [],
        searchInput: '',
      })
    );
  }),

  rest.post('http://localhost:3000/api/recipes/generate', (req, res, ctx) => {
    return res(
      ctx.json({
        recipes: []
      })
    );
  }),
];

// Setup MSW server with the handlers
export const server = setupServer(...handlers); 