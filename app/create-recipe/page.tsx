'use client';

import CreateRecipeForm from '@/components/recipe/CreateRecipeForm';
import { Suspense } from 'react';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import { useRouter } from 'next/navigation';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

export default function CreateRecipePage() {
  const router = useRouter();

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 relative">

      {/* Back Button */}
      <button
        onClick={() => router.push('/favourite-recipes')} // <-- Update this line
        className="absolute left-0 top-2 sm:left-2 sm:top-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200 flex items-center justify-center group"
        aria-label="Go back to favorites" // Update aria-label (optional)
      >
        <ArrowLeftIcon className="h-6 w-6 text-gray-600 group-hover:text-gray-800" />
      </button>

      {/* Original Page Content */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          Create a New Recipe
        </h1>
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