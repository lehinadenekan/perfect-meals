'use client';

// Added useEffect
import React, { useState, useCallback, useEffect } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
// Added Check icon
import { ImageUp, LibraryBig, Loader2, X, Check, Trash2, Pencil, FileText } from 'lucide-react';
import Image from 'next/image';
// Added missing server actions
import { updateAlbumCoverWithUpload, getRecipeImagesForAlbum, updateAlbumCoverWithUrl, removeAlbumCover, renameAlbum } from '@/lib/actions/albumActions';
import { useDropzone } from 'react-dropzone';
import toast from 'react-hot-toast';
import { Input } from "@/components/ui/input"; // Import Input if using Shadcn

interface AlbumCoverModalProps {
    albumId: string | null;
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void; // To refresh album list/UI after successful update
    currentCoverUrl?: string | null; // Added prop for current cover
    currentAlbumName?: string; // Added prop for current name
    currentDescription?: string | null;
    onOpenDescriptionEditor: () => void;
}

export default function AlbumCoverModal({
    albumId,
    isOpen,
    onClose,
    onSuccess,
    currentCoverUrl, // Destructure new prop
    currentAlbumName,
    currentDescription,
    onOpenDescriptionEditor,
}: AlbumCoverModalProps) {
    const [view, setView] = useState<'initial' | 'upload' | 'select' | 'rename'>('initial');
    const [isLoading, setIsLoading] = useState(false); // General loading state for save actions
    const [error, setError] = useState<string | null>(null); // General error state for save actions

    // --- State for Upload View ---
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    // --- End State for Upload View ---

    // --- State for Select View ---
    const [recipeImages, setRecipeImages] = useState<string[]>([]);
    const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null);
    const [isFetchingImages, setIsFetchingImages] = useState(false); // Loading state specifically for fetching images
    const [fetchError, setFetchError] = useState<string | null>(null); // Error state specifically for fetching images
    // --- End State for Select View ---

    // --- State for Rename View ---
    const [newNameInput, setNewNameInput] = useState(currentAlbumName || '');
    // --- End State for Rename View ---

    // Reset state when modal closes or albumId changes
    useEffect(() => {
        if (!isOpen) {
            const timer = setTimeout(() => {
                setView('initial');
                setError(null);
                setIsLoading(false);
                setSelectedFile(null);
                setPreviewUrl(null);
                // Reset select state
                setRecipeImages([]);
                setSelectedImageUrl(null);
                setIsFetchingImages(false);
                setFetchError(null);
                setNewNameInput(''); // Reset rename input
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    // Reset view/state if albumId changes while modal is open
    useEffect(() => {
        setView('initial');
        setError(null);
        setIsLoading(false);
        setSelectedFile(null);
        setPreviewUrl(null);
        // Reset select state
        setRecipeImages([]);
        setSelectedImageUrl(null);
        setIsFetchingImages(false);
        setFetchError(null);
        setNewNameInput(currentAlbumName || ''); // Reset rename input based on prop
    }, [albumId, currentAlbumName]); // Depend on currentAlbumName too

    // --- Pre-fill rename input when view changes --- 
    useEffect(() => {
        if (view === 'rename') {
            setNewNameInput(currentAlbumName || '');
            setError(null); // Clear errors when switching to rename
        }
    }, [view, currentAlbumName]);

    // --- Fetch Recipe Images Effect ---
    useEffect(() => {
        if (view === 'select' && isOpen && albumId) {
            const fetchImages = async () => {
                setIsFetchingImages(true);
                setFetchError(null);
                setSelectedImageUrl(null); // Clear previous selection
                try {
                    const images = await getRecipeImagesForAlbum(albumId);
                    setRecipeImages(images);
                    if (images.length === 0) {
                         setFetchError("No recipe images found in this album."); // Use fetchError to display info
                    }
                } catch (err) {
                    const message = err instanceof Error ? err.message : 'Failed to load recipe images.';
                    setFetchError(message);
                    console.error("Fetch Recipe Images Error:", err);
                } finally {
                    setIsFetchingImages(false);
                }
            };
            fetchImages();
        }
    }, [view, isOpen, albumId]); // Rerun when view becomes 'select' or albumId changes

    // --- Dropzone Handler ---
    const onDrop = useCallback((acceptedFiles: File[]) => {
        setError(null);
        const file = acceptedFiles[0];
        if (file) {
            const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
            const maxSizeMB = 2;
            if (!allowedTypes.includes(file.type)) {
                setError(`Invalid file type. Allowed: ${allowedTypes.join(', ')}`);
                return;
            }
            if (file.size > maxSizeMB * 1024 * 1024) {
                setError(`File too large. Max size: ${maxSizeMB}MB`);
                return;
            }
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onloadend = () => setPreviewUrl(reader.result as string);
            reader.readAsDataURL(file);
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } =
        useDropzone({ onDrop, accept: { 'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp'] }, multiple: false });
    // --- End Dropzone Handler ---

    const handleClose = () => {
        if (isLoading) return;
        onClose();
    };

    // --- Upload Handler ---
    const handleUpload = async () => {
        if (!selectedFile || !albumId) return;
        setIsLoading(true);
        setError(null);
        const formData = new FormData();
        formData.append('coverImageFile', selectedFile);
        try {
            await updateAlbumCoverWithUpload(albumId, formData);
            toast.success('Album cover updated!');
            onSuccess();
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Failed to upload image.';
            setError(message);
            toast.error(`Upload failed: ${message}`);
            console.error("Upload Error:", err);
        } finally {
            setIsLoading(false);
        }
    };
    // --- End Upload Handler ---

    // --- Select Confirm Handler ---
    const handleSelectConfirm = async () => {
        if (!selectedImageUrl || !albumId) return;

        let absoluteImageUrl = selectedImageUrl;

        // Check if the URL is relative (starts with '/') and construct absolute URL if needed
        if (absoluteImageUrl.startsWith('/')) {
            absoluteImageUrl = `${window.location.origin}${absoluteImageUrl}`;
        }

        // Optional: Add a quick check here if it's *still* not a valid URL format after potential modification
        try {
            new URL(absoluteImageUrl); // Basic check if it parses as a URL
        } catch (_) {
            setError("Selected image has an invalid URL format.");
            toast.error("Update failed: Invalid image URL format.");
            return; // Stop execution
        }

        setIsLoading(true);
        setError(null);
        try {
            // Use the potentially modified absoluteImageUrl
            await updateAlbumCoverWithUrl(albumId, absoluteImageUrl);
            toast.success('Album cover updated!');
            onSuccess(); // Close modal and refresh list
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Failed to update cover.';
            setError(message); // Set general error for display near button
            toast.error(`Update failed: ${message}`);
            console.error("Select Confirm Error:", err);
        } finally {
            setIsLoading(false);
        }
    };
    // --- End Select Confirm Handler ---

    // --- Remove Cover Handler --- 
    const handleRemoveCover = async () => {
        if (!albumId) return;

        setIsLoading(true);
        setError(null);
        try {
            console.log(`Attempting to remove cover for album: ${albumId}`);
            // --- Call removeAlbumCover server action --- 
            await removeAlbumCover(albumId);
            toast.success('Cover image removed!'); 
            onSuccess();
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Failed to remove cover image.';
            setError(message);
            toast.error(`Removal failed: ${message}`);
            console.error("Remove Cover Error:", err);
        } finally {
            setIsLoading(false);
        }
    };
    // --- End Remove Cover Handler ---

    if (!isOpen || !albumId) {
        return null;
    }

    // Helper to go back and clear errors/selection
    const handleGoBack = () => {
        setView('initial');
        setError(null);
        setFetchError(null);
        setSelectedImageUrl(null);
        setSelectedFile(null);
        setPreviewUrl(null);
    }

    // --- Rename Save Handler --- 
    const handleRenameSave = async () => {
        // Basic check + ensure name actually changed
        if (!albumId || !newNameInput || newNameInput.trim() === (currentAlbumName || '').trim()) {
             // Optionally set an error if name is empty after trimming, though Zod handles on server
             if (!newNameInput.trim()) setError("Album name cannot be empty.");
             return; 
        }
        
        setIsLoading(true);
        setError(null);
        try {
            // Call the server action
            await renameAlbum(albumId, newNameInput.trim()); // Trim whitespace before sending
            toast.success('Album renamed!');
            onSuccess(); // Close modal and trigger refresh in parent

        } catch (err) {
            const message = err instanceof Error ? err.message : 'Failed to rename album.';
            setError(message); // Display error below input
            toast.error(`Rename failed: ${message}`);
            console.error("Rename Save Error:", err);
        } finally {
            setIsLoading(false);
        }
    };
    // --- End Rename Save Handler ---

    return (
        // Increased max-width for select view grid
        <Dialog open={isOpen} onOpenChange={(open: boolean) => !open && handleClose()}>
            <DialogContent className="sm:max-w-lg" onInteractOutside={handleClose}>
                <DialogHeader>
                    <DialogTitle>
                         {view === 'rename' ? 'Rename Album' : 'Change Album Cover'}
                    </DialogTitle>
                    {/* Add/update descriptions */}
                    {view === 'initial' && <DialogDescription>Manage cover image, description, or rename this album.</DialogDescription>}
                    {view === 'upload' && <DialogDescription>Upload a new image (JPEG, PNG, GIF, WebP, max 2MB).</DialogDescription>}
                    {view === 'select' && <DialogDescription>Select an image from recipes already in this album.</DialogDescription>}
                    {view === 'rename' && <DialogDescription>Enter the new name for the album &quot;{currentAlbumName}&quot;.</DialogDescription>}
                </DialogHeader>

                {/* --- Initial View --- */}
                {view === 'initial' && (
                    <div className="py-4 space-y-4">
                        <Button
                            variant="outline"
                            className="w-full justify-start"
                            onClick={() => setView('upload')}
                            disabled={isLoading}
                        >
                            <ImageUp className="mr-2 h-4 w-4" />
                            Upload New Image
                        </Button>
                        <Button
                            variant="outline"
                            className="w-full justify-start"
                            onClick={() => { setView('select'); setError(null); setFetchError(null); }}
                            disabled={isLoading}
                        >
                            <LibraryBig className="mr-2 h-4 w-4" />
                            Choose from Recipe Images
                        </Button>
                        {/* Conditionally render Remove button */} 
                        {currentCoverUrl && (
                            <Button
                                variant="outline"
                                className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200 hover:border-red-300"
                                onClick={handleRemoveCover} // Use the new handler
                                disabled={isLoading}
                            >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Remove Cover Image
                            </Button>
                        )}
                        {/* --- Rename Button --- */}
                         <Button
                            variant="outline"
                            className="w-full justify-start"
                            onClick={() => setView('rename')} // Switch to rename view
                            disabled={isLoading}
                        >
                            <Pencil className="mr-2 h-4 w-4" />
                            Rename Recipe Album
                        </Button>
                        {/* --- START: Add/Edit Description Button --- */}
                        <Button
                            variant="outline"
                            className="w-full justify-start"
                            onClick={onOpenDescriptionEditor} // Call the new prop
                            disabled={isLoading}
                        >
                            <FileText className="mr-2 h-4 w-4" />
                            {/* Dynamic text based on currentDescription */} 
                            {currentDescription ? 'Edit Description' : 'Add Description'}
                        </Button>
                         {/* --- END: Add/Edit Description Button --- */}
                        {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
                    </div>
                )}

                {/* --- Rename View --- */}
                {view === 'rename' && (
                    <div className="py-4 space-y-3">
                         <label htmlFor="album-new-name" className="text-sm font-medium text-gray-700">
                              New album name
                         </label>
                         <Input
                            id="album-new-name"
                            value={newNameInput}
                            onChange={(e) => setNewNameInput(e.target.value)}
                            placeholder="Enter new album name"
                            disabled={isLoading}
                        />
                         {/* General error shown below input if save fails */}
                         {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
                    </div>
                )}

                {/* --- Upload View --- */}
                {view === 'upload' && (
                    <div className="py-4 space-y-4">
                        <div
                            {...getRootProps()}
                            className={`mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6 cursor-pointer hover:border-yellow-500 transition-colors ${isDragActive ? 'border-yellow-500 bg-yellow-50' : ''}`}
                        >
                            <div className="space-y-1 text-center">
                                <ImageUp className="mx-auto h-12 w-12 text-gray-400" />
                                <div className="flex text-sm text-gray-600">
                                    <label
                                        htmlFor="file-upload"
                                        className="relative cursor-pointer rounded-md bg-white font-medium text-yellow-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-yellow-500 focus-within:ring-offset-2 hover:text-yellow-500"
                                    >
                                        <span>Upload a file</span>
                                        <input {...getInputProps()} id="file-upload" name="file-upload" type="file" className="sr-only" />
                                    </label>
                                    <p className="pl-1">or drag and drop</p>
                                </div>
                                <p className="text-xs text-gray-500">PNG, JPG, GIF, WEBP up to 2MB</p>
                            </div>
                        </div>

                        {previewUrl && (
                            <div className="mt-4 relative w-full aspect-video border rounded-md overflow-hidden">
                                <Image src={previewUrl} alt="Preview" fill style={{ objectFit: 'contain' }} />
                                <Button
                                    variant="destructive"
                                    size="icon"
                                    className="absolute top-1 right-1 h-6 w-6 z-10"
                                    onClick={() => { setPreviewUrl(null); setSelectedFile(null); }}
                                    disabled={isLoading} // Disable X while saving
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>
                        )}
                        {/* Upload-specific error shown here */}
                        {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
                    </div>
                )}

                {/* --- Select View --- */}
                {view === 'select' && (
                    <div className="py-4">
                        {isFetchingImages && (
                            <div className="flex justify-center items-center min-h-[150px]">
                                <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
                            </div>
                        )}
                         {/* Display fetch error OR no images message */}
                        {fetchError && !isFetchingImages && (
                             <p className="text-center text-gray-600 py-4">{fetchError}</p>
                        )}
                        {!isFetchingImages && !fetchError && recipeImages.length > 0 && (
                            <div className="grid grid-cols-3 gap-2 max-h-[400px] overflow-y-auto">
                                {recipeImages.map((imageUrl) => (
                                    <button
                                        key={imageUrl}
                                        type="button"
                                        onClick={() => setSelectedImageUrl(imageUrl)}
                                        disabled={isLoading} // Disable selection while saving
                                        className={`relative aspect-square rounded border-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-all duration-150 ${ 
                                            selectedImageUrl === imageUrl
                                                ? 'border-yellow-500 ring-2 ring-yellow-500 ring-offset-2'
                                                : 'border-transparent hover:border-gray-400' // Slightly darker hover border
                                        } ${isLoading ? 'cursor-not-allowed opacity-75' : 'cursor-pointer'}`}
                                    >
                                        <Image
                                            src={imageUrl}
                                            alt="Recipe image option"
                                            fill
                                            sizes="33vw" // Adjust sizes as needed
                                            className="object-cover rounded"
                                        />
                                        {selectedImageUrl === imageUrl && (
                                            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center rounded">
                                                <Check className="h-6 w-6 text-white" />
                                            </div>
                                        )}
                                        {selectedImageUrl !== imageUrl && (
                                            <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-colors duration-150 rounded flex items-center justify-center">
                                                
                                            </div>
                                        )}
                                    </button>
                                ))}
                            </div>
                        )}
                         {/* General error shown below grid if save fails */}
                         {error && <p className="text-sm text-red-500 mt-3">{error}</p>}
                    </div>
                )}


                <DialogFooter className="mt-4 sm:justify-between">
                    {/* Back Button */}
                    {view !== 'initial' && (
                         <Button variant="ghost" onClick={handleGoBack} disabled={isLoading}>
                            Back
                         </Button>
                    )}
                    {/* Filler div to push Save button right when Back is present */}
                    {view === 'initial' && <div />}

                    {/* Save Upload Button */}
                    {view === 'upload' && (
                        <Button onClick={handleUpload} disabled={!selectedFile || isLoading}>
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Save Upload
                        </Button>
                    )}
                    {/* Confirm Selection Button */}
                     {view === 'select' && (
                        <Button onClick={handleSelectConfirm} disabled={!selectedImageUrl || isLoading}>
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Confirm Selection
                        </Button>
                    )}
                    {/* --- Save Rename Button --- */}
                     {view === 'rename' && (
                        <Button 
                            onClick={handleRenameSave} 
                            disabled={!newNameInput || newNameInput === currentAlbumName || isLoading}
                        >
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Save Name
                        </Button>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}