import '@testing-library/jest-dom';
import { server } from '../mocks/server';
import { rest } from 'msw';
import 'whatwg-fetch';

// Polyfill TextEncoder/TextDecoder if not available
if (typeof TextEncoder === 'undefined') {
  global.TextEncoder = class TextEncoder {
    encoding = 'utf-8';
    encode(str: string): Uint8Array {
      const arr = new Uint8Array(str.length);
      for (let i = 0; i < str.length; i++) {
        arr[i] = str.charCodeAt(i);
      }
      return arr;
    }
    encodeInto(str: string, dest: Uint8Array): { read: number; written: number } {
      const encoded = this.encode(str);
      dest.set(encoded);
      return { read: str.length, written: encoded.length };
    }
  } as unknown as typeof TextEncoder;
}

if (typeof TextDecoder === 'undefined') {
  global.TextDecoder = class TextDecoder {
    encoding = 'utf-8';
    fatal = false;
    ignoreBOM = false;
    decode(arr: Uint8Array): string {
      return String.fromCharCode.apply(null, Array.from(arr));
    }
  } as unknown as typeof TextDecoder;
}

// Mock next-auth
jest.mock('next-auth/react', () => ({
  useSession: jest.fn(() => ({
    data: {
      user: {
        id: 'test-user-id',
        email: 'test@example.com'
      }
    },
    status: 'authenticated'
  }))
}));

beforeAll(() => {
  // Mock Request
  class MockRequest extends Request {
    clone(): Request {
      return new MockRequest(this.url, this);
    }
  }
  global.Request = MockRequest as typeof Request;

  // Mock Response and Headers
  global.Response = Response;
  global.Headers = Headers;

  // Setup MSW handlers
  server.use(
    rest.get('http://localhost:3000/api/preferences', (_req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          dietTypes: ['vegan', 'gluten-free'],
          excludedFoods: ['peanuts'],
          selectedRegions: ['asian'],
          searchInput: ''
        })
      );
    }),

    rest.post('http://localhost:3000/api/recipes/generate', (_req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          recipes: [
            {
              id: '1',
              title: 'Vegan Pasta',
              description: 'A delicious vegan pasta dish',
              cookingTime: 30,
              servings: 4,
              difficulty: 'MEDIUM',
              continent: 'Europe',
              regionOfOrigin: 'Italy',
              imageUrl: 'https://example.com/image.jpg',
              videoUrl: null,
              calories: 500,
              authorId: 'test-user-id',
              isVegetarian: true,
              isVegan: true,
              isGlutenFree: false,
              isLactoseFree: true,
              isNutFree: true,
              averageRating: null,
              type: 'DINNER',
              cuisineId: 'mock-cuisine-id',
              authenticity: 'TRADITIONAL',
              cookingMethods: ['BAKING', 'ROASTING'],
              spiceLevel: 'MEDIUM',
              jobId: null,
              showCount: 0,
              createdAt: new Date(),
              updatedAt: new Date()
            }
          ]
        })
      );
    }),

    rest.post('http://localhost:3000/api/preferences', (_req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          success: true,
          message: 'Preferences updated successfully'
        })
      );
    }),

    rest.delete('http://localhost:3000/api/preferences', (_req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          success: true,
          message: 'Preferences cleared successfully'
        })
      );
    })
  );

  // Enable API mocking before tests
  server.listen();
});

afterEach(() => {
  // Reset any runtime request handlers we may add during the tests
  server.resetHandlers();
});

afterAll(() => {
  // Clean up after the tests are finished
  server.close();
}); 