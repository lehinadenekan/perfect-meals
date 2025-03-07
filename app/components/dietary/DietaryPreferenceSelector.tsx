import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Card from '../shared/Card';
import ExclusionModal from './ExclusionModal';

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
  const [selectedDiet, setSelectedDiet] = useState<DietType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [excludedFoods, setExcludedFoods] = useState<string[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  // Load user preferences when session is available
  useEffect(() => {
    const loadUserPreferences = async () => {
      if (session?.user?.email) {
        try {
          const response = await fetch('/api/user/preferences');
          const data = await response.json();
          if (data.success) {
            setSelectedDiet(data.preferences.dietType || null);
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
      setSelectedDiet(null);
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
            dietType: selectedDiet,
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
  }, [selectedDiet, excludedFoods, session, status, isSaving]);

  const handleClearPreferences = async () => {
    if (!session?.user?.email) return;

    try {
      await fetch('/api/user/preferences', {
        method: 'DELETE',
      });
      setSelectedDiet(null);
      setExcludedFoods([]);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error clearing preferences:', error);
    }
  };

  const handleGenerateMeals = () => {
    // TODO: Implement meal generation logic using selectedDiet and excludedFoods
    console.log('Generating meals with:', { selectedDiet, excludedFoods });
  };

  return (
    <div className="w-full max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-16">Choose Your Dietary Preference</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Top Row */}
        {TOP_ROW_DIETS.map((dietType) => (
          <Card
            key={dietType}
            title={DIET_TYPES[dietType].title}
            description={DIET_TYPES[dietType].description}
            isSelected={selectedDiet === dietType}
            onClick={() => setSelectedDiet(dietType)}
            tooltipPosition="top"
          />
        ))}
        {/* Bottom Row */}
        {BOTTOM_ROW_DIETS.map((dietType) => (
          <Card
            key={dietType}
            title={DIET_TYPES[dietType].title}
            description={DIET_TYPES[dietType].description}
            isSelected={selectedDiet === dietType}
            onClick={() => setSelectedDiet(dietType)}
            tooltipPosition="bottom"
          />
        ))}
      </div>
      
      {/* Action Buttons */}
      <div className="flex justify-center space-x-6 mt-8">
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
    </div>
  );
};

export default DietaryPreferenceSelector; 