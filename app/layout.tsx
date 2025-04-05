import React from 'react';
import './globals.css'
import { Providers } from './providers'
import { Analytics } from "@vercel/analytics/react"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
        <Analytics />
      </body>
    </html>
  )
} 