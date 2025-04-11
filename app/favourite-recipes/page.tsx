// app/favourite-recipes/page.tsx
'use client';

import React, { useState, Suspense, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

import LoadingSpinner from '@/components/shared/LoadingSpinner';
import TabButton from '@/components/shared/TabButton';
import UserFavourites from '@/components/favourite-recipes/UserFavourites';
import UserAlbums from '@/components/favourite-recipes/UserAlbums';
import UserRecipes from '@/components/my-recipes/UserRecipes';
// --- Import Album Details View and Album Type ---
import AlbumDetailsView from '@/components/albums/AlbumDetailsView'; // Adjust path if needed
// Assuming FetchedAlbum type is defined in AlbumManager or a shared types file
// If it's in AlbumManager, you might need to export it from there first
// Or define it in a central types file (e.g., lib/types/album.ts)
import type { FetchedAlbum } from '@/components/albums/AlbumManager'; // Adjust path/source if needed

type ActiveTab = 'favourites' | 'albums' | 'myRecipes';

export default function FavouriteRecipesPage() {
  const { data: session, status } = useSession();
  const [activeTab, setActiveTab] = useState<ActiveTab>('favourites');
  const router = useRouter();

  // --- State for managing album detail view ---
  const [selectedAlbum, setSelectedAlbum] = useState<FetchedAlbum | null>(null);

  // Handler for Create Recipe button click
  const handleCreateRecipeClick = useCallback(() => {
    router.push('/create-recipe');
  }, [router]);

  // --- Handler for viewing album details ---
  const handleViewAlbum = useCallback((album: FetchedAlbum) => {
    setSelectedAlbum(album);
    // Optionally, you might want to ensure the 'albums' tab is active
    // setActiveTab('albums'); // Uncomment if needed, but might be redundant
  }, []);

  // --- Handler for going back from album details view ---
  const handleBackFromAlbumDetails = useCallback(() => {
    setSelectedAlbum(null);
  }, []);


  // Define the function to render content based on the active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case 'favourites':
        // Ensure selectedAlbum is cleared if user switches tab
        if (selectedAlbum) setSelectedAlbum(null);
        return <UserFavourites />;

      case 'albums':
        // --- Conditionally render Album List or Details ---
        if (selectedAlbum) {
          return (
            <AlbumDetailsView
              album={selectedAlbum}
              onBack={handleBackFromAlbumDetails}
              // Pass onAlbumUpdate if AlbumDetailsView needs it
              // onAlbumUpdate={() => { /* Potentially refresh data */ }}
            />
          );
        } else {
          // Pass handleViewAlbum down to UserAlbums -> AlbumManager
          return <UserAlbums onViewAlbum={handleViewAlbum} />;
        }

      case 'myRecipes':
        // Ensure selectedAlbum is cleared if user switches tab
        if (selectedAlbum) setSelectedAlbum(null);
        return <UserRecipes onCreateClick={handleCreateRecipeClick} />;

      default:
        return null;
    }
  };

  if (status === 'loading') {
    return <div className="flex justify-center items-center h-screen"><LoadingSpinner /></div>;
  }

  if (!session) {
     return <div className="text-center mt-10">Please log in to view your information.</div>;
  }

  // Determine main title based on view
  const getTitle = () => {
    if (activeTab === 'albums' && selectedAlbum) {
        return selectedAlbum.name; // Show selected album name as title
    }
    return "My Library"; // Default title
  }

  return (
    <>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative py-4">
         <button
            // --- Modify back button logic for album view ---
            onClick={() => {
                if (activeTab === 'albums' && selectedAlbum) {
                    handleBackFromAlbumDetails(); // Go back to album list
                } else {
                    router.back(); // Default back navigation
                }
            }}
            className="absolute left-4 top-4 sm:left-6 sm:top-6 p-2 rounded-full bg-white hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center group shadow-md z-10" // Ensure button is clickable
            aria-label="Go back"
         >
            <ArrowLeftIcon className="h-6 w-6 text-gray-600 group-hover:text-gray-800" />
         </button>

         {/* Page Title */}
         <h1 className="text-3xl font-bold text-center mb-8 mt-12 text-gray-900">{getTitle()}</h1>

         {/* Tab Buttons - Hide tabs when viewing album details? Optional */}
         {!(activeTab === 'albums' && selectedAlbum) && (
             <div className="flex justify-center space-x-2 mb-8">
                 <TabButton
                     isActive={activeTab === 'favourites'}
                     onClick={() => { setActiveTab('favourites'); setSelectedAlbum(null); }} // Clear album selection on tab change
                 >
                     All Favourites
                 </TabButton>
                 <TabButton
                     isActive={activeTab === 'albums'}
                     onClick={() => { setActiveTab('albums'); setSelectedAlbum(null); }} // Clear album selection on tab change
                 >
                     Albums
                 </TabButton>
                 <TabButton
                     isActive={activeTab === 'myRecipes'}
                     onClick={() => { setActiveTab('myRecipes'); setSelectedAlbum(null); }} // Clear album selection on tab change
                 >
                     My Recipes
                 </TabButton>
             </div>
         )}

         {/* Tab Content Area */}
         <div>
            <Suspense fallback={<div className="flex justify-center items-center min-h-[200px]"><LoadingSpinner /></div>}>
              {renderTabContent()}
            </Suspense>
         </div>
      </div>
    </>
  );
}