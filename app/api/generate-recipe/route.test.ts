import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { POST } from './route'; // Import the POST handler
import { NextRequest } from 'next/server';
import { getServerSession } from 'next-auth/next';
// import OpenAI from 'openai'; // Unused import

// --- Mocks ---

// Mock next-auth/next
vi.mock('next-auth/next', () => ({
  getServerSession: vi.fn(),
}));

// Mock the OpenAI client instance used in route.ts
// We need to mock the specific instance creation and its methods
const mockCreate = vi.fn();
vi.mock('openai', () => {
    // Mock the default export which is the OpenAI class
    const ActualOpenAI = vi.importActual('openai'); // Get the actual class if needed
    return {
        default: vi.fn(() => ({ // Mock the constructor
            chat: {
                completions: {
                    create: mockCreate, // Provide the mock function for the method
                },
            },
        })),
        // Keep other exports like APIError if needed
        ...ActualOpenAI
    };
});

// Helper function to create a mock NextRequest
// Using unknown instead of any for the body
function createMockRequest(body: unknown): NextRequest {
  const request = new Request('http://localhost/api/generate-recipe', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  // Cast to NextRequest (might need adjustments based on your specific usage)
  return request as NextRequest;
}

// --- Tests ---

describe('API Route: /api/generate-recipe', () => {

  beforeEach(() => {
    // Reset mocks before each test
    vi.mocked(getServerSession).mockClear();
    mockCreate.mockClear();
    // Reset environment variables if modified
    // process.env.OPENROUTER_API_KEY = 'test-key';
  });

  afterEach(() => {
      vi.restoreAllMocks();
  });

  it('should return 401 Unauthorized if user is not authenticated', async () => {
    // Arrange: Mock session to return null
    vi.mocked(getServerSession).mockResolvedValue(null);
    const mockRequest = createMockRequest({ ingredients: 'test' });

    // Act
    const response = await POST(mockRequest);

    // Assert
    expect(response.status).toBe(401);
    const json = await response.json();
    expect(json.error).toBe('Unauthorized');
    expect(mockCreate).not.toHaveBeenCalled(); // AI should not be called
  });

  it('should return 400 Bad Request if input validation fails', async () => {
    // Arrange: Mock session to be authenticated
    vi.mocked(getServerSession).mockResolvedValue({ user: { id: 'test-user-id' } });
    const mockRequest = createMockRequest({ ingredients: '' }); // Invalid: empty ingredients

    // Act
    const response = await POST(mockRequest);

    // Assert
    expect(response.status).toBe(400);
    const json = await response.json();
    expect(json.error).toBe('Invalid input.');
    expect(json.details?.ingredients).toBeDefined();
    expect(mockCreate).not.toHaveBeenCalled(); // AI should not be called
  });

  it('should return 200 OK and recipe data on successful generation', async () => {
    // Arrange: Mock session
    vi.mocked(getServerSession).mockResolvedValue({ user: { id: 'test-user-id' } });
    // Mock AI response
    const mockAiRecipe = {
        title: "Mock Recipe",
        ingredients: [{ name: "Mock Ingredient", amount: 1, unit: "cup" }],
        instructions: ["Mock instruction 1"],
        timeEstimate: "Approx. 10 mins",
        difficulty: "Easy"
    };
    mockCreate.mockResolvedValue({
        choices: [{ message: { content: JSON.stringify(mockAiRecipe) } }]
    });
    const mockRequest = createMockRequest({ ingredients: 'mock, test' });

    // Act
    const response = await POST(mockRequest);

    // Assert
    expect(response.status).toBe(200);
    expect(mockCreate).toHaveBeenCalledTimes(1);
    const json = await response.json();
    expect(json.title).toBe(mockAiRecipe.title);
    expect(json.ingredients).toEqual(mockAiRecipe.ingredients);
    expect(json.instructions).toEqual(mockAiRecipe.instructions);
    expect(json.timeEstimate).toBe(mockAiRecipe.timeEstimate);
    expect(json.difficulty).toBe(mockAiRecipe.difficulty);
  });

   it('should return 500 Internal Server Error if AI call fails', async () => {
    // Arrange: Mock session
    vi.mocked(getServerSession).mockResolvedValue({ user: { id: 'test-user-id' } });
    // Mock AI response to throw an error
    const errorMessage = "AI Service Unavailable";
    mockCreate.mockRejectedValue(new Error(errorMessage));
    const mockRequest = createMockRequest({ ingredients: 'mock, test' });

    // Act
    const response = await POST(mockRequest);

    // Assert
    expect(response.status).toBe(500);
    expect(mockCreate).toHaveBeenCalledTimes(1);
    const json = await response.json();
    expect(json.error).toContain(errorMessage);
  });

  // TODO: Add test case for excludedIngredients flow
  // TODO: Add test case for AI returning invalid JSON structure
}); 