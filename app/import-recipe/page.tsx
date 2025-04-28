'use client';

import React from 'react';
import RecipeImporter from '@/components/my-recipes/RecipeImporter'; // Adjust path if needed

export default function ImportRecipePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-900">Import Recipe</h1>
      <div className="max-w-2xl mx-auto bg-[#ffc800] p-6">
        <RecipeImporter />
      </div>
    </div>
  );
} 