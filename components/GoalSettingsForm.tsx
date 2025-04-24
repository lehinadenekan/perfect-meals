'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { Input } from '@/components/ui/input'; // Assuming Shadcn UI Input
import { Label } from '@/components/ui/label';   // Assuming Shadcn UI Label
import { Button } from '@/components/ui/button'; // Assuming Shadcn UI Button
import { toast } from 'sonner'; // Assuming Sonner for toasts

interface UserPreferences {
  dailyCalorieGoal: number | null;
  dailyProteinGoal: number | null;
  dailyCarbGoal: number | null;
  dailyFatGoal: number | null;
  // Add other preference fields if needed
}

const GoalSettingsForm: React.FC = () => {
  const { status } = useSession();
  const [preferences, setPreferences] = useState<UserPreferences | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const fetchPreferences = useCallback(async () => {
    if (status === 'authenticated') {
      setIsLoading(true);
      try {
        const response = await fetch('/api/user/preferences');
        if (!response.ok) {
          throw new Error('Failed to fetch preferences');
        }
        const data = await response.json();
        setPreferences(data.preferences || {
          dailyCalorieGoal: null,
          dailyProteinGoal: null,
          dailyCarbGoal: null,
          dailyFatGoal: null,
        });
      } catch (error) {
        console.error(error);
        toast.error('Could not load your preferences.');
        // Set default empty state on error
        setPreferences({
          dailyCalorieGoal: null,
          dailyProteinGoal: null,
          dailyCarbGoal: null,
          dailyFatGoal: null,
        });
      } finally {
        setIsLoading(false);
      }
    }
  }, [status]);

  useEffect(() => {
    fetchPreferences();
  }, [fetchPreferences]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPreferences(prev => {
      if (!prev) return null;
      // Allow empty string for temporary input state, convert to null or number on save
      const numValue: number | null = value === '' ? null : parseInt(value, 10);
      return {
        ...prev,
        [name]: isNaN(numValue as number) ? null : numValue,
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!preferences || status !== 'authenticated') return;

    setIsSaving(true);
    try {
      // Prepare data, ensuring goals are numbers or null
      const dataToSend = {
        dailyCalorieGoal: preferences.dailyCalorieGoal ?? null,
        dailyProteinGoal: preferences.dailyProteinGoal ?? null,
        dailyCarbGoal: preferences.dailyCarbGoal ?? null,
        dailyFatGoal: preferences.dailyFatGoal ?? null,
      };

      const response = await fetch('/api/user/preferences', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save preferences');
      }

      const updatedPrefs = await response.json();
      setPreferences({
          dailyCalorieGoal: updatedPrefs.dailyCalorieGoal,
          dailyProteinGoal: updatedPrefs.dailyProteinGoal,
          dailyCarbGoal: updatedPrefs.dailyCarbGoal,
          dailyFatGoal: updatedPrefs.dailyFatGoal,
      });
      toast.success('Preferences saved successfully!');
    } catch (error: unknown) {
      console.error(error);
      let errorMessage = 'Could not save preferences.';
      if (error instanceof Error) {
        errorMessage = error.message || errorMessage;
      }
      toast.error(errorMessage);
    } finally {
      setIsSaving(false);
    }
  };

  if (status === 'loading' || isLoading) {
    return <div>Loading preferences...</div>;
  }

  if (status === 'unauthenticated') {
    return <div>Please log in to set your preferences.</div>;
  }

  if (!preferences) {
    // This case might happen if fetch failed and defaults were set
    // Or could indicate an error state
    return <div>Could not load preferences data.</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <h2 className="text-xl font-semibold">Macro Goals</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="dailyCalorieGoal">Daily Calories (kcal)</Label>
          <Input
            id="dailyCalorieGoal"
            name="dailyCalorieGoal"
            type="number"
            min="0"
            value={preferences.dailyCalorieGoal ?? ''}
            onChange={handleInputChange}
            placeholder="e.g., 2000"
            disabled={isSaving}
          />
        </div>
        <div>
          <Label htmlFor="dailyProteinGoal">Daily Protein (g)</Label>
          <Input
            id="dailyProteinGoal"
            name="dailyProteinGoal"
            type="number"
            min="0"
            value={preferences.dailyProteinGoal ?? ''}
            onChange={handleInputChange}
            placeholder="e.g., 150"
            disabled={isSaving}
          />
        </div>
        <div>
          <Label htmlFor="dailyCarbGoal">Daily Carbs (g)</Label>
          <Input
            id="dailyCarbGoal"
            name="dailyCarbGoal"
            type="number"
            min="0"
            value={preferences.dailyCarbGoal ?? ''}
            onChange={handleInputChange}
            placeholder="e.g., 250"
            disabled={isSaving}
          />
        </div>
        <div>
          <Label htmlFor="dailyFatGoal">Daily Fat (g)</Label>
          <Input
            id="dailyFatGoal"
            name="dailyFatGoal"
            type="number"
            min="0"
            value={preferences.dailyFatGoal ?? ''}
            onChange={handleInputChange}
            placeholder="e.g., 70"
            disabled={isSaving}
          />
        </div>
      </div>
      <Button type="submit" disabled={isSaving}>
        {isSaving ? 'Saving...' : 'Save Goals'}
      </Button>
    </form>
  );
};

export default GoalSettingsForm; 