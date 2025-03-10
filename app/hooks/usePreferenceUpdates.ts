import { useState, useCallback, useEffect } from 'react';
import { useDebounce } from './useDebounce';

interface PreferenceData {
  dietTypes: string[];
  excludedFoods: string[];
  selectedRegions: string[];
  searchInput: string;
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
        JSON.stringify(initialPreferences)
      ) {
        return;
      }

      setIsUpdating(true);
      setError(null);

      try {
        const response = await fetch('/api/user/preferences', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(debouncedPreferences),
        });

        if (!response.ok) {
          throw new Error('Failed to save preferences');
        }

        // Update initial preferences after successful save
        initialPreferences = { ...debouncedPreferences };
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to save preferences');
        console.error('Error saving preferences:', err);
      } finally {
        setIsUpdating(false);
      }
    };

    savePreferences();
  }, [debouncedPreferences]);

  return {
    updatePreferences,
    isUpdating,
    error
  };
} 