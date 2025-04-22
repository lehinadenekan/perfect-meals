// Project Overview: This project is a comprehensive web application serving as both a directory for traditional recipes and a powerful recipe management tool.
//   Core Purpose: To provide users with a platform to discover, create, import, generate, and manage recipes effectively.
//   Target User: Individuals interested in finding traditional recipes, managing their personal recipe collections, and discovering new meal ideas tailored to their specific needs.
//   Key Functionalities:
//     - Recipe Directory: A curated collection of traditional recipes.
//     - Recipe Management: Tools for users to create new recipes manually, import recipes from external sources (e.g., URLs), and manage their saved/created recipes.
//     - AI Recipe Generation: Functionality to generate new recipes based on user input or potentially existing recipes.
//     - Recipe Idea Generation: A feature allowing users to explore the directory and generate recipe suggestions based on filters such as:
//         * Dietary Preferences (e.g., vegan, gluten-free)
//         * Regional Cuisines (e.g., Italian, Thai)
//         * Macronutrient Goals (e.g., high protein, low carb)
//         * Cooking Methods (e.g., oven, stovetop, slow cooker)
// Technology Stack:
//   - Framework: Next.js (App Router)
//   - Language: TypeScript
//   - UI: React, Tailwind CSS, Shadcn/UI (Accordion, Checkbox, Dialog, Label, etc.)
//   - State Management: Primarily React state (useState, useEffect), some Context API (FavouritesContext)
//   - Data Fetching: Server Actions (implied), API Routes (app/api/...)
//   - ORM: Prisma
//   - Database: PostgreSQL (implied by Prisma usage)
//   - Authentication: NextAuth.js v4
//   - Testing: Vitest (Unit/Integration), React Testing Library, Playwright (E2E)
//   - Package Manager: pnpm
// Project Structure:
//   - app/: Core application routes, layouts, pages (including `memory.ts`, `tasks/homepage.ts`).
//   - components/: Reusable UI components (e.g., `Navbar.tsx`, `recipe/RecipeCard.tsx`, `dietary/`, `filters/`, `shared/`).
//   - lib/: Utility functions, type definitions (`types/`), potentially Server Actions (`actions/`).
//   - prisma/: Database schema (`schema.prisma`), migrations, seeding scripts.
//   - __tests__/: Vitest/RTL unit/integration tests (e.g., `components/dietary/ExcludedFoodsInput.test.tsx`).
//   - e2e/: Playwright end-to-end tests.
//   - Configuration: `package.json`, `pnpm-lock.yaml`, `tsconfig.json`, `tailwind.config.js`, `vitest.config.ts`, `vitest.setup.ts`, `.env`.
// Site Structure & Navigation: Defines the primary sections and user flow accessible via the main navigation bar.
//   - Discover (Homepage: / or /discover): Main recipe browsing area. Showcases recipes immediately with optional filtering.
//   - My Collection (Dropdown Trigger - conditional on login):
//     - My Recipes (/my-recipes): Tabbed view showing Favourites, Albums, My Recipes (created).
//     - Recently Viewed (/recently-viewed): List of recently viewed recipes.
//   - Add Recipe (Dropdown Trigger - conditional on login):
//     - Create from Scratch (/create-recipe): Page for manual recipe creation.
//     - Import Recipe (/import-recipe): Page for importing recipes via URL.
//     - Generate with AI (/generate-recipe-ai): Page for AI recipe generation.
//   - Meal Planner (/meal-planner): Feature for planning weekly meals and generating shopping lists.
//   - User Menu (Dropdown triggered by Name/Avatar):
//     - Profile (/profile)
//     - Settings (/settings)
//     - Logout (Action)
// Homepage User Flow:
//   - Initial Load: User lands, sees Navbar, optional headline, grid of "Featured Recipes", prominent Search bar (in Navbar).
//   - Below/Near Recipes:
//     - "Filter" button: Opens sidebar/modal with comprehensive filter options (Dietary, Regional, Cooking Style, Meal Category, Exclusions, etc.).
//     - "Load More" button: Handles pagination/infinite scroll for recipes.
//     - (Optional) CTA section: Encourages sign-up/login (e.g., "Unlock meal planning & save your preferences!").
//   - Filter Interaction:
//     - User clicks "Filter" button.
//     - Filter sidebar/modal opens.
//     - User selects desired filters.
//     - User clicks "Apply Filters".
//     - Sidebar/modal closes; homepage recipe grid updates.
//     - Inside sidebar/modal: "Save Preferences" button:
//       - Logged In: Saves current filter selections to user profile.
//       - Logged Out: Button visible (potentially disabled/styled differently), clicking prompts login/signup modal.
//   - Managing Saved Preferences:
//     - User navigates to Profile/Settings (via Navbar user menu) to manage permanently saved default preferences.
// Styling & UI Conventions:
//   - Tailwind CSS for general styling.
//   - Shadcn/UI components used for UI elements (Accordion, Checkbox, Dialog, Label, Progress, Select, Slot).
//   - Custom styling applied for specific states (e.g., selected checkboxes/buttons in filter modals).
//   - Consistent card layout used for recipes (`components/recipe/RecipeCard.tsx`).
// Coding Standards & Conventions:
//   - Linting/Formatting: ESLint, Prettier (implied by husky pre-commit hook).
//   - Pre-commit Hooks: Husky configured to run ESLint and `tsc --noEmit`.
//   - Component Design: Functional components, passing props including state setters and callbacks.
// Authentication System: Overview of the NextAuth.js v4 setup, location and structure of authOptions, typical usage of useSession hook in Client Components.
// Database Interaction: Key models in prisma/schema.prisma, common patterns for using Prisma Client, important relations, and any specific data handling logic.
// API & Server Logic: Structure of API routes (app/api/...) and Server Actions (lib/actions/...), request/response patterns, validation approaches (e.g., Zod), and error handling strategies.
// Key Workflows & Components:
//   - Recipe Filtering: Implemented via `FilterModal.tsx` using sub-components like `DietSelector.tsx`, `GeographicFilters.tsx`, `ExcludedFoodsInput.tsx`. Preferences can be saved for logged-in users.
//   - Excluded Foods Input (`components/dietary/ExcludedFoodsInput.tsx`): Allows users to type foods, adds them as removable pills on Enter/comma, uses Backspace to remove last item.
//   - Recipe Card (`components/recipe/RecipeCard.tsx`): Displays recipe image, title, description, dietary tags, nutrition info, region, and actions (favourite, add to album).
// Testing Strategy:
//   - Unit/Integration: Vitest + React Testing Library. Focus on testing component behavior from a user perspective (rendering, interaction). Tests located in `__tests__/`.
//   - End-to-End: Playwright. Tests located in `e2e/`. Simulates full user flows.
//   - Mocking: Required for API calls and potentially external dependencies during unit/integration tests.
// Deployment & Environment:
//   - Hosting: Vercel.
//   - Build Process: Uses `pnpm install --frozen-lockfile`. Requires `pnpm-lock.yaml` to be up-to-date with `package.json`.
//   - Environment Variables: Managed via `.env` file (e.g., `DATABASE_URL`, `DIRECT_DATABASE_URL`).

// --- Standard Modal Styles & Components ---
// Login Prompt Modal (`components/LoginPromptModal.tsx`):
//   - Purpose: A reusable modal displayed when a logged-out user attempts to access a feature requiring authentication.
//   - Library: Built using Headless UI (`Dialog`, `Transition`) for accessibility and transition effects.
//   - Styling: Uses Tailwind CSS for layout and appearance.
//     - Panel: Centered, rounded (`rounded-lg`), white background (`bg-white`), padding (`p-6`), shadow (`shadow-xl`).
//     - Backdrop: Semi-transparent gray (`bg-gray-500 bg-opacity-75`).
//     - Icon: `LockClosedIcon` from `@heroicons/react/24/outline`, centered, yellow (`text-yellow-500`).
//     - Title: Centered, large, bold (`text-lg font-semibold`).
//     - Message: Centered, smaller, gray text (`text-sm text-gray-500`).
//     - Buttons: Two-column grid layout.
//       - Close Button: White background, gray text/ring (`bg-white text-gray-900 ring-1 ring-gray-300`).
//       - Login Button: Yellow background, black text (`bg-yellow-500 text-black`), hover effect (`hover:bg-yellow-400`).
//   - Props:
//     - `isOpen` (boolean): Controls modal visibility.
//     - `onClose` (function): Called when the modal should close (backdrop click, close button).
//     - `onLoginClick` (optional function): Called when the 'Log In / Sign Up' button is clicked. Typically used to close this modal and open the main `AuthModal`.
//   - Usage Example: Implemented in `Navbar.tsx` to gate access to 'My Collection' and 'Add Recipe' for logged-out users.

// --- Homepage & Recipe Fetching Logic ---
// Homepage Client (`components/HomePageClient.tsx`):
//   - Responsible for rendering the main homepage content (Typewriter, Filter button, Recipe Carousel).
//   - Fetches recipes using `fetchRecipes` function which calls the `/api/recipes` endpoint.
//   - Handles pagination by passing `page` and `limit=8` parameters to the API.
//   - Manages filter state (`appliedFilters`) and passes them as query parameters to the API.
//   - Uses `components/filters/FilterModal.tsx` to allow users to select filters.
//   - Fetches user's saved preferences from `/api/user/preferences` (if logged in) to potentially pre-fill the filter modal.
//   - Displays the initially fetched recipes (page 1, no filters) in `components/recipe/MealCarousel.tsx` with the hardcoded title "Featured Recipes".
//   - Provides a "Load More Recipes" button for pagination.
// Recipe API Endpoint (`app/api/recipes/route.ts` - GET Handler):
//   - Provides paginated and filtered access to recipes in the database.
//   - Accepts query parameters: `page`, `limit` (default 20, but overridden by client), `diets`, `regions`, `excludedFoods`, `cookingStyles`, `mealCategories`.
//   - Builds a Prisma `where` clause based on provided filters, combining different filter types using `AND` logic.
//   - Filters based on dietary flags (e.g., `isVegan`), region (`regionOfOrigin`), tags (`cookingStyles`), categories (`mealCategories`), and excluded ingredients (checks `ingredients` relation).
//   - Excludes recipes recently shown to the logged-in user (within the last 4 minutes, checked via `UserRecipeHistory`).
//   - Excludes recipes created by the logged-in user (`authorId`).
//   - **Default Sorting:** Sorts recipes by `createdAt: 'desc'` by default. This means the initial, unfiltered view on the homepage effectively shows the newest recipes first, which are presented as "Featured".
//   - Includes related data in the response: `ingredients`, `instructions`, `categories`, `tags`, `nutritionFacts`.

// --- Updated Navbar Logic (`components/Navbar.tsx`) ---
//   - Uses `LoginPromptModal` to gate access to "My Collection", "Add Recipe", and "Meal Planner" links/buttons for logged-out users.
//   - Clicking these elements when logged out opens the prompt instead of navigating or opening the dropdown.
//   - Uses `useRouter` hook for programmatic navigation to `/meal-planner` after checking session status for the Meal Planner button.

// --- Recipe Source Differentiation & Seeding ---
// Schema (`prisma/schema.prisma`):
//   - Added `RecipeSource` enum (ADMIN, USER_CREATED, USER_IMPORTED).
//   - Added `source RecipeSource @default(USER_CREATED)` field to `Recipe` model.
//   - Made `authorId` on `Recipe` nullable (`String?`) to allow ADMIN recipes without a specific user author.
// API Logic:
//   - Discover Page (`/api/recipes` GET): Now strictly filters using `where: { source: 'ADMIN' }` (using string literal due to TS type issues) to only show admin recipes.
//   - Manual Creation (`/api/recipes` POST): Sets `source: 'USER_CREATED'` (using string literal) when creating new recipes.
//   - Import (`/api/recipes/import` POST): Sets `source: 'USER_IMPORTED'` (using string literal) when saving imported recipes.
//   - My Collection (`/api/recipes/my-recipes` GET): Verified to fetch recipes based only on `authorId`, correctly showing both USER_CREATED and USER_IMPORTED recipes.
// Seeding (`prisma/seed.ts`):
//   - New seed script created to upsert recipes from `prisma/seed-data/recipes.ts`.
//   - Uses `title` as the unique identifier for upserting.
//   - Sets `source: 'ADMIN'` (using string literal) and `authorId: null` for all seeded recipes.
//   - Configured in `package.json` to run via `pnpm prisma db seed`.
// Initial Data Fix (`scripts/mark-all-recipes-admin.ts`):
//   - One-time script created and run to update all pre-existing recipes to `source: 'ADMIN'`.
//   - This resolved the initial HTTP 500 error on the homepage after the API filter was added.
// Troubleshooting (TypeScript Type Errors):
//   - Persistent TS errors occurred where `source` field / `RecipeSource` enum were used, despite successful migration.
//   - Investigation confirmed `prisma generate` *is* creating the correct types in `node_modules/.prisma/client/index.d.ts`.
//   - Root cause identified as the editor/TS server environment not picking up the generated types.
//   - Temporary Fix: Added `// @ts-expect-error` comments in relevant API routes (`/api/recipes`, `/api/recipes/import`, potentially seed script) to suppress editor errors until the environment issue is resolved (e.g., by restarting TS Server/editor).