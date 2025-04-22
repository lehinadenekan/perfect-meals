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
// Technology Stack: Explicit list of primary frameworks, libraries, database, authentication provider, etc. (e.g., Next.js, React, Prisma, PostgreSQL, NextAuth.js v4, Tailwind CSS, Shadcn/UI [if applicable]).
// Project Structure: A breakdown of key directories (app/, components/, lib/, prisma/, types/, etc.) and their intended purpose. Highlighting critical configuration files (auth.ts, prisma/schema.prisma, tailwind.config.js, tsconfig.json).
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
// Styling & UI Conventions: Details on using Tailwind CSS, any chosen UI component library (like Shadcn/UI), base styling configuration, common layout patterns, and any specific design principles being followed.
// Coding Standards & Conventions: Information on linting/formatting setup (ESLint, Prettier), naming conventions (components, variables, functions), preferred state management approaches, component design philosophy (e.g., composition, prop patterns), and data fetching strategies (Server Actions, Route Handlers).
// Authentication System: Overview of the NextAuth.js v4 setup, location and structure of authOptions, typical usage of getServerSession in API routes/Server Components, and session data structure.
// Database Interaction: Key models in prisma/schema.prisma, common patterns for using Prisma Client, important relations, and any specific data handling logic.
// API & Server Logic: Structure of API routes (app/api/...) and Server Actions (lib/actions/...), request/response patterns, validation approaches (e.g., Zod), and error handling strategies.
// Key Workflows: Descriptions of how core features are implemented step-by-step (e.g., saving user preferences, recipe generation, image uploading).
// Deployment & Environment: Hosting platform (Vercel), essential environment variables (.env.example), and build process considerations.