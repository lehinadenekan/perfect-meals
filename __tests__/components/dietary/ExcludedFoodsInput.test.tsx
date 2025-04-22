import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { ExcludedFoodsInput } from '@/components/dietary/ExcludedFoodsInput'; // Use named import

describe('ExcludedFoodsInput Component', () => {
  it('should render the input field', () => {
    // Arrange: Prepare props and render the component
    const mockOnExcludedFoodsChange = vi.fn();
    render(
      <ExcludedFoodsInput
        excludedFoods={[]}
        onExcludedFoodsChange={mockOnExcludedFoodsChange}
      />
    );

    // Act: Find elements
    const inputElement = screen.getByPlaceholderText(/Type foods to exclude and press Enter/i);

    // Assert: Check if elements are present in the document
    expect(inputElement).toBeInTheDocument();
  });

  it('should add a food item when typing and pressing Enter', async () => {
    // Arrange
    const user = userEvent.setup();
    const mockOnExcludedFoodsChange = vi.fn();
    // Capture rerender function
    const { rerender } = render(
      <ExcludedFoodsInput
        excludedFoods={[]}
        onExcludedFoodsChange={mockOnExcludedFoodsChange}
      />
    );
    const inputElement = screen.getByPlaceholderText(/Type foods to exclude and press Enter/i);

    // Act: Type into input and press Enter
    await user.type(inputElement, 'dairy');
    await user.keyboard('{Enter}');

    // Assert callback first (optional but good practice)
    expect(mockOnExcludedFoodsChange).toHaveBeenCalledTimes(1);
    expect(mockOnExcludedFoodsChange).toHaveBeenCalledWith(['dairy']);

    // Re-render the component with the updated props
    rerender(
      <ExcludedFoodsInput
        excludedFoods={['dairy']} // Pass the expected new array
        onExcludedFoodsChange={mockOnExcludedFoodsChange}
      />
    );

    // Assert: Find pill using the 'within' strategy
    // 1. Find the unique remove button first
    const removeButton = screen.getByRole('button', { name: /remove dairy/i });
    expect(removeButton).toBeInTheDocument();

    // 2. Get the parent pill element (assuming the button's parent is the span)
    const pillElement = removeButton.parentElement;
    expect(pillElement).not.toBeNull(); // Ensure we found the parent

    // 3. Use 'within' to find the text specifically inside the pill span
    if (pillElement) { // Type guard for TypeScript
      // Use anchored regex for exact match, case-insensitive
      const pillText = within(pillElement).getByText(/^dairy$/i); 
      expect(pillText).toBeInTheDocument();
    }

    expect(inputElement).toHaveValue(''); // Assert input is cleared
  });

  it('should remove a food item when clicking its remove button', async () => {
    // Arrange
    const user = userEvent.setup();
    const mockOnExcludedFoodsChange = vi.fn();
    const initialFoods = ['dairy', 'gluten'];
    const { rerender } = render(
      <ExcludedFoodsInput
        excludedFoods={initialFoods}
        onExcludedFoodsChange={mockOnExcludedFoodsChange}
      />
    );

    // Find the remove button for 'dairy'
    const removeDairyButton = screen.getByRole('button', { name: /remove dairy/i });

    // Act: Click the remove button
    await user.click(removeDairyButton);

    // Assert callback
    expect(mockOnExcludedFoodsChange).toHaveBeenCalledTimes(1);
    // Expect it to be called with the remaining food ('gluten')
    expect(mockOnExcludedFoodsChange).toHaveBeenCalledWith(['gluten']);

    // Re-render with updated props
    rerender(
      <ExcludedFoodsInput
        excludedFoods={['gluten']} // Only 'gluten' should remain
        onExcludedFoodsChange={mockOnExcludedFoodsChange}
      />
    );

    // Assert 'dairy' pill is gone, but 'gluten' remains
    expect(screen.queryByText(/^dairy$/i)).toBeNull(); // Dairy should not be found
    expect(screen.getByText(/^gluten$/i)).toBeInTheDocument(); // Gluten should still be there
  });

  // Test for removing an item will go here...
}); 