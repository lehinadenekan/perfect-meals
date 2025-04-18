'use client';

import React, { useState, useEffect } from 'react';
import {
    Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

interface EditDescriptionModalProps {
    isOpen: boolean;
    onClose: () => void;
    albumId: string | null;
    currentDescription: string | null | undefined;
    onSuccess: () => void; // Callback after successful save
}

const EditDescriptionModal: React.FC<EditDescriptionModalProps> = ({ 
    isOpen, 
    onClose, 
    albumId, 
    currentDescription, 
    onSuccess 
}) => {
    const [description, setDescription] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Update state when currentDescription prop changes (e.g., when modal opens)
    useEffect(() => {
        if (isOpen) {
            setDescription(currentDescription || '');
        }
    }, [isOpen, currentDescription]);

    const handleSave = async () => {
        if (!albumId) return;

        setIsLoading(true);
        const toastId = toast.loading('Saving description...');

        try {
            // --- Implement API Call --- 
            const response = await fetch(`/api/albums/${albumId}`, {
                method: 'PATCH', // Use PATCH for partial updates
                headers: {
                    'Content-Type': 'application/json',
                },
                // Send only the description field
                body: JSON.stringify({ description: description }),
            });

            // Check if the request was successful
            if (!response.ok) {
                // Try to parse error message from response body
                let errorMsg = 'Failed to save description.';
                try {
                    const errorData = await response.json();
                    errorMsg = errorData.error || errorMsg;
                } catch (parseError) {
                    // Ignore if response body isn't valid JSON
                    console.error("Failed to parse error response:", parseError);
                }
                throw new Error(errorMsg);
            }
            // --- End API Call --- 

            toast.success('Description saved!', { id: toastId });
            onSuccess(); // Trigger refresh in parent
            onClose(); // Close this modal

        } catch (error) {
            console.error("Error saving description:", error);
            const message = error instanceof Error ? error.message : 'Could not save description.';
            toast.error(message, { id: toastId });
        } finally {
            setIsLoading(false);
        }
    };

    // Prevent closing while loading
    const handleClose = () => {
        if (!isLoading) {
            onClose();
        }
    }

    if (!isOpen) return null;

    return (
        <Dialog open={isOpen} onOpenChange={(open: boolean) => !open && handleClose()}>
            <DialogContent onInteractOutside={handleClose}>
                <DialogHeader>
                    <DialogTitle>{currentDescription ? 'Edit Album Description' : 'Add Album Description'}</DialogTitle>
                    <DialogDescription>
                        {currentDescription ? 'Modify the description for this album.' : 'Add a description to help organize your album.'}
                    </DialogDescription>
                </DialogHeader>

                <div className="py-4 space-y-2">
                    <Label htmlFor="album-description">Description</Label>
                    <Textarea
                        id="album-description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter a description... (optional)"
                        rows={4}
                        className="resize-none"
                        disabled={isLoading}
                    />
                </div>

                <DialogFooter>
                    <Button variant="ghost" onClick={handleClose} disabled={isLoading}>
                        Cancel
                    </Button>
                    <Button onClick={handleSave} disabled={isLoading}>
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Save Description
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default EditDescriptionModal; 