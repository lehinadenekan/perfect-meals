import React, { useState } from 'react';
import { Recipe } from '@/app/types/recipe';
import Image from 'next/image';
import { GlobeAltIcon } from '@heroicons/react/24/outline';
import { analyzeDietary } from '@/app/utils/dietary-classification';
import DietaryInfo from './DietaryInfo';
import { DietaryFeedback } from './DietaryFeedback';
import FavoriteButton from '../shared/FavoriteButton';
import RecipeDetailModal from './RecipeDetailModal';
import AddToAlbumButton from '../albums/AddToAlbumButton';
import AlbumSelectionDropdown from '../albums/AlbumSelectionDropdown';

interface RecipeCardProps {
  recipe: Recipe;
  isLoggedIn?: boolean;
  onFlagClick?: () => void;
  onAlbumUpdate?: () => void;
}

export default function RecipeCard({ recipe, onFlagClick, onAlbumUpdate }: RecipeCardProps) {
  // --- DEBUG: Log the received recipe prop ---
  console.log(`RecipeCard rendering with recipe:`, recipe);
  // -----------------------------------------

  const [showDetailModal, setShowDetailModal] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // RE-ADD check: Perform dietary analysis only if ingredients are present
  const dietaryAnalysis = (recipe.ingredients && Array.isArray(recipe.ingredients))
    ? analyzeDietary(recipe)
    : { // Provide a default DietaryAnalysis object
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

  // Calculate macros, using 0 if calories missing
  const caloriesForCalc = recipe.calories || 0;
  const approximateCarbs = Math.round(caloriesForCalc * 0.5 / 4);
  const approximateProtein = Math.round(caloriesForCalc * 0.25 / 4);
  const approximateFat = Math.round(caloriesForCalc * 0.25 / 9);

  // --- API Call Handlers --- 
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
      throw error;
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
    } catch (error) {
      console.error("Error creating album:", error);
      throw error;
    }
  };

  return (
    <>
      <div
        className="bg-white rounded-lg shadow-md overflow-hidden w-[240px] h-[555px] transition-all duration-300 hover:shadow-lg hover:translate-y-[-2px] cursor-pointer"
        onClick={() => setShowDetailModal(true)}
      >
        {/* Image container with gradient overlay */}
        <div className="relative h-[140px] w-full">
          <Image
            src={recipe.imageUrl || '/images/default-recipe.jpg'}
            alt={recipe.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col h-[415px]">
          {/* Title section - fixed height for up to 6 lines */}
          <div className="h-[144px] mb-4 flex flex-col justify-between">
            <h3 className="font-semibold text-lg break-words">
              {recipe.title}
            </h3>
            {/* Description - now part of the title container for consistent positioning */}
            <p className="text-sm text-gray-600 line-clamp-2 break-words mt-auto" title={recipe.description}>
              {recipe.description}
            </p>
          </div>

          {/* Dietary Information - Render based on analysis */}
          <div className="h-[80px] mb-4">
            <DietaryInfo analysis={dietaryAnalysis} recipe={recipe} />
          </div>

          {/* Nutritional Information - Display N/A if original calories missing */}
          <div className="h-[72px] mb-4">
            <div className="flex flex-col space-y-2 text-sm text-gray-600">
              <div className="flex items-center space-x-2 whitespace-nowrap">
                <span className="w-2 h-2 rounded-full bg-red-500"></span>
                {/* Check actual recipe.calories for display */}
                <span>Carbs: {recipe.calories ? `${approximateCarbs}g` : 'N/A'}</span>
              </div>
              <div className="flex items-center space-x-2 whitespace-nowrap">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                {/* Check actual recipe.calories for display */}
                <span>Protein: {recipe.calories ? `${approximateProtein}g` : 'N/A'}</span>
              </div>
              <div className="flex items-center space-x-2 whitespace-nowrap">
                <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                {/* Check actual recipe.calories for display */}
                <span>Fat: {recipe.calories ? `${approximateFat}g` : 'N/A'}</span>
              </div>
            </div>
          </div>

          {/* Region of origin - aligned with the bullet points */}
          <div className="mb-4">
            <div className="flex items-center space-x-2 whitespace-nowrap">
              <GlobeAltIcon className="w-5 h-5 text-gray-500 flex-shrink-0" />
              <span className="text-sm text-gray-600">{recipe.regionOfOrigin || 'Global'}</span>
            </div>
          </div>

          {/* Bottom row with flag and heart icons - aligned with bullet points */}
          <div
            className="flex items-center justify-between w-full h-[24px]"
            onClick={(e) => e.stopPropagation()} // Prevent modal from opening when clicking these buttons
          >
            <div className="flex items-center whitespace-nowrap">
              <DietaryFeedback onFlagClick={onFlagClick} />
            </div>
            <div className="flex items-center space-x-2 relative">
              <FavoriteButton recipeId={recipe.id} />
              <AddToAlbumButton onClick={() => setIsDropdownOpen(!isDropdownOpen)} />
              {isDropdownOpen && (
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

      <RecipeDetailModal
        recipe={recipe}
        isOpen={showDetailModal}
        onClose={() => setShowDetailModal(false)}
      />
    </>
  );
}