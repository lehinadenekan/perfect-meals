import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';
// Removed Prisma DietType import as it doesn't exist in the schema
// Removed Heroicons imports
import DietSelector from './DietSelector'; // <<<--- !!! THIS ONE STILL NEEDS TO BE FOUND !!!
import RegionSelector from './GeographicFilter'; // <<<--- CORRECTED FILENAME
import { ExcludedFoodsInput } from './ExcludedFoodsInput'; // <<<--- USE NAMED IMPORT
import MealCarousel from '../recipe/MealCarousel'; // <<<--- CORRECTED PATH
import { Recipe } from '@/lib/types/recipe'; // <<<--- CORRECTED IMPORT PATH
import { useSession } from 'next-auth/react';

// Interface for props expected by the component
export interface DietaryPreferenceSelectorProps {
  selectedDiets: string[]; // <<<--- CHANGED DietType[] to string[]
  setSelectedDiets: Dispatch<SetStateAction<string[]>>; // <<<--- CHANGED DietType[] to string[]
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
  setCurrentStep,
}) => {
  const { data: session, status } = useSession();
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Effect to save preferences
  useEffect(() => {
    const savePreferences = async () => {
      if (status === 'authenticated' && session?.user?.id) {
        console.log('User authenticated, attempting to save preferences...');
        setIsSaving(true);
        setError(null);

        // Payload uses selectedDiets which is already string[]
        const payload = {
          userId: session.user.id,
          dietTypes: selectedDiets,
          regions: selectedRegions,
          excludedFoods: excludedFoods,
        };
        console.log('Saving preferences payload:', payload);


        try {
          const response = await fetch('/api/user/preferences', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          });

          if (!response.ok) {
            const errorData = await response.json();
            console.error('Failed to save preferences:', errorData);
            setError(errorData.error || 'Failed to save preferences.');
          } else {
             console.log('Preferences saved successfully');
          }

        } catch (err) {
          console.error('Error saving preferences:', err);
          setError('An unexpected error occurred while saving preferences.');
        } finally {
          setIsSaving(false);
        }
      } else {
        console.log('User not authenticated or session data unavailable. Skipping preference save.');
      }
    };

    // Debounce saving preferences
    const handler = setTimeout(() => {
      if (!isLoading) {
        savePreferences();
      }
    }, 1500);

    return () => {
      clearTimeout(handler);
    };
  }, [selectedDiets, selectedRegions, excludedFoods, status, session, isLoading]);

  // Function to fetch recipes based on current selections
  const handleGenerateRecipes = async () => {
    setIsLoading(true);
    setError(null);
    setRecipes([]);

    // Payload uses selectedDiets which is already string[]
    const payload = {
      dietTypes: selectedDiets,
      selectedRegions: selectedRegions,
      excludedFoods: excludedFoods,
    };

    console.log('Generating recipes with payload:', payload);

    try {
      const response = await fetch('/api/recipes/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        const errorMessage = data.message || data.error || 'Failed to generate recipes.';
        console.error('Error generating recipes:', errorMessage, `HTTP status: ${response.status}`);
        setError(errorMessage);
        setRecipes([]);
      } else {
         console.log('Recipes generated successfully:', data.recipes?.length || 0);
         setRecipes(data.recipes || []);
      }
    } catch (err) {
      console.error('Network or other error generating recipes:', err);
      setError('An unexpected error occurred while generating recipes.');
      setRecipes([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // const onRemoveRegion = (region: string) => {
  //   setSelectedRegions(prev => prev.filter(r => r !== region));
  // };

  // const onRemoveExcludedFood = (food: string) => {
  //   setExcludedFoods(prev => prev.filter(f => f !== food));
  // };


  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <DietSelector
            selectedPreferences={selectedDiets}
            onChange={setSelectedDiets}
          />
        );
      case 2:
        return (
          <RegionSelector
            selectedRegions={selectedRegions}
            onRegionsChange={setSelectedRegions}
          />
        );
      case 3:
        return (
          <ExcludedFoodsInput
            excludedFoods={excludedFoods}
            onExcludedFoodsChange={setExcludedFoods}
          />
        );
      default:
        return null;
    }
  };

  // No progressValue calculation needed

  return (
    <div
      className="w-full max-w-7xl mx-auto"
      role="region"
      aria-label="dietary preferences selection"
    >
      {/* Progress Bar section is completely removed */}

      {/* Adjusted margin here to provide spacing */}
      <div className="text-center mb-16 mt-8"> {/* Added mt-8 for spacing */}
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
       {error && !isLoading && ( // Display error messages only when not loading
        <p className="text-center mt-4 text-red-600">
          Error: {error}
        </p>
      )}


      {/* Recipe Results - Conditionally render based on loading/error state */}
      {!isLoading && !error && recipes.length > 0 && ( // Only show carousel if not loading, no error, and recipes exist
          <div className="mt-8">
            <MealCarousel title="Meals based on your preferences" recipes={recipes} />
          </div>
      )}
      {/* Display message if loading finished, step 3 reached, no error, but no recipes found */}
       {!isLoading && !error && recipes.length === 0 && currentStep === 3 && (
         <p className="text-center mt-8 text-gray-600"> {/* Added more top margin */}
           No recipes found matching your criteria. Try adjusting your preferences.
         </p>
       )}
    </div>
  );
};

export default DietaryPreferenceSelector;