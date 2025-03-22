'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';

interface Recipe {
  id: string;
  title: string;
  imageUrl: string;
}

interface SeedResult {
  message?: string;
  recipes?: Recipe[];
  error?: string;
}

export default function SeedTestRecipesPage() {
  const { data: session } = useSession();
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [result, setResult] = useState<SeedResult | null>(null);

  const handleSeed = async () => {
    try {
      setStatus('loading');
      const response = await fetch('/api/admin/seed-test-recipes', {
        method: 'POST',
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to seed test recipes');
      }

      setResult(data);
      setStatus('success');
    } catch (error) {
      console.error('Seeding failed:', error);
      setStatus('error');
      setResult({ error: error instanceof Error ? error.message : 'Failed to seed test recipes' });
    }
  };

  if (!session) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Unauthorized</h1>
        <p>Please sign in to access this page.</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Seed Test Recipes</h1>
      <p className="mb-4">
        This will add test recipes with sample image URLs for testing the migration process.
      </p>

      <button
        onClick={handleSeed}
        disabled={status === 'loading'}
        className={`px-4 py-2 rounded ${
          status === 'loading'
            ? 'bg-gray-400'
            : 'bg-blue-500 hover:bg-blue-600'
        } text-white`}
      >
        {status === 'loading' ? 'Adding Test Recipes...' : 'Add Test Recipes'}
      </button>

      {status === 'success' && result && (
        <div className="mt-4 p-4 bg-green-100 rounded">
          <h2 className="font-semibold mb-2">Test Recipes Created</h2>
          {result.message && <p>{result.message}</p>}
          
          {result.recipes && result.recipes.length > 0 && (
            <div className="mt-4">
              <h3 className="font-semibold">Created Recipes:</h3>
              <ul className="list-disc pl-4 mt-2">
                {result.recipes.map((recipe) => (
                  <li key={recipe.id} className="mb-2">
                    <p className="font-medium">{recipe.title}</p>
                    <p className="text-sm text-gray-600 break-all">{recipe.imageUrl}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          <div className="mt-6 flex space-x-4">
            <a 
              href="/admin/check-images" 
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              Check Image Stats
            </a>
            <a 
              href="/admin/migrate-images" 
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
            >
              Go to Migration
            </a>
          </div>
        </div>
      )}

      {status === 'error' && result && (
        <div className="mt-4 p-4 bg-red-100 text-red-600 rounded">
          <h2 className="font-semibold mb-2">Error</h2>
          <p>{result.error}</p>
        </div>
      )}
    </div>
  );
} 