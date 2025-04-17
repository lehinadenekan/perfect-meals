// Amazon Fresh Ingredient Purchase Integration Tasks

/*
========================================
Phase 1: Frontend Implementation (Recipe Detail View)
========================================

[x] Task: Modify the Recipe Detail View component to include interactive elements (e.g., checkboxes) next to each ingredient.
    - Identify the correct component file (e.g., RecipeDetailView.tsx).
    - Update the rendering logic for the ingredient list.

[x] Task: Implement state management (local or global) to track selected ingredients.
    - Decide on state management approach (useState, useReducer, Zustand, Redux, etc.).
    - Implement logic to update state when checkboxes are toggled.

[x] Task: Add a "Buy on Amazon Fresh" button to the Recipe Detail View.
    - Button should be conditionally enabled (active only when >0 ingredients are selected).
    - Style the button according to the application's design system.

[x] Task: Implement the core client-side logic for the "Buy on Amazon Fresh" button click.
    - Retrieve the list of selected ingredients from the state.
    - **Initial Mapping Strategy:** Implement basic keyword extraction from ingredient strings (e.g., "1 large onion" -> "onion").
    - Construct the Amazon Fresh search URL.
        - Base URL: `https://www.amazon.com/alm/storefront?almBrandId=QW1hem9uIEZyZXNo` (Verify this)
        - Affiliate Tag: Add `&tag=YOUR_ASSOCIATES_TAG` (Replace with actual tag from config/env).
        - Search Terms: Add `&k=TERM1+TERM2+TERM3` using the extracted keywords. URL-encode the terms.
    - Implement redirection logic (`window.open(...)`).

[x] Task: Add basic error handling and user feedback (e.g., if URL construction fails).

[x] Task: Ensure appropriate disclosure is present as required by Amazon Associates (e.g., "As an Amazon Associate I earn from qualifying purchases.").

========================================
Phase 2: Configuration & Setup
========================================

[x] Task: Register for an Amazon Associates account if not already done.
    - Obtain your unique Associates Tag.

[x] Task: Securely store the Amazon Associates Tag.
    - Code implemented in RecipeDetailModal to read `process.env.NEXT_PUBLIC_AMAZON_ASSOCIATES_TAG`.
    - Action Complete: Added `NEXT_PUBLIC_AMAZON_ASSOCIATES_TAG=YOUR_TAG_HERE` to `.env.local` file.
    - Action Complete: Update deployment configurations (added env var to Vercel).

[x] Task: Research and verify the correct and current URL structure for Amazon Fresh affiliate search links.
    - Consult Amazon Associates documentation and test sample links.
    - Current structure (`amazon.co.uk/alm/store `front?almBrandId=...&tag=...&k=...`) appears correct based on search results.

========================================
Phase 3: Backend API (Optional but Recommended for Scalability/Mapping)
========================================

[x] Task: Design the schema for the `IngredientMapping` database table (if pursuing advanced mapping).
    - Fields: `id`, `ingredient_query`, `amazon_search_term`, `amazon_asin` (optional), `last_verified`, timestamps.

[x] Task: Create the `IngredientMapping` table in the database.
    - Write and run database migration scripts.

[x] Task: Develop a backend API endpoint (e.g., `POST /api/amazon/generate-link`).
    - Framework: Next.js API routes, NestJS, Express, etc.
    - Input: `string[]` (list of selected ingredient descriptions).
    - Logic:
        - Query the `IngredientMapping` table for matches.
        - Implement fallback logic (e.g., basic keyword extraction) if no mapping exists.
        - Construct the final Amazon Fresh affiliate URL server-side.
    - Output: `{ amazonLink: string }`

[x] Task: Refactor Frontend logic (from Phase 1) to call this new API endpoint instead of constructing the URL client-side.
    - Use `fetch` or a library like `axios` or `react-query`/`swr`.
    - Handle API loading states and errors.

[x] Task: Populate the `IngredientMapping` table (ongoing task).
    - Start with common ingredients.
    - Develop a strategy/tool for adding/updating mappings.

[x] Task: Modify `/api/amazon/generate-link`: Implement fallback logic (e.g., basic keyword extraction) if no mapping exists in DB, instead of returning 404.

[ ] Task: Add logging in `/api/amazon/generate-link` to record ingredient queries that lack a mapping in the DB (for later automated processing).

========================================
Phase 4: Testing & Refinement
========================================

[~] Task: Test ingredient selection and redirection thoroughly across different recipes and ingredients.
    - Verify generated URLs and affiliate tag presence.
    - Test on multiple browsers/devices.
    - (Addressed core image/time rendering bugs during testing)

[ ] Task: Test the ingredient mapping accuracy (both basic keyword and advanced mapping if implemented).
    - Check the relevance of Amazon Fresh search results.

[ ] Task: Use Amazon Associates link checker tools to validate generated links.

[ ] Task: Monitor analytics (CTR, potentially Associates reports) post-launch to assess effectiveness and identify issues.

[ ] Task: Gather user feedback on the feature's usability and the relevance of search results.

[ ] Task: Iterate on the mapping strategy based on testing and feedback.

========================================
Compliance & Documentation
========================================

[ ] Task: Ensure full compliance with the Amazon Associates Program Operating Agreement.
    - Review requirements for link formats, disclosures, etc.

[ ] Task: Document the feature, API endpoints (if any), and configuration requirements.

========================================
Phase 5: Automated Mapping Enhancement (Using Firecrawl)
========================================

[ ] Task: Design the automated mapping workflow.
    - Define trigger (e.g., based on logs from Phase 3, scheduled job, manual).
    - Define input (ingredient string) and output (amazonSearchTerm, optional ASIN).

[ ] Task: Create a new backend function/service/API (e.g., `/api/mapping/generate-mapping`) for the automation logic.

[ ] Task: Implement ingredient string cleaning/normalization within the mapping service.

[ ] Task: Integrate Firecrawl Search (`mcp_firecrawl_mcp_firecrawl_search`) within the mapping service.
    - Construct targeted queries for Amazon based on cleaned ingredients.

[ ] Task: Develop logic to analyze Firecrawl search results and extract/derive an optimal `amazonSearchTerm` (and optionally ASIN).

[ ] Task: Implement DB logic in the mapping service to check for existing mappings and save/update new/better mappings in `IngredientMapping` table.

[ ] Task: Implement the chosen trigger mechanism to run the mapping service.

*/

// Placeholder for potential future component implementation or related utility functions
export {};
