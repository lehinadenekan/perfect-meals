import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { useSession } from 'next-auth/react';
import * as Progress from '@radix-ui/react-progress';
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

interface DietaryPreferenceSelectorProps {
  selectedDiets: DietType[];
  setSelectedDiets: Dispatch<SetStateAction<DietType[]>>;
  excludedFoods: string[];
  setExcludedFoods: Dispatch<SetStateAction<string[]>>;
  selectedRegions: string[];
  setSelectedRegions: Dispatch<SetStateAction<string[]>>;
  recipes: Recipe[];
  setRecipes: Dispatch<SetStateAction<Recipe[]>>;
  currentStep: number;
  setCurrentStep: Dispatch<SetStateAction<number>>;
}

const DietaryPreferenceSelector: React.FC<DietaryPreferenceSelectorProps> = ({
  selectedDiets,
  setSelectedDiets,
  excludedFoods,
  setExcludedFoods,
  selectedRegions,
  setSelectedRegions,
  recipes,
  setRecipes,
  currentStep,
  setCurrentStep
}) => {
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { updatePreferences } = usePreferenceUpdates({
    dietTypes: [],
    excludedFoods: [],
    selectedRegions: [],
  });

  // Reset all selections when component mounts
  useEffect(() => {
    setSelectedDiets([]);
    setExcludedFoods([]);
    setSelectedRegions([]);
  }, []); // Empty dependency array means this runs once on mount

  useEffect(() => {
    // Only run on client
    if (typeof window !== 'undefined') {
      const storedPrefs = localStorage.getItem('dietaryPrefs');
      if (storedPrefs) {
        try { // Add try-catch for JSON.parse
          const parsedPrefs = JSON.parse(storedPrefs);
          setSelectedDiets(parsedPrefs.selectedDiets || []);
          setExcludedFoods(parsedPrefs.excludedFoods || []);
          setSelectedRegions(parsedPrefs.selectedRegions || []);
        } catch (error) {
          console.error("Failed to parse dietaryPrefs from localStorage", error);
          // Optionally clear the invalid item
          // localStorage.removeItem('dietaryPrefs');
        }
      }
    }
    // Added missing dependencies
  }, [setSelectedDiets, setExcludedFoods, setSelectedRegions]);

  // Existing handlers
  const handleDietToggle = async (dietType: DietType) => {
    setSelectedDiets((prev: DietType[]) => {
      const newDiets = prev.includes(dietType)
        ? prev.filter((d: DietType) => d !== dietType)
        : [...prev, dietType];

      if (session?.user) {
        setIsSaving(true);
        Promise.resolve(updatePreferences({
          dietTypes: newDiets,
          excludedFoods,
          selectedRegions,
        })).finally(() => setIsSaving(false));
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
    setCurrentStep((prev: number) => Math.min(prev + 1, 3));
  };

  const handleBack = () => {
    setCurrentStep((prev: number) => Math.max(prev - 1, 1));
  };

  const onRemoveRegion = (region: string) => {
    setSelectedRegions((prev: string[]) => prev.filter(r => r !== region));
  };

  const onRemoveExcludedFood = (food: string) => {
    setExcludedFoods((prev: string[]) => prev.filter((f: string) => f !== food));
  };

  // Render step content
  const renderStepContent = () => {
    const dataPills = (
      <DataPills
        selectedDiets={selectedDiets}
        selectedRegions={currentStep >= 2 ? selectedRegions : []}
        excludedFoods={currentStep === 3 ? excludedFoods : []}
        onRemoveDiet={handleDietToggle}
        onRemoveRegion={currentStep >= 2 ? onRemoveRegion : undefined}
        onRemoveExcludedFood={currentStep === 3 ? onRemoveExcludedFood : undefined}
        showRegions={currentStep >= 2}
        showExcludedFoods={currentStep === 3}
      />
    );

    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-8">
            {dataPills}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
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
                    className={`relative flex items-center justify-center p-4 rounded-xl shadow-md cursor-pointer transition-all duration-300 transform hover:scale-105 border-2 bg-white ${selectedDiets.includes(dietType)
                      ? 'border-yellow-400 text-yellow-500 shadow-lg'
                      : 'border-transparent hover:border-yellow-200 text-gray-600 hover:shadow-lg'
                      }`}
                  >
                    <div className="flex items-center justify-center">
                      {React.createElement(DIET_ICONS[dietType], {
                        className: `w-5 h-5 mr-3 ${selectedDiets.includes(dietType) ? 'text-yellow-500' : 'text-gray-600'
                          }`,
                        'aria-hidden': true
                      })}
                      <span className="font-medium">{DIET_TYPES[dietType].title}</span>
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
                    className={`relative flex items-center justify-center p-4 rounded-xl shadow-md cursor-pointer transition-all duration-300 transform hover:scale-105 border-2 bg-white ${selectedDiets.includes(dietType)
                      ? 'border-yellow-400 text-yellow-500 shadow-lg'
                      : 'border-transparent hover:border-yellow-200 text-gray-600 hover:shadow-lg'
                      }`}
                  >
                    <div className="flex items-center justify-center">
                      {React.createElement(DIET_ICONS[dietType], {
                        className: `w-5 h-5 mr-3 ${selectedDiets.includes(dietType) ? 'text-yellow-500' : 'text-gray-600'
                          }`,
                        'aria-hidden': true
                      })}
                      <span className="font-medium">{DIET_TYPES[dietType].title}</span>
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

  // Calculate progress percentage based on current step (out of 3 steps)
  const progressValue = currentStep === 1 ? 33 : currentStep === 2 ? 66 : 100;

  return (
    <div
      className="w-full max-w-7xl mx-auto"
      role="region"
      aria-label="dietary preferences selection"
    >
      {/* Progress Indicator - Replaced dots with Radix Progress */}
      <div className="mb-8 px-4 sm:px-0"> {/* Added padding for smaller screens */}
        <Progress.Root
          className="relative overflow-hidden bg-gray-200 rounded-full w-full h-[10px]" // Styling for the bar root
          style={{ transform: 'translateZ(0)' }} // Required for animation in some browsers
          value={progressValue}
        >
          <Progress.Indicator
            className="bg-white w-full h-full transition-transform duration-[660ms] ease-[cubic-bezier(0.65, 0, 0.35, 1)]" // Changed bg-yellow-400 to bg-white
            style={{ transform: `translateX(-${100 - progressValue}%)` }}
          />
        </Progress.Root>
      </div>

      <div className="text-center mb-16">
        <h2 className="text-2xl font-bold">
          {currentStep === 1 && 'Choose Your Dietary Preferences'}
          {currentStep === 2 && 'Select Regional Preferences'}
          {currentStep === 3 && 'Exclude Specific Foods'}
        </h2>
        <p className="text-gray-600 italic mt-2">(optional)</p>
      </div>

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
            className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors duration-200"
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
            <MealCarousel title="Meals based on your preferences" recipes={recipes} />
          </div>
        </>
      )}
    </div>
  );
};

export default DietaryPreferenceSelector;