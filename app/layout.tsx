// app/layout.tsx
'use client'; // Layout is already a Client Component

import React from 'react'; // Removed useCallback as handleSearch will be removed
import './globals.css';
import { Providers } from './providers';
import { Toaster } from 'react-hot-toast';
import { FavouritesProvider } from './context/FavouritesContext';
import Navbar from '@/components/Navbar';
// --- Import useRouter ---
// import { useRouter } from 'next/navigation'; // Removed as handleSearch will be removed
import { SessionProvider } from 'next-auth/react';
// import type { Session } from 'next-auth'; // No longer passing session prop

// --- Remove Placeholder Search Handler if unused, keep if needed ---
// const placeholderOnSearch = async (term: string) => { console.log(`Search triggered for: ${term} - Placeholder`); };


export default function RootLayout({
  children,
  modal,
  // session // No longer receiving session as a direct prop
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
  // session: Session | null; // No longer typing session prop
}) {
  // --- Get router instance ---
  // const router = useRouter(); // Removed as handleSearch will be removed

  // --- Placeholder search handler (REMOVING) ---
  // const handleSearch = useCallback(async (term: string) => {
  //   console.log(`Search triggered for: ${term} - Placeholder`);
  //   // Example: Redirect to search page
  //   router.push(`/search?query=${encodeURIComponent(term)}`);
  // }, [router]);


  return (
    <html lang="en" suppressHydrationWarning> {/* Remove suppressHydrationWarning if only used for next-themes */}
      <head>
        {/* Keep existing head elements */}
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1744468975179679"
          crossOrigin="anonymous"></script>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Recipe Ideas</title>
      </head>
      <body className="bg-[#ffc800] text-foreground">
        <SessionProvider> {/* SessionProvider without session prop */}
          <Providers>
             <Navbar />
             <FavouritesProvider>
               <main className="flex-grow bg-[#ffc800]">
                  {children}
                  {modal}
               </main>
               <Toaster />
             </FavouritesProvider>
          </Providers>
        </SessionProvider>
      </body>
    </html>
  );
}