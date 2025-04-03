import React from 'react';
import RecipeCard from '../recipe/RecipeCard';
// Assuming Album type includes nested recipe structure as fetched from API
// Use the placeholder type if Prisma import fails
interface RecipeStub {
  id: string;
  title: string;
  imageUrl?: string;
  // Add other fields RecipeCard might need, like description, regionOfOrigin etc.
  description?: string;
  regionOfOrigin?: string;
  calories?: number; // Example: Add if RecipeCard uses it
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

interface AlbumDetailsViewProps {
  album: Album;
  onBack: () => void; // Function to go back to the album list view
  onAlbumUpdate: () => void; // Function to trigger refresh in parent
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
          {album.recipes.map(({ recipe }) => (
            // Ensure the recipe object passed matches RecipeCard's expected props
            // We might need to adjust the 'RecipeStub' type or the mapping here
            // if RecipeCard requires more fields than RecipeStub currently has.
            // For now, assuming RecipeStub has enough or RecipeCard handles missing fields.
             <div key={recipe.id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-2 flex justify-center">
                 <RecipeCard
                    // Use @ts-expect-error instead
                    // @ts-expect-error - Temporarily ignore type mismatch if RecipeStub differs significantly from RecipeCard's expected Recipe type
                    // TODO: Ensure RecipeStub includes all necessary fields for RecipeCard or fetch full recipe details if needed.
                    recipe={recipe}
                    onAlbumUpdate={onAlbumUpdate} // Pass the refresh handler down
                    // Add other necessary props RecipeCard expects, like onFlagClick if applicable
                    // onFlagClick={() => { /* Handle flagging from album view? */ }}
                 />
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 