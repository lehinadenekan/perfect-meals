import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { DietType, DIET_TYPES } from '@/types/diet';
import GeographicFilter from './GeographicFilter';
import MealCarousel from '../recipe/MealCarousel';
import { Recipe } from '@/app/types/recipe';
import { usePreferenceUpdates } from '@/app/hooks/usePreferenceUpdates';
import { ExcludedFoodsInput } from './ExcludedFoodsInput';
import { SearchInput } from './SearchInput';
import { DIET_ICONS } from '@/app/config/dietaryIcons';

// Define the order of diet types for top and bottom rows
const TOP_ROW_DIETS: DietType[] = ['fermented', 'gluten-free', 'lactose-free', 'low-FODMAP'];
const BOTTOM_ROW_DIETS: DietType[] = ['nut-free', 'pescatarian', 'vegan', 'vegetarian'];

const DietaryPreferenceSelector: React.FC = () => {
  const { data: session, status } = useSession();
  const [selectedDiets, setSelectedDiets] = useState<DietType[]>([]);
  const [excludedFoods, setExcludedFoods] = useState<string[]>([]);
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [searchInput, setSearchInput] = useState('');
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { updatePreferences } = usePreferenceUpdates({
    dietTypes: [],
    excludedFoods: [],
    selectedRegions: [],
    searchInput: '',
  });

  useEffect(() => {
    if (session?.user) {
      // Load user preferences from the server
      fetch('/api/preferences')
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          if (data && typeof data === 'object') {
            setSelectedDiets(Array.isArray(data.dietTypes) ? data.dietTypes : []);
            setExcludedFoods(Array.isArray(data.excludedFoods) ? data.excludedFoods : []);
            setSelectedRegions(Array.isArray(data.selectedRegions) ? data.selectedRegions : []);
            setSearchInput(typeof data.searchInput === 'string' ? data.searchInput : '');
          }
        })
        .catch(error => {
          console.error('Error loading preferences:', error);
          // Reset to defaults on error
          setSelectedDiets([]);
          setExcludedFoods([]);
          setSelectedRegions([]);
          setSearchInput('');
        });
    } else {
      // Load from localStorage for unauthenticated users
      const storedDiets = localStorage.getItem('dietary-preferences-selected-diets');
      const storedFoods = localStorage.getItem('dietary-preferences-excluded-foods');
      const storedRegions = localStorage.getItem('dietary-preferences-selected-regions');
      const storedSearch = localStorage.getItem('dietary-preferences-search-input');

      if (storedDiets) setSelectedDiets(JSON.parse(storedDiets));
      if (storedFoods) setExcludedFoods(JSON.parse(storedFoods));
      if (storedRegions) setSelectedRegions(JSON.parse(storedRegions));
      if (storedSearch) setSearchInput(storedSearch);
    }
  }, [session]);

  const handleDietToggle = async (dietType: DietType) => {
    setSelectedDiets(prev => {
      const newDiets = prev.includes(dietType)
        ? prev.filter(d => d !== dietType)
        : [...prev, dietType];

      if (session?.user) {
        setIsSaving(true);
        Promise.resolve(updatePreferences({
          dietTypes: newDiets,
          excludedFoods,
          selectedRegions,
          searchInput,
        })).finally(() => setIsSaving(false));
      } else {
        localStorage.setItem('dietary-preferences-selected-diets', JSON.stringify(newDiets));
      }

      return newDiets;
    });
    setRecipes([]);
  };

  const handleClearPreferences = () => {
    setSelectedDiets([]);
    setExcludedFoods([]);
    setSelectedRegions([]);
    setSearchInput('');
    setRecipes([]);

    if (session?.user) {
      setIsSaving(true);
      Promise.resolve(updatePreferences({
        dietTypes: [],
        excludedFoods: [],
        selectedRegions: [],
        searchInput: '',
      })).finally(() => setIsSaving(false));
    } else {
      localStorage.removeItem('dietary-preferences-selected-diets');
      localStorage.removeItem('dietary-preferences-excluded-foods');
      localStorage.removeItem('dietary-preferences-selected-regions');
      localStorage.removeItem('dietary-preferences-search-input');
    }
  };

  const handleGenerateRecipes = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/recipes/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          dietTypes: selectedDiets,
          excludedFoods,
          selectedRegions,
          searchInput,
        }),
      });
      const data = await response.json();
      setRecipes(data.recipes || []);
    } catch (error) {
      console.error('Error generating recipes:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>, index: number) => {
    const totalCards = TOP_ROW_DIETS.length + BOTTOM_ROW_DIETS.length;
    const cardsPerRow = TOP_ROW_DIETS.length;

    switch (e.key) {
      case 'ArrowRight':
        e.preventDefault();
        const nextIndex = (index + 1) % totalCards;
        const nextCard = document.querySelectorAll('[role="button"]')[nextIndex] as HTMLElement;
        nextCard?.focus();
        break;
      case 'ArrowLeft':
        e.preventDefault();
        const prevIndex = (index - 1 + totalCards) % totalCards;
        const prevCard = document.querySelectorAll('[role="button"]')[prevIndex] as HTMLElement;
        prevCard?.focus();
        break;
      case 'ArrowDown':
        e.preventDefault();
        const downIndex = (index + cardsPerRow) % totalCards;
        const downCard = document.querySelectorAll('[role="button"]')[downIndex] as HTMLElement;
        downCard?.focus();
        break;
      case 'ArrowUp':
        e.preventDefault();
        const upIndex = (index - cardsPerRow + totalCards) % totalCards;
        const upCard = document.querySelectorAll('[role="button"]')[upIndex] as HTMLElement;
        upCard?.focus();
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        handleDietToggle(index < cardsPerRow ? TOP_ROW_DIETS[index] : BOTTOM_ROW_DIETS[index - cardsPerRow]);
        break;
    }
  };

  return (
    <div 
      className="w-full max-w-7xl mx-auto"
      role="region"
      aria-label="dietary preferences selection"
    >
      <h2 className="text-2xl font-bold text-center mb-16">
        Choose Your Dietary Preferences
      </h2>

      {selectedDiets.length > 0 && (
        <p className="text-center mb-4">
          Selected Diets: {selectedDiets.map(diet => diet.charAt(0).toUpperCase() + diet.slice(1)).join(', ')}
        </p>
      )}

      {excludedFoods.length > 0 && (
        <p className="text-center mb-4">
          Excluded Foods: {excludedFoods.map(food => food.charAt(0).toUpperCase() + food.slice(1)).join(', ')}
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {/* Diet Type Cards */}
        {TOP_ROW_DIETS.map((dietType, index) => (
          <div key={dietType} className="group relative">
            <div className="absolute left-1/2 -translate-x-1/2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10 -top-12">
              {DIET_TYPES[dietType].description}
              <div className="absolute left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 transform rotate-45 -bottom-1" />
            </div>
            <div
              role="button"
              tabIndex={0}
              aria-pressed={selectedDiets.includes(dietType)}
              onClick={() => handleDietToggle(dietType)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className={`relative p-6 rounded-xl shadow-lg cursor-pointer transition-all duration-300 transform hover:scale-105 border-2 bg-white ${
                selectedDiets.includes(dietType) ? 'border-yellow-400' : 'border-transparent hover:border-yellow-200'
              }`}
            >
              <div className="flex flex-col items-center justify-center gap-3">
                {React.createElement(DIET_ICONS[dietType], {
                  className: `w-6 h-6 ${selectedDiets.includes(dietType) ? 'text-yellow-500' : 'text-gray-600'}`,
                  'aria-hidden': true
                })}
                <h3 className="text-lg font-semibold text-center">
                  {DIET_TYPES[dietType].title}
                </h3>
              </div>
            </div>
          </div>
        ))}
        {/* Bottom Row Diet Type Cards */}
        {BOTTOM_ROW_DIETS.map((dietType, index) => (
          <div key={dietType} className="group relative">
            <div className="absolute left-1/2 -translate-x-1/2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10 -top-12">
              {DIET_TYPES[dietType].description}
              <div className="absolute left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 transform rotate-45 -bottom-1" />
            </div>
            <div
              role="button"
              tabIndex={0}
              aria-pressed={selectedDiets.includes(dietType)}
              onClick={() => handleDietToggle(dietType)}
              onKeyDown={(e) => handleKeyDown(e, index + TOP_ROW_DIETS.length)}
              className={`relative p-6 rounded-xl shadow-lg cursor-pointer transition-all duration-300 transform hover:scale-105 border-2 bg-white ${
                selectedDiets.includes(dietType) ? 'border-yellow-400' : 'border-transparent hover:border-yellow-200'
              }`}
            >
              <div className="flex flex-col items-center justify-center gap-3">
                {React.createElement(DIET_ICONS[dietType], {
                  className: `w-6 h-6 ${selectedDiets.includes(dietType) ? 'text-yellow-500' : 'text-gray-600'}`,
                  'aria-hidden': true
                })}
                <h3 className="text-lg font-semibold text-center">
                  {DIET_TYPES[dietType].title}
                </h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-8">
        <div role="search">
          <ExcludedFoodsInput
            excludedFoods={excludedFoods}
            onExcludedFoodsChange={setExcludedFoods}
          />
          
          <GeographicFilter
            selectedRegions={selectedRegions}
            onRegionsChange={setSelectedRegions}
          />

          <SearchInput
            searchTerm={searchInput}
            onSearchChange={setSearchInput}
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-4 mt-8" role="group" aria-label="preference actions">
        <button
          onClick={handleClearPreferences}
          className="px-6 py-3 bg-red-100 hover:bg-red-200 text-red-800 rounded-lg font-semibold transition-colors duration-200"
        >
          Clear Preferences
        </button>
        <button
          onClick={handleGenerateRecipes}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors duration-200"
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'Generate Meals'}
        </button>
      </div>

      {status === 'unauthenticated' && (
        <p className="text-center mt-4 text-gray-600">
          Log in to save your preferences
        </p>
      )}

      {isSaving && (
        <p className="text-center mt-4 text-gray-600">
          Saving preferences...
        </p>
      )}

      {recipes.length > 0 && (
        <div className="mt-16">
          <MealCarousel recipes={recipes} />
        </div>
      )}
    </div>
  );
};

export default DietaryPreferenceSelector; 