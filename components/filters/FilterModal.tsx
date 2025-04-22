'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button'; // Assuming path is correct
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';
// --- Import Shadcn Dialog components --- 
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Import the filter components (adjust paths as needed)
import DietSelector from '@/components/dietary/DietSelector';
import GeographicFilters from '@/components/filters/GeographicFilters';
import { ExcludedFoodsInput } from '@/components/dietary/ExcludedFoodsInput';
import CookingStyleSelector from '@/components/filters/CookingStyleSelector';
import MealCategorySelector from '@/components/filters/MealCategorySelector';

// --- Define UserPreferenceData type (matching HomePageClient) --- 
interface UserPreferenceData {
  dietTypes: string[];
  regions: string[];
  excludedFoods: string[];
  cookingStyles: string[];
  mealCategories: string[];
  // Add other fields if they exist and are needed
}

// Define the shape of the filters object passed up
export interface AppliedFilters {
  diets: string[];
  regions: string[];
  excludedFoods: string[];
  cookingStyles: string[];
  mealCategories: string[];
  // Add other filter types as needed
}

// Update props type to include initialFilters
export interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: AppliedFilters) => void; 
  // --- Add initialFilters prop --- 
  initialFilters?: UserPreferenceData | null; // Make optional and allow null
}

const FilterModal: React.FC<FilterModalProps> = ({
  isOpen,
  onClose,
  onApplyFilters,
  initialFilters = null, // Default initial filters to null
}) => {
  // --- Get session status ---
  const { data: _session, status } = useSession(); // Prefix session with _
  const isAuthenticated = status === 'authenticated';

  // --- State for save button loading --- 
  const [isSaving, setIsSaving] = useState(false);

  // State for temporary filter selections within the modal
  const [selectedDiets, setSelectedDiets] = useState<string[]>([]); // Use initialFilters.diets || [] later
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]); // Use initialFilters.regions || [] later
  const [excludedFoods, setExcludedFoods] = useState<string[]>([]); // Use initialFilters.excludedFoods || [] later
  const [selectedCookingStyles, setSelectedCookingStyles] = useState<string[]>([]);
  const [selectedMealCategories, setSelectedMealCategories] = useState<string[]>([]);

  // Effect to load initialFilters when modal opens
  useEffect(() => {
    if (isOpen && initialFilters) {
      // --- Load preferences into state, mapping field names --- 
      setSelectedDiets(initialFilters.dietTypes || []);
      setSelectedRegions(initialFilters.regions || []);
      setExcludedFoods(initialFilters.excludedFoods || []);
      setSelectedCookingStyles(initialFilters.cookingStyles || []);
      setSelectedMealCategories(initialFilters.mealCategories || []);
    } else if (isOpen && !initialFilters) {
        // Optional: If modal opens but prefs haven't loaded or don't exist, reset?
        // Or just leave state as is (currently empty arrays by default)
        // setSelectedDiets([]);
        // setSelectedRegions([]);
        // setExcludedFoods([]);
        // setSelectedCookingStyles([]);
        // setSelectedMealCategories([]);
    }
    // We don't reset when closing (else = !isOpen) as user might reopen quickly
  }, [isOpen, initialFilters]); // Rerun when modal opens or initialFilters change

  // Prevent background scroll when modal is open (Moved hook before conditional return)
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    // Cleanup function to restore scroll on unmount
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen) return null; // Conditional return is now after the hook

  const handleApply = () => {
    const filters: AppliedFilters = {
      diets: selectedDiets,
      regions: selectedRegions,
      excludedFoods: excludedFoods,
      cookingStyles: selectedCookingStyles,
      mealCategories: selectedMealCategories,
    };
    onApplyFilters(filters);
    onClose(); // Close the modal after applying
  };

  // --- Handler for saving preferences --- 
  const handleSavePreferences = async () => {
    if (!isAuthenticated) {
      toast.error('Please log in to save preferences.');
      // Optionally, trigger a login modal/redirect here
      return;
    }

    setIsSaving(true);
    const loadingToastId = toast.loading('Saving preferences...');

    // --- Use correct field names matching UserPreference schema --- 
    const preferencesToSave = {
      dietTypes: selectedDiets,      // Field name in UserPreference
      regions: selectedRegions,
      excludedFoods: excludedFoods,
      cookingStyles: selectedCookingStyles,
      mealCategories: selectedMealCategories,
    };

    try {
      const response = await fetch('/api/user/preferences', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(preferencesToSave),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save preferences.');
      }

      toast.success('Preferences saved successfully!', { id: loadingToastId });

    } catch (error) {
      console.error("Error saving preferences:", error);
      toast.error(
        `Error: ${error instanceof Error ? error.message : 'Could not save preferences.'}`, 
        { id: loadingToastId }
      );
    } finally {
      setIsSaving(false);
    }
  };

  // --- Handler to reset filters --- 
  const handleReset = () => {
    setSelectedDiets([]);
    setSelectedRegions([]);
    setExcludedFoods([]);
    setSelectedCookingStyles([]);
    setSelectedMealCategories([]);
    toast('Filters reset'); // Optional feedback
  };

  return (
    // --- Use Shadcn Dialog --- 
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Filters</DialogTitle>
          <DialogDescription>
            Refine your recipe search based on your preferences.
          </DialogDescription>
        </DialogHeader>
        
        {/* --- Scrollable Filter sections --- */}
        {/* Added overflow-y-auto here for the content area */}
        <div className="flex-grow space-y-6 overflow-y-auto pr-6 -mr-6 py-4"> 
            {/* --- Adjusted padding/margin for sections within dialog --- */}
            {/* Dietary Preferences Section */}
            <div className="space-y-3">
                <h3 className="text-md font-medium text-gray-800">Dietary Preferences</h3>
                <DietSelector 
                    selectedPreferences={selectedDiets} 
                    onChange={setSelectedDiets} 
                />
            </div>

            {/* Regional Preferences Section */}
            <div className="space-y-3">
                <h3 className="text-md font-medium text-gray-800">Regional Cuisine</h3>
                <GeographicFilters 
                    selectedRegions={selectedRegions} 
                    onRegionChange={setSelectedRegions} 
                />
            </div>

            {/* Food Exclusions Section */}
            <div className="space-y-3">
                <h3 className="text-md font-medium text-gray-800">Exclude Foods</h3>
                <ExcludedFoodsInput 
                    excludedFoods={excludedFoods} 
                    onExcludedFoodsChange={setExcludedFoods} 
                />
            </div>

            {/* Cooking Style Section */}
            <div className="space-y-3">
                <h3 className="text-md font-medium text-gray-800">Cooking Style</h3>
                <CookingStyleSelector
                    selectedStyles={selectedCookingStyles}
                    onChange={setSelectedCookingStyles}
                />
            </div>

            {/* Meal Category Section */}
            <div className="space-y-3">
                <h3 className="text-md font-medium text-gray-800">Meal Category</h3>
                <MealCategorySelector
                    selectedCategories={selectedMealCategories}
                    onChange={setSelectedMealCategories}
                />
            </div>
        </div>

        {/* --- Dialog Footer for Actions --- */}
        <DialogFooter className="pt-4 border-t mt-auto">
            {/* Left side: Reset & Save */}
            <div className="flex items-center gap-2 mr-auto"> 
                <Button variant="ghost" onClick={handleReset}>Reset</Button>
                 {isAuthenticated && (
                    <Button 
                        variant="secondary" 
                        onClick={handleSavePreferences} 
                        disabled={isSaving}
                    >
                        {isSaving ? 'Saving...' : 'Save Preferences'}
                    </Button>
                 )}
            </div>
            {/* Right side: Cancel & Apply */}
            <div className="flex items-center gap-2">
                <Button variant="outline" onClick={onClose}>Cancel</Button>
                <Button onClick={handleApply}>Apply Filters</Button>
            </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FilterModal;

// Add simple keyframe animation for modal fade-in (requires global CSS or Tailwind config update)
/*
@keyframes modal-fade-in {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}
.animate-modal-fade-in {
  animation: modal-fade-in 0.3s ease-out forwards;
}
*/ 