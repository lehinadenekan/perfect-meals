// ... existing tasks ...

// --- Navbar Search Suggestions Feature ---

// 1. Backend: Create Suggestions API Endpoint
//    - File: Create app/api/search/suggestions/route.ts
//    - Action: Implement GET handler accepting a 'query' parameter.
//    - Logic: Query Recipe model using Prisma.
//             - Filter where 'title' contains/startsWith query (case-insensitive).
//             - Limit results (e.g., 5-10).
//             - Select only 'id' and 'title'.
//             - Return JSON array.
//    - Optimization: Ensure 'title' field is indexed in schema.prisma.

// 2. Frontend: Enhance Navbar Search Input
//    - File: Modify components/Navbar.tsx (or relevant search component).
//    - State: Add state for searchQuery, suggestions, isLoading, showSuggestions.
//    - Event Handling: Update input's onChange to set searchQuery. Trigger debounced fetch.

// 3. Frontend: Implement API Fetching & Debouncing
//    - File: Within Navbar/Search component.
//    - Action: Create async fetchSuggestions(query) function.
//    - Logic: Set loading, fetch from /api/search/suggestions, update suggestions state, handle errors, clear loading.
//    - Debouncing: Use setTimeout or use-debounce hook (e.g., 300ms) to call fetchSuggestions.

// 4. Frontend: Create & Style Suggestions Dropdown UI
//    - File: Within Navbar/Search component JSX.
//    - Action: Conditionally render dropdown container below search input (absolute positioning).
//    - Content: Map suggestions state to render list items.
//    - Styling: Style dropdown and items (background, border, padding, hover). Consider Shadcn Command component.

// 5. Frontend: Handle Suggestion Interaction
//    - File: Within Navbar/Search component JSX/handlers.
//    - Clicking: Add onClick to suggestion items to set input value, clear suggestions, optionally submit search or navigate.
//    - Closing: Hide dropdown on outside click, form submit, or navigation.
//    - Keyboard (Optional): Add onKeyDown to input for Up/Down/Enter navigation if using custom list.

// 6. Refinement & Testing
//    - Test edge cases (empty query, no results), interactions (click, keyboard).
//    - Refine styling and UX.
//    - Consider highlighting matched text within suggestions.

// --- END Navbar Search Suggestions Feature ---

// --- Add Images to Navbar Search Suggestions ---

// 1. Backend: Include Image URL in Suggestions API
//    - File: app/api/search/suggestions/route.ts
//    - Action: Modify Prisma query in GET handler.
//    - Logic: Add `imageUrl: true` to the `select` object in `prisma.recipe.findMany`.

// 2. Frontend: Update Suggestion Interface
//    - File: components/Navbar.tsx
//    - Action: Modify `SearchSuggestion` interface.
//    - Logic: Add `imageUrl?: string | null;` field.

// 3. Frontend: Render Image in Suggestions Dropdown
//    - File: components/Navbar.tsx
//    - Action: Update JSX mapping within CommandList.
//    - Logic: Inside CommandItem, add `next/image` component using `suggestion.imageUrl`.
//             Handle null/undefined imageUrl (placeholder/conditional render).
//             Add styling (size, spacing).
//             Adjust CommandItem layout (e.g., flexbox).

// 4. Styling & Refinement
//    - Adjust CSS/Tailwind for image size, spacing, alignment, placeholders.
//    - Test layout and image loading.

// --- END Add Images to Navbar Search Suggestions ---