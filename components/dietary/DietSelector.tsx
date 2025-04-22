import React from 'react';
import { DietType, DIET_TYPES } from '@/types/diet'; // Import diet types and descriptions
// Optional: Import an icon if you want to display one, e.g., CheckIcon
// import { CheckIcon } from '@heroicons/react/24/solid';
// --- Import Shadcn Checkbox --- 
// import { Checkbox } from "@/components/ui/checkbox"; 

// Define expected props based on how it's used in DietaryPreferenceSelector
interface DietSelectorProps {
  selectedPreferences: string[]; // Renamed from selectedDiets
  onChange: (prefs: string[]) => void; // Renamed from onDietToggle, updated signature
}

const DietSelector: React.FC<DietSelectorProps> = ({ selectedPreferences, onChange }) => {
  // Get the list of diet keys from DIET_TYPES
  const dietKeys = Object.keys(DIET_TYPES) as DietType[];

  // --- Sort keys alphabetically based on their title --- 
  const sortedDietKeys = dietKeys.sort((a, b) => {
    const titleA = DIET_TYPES[a].title.toUpperCase(); // ignore case
    const titleB = DIET_TYPES[b].title.toUpperCase(); // ignore case
    if (titleA < titleB) {
      return -1;
    }
    if (titleA > titleB) {
      return 1;
    }
    return 0; // names must be equal
  });
  
  const handleToggle = (dietKey: DietType) => {
    const newPreferences = selectedPreferences.includes(dietKey)
      ? selectedPreferences.filter(d => d !== dietKey)
      : [...selectedPreferences, dietKey];
    onChange(newPreferences); // Call onChange with the new array
  };

  return (
    <div className="w-full mb-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {/* --- Map over sorted keys --- */}
        {sortedDietKeys.map((dietKey) => {
          const dietInfo = DIET_TYPES[dietKey];
          const isSelected = selectedPreferences.includes(dietKey); // Use selectedPreferences

          return (
            // --- Change back to button --- 
            <button
              key={dietKey}
              type="button"
              onClick={() => handleToggle(dietKey)}
              title={dietInfo.description}
              // --- Adjust className for selected state without checkbox --- 
              className={`flex flex-col items-center justify-center p-4 rounded-xl shadow-md cursor-pointer transition-all duration-300 border-2 transform hover:scale-105 ${
                isSelected
                  ? 'border-black bg-gray-100 text-black font-semibold' // Example: Black border, slight gray bg, black bold text
                  : 'border-transparent bg-white text-gray-700 hover:border-gray-300 hover:shadow-lg' 
              }`}
            >
               {/* --- Remove Checkbox, restore text span --- */}
              <span className="font-medium text-center">
                  {dietInfo.title}
              </span>
            </button>
          );
        })}
      </div>

      <p className="mt-3 text-sm text-gray-600">
        Select dietary preferences to tailor recipe suggestions.
      </p>
    </div>
  );
};

export default DietSelector; 