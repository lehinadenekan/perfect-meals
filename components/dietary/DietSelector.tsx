import React from 'react';
import { DietType, DIET_TYPES } from '@/types/diet'; // Import diet types and descriptions
// Optional: Import an icon if you want to display one, e.g., CheckIcon
// import { CheckIcon } from '@heroicons/react/24/solid';

// Define expected props based on how it's used in DietaryPreferenceSelector
interface DietSelectorProps {
  selectedDiets: string[]; // Expecting an array of DietType strings
  onDietToggle: (dietType: DietType) => void; // Function to call on toggle
}

const DietSelector: React.FC<DietSelectorProps> = ({ selectedDiets, onDietToggle }) => {
  // Get the list of diet keys from DIET_TYPES
  const dietKeys = Object.keys(DIET_TYPES) as DietType[];

  return (
    <div className="w-full mb-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {dietKeys.map((dietKey) => {
          const dietInfo = DIET_TYPES[dietKey];
          const isSelected = selectedDiets.includes(dietKey);

          return (
            <button
              key={dietKey}
              type="button" // Explicitly set type to prevent form submission issues if nested
              onClick={() => onDietToggle(dietKey)}
              title={dietInfo.description} // Add description as tooltip
              className={`relative flex flex-col items-center justify-center p-4 rounded-xl shadow-md cursor-pointer transition-all duration-300 transform hover:scale-105 border-2 bg-white ${
                isSelected
                  ? 'border-yellow-400 text-yellow-500 shadow-lg' // Selected style
                  : 'border-transparent hover:border-yellow-200 text-gray-600 hover:shadow-lg' // Default style
              }`}
            >
              {/* Optional: Add icon here if desired */}
              {/* {isSelected && <CheckIcon className="absolute top-2 right-2 h-5 w-5 text-yellow-500" />} */}
              <span className="font-medium text-center">{dietInfo.title}</span>
              {/* Optional: Display description below title */}
              {/* <span className="text-xs text-gray-500 mt-1 text-center">{dietInfo.description}</span> */}
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