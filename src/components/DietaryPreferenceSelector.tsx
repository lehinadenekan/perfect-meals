import React, { useState, useEffect } from 'react';
import { DietaryPreference, IngredientpHData } from '../types';
import { getFilteredIngredientsByPreferences, getAdvancedFilteredIngredients } from '../utils/preference-integration';

interface DietaryPreferenceSelectorProps {
  onGenerateMeals: (filteredIngredients: IngredientpHData[]) => void;
}

const DietaryPreferenceSelector: React.FC<DietaryPreferenceSelectorProps> = ({ onGenerateMeals }) => {
  // State for selected dietary preferences
  const [selectedPreferences, setSelectedPreferences] = useState<DietaryPreference[]>([]);
  
  // All available dietary preferences
  const availablePreferences: DietaryPreference[] = [
    'Alkaline', 
    'Gluten-Free', 
    'Fermented', 
    'Low-FODMAP',
    'Pescatarian',
    'Mediterranean',
    'Vegan',
    'Vegetarian'
  ];
  
  // Handle preference selection/deselection
  const togglePreference = (preference: DietaryPreference) => {
    if (selectedPreferences.includes(preference)) {
      setSelectedPreferences(selectedPreferences.filter(p => p !== preference));
    } else {
      setSelectedPreferences([...selectedPreferences, preference]);
    }
  };
  
  // Generate meals based on selected preferences
  const handleGenerateMeals = () => {
    // Use the advanced filtering to get ingredients based on all selected preferences
    const filteredIngredients = getAdvancedFilteredIngredients(selectedPreferences);
    
    // Pass filtered ingredients to parent component for meal generation
    onGenerateMeals(filteredIngredients);
  };
  
  // For customization options - you can expand this as needed
  const handleCustomize = () => {
    // This could open a modal with more detailed preference options
    console.log('Customize clicked');
  };
  
  return (
    <div className="dietary-preferences-container">
      <h2>Choose Your Dietary Preferences</h2>
      
      {/* Preferences Grid */}
      <div className="preferences-grid">
        {availablePreferences.map(preference => (
          <div 
            key={preference}
            className={`preference-item ${selectedPreferences.includes(preference) ? 'selected' : ''}`}
            onClick={() => togglePreference(preference)}
          >
            {selectedPreferences.includes(preference) && <span className="checkmark">✓</span>}
            {preference}
          </div>
        ))}
      </div>
      
      {/* Custom food input */}
      <div className="custom-food-input">
        <input 
          type="text" 
          placeholder="Enter specific foods and ingredients"
        />
      </div>
      
      {/* Cuisine Selection - You can expand this as needed */}
      <div className="cuisine-selection">
        <h3>Select Cuisine Regions</h3>
        <div className="cuisine-options">
          <label><input type="checkbox" /> Africa</label>
          <label><input type="checkbox" /> Americas</label>
          <label><input type="checkbox" /> Asia</label>
          <label><input type="checkbox" /> Europe</label>
          <label><input type="checkbox" /> Oceania</label>
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="action-buttons">
        <button className="customize-button" onClick={handleCustomize}>
          Customise
        </button>
        <button className="generate-button" onClick={handleGenerateMeals}>
          Generate Meals
        </button>
      </div>
      
      {/* Selected Diets Display */}
      {selectedPreferences.length > 0 && (
        <div className="selected-diets">
          Selected Diets: {selectedPreferences.join(', ')}
        </div>
      )}
    </div>
  );
};

export default DietaryPreferenceSelector; 