import { useState, useCallback, useEffect, useRef } from 'react';
import { useDebounce } from './useDebounce';

interface PreferenceData {
  cookingTime?: string;
  servingSize?: number;
  mealPrep?: boolean;
  dietTypes?: string[];
  excludedFoods?: string[];
  selectedRegions?: string[];
  searchInput?: string;
}

interface UsePreferenceUpdatesResult {
  updatePreferences: (newPreferences: Partial<PreferenceData>) => void;
  isUpdating: boolean;
  error: string | null;
}

export function usePreferenceUpdates(
  initialPreferences: PreferenceData,
  delay: number = 500
): UsePreferenceUpdatesResult {
  const [preferences, setPreferences] = useState<PreferenceData>(initialPreferences);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const initialPreferencesRef = useRef(initialPreferences);

  // Debounce the preferences
  const debouncedPreferences = useDebounce(preferences, delay);

  // Update preferences
  const updatePreferences = useCallback((newPreferences: Partial<PreferenceData>) => {
    setPreferences(prev => ({
      ...prev,
      ...newPreferences
    }));
    setError(null);
  }, []);

  // Effect to save preferences when they change
  useEffect(() => {
    const savePreferences = async () => {
      // Don't save if nothing has changed
      if (
        JSON.stringify(debouncedPreferences) === 
        JSON.stringify(initialPreferencesRef.current)
      ) {
        return;
      }

      setIsUpdating(true);
      setError(null);

      try {
        const response = await fetch('/api/preferences', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            cookingTime: debouncedPreferences.cookingTime || 'MEDIUM',
            servingSize: debouncedPreferences.servingSize || 2,
            mealPrep: debouncedPreferences.mealPrep || false,
            dietTypes: debouncedPreferences.dietTypes || [],
            excludedFoods: debouncedPreferences.excludedFoods || [],
            selectedRegions: debouncedPreferences.selectedRegions || [],
            searchInput: debouncedPreferences.searchInput || ''
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to save preferences');
        }

        const data = await response.json();
        if (!data) {
          throw new Error('No data received from server');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to save preferences');
        console.error('Error saving preferences:', err);
      } finally {
        setIsUpdating(false);
      }
    };

    savePreferences();
  }, [debouncedPreferences]); // Remove initialPreferences from deps array

  return {
    updatePreferences,
    isUpdating,
    error
  };
} 