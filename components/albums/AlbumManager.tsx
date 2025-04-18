'use client';

import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import type { Album as PrismaAlbum, RecipeToAlbum, Recipe } from '@prisma/client';
import Image from 'next/image';
import AlbumCoverModal from './AlbumCoverModal';
import EditDescriptionModal from './EditDescriptionModal';
import LoadingSpinner from '@/components/shared/LoadingSpinner';

// Define the type for the fetched album data
export type FetchedAlbum = PrismaAlbum & {
  recipes: (RecipeToAlbum & {
    recipe: Recipe;
  })[];
  // Make sure coverImage is included if needed based on schema (it is)
  coverImage?: string | null;
};

interface AlbumManagerProps {
  onAlbumSelect?: (albumId: string) => void;
  refreshTrigger?: number;
  onViewAlbum?: (album: FetchedAlbum) => void;
}

export default function AlbumManager({ onAlbumSelect: _onAlbumSelect, refreshTrigger, onViewAlbum }: AlbumManagerProps) {
  const [albums, setAlbums] = useState<FetchedAlbum[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [newAlbumName, setNewAlbumName] = useState('');
  const [newAlbumDescription, setNewAlbumDescription] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // State for Cover Modal
  const [isCoverModalOpen, setIsCoverModalOpen] = useState(false);
  const [selectedAlbumIdForCover, setSelectedAlbumIdForCover] = useState<string | null>(null);

  // --- START: State for Description Modal ---
  const [isDescriptionModalOpen, setIsDescriptionModalOpen] = useState(false);
  const [albumForDescriptionEdit, setAlbumForDescriptionEdit] = useState<FetchedAlbum | null>(null);
  // --- END: State for Description Modal ---

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
      const errorMessage = err instanceof Error ? err.message : 'Failed to load albums';
      setError(errorMessage);
      console.error('Error fetching albums:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateAlbum = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    // Consider a specific loading state for create if needed
    try {
      const response = await fetch('/api/albums', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newAlbumName,
          description: newAlbumDescription || undefined,
        }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create album');
      }
      await fetchAlbums(); // Refresh list
      setIsCreating(false);
      setNewAlbumName('');
      setNewAlbumDescription('');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create album';
      setError(errorMessage);
      console.error('Error creating album:', err);
    }
  };

   // Handlers for Cover Modal
   const handleOpenCoverModal = (albumId: string) => {
    setSelectedAlbumIdForCover(albumId);
    setIsCoverModalOpen(true);
   };

   const handleCloseCoverModal = () => {
    setIsCoverModalOpen(false);
   };

   const handleCoverUpdateSuccess = () => {
    handleCloseCoverModal();
    fetchAlbums(); // Refresh album list
   };

   // --- START: Description Modal Handlers ---
   const handleOpenDescriptionEditor = () => {
     if (!selectedAlbumIdForCover) return; // Should have an album selected if cover modal was open
     setAlbumForDescriptionEdit(albums.find(a => a.id === selectedAlbumIdForCover) || null);
     setIsCoverModalOpen(false); // Close cover modal first
     // Use a timeout to allow cover modal to close before opening description modal
     setTimeout(() => {
       setIsDescriptionModalOpen(true);
     }, 150); // Adjust delay as needed
   };

   const handleCloseDescriptionEditor = () => {
     setIsDescriptionModalOpen(false);
     // Delay resetting album selection slightly
     setTimeout(() => setSelectedAlbumIdForCover(null), 300);
   };

   const handleDescriptionUpdateSuccess = () => {
     fetchAlbums(); // Refresh album list
     // Optionally refetch the specific album details if needed elsewhere
   };
   // --- END: Description Modal Handlers ---

  // Conditional loading check - MUST be before the main return
  if (isLoading && albums.length === 0) { // Show initial loading only if no albums loaded yet
    return <div className="text-center py-4"><LoadingSpinner/></div>;
  }

  // Main return statement for the component JSX
  return (
    <div className="space-y-6">
      {/* --- Corrected Header and Create Button --- */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Your Recipe Albums</h2>
        <button
          onClick={() => setIsCreating(true)}
          className="flex items-center gap-2 px-4 py-2 bg-yellow-500 text-black rounded-md hover:bg-yellow-600 transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2"
        >
          <Plus className="w-5 h-5" />
          New Album
        </button>
      </div>

      {/* --- General Error Display --- */}
      {error && !isCreating && ( // Don't show fetch error while create form is open
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* --- Create Album Form --- */}
      {isCreating && (
        <form onSubmit={handleCreateAlbum} className="space-y-4 bg-white p-6 rounded-lg shadow mb-6">
          <h3 className="text-lg font-medium mb-3">Create New Album</h3>
          {error && ( // Show create-specific errors here
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
           )}
          <div>
            <label htmlFor="albumName" className="block text-sm font-medium text-gray-700 mb-1">
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
            <label htmlFor="albumDescription" className="block text-sm font-medium text-gray-700 mb-1">
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
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => { setIsCreating(false); setError(null); } } // Clear error on cancel
              className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-yellow-500 text-black rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2"
              // Add loading state if create takes time
            >
              Create Album
            </button>
          </div>
        </form>
      )}

      {/* --- Album Grid --- */}
      {isLoading && albums.length === 0 && ( /* Show loading specifically for grid if needed */
          <div className="text-center py-4">Loading...</div>
      )}
      {!isLoading && albums.length === 0 && !isCreating && ( /* Show only if not loading and not creating */
           <div className="text-center py-4 text-gray-600">You haven&apos;t created any albums yet.</div>
      )}
      {albums.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {albums.map((album: FetchedAlbum, index) => (
              <div
                key={album.id}
                className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow relative flex flex-col"
              >
                <div className="aspect-video bg-gray-200 relative cursor-pointer" onClick={() => onViewAlbum?.(album)}>
                  {album.coverImage ? (
                    <Image
                      src={album.coverImage}
                      alt={album.name}
                      className="w-full h-full object-cover"
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      priority={index < 3}
                      unoptimized={typeof album.coverImage === 'string' && album.coverImage.includes('blob.vercel-storage.com')}
                    />
                  ) : (
                    <div
                        className="absolute inset-0 flex items-center justify-center text-gray-500 bg-gray-100"
                    >
                      <span className="text-sm">No cover image</span>
                    </div>
                  )}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenCoverModal(album.id);
                    }}
                    aria-label={"Edit album cover or name"}
                    className="absolute top-2 right-2 z-10 p-1.5 bg-black bg-opacity-50 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 cursor-pointer flex items-center justify-center"
                  >
                    <span className="text-[10px] font-medium">EDIT</span>
                  </button>
                </div>
                <div
                    className="p-4 flex-grow flex flex-col justify-between"
                    onClick={() => onViewAlbum?.(album)}
                >
                  <div>
                    <h3 className="font-semibold text-lg truncate mb-1" title={album.name}>{album.name}</h3>
                    <p
                      className="text-gray-600 text-sm mt-1 line-clamp-2 h-[40px]"
                      title={album.description || ''}
                    >
                      {album.description || <span className="italic text-gray-400">No description</span>}
                    </p>
                  </div>
                  <p className="text-gray-500 text-sm mt-2 self-start">
                    {album.recipes.length} {album.recipes.length === 1 ? 'recipe' : 'recipes'}
                  </p>
                </div>
              </div>
            ))}
          </div>
      )}


      {/* --- Render the Cover Modal --- */}
      {isCoverModalOpen && selectedAlbumIdForCover && (
          <AlbumCoverModal
            albumId={selectedAlbumIdForCover}
            isOpen={isCoverModalOpen}
            onClose={handleCloseCoverModal}
            onSuccess={handleCoverUpdateSuccess}
            currentCoverUrl={albums.find(a => a.id === selectedAlbumIdForCover)?.coverImage}
            currentAlbumName={albums.find(a => a.id === selectedAlbumIdForCover)?.name}
            currentDescription={albums.find(a => a.id === selectedAlbumIdForCover)?.description}
            onOpenDescriptionEditor={handleOpenDescriptionEditor}
          />
       )}

       {/* --- START: Render Description Modal --- */}
       {isDescriptionModalOpen && albumForDescriptionEdit && (
          <EditDescriptionModal
            isOpen={isDescriptionModalOpen}
            onClose={handleCloseDescriptionEditor}
            albumId={albumForDescriptionEdit.id}
            currentDescription={albumForDescriptionEdit.description}
            onSuccess={handleDescriptionUpdateSuccess}
          />
       )}
       {/* --- END: Render Description Modal --- */}
    </div>
  );
}