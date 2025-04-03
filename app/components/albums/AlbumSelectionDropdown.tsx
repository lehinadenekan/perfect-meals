import React, { useState, useEffect, useRef } from 'react';
import { Album } from '@prisma/client'; // Assuming Prisma client type resolves
import LoadingSpinner from '../shared/LoadingSpinner'; // Assuming this exists

interface AlbumSelectionDropdownProps {
  recipeId: string;
  onClose: () => void;
  // Functions to be implemented in RecipeCard, calling API endpoints
  onAddToAlbum: (albumId: string, recipeId: string) => Promise<void>;
  onCreateAndAddAlbum: (albumName: string, recipeId: string) => Promise<void>;
}

export default function AlbumSelectionDropdown({
  recipeId,
  onClose,
  onAddToAlbum,
  onCreateAndAddAlbum,
}: AlbumSelectionDropdownProps) {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // For create/add actions
  const [error, setError] = useState<string | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newAlbumName, setNewAlbumName] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fetch user's albums when the dropdown opens
  useEffect(() => {
    const fetchAlbums = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch('/api/albums'); // Use existing GET endpoint
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to fetch albums');
        }
        const data = await response.json();
        // Ensure data is an array; handle potential non-array responses gracefully
        setAlbums(Array.isArray(data) ? data : []);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'An unknown error occurred';
        setError(message);
        console.error("Error fetching albums:", err);
        setAlbums([]); // Clear albums on error
      } finally {
        setIsLoading(false);
      }
    };
    fetchAlbums();
  }, []); // Fetch only once when the component mounts (becomes visible)

  // Handle click outside to close dropdown
   useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef, onClose]);


  const handleSelectAlbum = async (albumId: string) => {
    setIsSubmitting(true);
    setError(null);
    try {
      await onAddToAlbum(albumId, recipeId);
      onClose(); // Close dropdown on success
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add to album');
       setIsSubmitting(false); // Only reset on error, success closes
    }
    // No finally block for setIsSubmitting here, as success closes the component
  };

  const handleCreateAlbumSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAlbumName.trim()) return;
    setIsSubmitting(true);
    setError(null);
    try {
      await onCreateAndAddAlbum(newAlbumName.trim(), recipeId);
      onClose(); // Close dropdown on success
    } catch (err) {
       setError(err instanceof Error ? err.message : 'Failed to create album');
       setIsSubmitting(false); // Only reset on error, success closes
    }
     // No finally block for setIsSubmitting here, as success closes the component
  };

  return (
    <div
      ref={dropdownRef}
      className="absolute right-0 mt-2 w-60 bg-white rounded-md shadow-lg border border-gray-200 z-50 p-3"
      onClick={(e) => e.stopPropagation()} // Prevent clicks inside from closing immediately if parent handles it
    >
      {isLoading && (
          <div className="flex justify-center items-center p-4">
              <LoadingSpinner />
          </div>
      )}

      {!isLoading && !showCreateForm && (
        <>
          <p className="text-xs text-gray-500 mb-2 px-1">Add to Album</p>
          <ul className="space-y-1 max-h-48 overflow-y-auto">
            {/* TODO: Add "General" or default option if desired */}
            {albums.length === 0 && !error && (
                 <li className="text-sm text-gray-500 px-2 py-1">No albums yet.</li>
            )}
            {albums.map((album) => (
              <li key={album.id}>
                <button
                  onClick={() => handleSelectAlbum(album.id)}
                  className="w-full text-left text-sm px-2 py-1.5 rounded hover:bg-gray-100 disabled:opacity-50 flex items-center"
                  disabled={isSubmitting}
                >
                  {/* Basic Folder Icon */}
                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-2 text-gray-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
                  </svg>
                  {album.name}
                  {isSubmitting && <LoadingSpinner />} 
                </button>
              </li>
            ))}
          </ul>
          <div className="border-t border-gray-200 mt-2 pt-2">
            <button
              onClick={() => setShowCreateForm(true)}
              className="w-full text-left text-sm px-2 py-1.5 rounded text-blue-600 hover:bg-blue-50 disabled:opacity-50 flex items-center"
              disabled={isSubmitting}
            >
              {/* Plus Icon */}
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              Create New Album
            </button>
          </div>
        </>
      )}

      {showCreateForm && (
        <form onSubmit={handleCreateAlbumSubmit} className="space-y-2">
           <p className="text-xs text-gray-500 mb-1 px-1">Create New Album</p>
          <input
            type="text"
            value={newAlbumName}
            onChange={(e) => setNewAlbumName(e.target.value)}
            placeholder="Album name..."
            className="w-full px-2 py-1.5 border rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
            disabled={isSubmitting}
            autoFocus // Focus input when form appears
          />
          <div className="flex justify-end space-x-2 pt-1">
            <button
              type="button"
              onClick={() => setShowCreateForm(false)}
              className="px-2 py-1 rounded border text-xs text-gray-700 hover:bg-gray-100 disabled:opacity-50"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-2 py-1 rounded bg-blue-600 text-white text-xs hover:bg-blue-700 disabled:opacity-50 flex items-center"
              disabled={isSubmitting || !newAlbumName.trim()}
            >
              {isSubmitting ? <LoadingSpinner /> : null}
              Create & Add
            </button>
          </div>
        </form>
      )}

       {error && (
           <p className="text-red-500 text-xs mt-2 p-1 bg-red-50 rounded border border-red-200">
               Error: {error}
           </p>
       )}
    </div>
  );
} 