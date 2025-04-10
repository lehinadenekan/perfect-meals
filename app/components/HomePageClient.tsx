'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from './Navbar'; // Assuming Navbar doesn't use searchParams directly
import TypewriterHeader from './TypewriterHeader';
import DietaryPreferenceSelector from './dietary/DietaryPreferenceSelector';
import FavouriteRecipes from './favourites/FavouriteRecipes';
import SearchResults from './search/SearchResults';
import { Recipe } from '@/lib/types/recipe';
import { DietType } from '@/types/diet';
import RecentlyViewedRecipes from './recently-viewed/RecentlyViewedRecipes';

type CurrentView = 'default' | 'favorites' | 'searchResults' | 'recentlyViewed';

// This component contains all the logic previously in app/page.tsx
export default function HomePageClient() {
  const [selectedDiets, setSelectedDiets] = useState<DietType[]>([]);
  const [excludedFoods, setExcludedFoods] = useState<string[]>([]);
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const searchParams = useSearchParams(); // This hook is now safe inside a Client Component

  const [albumRefreshTrigger, setAlbumRefreshTrigger] = useState(0);
  const triggerAlbumRefresh = useCallback(() => {
    console.log("Triggering album list refresh");
    setAlbumRefreshTrigger(prev => prev + 1);
  }, []);

  const [currentView, setCurrentView] = useState<CurrentView>('default');

  const performSearch = useCallback(async (term: string) => {
    setCurrentView('searchResults');
    setSearchTerm(term);
    setIsLoading(true);
    try {
      const response = await fetch('/api/recipes/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          dietTypes: [], selectedRegions: [], excludedFoods: [],
          searchInput: term, allowPartialMatch: true
        })
      });
      if (!response.ok) throw new Error('Failed to fetch recipes');
      const data = await response.json();
      setRecipes(data.recipes || []);
    } catch (error) {
      console.error('Error searching recipes:', error);
      alert('Failed to search recipes. Please try again.');
      setRecipes([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const query = searchParams.get('q');
    if (query && !searchTerm) { // Only perform search if query exists and isn't already the current term
      performSearch(query);
    }
    // Add logic here if you want clearing the 'q' param to reset the view
    // else if (!query && currentView === 'searchResults') {
    //  setCurrentView('default');
    //  setSearchTerm('');
    //  setRecipes([]);
    // }
  }, [searchParams, performSearch, searchTerm, currentView]);

  useEffect(() => {
    // Only run on the client where window is defined
    if (typeof window !== 'undefined') {
      const handleShowFavorites = () => {
        setCurrentView('favorites');
        setSearchTerm('');
        setRecipes([]);
      };
      const handleShowRecentlyViewed = () => {
        setCurrentView('recentlyViewed');
        setSearchTerm('');
        setRecipes([]);
      };
      window.addEventListener('showFavoriteRecipes', handleShowFavorites);
      window.addEventListener('showRecentlyViewed', handleShowRecentlyViewed);

      // Return cleanup function within the client-side block
      return () => {
        window.removeEventListener('showFavoriteRecipes', handleShowFavorites);
        window.removeEventListener('showRecentlyViewed', handleShowRecentlyViewed);
      };
    }
  }, []);

  const handleMoreSearchResults = useCallback(async () => {
    // TODO: Implement actual fetch logic for more results if needed
    if (!searchTerm) return;
    console.log("Fetching more results for:", searchTerm);
  }, [searchTerm]);

  const handleHomeClick = useCallback(() => {
    setCurrentView('default');
    setSearchTerm('');
    setRecipes([]);
    // If using URL state, also clear query params: router.push('/')
  }, []);

  const handleGoBackToDefault = useCallback(() => {
    setCurrentView('default');
  }, []);

  return (
    <> {/* Use Fragment as we don't need the outer main/navbar here */}
      <Navbar onHomeClick={handleHomeClick} onSearch={performSearch} />
      <div className="container mx-auto p-4 md:p-8 flex flex-col items-center justify-center space-y-6 md:space-y-12">
        {currentView === 'default' && <TypewriterHeader />}

        {currentView === 'favorites' && (
          <FavouriteRecipes
            onBack={handleGoBackToDefault}
            onAlbumUpdate={triggerAlbumRefresh}
            albumRefreshTrigger={albumRefreshTrigger}
          />
        )}

        {currentView === 'searchResults' && (
          <SearchResults
            searchTerm={searchTerm}
            recipes={recipes}
            isLoading={isLoading}
            onBackToPreferences={() => setCurrentView('default')}
            onGenerateMore={handleMoreSearchResults}
            onAlbumUpdate={triggerAlbumRefresh}
          />
        )}

        {currentView === 'recentlyViewed' && (
          <RecentlyViewedRecipes
            onBack={handleGoBackToDefault}
            onAlbumUpdate={triggerAlbumRefresh}
          />
        )}

        {currentView === 'default' && (
          <DietaryPreferenceSelector
            selectedDiets={selectedDiets}
            setSelectedDiets={setSelectedDiets}
            excludedFoods={excludedFoods}
            setExcludedFoods={setExcludedFoods}
            selectedRegions={selectedRegions}
            setSelectedRegions={setSelectedRegions}
            recipes={recipes}
            setRecipes={setRecipes}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
          />
        )}
      </div>
    </>
  );
}
