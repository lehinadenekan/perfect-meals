// app/favourite-recipes/page.tsx
'use client'; // This page needs client-side interactivity (state, router)

import React, { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
// Assuming Navbar is in app/components/Navbar.tsx
import Navbar from '@/app/components/Navbar';
// Import FavouriteRecipes from its new location
import FavouriteRecipes from '@/app/components/favourites/FavouriteRecipes';
// Import LoadingSpinner if needed for Suspense, though FavouriteRecipes might handle its own loading
// import LoadingSpinner from '@/app/components/shared/LoadingSpinner';

export default function FavouriteRecipesPage() { // Changed function name for clarity
  const router = useRouter();

  // State needed for FavouriteRecipes' props
  // (We keep this here as the page owns the context for refreshing albums)
  const [albumRefreshTrigger, setAlbumRefreshTrigger] = useState(0);
  const triggerAlbumRefresh = useCallback(() => {
    console.log("FavouriteRecipesPage: Triggering album list refresh");
    setAlbumRefreshTrigger(prev => prev + 1);
  }, []);

  // Handler for the 'onBack' prop of FavouriteRecipes component
  // This determines where the back button *within* the favourites view goes
  const handleGoBackHome = useCallback(() => {
    router.push('/'); // Navigate to the home page
  }, [router]);

  // Placeholder search handler for Navbar for this specific page
  const handleSearch = useCallback(async (term: string) => {
    // Redirect to home page (or search results page) with search query
    router.push(`/?q=${encodeURIComponent(term)}`);
  }, [router]);

  return (
    // Add the main layout wrapper with background
    <main className="min-h-screen bg-[#ffc800]">
      {/* Include the Navbar */}
      <Navbar
        onHomeClick={() => router.push('/')} // Home button goes to '/'
        onSearch={handleSearch}
        // Add other props Navbar might need (e.g., session status if handled there)
      />

      {/* Container for the main content */}
      <div className="container mx-auto p-4 md:p-8">
        {/* Render the FavouriteRecipes component, passing necessary props */}
        <FavouriteRecipes
          onBack={handleGoBackHome} // Pass the handler for its internal back button
          onAlbumUpdate={triggerAlbumRefresh} // Pass the callback
          albumRefreshTrigger={albumRefreshTrigger} // Pass the state value
        />
      </div>
    </main>
  );
}