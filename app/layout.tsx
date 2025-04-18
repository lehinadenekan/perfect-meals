// app/layout.tsx
'use client'; // Layout is already a Client Component

import React, { useCallback } from 'react'; // Import useCallback
import './globals.css';
import { Providers } from './providers';
import { Toaster } from 'react-hot-toast';
import { FavouritesProvider } from './context/FavouritesContext';
import Navbar from '@/components/Navbar';
// --- Import useRouter ---
import { useRouter } from 'next/navigation';

// --- Remove Placeholder Search Handler if unused, keep if needed ---
// const placeholderOnSearch = async (term: string) => { console.log(`Search triggered for: ${term} - Placeholder`); };


export default function RootLayout({
  children,
  modal
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  // --- Get router instance ---
  const router = useRouter();

  // --- Define actual navigation function ---
  const handleHomeClick = useCallback(() => {
    router.push('/'); // Navigate to the homepage
  }, [router]); // Dependency on router

  // --- Placeholder search handler (replace if implementing search) ---
  const handleSearch = useCallback(async (term: string) => {
    console.log(`Search triggered for: ${term} - Placeholder`);
    // Example: Redirect to search page
    // router.push(`/search?query=${encodeURIComponent(term)}`);
  }, []); // <-- REMOVE 'router' from dependency array


  return (
    <html lang="en">
      <head>
        {/* Keep existing head elements */}
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1744468975179679"
          crossOrigin="anonymous"></script>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Recipe App</title>
      </head>
      <body className="bg-[#ffc800]">
        <Providers>
           {/* --- Pass the actual handleHomeClick function --- */}
           <Navbar onHomeClick={handleHomeClick} onSearch={handleSearch} />

           <FavouritesProvider>
             <main className="flex-grow">
                {children}
                {modal}
             </main>
             <Toaster />
           </FavouritesProvider>
        </Providers>
      </body>
    </html>
  );
}