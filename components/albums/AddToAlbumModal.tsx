'use client';

import React, { useState, useEffect, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Album } from '@prisma/client';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface AddToAlbumModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipeId: string | null;
}

interface AlbumWithCount extends Album {
  recipeCount?: number;
}

const AddToAlbumModal: React.FC<AddToAlbumModalProps> = ({ isOpen, onClose, recipeId }) => {
  const [albums, setAlbums] = useState<AlbumWithCount[]>([]);
  const [selectedAlbumId, setSelectedAlbumId] = useState<string | null>(null);
  const [newAlbumName, setNewAlbumName] = useState('');
  // Separate loading states for clarity
  const [isLoadingAlbums, setIsLoadingAlbums] = useState(false);
  const [isAddingToExisting, setIsAddingToExisting] = useState(false);
  const [isCreatingNew, setIsCreatingNew] = useState(false);

  // Fetch user's albums when the modal opens and recipeId is available
  useEffect(() => {
    if (isOpen && recipeId) {
      const fetchAlbums = async () => {
        setIsLoadingAlbums(true);
        try {
          const response = await fetch('/api/albums'); // GET request by default
          if (!response.ok) {
            const errorData = await response.json().catch(() => ({})); // Try parsing error, default to empty object
            throw new Error(errorData.error || 'Failed to fetch albums');
          }
          const data: AlbumWithCount[] = await response.json();
          setAlbums(data || []);
          setSelectedAlbumId(null); // Reset selection
          setNewAlbumName(''); // Reset new album name
        } catch (error) {
          console.error("Error fetching albums:", error);
          toast.error(error instanceof Error ? error.message : 'Could not load your albums.');
          setAlbums([]); // Clear albums on error
        } finally {
          setIsLoadingAlbums(false);
        }
      };
      fetchAlbums();
    }
  }, [isOpen, recipeId]);

  const handleAddToExistingAlbum = async () => {
    if (!selectedAlbumId || !recipeId) {
      toast.error('Please select an album.');
      return;
    }
    setIsAddingToExisting(true);
    const selectedAlbum = albums.find(a => a.id === selectedAlbumId);
    const toastId = toast.loading(`Adding to "${selectedAlbum?.name || 'album'}"...`);

    try {
      const response = await fetch(`/api/albums/${selectedAlbumId}/recipes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ recipeId }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to add recipe');
      }

      toast.success(`Recipe added to "${selectedAlbum?.name || 'album'}"!`, { id: toastId });
      onClose(); // Close modal on success
    } catch (error) {
      console.error("Error adding to existing album:", error);
      toast.error(error instanceof Error ? error.message : 'Could not add recipe to the selected album.', { id: toastId });
    } finally {
      setIsAddingToExisting(false);
    }
  };

  const handleCreateAndAddAlbum = async () => {
    const trimmedName = newAlbumName.trim();
    if (!trimmedName || !recipeId) {
      toast.error('Please enter a name for the new album.');
      return;
    }
    setIsCreatingNew(true);
    const toastId = toast.loading(`Creating "${trimmedName}"...`);

    try {
      const response = await fetch('/api/albums', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: trimmedName, recipeId }), // Send recipeId with creation request
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to create album');
      }

      toast.success(`Album "${trimmedName}" created and recipe added!`, { id: toastId });
      onClose(); // Close modal on success
    } catch (error) {
      console.error("Error creating album:", error);
      toast.error(error instanceof Error ? error.message : 'Could not create the new album.', { id: toastId });
    } finally {
      setIsCreatingNew(false);
    }
  };

  const isBusy = isLoadingAlbums || isAddingToExisting || isCreatingNew;

  return (
    <Transition appear show={isOpen} as={Fragment}>
      {/* Wrap onClose with check for busy state */}
      <Dialog as="div" className="relative z-50" onClose={() => !isBusy && onClose()}>
        {/* ... Transition.Child for overlay ... */}
         <Transition.Child
           as={Fragment}
           enter="ease-out duration-300"
           enterFrom="opacity-0"
           enterTo="opacity-100"
           leave="ease-in duration-200"
           leaveFrom="opacity-100"
           leaveTo="opacity-0"
         >
           <div className="fixed inset-0 bg-black bg-opacity-25" />
         </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            {/* ... Transition.Child for panel ... */}
             <Transition.Child
               as={Fragment}
               enter="ease-out duration-300"
               enterFrom="opacity-0 scale-95"
               enterTo="opacity-100 scale-100"
               leave="ease-in duration-200"
               leaveFrom="opacity-100 scale-100"
               leaveTo="opacity-0 scale-95"
             >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 mb-4"
                >
                  Add Recipe to Album
                </Dialog.Title>

                {isLoadingAlbums ? (
                  <div className="text-center py-4">Loading albums...</div>
                ) : (
                  <div className="space-y-4">
                    {/* Existing Albums Section */}
                    {albums.length > 0 && (
                      <fieldset className="space-y-2" disabled={isBusy}>
                        <legend className="text-sm font-medium text-gray-700">Select an existing album:</legend>
                        <div className="max-h-40 overflow-y-auto space-y-1 pr-2"> {/* Scrollable list */}
                          {albums.map((album) => (
                            <div key={album.id} className="flex items-center">
                              <input
                                id={`album-${album.id}`}
                                name="existingAlbum"
                                type="radio"
                                checked={selectedAlbumId === album.id}
                                onChange={() => setSelectedAlbumId(album.id)}
                                className="h-4 w-4 text-yellow-600 border-gray-300 focus:ring-yellow-500 disabled:opacity-50"
                                disabled={isBusy} // Disable input when busy
                              />
                              <Label htmlFor={`album-${album.id}`} className={`ml-3 block text-sm font-medium ${isBusy ? 'text-gray-400' : 'text-gray-700'}`}>
                                {album.name} ({album.recipeCount ?? 0} recipes)
                              </Label>
                            </div>
                          ))}
                        </div>
                        <Button
                          onClick={handleAddToExistingAlbum}
                          disabled={!selectedAlbumId || isBusy}
                          className="w-full mt-2"
                        >
                          {isAddingToExisting ? 'Adding...' : 'Add to Selected Album'}
                        </Button>
                      </fieldset>
                    )}

                    {/* Separator */}
                    {albums.length > 0 && (
                        <div className="relative my-4">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="relative flex justify-center">
                                <span className="bg-white px-2 text-sm text-gray-500">Or</span>
                            </div>
                        </div>
                    )}

                    {/* Create New Album Section */}
                    <fieldset className="space-y-2" disabled={isBusy}>
                      <legend className="text-sm font-medium text-gray-700">Create a new album:</legend>
                      <Input
                        type="text"
                        placeholder="Enter new album name (e.g., Quick Lunches)"
                        value={newAlbumName}
                        onChange={(e) => setNewAlbumName(e.target.value)}
                        disabled={isBusy} // Disable input when busy
                        className="w-full"
                      />
                      <Button
                        onClick={handleCreateAndAddAlbum}
                        disabled={!newAlbumName.trim() || isBusy}
                        className="w-full mt-2"
                        variant="secondary"
                      >
                        {isCreatingNew ? 'Creating...' : 'Create New Album & Add Recipe'}
                      </Button>
                    </fieldset>
                  </div>
                )}

                {/* Close Button - disable while busy */}
                <div className="mt-6 text-right">
                   <Button variant="outline" onClick={onClose} disabled={isBusy}>
                     Cancel
                   </Button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default AddToAlbumModal;
