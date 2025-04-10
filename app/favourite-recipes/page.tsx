// app/favourite-recipes/page.tsx
'use client';

// Consolidated React import including lazy
import React, { useState, useCallback, Suspense, lazy } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/app/components/Navbar';
import LoadingSpinner from '@/app/components/shared/LoadingSpinner'; // Assuming you have a spinner
import { Button } from '@/components/ui/button'; // Using Shadcn Button

// Define types for tab identifiers
type ActiveTab = 'all' | 'albums' | 'my-recipes';

// --- Lazy load tab content components ---
// Using the correct path 'favourite-recipes'
const AllFavouritesTab = lazy(() => import('@/app/components/favourite-recipes/FavouriteRecipes'));
const AlbumsTab = lazy(() => import('@/app/components/favourite-recipes/AlbumsTab'));
const MyRecipesTab = lazy(() => import('@/app/components/favourite-recipes/MyRecipesTab'));


export default function FavouriteRecipesPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<ActiveTab>('all'); // Default to 'all'

  // State for triggering album refresh (might be needed by AlbumsTab)
  const [albumRefreshTrigger, setAlbumRefreshTrigger] = useState(0);
  const triggerAlbumRefresh = useCallback(() => {
    console.log("FavouriteRecipesPage: Triggering album list refresh");
    setAlbumRefreshTrigger(prev => prev + 1);
  }, []);

  // Handler for Navbar search
  const handleSearch = useCallback(async (term: string) => {
    router.push(`/?q=${encodeURIComponent(term)}`);
  }, [router]);

  // Handler for the back button within the content area (if needed)
  const handleGoBackHome = useCallback(() => {
    router.push('/'); // Navigate to the home page
  }, [router]);

  // --- Render Tab Content ---
  const renderTabContent = () => {
    switch (activeTab) {
      case 'all':
        return <AllFavouritesTab onBack={handleGoBackHome} onAlbumUpdate={triggerAlbumRefresh} albumRefreshTrigger={albumRefreshTrigger} />;
      case 'albums':
        return <AlbumsTab albumRefreshTrigger={albumRefreshTrigger} onAlbumUpdate={triggerAlbumRefresh} />;
      case 'my-recipes':
        return <MyRecipesTab />;
      default:
        return null;
    }
  };

  return (
    <main className="min-h-screen bg-[#ffc800]">
      <Navbar
        onHomeClick={() => router.push('/')}
        onSearch={handleSearch}
      />

      <div className="container mx-auto p-4 md:p-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">My Collection</h1>

        <div className="flex space-x-2 border-b border-gray-300 mb-6">
          <Button
            variant={activeTab === 'all' ? 'secondary' : 'ghost'}
            onClick={() => setActiveTab('all')}
            className={`pb-2 rounded-none ${activeTab === 'all' ? 'border-b-2 border-black font-semibold' : 'font-normal'} hover:bg-yellow-100 text-gray-700 hover:text-black`}
          >
            All Favourites
          </Button>
          <Button
             variant={activeTab === 'albums' ? 'secondary' : 'ghost'}
             onClick={() => setActiveTab('albums')}
             className={`pb-2 rounded-none ${activeTab === 'albums' ? 'border-b-2 border-black font-semibold' : 'font-normal'} hover:bg-yellow-100 text-gray-700 hover:text-black`}
          >
            Albums
          </Button>
          <Button
             variant={activeTab === 'my-recipes' ? 'secondary' : 'ghost'}
             onClick={() => setActiveTab('my-recipes')}
             className={`pb-2 rounded-none ${activeTab === 'my-recipes' ? 'border-b-2 border-black font-semibold' : 'font-normal'} hover:bg-yellow-100 text-gray-700 hover:text-black`}
          >
            My Recipes
          </Button>
        </div>

        <div>
          <Suspense fallback={<LoadingSpinner />}>
            {renderTabContent()}
          </Suspense>
        </div>
      </div>
    </main>
  );
}