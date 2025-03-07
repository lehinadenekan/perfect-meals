import React, { useState } from 'react';
import Card from '../shared/Card';

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
  const [selectedDiet, setSelectedDiet] = useState<DietType | null>(null);

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
    </div>
  );
};

export default DietaryPreferenceSelector; 