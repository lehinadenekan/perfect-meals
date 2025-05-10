import React, { useState, useEffect } from 'react';
import { Recipe } from '@/lib/types/recipe';
import Image from 'next/image';
import { GlobeAltIcon } from '@heroicons/react/24/outline';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';
// import { analyzeDietary } from '@/lib/utils/dietary-classification'; // Removed unused import
import DietaryInfo from './DietaryInfo';
import FavoriteButton from '../shared/FavouriteButton';
import AddToAlbumButton from '../albums/AddToAlbumButton';
import AddToAlbumModal from '../albums/AddToAlbumModal';
import { Clock, BarChart, User, Import } from 'lucide-react';
// import Link from 'next/link';

interface RecipeCardProps {
  recipe: Recipe & { 
    isFavourite?: boolean; 
    regions?: { id: string; name: string }[];
  };
  onFavouriteChange: (recipeId: string, newIsFavorite: boolean) => void;
  onCardClick?: (recipeId: string) => void; // Add this if you want to open the detail modal from parent
}

export default function RecipeCard({
  recipe,
  onFavouriteChange,
  onCardClick,
}: RecipeCardProps) {
  const { data: session } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

  // --- Analyze Dietary ---
  // const dietaryAnalysis = analyzeDietary(recipe);

  // --- Button Click Handler ---
  const handleAddToAlbumButtonClick = () => {
    if (!session) {
      toast.error("Log In to manage albums");
    } else {
      setIsModalOpen(true);
    }
  };

  // --- Card Click Handler ---
  const handleCardClick = () => {
    if (onCardClick) {
      onCardClick(recipe.id);
    } else {
      // fallback: navigate to detail page if no modal handler is provided
      window.location.href = `/recipes/${recipe.id}`;
    }
  };

  // --- Prepare image source ---
  const imageSrc = recipe.imageUrl || '/images/default-recipe.jpg';

  // Function to determine appropriate source icon
  const renderSourceIcon = () => {
    if (recipe.source === 'USER_CREATED') {
      return (
        <span title="Created by user">
          <User size={16} className="mr-1.5 text-blue-600 flex-shrink-0" aria-label="Created by user" />
        </span>
      );
    } else if (recipe.source === 'USER_IMPORTED') {
      return (
        <span title="Imported by user">
          <Import size={16} className="mr-1.5 text-green-600 flex-shrink-0" aria-label="Imported by user" />
        </span>
      );
    } else {
      return null; // No icon for ADMIN or other sources
    }
  };

  return (
    <>
      <div
        className="block bg-white rounded-lg shadow-md overflow-hidden w-full transition-all duration-300 hover:shadow-lg hover:translate-y-[-2px] cursor-pointer group min-h-[600px] flex flex-col"
        onClick={handleCardClick}
      >
        <div className="relative w-full aspect-[4/3] overflow-hidden bg-gray-200">
          <Image
            key={imageSrc}
            src={imageSrc}
            alt={recipe.title}
            layout="fill"
            objectFit="cover"
            className="transition-opacity duration-300 group-hover:opacity-90"
            priority={false}
            onError={(e) => {
              console.error(`Failed to load image for ${recipe.title}: ${imageSrc}`, e);
              (e.target as HTMLImageElement).src = '/images/default-recipe.jpg';
            }}
          />
        </div>

        <div className="p-4 flex flex-col flex-grow">
          <div className="mb-2">
            <h3 className="font-semibold text-lg break-words line-clamp-2 mb-1 flex items-center">
              {renderSourceIcon()}
              <span className="truncate" title={recipe.title}>{recipe.title}</span>
            </h3>
            <p className="text-sm text-gray-600 line-clamp-2 break-words" title={recipe.description}>
              {recipe.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500 mb-3">
            {recipe.cookingTime && (
              <span className="flex items-center">
                <Clock size={12} className="mr-1" /> {recipe.cookingTime} min
              </span>
            )}
            {recipe.difficulty && (
              <span className="flex items-center">
                <BarChart size={12} className="mr-1" /> {recipe.difficulty}
              </span>
            )}
          </div>

          <div className="mb-2">
            <DietaryInfo recipe={recipe} />
          </div>

          {recipe.cookingStyles && recipe.cookingStyles.length > 0 && (
            <div className="mb-3 pt-1">
              <h4 className="text-xs font-medium text-gray-700 mb-1">Cooking Styles:</h4>
              <div className="flex flex-wrap gap-1">
                {recipe.cookingStyles.map((style: string) => (
                  <span
                    key={style}
                    className="px-2 py-0.5 text-xs bg-gray-100 text-gray-700 rounded-full"
                  >
                    {style}
                  </span>
                ))}
              </div>
            </div>
          )}

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

          <div className="mb-2">
            <div className="flex items-center space-x-2">
              <GlobeAltIcon className="w-5 h-5 text-gray-500 flex-shrink-0" />
              <span className="text-sm text-gray-600">
                {recipe.regions && recipe.regions.length > 0
                  ? recipe.regions.map((region: { id?: string; name: string }, index: number) => (
                      <span key={region.id || region.name}>
                        {region.name}
                        {index < (recipe.regions?.length ?? 0) - 1 ? ', ' : ''}
                      </span>
                    ))
                  : recipe.regionOfOrigin || 'N/A'
                }
              </span>
            </div>
          </div>

          <div
            className="flex items-center justify-between w-full h-[32px] mt-auto pt-2 border-t border-gray-100"
          >
            <div className="flex items-center">
              {onFavouriteChange && (
                <FavoriteButton
                  recipeId={recipe.id}
                  initialIsFavourite={!!recipe.isFavourite}
                  onSuccess={onFavouriteChange}
                />
              )}
            </div>
            <div className="flex items-center space-x-1 relative">
              {session && (
                <AddToAlbumButton onClick={handleAddToAlbumButtonClick} />
              )}
            </div>
          </div>
        </div>
      </div>

      {session && (
        <AddToAlbumModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          recipeId={recipe.id}
        />
      )}
    </>
  );
}