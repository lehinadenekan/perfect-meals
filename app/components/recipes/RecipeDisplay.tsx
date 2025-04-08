import React from 'react';
import Image from 'next/image';
import {
  ClockIcon,
  UserIcon,
  BeakerIcon,
} from '@heroicons/react/24/outline';
// Remove the old Recipe type import
// import { Recipe } from '@/app/types/recipe'; 

// Use the type defined in lib/data.ts
import { RecipeDetailData } from '@/app/lib/data'; 

// Define props using the server data type
interface RecipeDisplayProps {
  recipe: RecipeDetailData; // Use the type from lib/data
  servingMultiplier?: number; // Optional prop for adjusted servings
}

// Helper function to group ingredients - needs to accept RecipeDetailData type
function groupIngredients(ingredients: RecipeDetailData['ingredients']) { // Use RecipeDetailData type
  const groups: {
    main: RecipeDetailData['ingredients'];
    spices: RecipeDetailData['ingredients'];
    garnish: RecipeDetailData['ingredients'];
    other: RecipeDetailData['ingredients'];
  } = {
    main: [],
    spices: [],
    garnish: [],
    other: []
  };

  if (!ingredients) return groups; // Handle null/undefined ingredients

  ingredients.forEach(ing => {
     if (!ing || typeof ing.name !== 'string') return; // Basic validation

     // Now notes should exist on the type
     const notesLower = ing.notes?.toLowerCase(); 

     if (notesLower?.includes('garnish')) {
       groups.garnish.push(ing);
     } else if (['salt', 'pepper', 'cumin', 'paprika', 'oregano', 'thyme', 'basil', 'cayenne'].some(
       spice => ing.name.toLowerCase().includes(spice)
     )) {
       groups.spices.push(ing);
     } else if (notesLower?.includes('optional')) {
       groups.other.push(ing);
     } else {
       groups.main.push(ing);
     }
  });

  return groups;
}


export default function RecipeDisplay({ recipe, servingMultiplier = 1 }: RecipeDisplayProps) {
  if (!recipe) {
    return <div className="p-6 text-center text-red-500">Recipe data is missing.</div>;
  }

  // Group ingredients
  const ingredientGroups = groupIngredients(recipe.ingredients);

  const adjustAmount = (amount: number | null | undefined) => {
     if (amount == null) return '-'; // Handle null/undefined amounts
    return (amount * servingMultiplier).toFixed(1).replace(/\.0$/, '');
  };

  return (
    <div className="recipe-display-container"> {/* Add a class for potential styling */}
        {/* Image */}
        {recipe.imageUrl && (
           <div className="relative w-full h-64 md:h-80"> {/* Container for aspect ratio/layout */}
                <Image
                  src={recipe.imageUrl}
                  alt={recipe.title}
                  layout="fill" // Use Next.js Image optimization
                  objectFit="cover"
                  className="rounded-t-lg" // Apply rounding if needed at the top
                  priority // Prioritize loading if it's above the fold
                />
            </div>
        )}

      {/* Content Padding */}
      <div className="p-4 md:p-6">

        {/* Title and Basic Info */} 
        <h1 className="text-2xl md:text-3xl font-bold mb-2">{recipe.title}</h1>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-600 mb-4">
            {recipe.cookingTime && (
                <span className="flex items-center">
                    <ClockIcon className="h-4 w-4 mr-1" /> {recipe.cookingTime} min
                </span>
            )}
            {recipe.servings && (
                <span className="flex items-center">
                    <UserIcon className="h-4 w-4 mr-1" /> {recipe.servings * servingMultiplier} servings
                </span>
            )}
             {recipe.difficulty && (
                <span className="flex items-center">
                    <BeakerIcon className="h-4 w-4 mr-1" /> {recipe.difficulty}
                </span>
            )}
             {/* Add CuisineType, etc. if available */}
             {recipe.cuisineType && (
                 <span className="capitalize">{recipe.cuisineType}</span>
             )}
        </div>

        {/* Description */}
        {recipe.description && (
            <p className="text-gray-700 mb-6">{recipe.description}</p>
        )}

        {/* Ingredients and Instructions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          {/* Ingredients Column */}
          <div>
            <h2 className="text-xl font-semibold mb-3 border-b pb-1">Ingredients</h2>
            {/* Render ingredient groups */}
            {Object.entries(ingredientGroups).map(([groupName, ingredients]) => (
              ingredients.length > 0 && (
                <div key={groupName} className="mb-3">
                  {groupName !== 'main' && <h3 className="text-sm font-medium capitalize text-gray-600 mb-1">{groupName}</h3>}
                  <ul className="list-disc pl-5 space-y-1 text-sm text-gray-800">
                    {ingredients.map((ing) => (
                      <li key={ing.id}>
                        {adjustAmount(ing.amount)} {ing.unit} {ing.name}
                        {ing.notes && <span className="text-xs text-gray-500 italic ml-1">({ing.notes})</span>}
                      </li>
                    ))}
                  </ul>
                </div>
              )
            ))}
            {/* Display notes if they exist and are not empty */}
            {recipe.notes && recipe.notes.length > 0 && (
                 <div className="mt-4">
                     <h3 className="text-lg font-semibold mb-2">Notes</h3>
                     <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                         {recipe.notes.map((note, index) => (
                             <li key={index}>{note}</li>
                         ))}
                     </ul>
                 </div>
             )}
          </div>

          {/* Instructions Column */}
          <div>
            <h2 className="text-xl font-semibold mb-3 border-b pb-1">Instructions</h2>
            {recipe.instructions && recipe.instructions.length > 0 ? (
                 <ol className="list-decimal pl-5 space-y-3 text-sm text-gray-800">
                     {/* Instructions should already be sorted by the data fetcher */}
                    {recipe.instructions.map((inst) => (
                    <li key={inst.id} className="prose prose-sm max-w-none">
                        {inst.description}
                        {/* Placeholder for timer controls - logic remains in modal */}
                        {/* {parseDuration(inst.description) && <span> (Timer available)</span>} */}
                    </li>
                    ))}
                </ol>
            ) : (
                <p className="text-sm text-gray-500">No instructions provided.</p>
            )}
          </div>
        </div>

      </div> {/* End Content Padding */} 
    </div>
  );
} 