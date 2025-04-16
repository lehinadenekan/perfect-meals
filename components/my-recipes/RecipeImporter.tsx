// components/my-recipes/RecipeImporter.tsx
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter for redirection
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import toast from 'react-hot-toast';
import Image from 'next/image'; // Import Image

// Keep interface matching scraper output
interface ImportedRecipeData {
  title: string;
  ingredients: string[];
  instructions: string[];
  description?: string;
  imageUrl?: string;
  servings?: string;
  totalTime?: string;
}

const RecipeImporter = () => {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [importedRecipe, setImportedRecipe] = useState<ImportedRecipeData | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter(); // Initialize router

  const handleImport = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setImportedRecipe(null);
    setIsSaving(false);

    if (!url.trim()) {
      setError('Please enter a valid URL.');
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch('/api/import-recipe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });
      const result = await response.json();
      if (!response.ok) {
         let detailedMessage = result.error || `Request failed with status ${response.status}`;
         // Simplified error detail handling for frontend
         if (typeof result.details === 'string') {
            detailedMessage = `${detailedMessage}: ${result.details}`;
         } else if (result.details?.url?.[0]) { // Handle Zod URL error specifically
             detailedMessage = `${detailedMessage}: ${result.details.url[0]}`;
         }
        throw new Error(detailedMessage);
      }
      if (result.data) {
        const data = result.data as ImportedRecipeData;
        if (data.title && Array.isArray(data.ingredients) && Array.isArray(data.instructions)) {
            setImportedRecipe(data);
            toast.success('Recipe data fetched successfully! Review and save.');
            setUrl('');
        } else {
             console.error("API returned success but data structure is invalid:", result.data);
             throw new Error('Received invalid recipe data structure from server.');
        }
      } else {
        throw new Error('Received successful response but no recipe data was found.');
      }
    } catch (err: unknown) {
      console.error('Import failed:', err);
      let message = 'An unexpected error occurred during import.';
      if (err instanceof Error) { message = err.message; }
      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  // --- Updated handleSaveRecipe ---
  const handleSaveRecipe = async () => {
    if (!importedRecipe) return;

    setIsSaving(true);
    setError(null);
    let toastId: string | undefined; // To manage loading toast

    try {
        toastId = toast.loading('Saving recipe...');

        // Call the new save endpoint
        const response = await fetch('/api/recipes/import', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            // Send the data that was fetched and displayed
            body: JSON.stringify(importedRecipe),
        });

        const result = await response.json();
        toast.dismiss(toastId); // Dismiss loading toast

        if (!response.ok) {
            // Handle errors from the save endpoint
            const errorMessage = result.error || `Save failed with status ${response.status}`;
             let detailedMessage = errorMessage;
             // Optionally show Zod validation details from save endpoint
             if (result.details) {
                const fieldErrors = Object.values(result.details).flat().join('. ');
                if (fieldErrors) detailedMessage = `${errorMessage}: ${fieldErrors}`;
             }
            throw new Error(detailedMessage);
        }

        // Success!
        toast.success("Recipe saved successfully!");
        setImportedRecipe(null); // Clear the preview

        // Optional: Redirect after save
        // Option A: Redirect to the 'My Recipes' page
         router.push('/my-recipes'); // Or the appropriate route
         router.refresh(); // Optional: Force refresh data on the target page

        // Option B: If the API returns the new recipe ID, redirect to its detail page
        // if (result.data?.id) {
        //     router.push(`/recipes/${result.data.id}`);
        // } else {
        //     router.push('/my-recipes'); // Fallback
        //     router.refresh();
        // }

    } catch (err) {
        if(toastId) toast.dismiss(toastId); // Ensure loading toast is dismissed on error
        console.error("Save failed:", err);
        let message = "An error occurred while saving the recipe.";
        if (err instanceof Error) { message = err.message; }
        setError(message); // Show error below the form
        toast.error(message);
    } finally {
        setIsSaving(false);
    }
  };
  // --- End Updated handleSaveRecipe ---


  return (
    <div className="max-w-2xl mx-auto mt-4 p-6 border rounded-lg shadow bg-white">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Import Recipe from URL</h2>
      {/* Fetch Form */}
      <form onSubmit={handleImport} className="space-y-4">
        <div>
          <label htmlFor="recipeUrl" className="block text-sm font-medium text-gray-700 mb-1">
            Recipe URL
          </label>
          <Input
            id="recipeUrl"
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://www.example-recipe-website.com/your-recipe"
            required
            className="w-full"
            disabled={isLoading || isSaving}
          />
        </div>
        <Button type="submit" disabled={isLoading || isSaving || !url.trim()} className="w-full">
          {isLoading ? <LoadingSpinner /> : 'Fetch Recipe'}
        </Button>
      </form>

      {/* Error Display */}
      {error && (
        <p className="mt-4 text-center text-red-600 bg-red-100 p-3 rounded-md">{error}</p>
      )}

       {/* Preview and Save Section */}
      {importedRecipe && !isLoading && (
        <div className="mt-6 p-4 border rounded bg-green-50">
          <h3 className="text-lg font-semibold text-green-800 mb-2">Imported Recipe Data (Preview):</h3>

          {/* Display basic info */}
          <p className="mb-1"><strong>Title:</strong> {importedRecipe.title}</p>
          {importedRecipe.description && <p className="text-sm text-gray-700 mb-1"><strong>Description:</strong> {importedRecipe.description}</p>}
          {importedRecipe.servings && <p className="text-sm text-gray-700 mb-1"><strong>Servings:</strong> {importedRecipe.servings}</p>}
          {importedRecipe.totalTime && <p className="text-sm text-gray-700 mb-1"><strong>Time:</strong> {importedRecipe.totalTime}</p>}

          {/* Display Image */}
           {importedRecipe.imageUrl && (
             <div className="my-2">
                <Image
                  src={importedRecipe.imageUrl}
                  alt={importedRecipe.title || 'Imported Recipe'}
                  width={300}
                  height={200}
                  className="max-w-xs max-h-48 rounded"
                  onError={(e) => { const t = e.target as HTMLImageElement; t.onerror = null; t.src = '/images/default-recipe.jpg'; }} // Basic fallback
                />
            </div>
           )}

          {/* Display Ingredients */}
          <div className="mt-3">
            <h4 className="font-semibold text-gray-700">Ingredients:</h4>
            <ul className="list-disc list-inside ml-4 text-sm text-gray-600 space-y-1">
              {importedRecipe.ingredients.map((ing, index) => (
                <li key={`ing-${index}`}>{ing}</li>
              ))}
            </ul>
          </div>

           {/* Display Instructions */}
          <div className="mt-3">
            <h4 className="font-semibold text-gray-700">Instructions:</h4>
            <ol className="list-decimal list-inside ml-4 text-sm text-gray-600 space-y-1">
              {importedRecipe.instructions.map((inst, index) => (
                <li key={`inst-${index}`}>{inst}</li>
              ))}
            </ol>
          </div>

           {/* Save Button */}
           <div className="mt-6 text-right">
                <Button
                    onClick={handleSaveRecipe}
                    disabled={isSaving}
                    variant="secondary" // Optional: different style for save
                >
                    {isSaving ? <LoadingSpinner /> : 'Save Recipe'}
                </Button>
            </div>

        </div>
      )}
    </div>
  );
};

export default RecipeImporter;