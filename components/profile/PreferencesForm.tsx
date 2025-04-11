'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

interface CookingPreferences {
  cookingTime: string;
  skillLevel: string;
  servingSize: number;
  mealPrep: boolean;
}

export default function PreferencesForm() {
  const { data: session } = useSession();
  const [preferences, setPreferences] = useState<CookingPreferences>({
    cookingTime: '30-60',
    skillLevel: 'intermediate',
    servingSize: 2,
    mealPrep: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    const fetchPreferences = async () => {
      try {
        const response = await fetch('/api/preferences');
        if (!response.ok) throw new Error('Failed to fetch preferences');
        
        const data = await response.json();
        if (data) {
          setPreferences({
            cookingTime: data.cookingTime,
            skillLevel: data.skillLevel,
            servingSize: data.servingSize,
            mealPrep: data.mealPrep,
          });
        }
      } catch (error) {
        console.error('Error fetching preferences:', error);
        setMessage({ type: 'error', text: 'Failed to load preferences' });
      }
    };

    if (session?.user?.email) {
      fetchPreferences();
    }
  }, [session?.user?.email]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setPreferences((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    try {
      const response = await fetch('/api/preferences', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(preferences),
      });

      if (!response.ok) throw new Error('Failed to save preferences');

      setMessage({ type: 'success', text: 'Preferences saved successfully!' });
    } catch (error) {
      console.error('Error saving preferences:', error);
      setMessage({ type: 'error', text: 'Failed to save preferences' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Cooking Preferences</h3>
        
        {message && (
          <div
            className={`p-4 rounded-md ${
              message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
            }`}
          >
            {message.text}
          </div>
        )}

        <div>
          <label htmlFor="cookingTime" className="block text-sm font-medium text-gray-700">
            Preferred Cooking Time
          </label>
          <select
            id="cookingTime"
            name="cookingTime"
            value={preferences.cookingTime}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          >
            <option value="0-30">Quick (0-30 minutes)</option>
            <option value="30-60">Medium (30-60 minutes)</option>
            <option value="60+">Lengthy (60+ minutes)</option>
          </select>
        </div>

        <div>
          <label htmlFor="skillLevel" className="block text-sm font-medium text-gray-700">
            Cooking Skill Level
          </label>
          <select
            id="skillLevel"
            name="skillLevel"
            value={preferences.skillLevel}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          >
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>

        <div>
          <label htmlFor="servingSize" className="block text-sm font-medium text-gray-700">
            Default Serving Size
          </label>
          <input
            type="number"
            id="servingSize"
            name="servingSize"
            min="1"
            max="12"
            value={preferences.servingSize}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="mealPrep"
            name="mealPrep"
            checked={preferences.mealPrep}
            onChange={handleChange}
            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
          />
          <label htmlFor="mealPrep" className="ml-2 block text-sm text-gray-700">
            Interested in meal prep recipes
          </label>
        </div>
      </div>

      <div className="pt-4">
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary ${
            isLoading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isLoading ? 'Saving...' : 'Save Preferences'}
        </button>
      </div>
    </form>
  );
} 