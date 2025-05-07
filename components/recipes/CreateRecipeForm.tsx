// components/recipes/CreateRecipeForm.tsx
'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { useForm, useFieldArray, Controller, ControllerRenderProps, FieldError, FieldPath } from 'react-hook-form'; // Added FieldError and FieldPath
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useDropzone, FileRejection } from 'react-dropzone';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { Loader2, Trash2, UploadCloud, X } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// Removed Unused Alert Dialog Imports
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Zod schema definitions
const DifficultyEnum = z.enum(["Easy", "Medium", "Hard"]);
const CuisineTypeEnum = z.enum(["Italian", "Mexican", "Asian", "Indian", "American", "Mediterranean", "Other"]);
const CookingStyleEnum = z.enum(["Air Fryer", "Bake", "BBQ", "Boil", "Instant Pot", "Microwave", "No-Cook", "Oven", "Roast", "Slow Cooker", "Steam", "Stovetop"]);
const MealCategoryEnum = z.enum(["Main", "Dessert", "Drink"]);

const createRecipeSchema = z.object({
    title: z.string().min(3, 'Title must be at least 3 characters'),
    description: z.string().optional(),
    cookingTime: z.coerce.number({ invalid_type_error: 'Must be a number' }).positive('Must be positive').optional(),
    servings: z.coerce.number({ invalid_type_error: 'Must be a number' }).positive('Must be positive').optional(),
    regionOfOrigin: z.string().optional(),
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
    isPescatarian: z.boolean().optional(),
    isLactoseFree: z.boolean().optional(),
    isLowFodmap: z.boolean().optional(),
    isFermented: z.boolean().optional(),
    cuisineType: CuisineTypeEnum.optional().or(z.literal("")),
    difficulty: DifficultyEnum.optional().or(z.literal("")),
    cookingStyles: z.array(CookingStyleEnum).optional(),
    mealCategories: z.array(MealCategoryEnum).optional(),
});
type CreateRecipeFormData = z.infer<typeof createRecipeSchema>;

// RecipePayload Type Definition
type RecipePayload = {
  title: string;
  description?: string;
  cookingTime?: number;
  servings?: number;
  regionOfOrigin?: string;
  ingredients: { name: string; amount: number; unit: string }[];
  instructions: { description: string; stepNumber: number }[];
  isVegetarian?: boolean;
  isVegan?: boolean;
  isGlutenFree?: boolean;
  isNutFree?: boolean;
  isPescatarian?: boolean;
  isLactoseFree?: boolean;
  isLowFodmap?: boolean;
  isFermented?: boolean;
  cuisineType?: string;
  difficulty?: string;
  imageUrl?: string;
  cookingStyles?: string[];
  mealCategories?: string[];
};

// Define types for field array items to avoid direct indexing errors
type IngredientField = CreateRecipeFormData['ingredients'][number];
type InstructionField = CreateRecipeFormData['instructions'][number];

export default function CreateRecipeForm() {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
        reset,
        watch,
        setValue,
    } = useForm<CreateRecipeFormData>({
        resolver: zodResolver(createRecipeSchema),
        defaultValues: {
            title: '',
            description: '',
            regionOfOrigin: '',
            ingredients: [{ name: '', amount: NaN, unit: '' }],
            instructions: [{ description: '' }],
            isVegetarian: false,
            isVegan: false,
            isGlutenFree: false,
            isNutFree: false,
            isPescatarian: false,
            isLactoseFree: false,
            isLowFodmap: false,
            isFermented: false,
            cuisineType: '',
            difficulty: '',
            cookingStyles: [],
            mealCategories: [],
        },
    });

    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
    const router = useRouter();

    // Removed Unused Watched Variables

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
            fileRejections.forEach(({ file, errors: dropzoneErrors }) => {
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

    const clearImage = (e: React.MouseEvent) => {
        e.stopPropagation();
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

        const recipePayload: RecipePayload = {
            title: data.title,
            description: data.description,
            cookingTime: data.cookingTime,
            servings: data.servings,
            regionOfOrigin: data.regionOfOrigin,
            ingredients: data.ingredients,
            instructions: instructionsWithSteps,
            isVegetarian: data.isVegetarian,
            isVegan: data.isVegan,
            isGlutenFree: data.isGlutenFree,
            isNutFree: data.isNutFree,
            isPescatarian: data.isPescatarian,
            isLactoseFree: data.isLactoseFree,
            isLowFodmap: data.isLowFodmap,
            isFermented: data.isFermented,
            cuisineType: data.cuisineType || undefined,
            difficulty: data.difficulty || undefined,
            imageUrl: uploadedImageUrl,
            cookingStyles: data.cookingStyles,
            mealCategories: data.mealCategories,
        };

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const payloadToSend: Record<string, any> = { ...recipePayload };
        Object.keys(payloadToSend).forEach(key => {
             const K = key as keyof RecipePayload;
            if (payloadToSend[K] === undefined || payloadToSend[K] === null || payloadToSend[K] === '' || (typeof payloadToSend[K] === 'number' && isNaN(payloadToSend[K]))) {
                delete payloadToSend[K];
            }
        });

        console.log('Submitting Recipe Payload:', JSON.stringify(payloadToSend, null, 2));

        try {
            const response = await fetch('/api/recipes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payloadToSend),
            });

            if (!response.ok) {
                let errorMessage = 'Unknown error occurred.';
                try {
                    const errorBody = await response.json();
                    errorMessage = errorBody.message || (errorBody.details ? JSON.stringify(errorBody.details) : errorMessage);
                } catch (_parseError) {
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

    // Helper function for rendering error messages
    const renderError = (field: keyof CreateRecipeFormData | `ingredients.${number}.${keyof IngredientField}` | `instructions.${number}.${keyof InstructionField}`) => {
        let error: FieldError | undefined; // Use FieldError type
        if (typeof field === 'string') {
            const parts = field.split('.');
            if (parts.length === 3 && (parts[0] === 'ingredients' || parts[0] === 'instructions')) {
                 type FieldArrayKeys = 'ingredients' | 'instructions';
                 type FieldKeys = keyof CreateRecipeFormData[FieldArrayKeys][number];
                 const fieldArrayErrors = errors[parts[0] as FieldArrayKeys];
                 if(fieldArrayErrors && typeof fieldArrayErrors === 'object' && !Array.isArray(fieldArrayErrors)) {
                     // Access nested errors more safely
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const specificErrorArray = (fieldArrayErrors as any)[parseInt(parts[1])];
                    if (specificErrorArray) {
                         error = specificErrorArray[parts[2] as FieldKeys] as FieldError | undefined;
                    }
                 }
            } else {
                // Directly access the potential error message for the simple field
                const simpleErrorObject = errors[field as keyof CreateRecipeFormData];
                if (simpleErrorObject && typeof simpleErrorObject === 'object' && 'message' in simpleErrorObject && typeof simpleErrorObject.message === 'string') {
                    // If it has a message, return it directly, bypassing the 'error' variable assignment here
                     return <p className="text-red-500 text-xs mt-1">{simpleErrorObject.message}</p>;
                }
                 // If it's not a simple FieldError with a message, assign undefined
                error = undefined;
            }
        }
        // Existing return for array field errors or if simpleErrorObject had no message
        return error ? (
            <p className="text-red-500 text-xs mt-1">{error.message}</p>
        ) : null;
    };

    // Helper for Select component rendering - Use FieldPath for the field name constraint
    const renderSelect = (field: ControllerRenderProps<CreateRecipeFormData, FieldPath<CreateRecipeFormData>>, placeholder: string, options: readonly string[]) => (
        <Select
            onValueChange={field.onChange}
            value={String(field.value ?? "")}
            disabled={isSubmitting}
        >
            <SelectTrigger>
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                {options.map((option) => (
                    <SelectItem key={option} value={option}>{option}</SelectItem>
                ))}
            </SelectContent>
        </Select>
    );

    // Helper for Cooking Styles Checkbox Group
    const handleCookingStyleChange = (style: z.infer<typeof CookingStyleEnum>, isChecked: boolean) => {
        const currentStyles = watch('cookingStyles') || [];
        const newStyles = isChecked
            ? [...currentStyles, style]
            : currentStyles.filter((s) => s !== style);
        setValue('cookingStyles', newStyles, { shouldValidate: true });
    };

    // Helper for Meal Categories Checkbox Group
    const handleMealCategoryChange = (category: z.infer<typeof MealCategoryEnum>, isChecked: boolean) => {
        const currentCategories = watch('mealCategories') || [];
        let updatedCategories:
          | z.infer<typeof MealCategoryEnum>[]
          | undefined = [];
        if (isChecked) {
          updatedCategories = [...currentCategories, category];
        } else {
          updatedCategories = currentCategories.filter((c) => c !== category);
        }
        setValue('mealCategories', updatedCategories);
    };

    // Explicitly define the options to render
    const mealCategoryOptions: z.infer<typeof MealCategoryEnum>[] = ["Main", "Dessert", "Drink"];

    // JSX rendering
    return (
        <Card className="w-full max-w-4xl mx-auto my-8">
            <CardHeader>
                <CardTitle>Create a New Recipe</CardTitle>
                <CardDescription>Fill in the details below to add your recipe.</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} id="recipe-form" className="space-y-8">

                    {/* Section 1: Basic Details */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-medium border-b pb-2">Basic Information</h3>
                        <div>
                            <Label htmlFor="title">Title *</Label>
                            <Input id="title" {...register('title')} placeholder="e.g., Grandma's Apple Pie" disabled={isSubmitting} />
                            {renderError('title')}
                        </div>
                        <div>
                            <Label htmlFor="description">Description</Label>
                            <Textarea id="description" {...register('description')} placeholder="A brief description of your recipe..." disabled={isSubmitting} />
                            {renderError('description')}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="cookingTime">Cooking Time (minutes)</Label>
                                <Input id="cookingTime" type="number" {...register('cookingTime')} placeholder="e.g., 45" disabled={isSubmitting} />
                                {renderError('cookingTime')}
                            </div>
                            <div>
                                <Label htmlFor="servings">Servings</Label>
                                <Input id="servings" type="number" {...register('servings')} placeholder="e.g., 4" disabled={isSubmitting} />
                                {renderError('servings')}
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="cuisineType">Cuisine Type</Label>
                                <Controller
                                    name="cuisineType"
                                    control={control}
                                    render={({ field }) => renderSelect(field as ControllerRenderProps<CreateRecipeFormData, FieldPath<CreateRecipeFormData>>, "Select Cuisine", CuisineTypeEnum.options)} // Added type assertion here
                                />
                                {renderError('cuisineType')}
                            </div>
                            <div>
                                <Label htmlFor="difficulty">Difficulty</Label>
                                <Controller
                                    name="difficulty"
                                    control={control}
                                    render={({ field }) => renderSelect(field as ControllerRenderProps<CreateRecipeFormData, FieldPath<CreateRecipeFormData>>, "Select Difficulty", DifficultyEnum.options)} // Added type assertion here
                                />
                                {renderError('difficulty')}
                            </div>
                            <div>
                                <Label htmlFor="regionOfOrigin">Region of Origin</Label>
                                <Input id="regionOfOrigin" {...register('regionOfOrigin')} placeholder="e.g., Sicily, Oaxaca, Sichuan" disabled={isSubmitting} />
                                {renderError('regionOfOrigin')}
                            </div>
                        </div>
                    </div>

                    {/* Section 2: Dietary Information */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-medium border-b pb-2">Dietary Information</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                            {([
                                'isVegetarian', 'isVegan', 'isGlutenFree', 'isNutFree',
                                'isPescatarian', 'isLactoseFree', 'isLowFodmap', 'isFermented'
                            ] as const).map((flag) => (
                                <div key={flag} className="flex items-center space-x-2">
                                    <Controller
                                        name={flag}
                                        control={control}
                                        render={({ field }) => (
                                            <Checkbox
                                                id={flag}
                                                checked={!!field.value} // Ensure value is boolean
                                                onCheckedChange={field.onChange}
                                                disabled={isSubmitting}
                                            />
                                        )}
                                    />
                                    <Label htmlFor={flag} className="cursor-pointer">
                                        {flag.substring(2).replace(/([A-Z])/g, ' $1').trim()}
                                    </Label>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Section: Cooking Styles */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-medium border-b pb-2">Cooking Styles</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                            {CookingStyleEnum.options.map((style) => (
                                <div key={style} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={`style-${style}`}
                                        checked={watch('cookingStyles')?.includes(style)}
                                        onCheckedChange={(checked) => handleCookingStyleChange(style, !!checked)}
                                        disabled={isSubmitting}
                                    />
                                    <Label htmlFor={`style-${style}`} className="cursor-pointer font-normal">{style}</Label>
                                </div>
                            ))}
                        </div>
                        {renderError('cookingStyles')}
                    </div>

                    {/* Section: Meal Categories */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-medium border-b pb-2">Meal Categories</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                            {mealCategoryOptions.map((category) => (
                                <div key={category} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={`mealCategory-${category}`}
                                        checked={(watch('mealCategories') || []).includes(category)}
                                        onCheckedChange={(checked) => handleMealCategoryChange(category, !!checked)}
                                        disabled={isSubmitting}
                                    />
                                    <Label htmlFor={`mealCategory-${category}`} className="cursor-pointer font-normal">{category}</Label>
                                </div>
                            ))}
                        </div>
                        {renderError('mealCategories')}
                    </div>

                    {/* Section 3: Ingredients */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-medium border-b pb-2">Ingredients *</h3>
                        {ingredientFields.map((field, index) => (
                            <div key={field.id} className="flex flex-col sm:flex-row items-start sm:items-end gap-2 p-3 border rounded-md bg-gray-50/50">
                                <div className="grid grid-cols-3 gap-2 flex-grow w-full">
                                    <div className="col-span-3 sm:col-span-1">
                                        <Label htmlFor={`ingredients.${index}.amount`} className="text-xs">Amount *</Label>
                                        <Input id={`ingredients.${index}.amount`} type="number" step="0.1" {...register(`ingredients.${index}.amount`)} placeholder="e.g., 1" disabled={isSubmitting} className="text-sm" />
                                        {renderError(`ingredients.${index}.amount` as const)}
                                    </div>
                                    <div className="col-span-3 sm:col-span-1">
                                        <Label htmlFor={`ingredients.${index}.unit`} className="text-xs">Unit *</Label>
                                        <Input id={`ingredients.${index}.unit`} {...register(`ingredients.${index}.unit`)} placeholder="e.g., cup, tbsp" disabled={isSubmitting} className="text-sm" />
                                        {renderError(`ingredients.${index}.unit` as const)}
                                    </div>
                                    <div className="col-span-3 sm:col-span-1">
                                        <Label htmlFor={`ingredients.${index}.name`} className="text-xs">Name *</Label>
                                        <Input id={`ingredients.${index}.name`} {...register(`ingredients.${index}.name`)} placeholder="e.g., All-purpose Flour" disabled={isSubmitting} className="text-sm" />
                                        {renderError(`ingredients.${index}.name` as const)}
                                    </div>
                                </div>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => ingredientFields.length > 1 && removeIngredient(index)}
                                    disabled={isSubmitting || ingredientFields.length <= 1}
                                    className="mt-2 sm:mt-0 sm:mb-1 text-red-500 hover:text-red-700 hover:bg-red-100 flex-shrink-0"
                                    aria-label="Remove ingredient"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        ))}
                         {renderError('ingredients')}
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => appendIngredient({ name: '', amount: NaN, unit: '' })}
                            disabled={isSubmitting}
                        >
                            + Add Ingredient
                        </Button>
                    </div>

                    {/* Section 4: Instructions */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-medium border-b pb-2">Instructions *</h3>
                        {instructionFields.map((field, index) => (
                            <div key={field.id} className="flex items-start gap-2 p-3 border rounded-md bg-gray-50/50">
                                <div className="flex-grow space-y-1">
                                    <Label htmlFor={`instructions.${index}.description`} className="font-medium">Step {index + 1}</Label>
                                    <Textarea
                                        id={`instructions.${index}.description`}
                                        {...register(`instructions.${index}.description`)}
                                        placeholder="Describe this step..."
                                        rows={3}
                                        disabled={isSubmitting}
                                        className="text-sm"
                                    />
                                    {renderError(`instructions.${index}.description` as const)}
                                </div>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => instructionFields.length > 1 && removeInstruction(index)}
                                    disabled={isSubmitting || instructionFields.length <= 1}
                                    className="mt-5 text-red-500 hover:text-red-700 hover:bg-red-100 flex-shrink-0"
                                    aria-label="Remove instruction"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        ))}
                        {renderError('instructions')}
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => appendInstruction({ description: '' })}
                            disabled={isSubmitting}
                        >
                            + Add Step
                        </Button>
                    </div>

                    {/* Section 5: Image Upload */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-medium border-b pb-2">Recipe Image</h3>
                        <div
                            {...getRootProps()}
                            className={`p-6 border-2 border-dashed rounded-md cursor-pointer transition-colors ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400 bg-gray-50/50'}`}
                        >
                            <input {...getInputProps()} />
                            <div className="text-center">
                                <UploadCloud className="mx-auto h-10 w-10 text-gray-400" />
                                {isDragActive ? (
                                    <p className="mt-2 text-sm text-blue-600">Drop the image here...</p>
                                ) : (
                                    <p className="mt-2 text-sm text-gray-600">Drag & drop an image here, or click to select</p>
                                )}
                                <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF, WEBP up to 5MB</p>
                            </div>
                        </div>
                        {imagePreviewUrl && (
                            <div className="mt-4 relative w-48 h-32 border rounded-md overflow-hidden">
                                <Image src={imagePreviewUrl} alt="Image preview" layout="fill" objectFit="cover" />
                                <Button
                                    variant="destructive"
                                    size="icon"
                                    className="absolute top-1 right-1 h-6 w-6 rounded-full p-1"
                                    onClick={clearImage}
                                    aria-label="Remove image"
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>
                        )}
                    </div>

                </form>
            </CardContent>
            <CardFooter className="flex justify-end">
                <Button type="submit" form="recipe-form" disabled={isSubmitting} className="bg-yellow-500 hover:bg-yellow-600 text-black">
                    {isSubmitting ? (
                        <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating...</>
                    ) : (
                        'Create Recipe'
                    )}
                </Button>
            </CardFooter>
        </Card>
    );
}