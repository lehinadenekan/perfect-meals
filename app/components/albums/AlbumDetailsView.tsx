import React, { useState, useEffect } from 'react';
import RecipeCard from '../recipe/RecipeCard';
import RecipeDetailModal from '../recipe/RecipeDetailModal';
// Import necessary Prisma types
import type { Album as PrismaAlbum, RecipeToAlbum, Recipe as PrismaRecipe } from '@prisma/client';
import { Recipe as FrontendRecipe } from '@/app/types/recipe'; // Import frontend Recipe type
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

// Remove local interface definitions
/*
interface RecipeStub {
  id: string;
  title: string;
  imageUrl?: string;
  description?: string;
  regionOfOrigin?: string;
  calories?: number; 
}
interface RecipeLink {
  recipe: RecipeStub;
}
interface Album {
  id: string;
  name: string;
  description?: string;
  recipes: RecipeLink[];
}
*/

// Define the type for the fetched album data
type FetchedAlbum = PrismaAlbum & {
  recipes: (RecipeToAlbum & {
    recipe: PrismaRecipe & { isFavorite?: boolean }; // Expect full PrismaRecipe + isFavorite
  })[];
};

// Local state will use the frontend Recipe type

interface AlbumDetailsViewProps {
  album: FetchedAlbum;
  onBack: () => void;
  onAlbumUpdate: () => void;
}

export default function AlbumDetailsView({ album, onBack, onAlbumUpdate }: AlbumDetailsViewProps) {
  // Local state uses the frontend Recipe type, plus isFavorite
  const [recipes, setRecipes] = useState<(FrontendRecipe & { isFavorite?: boolean })[]>([]);

  // --- State for Modal Control ---
  const [selectedRecipe, setSelectedRecipe] = useState<(FrontendRecipe & { isFavorite?: boolean }) | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Sync local state when the album prop changes
  useEffect(() => {
    // Map the nested Prisma recipes from the prop to the frontend state format.
    // Assume the API *might not* provide all FrontendRecipe fields.
    // Map only fields known/likely to exist on the incoming `recipe` object.
    const initialRecipes = album.recipes.map(({ recipe }) => {
      const partialFrontendRecipe: Partial<FrontendRecipe> & { id: string; title: string; isFavorite?: boolean } = {
        // Fields very likely to exist
        id: recipe.id,
        title: recipe.title,
        description: recipe.description ?? undefined,
        cookingTime: recipe.cookingTime ?? 0,
        servings: recipe.servings ?? 0,
        difficulty: recipe.difficulty ?? 'MEDIUM',
        cuisineType: recipe.cuisineType ?? 'Unknown',
        regionOfOrigin: recipe.regionOfOrigin ?? undefined,
        imageUrl: recipe.imageUrl ?? undefined,
        authorId: recipe.authorId,
        isVegetarian: recipe.isVegetarian ?? false,
        isVegan: recipe.isVegan ?? false,
        isGlutenFree: recipe.isGlutenFree ?? false,
        isNutFree: recipe.isNutFree ?? false,
        isLowFodmap: recipe.isLowFodmap ?? false,
        isLactoseFree: recipe.isLactoseFree ?? false,
        isPescatarian: recipe.isPescatarian ?? false,
        isFermented: recipe.isFermented ?? false,
        // needsDietaryReview seems specific to Prisma, omit it if not in FrontendRecipe
        // needsDietaryReview: recipe.needsDietaryReview ?? false, 
        // Safely add relations if they exist, otherwise default to empty array
        ingredients: (recipe as any).ingredients ?? [], // Use 'as any' to bypass potential type error if not included
        instructions: (recipe as any).instructions ?? [], // Use 'as any' to bypass potential type error if not included
        createdAt: recipe.createdAt,
        updatedAt: recipe.updatedAt,
        // Add favorite status (which the API route should now provide)
        isFavorite: recipe.isFavorite ?? undefined,
        // Omit fields that consistently cause type errors (calories, videoUrl, type, etc.)
      };
      // Cast to FrontendRecipe, acknowledging it might be partial
      return partialFrontendRecipe as FrontendRecipe & { isFavorite?: boolean };
    });
    setRecipes(initialRecipes);
  }, [album]);

  // --- Callback for Favorite Changes ---
  const handleFavoriteChange = (recipeId: string, newIsFavorite: boolean) => {
    setRecipes(currentRecipes =>
      currentRecipes.map(recipe =>
        recipe.id === recipeId
          ? { ...recipe, isFavorite: newIsFavorite }
          : recipe
      )
    );
    if (selectedRecipe && selectedRecipe.id === recipeId) {
      setSelectedRecipe(prev => prev ? { ...prev, isFavorite: newIsFavorite } : null);
    }
  };

  // --- Modal Handlers ---
  const handleOpenModal = (recipe: FrontendRecipe) => {
    const currentRecipeData = recipes.find(r => r.id === recipe.id);
    setSelectedRecipe(currentRecipeData || { ...recipe, isFavorite: undefined });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRecipe(null);
  };

  return (
    <>
      <div className="w-full">
        <div className="flex items-center mb-6">
          <button
            onClick={onBack}
            className="mr-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Back to albums"
          >
            <ArrowLeftIcon className="w-6 h-6" />
          </button>
          <div>
            <h2 className="text-2xl font-bold">Album: {album.name}</h2>
            {album.description && (
              <p className="text-sm text-gray-600 mt-1">{album.description}</p>
            )}
          </div>
        </div>

        {recipes.length === 0 ? (
          <p className="text-center text-gray-500 py-8">This album doesn&apos;t have any recipes yet.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center">
            {recipes.map((recipe) => (
              <div key={recipe.id} className="w-full flex justify-center">
                <RecipeCard
                  recipe={recipe} // Pass the full FrontendRecipe
                  onSelect={handleOpenModal}
                  onFavoriteChange={handleFavoriteChange}
                  onAlbumUpdate={onAlbumUpdate}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Render Modal Conditionally */}
      {selectedRecipe && (
        <RecipeDetailModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          recipe={selectedRecipe} // Pass selected recipe (FrontendRecipe type)
          onFavoriteChange={handleFavoriteChange}
        />
      )}
    </>
  );
} 