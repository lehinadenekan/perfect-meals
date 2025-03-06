'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

interface DietaryRestriction {
  id: string;
  name: string;
  description: string;
}

const DIETARY_RESTRICTIONS: DietaryRestriction[] = [
  {
    id: 'vegetarian',
    name: 'Vegetarian',
    description: 'No meat, fish, or poultry',
  },
  {
    id: 'vegan',
    name: 'Vegan',
    description: 'No animal products',
  },
  {
    id: 'pescatarian',
    name: 'Pescatarian',
    description: 'No meat or poultry, but includes fish',
  },
  {
    id: 'gluten-free',
    name: 'Gluten-Free',
    description: 'No wheat, barley, rye, or their derivatives',
  },
  {
    id: 'dairy-free',
    name: 'Dairy-Free',
    description: 'No milk products',
  },
  {
    id: 'kosher',
    name: 'Kosher',
    description: 'Follows Jewish dietary laws',
  },
  {
    id: 'halal',
    name: 'Halal',
    description: 'Follows Islamic dietary laws',
  },
  {
    id: 'low-carb',
    name: 'Low-Carb',
    description: 'Reduced carbohydrate intake',
  },
];

export default function DietaryRestrictions() {
  const { data: session } = useSession();
  const [selectedRestrictions, setSelectedRestrictions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    const fetchRestrictions = async () => {
      try {
        const response = await fetch('/api/dietary-restrictions');
        if (!response.ok) throw new Error('Failed to fetch dietary restrictions');
        
        const data = await response.json();
        if (data) {
          setSelectedRestrictions(data.map((restriction: any) => restriction.id));
        }
      } catch (error) {
        console.error('Error fetching dietary restrictions:', error);
        setMessage({ type: 'error', text: 'Failed to load dietary restrictions' });
      }
    };

    if (session?.user?.email) {
      fetchRestrictions();
    }
  }, [session?.user?.email]);

  const handleRestrictionToggle = (restrictionId: string) => {
    setSelectedRestrictions((prev) =>
      prev.includes(restrictionId)
        ? prev.filter((id) => id !== restrictionId)
        : [...prev, restrictionId]
    );
  };

  const handleSave = async () => {
    setIsLoading(true);
    setMessage(null);

    try {
      const response = await fetch('/api/dietary-restrictions', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ restrictions: selectedRestrictions }),
      });

      if (!response.ok) throw new Error('Failed to save dietary restrictions');

      setMessage({ type: 'success', text: 'Dietary restrictions saved successfully!' });
    } catch (error) {
      console.error('Error saving dietary restrictions:', error);
      setMessage({ type: 'error', text: 'Failed to save dietary restrictions' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900">Dietary Restrictions</h3>
        <p className="mt-1 text-sm text-gray-500">
          Select any dietary restrictions that apply to you
        </p>
      </div>

      {message && (
        <div
          className={`p-4 rounded-md ${
            message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {DIETARY_RESTRICTIONS.map((restriction) => (
          <div
            key={restriction.id}
            className="relative flex items-start p-4 border rounded-lg hover:bg-gray-50"
          >
            <div className="flex items-center h-5">
              <input
                id={restriction.id}
                type="checkbox"
                checked={selectedRestrictions.includes(restriction.id)}
                onChange={() => handleRestrictionToggle(restriction.id)}
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
            </div>
            <div className="ml-3">
              <label htmlFor={restriction.id} className="font-medium text-gray-700">
                {restriction.name}
              </label>
              <p className="text-sm text-gray-500">{restriction.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-4">
        <button
          type="button"
          onClick={handleSave}
          disabled={isLoading}
          className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary ${
            isLoading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isLoading ? 'Saving...' : 'Save Dietary Restrictions'}
        </button>
      </div>
    </div>
  );
} 