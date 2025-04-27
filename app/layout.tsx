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
import { ThemeProvider } from "@/components/theme-provider"; // Import ThemeProvider

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

  // --- Placeholder search handler (replace if implementing search) ---
  const handleSearch = useCallback(async (term: string) => {
    console.log(`Search triggered for: ${term} - Placeholder`);
    // Example: Redirect to search page
    router.push(`/search?query=${encodeURIComponent(term)}`);
  }, [router]); // <-- ADD 'router' back to dependency array


  return (
    <html lang="en" suppressHydrationWarning> {/* Add suppressHydrationWarning */}
      <head>
        {/* Keep existing head elements */}
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1744468975179679"
          crossOrigin="anonymous"></script>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Recipe Ideas</title>
      </head>
      <body className="bg-yellow-400 text-foreground dark:bg-gray-950">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Providers>
             {/* --- Pass the actual handleHomeClick function --- */}
             <Navbar onSearch={handleSearch} />

             <FavouritesProvider>
               <main className="flex-grow">
                  {children}
                  {modal}
               </main>
               <Toaster />
             </FavouritesProvider>
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}