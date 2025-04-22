import React, { useState, useEffect } from 'react';
import RecipeCard from '../recipe/RecipeCard';
import RecipeDetailModal from '../recipe/RecipeDetailModal';
// Import necessary Prisma types
import type { Album as PrismaAlbum, RecipeToAlbum, Recipe as PrismaRecipe } from '@prisma/client';
import { Recipe as FrontendRecipe } from '@/lib/types/recipe'; // Import frontend Recipe type
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
    recipe: PrismaRecipe & { isFavourite?: boolean }; // Expect full PrismaRecipe + isFavourite
  })[];
};

// Local state will use the frontend Recipe type

interface AlbumDetailsViewProps {
  album: FetchedAlbum;
  onBack: () => void;
  onAlbumUpdate: () => void;
}

export default function AlbumDetailsView({
  album,
  onBack,
  onAlbumUpdate: _onAlbumUpdate,
}: AlbumDetailsViewProps) {
  // Local state uses the frontend Recipe type, plus isFavourite
  const [recipes, setRecipes] = useState<(FrontendRecipe & { isFavourite?: boolean })[]>([]);

  // --- State for Modal Control ---
  const [selectedRecipe, setSelectedRecipe] = useState<(FrontendRecipe & { isFavourite?: boolean }) | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Sync local state when the album prop changes
  useEffect(() => {
    // Map the nested Prisma recipes from the prop to the frontend state format.
    // Assume the API *might not* provide all FrontendRecipe fields.
    // Map only fields known/likely to exist on the incoming `recipe` object.
    const initialRecipes = album.recipes.map(({ recipe }) => {
      const partialFrontendRecipe: Partial<FrontendRecipe> & { id: string; title: string; isFavourite?: boolean } = {
        // Fields very likely to exist
        id: recipe.id,
        title: recipe.title,
        description: recipe.description ?? undefined,
        cookingTime: recipe.cookingTime ?? 0,
        servings: recipe.servings ?? 0,
        difficulty: recipe.difficulty ?? 'MEDIUM',
        continent: recipe.continent ?? undefined,
        regionOfOrigin: recipe.regionOfOrigin ?? undefined,
        imageUrl: recipe.imageUrl ?? undefined,
        authorId: recipe.authorId ?? undefined,
        isVegetarian: recipe.isVegetarian ?? false,
        isVegan: recipe.isVegan ?? false,
        isGlutenFree: recipe.isGlutenFree ?? false,
        isNutFree: recipe.isNutFree ?? false,
        isLowFodmap: recipe.isLowFodmap ?? false,
        isLactoseFree: recipe.isLactoseFree ?? false,
        isPescatarian: recipe.isPescatarian ?? false,
        isFermented: recipe.isFermented ?? false,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ingredients: (recipe as any).ingredients ?? [],
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        instructions: (recipe as any).instructions ?? [],
        createdAt: recipe.createdAt,
        updatedAt: recipe.updatedAt,
        // Add favourite status (which the API route should now provide)
        isFavourite: recipe.isFavourite ?? undefined,
        // Omit fields that consistently cause type errors (calories, videoUrl, type, etc.)
      };
      // Cast to FrontendRecipe, acknowledging it might be partial
      return partialFrontendRecipe as FrontendRecipe & { isFavourite?: boolean };
    });
    setRecipes(initialRecipes);
  }, [album]);

  // --- Callback for Favourite Changes ---
  const handleFavouriteChange = (recipeId: string, newIsFavourite: boolean) => {
    setRecipes(currentRecipes =>
      currentRecipes.map(recipe =>
        recipe.id === recipeId
          ? { ...recipe, isFavourite: newIsFavourite }
          : recipe
      )
    );
    if (selectedRecipe && selectedRecipe.id === recipeId) {
      setSelectedRecipe(prev => prev ? { ...prev, isFavourite: newIsFavourite } : null);
    }
  };

  // --- Modal Handlers ---
  const handleOpenModal = (recipe: FrontendRecipe) => {
    const currentRecipeData = recipes.find(r => r.id === recipe.id);
    setSelectedRecipe(currentRecipeData || { ...recipe, isFavourite: undefined });
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
                  recipe={recipe}
                  onSelect={handleOpenModal}
                  onFavouriteChange={handleFavouriteChange}
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
          onFavouriteChange={handleFavouriteChange}
        />
      )}
    </>
  );
} 