'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';

export default function MigrateImagesPage() {
  const { data: session } = useSession();
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [results, setResults] = useState<any>(null);

  const handleMigration = async () => {
    try {
      setStatus('loading');
      const response = await fetch('/api/admin/migrate-images', {
        method: 'POST',
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to migrate images');
      }

      setResults(data.results);
      setStatus('success');
    } catch (error) {
      console.error('Migration failed:', error);
      setStatus('error');
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
      <h1 className="text-2xl font-bold mb-4">Migrate Recipe Images</h1>
      <p className="mb-4">
        This will download all Spoonacular recipe images and store them locally.
      </p>

      <button
        onClick={handleMigration}
        disabled={status === 'loading'}
        className={`px-4 py-2 rounded ${
          status === 'loading'
            ? 'bg-gray-400'
            : 'bg-blue-500 hover:bg-blue-600'
        } text-white`}
      >
        {status === 'loading' ? 'Migrating...' : 'Start Migration'}
      </button>

      {status === 'success' && results && (
        <div className="mt-4 p-4 bg-green-100 rounded">
          <h2 className="font-semibold mb-2">Migration Complete</h2>
          <p>Total recipes processed: {results.total}</p>
          <p>Successfully migrated: {results.success}</p>
          <p>Failed: {results.failed}</p>
          {results.errors.length > 0 && (
            <div className="mt-2">
              <h3 className="font-semibold">Errors:</h3>
              <ul className="list-disc pl-4">
                {results.errors.map((error: string, index: number) => (
                  <li key={index} className="text-red-600">{error}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {status === 'error' && (
        <div className="mt-4 p-4 bg-red-100 text-red-600 rounded">
          Failed to migrate images. Please check the console for details.
        </div>
      )}
    </div>
  );
} 