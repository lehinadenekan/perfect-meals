'use client';

import { useState, useEffect, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import LoadingSpinner from '@/components/shared/LoadingSpinner';
// import { toast } from "sonner"; // Or your preferred notification library

// Define the structure of the preferences data
interface UserPreferences {
  dietTypes: string[];
  excludedFoods: string[];
  regions: string[];
  cookingStyles: string[];
  mealCategories: string[];
  dailyProteinGoal: number | null;
  dailyCarbGoal: number | null;
  dailyFatGoal: number | null;
  dailyCalorieGoal: number | null;
}

const initialPreferences: UserPreferences = {
  dietTypes: [],
  excludedFoods: [],
  regions: [],
  cookingStyles: [],
  mealCategories: [],
  dailyProteinGoal: null,
  dailyCarbGoal: null,
  dailyFatGoal: null,
  dailyCalorieGoal: null,
};

export function PreferencesForm() {
  const [preferences, setPreferences] = useState<UserPreferences>(initialPreferences);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch existing preferences
  const fetchPreferences = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/user/preferences');
      if (!response.ok) {
        throw new Error('Failed to fetch preferences');
      }
      const data = await response.json();
      setPreferences(data.preferences || initialPreferences);
    } catch (err) {
      const error = err as Error;
      console.error('Fetch Preferences Error:', error);
      setError(error.message || 'Could not load preferences.');
      // toast.error(error.message || "Could not load preferences.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPreferences();
  }, [fetchPreferences]);

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setPreferences(prev => ({
      ...prev,
      [name]: type === 'number' ? (value === '' ? null : Number(value)) : value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);
    try {
      const response = await fetch('/api/user/preferences', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(preferences),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to save preferences');
      }

      const savedData = await response.json();
      setPreferences(savedData.preferences);
      // toast.success("Preferences saved successfully!");

    } catch (err) {
      const error = err as Error;
      console.error('Save Preferences Error:', error);
      setError(error.message || 'Could not save preferences.');
      // toast.error(error.message || "Could not save preferences.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Preferences</CardTitle>
        <CardDescription>Manage your dietary needs and macro goals.</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          {error && (
             <p className="text-sm font-medium text-red-600 text-center">Error: {error}</p>
          )}
          {/* Placeholder sections for other preferences - Implement later */}
          {/* <div>Dietary Types...</div> */}
          {/* <div>Excluded Foods...</div> */}
          {/* <div>Regions...</div> */}
          {/* <div>Cooking Styles...</div> */}
          {/* <div>Meal Categories...</div> */}

          {/* Macronutrient Goals Section */}
          <div className="space-y-4 rounded-md border p-4">
             <h3 className="font-semibold leading-none tracking-tight mb-2">Daily Macronutrient Goals</h3>
             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-1">
                    <Label htmlFor="dailyCalorieGoal">Calories (kcal)</Label>
                    <Input 
                        id="dailyCalorieGoal"
                        name="dailyCalorieGoal"
                        type="number" 
                        placeholder="e.g., 2000"
                        value={preferences.dailyCalorieGoal ?? ''}
                        onChange={handleInputChange}
                        min="0"
                    />
                </div>
                <div className="space-y-1">
                    <Label htmlFor="dailyProteinGoal">Protein (g)</Label>
                    <Input 
                        id="dailyProteinGoal"
                        name="dailyProteinGoal"
                        type="number" 
                        placeholder="e.g., 150"
                        value={preferences.dailyProteinGoal ?? ''}
                        onChange={handleInputChange}
                        min="0"
                    />
                </div>
                <div className="space-y-1">
                    <Label htmlFor="dailyCarbGoal">Carbs (g)</Label>
                    <Input 
                        id="dailyCarbGoal"
                        name="dailyCarbGoal"
                        type="number" 
                        placeholder="e.g., 250"
                        value={preferences.dailyCarbGoal ?? ''}
                        onChange={handleInputChange}
                        min="0"
                    />
                </div>
                <div className="space-y-1">
                    <Label htmlFor="dailyFatGoal">Fat (g)</Label>
                    <Input 
                        id="dailyFatGoal"
                        name="dailyFatGoal"
                        type="number" 
                        placeholder="e.g., 70"
                        value={preferences.dailyFatGoal ?? ''}
                        onChange={handleInputChange}
                        min="0"
                    />
                </div>
             </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={isSaving}>
            {isSaving ? 'Saving...' : 'Save Preferences'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
} 