// app/components/recipes/CreateRecipeForm.tsx
'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form'; // Added Controller
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label"; // Assuming this path is correct / file exists
import { Checkbox } from "@/components/ui/checkbox";
import { useDropzone, FileRejection } from 'react-dropzone';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react'; // --- Phase 5: Import loading icon ---
// --- Phase 5: Import Select Components ---
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// --- Phase 5: Import Alert Dialog Components ---
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

// --- Phase 5: Updated Zod schema with enums ---
const DifficultyEnum = z.enum(["Easy", "Medium", "Hard"]);
const CuisineTypeEnum = z.enum(["Italian", "Mexican", "Asian", "Indian", "American", "Mediterranean", "Other"]); // Example enums

const createRecipeSchema = z.object({
    title: z.string().min(3, 'Title must be at least 3 characters'),
    description: z.string().optional(),
    cookingTime: z.coerce.number({ invalid_type_error: 'Must be a number' }).positive('Must be positive').optional(),
    servings: z.coerce.number({ invalid_type_error: 'Must be a number' }).positive('Must be positive').optional(),
    ingredients: z.array(z.object({
        name: z.string().min(2, 'Required'),
        amount: z.coerce.number({ invalid_type_error: 'Num' }).positive('Pos'),
        unit: z.string().min(1, 'Required')
    })).min(1, 'At least one ingredient is required'),
    instructions: z.array(z.object({
        description: z.string().min(10, 'Must be at least 10 characters')
    })).min(1, 'At least one instruction step is required'),
    isVegetarian: z.boolean().optional(),
    isVegan: z.boolean().optional(),
    isGlutenFree: z.boolean().optional(),
    isNutFree: z.boolean().optional(),
    // --- Phase 5: Update schema for Selects ---
    cuisineType: CuisineTypeEnum.optional().or(z.literal("")), // Allow optional or empty string initial value
    difficulty: DifficultyEnum.optional().or(z.literal("")),   // Allow optional or empty string initial value
});
type CreateRecipeFormData = z.infer<typeof createRecipeSchema>;

// --- Added RecipePayload Type Definition ---
type RecipePayload = {
  title: string;
  description?: string;
  cookingTime?: number;
  servings?: number;
  ingredients: { name: string; amount: number; unit: string }[];
  instructions: { description: string; stepNumber: number }[];
  isVegetarian?: boolean;
  isVegan?: boolean;
  isGlutenFree?: boolean;
  isNutFree?: boolean;
  cuisineType?: string; // Or use z.infer<typeof CuisineTypeEnum> if API expects enum value
  difficulty?: string;  // Or use z.infer<typeof DifficultyEnum> if API expects enum value
  imageUrl?: string;
};

export default function CreateRecipeForm() {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
        reset
    } = useForm<CreateRecipeFormData>({
        resolver: zodResolver(createRecipeSchema),
        defaultValues: {
            title: '',
            description: '',
            ingredients: [{ name: '', amount: NaN, unit: '' }],
            instructions: [{ description: '' }],
            isVegetarian: false,
            isVegan: false,
            isGlutenFree: false,
            isNutFree: false,
            cuisineType: '', // Default to empty string for Select placeholder
            difficulty: '',  // Default to empty string for Select placeholder
        },
    });

    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        if (imageFile) {
            const objectUrl = URL.createObjectURL(imageFile);
            setImagePreviewUrl(objectUrl);
            return () => URL.revokeObjectURL(objectUrl);
        } else {
            setImagePreviewUrl(null);
        }
    }, [imageFile]);

    const onDrop = useCallback((acceptedFiles: File[], fileRejections: FileRejection[]) => {
        if (fileRejections.length > 0) {
            fileRejections.forEach(({ file, errors: dropzoneErrors }) => { // Renamed errors to dropzoneErrors
                dropzoneErrors.forEach(err => {
                    let message = `Error with file ${file.name}: ${err.message}`;
                    if (err.code === 'file-too-large') {
                        message = `File ${file.name} is too large (max 5MB).`;
                    } else if (err.code === 'file-invalid-type') {
                        message = `File ${file.name} has an invalid type (only images allowed).`;
                    }
                    toast.error(message);
                    console.error("Upload Error:", err);
                });
            });
            return;
        }

        if (acceptedFiles.length > 0) {
            const file = acceptedFiles[0];
            if (!file.type.startsWith('image/')) {
                toast.error('Invalid file type. Please upload an image.');
                return;
            }
            if (file.size > 5 * 1024 * 1024) {
                toast.error('File is too large. Maximum size is 5MB.');
                return;
            }
            setImageFile(file);
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/jpeg': [], 'image/png': [], 'image/webp': [], 'image/gif': []
        },
        maxSize: 5 * 1024 * 1024,
        multiple: false
    });

    const clearImage = () => {
        setImageFile(null);
    };

    const {
        fields: ingredientFields,
        append: appendIngredient,
        remove: removeIngredient
    } = useFieldArray({ control, name: 'ingredients' });

    const {
        fields: instructionFields,
        append: appendInstruction,
        remove: removeInstruction
    } = useFieldArray({ control, name: 'instructions' });

    const onSubmit = async (data: CreateRecipeFormData) => {
        let uploadedImageUrl: string | undefined = undefined;

        if (imageFile) {
            try {
                const uploadResponse = await fetch(
                    `/api/upload/image?filename=${encodeURIComponent(imageFile.name)}`,
                    { method: 'POST', body: imageFile }
                );
                if (!uploadResponse.ok) {
                    const errorData = await uploadResponse.json().catch(() => ({ message: 'Unknown upload error' }));
                    throw new Error(`Image upload failed: ${uploadResponse.statusText} - ${errorData?.message || 'Server error'}`);
                }
                const blobResult = await uploadResponse.json();
                uploadedImageUrl = blobResult?.url;
                if (!uploadedImageUrl) throw new Error('Image URL not found in upload response.');
                console.log('Image uploaded successfully:', uploadedImageUrl);
            } catch (error) {
                console.error("Image Upload Error:", error);
                toast.error(error instanceof Error ? error.message : 'Failed to upload image. Please try again.');
                return;
            }
        }

        const instructionsWithSteps = data.instructions.map((inst, index) => ({
            ...inst, stepNumber: index + 1,
        }));

        // --- Updated recipePayload to use RecipePayload type ---
        const recipePayload: RecipePayload = {
            title: data.title,
            description: data.description,
            cookingTime: data.cookingTime,
            servings: data.servings,
            ingredients: data.ingredients, // Type matches structure from form data
            instructions: instructionsWithSteps, // Type matches structure after mapping
            isVegetarian: data.isVegetarian,
            isVegan: data.isVegan,
            isGlutenFree: data.isGlutenFree,
            isNutFree: data.isNutFree,
            cuisineType: data.cuisineType || undefined, // Send undefined if empty string
            difficulty: data.difficulty || undefined, // Send undefined if empty string
            imageUrl: uploadedImageUrl,
        };

        // Clean up optional fields more reliably
        // We need to cast to any here because we are dynamically deleting keys,
        // which RecipePayload doesn't allow by default.
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const payloadToSend: any = { ...recipePayload };
        Object.keys(payloadToSend).forEach(key => {
             const K = key as keyof RecipePayload; // Type assertion
             // Added check for NaN specifically for numeric fields
            if (payloadToSend[K] === undefined || payloadToSend[K] === null || payloadToSend[K] === '' || (typeof payloadToSend[K] === 'number' && isNaN(payloadToSend[K]))) {
                delete payloadToSend[K];
            }
        });


        console.log('Submitting Recipe Payload:', JSON.stringify(payloadToSend, null, 2));

        try {
            const response = await fetch('/api/recipes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payloadToSend), // Send the cleaned payload
            });

            if (!response.ok) {
                let errorMessage = 'Unknown error occurred.';
                try {
                    const errorBody = await response.json();
                    errorMessage = errorBody.message || (errorBody.details ? JSON.stringify(errorBody.details) : errorMessage);
                // --- Phase 5: Fix linter error (unused variable) ---
                } catch (_parseError) { // Prefix with underscore
                    errorMessage = response.statusText || 'Server error';
                }
                throw new Error(`Failed to create recipe: ${errorMessage} (Status: ${response.status})`);
            }

            const result = await response.json();
            toast.success(`Recipe "${result.title}" created successfully!`);
            reset();
            setImageFile(null);
            if (result.id) {
                router.push(`/recipes/${result.id}`);
            } else {
                router.push('/');
            }
        } catch (error) {
            console.error("Recipe Creation Error:", error);
            toast.error(error instanceof Error ? error.message : 'An unexpected error occurred while creating the recipe.');
        }
    };

    return (
        // Note: Removed padding from form element itself, relying on page wrapper now
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-4xl mx-auto">
            {/* Removed h2 - assuming title is handled by the page component */}
            {/* <h2 className="text-3xl font-bold text-gray-800 border-b pb-4">Create New Recipe</h2> */}

            {/* --- Basic Info Section --- */}
            <div className="space-y-4 p-6 bg-white rounded-lg shadow"> {/* Added card styling */}
                 <h3 className="text-xl font-semibold text-gray-800 border-b pb-3 mb-4">Recipe Information</h3> {/* Section heading */}
                <div>
                    <Label htmlFor="title" className="text-base font-medium">Title</Label>
                    <Input id="title" {...register('title')} placeholder="Recipe Title" className="bg-white" /> {/* Added bg-white */}
                    {errors.title && <p className="text-sm text-red-600 mt-1">{errors.title.message}</p>}
                </div>
                <div>
                    <Label htmlFor="description" className="text-base font-medium">Description</Label>
                    <Textarea id="description" {...register('description')} placeholder="A short description of the recipe..." className="bg-white" /> {/* Added bg-white */}
                    {errors.description && <p className="text-sm text-red-600 mt-1">{errors.description.message}</p>}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="cookingTime" className="text-base font-medium">Cooking Time (minutes)</Label>
                        <Input id="cookingTime" type="number" {...register('cookingTime')} placeholder="e.g., 30" className="bg-white" /> {/* Added bg-white */}
                        {errors.cookingTime && <p className="text-sm text-red-600 mt-1">{errors.cookingTime.message}</p>}
                    </div>
                    <div>
                        <Label htmlFor="servings" className="text-base font-medium">Servings</Label>
                        <Input id="servings" type="number" {...register('servings')} placeholder="e.g., 4" className="bg-white" /> {/* Added bg-white */}
                        {errors.servings && <p className="text-sm text-red-600 mt-1">{errors.servings.message}</p>}
                    </div>
                </div>
                {/* --- Phase 5: Cuisine Type & Difficulty Selects --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     {/* Cuisine Type Select */}
                     <div>
                        <Label htmlFor="cuisineType" className="text-base font-medium">Cuisine Type</Label>
                        <Controller
                            control={control}
                            name="cuisineType"
                            render={({ field }) => (
                                <Select onValueChange={field.onChange} value={field.value || ""} >
                                    <SelectTrigger id="cuisineType" className="bg-white"> {/* Added bg-white */}
                                        <SelectValue placeholder="Select cuisine type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {CuisineTypeEnum.options.map(cuisine => (
                                            <SelectItem key={cuisine} value={cuisine}>{cuisine}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}
                        />
                        {errors.cuisineType && <p className="text-sm text-red-600 mt-1">{errors.cuisineType.message}</p>}
                    </div>
                    {/* Difficulty Select */}
                    <div>
                        <Label htmlFor="difficulty" className="text-base font-medium">Difficulty</Label>
                         <Controller
                            control={control}
                            name="difficulty"
                            render={({ field }) => (
                                <Select onValueChange={field.onChange} value={field.value || ""}>
                                    <SelectTrigger id="difficulty" className="bg-white"> {/* Added bg-white */}
                                        <SelectValue placeholder="Select difficulty" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {DifficultyEnum.options.map(level => (
                                             <SelectItem key={level} value={level}>{level}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}
                        />
                        {errors.difficulty && <p className="text-sm text-red-600 mt-1">{errors.difficulty.message}</p>}
                    </div>
                </div>
            </div>

            {/* --- Dietary Flags Section --- */}
             <div className="space-y-4 p-6 bg-white rounded-lg shadow"> {/* Added card styling */}
                 <h3 className="text-xl font-semibold text-gray-800 border-b pb-3 mb-4">Dietary Information</h3> {/* Section heading */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
                    {(['isVegetarian', 'isVegan', 'isGlutenFree', 'isNutFree'] as const).map((flag) => (
                        <div key={flag} className="flex items-center space-x-2">
                            <Checkbox id={flag} {...register(flag)} />
                            <Label htmlFor={flag} className="font-normal capitalize">
                                {flag.substring(2).replace(/([A-Z])/g, ' $1').trim()}
                            </Label>
                        </div>
                    ))}
                </div>
            </div>

            {/* --- Image Upload Section --- */}
             <div className="space-y-4 p-6 bg-white rounded-lg shadow"> {/* Added card styling */}
                <h3 className="text-xl font-semibold text-gray-800 border-b pb-3 mb-4">Recipe Image (Optional)</h3> {/* Section heading */}
                <div
                    {...getRootProps()}
                    // Added bg-gray-50 to dropzone for slight contrast
                    className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors duration-200 ease-in-out bg-gray-50 ${isDragActive ? 'border-blue-500 bg-blue-100' : 'border-gray-300 hover:border-gray-400'} ${imagePreviewUrl ? 'border-solid !border-gray-300 p-4' : ''}`}
                    aria-label="Recipe image upload area"
                >
                    <input {...getInputProps()} />
                    {imagePreviewUrl ? (
                        <div className="relative group">
                            <Image src={imagePreviewUrl} alt="Recipe preview" width={200} height={200} className="mx-auto rounded-md object-cover max-h-48 w-auto" />
                            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md">
                                <Button type="button" variant="destructive" size="sm" onClick={(e) => { e.stopPropagation(); clearImage(); }} aria-label="Remove recipe image">
                                    Remove Image
                                </Button>
                            </div>
                        </div>
                    ) : isDragActive ? (
                        <p className="text-blue-600">Drop the image here...</p>
                    ) : (
                         <div className="flex flex-col items-center justify-center space-y-2 text-gray-500">
                            <p>Drag & drop image here, or click to select</p>
                            <p className="text-xs">(Max 5MB, JPEG/PNG/WEBP/GIF)</p>
                         </div>
                    )}
                </div>
                {imageFile && !imagePreviewUrl && <p className="text-sm text-gray-600 mt-2 text-center">Selected: {imageFile.name}</p>}
            </div>

            {/* --- Ingredients Section --- */}
             <div className="space-y-4 p-6 bg-white rounded-lg shadow"> {/* Added card styling */}
                 <h3 className="text-xl font-semibold text-gray-800 border-b pb-3 mb-4">Ingredients</h3> {/* Section heading */}
                 {ingredientFields.map((field, index) => (
                    // Removed bg-gray-50 from individual item row
                    <div key={field.id} className="grid grid-cols-[1fr_auto_auto_auto] gap-2 items-start p-3 border rounded-md">
                        {/* Ingredient Name */}
                        <div className="col-span-1">
                            <Label htmlFor={`ingredients.${index}.name`} className="sr-only">Name</Label>
                            {/* Updated className */}
                            <Input id={`ingredients.${index}.name`} placeholder="Ingredient Name" {...register(`ingredients.${index}.name`)} className={`bg-white ${errors.ingredients?.[index]?.name ? 'border-red-500' : ''}`} />
                            {errors.ingredients?.[index]?.name && <p className="text-sm text-red-600 mt-1">{errors.ingredients[index]?.name?.message}</p>}
                        </div>
                        {/* Ingredient Amount */}
                        <div>
                            <Label htmlFor={`ingredients.${index}.amount`} className="sr-only">Amount</Label>
                            {/* Updated className */}
                            <Input id={`ingredients.${index}.amount`} type="number" step="any" placeholder="Amt" {...register(`ingredients.${index}.amount`)} className={`w-20 bg-white ${errors.ingredients?.[index]?.amount ? 'border-red-500' : ''}`} />
                             {errors.ingredients?.[index]?.amount && <p className="text-sm text-red-600 mt-1">{errors.ingredients[index]?.amount?.message}</p>}
                        </div>
                        {/* Ingredient Unit */}
                        <div>
                            <Label htmlFor={`ingredients.${index}.unit`} className="sr-only">Unit</Label>
                            {/* Updated className */}
                            <Input id={`ingredients.${index}.unit`} placeholder="Unit" {...register(`ingredients.${index}.unit`)} className={`w-24 bg-white ${errors.ingredients?.[index]?.unit ? 'border-red-500' : ''}`} />
                             {errors.ingredients?.[index]?.unit && <p className="text-sm text-red-600 mt-1">{errors.ingredients[index]?.unit?.message}</p>}
                        </div>
                        {/* --- Phase 5: Remove Button with Confirmation --- */}
                         <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    disabled={ingredientFields.length <= 1}
                                    aria-label={`Remove ingredient ${index + 1}`}
                                    className="text-red-500 hover:bg-red-100 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    X
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This will permanently remove this ingredient.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction
                                        onClick={() => removeIngredient(index)}
                                        className="bg-red-600 hover:bg-red-700"
                                    >
                                        Remove
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                 ))}
                 {/* Added bg-white to button */}
                 <Button type="button" variant="outline" onClick={() => appendIngredient({ name: '', amount: NaN, unit: '' })} className="mt-2 bg-white">
                    Add Ingredient
                 </Button>
                 {errors.ingredients?.root && <p className="text-sm text-red-600 mt-1">{errors.ingredients.root.message}</p>}
                 {errors.ingredients && !errors.ingredients.root && errors.ingredients.message && <p className="text-sm text-red-600 mt-1">{errors.ingredients.message}</p>}
            </div>

            {/* --- Instructions Section --- */}
             <div className="space-y-4 p-6 bg-white rounded-lg shadow"> {/* Added card styling */}
                 <h3 className="text-xl font-semibold text-gray-800 border-b pb-3 mb-4">Instructions</h3> {/* Section heading */}
                 {instructionFields.map((field, index) => (
                    // Removed bg-gray-50 from individual item row
                    <div key={field.id} className="flex items-start space-x-3 p-3 border rounded-md">
                        <span className="font-semibold text-gray-600 pt-2">{index + 1}.</span>
                        <div className="flex-grow space-y-1">
                            <Label htmlFor={`instructions.${index}.description`} className="sr-only">Instruction Step {index + 1}</Label>
                            {/* Updated className */}
                            <Textarea id={`instructions.${index}.description`} placeholder={`Step ${index + 1} details...`} {...register(`instructions.${index}.description`)} className={`bg-white ${errors.instructions?.[index]?.description ? 'border-red-500' : ''}`} rows={3} />
                            {errors.instructions?.[index]?.description && <p className="text-sm text-red-600 mt-1">{errors.instructions[index]?.description?.message}</p>}
                        </div>
                        {/* --- Phase 5: Remove Button with Confirmation --- */}
                         <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    disabled={instructionFields.length <= 1}
                                    aria-label={`Remove instruction step ${index + 1}`}
                                    className="text-red-500 hover:bg-red-100 disabled:opacity-50 disabled:cursor-not-allowed mt-1"
                                >
                                    X
                                </Button>
                            </AlertDialogTrigger>
                             <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This will permanently remove this instruction step.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction
                                        onClick={() => removeInstruction(index)}
                                         className="bg-red-600 hover:bg-red-700"
                                    >
                                        Remove
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                 ))}
                 {/* Added bg-white to button */}
                 <Button type="button" variant="outline" onClick={() => appendInstruction({ description: '' })} className="mt-2 bg-white">
                    Add Step
                 </Button>
                 {errors.instructions?.root && <p className="text-sm text-red-600 mt-1">{errors.instructions.root.message}</p>}
                 {errors.instructions && !errors.instructions.root && errors.instructions.message && <p className="text-sm text-red-600 mt-1">{errors.instructions.message}</p>}
            </div>

            {/* --- Submission Button --- */}
            {/* Added wrapper div for alignment/spacing if needed */}
            <div className="pt-6 flex justify-end">
                 {/* --- Phase 5: Submit Button with Loading Indicator --- */}
                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full md:w-auto" /* Kept original width classes */
                    size="lg"
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Creating Recipe...
                        </>
                    ) : (
                        'Create Recipe'
                    )}
                </Button>
            </div>
        </form>
    );
}