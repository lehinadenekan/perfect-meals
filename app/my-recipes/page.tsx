// app/my-recipes/page.tsx
'use client';

import React, { useState, Suspense, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

import LoadingSpinner from '@/components/shared/LoadingSpinner';
import TabButton from '@/components/shared/TabButton';
import UserFavourites from '@/components/favourite-recipes/UserFavourites';
import UserAlbums from '@/components/favourite-recipes/UserAlbums';
import UserRecipes from '@/components/my-recipes/UserRecipes'; // Renamed from My Recipes to Imported
import AlbumDetailsView from '@/components/albums/AlbumDetailsView';
import type { FetchedAlbum } from '@/components/albums/AlbumManager';

// Placeholder for the new component
const UserCreatedRecipes = () => (
  <div className="text-center p-4 border rounded-lg shadow-sm bg-white">
    Your created recipes will appear here.
  </div>
);


// 1. Update the ActiveTab type to include 'created'
type ActiveTab = 'favourites' | 'albums' | 'myRecipes' | 'created';

export default function MyCollectionPage() { // Renamed component for clarity
  const { data: _session, status } = useSession();
  // Default to 'created' tab or another as preferred
  const [activeTab, setActiveTab] = useState<ActiveTab>('created');
  const router = useRouter();
  const [selectedAlbum, setSelectedAlbum] = useState<FetchedAlbum | null>(null);

  const handleViewAlbum = useCallback((album: FetchedAlbum) => {
    setActiveTab('albums'); // Ensure album tab is active when viewing details
    setSelectedAlbum(album);
  }, []);

  const handleBackFromAlbumDetails = useCallback(() => {
    setSelectedAlbum(null);
    // Optionally set activeTab back to 'albums' or keep the previous state
  }, []);

  const handleAlbumUpdate = useCallback(() => {
    // Logic for when an album is updated (e.g., refetch or update state)
    console.log("Album update action triggered from AlbumDetailsView");
    // You might want to refetch the album data here or update the selectedAlbum state
  }, []);


  // 3. Update the renderTabContent Function to include 'created' case
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
              onAlbumUpdate={handleAlbumUpdate} // Pass handler
            />
          );
        } else {
          return <UserAlbums onViewAlbum={handleViewAlbum} />;
        }

      case 'myRecipes': // This is now the 'Imported' tab content
        if (selectedAlbum) setSelectedAlbum(null);
        return <UserRecipes />;

      case 'created': // Add case for the new 'Created' tab
        if (selectedAlbum) setSelectedAlbum(null);
        return <UserCreatedRecipes />; // Render the new component

      default:
        if (selectedAlbum) setSelectedAlbum(null);
         // Default to 'created' or another preferred tab
        return <UserCreatedRecipes />;
    }
  };


  if (status === 'loading') {
    return <div className="flex justify-center items-center min-h-screen"><LoadingSpinner /></div>;
  }

  // Redirect or show message if not logged in
  if (status === 'unauthenticated') {
     // router.push('/api/auth/signin'); // Option: Redirect to login
     return <div className="text-center mt-10">Please log in to view your collection.</div>;
  }

  // Determine the title based on the current view
  const getTitle = () => {
    if (activeTab === 'albums' && selectedAlbum) {
        return selectedAlbum.name; // Show album name when viewing details
    }
     // Consistent title for the main page sections
    return "My Collection";
  }

  return (
    <>
      {/* Use a container for consistent padding and centering */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative py-4">
         {/* Enhanced Back Button */}
         <button
            onClick={() => {
                // Go back from album details view
                if (activeTab === 'albums' && selectedAlbum) {
                    handleBackFromAlbumDetails();
                } else {
                // Standard browser back navigation
                    router.back();
                }
            }}
            // Styling for the back button
            className="absolute left-4 top-4 sm:left-6 sm:top-6 lg:left-8 lg:top-8 p-2 rounded-full bg-white hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center group shadow-md z-10"
            aria-label="Go back"
         >
            <ArrowLeftIcon className="h-6 w-6 text-gray-600 group-hover:text-gray-800" />
         </button>

         {/* Page Title */}
         <h1 className="text-3xl font-bold text-center mb-8 mt-16 text-gray-900">{getTitle()}</h1>

         {/* Render tabs only when not viewing album details */}
         {!(activeTab === 'albums' && selectedAlbum) && (
             <div className="flex justify-center space-x-2 mb-8 border-b border-gray-200">
                 {/* 2. Add the 'Created' Tab Button */}
                  <TabButton
                     isActive={activeTab === 'created'}
                     onClick={() => { setActiveTab('created'); setSelectedAlbum(null); }}
                  >
                     Created
                  </TabButton>
                 <TabButton
                     isActive={activeTab === 'favourites'}
                     onClick={() => { setActiveTab('favourites'); setSelectedAlbum(null); }}
                  >
                    Favourites
                 </TabButton>
                 <TabButton
                     isActive={activeTab === 'albums'}
                     onClick={() => { setActiveTab('albums'); setSelectedAlbum(null); }}
                  >
                     Albums
                 </TabButton>
                 <TabButton
                     isActive={activeTab === 'myRecipes'} // This tab is now 'Imported'
                     onClick={() => { setActiveTab('myRecipes'); setSelectedAlbum(null); }}
                  >
                    Imported
                 </TabButton>
             </div>
         )}

         {/* Main content area */}
         <div>
            {/* Suspense for loading states within tabs */}
            <Suspense fallback={<div className="flex justify-center items-center min-h-[200px]"><LoadingSpinner /></div>}>
              {renderTabContent()}
            </Suspense>
         </div>
      </div>
    </>
  );
}