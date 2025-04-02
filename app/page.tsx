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

export default function Home() {
  const [showFavorites, setShowFavorites] = useState(false);
  const [selectedDiets, setSelectedDiets] = useState<DietType[]>([]);
  const [excludedFoods, setExcludedFoods] = useState<string[]>([]);
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [isSearching, setIsSearching] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const searchParams = useSearchParams();

  const performSearch = useCallback(async (term: string) => {
    setShowFavorites(false); // Hide favorites when searching
    setIsSearching(true);
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

  // Handle search params changes
  useEffect(() => {
    const query = searchParams.get('q');
    if (query) {
      setSearchTerm(query);
      performSearch(query);
    } else {
      setIsSearching(false);
      setSearchTerm('');
    }
  }, [searchParams, performSearch]);

  // Handle favorite recipes event
  useEffect(() => {
    const handleShowFavorites = () => {
      setShowFavorites(true);
      setIsSearching(false);
      setSearchTerm('');
    };

    const handleHideFavorites = () => {
      setShowFavorites(false);
    };

    window.addEventListener('showFavoriteRecipes', handleShowFavorites);
    window.addEventListener('hideFavoriteRecipes', handleHideFavorites);
    
    return () => {
      window.removeEventListener('showFavoriteRecipes', handleShowFavorites);
      window.removeEventListener('hideFavoriteRecipes', handleHideFavorites);
    };
  }, []);

  const handleMoreSearchResults = useCallback(async () => {
    if (!searchTerm) return;
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
          searchInput: searchTerm,
          allowPartialMatch: true
        })
      });

      if (!response.ok) {
        throw new Error('Failed to fetch recipes');
      }
      const data = await response.json();
      setRecipes(data.recipes || []);
    } catch (error) {
      console.error('Error generating more recipes:', error);
      alert('Failed to generate more recipes. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [searchTerm]);

  // Function to handle home navigation
  const handleHomeClick = useCallback(() => {
    setShowFavorites(false);
    setIsSearching(false);
    setSearchTerm('');
    setRecipes([]);
  }, []);

  return (
    <main className="min-h-screen bg-[#ffc800]">
      <Navbar onHomeClick={handleHomeClick} onSearch={performSearch} />
      <div className="container mx-auto p-8 flex flex-col items-center justify-center space-y-12">
        <TypewriterHeader />
        
        {showFavorites ? (
          <FavoriteRecipes 
            isVisible={true} 
            onBack={() => {
              setShowFavorites(false);
              handleHomeClick();
            }} 
          />
        ) : isSearching ? (
          <SearchResults
            searchTerm={searchTerm}
            recipes={recipes}
            isLoading={isLoading}
            onBackToPreferences={() => {
              setIsSearching(false);
              setSearchTerm('');
            }}
            onGenerateMore={handleMoreSearchResults}
          />
        ) : (
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
    </main>
  );
} 
