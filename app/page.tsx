'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from './components/Navbar';
import TypewriterHeader from './components/TypewriterHeader';
import DietaryPreferenceSelector from './components/dietary/DietaryPreferenceSelector';
import FavoriteRecipes from './components/favorites/FavoriteRecipes';
import SearchResults from './components/search/SearchResults';
import { Recipe } from '@/app/types/recipe';
import { DietType } from '@/types/diet';
// Import RecentlyViewedRecipes
import RecentlyViewedRecipes from './components/recently-viewed/RecentlyViewedRecipes'; 

// Define view modes
type CurrentView = 'default' | 'favorites' | 'searchResults' | 'recentlyViewed';

export default function Home() {
  // Remove showFavorites and isSearching state, manage with currentView
  // const [showFavorites, setShowFavorites] = useState(false);
  // const [isSearching, setIsSearching] = useState(false);
  const [selectedDiets, setSelectedDiets] = useState<DietType[]>([]);
  const [excludedFoods, setExcludedFoods] = useState<string[]>([]);
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [currentStep, setCurrentStep] = useState(1); // Keep for DietaryPreferenceSelector
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const searchParams = useSearchParams();

  // Album Refresh State (Keep)
  const [albumRefreshTrigger, setAlbumRefreshTrigger] = useState(0);
  const triggerAlbumRefresh = useCallback(() => {
      console.log("Triggering album list refresh");
      setAlbumRefreshTrigger(prev => prev + 1);
  }, []);

  // Main View State
  const [currentView, setCurrentView] = useState<CurrentView>('default');

  const performSearch = useCallback(async (term: string) => {
    // setShowFavorites(false);
    // setIsSearching(true);
    setCurrentView('searchResults'); // Set view mode
    setSearchTerm(term); // Store search term for SearchResults component
    setIsLoading(true);
    try {
      const response = await fetch('/api/recipes/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          dietTypes: [],
          selectedRegions: [],
          excludedFoods: [],
          searchInput: term,
          allowPartialMatch: true
        })
      });

      if (!response.ok) {
        throw new Error('Failed to fetch recipes');
      }
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

  // Handle search params changes (update to set view)
  useEffect(() => {
    const query = searchParams.get('q');
    if (query) {
      // Don't trigger search here directly, let performSearch handle it
      // setSearchTerm(query);
      // performSearch(query); 
      // Instead, just set the view and term, let SearchResults fetch if needed
      // Or rely on performSearch being called elsewhere (e.g., Navbar onSubmit)
      // Let's keep performSearch as the trigger for simplicity for now.
    } else {
      // If query is removed, potentially go back to default view?
      // setCurrentView('default'); 
      // setSearchTerm('');
    }
  }, [searchParams]);

  // Handle custom navigation events
  useEffect(() => {
    const handleShowFavorites = () => {
      // setShowFavorites(true);
      // setIsSearching(false);
      setCurrentView('favorites');
      setSearchTerm(''); // Clear search term when showing favorites
      setRecipes([]); // Clear search results
    };
    
    const handleShowRecentlyViewed = () => {
      setCurrentView('recentlyViewed');
      setSearchTerm(''); // Clear search term
      setRecipes([]); // Clear search results
    };

    // This event seems less relevant now view is managed directly?
    // const handleHideFavorites = () => {
    //   setShowFavorites(false);
    // };

    window.addEventListener('showFavoriteRecipes', handleShowFavorites);
    window.addEventListener('showRecentlyViewed', handleShowRecentlyViewed); // Listen for new event
    // window.addEventListener('hideFavoriteRecipes', handleHideFavorites);
    
    return () => {
      window.removeEventListener('showFavoriteRecipes', handleShowFavorites);
      window.removeEventListener('showRecentlyViewed', handleShowRecentlyViewed);
      // window.removeEventListener('hideFavoriteRecipes', handleHideFavorites);
    };
  }, []);

  const handleMoreSearchResults = useCallback(async () => {
    // Logic remains mostly the same
    if (!searchTerm) return;
    // ... (fetch logic) ...
  }, [searchTerm]);

  // Function to handle home navigation
  const handleHomeClick = useCallback(() => {
    // setShowFavorites(false);
    // setIsSearching(false);
    setCurrentView('default'); // Go back to default view
    setSearchTerm('');
    setRecipes([]);
  }, []);

  // Function to handle going back from a specific view (e.g., favorites, recently viewed)
  const handleGoBackToDefault = useCallback(() => {
      setCurrentView('default');
  }, []);

  return (
    <main className="min-h-screen bg-[#ffc800]">
      <Navbar onHomeClick={handleHomeClick} onSearch={performSearch} />
      <div className="container mx-auto p-8 flex flex-col items-center justify-center space-y-12">
        
        {/* Conditionally render header or keep it static? */}
        {/* Only show Typewriter if in default view? */}
        {currentView === 'default' && <TypewriterHeader />} 
        
        {/* Main Content Area based on currentView */}
        {currentView === 'favorites' && (
          <FavoriteRecipes 
            // isVisible is implicitly true now
            onBack={handleGoBackToDefault} // Use generic back handler
            onAlbumUpdate={triggerAlbumRefresh}
            albumRefreshTrigger={albumRefreshTrigger}
          />
        )}
        
        {currentView === 'searchResults' && (
          <SearchResults
            searchTerm={searchTerm}
            recipes={recipes}
            isLoading={isLoading}
            onBackToPreferences={() => setCurrentView('default')} // Example: back goes to default
            onGenerateMore={handleMoreSearchResults}
            onAlbumUpdate={triggerAlbumRefresh}
          />
        )}
        
        {currentView === 'recentlyViewed' && (
           // Render the actual RecentlyViewedRecipes component
           <RecentlyViewedRecipes 
             onBack={handleGoBackToDefault}
             onAlbumUpdate={triggerAlbumRefresh} // Pass down the update trigger
           />
        )}

        {/* Default view content (Dietary Selector) */}
        {currentView === 'default' && (
          <DietaryPreferenceSelector
            selectedDiets={selectedDiets}
            setSelectedDiets={setSelectedDiets}
            excludedFoods={excludedFoods}
            setExcludedFoods={setExcludedFoods}
            selectedRegions={selectedRegions}
            setSelectedRegions={setSelectedRegions}
            recipes={recipes} // Pass recipes if needed by selector/results
            setRecipes={setRecipes} // Pass setRecipes if needed
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
          />
        )}
      </div>
    </main>
  );
} 
