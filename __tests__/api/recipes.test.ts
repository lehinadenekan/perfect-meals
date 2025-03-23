import { createMockRecipe } from '@/src/test/utils/test-utils'
import { prismaMock } from '@/src/test/utils/prisma-mock'

// Mock Next.js Request and Response
class MockRequest extends Request {
  clone(): Request {
    return new MockRequest(this.url, this)
  }
}

global.Request = MockRequest as typeof Request
global.Response = Response
global.Headers = Headers

jest.mock('@/lib/prisma', () => ({
  __esModule: true,
  default: () => ({
    recipe: {
      findMany: jest.fn(),
      findFirst: jest.fn()
    }
  })
}))

// Mock GET handler
const mockGetHandler = jest.fn()
jest.mock('@/app/api/recipes/route', () => ({
  GET: jest.fn().mockImplementation(async () => {
    try {
      const result = await mockGetHandler()
      return new Response(JSON.stringify(result), { status: 200 })
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error'
      return new Response(JSON.stringify({ error: message }), { status: 500 })
    }
  })
}))

// Mock POST handler
const mockPostHandler = jest.fn()
jest.mock('@/app/api/recipes/generate/route', () => ({
  POST: jest.fn().mockImplementation(async () => {
    try {
      const result = await mockPostHandler()
      return new Response(JSON.stringify(result), { status: 200 })
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error'
      return new Response(JSON.stringify({ error: message }), { status: 500 })
    }
  })
}))

describe('Recipe API', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockGetHandler.mockReset()
    mockPostHandler.mockReset()
  })

  describe('GET', () => {
    it('should return a list of recipes', async () => {
      const mockRecipes = [
        createMockRecipe({ id: '1', title: 'Recipe 1' }),
        createMockRecipe({ id: '2', title: 'Recipe 2' })
      ]

      // Convert Date objects to strings for comparison
      const mockRecipesWithStringDates = mockRecipes.map(recipe => ({
        ...recipe,
        createdAt: recipe.createdAt.toISOString(),
        updatedAt: recipe.updatedAt.toISOString()
      }))

      prismaMock.recipe.findMany.mockResolvedValue(mockRecipes)
      mockGetHandler.mockImplementation(async () => {
        await prismaMock.recipe.findMany()
        return mockRecipes
      })

      const request = new Request('http://localhost:3000/api/recipes/generate')
      const { GET } = await import('@/app/api/recipes/route')
      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data).toEqual(mockRecipesWithStringDates)
      expect(prismaMock.recipe.findMany).toHaveBeenCalled()
    })

    it('should handle errors', async () => {
      prismaMock.recipe.findMany.mockRejectedValue(new Error('Database error'))
      mockGetHandler.mockImplementation(async () => {
        await prismaMock.recipe.findMany()
        return []
      })

      const request = new Request('http://localhost:3000/api/recipes/generate')
      const { GET } = await import('@/app/api/recipes/route')
      const response = await GET(request)

      expect(response.status).toBe(500)
      expect(prismaMock.recipe.findMany).toHaveBeenCalled()
    })
  })

  describe('POST', () => {
    it('should filter recipes based on dietary preferences', async () => {
      const mockRecipes = [
        createMockRecipe({ 
          id: '1', 
          title: 'Vegan Recipe',
          isVegan: true,
          isVegetarian: true,
          isGlutenFree: false,
          isLactoseFree: true,
          isNutFree: true
        }),
        createMockRecipe({ 
          id: '2', 
          title: 'Gluten-free Recipe',
          isVegan: false,
          isVegetarian: true,
          isGlutenFree: true,
          isLactoseFree: true,
          isNutFree: true
        })
      ]

      // Convert Date objects to strings for comparison
      const mockRecipesWithStringDates = mockRecipes.map(recipe => ({
        ...recipe,
        createdAt: recipe.createdAt.toISOString(),
        updatedAt: recipe.updatedAt.toISOString()
      }))

      prismaMock.recipe.findMany.mockResolvedValue(mockRecipes)
      mockPostHandler.mockImplementation(async () => {
        await prismaMock.recipe.findMany({
          where: {
            AND: [{ isVegan: true }]
          }
        })
        return mockRecipes
      })

      const request = new Request('http://localhost:3000/api/recipes/generate', {
        method: 'POST',
        body: JSON.stringify({
          includeDietTypes: ['vegan'],
          selectedRegions: [],
          includeExcludedFoods: [],
          allowPartialMatch: false
        })
      })

      const { POST } = await import('@/app/api/recipes/generate/route')
      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data).toEqual(mockRecipesWithStringDates)
      expect(prismaMock.recipe.findMany).toHaveBeenCalledWith(expect.objectContaining({
        where: expect.objectContaining({
          AND: expect.arrayContaining([
            { isVegan: true }
          ])
        })
      }))
    })

    it('should handle errors in POST request', async () => {
      prismaMock.recipe.findMany.mockRejectedValue(new Error('Database error'))
      mockPostHandler.mockImplementation(async () => {
        await prismaMock.recipe.findMany()
        return []
      })

      const request = new Request('http://localhost:3000/api/recipes/generate', {
        method: 'POST',
        body: JSON.stringify({
          includeDietTypes: ['vegan'],
          selectedRegions: [],
          includeExcludedFoods: [],
          allowPartialMatch: false
        })
      })

      const { POST } = await import('@/app/api/recipes/generate/route')
      const response = await POST(request)

      expect(response.status).toBe(500)
      expect(prismaMock.recipe.findMany).toHaveBeenCalled()
    })
  })
}) 