'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';

interface Cuisine {
  id: string;
  name: string;
  region: string;
  imageUrl: string;
}

interface ApiCuisinePreference {
  cuisineId: string;
  preferenceLevel: PreferenceLevel;
  name: string;
}

const CUISINES: Cuisine[] = [
  {
    id: 'italian',
    name: 'Italian',
    region: 'Europe',
    imageUrl: 'https://placehold.co/300x200/ffc800/ffffff?text=Italian+Cuisine',
  },
  {
    id: 'japanese',
    name: 'Japanese',
    region: 'Asia',
    imageUrl: 'https://placehold.co/300x200/ffc800/ffffff?text=Japanese+Cuisine',
  },
  {
    id: 'mexican',
    name: 'Mexican',
    region: 'Americas',
    imageUrl: 'https://placehold.co/300x200/ffc800/ffffff?text=Mexican+Cuisine',
  },
  {
    id: 'indian',
    name: 'Indian',
    region: 'Asia',
    imageUrl: 'https://placehold.co/300x200/ffc800/ffffff?text=Indian+Cuisine',
  },
  {
    id: 'mediterranean',
    name: 'Mediterranean',
    region: 'Europe',
    imageUrl: 'https://placehold.co/300x200/ffc800/ffffff?text=Mediterranean+Cuisine',
  },
  {
    id: 'chinese',
    name: 'Chinese',
    region: 'Asia',
    imageUrl: 'https://placehold.co/300x200/ffc800/ffffff?text=Chinese+Cuisine',
  },
  {
    id: 'thai',
    name: 'Thai',
    region: 'Asia',
    imageUrl: 'https://placehold.co/300x200/ffc800/ffffff?text=Thai+Cuisine',
  },
  {
    id: 'french',
    name: 'French',
    region: 'Europe',
    imageUrl: 'https://placehold.co/300x200/ffc800/ffffff?text=French+Cuisine',
  },
  {
    id: 'korean',
    name: 'Korean',
    region: 'Asia',
    imageUrl: 'https://placehold.co/300x200/ffc800/ffffff?text=Korean+Cuisine',
  },
  {
    id: 'middle-eastern',
    name: 'Middle Eastern',
    region: 'Asia',
    imageUrl: 'https://placehold.co/300x200/ffc800/ffffff?text=Middle+Eastern+Cuisine',
  },
];

type PreferenceLevel = 'love' | 'like' | 'neutral' | 'dislike';

interface CuisinePreference {
  cuisineId: string;
  level: PreferenceLevel;
  name: string;
}

export default function CuisinePreferences() {
  const { data: session } = useSession();
  const [preferences, setPreferences] = useState<CuisinePreference[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    const fetchPreferences = async () => {
      try {
        const response = await fetch('/api/cuisine-preferences');
        if (!response.ok) throw new Error('Failed to fetch cuisine preferences');
        
        const data: ApiCuisinePreference[] = await response.json();
        if (data) {
          setPreferences(
            data.map((pref: ApiCuisinePreference) => ({
              cuisineId: pref.cuisineId,
              level: pref.preferenceLevel,
              name: pref.name,
            }))
          );
        }
      } catch (error) {
        console.error('Error fetching cuisine preferences:', error);
        setMessage({ type: 'error', text: 'Failed to load cuisine preferences' });
      }
    };

    if (session?.user?.email) {
      fetchPreferences();
    }
  }, [session?.user?.email]);

  const getPreferenceLevel = (cuisineId: string): PreferenceLevel => {
    return preferences.find(p => p.cuisineId === cuisineId)?.level || 'neutral';
  };

  const handlePreferenceChange = (
    cuisineId: string,
    level: 'love' | 'like' | 'neutral' | 'dislike' | 'remove'
  ) => {
    const index = preferences.findIndex((p) => p.cuisineId === cuisineId);
    const newPreferences = [...preferences];

    if (level === 'remove') {
      if (index !== -1) {
        newPreferences.splice(index, 1);
        setPreferences(newPreferences);
      }
    } else if (index !== -1) {
      const updatedPreferences = newPreferences.map((pref, i) => 
        i === index ? { ...pref, level } : pref
      );
      setPreferences(updatedPreferences);
    } else {
      const cuisineData: { id: string; name: string } | undefined = CUISINES.find(c => c.id === cuisineId);
      if (cuisineData) {
        const addedPreferences = [...newPreferences, { cuisineId, level, name: cuisineData.name }];
        setPreferences(addedPreferences);
      }
    }
  };

  const getPreferenceColor = (level: PreferenceLevel): string => {
    switch (level) {
      case 'love': return 'bg-green-100 text-green-800';
      case 'like': return 'bg-blue-100 text-blue-800';
      case 'neutral': return 'bg-gray-100 text-gray-800';
      case 'dislike': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    setMessage(null);

    try {
      const response = await fetch('/api/cuisine-preferences', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ preferences }),
      });

      if (!response.ok) throw new Error('Failed to save cuisine preferences');

      setMessage({ type: 'success', text: 'Cuisine preferences saved successfully!' });
    } catch (error) {
      console.error('Error saving cuisine preferences:', error);
      setMessage({ type: 'error', text: 'Failed to save cuisine preferences' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900">Cuisine Preferences</h3>
        <p className="mt-1 text-sm text-gray-500">
          Rate your preference for different cuisines to get better recommendations
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

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {CUISINES.map((cuisine) => (
          <div
            key={cuisine.id}
            className="relative flex flex-col border rounded-lg overflow-hidden"
          >
            <div className="relative h-32">
              <Image
                src={cuisine.imageUrl}
                alt={cuisine.name}
                fill
                className="object-cover"
              />
            </div>

            <div className="p-4">
              <h4 className="text-lg font-medium text-gray-900">{cuisine.name}</h4>
              <p className="text-sm text-gray-500">{cuisine.region}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                {(['love', 'like', 'neutral', 'dislike'] as PreferenceLevel[]).map((level) => (
                  <button
                    key={level}
                    onClick={() => handlePreferenceChange(cuisine.id, level)}
                    className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${
                      getPreferenceLevel(cuisine.id) === level
                        ? getPreferenceColor(level)
                        : 'bg-gray-50 text-gray-600'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
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
          {isLoading ? 'Saving...' : 'Save Cuisine Preferences'}
        </button>
      </div>
    </div>
  );
} 