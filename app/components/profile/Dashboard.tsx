'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import LoadingSpinner from '../../components/shared/LoadingSpinner';
import { ChartBarIcon, ClockIcon, SparklesIcon, FireIcon } from '@heroicons/react/24/outline';

interface DashboardData {
  preferences?: {
    cookingTime: string;
    skillLevel: string;
    servingSize: number;
    mealPrep: boolean;
    isVegetarian: boolean;
    isVegan: boolean;
    isGlutenFree: boolean;
    isDairyFree: boolean;
    isKosher: boolean;
    isHalal: boolean;
    isLowCarb: boolean;
  };
  allergies?: Array<{
    ingredient: string;
    severity: 'mild' | 'moderate' | 'severe';
  }>;
  cuisinePreferences?: Array<{
    cuisineId: string;
    name: string;
    level: 'love' | 'like' | 'neutral' | 'dislike';
  }>;
  dietaryRestrictions?: string[];
}

export default function Dashboard() {
  const { data: session } = useSession();
  const [dashboardData, setDashboardData] = useState<DashboardData>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!session?.user?.email) return;

      try {
        const [prefsRes, allergiesRes, cuisineRes, dietaryRes] = await Promise.all([
          fetch('/api/preferences'),
          fetch('/api/allergies'),
          fetch('/api/cuisine-preferences'),
          fetch('/api/dietary-restrictions'),
        ]);

        const [preferences, allergies, cuisinePrefs, dietaryRestrictions] = await Promise.all([
          prefsRes.json(),
          allergiesRes.json(),
          cuisineRes.json(),
          dietaryRes.json(),
        ]);

        setDashboardData({
          preferences,
          allergies,
          cuisinePreferences: cuisinePrefs,
          dietaryRestrictions,
        });
      } catch (err) {
        setError('Failed to load dashboard data');
        console.error('Error fetching dashboard data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, [session?.user?.email]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="text-center p-4 bg-red-50 rounded-lg">
        <p className="text-red-800">{error}</p>
      </div>
    );
  }

  const getFavoritesCuisines = () => {
    return dashboardData.cuisinePreferences
      ?.filter(pref => pref.level === 'love')
      .map(pref => pref.name) || [];
  };

  const getAllergiesCount = () => {
    return dashboardData.allergies?.length || 0;
  };

  const getActiveRestrictions = () => {
    const restrictions = [];
    const prefs = dashboardData.preferences;
    
    if (prefs?.isVegetarian) restrictions.push('Vegetarian');
    if (prefs?.isVegan) restrictions.push('Vegan');
    if (prefs?.isGlutenFree) restrictions.push('Gluten-free');
    if (prefs?.isDairyFree) restrictions.push('Dairy-free');
    if (prefs?.isKosher) restrictions.push('Kosher');
    if (prefs?.isHalal) restrictions.push('Halal');
    if (prefs?.isLowCarb) restrictions.push('Low-carb');

    return restrictions;
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Your Food Profile</h2>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {/* Cooking Preferences Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center mb-4">
            <ChartBarIcon className="h-6 w-6 text-primary mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">Cooking Preferences</h3>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-600">
              <span className="font-medium">Cooking Time:</span>{' '}
              {dashboardData.preferences?.cookingTime || 'Not set'}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Skill Level:</span>{' '}
              {dashboardData.preferences?.skillLevel || 'Not set'}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Serving Size:</span>{' '}
              {dashboardData.preferences?.servingSize || 'Not set'}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Meal Prep:</span>{' '}
              {dashboardData.preferences?.mealPrep ? 'Yes' : 'No'}
            </p>
          </div>
        </div>

        {/* Allergies Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center mb-4">
            <SparklesIcon className="h-6 w-6 text-primary mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">Allergies</h3>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-600">
              <span className="font-medium">Total Allergies:</span> {getAllergiesCount()}
            </p>
            <div className="flex flex-wrap gap-2 mt-2">
              {dashboardData.allergies?.map((allergy) => (
                <span
                  key={allergy.ingredient}
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    allergy.severity === 'severe'
                      ? 'bg-red-100 text-red-800'
                      : allergy.severity === 'moderate'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-green-100 text-green-800'
                  }`}
                >
                  {allergy.ingredient}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Dietary Restrictions Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center mb-4">
            <FireIcon className="h-6 w-6 text-primary mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">Dietary Restrictions</h3>
          </div>
          <div className="space-y-2">
            <div className="flex flex-wrap gap-2">
              {getActiveRestrictions().map((restriction) => (
                <span
                  key={restriction}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                >
                  {restriction}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Favorite Cuisines Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center mb-4">
            <ClockIcon className="h-6 w-6 text-primary mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">Favorite Cuisines</h3>
          </div>
          <div className="space-y-2">
            <div className="flex flex-wrap gap-2">
              {getFavoritesCuisines().map((cuisine) => (
                <span
                  key={cuisine}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800"
                >
                  {cuisine}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 