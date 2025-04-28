import React, { Suspense } from 'react';
import HomePageClient from '../components/HomePageClient'; // Import the new client component

// This page component now only sets up the Suspense boundary
export default function Home() {
  return (
    <main className="min-h-screen bg-[#ffc800]">
      {/* Navbar might need to be outside Suspense if it doesn't use client hooks,
          or moved inside HomePageClient if it does (like handling search input)
          Assuming Navbar is relatively static or handles its own state/client needs.
          If Navbar triggers search, ensure HomePageClient handles it via props/context.
          Let's assume Navbar is okay here for now, but keep in mind.
      */}
      {/* Render the client component within Suspense */}
      <Suspense fallback={<div className="text-center p-8">Loading...</div>}>
        <HomePageClient />
      </Suspense>
    </main>
  );
} 
