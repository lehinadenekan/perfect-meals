// components/recipes/CreateRecipeForm.tsx
'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { useForm, useFieldArray, Controller, ControllerRenderProps, FieldPath } from 'react-hook-form';
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
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface FetchedRegion {
  id: string;
  name: string;
  continent: string | null;
  type: string | null;
}

const DifficultyEnum = z.enum(["Easy", "Medium", "Hard"]);
const CuisineTypeEnum = z.enum(["Italian", "Mexican", "Asian", "Indian", "American", "Mediterranean", "Other"]);
const CookingStyleEnum = z.enum(["Air Fryer", "Bake", "BBQ", "Boil", "Instant Pot", "Microwave", "No-Cook", "Oven", "Roast", "Slow Cooker", "Steam", "Stovetop"]);
const MealCategoryEnum = z.enum(["Main", "Dessert", "Drink"]);

const createRecipeSchema = z.object({
    title: z.string().min(3, 'Title must be at least 3 characters'),
    description: z.string().optional(),
    cookingTime: z.coerce.number({ invalid_type_error: 'Must be a number' }).positive('Must be positive').optional(),
    servings: z.coerce.number({ invalid_type_error: 'Must be a number' }).positive('Must be positive').optional(),
    regionNames: z.array(z.string()).optional(),
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

type RecipePayload = {
  title: string;
  description?: string;
  cookingTime?: number;
  servings?: number;
  regionNames?: string[];
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

export default function CreateRecipeForm() {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
        reset,
        watch,
        setValue,
        getValues,
    } = useForm<CreateRecipeFormData>({
        resolver: zodResolver(createRecipeSchema),
        defaultValues: {
            title: '',
            description: '',
            regionNames: [],
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

    const [availableRegions, setAvailableRegions] = useState<FetchedRegion[]>([]);
    const [isLoadingRegions, setIsLoadingRegions] = useState(true);
    const [regionFetchError, setRegionFetchError] = useState<string | null>(null);

    useEffect(() => {
        const fetchRegions = async () => {
            setIsLoadingRegions(true);
            setRegionFetchError(null);
            try {
                const response = await fetch('/api/regions');
                if (!response.ok) {
                    throw new Error('Failed to fetch regions for form');
                }
                const data: FetchedRegion[] = await response.json();
                setAvailableRegions(data);
            } catch (err) {
                setRegionFetchError(err instanceof Error ? err.message : 'An unknown error occurred');
                toast.error("Could not load regions for the form.");
            } finally {
                setIsLoadingRegions(false);
            }
        };
        fetchRegions();
    }, []);

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
                    if (err.code === 'file-too-large') message = `File ${file.name} is too large (max 5MB).`;
                    else if (err.code === 'file-invalid-type') message = `File ${file.name} has an invalid type.`;
                    toast.error(message);
                });
            });
            return;
        }
        if (acceptedFiles.length > 0) {
            const file = acceptedFiles[0];
            if (!file.type.startsWith('image/')) { toast.error('Invalid file type.'); return; }
            if (file.size > 5 * 1024 * 1024) { toast.error('File too large (max 5MB).'); return; }
            setImageFile(file);
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: { 'image/jpeg': [], 'image/png': [], 'image/webp': [], 'image/gif': [] }, maxSize: 5 * 1024 * 1024, multiple: false });
    const clearImage = (e: React.MouseEvent) => { e.stopPropagation(); setImageFile(null); };

    const { fields: ingredientFields, append: appendIngredient, remove: removeIngredient } = useFieldArray({ control, name: 'ingredients' });
    const { fields: instructionFields, append: appendInstruction, remove: removeInstruction } = useFieldArray({ control, name: 'instructions' });

    const onSubmit = async (data: CreateRecipeFormData) => {
        let uploadedImageUrl: string | undefined = undefined;
        if (imageFile) {
            try {
                const uploadResponse = await fetch(`/api/upload/image?filename=${encodeURIComponent(imageFile.name)}`, { method: 'POST', body: imageFile });
                if (!uploadResponse.ok) {
                    const errorData = await uploadResponse.json().catch(() => ({ message: 'Unknown upload error' }));
                    throw new Error(`Image upload failed: ${uploadResponse.statusText} - ${errorData?.message || 'Server error'}`);
                }
                const blobResult = await uploadResponse.json();
                uploadedImageUrl = blobResult?.url;
                if (!uploadedImageUrl) throw new Error('Image URL not found in upload response.');
            } catch (error) {
                toast.error(error instanceof Error ? error.message : 'Failed to upload image.');
                return;
            }
        }
        const instructionsWithSteps = data.instructions.map((inst, index) => ({ ...inst, stepNumber: index + 1 }));
        const recipePayload: RecipePayload = {
            title: data.title,
            description: data.description,
            cookingTime: data.cookingTime,
            servings: data.servings,
            regionNames: data.regionNames,
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

        try {
            const response = await fetch('/api/recipes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(recipePayload),
            });
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ message: "An unknown error occurred"}));
                throw new Error(errorData.message || `Server error: ${response.status}`);
            }
            const result = await response.json();
            toast.success('Recipe created successfully!');
            reset(); // Reset form fields
            setImageFile(null); // Clear image preview
            router.push(`/recipes/${result.id}`); // Navigate to the new recipe page
        } catch (error) {
            toast.error(error instanceof Error ? error.message : 'Failed to create recipe.');
        }
    };

    const renderError = (fieldName: string) => {
        // Function to recursively get nested error message
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const getNestedError = (obj: any, path: string[]): string | undefined => {
            const key = path.shift();
            if (!key || !obj || typeof obj !== 'object') return undefined;
            if (path.length === 0) {
                return typeof obj[key]?.message === 'string' ? obj[key].message : undefined;
            }
            return getNestedError(obj[key], path);
        };

        const message = getNestedError(errors, fieldName.split('.'));

        return message ? <p className="text-xs text-red-500 mt-1">{message}</p> : null;
    };

    const renderSelect = (field: ControllerRenderProps<CreateRecipeFormData, FieldPath<CreateRecipeFormData>>, placeholder: string, options: readonly string[]) => (
        <Select onValueChange={field.onChange} value={String(field.value || "")} disabled={isSubmitting}>
            <SelectTrigger><SelectValue placeholder={placeholder} /></SelectTrigger>
            <SelectContent>
                <SelectItem value="">{placeholder}</SelectItem>
                {options.map(option => <SelectItem key={option} value={option}>{option}</SelectItem>)}
            </SelectContent>
        </Select>
    );

    const handleCookingStyleChange = (style: z.infer<typeof CookingStyleEnum>, isChecked: boolean) => {
        const currentStyles = getValues("cookingStyles") || [];
        let newStyles;
        if (isChecked) newStyles = [...currentStyles, style];
        else newStyles = currentStyles.filter(s => s !== style);
        setValue("cookingStyles", newStyles, { shouldValidate: true, shouldDirty: true });
    };

    const handleMealCategoryChange = (category: z.infer<typeof MealCategoryEnum>, isChecked: boolean) => {
        const currentCategories = getValues("mealCategories") || [];
        let newCategories;
        if (isChecked) newCategories = [...currentCategories, category];
        else newCategories = currentCategories.filter(c => c !== category);
        setValue("mealCategories", newCategories, { shouldValidate: true, shouldDirty: true });
    };
    
    const cookingStyleOptions: z.infer<typeof CookingStyleEnum>[] = ["Air Fryer", "Bake", "BBQ", "Boil", "Instant Pot", "Microwave", "No-Cook", "Oven", "Roast", "Slow Cooker", "Steam", "Stovetop"];
    const mealCategoryOptions: z.infer<typeof MealCategoryEnum>[] = ["Main", "Dessert", "Drink"];

    const handleRegionCheckboxChange = (regionName: string, isChecked: boolean) => {
        const currentRegionNames = getValues("regionNames") || [];
        let newRegionNames;
        if (isChecked) {
            newRegionNames = [...currentRegionNames, regionName];
        } else {
            newRegionNames = currentRegionNames.filter(name => name !== regionName);
        }
        setValue("regionNames", newRegionNames, { shouldValidate: true, shouldDirty: true });
    };

    const regionsByContinent = availableRegions.reduce((acc, region) => {
        const continentKey = region.continent || 'Unknown';
        if (!acc[continentKey]) acc[continentKey] = [];
        acc[continentKey].push(region);
        return acc;
    }, {} as Record<string, FetchedRegion[]>);

    const sortedContinentNamesFromFetched = Object.keys(regionsByContinent).sort((a,b) => {
        if(a === 'Unknown') return 1;
        if(b === 'Unknown') return -1;
        return a.localeCompare(b);
    });
    
    const currentSelectedRegions = watch("regionNames") || [];

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8" id="recipe-form">
            <Card>
                <CardHeader>
                    <CardTitle>Basic Information</CardTitle>
                    <CardDescription>Tell us about your recipe.</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <Label htmlFor="title">Title <span className="text-red-500">*</span></Label>
                        <Input id="title" {...register('title')} placeholder="e.g., Spaghetti Carbonara" disabled={isSubmitting} />
                        {renderError('title')}
                    </div>
                    <div className="md:col-span-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea id="description" {...register('description')} placeholder="A brief overview of your recipe..." disabled={isSubmitting} />
                        {renderError('description')}
                    </div>
                    <div>
                        <Label htmlFor="cookingTime">Cooking Time (minutes)</Label>
                        <Input id="cookingTime" type="number" {...register('cookingTime')} placeholder="e.g., 30" disabled={isSubmitting} />
                        {renderError('cookingTime')}
                    </div>
                    <div>
                        <Label htmlFor="servings">Servings</Label>
                        <Input id="servings" type="number" {...register('servings')} placeholder="e.g., 4" disabled={isSubmitting} />
                        {renderError('servings')}
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Geographic Origin</CardTitle>
                    <CardDescription>Select all applicable regions for this recipe.</CardDescription>
                </CardHeader>
                <CardContent>
                    {isLoadingRegions && <p className="text-sm text-gray-500">Loading regions...</p>}
                    {!isLoadingRegions && regionFetchError && <p className="text-sm text-red-500">Error loading regions: {regionFetchError}</p>}
                    {!isLoadingRegions && !regionFetchError && availableRegions.length === 0 && <p className="text-sm text-gray-500">No regions available to select.</p>}
                    {!isLoadingRegions && !regionFetchError && availableRegions.length > 0 && (
                        <div className="space-y-4">
                            {sortedContinentNamesFromFetched.map(continentName => {
                                const regionsInThisContinent = (regionsByContinent[continentName] || []).sort((a, b) => {
                                     const typeOrder = { 'CONTINENT': 0, 'SUB_REGION': 1, 'COUNTRY': 2 };
                                     const typeA = a.type || '';
                                     const typeB = b.type || '';
                                     if (typeOrder[typeA as keyof typeof typeOrder] !== typeOrder[typeB as keyof typeof typeOrder]) {
                                         return (typeOrder[typeA as keyof typeof typeOrder] ?? 3) - (typeOrder[typeB as keyof typeof typeOrder] ?? 3);
                                     }
                                     return a.name.localeCompare(b.name);
                                 });
                                
                                if (regionsInThisContinent.length === 0) return null;

                                return (
                                    <div key={continentName}>
                                        <h4 className="text-md font-semibold mb-2 border-b pb-1">{continentName}</h4>
                                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-4 gap-y-3">
                                            {regionsInThisContinent.map(region => (
                                                <div key={region.id} className="flex items-center space-x-2">
                                                    <Checkbox 
                                                        id={`region-${region.id}`}
                                                        checked={currentSelectedRegions.includes(region.name)}
                                                        onCheckedChange={(checked) => handleRegionCheckboxChange(region.name, !!checked)}
                                                        disabled={isSubmitting}
                                                    />
                                                    <Label htmlFor={`region-${region.id}`} className="text-sm font-normal cursor-pointer">
                                                        {region.name} <span className="text-xs text-gray-500">({region.type || 'N/A'})</span>
                                                    </Label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                    {renderError('regionNames')}
                </CardContent>
            </Card>

            <Card>
                <CardHeader><CardTitle>Dietary Information</CardTitle></CardHeader>
                <CardContent className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {[{id: "isVegetarian", label:"Vegetarian"}, {id: "isVegan", label:"Vegan"}, {id: "isGlutenFree", label:"Gluten-Free"}, {id: "isNutFree", label:"Nut-Free"}, {id:"isPescatarian", label:"Pescatarian"}, {id:"isLactoseFree", label:"Lactose-Free"}, {id:"isLowFodmap", label:"Low-FODMAP"}, {id:"isFermented", label:"Fermented"}].map(diet => (
                        <div key={diet.id} className="flex items-center space-x-2">
                            <Controller name={diet.id as keyof CreateRecipeFormData} control={control} render={({ field }) => <Checkbox id={diet.id} checked={!!field.value} onCheckedChange={field.onChange} disabled={isSubmitting} />} />
                            <Label htmlFor={diet.id} className="text-sm font-normal">{diet.label}</Label>
                        </div>
                    ))}
                </CardContent>
            </Card>

            <Card>
                <CardHeader><CardTitle>Ingredients *</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                    {ingredientFields.map((field, index) => (
                        <div key={field.id} className="flex flex-col sm:flex-row items-start gap-2 p-3 border rounded-md bg-gray-50/50">
                            <div className="grid grid-cols-3 gap-2 flex-grow w-full sm:w-auto">
                                <div className="col-span-3 sm:col-span-1">
                                    <Label htmlFor={`ingredients.${index}.amount`} className="text-xs">Amount *</Label>
                                    <Input id={`ingredients.${index}.amount`} type="number" step="0.1" {...register(`ingredients.${index}.amount`)} placeholder="e.g., 1" disabled={isSubmitting} className="text-sm" />
                                    {renderError(`ingredients.${index}.amount`)}
                                </div>
                                <div className="col-span-3 sm:col-span-1">
                                    <Label htmlFor={`ingredients.${index}.unit`} className="text-xs">Unit *</Label>
                                    <Input id={`ingredients.${index}.unit`} {...register(`ingredients.${index}.unit`)} placeholder="e.g., cup, tbsp" disabled={isSubmitting} className="text-sm" />
                                    {renderError(`ingredients.${index}.unit`)}
                                </div>
                                <div className="col-span-3 sm:col-span-1">
                                    <Label htmlFor={`ingredients.${index}.name`} className="text-xs">Name *</Label>
                                    <Input id={`ingredients.${index}.name`} {...register(`ingredients.${index}.name`)} placeholder="e.g., All-purpose Flour" disabled={isSubmitting} className="text-sm" />
                                    {renderError(`ingredients.${index}.name`)}
                                </div>
                            </div>
                            <Button type="button" variant="ghost" size="icon" onClick={() => ingredientFields.length > 1 && removeIngredient(index)} disabled={isSubmitting || ingredientFields.length <= 1} className="mt-2 sm:mt-0 sm:self-center text-red-500 hover:text-red-700 hover:bg-red-100 flex-shrink-0" aria-label="Remove ingredient">
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                    ))}
                    {renderError('ingredients')}
                    <Button type="button" variant="outline" onClick={() => appendIngredient({ name: '', amount: NaN, unit: '' })} disabled={isSubmitting}>+ Add Ingredient</Button>
                </CardContent>
            </Card>

            <Card>
                <CardHeader><CardTitle>Instructions *</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                    {instructionFields.map((field, index) => (
                        <div key={field.id} className="flex items-start gap-2 p-3 border rounded-md bg-gray-50/50">
                            <div className="flex-grow space-y-1">
                                <Label htmlFor={`instructions.${index}.description`} className="font-medium">Step {index + 1}</Label>
                                <Textarea id={`instructions.${index}.description`} {...register(`instructions.${index}.description`)} placeholder="Describe this step..." rows={3} disabled={isSubmitting} className="text-sm" />
                                {renderError(`instructions.${index}.description`)}
                            </div>
                            <Button type="button" variant="ghost" size="icon" onClick={() => instructionFields.length > 1 && removeInstruction(index)} disabled={isSubmitting || instructionFields.length <= 1} className="mt-5 sm:self-center text-red-500 hover:text-red-700 hover:bg-red-100 flex-shrink-0" aria-label="Remove instruction">
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                    ))}
                    {renderError('instructions')}
                    <Button type="button" variant="outline" onClick={() => appendInstruction({ description: '' })} disabled={isSubmitting}>+ Add Step</Button>
                </CardContent>
            </Card>

            <Card>
                <CardHeader><CardTitle>Recipe Image</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                    <div {...getRootProps()} className={`p-6 border-2 border-dashed rounded-md cursor-pointer transition-colors ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400 bg-gray-50/50'}`}>
                        <input {...getInputProps()} />
                        <div className="text-center">
                            <UploadCloud className="mx-auto h-10 w-10 text-gray-400" />
                            {isDragActive ? <p className="mt-2 text-sm text-blue-600">Drop the image here...</p> : <p className="mt-2 text-sm text-gray-600">Drag & drop an image here, or click to select</p>}
                            <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF, WEBP up to 5MB</p>
                        </div>
                    </div>
                    {imagePreviewUrl && (
                        <div className="mt-4 relative w-48 h-32 border rounded-md overflow-hidden">
                            <Image src={imagePreviewUrl} alt="Image preview" layout="fill" objectFit="cover" />
                            <Button variant="destructive" size="icon" className="absolute top-1 right-1 h-6 w-6 rounded-full p-1" onClick={clearImage} aria-label="Remove image">
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>

            <Card>
                <CardHeader><CardTitle>Categorization</CardTitle></CardHeader>
                <CardContent className="space-y-6">
                    <div>
                        <Label>Cooking Styles</Label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-2">
                            {cookingStyleOptions.map(style => (
                                <div key={style} className="flex items-center space-x-2">
                                    <Checkbox id={`style-${style}`} checked={(watch("cookingStyles") || []).includes(style)} onCheckedChange={(checked) => handleCookingStyleChange(style, !!checked)} disabled={isSubmitting} />
                                    <Label htmlFor={`style-${style}`} className="text-sm font-normal">{style}</Label>
                                </div>
                            ))}
                        </div>
                        {renderError('cookingStyles')}
                    </div>
                    <div>
                        <Label>Meal Categories</Label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-2">
                            {mealCategoryOptions.map(category => (
                                <div key={category} className="flex items-center space-x-2">
                                    <Checkbox id={`category-${category}`} checked={(watch("mealCategories") || []).includes(category)} onCheckedChange={(checked) => handleMealCategoryChange(category, !!checked)} disabled={isSubmitting} />
                                    <Label htmlFor={`category-${category}`} className="text-sm font-normal">{category}</Label>
                                </div>
                            ))}
                        </div>
                        {renderError('mealCategories')}
                    </div>
                     <div>
                        <Label htmlFor="cuisineType">Primary Cuisine Type</Label>
                        <Controller name="cuisineType" control={control} render={({ field }) => renderSelect(field, "Select cuisine type", CuisineTypeEnum.options)} />
                        {renderError('cuisineType')}
                    </div>
                    <div>
                        <Label htmlFor="difficulty">Difficulty</Label>
                        <Controller name="difficulty" control={control} render={({ field }) => renderSelect(field, "Select difficulty", DifficultyEnum.options)} />
                        {renderError('difficulty')}
                    </div>
                </CardContent>
            </Card>

            <CardFooter className="flex justify-end">
                <Button type="submit" form="recipe-form" disabled={isSubmitting} className="bg-yellow-500 hover:bg-yellow-600 text-black">
                    {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating...</> : 'Create Recipe'}
                </Button>
            </CardFooter>
        </form>
    );
}
