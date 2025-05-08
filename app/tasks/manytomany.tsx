// Detailed Plan for Implementing Recipe-Region Many-to-Many Relationship
// Phase 1 & 2 COMPLETE. Starting Phase 3.

// Phase 1: Schema & Database Modifications
// [DONE] 1.  Task 1: Define `Region` Model in Prisma Schema.
// [DONE]     - Action: Open `prisma/schema.prisma`.
// [DONE]     - Define the new `Region` model. It should include at least:
// [DONE]         - `id String @id @default(cuid())`
// [DONE]         - `name String @unique` (e.g., "Jamaica", "Italy", "Caribbean", "Europe")
// [DONE]         - `continent String?` (e.g., "Americas", "Europe", "Asia", "Africa", "Oceania")
// [DONE]         - `type RegionType?` (Enum: `COUNTRY`, `SUB_REGION`, `CONTINENT`)
// [DONE]         - `recipes Recipe[] @relation("RecipeRegions")`
// [DONE]     - Define the `RegionType` enum: `enum RegionType { COUNTRY SUB_REGION CONTINENT }`

// [DONE] 2.  Task 2: Update `Recipe` Model in Prisma Schema.
// [DONE]     - Action: In `prisma/schema.prisma`.
// [DONE]     - Remove `regionOfOrigin: String?` and `continent: String?`.
// [DONE]     - Add `regions Region[] @relation("RecipeRegions")`.

// [DONE] 3.  Task 3: Generate and Apply Migration.
// [DONE]     - Action: Run `pnpm prisma migrate dev --name add-region-many-to-many`.
// [DONE]     - Verify: Check migration status and ensure no errors. Review generated SQL if necessary.

// Phase 2: Data Seeding & Migration Script Update
// [DONE] 4.  Task 4: Update Recipe Seed Data.
// [DONE]     - Action: Modify `prisma/seed-data/recipes.ts` (or your equivalent).
// [DONE]     - For each recipe, remove `regionOfOrigin` and `continent`.
// [DONE]     - Add a new property, e.g., `regionNames: string[]`, containing an array of region names (e.g., ["Italy"], ["Caribbean", "Jamaica"]).

// [DONE] 5.  Task 5: Create Region Seed Data.
// [DONE]     - Action: Create `prisma/seed-data/regions.ts`.
// [DONE]     - Define an array of region objects to seed, including `name`, `continent`, and `type`.
// [DONE]       Example: `{ name: "Caribbean", continent: "Americas", type: RegionType.SUB_REGION }`
// [DONE]       Ensure all regions mentioned in `recipe.regionNames` are included, plus any parent regions (e.g., if "Jamaica" is used, also include "Caribbean" and "Americas").

// [DONE] 6.  Task 6: Update Main Seed Script (`prisma/seed.ts`).
// [DONE]     - Action: Modify `prisma/seed.ts`.
// [DONE]     - First, seed the `Region` data. Upsert based on `name` to avoid duplicates.
// [DONE]     - Then, when seeding recipes:
// [DONE]         - For each recipe, find the corresponding `Region` objects based on `recipe.regionNames`.
// [DONE]         - Connect the recipe to these regions using the `regions: { connect: [{ id: region1.id }, { id: region2.id }] }` syntax within the `prisma.recipe.upsert` call.
// [DONE]     - Handle cases where a region name might not be found gracefully (e.g., log a warning).

// [DONE] 7.  Task 7: Run Seed Script.
// [DONE]     - Action: Run `pnpm prisma db seed`.
// [DONE]     - Verify: Check database to ensure recipes are correctly linked to regions.

// Phase 3: Update Application Logic (API Endpoints & UI)
// 8.  Task 8: Update API Endpoint for Fetching Recipes.
//     - Action: Identify and modify the API endpoint(s) responsible for fetching recipes (e.g., `GET /api/recipes`).
//     - Modify Prisma queries to `include: { regions: true }` to fetch associated regions with each recipe.
//     - Update any response DTOs or data transformation logic to include regions data.

// 9.  Task 9: Update API Endpoint for Creating/Updating Recipes.
//     - Action: Identify and modify the API endpoint(s) for creating/updating recipes (e.g., `POST /api/recipes`, `PUT /api/recipes/:id`).
//     - Update request body validation to accept an array of region IDs or names.
//     - Modify Prisma create/update operations to connect/disconnect regions appropriately using `regions: { connect: [...], set: [...], disconnect: [...] }`.

// 10. Task 10: Update Recipe Display in UI.
//     - Action: Find UI components where recipes are displayed (e.g., recipe cards, recipe detail page).
//     - Modify components to display multiple regions for a recipe.
//     - Consider how to best display this (e.g., comma-separated list, tags).

// 11. Task 11: Update Recipe Filtering Logic in UI/API.
//      - Action: Review current recipe filtering mechanisms (e.g., by `regionOfOrigin`).
//      - Update filtering logic to work with the new `regions` relation.
//        This might involve querying recipes where `regions` contains a specific region (`some: { name: '...' }` or `some: { id: '...' }`).
//      - Update UI filter controls (e.g., dropdowns, search) to reflect the ability to filter by multiple regions or by the new `Region` entities.

// 12. Task 12: Update Recipe Creation/Editing Forms in UI.
//      - Action: Modify UI forms for creating or editing recipes.
//      - Change the input for `regionOfOrigin` to allow selecting multiple regions.
//        This could be a multi-select dropdown, checkboxes, or a tag input field populated from the `Region` table.

// Phase 4: Testing & Refinement
// 13. Task 13: Comprehensive Testing.
//      - Action: Test all changes thoroughly.
//          - Recipe creation, update, and display with multiple regions.
//          - Filtering by single and multiple regions.
//          - Edge cases (recipes with no regions, recipes with many regions).
//      - Verify data integrity in the database.

// 14. Task 14: Code Review & Refactor (Optional).
//      - Action: Review new code for clarity, efficiency, and potential issues.
//      - Refactor as needed.

// 15. Task 15: Update Documentation (If Applicable).
//      - Action: If you have API documentation or user guides, update them to reflect the changes in region handling.
