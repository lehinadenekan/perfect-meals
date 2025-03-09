import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Card from '../shared/Card';
import ExclusionModal from './ExclusionModal';
import MealCarousel from '../recipe/MealCarousel';
import { Recipe } from '@/types/recipe';

type DietType = 'alkaline' | 'gluten-free' | 'halal' | 'keto' | 'kosher' | 'paleo' | 'vegan' | 'vegetarian';

const DIET_TYPES: Record<DietType, { title: string; description: string }> = {
  alkaline: {
    title: 'Alkaline',
    description: 'Focus on foods that promote a balanced pH level in the body.',
  },
  'gluten-free': {
    title: 'Gluten-Free',
    description: 'Excludes wheat, barley, rye, and their derivatives.',
  },
  halal: {
    title: 'Halal',
    description: 'Adheres to Islamic dietary laws and preparation methods.',
  },
  keto: {
    title: 'Keto',
    description: 'High-fat, low-carb diet that induces ketosis for weight loss.',
  },
  kosher: {
    title: 'Kosher',
    description: 'Follows Jewish dietary laws and food preparation guidelines.',
  },
  paleo: {
    title: 'Paleo',
    description: 'Based on foods presumed eaten during the Paleolithic era.',
  },
  vegan: {
    title: 'Vegan',
    description: 'Excludes all animal products and byproducts.',
  },
  vegetarian: {
    title: 'Vegetarian',
    description: 'Plant-based diet that may include dairy and eggs.',
  },
};

// Define the order of diet types for top and bottom rows
const TOP_ROW_DIETS: DietType[] = ['alkaline', 'gluten-free', 'halal', 'keto'];
const BOTTOM_ROW_DIETS: DietType[] = ['kosher', 'paleo', 'vegan', 'vegetarian'];

const DietaryPreferenceSelector = () => {
  const { data: session, status } = useSession();
  const [selectedDiets, setSelectedDiets] = useState<DietType[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [excludedFoods, setExcludedFoods] = useState<string[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoadingRecipes, setIsLoadingRecipes] = useState(false);
  const [showCarousel, setShowCarousel] = useState(false);
  const [debugMode, setDebugMode] = useState(false);
  const [diagnosticResults, setDiagnosticResults] = useState<any>(null);

  // Load user preferences when session is available
  useEffect(() => {
    const loadUserPreferences = async () => {
      if (session?.user?.email) {
        try {
          const response = await fetch('/api/user/preferences');
          const data = await response.json();
          if (data.success) {
            // Handle array of diet types
            setSelectedDiets(data.preferences.dietTypes || []);
            setExcludedFoods(data.preferences.excludedFoods || []);
          }
        } catch (error) {
          console.error('Error loading preferences:', error);
        }
      }
    };

    if (status === 'authenticated') {
      loadUserPreferences();
    } else {
      // Reset preferences for non-authenticated users
      setSelectedDiets([]);
      setExcludedFoods([]);
    }
  }, [session, status]);

  // Save preferences when they change (for authenticated users only)
  useEffect(() => {
    const savePreferences = async () => {
      if (!session?.user?.email || isSaving) return;

      setIsSaving(true);
      try {
        await fetch('/api/user/preferences', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            dietTypes: selectedDiets,
            excludedFoods,
          }),
        });
      } catch (error) {
        console.error('Error saving preferences:', error);
      } finally {
        setIsSaving(false);
      }
    };

    if (status === 'authenticated') {
      savePreferences();
    }
  }, [selectedDiets, excludedFoods, session, status, isSaving]);

  const handleDietToggle = (dietType: DietType) => {
    setSelectedDiets(prev => {
      const isSelected = prev.includes(dietType);
      if (isSelected) {
        return prev.filter(d => d !== dietType);
      } else {
        return [...prev, dietType];
      }
    });
    // Reset carousel when preferences change
    setShowCarousel(false);
    setRecipes([]);
  };

  const handleClearPreferences = async () => {
    if (!session?.user?.email) return;

    try {
      await fetch('/api/user/preferences', {
        method: 'DELETE',
      });
      setSelectedDiets([]);
      setExcludedFoods([]);
      setIsModalOpen(false);
      // Reset carousel
      setShowCarousel(false);
      setRecipes([]);
    } catch (error) {
      console.error('Error clearing preferences:', error);
    }
  };

  const handleGenerateMeals = async () => {
    setIsLoadingRecipes(true);
    setShowCarousel(true);

    try {
      console.log('Generating meals with direct API access');
      
      // If no diet types are selected, use a broader approach
      const effectiveDietTypes = selectedDiets.length > 0 ? selectedDiets : [];
      
      // Determine the endpoint based on debug mode
      const endpoint = debugMode ? '/api/debug/recipe-generation' : '/api/recipes/generate';
      
      // Call the generate endpoint with forceRefresh to get recipes directly from API
      const generateResponse = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          forceRefresh: true,
          includeDietTypes: effectiveDietTypes,
          includeExcludedFoods: excludedFoods,
          allowPartialMatch: true
        }),
      });

      const generateResult = await generateResponse.json();
      console.log('Generate direct response:', generateResult);

      if (!generateResponse.ok) {
        throw new Error(`Failed to generate new recipes: ${generateResponse.status}`);
      }

      if (debugMode) {
        setDiagnosticResults(generateResult);
        console.log('Diagnostic Results:', generateResult);
        setIsLoadingRecipes(false);
        return;
      }

      // If recipes are directly returned from the API endpoint
      if (generateResult.recipes && generateResult.recipes.length > 0) {
        console.log(`Setting ${generateResult.recipes.length} recipes from direct API response`);
        
        // Transform Spoonacular recipes to our UI format if needed
        const transformedRecipes = generateResult.recipes.map((recipe: any) => ({
          id: recipe.id,
          title: recipe.title,
          description: recipe.description,
          cookingTime: recipe.cookingTime,
          servings: recipe.servings,
          difficulty: recipe.difficulty,
          cuisineType: recipe.cuisineType,
          regionOfOrigin: recipe.regionOfOrigin,
          imageUrl: recipe.imageUrl,
          calories: recipe.calories,
          ingredients: recipe.ingredients || [],
          nutritionFacts: recipe.nutritionFacts || null
        }));
        
        setRecipes(transformedRecipes);
        setIsLoadingRecipes(false);
        return;
      }

      // Fallback to the old method if no recipes were returned directly
      console.log('No direct recipes returned, falling back to database query');
      
      // Short delay to allow backend processing
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Prepare query parameters
      const queryParams = new URLSearchParams();
      
      // Only add diet types if they're selected
      if (effectiveDietTypes.length > 0) {
        queryParams.set('dietTypes', effectiveDietTypes.join(','));
      }
      
      // Only add excluded foods if they're specified
      if (excludedFoods.length > 0) {
        queryParams.set('excludedFoods', excludedFoods.join(','));
      }
      
      // Add a flag to force including results even when there's no perfect match
      queryParams.set('includePartialMatches', 'true');
      
      // Add a timestamp to avoid caching
      queryParams.set('_', Date.now().toString());

      const response = await fetch(`/api/recipes?${queryParams}`);
      if (!response.ok) throw new Error('Failed to fetch recipes');

      const data = await response.json();
      console.log(`Fetched ${data.length} recipes`);
      
      if (data.length === 0) {
        // If still no results, try a fallback with no filters
        const fallbackResponse = await fetch(`/api/recipes?includePartialMatches=true&_=${Date.now()}`);
        if (fallbackResponse.ok) {
          const fallbackData = await fallbackResponse.json();
          setRecipes(fallbackData);
        } else {
          setRecipes([]);
        }
      } else {
        setRecipes(data);
      }
    } catch (error) {
      console.error('Error generating meals:', error);
      // Try a fallback request if the main one fails
      try {
        const fallbackResponse = await fetch(`/api/recipes?includePartialMatches=true&_=${Date.now()}`);
        if (fallbackResponse.ok) {
          const fallbackData = await fallbackResponse.json();
          setRecipes(fallbackData);
        } else {
          setRecipes([]);
        }
      } catch (fallbackError) {
        console.error('Fallback fetch also failed');
        setRecipes([]);
      }
    } finally {
      setIsLoadingRecipes(false);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-16">Choose Your Dietary Preferences</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {/* Top Row */}
        {TOP_ROW_DIETS.map((dietType) => (
          <Card
            key={dietType}
            title={DIET_TYPES[dietType].title}
            description={DIET_TYPES[dietType].description}
            isSelected={selectedDiets.includes(dietType)}
            onClick={() => handleDietToggle(dietType)}
            tooltipPosition="top"
          />
        ))}
        {/* Bottom Row */}
        {BOTTOM_ROW_DIETS.map((dietType) => (
          <Card
            key={dietType}
            title={DIET_TYPES[dietType].title}
            description={DIET_TYPES[dietType].description}
            isSelected={selectedDiets.includes(dietType)}
            onClick={() => handleDietToggle(dietType)}
            tooltipPosition="bottom"
          />
        ))}
      </div>
      
      {/* Action Buttons */}
      <div className="flex justify-center space-x-6 mb-16">
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg font-semibold transition-colors duration-200"
        >
          Customise
        </button>
        <button
          onClick={handleGenerateMeals}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors duration-200"
        >
          Generate Meals
        </button>
        {session?.user && (
          <button
            onClick={handleClearPreferences}
            className="px-6 py-3 bg-red-100 hover:bg-red-200 text-red-800 rounded-lg font-semibold transition-colors duration-200"
          >
            Clear Preferences
          </button>
        )}
      </div>

      {/* Selected Diets Summary */}
      {selectedDiets.length > 0 && (
        <div className="text-center text-gray-600">
          Selected Diets: {selectedDiets.map(diet => DIET_TYPES[diet].title).join(', ')}
        </div>
      )}

      {/* Excluded Foods Summary */}
      {excludedFoods.length > 0 && (
        <div className="mt-2 text-center text-gray-600">
          Excluded Foods: {excludedFoods.map(food => food.charAt(0).toUpperCase() + food.slice(1)).join(', ')}
        </div>
      )}

      {/* Meal Carousel */}
      {showCarousel && (
        <div className="mt-8">
          <MealCarousel recipes={recipes} isLoading={isLoadingRecipes} />
        </div>
      )}

      {/* Exclusion Modal */}
      <ExclusionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onExclusionsChange={setExcludedFoods}
        initialExclusions={excludedFoods}
      />

      {/* Login Prompt for Guests */}
      {!session?.user && (
        <p className="text-center text-gray-600 mt-4">
          Log in to save your preferences
        </p>
      )}

      <div className="flex items-center space-x-2 mb-4">
        <input
          type="checkbox"
          id="debugMode"
          checked={debugMode}
          onChange={(e) => setDebugMode(e.target.checked)}
          className="h-4 w-4 text-blue-600"
        />
        <label htmlFor="debugMode" className="text-sm text-gray-700">
          Debug Mode
        </label>
      </div>

      {debugMode && diagnosticResults && (
        <div className="mt-4 p-4 bg-gray-100 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Diagnostic Results</h3>
          <div className="space-y-2">
            <p>Duration: {diagnosticResults.duration_ms}ms</p>
            <p>Success: {diagnosticResults.success ? 'Yes' : 'No'}</p>
            {diagnosticResults.error && (
              <p className="text-red-600">Error: {diagnosticResults.error}</p>
            )}
            <div className="mt-4">
              <h4 className="font-medium mb-2">Logs:</h4>
              <pre className="bg-white p-2 rounded text-sm overflow-x-auto">
                {JSON.stringify(diagnosticResults.logs, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DietaryPreferenceSelector; 