import { test, expect } from '@playwright/test';

// Base URL for the development server
const baseURL = 'http://localhost:3000';

test.describe('Recipe Modal', () => {
  test('should display ingredients in the recipe modal', async ({ page }) => {
    // 1. Navigate to the homepage
    await page.goto(baseURL);

    // 2. Find and click the first recipe card
    //    Adjust the selector if needed for more specificity/stability
    //    Example: Use data-testid if available, or a more specific class/structure
    const firstRecipeCard = page.locator('.group.relative.overflow-hidden').first(); // Example selector - VERIFY THIS
    await expect(firstRecipeCard).toBeVisible();
    await firstRecipeCard.click();

    // 3. Wait for the modal dialog to appear
    const modal = page.locator('[role="dialog"]#recipe-modal-content'); // Target the specific modal panel
    await expect(modal).toBeVisible({ timeout: 10000 }); // Increased timeout for modal appearance

    // 4. Assert that the "Ingredients" heading is visible within the modal
    const ingredientsHeading = modal.locator('h3:has-text("Ingredients")');
    await expect(ingredientsHeading).toBeVisible();

    // 5. Assert that the ingredients list (ul) has at least one list item (li)
    //    This assumes ingredients are rendered within a <ul> directly under the heading's container div
    const ingredientsListContainer = ingredientsHeading.locator('xpath=./following-sibling::ul'); // Find the UL sibling
    await expect(ingredientsListContainer).toBeVisible();
    const firstIngredientItem = ingredientsListContainer.locator('li').first();
    await expect(firstIngredientItem).toBeVisible();
    
    // Optional: Check for specific ingredient text if needed for more robustness
    // await expect(firstIngredientItem).toContainText('cups'); // Example check
  });
}); 