'use client';

import CreateRecipeForm from '@/components/recipes/CreateRecipeForm';
import { Suspense } from 'react';
import LoadingSpinner from '@/components/shared/LoadingSpinner';

export default function CreateRecipePage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 relative">

      {/* Original Page Content */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          Create a New Recipe
        </h1>``
        <p className="mt-3 text-xl text-gray-500 sm:mt-4">
          Share your culinary creation with the world (or just save it for yourself!).
        </p>
      </div>
      <Suspense fallback={<div className="flex justify-center items-center"><LoadingSpinner /></div>}>
         <CreateRecipeForm />
      </Suspense>

    </div>
  );
}