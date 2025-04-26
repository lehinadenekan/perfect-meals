import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import GenerateRecipePage from './page'; // Assuming test file is in the same directory
import { SessionProvider } from 'next-auth/react'; // Needed to wrap component

// Mock next-auth useSession
vi.mock('next-auth/react', () => ({
    useSession: vi.fn(() => ({ data: null, status: 'unauthenticated' })), // Default mock
    SessionProvider: ({ children }: { children: React.ReactNode }) => children, // Mock provider pass-through
}));

// Mock fetch
global.fetch = vi.fn();

describe('GenerateRecipePage', () => {
  it('renders the heading and initial form elements', () => {
    render(
        <SessionProvider session={null}>
            <GenerateRecipePage />
        </SessionProvider>
    );

    // Check for heading
    expect(screen.getByRole('heading', { name: /Generate Recipe Ideas with AI/i })).toBeInTheDocument();

    // Check for ingredient input area
    expect(screen.getByLabelText(/Ingredients/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/e\.g\., chicken breast, broccoli/i)).toBeInTheDocument();

    // Check for preference dropdowns
    expect(screen.getByLabelText(/Dietary Preference/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Cuisine Style/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Meal Type/i)).toBeInTheDocument();

    // Check for generate button
    expect(screen.getByRole('button', { name: /Generate Recipe/i })).toBeInTheDocument();
  });

  // TODO: Add more tests:
  // - Authenticated state rendering (Save button)
  // - Adding/removing ingredient tags
  // - Form submission (mocking fetch for generation)
  // - Displaying loading state
  // - Displaying error state
  // - Displaying results (title, ingredients, instructions, meta, nutrition)
  // - Testing Regenerate, Save, Copy buttons (mocking fetch/clipboard)
}); 