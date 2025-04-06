import React from 'react';
import './globals.css'
import { Providers } from './providers'
// import { Analytics } from "@vercel/analytics/react"
// import { SpeedInsights } from "@vercel/speed-insights/next"
import { Toaster } from 'react-hot-toast';
// import { Toaster } from "@/components/ui/sonner";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1744468975179679"
          crossOrigin="anonymous"></script>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <Providers>{children}</Providers>
        <Toaster />
        {/* <Analytics /> */}
        {/* <SpeedInsights /> */}
      </body>
    </html>
  )
} 