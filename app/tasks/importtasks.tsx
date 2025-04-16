// Recipe Import Feature - Task Breakdown (AI Approach)

// --- Part 1: Setup AI Integration ---
// 1.  [ ] Choose AI Provider (e.g., Google AI Gemini, OpenAI GPT, Anthropic Claude). (Implicitly OpenRouter + Free Model)
// 2.  [ ] Obtain API Key from the chosen provider. (User needs to get OpenRouter Key)
// 3.  [x] Install necessary SDK/library for the provider (e.g., `@google/generative-ai`, `openai`). (Installed openai SDK)
// 4.  [ ] Configure API Key securely in environment variables (e.g., `.env.local`). (User needs to add OPENROUTER_API_KEY)

// --- Part 2: Modify Backend Import API Route (`/api/import-recipe/route.ts`) ---
// 5.  [x] Remove Cheerio dependency and Adapter pattern logic (imports, getAdapter, adapter.parse call).
// 6.  [x] Keep existing HTML fetching logic using `fetch`.
// 7.  [x] Import and initialize the AI SDK client using the API key.
// 8.  [x] Define a robust prompt instructing the AI model to:
//     -   [x] Accept HTML content as input.
//     -   [x] Extract recipe details: title, ingredients (as string array), instructions (as string array), description, image URL, servings, total time.
//     -   [x] Return the extracted data strictly in JSON format matching the `ImportedRecipeData` interface.
//     -   [x] Handle cases where recipe data might be missing or unclear in the HTML.
// 9.  [x] Implement the call to the AI model within the API route:
//     -   [x] Pass the fetched HTML content and the defined prompt.
//     -   [ ] Handle potential streaming responses if applicable. (Not implemented, using standard request/response)
// 10. [x] Parse the JSON response received from the AI model.
//     -   [x] Validate the structure of the AI's response (e.g., using Zod or basic checks).
// 11. [x] Add specific error handling for:
//     -   [ ] AI API call failures (authentication, rate limits, timeouts, server errors). (Basic handling added)
//     -   [x] Failures in parsing the AI's JSON response.
//     -   [x] Cases where the AI indicates it couldn't extract the recipe.
// 12. [x] Return the structured recipe data (from AI) or appropriate errors to the frontend.

// --- Part 3: Adjust Frontend & Saving Logic ---
// 13. [x] Frontend Component (`components/my-recipes/RecipeImporter.tsx`):
//     -   [x] Ensure it calls `/api/import-recipe` correctly. (No changes needed)
//     -   [x] Ensure it correctly displays the `ImportedRecipeData` returned from the API. (No changes needed if structure is maintained)
//     -   [ ] (Optional) Update loading indicators or messages to reflect potentially longer AI processing times.
//     -   [ ] (Optional) Handle any new specific error messages returned by the AI-powered backend.
// 14. [x] Save API Endpoint (`/api/recipes/import/route.ts`):
//     -   [x] Ensure it accepts the `ImportedRecipeData` structure. (No changes needed)
//     -   [x] Ensure the existing save logic correctly transforms and persists the data. (Existing logic handles the structure; ingredient parsing might become simpler/redundant depending on AI output quality).

// Note: This file is just for tracking tasks.
export const importTasks = [
  // Initial Setup & Basic Import
  { id: 1, text: "Set up basic Next.js project structure", completed: true },
  { id: 2, text: "Create basic UI for recipe import (URL input, button)", completed: true },

  // AI Integration (OpenRouter)
  { id: 3, text: "Integrate OpenRouter API for recipe data extraction", completed: true },
  { id: 4, text: "Implement fallback scraping logic if AI fails (Optional/TBD)", completed: true },
  { id: 5, text: "Create backend API route (/api/import-recipe) to handle AI processing", completed: true },
  { id: 6, text: "Define Zod schema for import request (URL)", completed: true },
  { id: 7, text: "Fetch HTML content from the provided URL in the backend route", completed: true },
  { id: 8, text: "Construct prompt for AI model to extract structured recipe data (JSON)", completed: true },
  { id: 9, text: "Call OpenRouter API with HTML content and prompt", completed: true },

  // Saving Imported Recipe (Initial UI)
  { id: 10, text: "Implement UI for previewing and saving the imported recipe", completed: true },
  { id: 11, text: "Handle API response and display imported data or error message", completed: true },
  { id: 12, text: "Select and configure appropriate AI model (considering context length, cost)", completed: true },

  // Error Handling & Refinements
  { id: 13, text: "Improve error handling for fetch, AI API calls, and JSON parsing", completed: true },
  { id: 14, text: "Refine UI/UX for import process (loading states, feedback)", completed: false },

  // Displaying Imported Recipes as Standard Cards
  { id: 15, text: "Identify reusable RecipeCard component", completed: false },
  { id: 16, text: "Identify component/API for displaying saved/favourite recipes (e.g., UserFavourites.tsx)", completed: false },
  { id: 17, text: "Modify display component (Task 16) to fetch all user recipes", completed: false },
  { id: 18, text: "Update display component (Task 16) to use RecipeCard (Task 15) for rendering", completed: false },
  { id: 19, text: "Implement real save logic in RecipeImporter.tsx", completed: false, subTasks: [
    { id: '19a', text: "Implement fetch call to /api/recipes/import", completed: false },
    { id: '19b', text: "Add success handling (clear preview, toast, optional tab switch)", completed: false },
    { id: '19c', text: "Add error handling (toast, error message)", completed: false },
  ]},
  { id: 20, text: "Create/Verify backend API endpoint for fetching all user recipes", completed: false },

];
