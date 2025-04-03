import React from 'react';
import RecipeCard from '../recipe/RecipeCard';
// Import necessary Prisma types
import type { Album as PrismaAlbum, RecipeToAlbum, Recipe } from '@prisma/client';

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

// Define the type for the fetched album data, including the nested recipe relation
type FetchedAlbum = PrismaAlbum & {
  recipes: (RecipeToAlbum & {
    recipe: Recipe;
  })[];
};

interface AlbumDetailsViewProps {
  // Update prop type
  album: FetchedAlbum; 
  onBack: () => void; 
  onAlbumUpdate: () => void; 
}

export default function AlbumDetailsView({ album, onBack, onAlbumUpdate }: AlbumDetailsViewProps) {
  return (
    <div className="w-full">
      <div className="flex items-center mb-6">
        <button
          onClick={onBack}
          className="mr-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Back to albums"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
        </button>
        <div>
            <h2 className="text-2xl font-bold">Album: {album.name}</h2>
            {album.description && (
                <p className="text-sm text-gray-600 mt-1">{album.description}</p>
            )}
        </div>
      </div>

      {album.recipes.length === 0 ? (
        <p className="text-center text-gray-500 py-8">This album doesn&apos;t have any recipes yet.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center">
          {/* Accessing the nested recipe should work correctly with FetchedAlbum type */}
          {album.recipes.map(({ recipe }) => (
            <div key={recipe.id} className="w-full flex justify-center">
                 <RecipeCard
                    // The @ts-expect-error might no longer be needed if the full Recipe type is sufficient
                    // @ts-expect-error - Re-evaluate if this is still necessary after type changes
                    recipe={recipe}
                    onAlbumUpdate={onAlbumUpdate}
                 />
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 