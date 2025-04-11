'use client';

import { useState, FormEvent, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import { TrashIcon, PlusIcon, ArrowUpTrayIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';

// Define local Difficulty type
type Difficulty = 'EASY' | 'MEDIUM' | 'HARD';

// --- Local Input Types for Form State ---
interface IngredientInput {
  name: string;
  amount: string;
  unit: string;
  notes?: string;
}

interface InstructionInput {
  description: string;
}

interface RecipeInput {
  title: string;
  description: string;
  cookingTime: string;
  servings: string;
  difficulty: Difficulty;
  cuisineType: string;
  regionOfOrigin: string;
  imageUrl: string;
  isVegetarian: boolean;
  isVegan: boolean;
  isGlutenFree: boolean;
  isLactoseFree: boolean;
  isNutFree: boolean;
  isPescatarian: boolean;
  isFermented: boolean;
  isLowFodmap: boolean;
}
// --- End Local Input Types ---


const initialIngredient: IngredientInput = { name: '', amount: '', unit: '', notes: '' };
const initialInstruction: InstructionInput = { description: '' };

export default function CreateRecipeForm() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [formData, setFormData] = useState<RecipeInput>({
    title: '',
    description: '',
    cookingTime: '',
    servings: '',
    difficulty: 'EASY',
    cuisineType: '',
    regionOfOrigin: '',
    imageUrl: '',
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: false,
    isLactoseFree: false,
    isNutFree: false,
    isPescatarian: false,
    isFermented: false,
    isLowFodmap: false,
  });
  const [ingredients, setIngredients] = useState<IngredientInput[]>([initialIngredient]);
  const [instructions, setInstructions] = useState<InstructionInput[]>([initialInstruction]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Image Upload State
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleFormChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
       const { checked } = e.target as HTMLInputElement;
       setFormData((prev: RecipeInput) => ({ ...prev, [name]: checked }));
    } else {
        // Special handling if the name is 'difficulty' to ensure type safety
       if (name === 'difficulty') {
           setFormData((prev: RecipeInput) => ({ ...prev, difficulty: value as Difficulty }));
       } else {
           setFormData((prev: RecipeInput) => ({ ...prev, [name]: value }));
       }
    }
  };

  const handleIngredientChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedIngredients = ingredients.map((ing, i) =>
      i === index ? { ...ing, [name]: value } : ing
    );
    setIngredients(updatedIngredients);
  };

  const addIngredient = () => {
    setIngredients([...ingredients, { ...initialIngredient }]);
  };

  const removeIngredient = (index: number) => {
    if (ingredients.length > 1) {
      setIngredients(ingredients.filter((_, i) => i !== index));
    }
  };

  const handleInstructionChange = (index: number, e: ChangeEvent<HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      const updatedInstructions = instructions.map((inst, i) =>
          i === index ? { ...inst, [name]: value } : inst
      );
      setInstructions(updatedInstructions);
  };

  const addInstruction = () => {
      setInstructions([...instructions, { ...initialInstruction }]);
  };

  const removeInstruction = (index: number) => {
      if (instructions.length > 1) {
          setInstructions(instructions.filter((_, i) => i !== index));
      }
  };

  // --- Image Handling ---
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
          const file = e.target.files[0];
          // Basic validation (optional)
          if (file.size > 4 * 1024 * 1024) { // Example: Limit size to 4MB
              setUploadError('File size should not exceed 4MB.');
              setImageFile(null);
              return;
          }
          setImageFile(file);
          setUploadedImageUrl(''); // Clear previous URL if new file selected
          setUploadError(null);
      }
  };

  const handleImageUpload = async () => {
      if (!imageFile) {
          setUploadError('Please select an image file first.');
          return;
      }
      setIsUploading(true);
      setUploadError(null);

      try {
          const response = await fetch(
              `/api/upload/image?filename=${encodeURIComponent(imageFile.name)}`,
              { method: 'POST', body: imageFile }
          );

          if (!response.ok) {
              const errorData = await response.json();
              throw new Error(errorData.message || 'Upload failed');
          }

          const newBlob = await response.json();
          setUploadedImageUrl(newBlob.url); // Set the URL from the response
          // Update the main form state with the new URL
          setFormData(prev => ({ ...prev, imageUrl: newBlob.url }));
          setImageFile(null); // Clear the file input state after successful upload
      } catch (err: unknown) {
           console.error('Image upload error:', err);
           if (err instanceof Error) { setUploadError(err.message); }
           else { setUploadError('An unexpected error occurred during upload.'); }
      } finally {
          setIsUploading(false);
      }
  };
  // --- End Image Handling ---

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    if (status !== 'authenticated' || !session?.user?.id) {
        setError("You must be logged in to create a recipe.");
        setIsLoading(false);
        return;
    }

    // --- Basic Client-Side Validation ---
    if (!formData.title || !formData.description || !formData.cookingTime || !formData.servings) {
        setError("Please fill in all required fields (Title, Description, Cooking Time, Servings).");
        setIsLoading(false);
        return;
    }
    if (ingredients.some(ing => !ing.name || !ing.amount || !ing.unit)) {
         setError("Please ensure all ingredients have a name, amount, and unit.");
         setIsLoading(false);
         return;
    }
     if (instructions.some(inst => !inst.description)) {
         setError("Please ensure all instructions have a description.");
         setIsLoading(false);
         return;
    }
    if (imageFile && !uploadedImageUrl) {
        setError("Please upload the selected image before creating the recipe.");
        setIsLoading(false);
        return;
    }
    // --- End Validation ---


    // Prepare data for API - Ensure types match backend expectations
    const recipePayload = {
      ...formData,
      cookingTime: parseInt(formData.cookingTime, 10) || 0,
      servings: parseInt(formData.servings, 10) || 0,
      ingredients: ingredients.map(ing => ({
          name: ing.name,
          amount: parseFloat(ing.amount) || 0,
          unit: ing.unit,
          notes: ing.notes || undefined,
      })),
      instructions: instructions.map((inst, index) => ({
          stepNumber: index + 1,
          description: inst.description
      })),
    };

    try {
      const response = await fetch('/api/recipes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(recipePayload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setSuccessMessage(`Recipe "${result.title}" created successfully!`);

       // Redirect after a short delay
       setTimeout(() => {
           router.push('/favorites');
       }, 2000);


    } catch (err: unknown) {
      console.error('Failed to create recipe:', err);
       if (err instanceof Error) {
         setError(err.message);
      } else {
         setError('An unexpected error occurred during submission.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (status === 'loading') {
      return <div className="flex justify-center items-center"><LoadingSpinner /></div>;
  }

  if (status === 'unauthenticated') {
      return <p className="text-center text-red-600">Please sign in to create recipes.</p>;
  }

  // --- Form JSX ---
  return (
    <form onSubmit={handleSubmit} className="space-y-8 divide-y divide-gray-200">
      <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
        <div>
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">Recipe Information</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Basic details about your recipe.
            </p>
          </div>

          <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
            {/* Title */}
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                Title *
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <input
                  type="text"
                  name="title"
                  id="title"
                  value={formData.title}
                  onChange={handleFormChange}
                  required
                  className="max-w-lg block w-full shadow-sm focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>

             {/* Description */}
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                Description *
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  value={formData.description}
                  onChange={handleFormChange}
                  required
                  className="max-w-lg shadow-sm block w-full focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm border border-gray-300 rounded-md"
                />
                 <p className="mt-2 text-sm text-gray-500">Write a brief description of your recipe.</p>
              </div>
            </div>

             {/* Cooking Time */}
             <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label htmlFor="cookingTime" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                Cooking Time (minutes) *
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <input
                  type="number"
                  name="cookingTime"
                  id="cookingTime"
                  value={formData.cookingTime}
                  onChange={handleFormChange}
                  required
                   min="1"
                  className="max-w-xs block w-full shadow-sm focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>

             {/* Servings */}
              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label htmlFor="servings" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                Servings *
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <input
                  type="number"
                  name="servings"
                  id="servings"
                  value={formData.servings}
                  onChange={handleFormChange}
                  required
                  min="1"
                  className="max-w-xs block w-full shadow-sm focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>

            {/* Difficulty */}
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                Difficulty
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <select
                  id="difficulty"
                  name="difficulty"
                  value={formData.difficulty}
                  onChange={handleFormChange}
                  className="max-w-xs block w-full shadow-sm focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm border-gray-300 rounded-md"
                >
                  <option value="EASY">Easy</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="HARD">Hard</option>
                </select>
              </div>
            </div>

             {/* Cuisine Type */}
             <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label htmlFor="cuisineType" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                Cuisine Type
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                 {/* Consider making this a dropdown fetched from DB later */}
                <input
                  type="text"
                  name="cuisineType"
                  id="cuisineType"
                  placeholder="e.g., Italian, Mexican, Chinese"
                  value={formData.cuisineType}
                  onChange={handleFormChange}
                  className="max-w-lg block w-full shadow-sm focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>

             {/* Region of Origin */}
             <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label htmlFor="regionOfOrigin" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                Region of Origin
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                 {/* Consider making this a dropdown fetched from DB later */}
                <input
                  type="text"
                  name="regionOfOrigin"
                  id="regionOfOrigin"
                   placeholder="e.g., Sicily, Oaxaca, Sichuan"
                  value={formData.regionOfOrigin}
                  onChange={handleFormChange}
                  className="max-w-lg block w-full shadow-sm focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>


             {/* Image Upload Section */}
             <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label htmlFor="imageFile" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                Recipe Image
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                 {/* File Input */} 
                 <input
                    type="file"
                    name="imageFile"
                    id="imageFile"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-yellow-50 file:text-yellow-700 hover:file:bg-yellow-100 disabled:opacity-50 disabled:pointer-events-none"
                    disabled={isUploading}
                />

                {/* Upload Button & Status */} 
                {imageFile && !uploadedImageUrl && (
                    <div className="mt-2 flex items-center space-x-2">
                       <button
                            type="button"
                            onClick={handleImageUpload}
                            disabled={isUploading}
                            className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                        >
                            {isUploading ? <LoadingSpinner /> : <ArrowUpTrayIcon className="h-4 w-4 mr-1" />} 
                           {isUploading ? 'Uploading...' : `Upload ${imageFile.name}`}
                        </button>
                        {uploadError && <p className="text-xs text-red-600">Error: {uploadError}</p>}
                    </div>
                )}

                {/* Image Preview */}
                {uploadedImageUrl && (
                    <div className="mt-4">
                        <p className="text-sm text-green-600">Image uploaded successfully!</p>
                        <div className="mt-2 relative h-40 w-40 rounded-md overflow-hidden">
                          <Image
                            src={uploadedImageUrl}
                            alt="Uploaded recipe preview"
                            fill
                            style={{ objectFit: 'cover' }}
                          />
                        </div>
                    </div>
                )}
              </div>
            </div>

            {/* Dietary Flags */}
            <div className="sm:border-t sm:border-gray-200 sm:pt-5">
                 <fieldset className="mt-6">
                    <legend className="text-base font-medium text-gray-900">Dietary Information</legend>
                    <div className="mt-4 space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-10">
                      {/* Add checkboxes for isVegetarian, isVegan, isGlutenFree, etc. */}
                       <div className="flex items-center">
                           <input id="isVegetarian" name="isVegetarian" type="checkbox" checked={formData.isVegetarian} onChange={handleFormChange} className="focus:ring-yellow-500 h-4 w-4 text-yellow-600 border-gray-300 rounded" />
                           <label htmlFor="isVegetarian" className="ml-3 block text-sm font-medium text-gray-700">Vegetarian</label>
                       </div>
                        <div className="flex items-center">
                           <input id="isVegan" name="isVegan" type="checkbox" checked={formData.isVegan} onChange={handleFormChange} className="focus:ring-yellow-500 h-4 w-4 text-yellow-600 border-gray-300 rounded" />
                           <label htmlFor="isVegan" className="ml-3 block text-sm font-medium text-gray-700">Vegan</label>
                       </div>
                        <div className="flex items-center">
                           <input id="isGlutenFree" name="isGlutenFree" type="checkbox" checked={formData.isGlutenFree} onChange={handleFormChange} className="focus:ring-yellow-500 h-4 w-4 text-yellow-600 border-gray-300 rounded" />
                           <label htmlFor="isGlutenFree" className="ml-3 block text-sm font-medium text-gray-700">Gluten-Free</label>
                       </div>
                       {/* Add other flags similarly: isLactoseFree, isNutFree, isPescatarian */}
                         <div className="flex items-center">
                           <input id="isLactoseFree" name="isLactoseFree" type="checkbox" checked={formData.isLactoseFree} onChange={handleFormChange} className="focus:ring-yellow-500 h-4 w-4 text-yellow-600 border-gray-300 rounded" />
                           <label htmlFor="isLactoseFree" className="ml-3 block text-sm font-medium text-gray-700">Lactose-Free</label>
                       </div>
                       <div className="flex items-center">
                           <input id="isNutFree" name="isNutFree" type="checkbox" checked={formData.isNutFree} onChange={handleFormChange} className="focus:ring-yellow-500 h-4 w-4 text-yellow-600 border-gray-300 rounded" />
                           <label htmlFor="isNutFree" className="ml-3 block text-sm font-medium text-gray-700">Nut-Free</label>
                       </div>
                        <div className="flex items-center">
                           <input id="isPescatarian" name="isPescatarian" type="checkbox" checked={formData.isPescatarian} onChange={handleFormChange} className="focus:ring-yellow-500 h-4 w-4 text-yellow-600 border-gray-300 rounded" />
                           <label htmlFor="isPescatarian" className="ml-3 block text-sm font-medium text-gray-700">Pescatarian</label>
                       </div>
                    </div>
                 </fieldset>
             </div>

          </div>
        </div>

        {/* Ingredients Section */}
        <div className="pt-8 space-y-6 sm:pt-10 sm:space-y-5">
            <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900">Ingredients *</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">List all the ingredients needed for your recipe.</p>
            </div>
            <div className="space-y-4">
                {ingredients.map((ingredient, index) => (
                <div key={index} className="sm:grid sm:grid-cols-12 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                    {/* Amount */}
                    <div className="sm:col-span-2">
                        <label htmlFor={`ingredient-amount-${index}`} className="block text-sm font-medium text-gray-700">Amount</label>
                        <input
                            type="text" // Use text to allow fractions initially, parse to float later
                            name="amount"
                            id={`ingredient-amount-${index}`}
                            value={ingredient.amount}
                            onChange={(e) => handleIngredientChange(index, e)}
                            required
                            className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                    </div>
                    {/* Unit */}
                    <div className="sm:col-span-2">
                         <label htmlFor={`ingredient-unit-${index}`} className="block text-sm font-medium text-gray-700">Unit</label>
                        <input
                            type="text"
                            name="unit"
                            id={`ingredient-unit-${index}`}
                            value={ingredient.unit}
                            onChange={(e) => handleIngredientChange(index, e)}
                            required
                            placeholder="g, ml, tsp, tbsp, cup"
                            className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                    </div>
                    {/* Name */}
                    <div className="sm:col-span-4">
                         <label htmlFor={`ingredient-name-${index}`} className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            name="name"
                            id={`ingredient-name-${index}`}
                            value={ingredient.name}
                            onChange={(e) => handleIngredientChange(index, e)}
                            required
                            placeholder="e.g., All-Purpose Flour"
                            className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                    </div>
                     {/* Notes */}
                    <div className="sm:col-span-3">
                         <label htmlFor={`ingredient-notes-${index}`} className="block text-sm font-medium text-gray-700">Notes (Optional)</label>
                        <input
                            type="text"
                            name="notes"
                            id={`ingredient-notes-${index}`}
                            value={ingredient.notes || ''}
                            onChange={(e) => handleIngredientChange(index, e)}
                            placeholder="e.g., chopped, melted"
                            className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                    </div>
                    {/* Remove Button */}
                    <div className="sm:col-span-1 flex items-end">
                         {ingredients.length > 1 && (
                            <button
                                type="button"
                                onClick={() => removeIngredient(index)}
                                className="mt-1 inline-flex items-center justify-center p-2 border border-transparent rounded-full shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                            >
                                <TrashIcon className="h-4 w-4" aria-hidden="true" />
                            </button>
                         )}
                    </div>
                </div>
                ))}
                {/* Add Ingredient Button */}
                <div className="flex justify-start">
                     <button
                        type="button"
                        onClick={addIngredient}
                        className="mt-2 inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                     >
                        <PlusIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
                        Add Ingredient
                    </button>
                </div>
            </div>
        </div>


         {/* Instructions Section */}
        <div className="pt-8 space-y-6 sm:pt-10 sm:space-y-5">
             <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900">Instructions *</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">Provide step-by-step instructions.</p>
            </div>
             <div className="space-y-4">
                {instructions.map((instruction, index) => (
                    <div key={index} className="sm:grid sm:grid-cols-12 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                        {/* Step Number (Display Only) */}
                        <div className="sm:col-span-1 pt-2">
                             <span className="text-sm font-medium text-gray-700">Step {index + 1}</span>
                        </div>
                        {/* Description */}
                        <div className="sm:col-span-10">
                            <label htmlFor={`instruction-description-${index}`} className="sr-only">Description</label>
                            <textarea
                                id={`instruction-description-${index}`}
                                name="description"
                                rows={3}
                                value={instruction.description}
                                onChange={(e) => handleInstructionChange(index, e)}
                                required
                                className="shadow-sm block w-full focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm border border-gray-300 rounded-md"
                                placeholder="Describe this step..."
                            />
                        </div>
                        {/* Remove Button */}
                        <div className="sm:col-span-1 flex items-start pt-2">
                            {instructions.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => removeInstruction(index)}
                                     className="inline-flex items-center justify-center p-2 border border-transparent rounded-full shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                >
                                     <TrashIcon className="h-4 w-4" aria-hidden="true" />
                                </button>
                            )}
                        </div>
                    </div>
                 ))}
                 {/* Add Instruction Button */}
                 <div className="flex justify-start">
                    <button
                        type="button"
                        onClick={addInstruction}
                        className="mt-2 inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                     >
                        <PlusIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
                        Add Step
                    </button>
                </div>
            </div>
        </div>

      </div>

      {/* Submission Area */}
      <div className="pt-5">
        <div className="flex justify-end items-center space-x-4">
           {error && <p className="text-sm text-red-600">{error}</p>}
           {successMessage && <p className="text-sm text-green-600">{successMessage}</p>}
          <button
            type="button"
             onClick={() => router.back()} // Go back button
            className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
            disabled={isLoading || isUploading} // Also disable if uploading image
          >
            Cancel
          </button>
          <button
            type="submit"
            className="ml-3 inline-flex justify-center items-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 disabled:opacity-50"
            disabled={isLoading || isUploading || status !== 'authenticated'} // Also disable if uploading image
          >
             {isLoading && <LoadingSpinner />}
            {isLoading ? 'Creating Recipe...' : 'Create Recipe'}
          </button>
        </div>
      </div>
    </form>
  );
}

// Need to export the local Difficulty type for the import within the same file
export type { Difficulty }; 