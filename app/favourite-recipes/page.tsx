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
import AlbumDetailsView from '@/components/albums/AlbumDetailsView'; // Adjust path if needed
import type { FetchedAlbum } from '@/components/albums/AlbumManager'; // Adjust path/source if needed

type ActiveTab = 'favourites' | 'albums' | 'myRecipes';

export default function FavouriteRecipesPage() {
  const { data: session, status } = useSession();
  const [activeTab, setActiveTab] = useState<ActiveTab>('favourites');
  const router = useRouter();
  const [selectedAlbum, setSelectedAlbum] = useState<FetchedAlbum | null>(null);

  // Handler for Create Recipe button click
  const handleCreateRecipeClick = useCallback(() => {
    router.push('/create-recipe');
  }, [router]);

  // Handler for viewing album details
  const handleViewAlbum = useCallback((album: FetchedAlbum) => {
    setSelectedAlbum(album);
  }, []);

  // Handler for going back from album details view
  const handleBackFromAlbumDetails = useCallback(() => {
    setSelectedAlbum(null);
  }, []);

  // --- Define handler for Album Updates (Placeholder) ---
  const handleAlbumUpdate = useCallback(() => {
    // This function should ideally trigger a refresh of album data
    // For now, just log that it was called.
    console.log("Album update action triggered from AlbumDetailsView");
    // Example: Could potentially refetch the selected album's data
    // if (selectedAlbum) {
    //   fetch(`/api/albums/${selectedAlbum.id}`).then(...).then(updatedAlbum => setSelectedAlbum(updatedAlbum));
    // }
  }, []); // Add dependencies if needed, e.g. [selectedAlbum]


  // Define the function to render content based on the active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case 'favourites':
        if (selectedAlbum) setSelectedAlbum(null);
        return <UserFavourites />;

      case 'albums':
        if (selectedAlbum) {
          return (
            <AlbumDetailsView
              album={selectedAlbum}
              onBack={handleBackFromAlbumDetails}
              // --- Pass the handleAlbumUpdate function ---
              onAlbumUpdate={handleAlbumUpdate}
            />
          );
        } else {
          return <UserAlbums onViewAlbum={handleViewAlbum} />;
        }

      case 'myRecipes':
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

  const getTitle = () => {
    if (activeTab === 'albums' && selectedAlbum) {
        return selectedAlbum.name;
    }
    return "My Library";
  }

  return (
    <>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative py-4">
         <button
            onClick={() => {
                if (activeTab === 'albums' && selectedAlbum) {
                    handleBackFromAlbumDetails();
                } else {
                    router.back();
                }
            }}
            className="absolute left-4 top-4 sm:left-6 sm:top-6 p-2 rounded-full bg-white hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center group shadow-md z-10"
            aria-label="Go back"
         >
            <ArrowLeftIcon className="h-6 w-6 text-gray-600 group-hover:text-gray-800" />
         </button>

         <h1 className="text-3xl font-bold text-center mb-8 mt-12 text-gray-900">{getTitle()}</h1>

         {!(activeTab === 'albums' && selectedAlbum) && (
             <div className="flex justify-center space-x-2 mb-8">
                 <TabButton
                     isActive={activeTab === 'favourites'}
                     onClick={() => { setActiveTab('favourites'); setSelectedAlbum(null); }}
                 >
                     All Favourites
                 </TabButton>
                 <TabButton
                     isActive={activeTab === 'albums'}
                     onClick={() => { setActiveTab('albums'); setSelectedAlbum(null); }}
                 >
                     Albums
                 </TabButton>
                 <TabButton
                     isActive={activeTab === 'myRecipes'}
                     onClick={() => { setActiveTab('myRecipes'); setSelectedAlbum(null); }}
                 >
                     My Recipes
                 </TabButton>
             </div>
         )}

         <div>
            <Suspense fallback={<div className="flex justify-center items-center min-h-[200px]"><LoadingSpinner /></div>}>
              {renderTabContent()}
            </Suspense>
         </div>
      </div>
    </>
  );
}