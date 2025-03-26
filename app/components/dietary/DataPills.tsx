import React from 'react';
import { DietType, DIET_TYPES } from '@/types/diet';
import { X } from 'lucide-react';

interface DataPillsProps {
  selectedDiets: DietType[];
  selectedRegions: string[];
  excludedFoods: string[];
  onRemoveDiet?: (diet: DietType) => void;
  onRemoveRegion?: (region: string) => void;
  onRemoveExcludedFood?: (food: string) => void;
  showDiets?: boolean;
  showRegions?: boolean;
  showExcludedFoods?: boolean;
}

const DataPills: React.FC<DataPillsProps> = ({
  selectedDiets,
  selectedRegions,
  excludedFoods,
  onRemoveDiet,
  onRemoveRegion,
  onRemoveExcludedFood,
  showDiets = true,
  showRegions = true,
  showExcludedFoods = true,
}) => {
  if (!selectedDiets.length && !selectedRegions.length && !excludedFoods.length) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2 mt-4">
      {showDiets && selectedDiets.map((diet) => (
        <span
          key={diet}
          className="inline-flex items-center px-3 py-1 rounded-full bg-yellow-100 text-yellow-800"
        >
          {DIET_TYPES[diet].title}
          {onRemoveDiet && (
            <button
              onClick={() => onRemoveDiet(diet)}
              className="ml-2 hover:bg-yellow-200 rounded-full p-1"
            >
              <X size={14} className="text-yellow-800" />
              <span className="sr-only">Remove {DIET_TYPES[diet].title}</span>
            </button>
          )}
        </span>
      ))}
      
      {showRegions && selectedRegions.map((region) => (
        <span
          key={region}
          className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800"
        >
          {region}
          {onRemoveRegion && (
            <button
              onClick={() => onRemoveRegion(region)}
              className="ml-2 hover:bg-blue-200 rounded-full p-1"
            >
              <X size={14} className="text-blue-800" />
              <span className="sr-only">Remove {region}</span>
            </button>
          )}
        </span>
      ))}
      
      {showExcludedFoods && excludedFoods.map((food) => (
        <span
          key={food}
          className="inline-flex items-center px-3 py-1 rounded-full bg-red-100 text-red-800"
        >
          <span className="line-through">{food}</span>
          {onRemoveExcludedFood && (
            <button
              onClick={() => onRemoveExcludedFood(food)}
              className="ml-2 hover:bg-red-200 rounded-full p-1"
            >
              <X size={14} className="text-red-800" />
              <span className="sr-only">Remove {food}</span>
            </button>
          )}
        </span>
      ))}
    </div>
  );
};

export default DataPills; 