'use client';

import React from 'react';
import Navbar from './components/Navbar';
import TypewriterHeader from './components/TypewriterHeader';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#ffc800]">
      <Navbar />
      <div className="container mx-auto p-8 flex flex-col items-center justify-center">
        <TypewriterHeader />
      </div>
    </main>
  );
} 