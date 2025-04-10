// app/recently-viewed/page.tsx
'use client'; // This page needs client-side interactivity

// Re-add useState and useCallback
import React, { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/app/components/Navbar'; // Assuming Navbar is reusable
import RecentlyViewedRecipes from '@/app/components/recently-viewed/RecentlyViewedRecipes';
// LoadingSpinner might be needed if RecentlyViewedRecipes doesn't handle its own loading
// import LoadingSpinner from '@/app/components/shared/LoadingSpinner';

export default function RecentlyViewedPage() {
  const router = useRouter();

  // Re-add state and callback needed for RecentlyViewedRecipes' props
  const [_albumRefreshTrigger, setAlbumRefreshTrigger] = useState(0); // Add underscore
  const triggerAlbumRefresh = useCallback(() => {
    console.log("RecentlyViewedPage: Triggering album list refresh");
    setAlbumRefreshTrigger(prev => prev + 1);
  }, []); // Empty dependency array is fine if it only uses setters/constants

  // Handler for the 'onBack' prop needed by RecentlyViewedRecipes
  const handleGoBackHome = useCallback(() => {
    router.push('/'); // Navigate to the home page
  }, [router]);

  // Placeholder search handler for Navbar for this specific page
  const handleSearch = useCallback(async (term: string) => {
    // Redirect to home page (or search results page) with search query
    router.push(`/?q=${encodeURIComponent(term)}`);
  }, [router]);

  return (
    // Use a consistent main layout structure
    <main className="min-h-screen bg-[#ffc800]">
      {/* Include the Navbar */}
      <Navbar
        onHomeClick={() => router.push('/')}
        onSearch={handleSearch}
        // Add other props Navbar might need
      />

      {/* Container for the main content */}
      <div className="container mx-auto p-4 md:p-8">
        {/* Render the RecentlyViewedRecipes component */}
        <RecentlyViewedRecipes
          onBack={handleGoBackHome} // Pass the needed handler
          onAlbumUpdate={triggerAlbumRefresh} // Re-add the required prop
        />
      </div>
    </main>
  );
}
