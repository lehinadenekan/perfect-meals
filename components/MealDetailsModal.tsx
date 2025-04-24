'use client';

import React, { useState, useEffect } from 'react';
import { MealType, Recipe, CustomFoodEntry, NutritionFacts, Ingredient, Instruction } from '@prisma/client';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { toast } from 'sonner';
import Image from 'next/image'; // Import next/image

// Define a combined type for the meal data passed to the modal
type PlannerMealData = {
    id: string; // Need meal ID for API call
    mealType: MealType;
    mealTime: string | null; // Added mealTime
    servings: number | null; // Planned servings
    isCompleted: boolean;
    recipe: (Omit<Recipe, 'dietaryNotes' | 'dietaryFeedback' | 'albums' | 'reviews' | 'recipeHistory' | 'categories' | 'cuisines' | 'savedBy' | 'plannedMeals' | 'search_vector'> & {
        nutritionFacts: NutritionFacts | null;
        ingredients: Ingredient[];
        instructions: Instruction[];
    }) | null;
    customFoodEntry: CustomFoodEntry | null;
};

interface MealDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    mealData: PlannerMealData | null;
    onMealUpdate: () => void; // Callback to refresh planner data
}

const MealDetailsModal: React.FC<MealDetailsModalProps> = ({ isOpen, onClose, mealData, onMealUpdate }) => {
    // State for editable fields
    const [editedServings, setEditedServings] = useState<number | string>(1);
    const [editedMealType, setEditedMealType] = useState<MealType | ''>(MealType.OTHER);
    const [editedMealTime, setEditedMealTime] = useState<string>(''); // Added state for time
    const [isSaving, setIsSaving] = useState(false);

    // Initialize state when modal opens or mealData changes
    useEffect(() => {
        if (mealData) {
            setEditedServings(mealData.servings ?? 1);
            setEditedMealType(mealData.mealType ?? MealType.OTHER);
            setEditedMealTime(mealData.mealTime || ''); // Initialize time
        }
    }, [mealData]);

    if (!isOpen || !mealData) {
        return null;
    }

    const { id: mealId, recipe, customFoodEntry } = mealData;
    const originalServings = mealData.servings ?? 1;
    const originalMealType = mealData.mealType ?? MealType.OTHER;
    const originalMealTime = mealData.mealTime || '';

    // Check if changes have been made
    const hasChanges =
        editedServings != originalServings || // Use != for type coercion (string vs number)
        editedMealType !== originalMealType ||
        editedMealTime !== originalMealTime;

    // Handle Save Changes
    const handleSaveChanges = async () => {
        const newServings = Number(editedServings);
        const newMealTime = editedMealTime.trim() === '' ? null : editedMealTime.trim(); // Set to null if empty

        // Validate Servings
        if (isNaN(newServings) || newServings <= 0) {
            toast.error('Please enter a valid number of servings (> 0).');
            return;
        }
        // Validate Meal Type
        if (!editedMealType) {
            toast.error('Please select a meal type.');
            return;
        }
        // Validate Time Format (optional, but good practice)
        const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
        if (newMealTime && !timeRegex.test(newMealTime)) {
            toast.error('Please enter a valid time in HH:mm format (e.g., 14:30).');
            return;
        }

        setIsSaving(true);
        try {
            const updatePayload: { servings?: number; mealType?: MealType; mealTime?: string | null } = {}; // Added mealTime to payload type
            if (newServings !== originalServings) {
                updatePayload.servings = newServings;
            }
            if (editedMealType !== originalMealType) {
                updatePayload.mealType = editedMealType;
            }
            if (newMealTime !== originalMealTime) { // Check if time changed
                updatePayload.mealTime = newMealTime; // Send null if cleared, or new time
            }

            // Only send request if there are actual changes
            if (Object.keys(updatePayload).length > 0) {
                const response = await fetch(`/api/planner/meal/${mealId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(updatePayload),
                });

                if (!response.ok) {
                    let errorMsg = 'Failed to update meal';
                    try { const errData = await response.json(); errorMsg = errData.message || errorMsg; } catch {}
                    throw new Error(errorMsg);
                }
                toast.success('Meal updated successfully!');
                onMealUpdate(); // Trigger data refresh on parent page
            } else {
                toast.info('No changes were made.');
            }
            onClose(); // Close modal on success or no changes

        } catch (error) {
            console.error('Failed to save meal changes:', error);
            toast.error(`Error saving changes: ${error instanceof Error ? error.message : 'Unknown error'}`);
        } finally {
            setIsSaving(false);
        }
    };

    // Helper to render nutrition facts
    const renderNutrition = (nutritionInput: NutritionFacts | CustomFoodEntry | null) => {
        if (!nutritionInput) return <p className="text-sm text-gray-500">No nutrition data available.</p>;

        // Use a type guard to determine the structure
        if ('calories' in nutritionInput) {
            // It's a CustomFoodEntry - Add explicit type assertion
            const facts = nutritionInput as CustomFoodEntry;
            return (
                <ul className="text-sm list-disc pl-5 space-y-1">
                    {facts.calories != null && <li><strong>Calories:</strong> {facts.calories} kcal</li>}
                    {facts.protein != null && <li><strong>Protein:</strong> {facts.protein} g</li>}
                    {facts.carbs != null && <li><strong>Carbs:</strong> {facts.carbs} g</li>}
                    {facts.fat != null && <li><strong>Fat:</strong> {facts.fat} g</li>}
                    {/* CustomFoodEntry doesn't have fiber, sugar, sodium */}
                </ul>
            );
        } else {
            // It's NutritionFacts (from a Recipe) - Add explicit type assertion
            const facts = nutritionInput as NutritionFacts;
             // Estimate calories for NutritionFacts (P*4 + C*4 + F*9)
            const estimatedCalories = Math.round(((facts.protein ?? 0) * 4) + ((facts.carbs ?? 0) * 4) + ((facts.fat ?? 0) * 9));
            return (
                <ul className="text-sm list-disc pl-5 space-y-1">
                    {estimatedCalories > 0 && <li><strong>Est. Calories:</strong> {estimatedCalories} kcal</li>}
                    {facts.protein != null && <li><strong>Protein:</strong> {facts.protein} g</li>}
                    {facts.carbs != null && <li><strong>Carbs:</strong> {facts.carbs} g</li>}
                    {facts.fat != null && <li><strong>Fat:</strong> {facts.fat} g</li>}
                    {facts.fiber != null && <li><strong>Fiber:</strong> {facts.fiber} g</li>}
                    {facts.sugar != null && <li><strong>Sugar:</strong> {facts.sugar} g</li>}
                    {facts.sodium != null && <li><strong>Sodium:</strong> {facts.sodium} mg</li>}
                </ul>
            );
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4" onClick={onClose}>
            <div
                className="bg-white p-6 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden"
                onClick={(e) => e.stopPropagation()} // Prevent clicks inside modal from closing it
            >
                <div className="flex justify-between items-center mb-4 border-b pb-3">
                    <h2 className="text-2xl font-bold">Meal Details</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800 text-3xl" disabled={isSaving}>&times;</button>
                </div>

                <div className="overflow-y-auto flex-grow pr-2 space-y-5"> {/* Added space-y for spacing between sections */}
                    {/* Edit Fields Section */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-b pb-4 mb-4"> {/* Changed to 3 columns */}
                        <div>
                            <label htmlFor="modal-servings" className="block text-sm font-medium text-gray-700 mb-1">Servings</label>
                            <Input
                                id="modal-servings"
                                type="number"
                                value={editedServings}
                                onChange={(e) => setEditedServings(e.target.value)}
                                min="0.1"
                                step="0.1"
                                required
                                className="border border-gray-300 p-2 rounded w-full text-sm"
                                disabled={isSaving}
                            />
                        </div>
                        <div>
                            <label htmlFor="modal-mealType" className="block text-sm font-medium text-gray-700 mb-1">Meal Type</label>
                            <Select
                                value={editedMealType}
                                onValueChange={(value) => setEditedMealType(value as MealType)}
                                required
                                disabled={isSaving}
                            >
                                <SelectTrigger className="w-full border border-gray-300 p-2 rounded text-sm">
                                    <SelectValue placeholder="Select type..." />
                                </SelectTrigger>
                                <SelectContent>
                                    {Object.values(MealType).map((type) => (
                                        <SelectItem key={type} value={type} className="text-sm">{type}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                             <label htmlFor="modal-mealTime" className="block text-sm font-medium text-gray-700 mb-1">Time (HH:mm)</label>
                            <Input
                                id="modal-mealTime"
                                type="time" // Use type="time" for better UX on supported browsers
                                value={editedMealTime}
                                onChange={(e) => setEditedMealTime(e.target.value)}
                                pattern="([01]?[0-9]|2[0-3]):[0-5][0-9]" // Basic pattern reinforcement
                                placeholder="e.g., 12:30"
                                className="border border-gray-300 p-2 rounded w-full text-sm"
                                disabled={isSaving}
                            />
                        </div>
                    </div>

                    {/* Recipe Details */}
                    {recipe && (
                        <>
                            <div className="flex flex-col sm:flex-row items-start space-x-0 sm:space-x-4">
                                {recipe.imageUrl && (
                                    <Image // Use next/image Image component
                                        src={recipe.imageUrl}
                                        alt={recipe.title ?? 'Recipe Image'} // Provide a default alt text
                                        width={200} // Specify width
                                        height={150} // Specify height
                                        className="w-full sm:w-1/3 rounded object-cover mb-3 sm:mb-0 flex-shrink-0"
                                        style={{ height: 'auto' }} // Maintain aspect ratio if needed
                                        priority={false} // Optional: set to true if it's LCP
                                    />
                                )}
                                <div className="flex-grow">
                                    <h3 className="text-xl font-semibold mb-1">{recipe.title}</h3>
                                    <p className="text-sm text-gray-500 mb-2">Base Recipe Servings: {recipe.servings ?? 'N/A'}</p>
                                    {recipe.description && <p className="text-sm text-gray-700 mb-3">{recipe.description}</p>}
                                </div>
                            </div>

                            <div>
                                <h4 className="text-lg font-semibold mb-2 border-b pb-1">Ingredients</h4>
                                {recipe.ingredients && recipe.ingredients.length > 0 ? (
                                    <ul className="text-sm list-disc pl-5 space-y-1">
                                        {recipe.ingredients.map((ing) => (
                                            <li key={ing.id}>{ing.amount} {ing.unit} {ing.name} {ing.notes ? `(${ing.notes})` : ''}</li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-sm text-gray-500 italic">No ingredients listed.</p>
                                )}
                            </div>

                            <div>
                                <h4 className="text-lg font-semibold mb-2 border-b pb-1">Instructions</h4>
                                {recipe.instructions && recipe.instructions.length > 0 ? (
                                    <ol className="text-sm list-decimal pl-5 space-y-2">
                                        {recipe.instructions.sort((a, b) => a.stepNumber - b.stepNumber).map((inst) => (
                                            <li key={inst.id}>
                                                {inst.description}
                                                {inst.imageUrl &&
                                                    <Image // Use next/image Image component
                                                        src={inst.imageUrl}
                                                        alt={`Step ${inst.stepNumber}`}
                                                        width={300} // Specify width
                                                        height={200} // Specify height
                                                        className="mt-1 rounded max-w-xs"
                                                        style={{ height: 'auto' }} // Maintain aspect ratio
                                                        priority={false}
                                                    />
                                                }
                                            </li>
                                        ))}
                                    </ol>
                                ) : (
                                    <p className="text-sm text-gray-500 italic">No instructions provided.</p>
                                )}
                            </div>

                            <div>
                                <h4 className="text-lg font-semibold mb-2 border-b pb-1">Nutrition Facts <span className="text-xs text-gray-500">(per recipe serving)</span></h4>
                                {renderNutrition(recipe.nutritionFacts)}
                            </div>
                        </>
                    )}

                    {/* Custom Food Details */}
                    {customFoodEntry && (
                        <>
                            <h3 className="text-xl font-semibold mb-2">{customFoodEntry.name}</h3>
                            {customFoodEntry.servingSize && <p className="text-sm text-gray-700 mb-3">Base Serving Size: {customFoodEntry.servingSize}</p>}

                            <div>
                                <h4 className="text-lg font-semibold mb-2 border-b pb-1">Nutrition Facts <span className="text-xs text-gray-500">(per entry)</span></h4>
                                {renderNutrition(customFoodEntry)}
                            </div>
                        </>
                    )}
                </div>

                {/* Modal Footer Actions */}
                <div className="mt-auto pt-4 border-t flex justify-end space-x-2">
                    <Button variant="outline" onClick={onClose} disabled={isSaving}>
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSaveChanges}
                        disabled={!hasChanges || isSaving} // Disable if no changes or saving
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                        {isSaving ? 'Saving...' : 'Save Changes'}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default MealDetailsModal;