// app/favorites/page.tsx
'use client'; // This page needs client-side interactivity (state, router)

import React, { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar'; // Assuming Navbar is reusable
import FavoriteRecipes from '@/components/favourite-recipes/FavouriteRecipes';

export default function FavoritesPage() {
  const router = useRouter();

  // State needed for FavoriteRecipes' props
  const [albumRefreshTrigger, setAlbumRefreshTrigger] = useState(0);
  const triggerAlbumRefresh = useCallback(() => {
    console.log("FavoritesPage: Triggering album list refresh");
    setAlbumRefreshTrigger(prev => prev + 1);
  }, []);

  // Handler for the 'onBack' prop of FavoriteRecipes
  const handleGoBackHome = useCallback(() => {
    router.push('/'); // Navigate to the home page
  }, [router]);

  // Placeholder search handler for Navbar if needed on this page (REMOVING)
  // const handleSearch = useCallback(async (term: string) => {
  //   // Redirect to home page with search query
  //   router.push(`/?q=${encodeURIComponent(term)}`);
  // }, [router]);

  return (
    // Use a consistent main layout structure, perhaps similar to app/page.tsx
    <main className="min-h-screen bg-[#ffc800]">
      {/* Include the Navbar */}
      <Navbar
        // onHomeClick={() => router.push('/')} // REMOVED: Redundant, Navbar has Discover link
        // onSearch={handleSearch} // REMOVED
        // Add other props Navbar might need (e.g., session status if handled there)
      />

      {/* Container for the main content */}
      <div className="container mx-auto p-4 md:p-8">
        {/* Render the FavoriteRecipes component */}
        <FavoriteRecipes
          onBack={handleGoBackHome} // Use the new handler
          onAlbumUpdate={triggerAlbumRefresh} // Pass the callback
          albumRefreshTrigger={albumRefreshTrigger} // Pass the state value
        />
      </div>
    </main>
  );
}