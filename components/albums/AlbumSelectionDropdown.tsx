import React, { useState, useEffect, useRef } from 'react';
import { Album } from '@prisma/client'; // Assuming Prisma client type resolves
import LoadingSpinner from '@/components/shared/LoadingSpinner';

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
  const [isLoading, setIsLoading] = useState(true); // Start loading true
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
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

  // Modified to handle creation directly
  const handleCreateAlbum = async () => {
    const trimmedName = newAlbumName.trim();
    if (!trimmedName) return;
    setIsSubmitting(true);
    setError(null);
    try {
      await onCreateAndAddAlbum(trimmedName, recipeId);
      onClose();
    } catch (err) {
       setError(err instanceof Error ? err.message : 'Failed to create album');
       setIsSubmitting(false);
    }
  };

  // Handle Enter key in input
  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent default form submission if wrapped in form
      handleCreateAlbum();
    }
  };

  return (
    <div
      ref={dropdownRef}
      className="absolute right-0 mt-2 w-60 bg-white rounded-md shadow-lg border border-gray-200 z-50 p-3 space-y-2"
      onClick={(e) => e.stopPropagation()} // Prevent clicks inside from closing immediately if parent handles it
    >
      {/* Input for creating new album - Always visible */}
      <div className="relative">
        <input
          type="text"
          value={newAlbumName}
          onChange={(e) => setNewAlbumName(e.target.value)}
          onKeyDown={handleInputKeyDown} // Handle Enter key
          placeholder="Create new album..."
          className="w-full px-2 py-1.5 border rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:bg-gray-100"
          disabled={isSubmitting}
          aria-label="Create new album"
        />
         {/* Optional: Add a visual cue like a small + button inside or next to input if desired */}
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200"></div>

      {/* Album List Section */}
      <div className="space-y-1">
        <p className="text-xs text-gray-500 px-1">Add to existing album</p>
        {isLoading && (
            <div className="flex justify-center items-center py-2">
                <LoadingSpinner />
            </div>
        )}
        {!isLoading && (
          <ul className="space-y-1 max-h-40 overflow-y-auto"> {/* Added scrolling */}
            {albums.length === 0 && !error && (
                 <li className="text-sm text-gray-500 px-2 py-1">No albums yet.</li>
            )}
            {albums.map((album) => (
              <li key={album.id}>
                <button
                  onClick={() => handleSelectAlbum(album.id)}
                  className="w-full text-left text-sm px-2 py-1.5 rounded hover:bg-gray-100 disabled:opacity-50 flex items-center gap-2" // Added gap
                  disabled={isSubmitting}
                >
                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-gray-400 flex-shrink-0"> {/* Added flex-shrink-0 */}
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
                  </svg>
                  <span className="truncate">{album.name}</span> {/* Added truncate */} 
                  {/* Removed LoadingSpinner from here, handled globally by isSubmitting disable */}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

       {error && (
           <p className="text-red-500 text-xs mt-2 p-1 bg-red-50 rounded border border-red-200">
               Error: {error}
           </p>
       )}
    </div>
  );
} 