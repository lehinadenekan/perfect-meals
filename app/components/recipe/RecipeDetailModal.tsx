'use client';

import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon, ClockIcon, UserIcon, BeakerIcon } from '@heroicons/react/24/outline';
import { Recipe } from '@/app/types/recipe';
import Image from 'next/image';

interface RecipeDetailModalProps {
  recipe: Recipe;
  isOpen: boolean;
  onClose: () => void;
}

export default function RecipeDetailModal({ recipe, isOpen, onClose }: RecipeDetailModalProps) {
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 w-full max-w-4xl">
                {/* Close button */}
                <div className="absolute right-0 top-0 pr-4 pt-4 z-10">
                  <button
                    type="button"
                    className="rounded-md bg-white text-gray-400 hover:text-gray-500"
                    onClick={onClose}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Recipe Image */}
                <div className="relative h-64 w-full">
                  <Image
                    src={recipe.imageUrl || '/images/default-recipe.jpg'}
                    alt={recipe.title}
                    fill
                    className="object-cover rounded-t-lg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <h2 className="absolute bottom-4 left-4 text-2xl font-bold text-white">
                    {recipe.title}
                  </h2>
                </div>

                {/* Recipe Content */}
                <div className="p-6">
                  {/* Quick Info */}
                  <div className="flex items-center gap-6 mb-6 text-gray-600">
                    <div className="flex items-center gap-2">
                      <ClockIcon className="h-5 w-5" />
                      <span>{recipe.cookingTime} mins</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <UserIcon className="h-5 w-5" />
                      <span>{recipe.servings} servings</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BeakerIcon className="h-5 w-5" />
                      <span>{recipe.difficulty}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 mb-8">{recipe.description}</p>

                  {/* Two Column Layout */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Left Column - Ingredients */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Ingredients</h3>
                      <ul className="space-y-2">
                        {recipe.ingredients.map((ingredient) => (
                          <li key={ingredient.id} className="flex items-baseline gap-2">
                            <span className="text-sm font-medium text-gray-900">
                              {ingredient.amount} {ingredient.unit}
                            </span>
                            <span className="text-gray-600">{ingredient.name}</span>
                            {ingredient.notes && (
                              <span className="text-sm text-gray-500 italic">
                                ({ingredient.notes})
                              </span>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Right Column - Instructions */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Instructions</h3>
                      <ol className="space-y-4">
                        {recipe.instructions.map((instruction) => (
                          <li key={instruction.id} className="flex gap-4">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center font-medium">
                              {instruction.stepNumber}
                            </span>
                            <p className="text-gray-600">{instruction.description}</p>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>

                  {/* Nutritional Information */}
                  <div className="mt-8">
                    <h3 className="text-lg font-semibold mb-4">Nutritional Information</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="text-sm text-gray-500">Calories</div>
                        <div className="text-xl font-semibold">{recipe.calories || 'N/A'}</div>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="text-sm text-gray-500">Protein</div>
                        <div className="text-xl font-semibold">
                          {Math.round((recipe.calories || 0) * 0.25 / 4)}g
                        </div>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="text-sm text-gray-500">Carbs</div>
                        <div className="text-xl font-semibold">
                          {Math.round((recipe.calories || 0) * 0.5 / 4)}g
                        </div>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="text-sm text-gray-500">Fat</div>
                        <div className="text-xl font-semibold">
                          {Math.round((recipe.calories || 0) * 0.25 / 9)}g
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Cooking Tips */}
                  <div className="mt-8">
                    <h3 className="text-lg font-semibold mb-4">Cooking Tips</h3>
                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <ul className="list-disc list-inside space-y-2 text-gray-600">
                        <li>Prep all ingredients before starting to cook</li>
                        <li>Follow the steps in order for best results</li>
                        <li>Adjust seasoning to taste</li>
                        <li>Let the dish rest for a few minutes before serving</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
} 