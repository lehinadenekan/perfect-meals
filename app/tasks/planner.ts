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

// == REMAINING CORE TASKS == [TODO] -> Updated to reflect recent work

// --- 1. Set/Edit User Macro Goals --- [DONE]
//    - [DONE] Create UI component for goal setting form (e.g., `components/GoalSettingsForm.tsx`).
//    - [DONE] Create a dedicated settings/profile page (e.g., `app/settings/page.tsx` or integrate into existing profile).
//    - [DONE] Implement API endpoint `PUT /api/user/preferences` to handle saving goals.
//          - [DONE] Add necessary fields to `UserPreference` schema if not already present (calories, protein, carbs, fat). Run migration.
//          - [DONE] Implement the route handler with validation and database update logic.
//    - [DONE] Connect the GoalSettingsForm component to the `PUT /api/user/preferences` endpoint.
//    - [DONE] Ensure the meal planner page (`app/meal-planner/page.tsx`) fetches and reflects updated goals after saving (e.g., re-fetch or update state).

// --- 2. Add Meals to Planner UI Flow --- [DONE]
//    - [DONE] Create "Add Meal" modal component (e.g., `components/AddMealModal.tsx`).
//          - [DONE] Include search input.
//          - [DONE] Display search results (recipes/custom foods).
//          - [DONE] Allow selection of an item.
//          - [DONE] Include inputs/selects for Servings and Meal Type (Breakfast, Lunch, Dinner, Snack).
//          - [DONE] Include Submit/Cancel buttons.
//    - [DONE] Implement search functionality within the modal.
//          - [DONE] Call the existing `/api/search` endpoint as the user types.
//          - [DONE] Display results clearly, distinguishing between recipes and custom foods.
//    - [DONE] Implement submission logic in the modal.
//          - [DONE] Gather selected item (recipeId or customFoodEntryId), date (passed to modal), servings, meal type.
//          - [DONE] Call `POST /api/planner` with the gathered data.
//          - [DONE] Handle success (close modal, refresh planner data) and errors (display message).
//    - [DONE] Trigger modal opening from the "+" button on day cards.
//          - [DONE] Pass the specific date of the day card to the modal.
//    - [DONE] Ensure the planner UI updates visually after successfully adding a meal.

// --- 3. View Meal Details --- [DONE]
//    - [DONE] Create "Meal Details" modal component (e.g., `components/MealDetailsModal.tsx`).
//    - [DONE] Implement the actual logic within `handleViewMealDetails` in `app/meal-planner/page.tsx`.
//          - [DONE] Fetch full details if necessary (or ensure they are already available in the planner data).
//          - [DONE] Open the `MealDetailsModal` and pass the relevant meal data (recipe or custom food details).
//    - [DONE] Populate the `MealDetailsModal` with data:
//          - [DONE] Recipe: Image, Title, Servings (from planner meal), Ingredients, Instructions, Full Nutrition Facts.
//          - [DONE] Custom Food: Name, Servings (from planner meal), Nutrition Facts.

// --- 4. Shopping List Generation --- [PARTIALLY DONE]
//    - [IN PROGRESS] Create utility function `generateShoppingList(selectedMeals: PlannerMealData[])` (e.g., in `lib/shoppingListUtils.ts`).
//          - [DONE] Iterate through selected meals.
//          - [DONE] Aggregate ingredients from associated recipes (basic aggregation exists).
//          - [TODO] Adjust ingredient quantities based on planned servings vs. recipe base servings.
//          - [TODO] Combine identical ingredients (e.g., "2 cups flour" + "1 cup flour" = "3 cups flour"). Consider unit consistency/conversion.
//    - [DONE] Create UI for Shopping List (e.g., `components/ShoppingListDisplay.tsx`).
//          - [DONE] Display the aggregated list of ingredients and quantities.
//          - [TODO] Potentially group by category (produce, dairy, etc.) - requires ingredient categorization.
//          - [TODO] Add checkboxes to mark items as acquired.
//    - [DONE] Create a page or integrate into UI to trigger generation and display the list.
//          - [DONE] Add a button (e.g., "Generate Shopping List").
//          - [DONE] Use SelectMeals modal instead of date range selector.
//          - [DONE] Fetch planner data for the range, call `generateShoppingList`, and display results in the UI component.

// == Nice-to-Have / Future Enhancements ==
// - Drag-and-drop meals between days/meal types.
// - Meal time indicators (e.g., 8:00 AM Breakfast).
// - Weekly summary view.
// - Recipe scaling integration.
// - More sophisticated ingredient parsing/categorization for shopping list.
// - Print planner/shopping list option.
// - Integration with external calendars.
