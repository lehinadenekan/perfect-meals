// app/layout.tsx
import React from 'react';
import './globals.css';
import { Providers } from './providers'; // Assuming this includes SessionProvider
// import { Analytics } from "@vercel/analytics/react"
// import { SpeedInsights } from "@vercel/speed-insights/next"
import { Toaster } from 'react-hot-toast';
// import { Toaster } from "@/components/ui/sonner";
import { FavouritesProvider } from './context/FavouritesContext'; // Import FavouritesProvider

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
      </head>
      <body>
        {/* Providers likely contains SessionProvider, ThemeProvider etc. */}
        <Providers>
          {/* Wrap the main content area with FavouritesProvider */}
          {/* It needs to be inside Providers to access session state */}
          <FavouritesProvider>
            {children}
            {modal}
            <Toaster />
             {/* Toaster can be inside or outside FavouritesProvider */}
             {/* Analytics and SpeedInsights can also be placed appropriately */}
            {/* <Analytics /> */}
            {/* <SpeedInsights /> */}
          </FavouritesProvider>
        </Providers>
      </body>
    </html>
  );
}