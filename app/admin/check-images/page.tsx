'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

type ImageStats = {
  totalRecipes: number;
  recipesWithNoImage: number;
  recipesWithLocalImages: number;
  recipesWithPlaceholder: number;
  recipesWithExternalImages: number;
  unknown: number;
};

type ImageSample = {
  id: string;
  title: string;
  imageUrl: string | null;
};

export default function CheckImagesPage() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<ImageStats | null>(null);
  const [externalSamples, setExternalSamples] = useState<ImageSample[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchImageStats = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/admin/check-images');
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to fetch image stats');
        }

        const data = await response.json();
        setStats(data.stats);
        setExternalSamples(data.externalImageSamples);
      } catch (err) {
        console.error('Error fetching image stats:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch image stats');
      } finally {
        setLoading(false);
      }
    };

    if (session) {
      fetchImageStats();
    }
  }, [session]);

  if (!session) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Unauthorized</h1>
        <p>Please sign in to access this page.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Loading Image Statistics...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Error</h1>
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Recipe Image Statistics</h1>
      
      {stats && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded shadow">
              <h3 className="font-semibold">Total Recipes</h3>
              <p className="text-2xl">{stats.totalRecipes}</p>
            </div>
            <div className="bg-white p-4 rounded shadow">
              <h3 className="font-semibold">External Images</h3>
              <p className="text-2xl">{stats.recipesWithExternalImages}</p>
              <p className="text-sm text-gray-500">
                {Math.round((stats.recipesWithExternalImages / stats.totalRecipes) * 100)}% of total
              </p>
            </div>
            <div className="bg-white p-4 rounded shadow">
              <h3 className="font-semibold">Local Images</h3>
              <p className="text-2xl">{stats.recipesWithLocalImages}</p>
              <p className="text-sm text-gray-500">
                {Math.round((stats.recipesWithLocalImages / stats.totalRecipes) * 100)}% of total
              </p>
            </div>
            <div className="bg-white p-4 rounded shadow">
              <h3 className="font-semibold">Placeholder Images</h3>
              <p className="text-2xl">{stats.recipesWithPlaceholder}</p>
              <p className="text-sm text-gray-500">
                {Math.round((stats.recipesWithPlaceholder / stats.totalRecipes) * 100)}% of total
              </p>
            </div>
            <div className="bg-white p-4 rounded shadow">
              <h3 className="font-semibold">No Images</h3>
              <p className="text-2xl">{stats.recipesWithNoImage}</p>
              <p className="text-sm text-gray-500">
                {Math.round((stats.recipesWithNoImage / stats.totalRecipes) * 100)}% of total
              </p>
            </div>
            <div className="bg-white p-4 rounded shadow">
              <h3 className="font-semibold">Unknown Image Format</h3>
              <p className="text-2xl">{stats.unknown}</p>
              <p className="text-sm text-gray-500">
                {Math.round((stats.unknown / stats.totalRecipes) * 100)}% of total
              </p>
            </div>
          </div>
        </div>
      )}

      {externalSamples.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Sample External Image URLs</h2>
          <div className="bg-white p-4 rounded shadow">
            <ul className="space-y-2">
              {externalSamples.map(sample => (
                <li key={sample.id} className="border-b pb-2">
                  <p className="font-medium">{sample.title}</p>
                  <p className="text-sm text-gray-500 break-all">{sample.imageUrl}</p>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="mt-6">
            <a 
              href="/admin/migrate-images" 
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              Go to Migration Page
            </a>
          </div>
        </div>
      )}

      {externalSamples.length === 0 && (
        <div className="bg-yellow-100 p-4 rounded">
          <p>No external image URLs found in the database. All images are already stored locally or using placeholders.</p>
        </div>
      )}
    </div>
  );
} 