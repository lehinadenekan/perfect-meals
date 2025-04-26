// --- AI Recipe Generation Feature Tasks ---
// File: app/generate-recipe-ai/page.tsx & app/api/generate-recipe/route.ts

// 1. [x] **Create Page Component (`app/generate-recipe-ai/page.tsx`)**
//    - [x] Basic page structure (heading, container).
//    - [x] Add state management (React `useState`) for:
//      - [x] Ingredients input (string)
//      - [x] Optional preferences (diet, cuisine, meal type) (strings/null)
//      - [x] Loading state (boolean)
//      - [x] Error message (string/null)
//      - [x] Generated recipe result (object/null)

// 2. [x] **Build Frontend Form UI**
//    - [x] Create a `<form>` element.
//    - [x] Add a `<textarea>` for ingredients input (controlled component).
//    - [x] Add optional input fields/selects for preferences (controlled components):
//      - [x] Dietary Preferences (Dropdown: None, Vegan, Vegetarian, Gluten-Free, etc.)
//      - [x] Cuisine Type (Text input or Dropdown)
//      - [x] Meal Type (Dropdown: Any, Breakfast, Lunch, Dinner, Snack, etc.)
//    - [x] Add a submit button ("Generate Recipe"). Disable when loading.

// 3. [x] **Implement Frontend Form Logic**
//    - [x] Create `handleSubmit` function.
//    - [x] Prevent default form submission.
//    - [x] Set loading state to true, clear previous error/result.
//    - [x] Call the backend API (POST `/api/generate-recipe`) with form data.
//    - [x] Handle API response:
//      - [x] On success: Update result state, set loading to false.
//      - [x] On error: Set error state, set loading to false.

// 4. [x] **Display Results & Loading/Error States**
//    - [x] Show a loading indicator (e.g., spinner) when loading is true.
//    - [x] Display error message if an error occurs.
//    - [x] Conditionally render the generated recipe result when available:
//      - [x] Recipe Title
//      - [x] Ingredients List
//      - [x] Instructions
//      - [x] (Optional) Highlight user-provided ingredients.

// 5. [x] **Create Backend API Route (`app/api/generate-recipe/route.ts`)**
//    - [x] Create the `route.ts` file.
//    - [x] Define the `POST` handler function.
//    - [x] Add authentication check (ensure user is logged in, if required).
//    - [x] Read and validate request body (ingredients, preferences) using Zod.

// 6. [x] **Integrate AI Service (Placeholder)**
//    - [x] Choose an AI service/API (e.g., OpenAI, Gemini, a specialized recipe API).
//    - [x] Install necessary SDK/client library.
//    - [x] Securely store API keys (environment variables).
//    - [x] In the API route:
//      - [x] Construct the prompt for the AI based on user input.
//      - [x] Make the API call to the AI service.
//      - [x] Handle potential errors from the AI service.

// 7. [x] **Process AI Response & Return**
//    - [x] Parse the response from the AI service.
//    - [x] Extract the relevant recipe information (title, ingredients, instructions).
//    - [x] Format the response to be sent back to the frontend (JSON).
//    - [x] Return the successful response (e.g., `NextResponse.json(recipe)`).
//    - [x] Return appropriate error responses (e.g., `NextResponse.json({ error: '...' }, { status: 500 })`).

// 8. [ ] **Refinement & Styling**
//    - [ ] Apply Tailwind CSS classes for styling the form and results display.
//    - [ ] Ensure responsiveness.
//    - [ ] Improve user experience (e.g., clear instructions, better feedback).

// 9. [ ] **Testing**
//    - [x] Add unit/integration tests for the frontend component interactions (basic render test).
//    - [x] Add tests for the API route (mocking the AI service call) (basic auth, validation, success, error tests).
//    - [ ] Consider E2E tests for the complete flow.

// --- End AI Recipe Generation Tasks ---



// --- AI Recipe Generation Enhancements (Prioritized) ---

// **High Priority / Core Value:**

// 1. [ ] **Save Generated Recipe**
//    - [x] API: Create endpoint (e.g., POST /api/recipes/from-generated) to save title, ingredients, instructions, source='AI_GENERATED', associate with user.
//    - [x] Frontend: Add "Save to My Recipes" button (appears after generation, requires login).
//    - [x] Frontend: Call the save API endpoint on button click.
//    - [x] Frontend: Provide feedback (e.g., success message, button changes to "Saved").

// 2. [x] **Regenerate Recipe**
//    - [x] Frontend: Add a "Generate Another Idea" button (appears after generation).
//    - [x] Frontend: On click, call the existing `handleSubmit` function again (reuse form state).

// 3. [x] **Improve Ingredient Input (Tags/Pills)**
//    - [x] Frontend: Replace `<textarea>` with a component that allows entering ingredients one by one (on Enter/comma).
//    - [x] Frontend: Display entered ingredients as removable "pills" or "tags".
//    - [x] Frontend: Update `handleSubmit` to gather ingredients from the tag state.

// **Medium Priority / Significant UX:**

// 4. [x] **Add Estimated Time & Difficulty**
//    - [x] API: Update AI prompt to request estimated cooking time and difficulty level (e.g., "Easy", "Medium", "Hard") within the JSON response.
//    - [x] API: Update Zod schema/parsing logic to handle these new fields (optional).
//    - [x] Frontend: Update `GeneratedRecipe` type to include optional `timeEstimate` and `difficulty` fields.
//    - [x] Frontend: Display the time/difficulty near the recipe title if available.

// 5. [x] **Add Estimated Nutrition (Optional)**
//    - [x] API: Update AI prompt to request estimated nutritional info (calories, protein, carbs, fat) within the JSON response.
//    - [x] API: Update Zod schema/parsing logic for optional nutrition fields.
//    - [x] Frontend: Update `GeneratedRecipe` type for optional nutrition fields.
//    - [x] Frontend: Display nutrition info below ingredients/instructions if available.

// 6. [x] **Copy Recipe Button**
//    - [x] Frontend: Add a "Copy Recipe" button (appears after generation).
//    - [x] Frontend: Implement logic to format recipe details (title, ingredients, instructions) into a string and copy to clipboard using `navigator.clipboard.writeText`.
//    - [x] Frontend: Provide feedback (e.g., button text changes briefly to "Copied!").

// **Low Priority / Polish & Minor Features:**

// 7. [ ] **UI/UX Polish**
//    - [ ] Frontend: Implement a better loading indicator (e.g., use a Spinner component from Shadcn/UI or similar).
//    - [x] Frontend: Use Card components to visually separate the form and result areas.
//    - [ ] Frontend: Add tooltips or refine placeholder text for better user guidance.
//    - [x] Frontend: Make optional fields visually distinct.

// 8. [x] **"Exclude Ingredients" Field**
//    - [x] Frontend: Add an optional textarea/tag input for excluded ingredients.
//    - [x] Frontend: Pass excluded ingredients to the API.
//    - [x] API: Update Zod schema to accept optional `excludedIngredients` string.
//    - [x] API: Update AI prompt to instruct the AI to avoid the excluded ingredients.

// 9. [x] **Expand Preference Options**
//    - [x] Frontend: Add more relevant options to Dietary Preference and Meal Type dropdowns.

// **Future Considerations / More Complex:**

// 10. [ ] **Ingredient Autocomplete** (Requires data source or separate API)
// 11. [ ] **Recipe Image Generation** (Requires image generation API integration)
// 12. [ ] **Refine Request Logic** (Requires more sophisticated state management and AI prompting)

// --- End Enhancements ---
