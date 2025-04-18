import React, { useState } from 'react'; // Added useState back
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
import AddToAlbumModal from '../albums/AddToAlbumModal'; // Import the modal

interface RecipeCardProps {
  recipe: Recipe & { isFavourite?: boolean };
  onFlagClick?: () => void;
  onSelect: (recipe: Recipe) => void;
  onFavouriteChange: (recipeId: string, newIsFavorite: boolean) => void;
  // Removed onAddToAlbumClick prop
  // If the parent needs to refresh when an album is updated via the modal,
  // you might need to add back an `onAlbumUpdate` prop later.
}

export default function RecipeCard({
  recipe,
  onFlagClick,
  onSelect,
  onFavouriteChange,
  // Removed onAddToAlbumClick from destructuring
}: RecipeCardProps) {
  const { data: session } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility

  // --- Analyze Dietary ---
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

  // --- Button Click Handler ---
  const handleAddToAlbumButtonClick = () => {
    if (!session) {
      toast.error("Log In to manage albums");
    } else {
      // Open the modal internally
      setIsModalOpen(true);
    }
  };

  // --- Prepare image source ---
  const imageSrc = recipe.imageUrl || '/images/default-recipe.jpg';

  return (
    <> {/* Wrap in Fragment to render modal alongside card */}
      <div
        className="bg-white rounded-lg shadow-md overflow-hidden w-[240px] h-[555px] transition-all duration-300 hover:shadow-lg hover:translate-y-[-2px] cursor-pointer"
        // Prevent modal close when clicking card background if modal is open
        onClick={isModalOpen ? (e) => e.stopPropagation() : () => onSelect(recipe)}
      >
        {/* --- Image Component --- */}
        <div className="relative w-full aspect-[4/3] overflow-hidden bg-gray-200">
          <Image
            key={imageSrc}
            src={imageSrc}
            alt={recipe.title}
            width={240}
            height={180}
            style={{ objectFit: 'cover' }}
            priority={false}
            onError={(e) => {
               console.error(`Failed to load image for ${recipe.title}: ${imageSrc}`, e);
             }}
          />
        </div>

        {/* --- Card Content --- */}
        <div className="p-4 flex flex-col h-[calc(555px-180px)]">
          <div className="flex-grow flex flex-col justify-between">
            {/* Title and Description */}
            <div className="mb-2">
              <h3 className="font-semibold text-lg break-words line-clamp-2 mb-1">
                {recipe.title}
              </h3>
              <p className="text-sm text-gray-600 line-clamp-2 break-words" title={recipe.description}>
                {recipe.description}
              </p>
            </div>

            {/* Dietary Info */}
            <div className="mb-2">
              <DietaryInfo analysis={dietaryAnalysis} recipe={recipe} />
            </div>

            {/* Nutrition */}
            <div className="mb-2">
              <div className="flex flex-col space-y-1 text-sm text-gray-600">
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
            <div className="mb-2">
              <div className="flex items-center space-x-2 whitespace-nowrap">
                <GlobeAltIcon className="w-5 h-5 text-gray-500 flex-shrink-0" />
                <span className="text-sm text-gray-600">{recipe.regionOfOrigin || 'N/A'}</span>
              </div>
            </div>
          </div>

          {/* --- Actions Footer --- */}
          <div
            className="flex items-center justify-between w-full h-[32px] mt-auto pt-2 border-t border-gray-100"
            onClick={(e) => e.stopPropagation()} // Prevent card click when clicking actions
          >
            <div className="flex items-center whitespace-nowrap">
              <DietaryFeedback onFlagClick={onFlagClick} />
            </div>
            <div className="flex items-center space-x-1 relative">
              <FavoriteButton
                recipeId={recipe.id}
                initialIsFavourite={recipe.isFavourite}
                onSuccess={onFavouriteChange}
              />
              <AddToAlbumButton
                onClick={handleAddToAlbumButtonClick} // This now opens the modal internally
                title={!session ? "Log In to manage albums" : "Add to album"}
              />
            </div>
          </div>
        </div>
      </div>

      {/* --- Render Modal Conditionally --- */}
      {session && ( // Only render modal if logged in
          <AddToAlbumModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)} // Function to close the modal
            recipeId={recipe.id} // Pass the current recipe ID
            // Add onAlbumUpdate prop here if needed later:
            // onAlbumUpdate={() => onAlbumUpdate?.()}
          />
      )}
    </>
  );
}