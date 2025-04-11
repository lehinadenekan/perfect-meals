// app/layout.tsx
'use client'; // --- Make Layout a Client Component ---

import React from 'react';
import './globals.css';
import { Providers } from './providers'; // Assuming this includes SessionProvider
import { Toaster } from 'react-hot-toast';
import { FavouritesProvider } from './context/FavouritesContext';
import Navbar from '@/components/Navbar'; // --- Import Navbar ---

// Placeholder function for Navbar props - Replace with actual implementation if needed
const placeholderOnHomeClick = () => { console.log("Home clicked - Placeholder"); };
const placeholderOnSearch = async (term: string) => { console.log(`Search triggered for: ${term} - Placeholder`); };


export default function RootLayout({
  children,
  modal
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Keep existing head elements */}
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1744468975179679"
          crossOrigin="anonymous"></script>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Recipe App</title> {/* Add a default title */}
      </head>
      {/* --- Added yellow background class to body --- */}
      <body className="bg-[#ffc800]">
        {/* Providers likely contains SessionProvider, ThemeProvider etc. */}
        <Providers>
           {/* --- Render Navbar --- */}
           {/* Now okay to pass functions as Layout is also a Client Component */}
           <Navbar onHomeClick={placeholderOnHomeClick} onSearch={placeholderOnSearch} />

           {/* Wrap the main content area with FavouritesProvider */}
           {/* It needs to be inside Providers to access session state */}
           <FavouritesProvider>
             {/* --- Wrap children/modal in a main tag for semantics --- */}
             <main className="flex-grow">
                {children}
                {modal}
             </main>
             <Toaster /> {/* Toaster for notifications */}
           </FavouritesProvider>
        </Providers>
      </body>
    </html>
  );
}