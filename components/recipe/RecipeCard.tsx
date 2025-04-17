import React, { useState } from 'react';
import { Recipe } from '@/lib/types/recipe';
import Image from 'next/image';
import { GlobeAltIcon } from '@heroicons/react/24/outline';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';
import { analyzeDietary } from '@/lib/utils/dietary-classification';
import DietaryInfo from './DietaryInfo';
import { DietaryFeedback } from './DietaryFeedback';
import FavoriteButton from '../shared/FavouriteButton';
import AddToAlbumButton from '../albums/AddToAlbumButton';
import AlbumSelectionDropdown from '../albums/AlbumSelectionDropdown';

interface RecipeCardProps {
  recipe: Recipe & { isFavourite?: boolean };
  onFlagClick?: () => void;
  onAlbumUpdate?: () => void;
  onSelect: (recipe: Recipe) => void;
  onFavouriteChange: (recipeId: string, newIsFavorite: boolean) => void;
}

export default function RecipeCard({
  recipe,
  onFlagClick,
  onAlbumUpdate,
  onSelect,
  onFavouriteChange
}: RecipeCardProps) {
  const { data: session } = useSession();
  // Log the recipe data being used by this card instance
  // console.log(`RecipeCard rendering. ID: ${recipe.id}, Title: ${recipe.title}, ImageURL: ${recipe.imageUrl}`);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // --- Analyze Dietary (No changes needed here) ---
  const dietaryAnalysis = (recipe.ingredients && Array.isArray(recipe.ingredients))
    ? analyzeDietary(recipe)
    : {
      isLowFodmap: false,
      fodmapScore: 0,
      fodmapDetails: [],
      isFermented: false,
      fermentationScore: 0,
      fermentationDetails: {
        mainIngredients: [],
        flavorings: [],
        preparationMethod: false,
      },
      hasNuts: false,
      isPescatarian: false,
    };

  // --- Album Handlers (No changes needed here) ---
  const handleAddToAlbum = async (albumId: string) => {
    console.log(`RecipeCard: Adding recipe ${recipe.id} to album ${albumId}`);
    try {
      const response = await fetch(`/api/albums/${albumId}/recipes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ recipeId: recipe.id }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to add recipe to album');
      }
      console.log("Successfully added to album");
      onAlbumUpdate?.();
    } catch (error) {
      console.error("Error adding recipe to album:", error);
      // Re-throw or handle as needed, maybe toast.error
      toast.error(`Error: ${error instanceof Error ? error.message : 'Could not add to album'}`);
    }
  };

  const handleCreateAndAddAlbum = async (albumName: string) => {
    console.log(`RecipeCard: Creating album "${albumName}" and adding recipe ${recipe.id}`);
    try {
      const response = await fetch('/api/albums', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: albumName, recipeId: recipe.id }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create album');
      }
      console.log("Successfully created album and added recipe");
      onAlbumUpdate?.();
      toast.success(`Album "${albumName}" created and recipe added.`);
    } catch (error) {
      console.error("Error creating album:", error);
      toast.error(`Error: ${error instanceof Error ? error.message : 'Could not create album'}`);
    }
  };

  const handleAddToAlbumButtonClick = () => {
    if (!session) {
      toast.error("Log In to manage albums");
    } else {
      setIsDropdownOpen(!isDropdownOpen);
    }
  };

  // --- Prepare image source, adding logging ---
  const imageSrc = recipe.imageUrl || '/images/default-recipe.jpg';
  // console.log(`RecipeCard [${recipe.title}]: Using image src: ${imageSrc}`); // Log the final src

  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden w-[240px] h-[555px] transition-all duration-300 hover:shadow-lg hover:translate-y-[-2px] cursor-pointer"
      onClick={() => onSelect(recipe)}
    >
      {/* --- Simplified Image Component for Testing --- */}
      <div className="relative w-full aspect-[4/3] overflow-hidden bg-gray-200"> {/* Added bg color */}
        <Image
          key={imageSrc} // Add key to help React differentiate if src changes rapidly
          src={imageSrc}
          alt={recipe.title}
          width={240} // Fixed width (adjust as needed)
          height={180} // Fixed height (maintain aspect ratio, adjust as needed)
          style={{ objectFit: 'cover' }} // Use style for objectFit with fixed dimensions
          priority={false} // Usually false for list items, true only for LCP
          // Removed className and onError for simplification
          // Add a basic onError fallback if needed after testing
          onError={(e) => {
             console.error(`Failed to load image for ${recipe.title}: ${imageSrc}`, e);
             // Attempt to set fallback directly (might not work reliably with Next/Image)
             // const target = e.target as HTMLImageElement;
             // target.src = '/images/default-recipe.jpg';
             // Consider managing a state to show a placeholder div instead
           }}
        />
        {/* Gradient overlay can remain if desired */}
        {/* <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div> */}
      </div>

      {/* --- Rest of the card content (No changes) --- */}
      <div className="p-4 flex flex-col h-[calc(555px-180px)]"> {/* Adjust height calculation */}
        <div className="flex-grow flex flex-col justify-between"> {/* Adjust structure slightly */}
          {/* Title and Description */}
          <div className="mb-2"> {/* Reduced bottom margin */}
            <h3 className="font-semibold text-lg break-words line-clamp-2 mb-1"> {/* Allow title to wrap */}
              {recipe.title}
            </h3>
            <p className="text-sm text-gray-600 line-clamp-2 break-words" title={recipe.description}>
              {recipe.description}
            </p>
          </div>

          {/* Dietary Info */}
          <div className="mb-2"> {/* Reduced bottom margin */}
            <DietaryInfo analysis={dietaryAnalysis} recipe={recipe} />
          </div>

          {/* Nutrition */}
          <div className="mb-2"> {/* Reduced bottom margin */}
            <div className="flex flex-col space-y-1 text-sm text-gray-600"> {/* Reduced spacing */}
              <div className="flex items-center space-x-2 whitespace-nowrap">
                <span className="w-2 h-2 rounded-full bg-red-500 flex-shrink-0"></span>
                <span>Carbs: {recipe.nutritionFacts?.carbs != null ? `${recipe.nutritionFacts.carbs}g` : 'N/A'}</span>
              </div>
              <div className="flex items-center space-x-2 whitespace-nowrap">
                <span className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0"></span>
                <span>Protein: {recipe.nutritionFacts?.protein != null ? `${recipe.nutritionFacts.protein}g` : 'N/A'}</span>
              </div>
              <div className="flex items-center space-x-2 whitespace-nowrap">
                <span className="w-2 h-2 rounded-full bg-yellow-500 flex-shrink-0"></span>
                <span>Fat: {recipe.nutritionFacts?.fat != null ? `${recipe.nutritionFacts.fat}g` : 'N/A'}</span>
              </div>
            </div>
          </div>

          {/* Region */}
          <div className="mb-2"> {/* Reduced bottom margin */}
            <div className="flex items-center space-x-2 whitespace-nowrap">
              <GlobeAltIcon className="w-5 h-5 text-gray-500 flex-shrink-0" />
              <span className="text-sm text-gray-600">{recipe.regionOfOrigin || 'N/A'}</span>
            </div>
          </div>
        </div>

        {/* Actions Footer */}
        <div
          className="flex items-center justify-between w-full h-[32px] mt-auto pt-2 border-t border-gray-100" // Adjusted height/padding
          onClick={(e) => e.stopPropagation()} // Prevent card click when clicking actions
        >
          <div className="flex items-center whitespace-nowrap">
            <DietaryFeedback onFlagClick={onFlagClick} />
          </div>
          <div className="flex items-center space-x-1 relative"> {/* Reduced spacing */}
            <FavoriteButton
              recipeId={recipe.id}
              initialIsFavourite={recipe.isFavourite}
              onSuccess={onFavouriteChange}
              // Consider adding size prop if available in FavoriteButton
            />
            <AddToAlbumButton
              onClick={handleAddToAlbumButtonClick}
              title={!session ? "Log In to manage albums" : "Add to album"}
               // Consider adding size prop if available
            />
            {session && isDropdownOpen && (
              <AlbumSelectionDropdown
                recipeId={recipe.id}
                onClose={() => setIsDropdownOpen(false)}
                onAddToAlbum={handleAddToAlbum}
                onCreateAndAddAlbum={handleCreateAndAddAlbum}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}