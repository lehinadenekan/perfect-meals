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
  console.log(`RecipeCard rendering with recipe:`, recipe);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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

  const handleAddToAlbumButtonClick = () => {
    if (!session) {
      toast.error("Log In to manage albums");
    } else {
      setIsDropdownOpen(!isDropdownOpen);
    }
  };

  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden w-[240px] h-[555px] transition-all duration-300 hover:shadow-lg hover:translate-y-[-2px] cursor-pointer"
      onClick={() => onSelect(recipe)}
    >
      <div className="relative h-[140px] w-full">
        <Image
          src={recipe.imageUrl || '/images/default-recipe.jpg'}
          alt={recipe.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
      </div>

      <div className="p-4 flex flex-col h-[415px]">
        <div className="h-[144px] mb-4 flex flex-col justify-between">
          <h3 className="font-semibold text-lg break-words">
            {recipe.title}
          </h3>
          <p className="text-sm text-gray-600 line-clamp-2 break-words mt-auto" title={recipe.description}>
            {recipe.description}
          </p>
        </div>

        <div className="h-[80px] mb-4">
          <DietaryInfo analysis={dietaryAnalysis} recipe={recipe} />
        </div>

        <div className="h-[72px] mb-4">
          <div className="flex flex-col space-y-2 text-sm text-gray-600">
            <div className="flex items-center space-x-2 whitespace-nowrap">
              <span className="w-2 h-2 rounded-full bg-red-500"></span>
              <span>Carbs: {recipe.nutritionFacts?.carbs != null ? `${recipe.nutritionFacts.carbs}g` : 'N/A'}</span>
            </div>
            <div className="flex items-center space-x-2 whitespace-nowrap">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              <span>Protein: {recipe.nutritionFacts?.protein != null ? `${recipe.nutritionFacts.protein}g` : 'N/A'}</span>
            </div>
            <div className="flex items-center space-x-2 whitespace-nowrap">
              <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
              <span>Fat: {recipe.nutritionFacts?.fat != null ? `${recipe.nutritionFacts.fat}g` : 'N/A'}</span>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex items-center space-x-2 whitespace-nowrap">
            <GlobeAltIcon className="w-5 h-5 text-gray-500 flex-shrink-0" />
            <span className="text-sm text-gray-600">{recipe.regionOfOrigin || 'Global'}</span>
          </div>
        </div>

        <div
          className="flex items-center justify-between w-full h-[24px] mt-auto pt-2 border-t border-gray-100"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center whitespace-nowrap">
            <DietaryFeedback onFlagClick={onFlagClick} />
          </div>
          <div className="flex items-center space-x-2 relative">
            <FavoriteButton
              recipeId={recipe.id}
              initialIsFavourite={recipe.isFavourite}
              onSuccess={onFavouriteChange}
            />
            <AddToAlbumButton
              onClick={handleAddToAlbumButtonClick}
              title={!session ? "Log In to manage albums" : "Add to album"}
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