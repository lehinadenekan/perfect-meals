// Task List for Meal Planner Functionality

// == Core Planner API == [DONE]
// - [DONE] Define Prisma Schema: User, PlannerDay, PlannerMeal, MealType.
// - [DONE] Add `plannerDays` relation to User model.
// - [DONE] Create migration for Planner models.
// - [DONE] GET /api/planner: Fetch planner data for a date range.
//      - User authentication.
//      - Query parameter validation (startDate, endDate).
//      - Fetch PlannerDay records with related PlannerMeals (including Recipe/CustomFoodEntry details).
// - [DONE] POST /api/planner: Add a meal (Recipe or Custom Food) to a specific day and meal type.
//      - User authentication.
//      - Request body validation (date, mealType, servings, recipeId/customFoodEntryId).
//      - Find or create PlannerDay.
//      - Create PlannerMeal record.
// - [DONE] PUT /api/planner/meal/[mealId]: Update servings or meal type for a specific meal entry.
//      - User authentication & Ownership check.
//      - Parameter/Body validation.
//      - Update PlannerMeal.
// - [DONE] DELETE /api/planner/meal/[mealId]: Remove a meal entry.
//      - User authentication & Ownership check.
//      - Parameter validation.
//      - Delete PlannerMeal.
// - [DONE] PUT /api/planner/meal/complete/[mealId]: Toggle completion status. (Added implicitly via meal planner page logic)

// == Macro Calculation & Display == [PARTIALLY DONE]
// - [DONE] Create `lib/plannerUtils.ts`.
// - [DONE] Implement `calculateDailyMacros` function to sum macros for a given day's meals.
// - [DONE] Fetch user macro goals (`UserPreference`) on the planner page.
// - [DONE] Display calculated daily totals vs goals on each day card.
// - [DONE] Implement visual progress bars for macros on day cards.

// == Planner UI (app/meal-planner/page.tsx) == [PARTIALLY DONE]
// - [DONE] Basic layout: Display days (e.g., 7 days) with columns/cards.
// - [DONE] Fetch and display planner data using the GET API.
// - [DONE] Display meals under the correct day and meal type (visually grouped or tagged).
// - [DONE] Show basic meal info: Name, Servings (removed), Image.
// - [DONE] Implement "Edit Servings" UI flow (inline input).
// - [DONE] Implement "Delete Meal" button functionality.
// - [DONE] Implement "Mark as Completed" checkbox functionality.
// - [DONE] Replace emoji icons with SVG icons.
// - [DONE] Make meal items clickable (placeholder action).

// == REMAINING CORE TASKS == [TODO]

// --- 1. Set/Edit User Macro Goals --- [TODO]
//    - [TODO] Create UI component for goal setting form (e.g., `components/GoalSettingsForm.tsx`).
//    - [TODO] Create a dedicated settings/profile page (e.g., `app/settings/page.tsx` or integrate into existing profile).
//    - [TODO] Implement API endpoint `PUT /api/user/preferences` to handle saving goals.
//          - Add necessary fields to `UserPreference` schema if not already present (calories, protein, carbs, fat). Run migration.
//          - Implement the route handler with validation and database update logic.
//    - [TODO] Connect the GoalSettingsForm component to the `PUT /api/user/preferences` endpoint.
//    - [TODO] Ensure the meal planner page (`app/meal-planner/page.tsx`) fetches and reflects updated goals after saving (e.g., re-fetch or update state).

// --- 2. Add Meals to Planner UI Flow --- [TODO]
//    - [TODO] Create "Add Meal" modal component (e.g., `components/AddMealModal.tsx`).
//          - Include search input.
//          - Display search results (recipes/custom foods).
//          - Allow selection of an item.
//          - Include inputs/selects for Servings and Meal Type (Breakfast, Lunch, Dinner, Snack).
//          - Include Submit/Cancel buttons.
//    - [TODO] Implement search functionality within the modal.
//          - Call the existing `/api/search` endpoint as the user types.
//          - Display results clearly, distinguishing between recipes and custom foods.
//    - [TODO] Implement submission logic in the modal.
//          - Gather selected item (recipeId or customFoodEntryId), date (passed to modal), servings, meal type.
//          - Call `POST /api/planner` with the gathered data.
//          - Handle success (close modal, refresh planner data) and errors (display message).
//    - [TODO] Trigger modal opening from the "+" button on day cards.
//          - Pass the specific date of the day card to the modal.
//    - [TODO] Ensure the planner UI updates visually after successfully adding a meal.

// --- 3. View Meal Details --- [TODO]
//    - [TODO] Create "Meal Details" modal component (e.g., `components/MealDetailsModal.tsx`).
//    - [TODO] Implement the actual logic within `handleViewMealDetails` in `app/meal-planner/page.tsx`.
//          - Fetch full details if necessary (or ensure they are already available in the planner data).
//          - Open the `MealDetailsModal` and pass the relevant meal data (recipe or custom food details).
//    - [TODO] Populate the `MealDetailsModal` with data:
//          - Recipe: Image, Title, Servings (from planner meal), Ingredients, Instructions, Full Nutrition Facts.
//          - Custom Food: Name, Servings (from planner meal), Nutrition Facts.

// --- 4. Shopping List Generation --- [TODO]
//    - [TODO] Create utility function `generateShoppingList(plannerDays: PlannerApiResponseDay[], startDate: Date, endDate: Date)` (e.g., in `lib/shoppingListUtils.ts`).
//          - Iterate through meals within the date range.
//          - Aggregate ingredients from associated recipes (need recipe details including ingredients).
//          - Adjust ingredient quantities based on planned servings vs. recipe base servings.
//          - Combine identical ingredients (e.g., "2 cups flour" + "1 cup flour" = "3 cups flour"). Consider unit consistency/conversion.
//    - [TODO] Create UI for Shopping List (e.g., `components/ShoppingListDisplay.tsx`).
//          - Display the aggregated list of ingredients and quantities.
//          - Potentially group by category (produce, dairy, etc.) - requires ingredient categorization.
//          - Add checkboxes to mark items as acquired.
//    - [TODO] Create a page or integrate into UI to trigger generation and display the list.
//          - Add a button (e.g., "Generate Shopping List").
//          - Potentially add a date range selector.
//          - Fetch planner data for the range, call `generateShoppingList`, and display results in the UI component.

// == Nice-to-Have / Future Enhancements ==
// - Drag-and-drop meals between days/meal types.
// - Meal time indicators (e.g., 8:00 AM Breakfast).
// - Weekly summary view.
// - Recipe scaling integration.
// - More sophisticated ingredient parsing/categorization for shopping list.
// - Print planner/shopping list option.
// - Integration with external calendars.
