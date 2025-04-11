import React, { useState, useEffect, useRef } from 'react';
// Remove the import for the non-existent Modal component
// import Modal from '../shared/Modal'; 
import { Album } from '@prisma/client'; // Assuming Album type from Prisma

interface AlbumSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipeId: string | null; // ID of the recipe to add
  // We'll need functions to handle adding to an album and creating a new one
  onAddToAlbum: (albumId: string, recipeId: string) => Promise<void>; 
  onCreateAndAddAlbum: (albumName: string, recipeId: string) => Promise<void>;
}

export default function AlbumSelectionModal({
  isOpen,
  onClose,
  recipeId,
  onAddToAlbum,
  onCreateAndAddAlbum,
}: AlbumSelectionModalProps) {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newAlbumName, setNewAlbumName] = useState('');
  // Add a ref for the dialog element
  const dialogRef = useRef<HTMLDialogElement>(null);

  // Fetch user's albums when the modal opens (and recipeId is available)
  useEffect(() => {
    // Add effect to control dialog open/close state based on isOpen prop
    const dialogElement = dialogRef.current;
    if (dialogElement) {
      if (isOpen) {
        if (!dialogElement.hasAttribute('open')) {
            dialogElement.showModal();
        }
      } else {
         if (dialogElement.hasAttribute('open')) {
            dialogElement.close();
        }
      }
    }
    // Keep the album fetching logic within the same or separate effect
    if (isOpen && recipeId) {
      const fetchAlbums = async () => {
        setIsLoading(true);
        setError(null);
        try {
          // TODO: Replace with actual API call
          const response = await fetch('/api/albums'); 
          if (!response.ok) throw new Error('Failed to fetch albums');
          const data = await response.json();
          setAlbums(data.albums || []); 
        } catch (err) {
          setError(err instanceof Error ? err.message : 'An unknown error occurred');
          console.error("Error fetching albums:", err);
        } finally {
          setIsLoading(false);
        }
      };
      fetchAlbums();
    } else {
      // Reset state when modal closes or opens without a recipeId
      setAlbums([]);
      setError(null);
      setShowCreateForm(false);
      setNewAlbumName('');
    }
  }, [isOpen, recipeId]);

  // Modified close handler to also close the dialog
  const handleClose = () => {
      if (dialogRef.current?.hasAttribute('open')) {
          dialogRef.current.close();
      }
      onClose(); // Call the original onClose prop
  };

  // Prevent backdrop click from closing if clicking inside the dialog content
  const stopPropagation = (e: React.MouseEvent) => e.stopPropagation();

  const handleSelectAlbum = async (albumId: string) => {
    if (!recipeId) return;
    setIsLoading(true);
    try {
      await onAddToAlbum(albumId, recipeId);
      handleClose(); // Use the modified close handler
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add to album');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateAlbum = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipeId || !newAlbumName.trim()) return;
    setIsLoading(true);
    try {
      await onCreateAndAddAlbum(newAlbumName.trim(), recipeId);
      setNewAlbumName('');
      setShowCreateForm(false);
      handleClose(); // Use the modified close handler
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create album');
    } finally {
      setIsLoading(false);
    }
  };

  // Replace Modal with dialog element
  return (
    <dialog 
      ref={dialogRef}
      onClose={handleClose} // Handles ESC key closing
      onClick={handleClose} // Basic backdrop click closing
      className="rounded-lg shadow-xl p-0 backdrop:bg-black backdrop:opacity-50"
    >
      {/* Add a container to prevent clicks inside closing the dialog */}
      <div className="p-4 relative w-80" onClick={stopPropagation}>
         {/* Add an explicit close button */}
        <button 
          onClick={handleClose}
          className="absolute top-2 right-2 p-1 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600"
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 className="text-lg font-semibold mb-4 pr-8">Add Recipe to Album</h2> 
        
        {isLoading && <p>Loading...</p>}
        {error && <p className="text-red-500 text-sm mb-3">Error: {error}</p>}

        {/* Album List */}
        {!showCreateForm && (
          <ul className="space-y-2 max-h-60 overflow-y-auto mb-4">
            {/* "General" or default option - adjust logic as needed */}
            {/* Assuming a predefined "General" album concept or ID */}
            {/* Example: <li key="general"> <button onClick={() => handleSelectAlbum('GENERAL_ALBUM_ID')}>General</button> </li> */}
            
            {albums.map((album) => (
              <li key={album.id}>
                <button 
                  onClick={() => handleSelectAlbum(album.id)}
                  className="w-full text-left px-3 py-2 rounded hover:bg-gray-100 disabled:opacity-50"
                  disabled={isLoading}
                >
                  {album.name}
                </button>
              </li>
            ))}
          </ul>
        )}

        {/* Create New Album Section */}
        {!showCreateForm ? (
          <button 
            onClick={() => setShowCreateForm(true)}
            className="w-full px-3 py-2 rounded text-blue-600 hover:bg-blue-50 disabled:opacity-50"
            disabled={isLoading}
          >
            + Create New Album
          </button>
        ) : (
          <form onSubmit={handleCreateAlbum} className="space-y-3">
            <input
              type="text"
              value={newAlbumName}
              onChange={(e) => setNewAlbumName(e.target.value)}
              placeholder="New album name..."
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
              disabled={isLoading}
            />
            <div className="flex justify-end space-x-2">
              <button 
                type="button" 
                onClick={() => setShowCreateForm(false)}
                className="px-3 py-1 rounded border text-gray-700 hover:bg-gray-100 disabled:opacity-50"
                disabled={isLoading}
              >
                Cancel
              </button>
              <button 
                type="submit"
                className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
                disabled={isLoading || !newAlbumName.trim()}
              >
                Create & Add
              </button>
            </div>
          </form>
        )}
        
        {/* Close Button (optional, if Modal doesn't provide one) */}
        {/* <button onClick={onClose} className="absolute top-2 right-2 p-1"> <XMarkIcon className="w-5 h-5" /> </button> */}
      </div>
    </dialog>
  );
} 