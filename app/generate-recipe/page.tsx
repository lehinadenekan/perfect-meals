'use client';

/* eslint-disable react/no-unescaped-entities */

import React, { useState, useCallback } from 'react';
import { useSession } from "next-auth/react"; // Import useSession
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input"; // Assuming a text input for Cuisine for now
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"; // For feedback
import { CheckCircle, XCircle, Loader2, RefreshCw, X, Copy, Check } from "lucide-react"; // Icons
import { Badge } from "@/components/ui/badge"; // Import Badge
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"; // Import Card components

// Define types (IngredientObject, GeneratedRecipe)
type IngredientObject = {
  name: string;
  amount: number;
  unit: string;
};

// Define the structure for nutrition info (matching backend)
type NutritionInfo = {
  calories?: number;
  protein?: number;
  carbs?: number;
  fat?: number;
  fiber?: number;
  sugar?: number;
  sodium?: number;
  potassium?: number;
  calcium?: number;
  noteworthy_nutrients?: string[];
};

type GeneratedRecipe = {
  title: string;
  ingredients: IngredientObject[];
  instructions: string[];
  timeEstimate?: string;
  difficulty?: string;
  nutrition?: NutritionInfo; // Add nutrition field
};

export default function GenerateRecipePage() {
  const { status } = useSession(); // Only destructure status if session data isn't used elsewhere
  const isAuthenticated = status === "authenticated";

  // State for form inputs
  const [currentIngredient, setCurrentIngredient] = useState<string>('');
  const [ingredientTags, setIngredientTags] = useState<string[]>([]);
  const [currentExcludedIngredient, setCurrentExcludedIngredient] = useState<string>('');
  const [excludedIngredientTags, setExcludedIngredientTags] = useState<string[]>([]);
  const [dietaryPreference, setDietaryPreference] = useState<string>('none'); // Default to 'none'
  const [cuisineType, setCuisineType] = useState<string>(''); // Empty string for text input
  const [mealType, setMealType] = useState<string>('any'); // Default to 'any'

  // State for API interaction
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [recipeResult, setRecipeResult] = useState<GeneratedRecipe | null>(null);

  // State for save functionality
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  // State for copy feedback
  const [copied, setCopied] = useState<boolean>(false);

  // --- Ingredient Tag Handlers ---
  const handleIngredientInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentIngredient(event.target.value);
  };

  const handleAddTag = (tagToAdd: string, type: 'include' | 'exclude') => {
    const trimmedTag = tagToAdd.trim();
    if (!trimmedTag) return;

    if (type === 'include' && !ingredientTags.includes(trimmedTag)) {
      setIngredientTags([...ingredientTags, trimmedTag]);
      setCurrentIngredient('');
    } else if (type === 'exclude' && !excludedIngredientTags.includes(trimmedTag)) {
      setExcludedIngredientTags([...excludedIngredientTags, trimmedTag]);
      setCurrentExcludedIngredient('');
    }
  };

  const handleIngredientKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' || event.key === ',') {
      event.preventDefault();
      handleAddTag(currentIngredient, 'include');
    }
    if (event.key === 'Backspace' && currentIngredient === '' && ingredientTags.length > 0) {
        handleRemoveTag(ingredientTags[ingredientTags.length - 1], 'include');
    }
  };

  const handleRemoveTag = (tagToRemove: string, type: 'include' | 'exclude') => {
    if (type === 'include') {
        setIngredientTags(ingredientTags.filter(tag => tag !== tagToRemove));
    } else {
        setExcludedIngredientTags(excludedIngredientTags.filter(tag => tag !== tagToRemove));
    }
  };

  // --- Excluded Ingredient Tag Handlers ---
  const handleExcludedIngredientInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentExcludedIngredient(event.target.value);
  };

  const handleExcludedIngredientKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' || event.key === ',') {
      event.preventDefault();
      handleAddTag(currentExcludedIngredient, 'exclude');
    }
    if (event.key === 'Backspace' && currentExcludedIngredient === '' && excludedIngredientTags.length > 0) {
        handleRemoveTag(excludedIngredientTags[excludedIngredientTags.length - 1], 'exclude');
    }
  };

  // Generation submit handler using useCallback to prevent unnecessary re-renders
  const handleGenerateSubmit = useCallback(async () => {
    if (ingredientTags.length === 0) {
        setError("Please add at least one ingredient to include.");
        return;
    }
    const ingredientsString = ingredientTags.join(', ');
    const excludedIngredientsString = excludedIngredientTags.join(', ');

    setIsLoading(true);
    setError(null);
    setRecipeResult(null);
    setIsSaving(false); // Reset save state on new generation
    setSaveSuccess(false);
    setSaveError(null);
    setCopied(false); // Reset copy state on new generation

    try {
      const response = await fetch('/api/generate-recipe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ingredients: ingredientsString,
          excludedIngredients: excludedIngredientsString || null,
          dietaryPreference: dietaryPreference === 'none' ? null : dietaryPreference,
          cuisineType: cuisineType.trim() === '' ? null : cuisineType.trim(),
          mealType: mealType === 'any' ? null : mealType,
        }),
      });

      if (!response.ok) {
        let errorMessage = `API Error: ${response.statusText}`;
        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorMessage;
        } catch (_jsonError) {}
        throw new Error(errorMessage);
      }

      const data: GeneratedRecipe = await response.json();
      setRecipeResult(data);

    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred during generation.');
      }
      console.error("Error generating recipe:", err);
    } finally {
      setIsLoading(false);
    }
    // Added dependencies for useCallback
  }, [ingredientTags, excludedIngredientTags, dietaryPreference, cuisineType, mealType]);

  // Form submit wrapper to prevent default
  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleGenerateSubmit(); // Call the generation logic
  };

  // Save recipe handler
  const handleSaveRecipe = async () => {
    if (!recipeResult || !isAuthenticated) return;

    setIsSaving(true);
    setSaveSuccess(false);
    setSaveError(null);

    try {
      const response = await fetch('/api/recipes/from-generated', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(recipeResult), // Send the whole generated recipe object
      });

      if (!response.ok) {
        let errorMessage = `Save Error: ${response.statusText}`;
        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorMessage;
        } catch (_jsonError) {}
        throw new Error(errorMessage);
      }

      // const data = await response.json(); // Contains { message, recipeId }
      setSaveSuccess(true);

    } catch (err) {
      if (err instanceof Error) {
        setSaveError(err.message);
      } else {
        setSaveError('An unexpected error occurred while saving.');
      }
      console.error("Error saving recipe:", err);
    } finally {
      setIsSaving(false);
    }
  };

  // --- Copy Recipe Handler ---
  const handleCopyRecipe = async () => {
    if (!recipeResult) return;

    // Format recipe text
    let textToCopy = `**${recipeResult.title}**\n\n`;
    textToCopy += "**Ingredients:**\n";
    recipeResult.ingredients.forEach(ing => {
        textToCopy += `- ${ing.amount > 0 ? ing.amount + " " : ""}${ing.unit !== 'N/A' ? ing.unit + " " : ""}${ing.name}\n`;
    });
    textToCopy += "\n**Instructions:**\n";
    recipeResult.instructions.forEach((inst, index) => {
        textToCopy += `${index + 1}. ${inst}\n`;
    });

    try {
        await navigator.clipboard.writeText(textToCopy);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    } catch (err) {
        console.error("Failed to copy recipe: ", err);
        // Optional: Show an error message to the user
        alert("Failed to copy recipe to clipboard.");
    }
  };
  // --- End Copy Recipe Handler ---

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl space-y-8">
      <h1 className="text-3xl font-bold text-center">Generate Recipe Ideas</h1>

      {/* Form Card */}
      <Card>
        <CardHeader>
          <CardTitle>Your Ingredients & Preferences</CardTitle>
          <CardDescription>Enter the ingredients you have and the kind of recipe you'd like to generate recipe ideas.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleFormSubmit} className="space-y-6">
            {/* Included Ingredients Input */}
            <div>
              <Label htmlFor="ingredients-input" className="text-lg font-medium">Ingredients</Label>
              <p className="text-sm text-muted-foreground mb-2">Type an ingredient and press Enter or Comma to add it.</p>
              <div className="flex items-center border rounded-md p-1">
                 <Input
                    id="ingredients-input"
                    placeholder="e.g., chicken breast, broccoli..."
                    value={currentIngredient}
                    onChange={handleIngredientInputChange}
                    onKeyDown={handleIngredientKeyDown}
                    className="flex-grow border-none focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none"
                />
                {/* Optional: Add button if needed, but Enter/Comma works */}
              </div>
              {/* Display Tags */}
              {ingredientTags.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {ingredientTags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="py-1">
                      {tag}
                      <button
                        type="button" // Prevent form submission
                        onClick={() => handleRemoveTag(tag, 'include')}
                        className="ml-1.5 rounded-full p-0.5 hover:bg-destructive/20 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                        aria-label={`Remove ${tag}`}
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Excluded Ingredients Input (New Section) */}
            <div>
              <Label htmlFor="excluded-ingredients-input" className="text-lg font-medium">Exclude Ingredients <span className="text-muted-foreground text-xs">(Optional)</span></Label>
              <p className="text-sm text-muted-foreground mb-2">List ingredients you want to avoid.</p>
              <div className="flex items-center border rounded-md p-1">
                 <Input
                    id="excluded-ingredients-input"
                    placeholder="e.g., nuts, mushrooms..."
                    value={currentExcludedIngredient}
                    onChange={handleExcludedIngredientInputChange}
                    onKeyDown={handleExcludedIngredientKeyDown}
                    className="flex-grow border-none focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none"
                />
              </div>
              {/* Display Excluded Tags */}
              {excludedIngredientTags.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {excludedIngredientTags.map((tag) => (
                    <Badge key={tag} variant="destructive" className="py-1"> {/* Use destructive variant */}
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag, 'exclude')}
                        className="ml-1.5 rounded-full p-0.5 hover:bg-background/50 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                        aria-label={`Remove ${tag}`}
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Optional Preferences */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="diet">Dietary Preference</Label>
                <Select value={dietaryPreference} onValueChange={setDietaryPreference}>
                  <SelectTrigger id="diet">
                    <SelectValue placeholder="Select diet" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="vegetarian">Vegetarian</SelectItem>
                    <SelectItem value="vegan">Vegan</SelectItem>
                    <SelectItem value="gluten-free">Gluten-Free</SelectItem>
                    <SelectItem value="keto">Keto</SelectItem>
                    <SelectItem value="paleo">Paleo</SelectItem>
                    <SelectItem value="pescatarian">Pescatarian</SelectItem>
                    {/* Add more specific options if needed */}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="cuisine">Cuisine Style <span className="text-muted-foreground text-xs">(Optional)</span></Label>
                <Input
                  id="cuisine"
                  placeholder="e.g., Italian, Thai"
                  value={cuisineType}
                  onChange={(e) => setCuisineType(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="mealType">Meal Type</Label>
                <Select value={mealType} onValueChange={setMealType}>
                  <SelectTrigger id="mealType">
                    <SelectValue placeholder="Select meal type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any</SelectItem>
                    <SelectItem value="breakfast">Breakfast</SelectItem>
                    <SelectItem value="lunch">Lunch</SelectItem>
                    <SelectItem value="dinner">Dinner</SelectItem>
                    <SelectItem value="snack">Snack</SelectItem>
                    <SelectItem value="dessert">Dessert</SelectItem>
                    <SelectItem value="appetizer">Appetizer</SelectItem>
                    <SelectItem value="side-dish">Side Dish</SelectItem>
                    <SelectItem value="beverage">Beverage</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Submit Button */}
            <Button type="submit" disabled={isLoading || ingredientTags.length === 0} className="w-full md:w-auto">
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              {isLoading ? 'Generating...' : 'Generate Recipe'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Result Card (conditionally rendered) */}
      {(isLoading || error || recipeResult) && (
        <Card>
          <CardContent className="pt-6 space-y-4"> {/* Add padding top since no header */}
            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex flex-col items-center justify-center p-8 text-muted-foreground">
                <Loader2 className="h-8 w-8 animate-spin mb-3" />
                <span>Generating recipe...</span>
              </div>
            )}

            {/* Generation Error */}
            {error && (
              <Alert variant="destructive">
                <XCircle className="h-4 w-4" />
                <AlertTitle>Generation Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Result Display + Action Buttons */}
            {recipeResult && !isLoading && (
              <div className="space-y-4">
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                     <h2 className="text-2xl font-semibold ">{recipeResult.title}</h2>
                     {(recipeResult.timeEstimate || recipeResult.difficulty) && (
                        <div className="text-sm text-muted-foreground mt-1 space-x-2">
                          {recipeResult.difficulty && <span>{recipeResult.difficulty}</span>}
                          {recipeResult.difficulty && recipeResult.timeEstimate && <span>&bull;</span>}
                          {recipeResult.timeEstimate && <span>{recipeResult.timeEstimate}</span>}
                        </div>
                     )}
                  </div>
                  {/* Action Buttons Area */}
                  <div className="flex items-center space-x-2 flex-shrink-0">
                    {/* Copy Button */}
                    <Button
                      onClick={handleCopyRecipe}
                      disabled={copied} // Disable briefly after copying
                      size="sm"
                      variant="outline"
                      title="Copy recipe to clipboard"
                      className="min-w-[90px]"
                    >
                      {copied ? <Check className="mr-2 h-4 w-4 text-green-500" /> : <Copy className="mr-2 h-4 w-4" />}
                      {copied ? 'Copied!' : 'Copy'}
                    </Button>
                    {/* Regenerate Button */}
                    <Button
                      onClick={handleGenerateSubmit} // Call generation logic directly
                      disabled={isLoading || isSaving} // Disable if generating or saving
                      size="sm"
                      variant="outline"
                      title="Generate another idea with the same ingredients"
                    >
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Regenerate
                    </Button>
                    {/* Save Button */}
                    {isAuthenticated && (
                      <Button
                        onClick={handleSaveRecipe}
                        disabled={isSaving || saveSuccess}
                        size="sm"
                        variant={saveSuccess ? "outline" : "default"}
                        className={`min-w-[100px] ${saveSuccess ? 'cursor-not-allowed' : ''}`}
                        title={saveSuccess ? "Recipe already saved" : "Save this recipe to your collection"}
                      >
                        {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                        {saveSuccess ? <CheckCircle className="mr-2 h-4 w-4 text-green-500" /> : null}
                        {isSaving ? `Saving...` : (saveSuccess ? 'Saved' : 'Save Recipe')}
                      </Button>
                    )}
                  </div>
                </div>
                {saveError && (
                  <Alert variant="destructive" className="mt-2">
                     <XCircle className="h-4 w-4" />
                     <AlertTitle>Save Error</AlertTitle>
                     <AlertDescription>{saveError}</AlertDescription>
                  </Alert>
                )}
                <div className="border-t pt-4">
                  <h3 className="text-lg font-medium mb-2">Ingredients:</h3>
                  <ul className="list-disc list-inside space-y-1">
                    {recipeResult.ingredients.map((ingredient, index) => {
                      // Matching now uses the ingredientTags state
                      const isUserInput = ingredientTags.some(tag =>
                        ingredient.name.toLowerCase().includes(tag.toLowerCase())
                      );

                      return (
                        <li key={index}>
                          <span className="font-semibold">{ingredient.amount > 0 ? `${ingredient.amount} ` : ''}{ingredient.unit !== 'N/A' ? `${ingredient.unit} ` : ''}</span>
                          {isUserInput ? (
                            <span className="font-semibold">{ingredient.name}</span>
                          ) : (
                            ingredient.name
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Instructions:</h3>
                  <ol className="list-decimal list-inside space-y-1">
                    {recipeResult.instructions.map((instruction, index) => (
                      <li key={index}>{instruction}</li>
                    ))}
                  </ol>
                </div>

                {/* Nutrition Information Section */}
                {recipeResult.nutrition && (
                  <div className="border-t pt-4">
                    <h3 className="text-lg font-medium mb-2">Estimated Nutrition (per serving):</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-2 text-sm">
                      {recipeResult.nutrition.calories !== undefined && <div><strong>Calories:</strong> {recipeResult.nutrition.calories.toLocaleString()} kcal</div>}
                      {recipeResult.nutrition.protein !== undefined && <div><strong>Protein:</strong> {recipeResult.nutrition.protein} g</div>}
                      {recipeResult.nutrition.carbs !== undefined && <div><strong>Carbs:</strong> {recipeResult.nutrition.carbs} g</div>}
                      {recipeResult.nutrition.fat !== undefined && <div><strong>Fat:</strong> {recipeResult.nutrition.fat} g</div>}
                      {recipeResult.nutrition.fiber !== undefined && <div><strong>Fiber:</strong> {recipeResult.nutrition.fiber} g</div>}
                      {recipeResult.nutrition.sugar !== undefined && <div><strong>Sugar:</strong> {recipeResult.nutrition.sugar} g</div>}
                      {recipeResult.nutrition.sodium !== undefined && <div><strong>Sodium:</strong> {recipeResult.nutrition.sodium.toLocaleString()} mg</div>}
                      {recipeResult.nutrition.potassium !== undefined && <div><strong>Potassium:</strong> {recipeResult.nutrition.potassium.toLocaleString()} mg</div>}
                      {recipeResult.nutrition.calcium !== undefined && <div><strong>Calcium:</strong> {recipeResult.nutrition.calcium.toLocaleString()} mg</div>}
                    </div>
                    {recipeResult.nutrition.noteworthy_nutrients && recipeResult.nutrition.noteworthy_nutrients.length > 0 && (
                      <div className="mt-3">
                        <h4 className="font-medium text-sm mb-1">Noteworthy Nutrients:</h4>
                        <div className="flex flex-wrap gap-2">
                          {recipeResult.nutrition.noteworthy_nutrients.map((note, index) => (
                            <Badge key={index} variant="outline" className="text-xs font-normal">{note}</Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
} 