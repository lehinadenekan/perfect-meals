'use client';

import React from 'react';
import Navbar from './components/Navbar';
import TypewriterHeader from './components/TypewriterHeader';
import DietaryPreferenceSelector from './components/dietary/DietaryPreferenceSelector';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#ffc800]">
      <Navbar />
      <div className="container mx-auto p-8 flex flex-col items-center justify-center space-y-12">
        <TypewriterHeader />
        <DietaryPreferenceSelector />
      </div>
    </main>
  );
} 
