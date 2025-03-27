'use client';

import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    // Listen for the custom event from the navbar
    const handleShowFavorites = () => {
      setShowFavorites(true);
    };

    const handleSearch = async (event: Event) => {
      const customEvent = event as CustomEvent<{ searchTerm: string }>;
      const searchTerm = customEvent.detail.searchTerm;
      setSearchTerm(searchTerm); // Store the search term
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
            searchInput: searchTerm, // Use the search term directly from the event
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
      } finally {
        setIsLoading(false);
      }
    };

    window.addEventListener('showFavoriteRecipes', handleShowFavorites);
    window.addEventListener('searchRecipes', handleSearch);

    return () => {
      window.removeEventListener('showFavoriteRecipes', handleShowFavorites);
      window.removeEventListener('searchRecipes', handleSearch);
    };
  }, []);

  // Remove the separate handleGenerateRecipes function since we're not using it anymore
  const handleGenerateMore = async () => {
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
      console.error('Error searching recipes:', error);
      alert('Failed to search recipes. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#ffc800]">
      <Navbar />
      <div className="container mx-auto p-8 flex flex-col items-center justify-center space-y-12">
        <TypewriterHeader />
        
        {/* Toggle visibility based on state */}
        {!showFavorites && !isSearching && (
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
        {!showFavorites && isSearching && (
          <SearchResults
            searchTerm={searchTerm}
            recipes={recipes}
            isLoading={isLoading}
            onBackToPreferences={() => setIsSearching(false)}
            onGenerateMore={handleGenerateMore}
          />
        )}
        <FavoriteRecipes 
          isVisible={showFavorites} 
          onBack={() => {
            setShowFavorites(false);
          }} 
        />
      </div>
    </main>
  );
} 
