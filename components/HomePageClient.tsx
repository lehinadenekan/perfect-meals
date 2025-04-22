'use client';

import React, { useState, useEffect, useCallback } from 'react';
import TypewriterHeader from './TypewriterHeader';
import { Recipe } from '@/lib/types/recipe';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import { Button } from '@/components/ui/button';
import { Filter } from 'lucide-react';
import { useSession } from 'next-auth/react';
import FilterModal, { AppliedFilters } from './filters/FilterModal';
import MealCarousel from './recipe/MealCarousel';

// --- Define a type for User Preferences matching the API response/schema ---
interface UserPreferenceData {
  userEmail?: string; // Optional as it might not always be needed in frontend
  dietTypes: string[];
  regions: string[];
  excludedFoods: string[];
  cookingStyles: string[];
  mealCategories: string[];
  // Add other preference fields if they exist (e.g., cookingTime, mealPrep, servingSize)
}

export default function HomePageClient() {
  // --- Session ---
  const { data: _session, status } = useSession();
  const isAuthenticated = status === 'authenticated';

  // --- State ---
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // --- State for pagination ---
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [appliedFilters, setAppliedFilters] = useState<AppliedFilters>({
    diets: [],
    regions: [],
    excludedFoods: [],
    cookingStyles: [],
    mealCategories: [],
  });
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  // --- State for fetched user preferences ---
  const [userPreferences, setUserPreferences] = useState<UserPreferenceData | null>(null);
  const [_isLoadingPreferences, setIsLoadingPreferences] = useState(true);

  // --- Fetch Recipes Function ---
  const fetchRecipes = useCallback(async (filters: AppliedFilters, pageToFetch: number = 1) => {
    setIsLoading(true);
    setError(null);
    console.log(`Fetching recipes - Page: ${pageToFetch}, Filters:`, filters);
    
    try {
      const queryParams = new URLSearchParams();
      // Add filters to queryParams (existing logic)
      if (filters.diets && filters.diets.length > 0) { queryParams.append('diets', filters.diets.join(',')); }
      if (filters.regions && filters.regions.length > 0) { queryParams.append('regions', filters.regions.join(',')); }
      if (filters.excludedFoods && filters.excludedFoods.length > 0) { queryParams.append('excludedFoods', filters.excludedFoods.join(',')); }
      if (filters.cookingStyles && filters.cookingStyles.length > 0) { queryParams.append('cookingStyles', filters.cookingStyles.join(',')); }
      if (filters.mealCategories && filters.mealCategories.length > 0) { queryParams.append('mealCategories', filters.mealCategories.join(',')); }
      
      // --- Add pagination parameters (page, limit=8) --- 
      queryParams.append('page', pageToFetch.toString());
      queryParams.append('limit', '8'); // Set limit to 8

      const queryString = queryParams.toString();
      const apiUrl = `/api/recipes${queryString ? '?' + queryString : ''}`;
      console.log("API URL:", apiUrl);

      const response = await fetch(apiUrl); // Use GET by default
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      
      // --- Always replace recipes --- 
      setRecipes(data.recipes || []);
      
      // --- Update pagination state --- 
      setCurrentPage(data.currentPage || 1);
      setTotalPages(data.totalPages || 1);

    } catch (err) {
      console.error('Error fetching recipes:', err);
      setError(err instanceof Error ? err.message : 'Failed to load recipes');
      setRecipes([]); // Clear recipes on error
    } finally {
      // --- Reset single loading state --- 
      setIsLoading(false);
    }
  }, []);

  // --- Effect for Initial Recipe Fetch --- 
  useEffect(() => {
    // Fetch page 1 with current appliedFilters (initially empty)
    fetchRecipes(appliedFilters, 1);
  }, [fetchRecipes, appliedFilters]); // Re-run if filters change

  // --- Effect for Fetching User Preferences ---
  useEffect(() => {
    const fetchUserPreferences = async () => {
      if (isAuthenticated) {
        setIsLoadingPreferences(true);
        try {
          const response = await fetch('/api/user/preferences');
          if (!response.ok) {
            throw new Error('Failed to fetch preferences');
          }
          const data = await response.json();
          if (data.success && data.preferences) {
             setUserPreferences(data.preferences);
             // Optional: Apply fetched preferences as initial filters?
             // handleApplyFilters(mapPreferencesToAppliedFilters(data.preferences));
          } else {
            // Handle case where API succeeded but data is missing
            setUserPreferences(null); // Or set default empty preferences
          }
        } catch (error) {
          console.error("Error fetching user preferences:", error);
          setUserPreferences(null); // Don't block UI on preference fetch error
        } finally {
          setIsLoadingPreferences(false);
        }
      } else {
        // Not authenticated, no preferences to load
        setUserPreferences(null);
        setIsLoadingPreferences(false);
      }
    };

    fetchUserPreferences();
  }, [isAuthenticated]); // Re-run if authentication status changes

  // --- Handler for Applying Filters from Modal ---
  const handleApplyFilters = (newFilters: AppliedFilters) => {
    setAppliedFilters(newFilters);
    setCurrentPage(1); // Reset to page 1 when filters change
    setIsFilterModalOpen(false);
  };

  // --- Handler for Load More button --- 
  const handleLoadMore = () => {
    if (currentPage < totalPages && !isLoading) {
      const nextPage = currentPage + 1;
      fetchRecipes(appliedFilters, nextPage);
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-8 flex flex-col items-center space-y-6 md:space-y-12">
      <TypewriterHeader />

      <div className="w-full max-w-6xl">
         <div className="flex justify-end mb-4">
           <Button onClick={() => setIsFilterModalOpen(true)} variant="outline">
             <Filter className="h-4 w-4 mr-2" />
             Filter
           </Button>
         </div>

        {isLoading && recipes.length === 0 && (
          <div className="flex justify-center items-center py-12 h-[500px]">
            <LoadingSpinner />
          </div>
        )}

        {error && (
          <div className="text-center text-red-600 bg-red-100 p-4 rounded border border-red-400 my-8">
            Error loading recipes: {error}
          </div>
        )}

        {!isLoading && !error && recipes.length === 0 && (
            <div className="text-center text-gray-600 py-8 h-[500px] flex items-center justify-center bg-gray-50 rounded-xl">
                 <div>
                    <p className="text-lg mb-2">No recipes found matching your criteria.</p>
                    <p className="text-sm text-gray-500">Try adjusting your filters.</p>
                 </div>
             </div>
        )}

        {(recipes.length > 0 || (isLoading && recipes.length > 0)) && (
             <MealCarousel 
                title="Featured Recipes"
                recipes={recipes} 
                isLoading={isLoading && currentPage > 1} 
            />
        )}

        {!isLoading && recipes.length > 0 && currentPage < totalPages && (
            <div className="text-center mt-8">
            <Button 
                variant="secondary" 
                onClick={handleLoadMore} 
                disabled={isLoading} 
            >
                {isLoading ? 'Loading...' : 'Load More Recipes'}
            </Button>
            </div>
        )}

      </div>

      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        onApplyFilters={handleApplyFilters}
        initialFilters={userPreferences} 
      />

    </div>
  );
}

// --- Helper function (optional) to map UserPreferenceData to AppliedFilters --- 
// function mapPreferencesToAppliedFilters(prefs: UserPreferenceData): AppliedFilters {
//   return {
//     diets: prefs.dietTypes || [],
//     regions: prefs.regions || [],
//     excludedFoods: prefs.excludedFoods || [],
//     cookingStyles: prefs.cookingStyles || [],
//     mealCategories: prefs.mealCategories || [],
//   };
// }
