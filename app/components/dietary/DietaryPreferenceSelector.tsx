import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { DietType, DIET_TYPES } from '@/types/diet';
import GeographicFilter from './GeographicFilter';
import MealCarousel from '../recipe/MealCarousel';
import { Recipe } from '@/app/types/recipe';
import { usePreferenceUpdates } from '@/app/hooks/usePreferenceUpdates';
import { ExcludedFoodsInput } from './ExcludedFoodsInput';
import { DIET_ICONS } from '@/app/config/dietaryIcons';
import DataPills from './DataPills';

// Define the order of diet types for top and bottom rows
const TOP_ROW_DIETS: DietType[] = ['fermented', 'gluten-free', 'lactose-free', 'low-FODMAP'];
const BOTTOM_ROW_DIETS: DietType[] = ['nut-free', 'pescatarian', 'vegan', 'vegetarian'];

const DietaryPreferenceSelector: React.FC = () => {
  const { data: session, status } = useSession();
  const [selectedDiets, setSelectedDiets] = useState<DietType[]>([]);
  const [excludedFoods, setExcludedFoods] = useState<string[]>([]);
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const { updatePreferences } = usePreferenceUpdates({
    dietTypes: [],
    excludedFoods: [],
    selectedRegions: [],
  });

  // Load preferences from server/localStorage (existing code)
  useEffect(() => {
    if (session?.user) {
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
          }
        })
        .catch(error => {
          console.error('Error loading preferences:', error);
          setSelectedDiets([]);
          setExcludedFoods([]);
          setSelectedRegions([]);
        });
    } else {
      const storedDiets = localStorage.getItem('dietary-preferences-selected-diets');
      const storedFoods = localStorage.getItem('dietary-preferences-excluded-foods');
      const storedRegions = localStorage.getItem('dietary-preferences-selected-regions');

      if (storedDiets) setSelectedDiets(JSON.parse(storedDiets));
      if (storedFoods) setExcludedFoods(JSON.parse(storedFoods));
      if (storedRegions) setSelectedRegions(JSON.parse(storedRegions));
    }
  }, [session]);

  // Existing handlers
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
        })).finally(() => setIsSaving(false));
      } else {
        localStorage.setItem('dietary-preferences-selected-diets', JSON.stringify(newDiets));
      }

      return newDiets;
    });
  };

  const handleGenerateRecipes = async () => {
    setIsLoading(true);
    setRecipes([]);
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
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate recipes');
      }

      if (!data.success || !Array.isArray(data.recipes)) {
        throw new Error('Invalid response format from server');
      }

      setRecipes(data.recipes);
    } catch (error) {
      console.error('Error generating recipes:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to generate recipes';
      alert(errorMessage);
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

  // Step navigation handlers
  const handleNext = () => {
    setCurrentStep(prev => Math.min(prev + 1, 3));
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  // Render step content
  const renderStepContent = () => {
    const dataPills = (
      <DataPills
        selectedDiets={selectedDiets}
        selectedRegions={currentStep >= 2 ? selectedRegions : []}
        excludedFoods={currentStep === 3 ? excludedFoods : []}
        onRemoveDiet={handleDietToggle}
        onRemoveRegion={currentStep >= 2 ? (region) => setSelectedRegions(prev => prev.filter(r => r !== region)) : undefined}
        onRemoveExcludedFood={currentStep === 3 ? (food) => setExcludedFoods(prev => prev.filter(f => f !== food)) : undefined}
        showRegions={currentStep >= 2}
        showExcludedFoods={currentStep === 3}
      />
    );

    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-8">
            {dataPills}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
          </div>
        );
      case 2:
        return (
          <div className="space-y-8">
            {dataPills}
            <GeographicFilter
              selectedRegions={selectedRegions}
              onRegionsChange={setSelectedRegions}
            />
          </div>
        );
      case 3:
        return (
          <div className="space-y-8">
            {dataPills}
            <ExcludedFoodsInput
              excludedFoods={excludedFoods}
              onExcludedFoodsChange={setExcludedFoods}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div 
      className="w-full max-w-7xl mx-auto"
      role="region"
      aria-label="dietary preferences selection"
    >
      {/* Progress Indicator */}
      <div className="flex items-center justify-center mb-8">
        <div className="flex items-center space-x-2">
          {[1, 2, 3].map((step) => (
            <button
              key={step}
              onClick={() => setCurrentStep(step)}
              className={`w-3 h-3 rounded-full transition-all duration-200 hover:scale-110 cursor-pointer ${
                step === currentStep
                  ? 'bg-black'
                  : step < currentStep
                  ? 'bg-yellow-200 hover:bg-yellow-300'
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
              aria-label={`Go to step ${step}`}
              aria-current={step === currentStep ? 'step' : undefined}
            />
          ))}
        </div>
        <span className="ml-4 text-sm text-gray-600">
          Step {currentStep} of 3
        </span>
      </div>

      <h2 className="text-2xl font-bold text-center mb-16">
        {currentStep === 1 && 'Choose Your Dietary Preferences'}
        {currentStep === 2 && 'Select Regional Preferences'}
        {currentStep === 3 && 'Exclude Specific Foods'}
      </h2>

      {/* Step Content */}
      {renderStepContent()}

      {/* Navigation Buttons */}
      <div className="flex justify-center gap-4 mt-8">
        {currentStep > 1 && (
          <button
            onClick={handleBack}
            className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg font-semibold transition-colors duration-200"
          >
            Back
          </button>
        )}
        {currentStep < 3 ? (
          <button
            onClick={handleNext}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors duration-200"
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleGenerateRecipes}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors duration-200"
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : recipes.length > 0 ? 'Generate New Recipes' : 'Generate Recipes'}
          </button>
        )}
      </div>

      {/* Status Messages */}
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

      {/* Recipe Results */}
      {recipes.length > 0 && (
        <>
          <p className="text-center mt-4 text-gray-600">
            Click &ldquo;Generate New Recipes&rdquo; anytime to see different recipes!
          </p>
          <div className="mt-8">
            <MealCarousel recipes={recipes} />
          </div>
        </>
      )}
    </div>
  );
};

export default DietaryPreferenceSelector;