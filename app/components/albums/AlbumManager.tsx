'use client';

import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import type { Album as PrismaAlbum, RecipeToAlbum, Recipe } from '@prisma/client';

// Define the type for the fetched album data, including the nested recipe relation
type FetchedAlbum = PrismaAlbum & {
  recipes: (RecipeToAlbum & {
    recipe: Recipe;
  })[];
};

interface AlbumManagerProps {
  onAlbumSelect?: (albumId: string) => void;
  refreshTrigger?: number;
  onViewAlbum?: (album: FetchedAlbum) => void;
}

export default function AlbumManager({ onAlbumSelect, refreshTrigger, onViewAlbum }: AlbumManagerProps) {
  const [albums, setAlbums] = useState<FetchedAlbum[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [newAlbumName, setNewAlbumName] = useState('');
  const [newAlbumDescription, setNewAlbumDescription] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log("AlbumManager: Fetching albums due to mount or refresh trigger.");
    fetchAlbums();
  }, [refreshTrigger]);

  const fetchAlbums = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/albums');
      if (!response.ok) throw new Error('Failed to fetch albums');
      const data: FetchedAlbum[] = await response.json();
      setAlbums(data);
    } catch (err) {
      setError('Failed to load albums');
      console.error('Error fetching albums:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateAlbum = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch('/api/albums', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: newAlbumName,
          description: newAlbumDescription || undefined,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to create album');
      }

      await fetchAlbums(); // Refresh the albums list
      setIsCreating(false);
      setNewAlbumName('');
      setNewAlbumDescription('');
    } catch (err) {
      setError('Failed to create album');
      console.error('Error creating album:', err);
    }
  };

  if (isLoading) {
    return <div className="text-center py-4">Loading albums...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Your Recipe Albums</h2>
        <button
          onClick={() => setIsCreating(true)}
          className="flex items-center gap-2 px-4 py-2 bg-yellow-500 text-black rounded-md hover:bg-yellow-600 transition-colors"
        >
          <Plus className="w-5 h-5" />
          New Album
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {isCreating && (
        <form onSubmit={handleCreateAlbum} className="space-y-4 bg-white p-6 rounded-lg shadow">
          <div>
            <label htmlFor="albumName" className="block text-sm font-medium text-gray-700">
              Album Name
            </label>
            <input
              type="text"
              id="albumName"
              value={newAlbumName}
              onChange={(e) => setNewAlbumName(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
              required
            />
          </div>
          <div>
            <label htmlFor="albumDescription" className="block text-sm font-medium text-gray-700">
              Description (optional)
            </label>
            <textarea
              id="albumDescription"
              value={newAlbumDescription}
              onChange={(e) => setNewAlbumDescription(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
              rows={3}
            />
          </div>
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsCreating(false)}
              className="px-4 py-2 text-sm text-gray-700 hover:text-gray-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-yellow-500 text-black rounded-md hover:bg-yellow-600"
            >
              Create Album
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {albums.map((album: FetchedAlbum) => (
          <div
            key={album.id}
            onClick={() => onViewAlbum ? onViewAlbum(album) : onAlbumSelect?.(album.id)}
            className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
          >
            <div className="aspect-video bg-gray-200 relative">
              {album.coverImage ? (
                <img
                  src={album.coverImage}
                  alt={album.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                  No cover image
                </div>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg">{album.name}</h3>
              {album.description && (
                <p className="text-gray-600 text-sm mt-1">{album.description}</p>
              )}
              <p className="text-gray-500 text-sm mt-2">
                {album.recipes.length} {album.recipes.length === 1 ? 'recipe' : 'recipes'}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 