'use client';

import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { 
  XMarkIcon, 
  ClockIcon, 
  UserIcon, 
  BeakerIcon,
  PrinterIcon,
  FlagIcon
} from '@heroicons/react/24/outline';
import { Recipe } from '@/app/types/recipe';
import Image from 'next/image';
import FavoriteButton from '../shared/FavoriteButton';
import FlagSubmission from './FlagSubmission';

interface RecipeDetailModalProps {
  recipe: Recipe;
  isOpen: boolean;
  onClose: () => void;
}

// Helper function to group ingredients
function groupIngredients(ingredients: Recipe['ingredients']) {
  const groups: {
    main: Recipe['ingredients'];
    spices: Recipe['ingredients'];
    garnish: Recipe['ingredients'];
    other: Recipe['ingredients'];
  } = {
    main: [],
    spices: [],
    garnish: [],
    other: []
  };

  ingredients.forEach(ing => {
    if (ing.notes?.toLowerCase().includes('garnish')) {
      groups.garnish.push(ing);
    } else if (['salt', 'pepper', 'cumin', 'paprika', 'oregano', 'thyme', 'basil', 'cayenne'].some(
      spice => ing.name.toLowerCase().includes(spice)
    )) {
      groups.spices.push(ing);
    } else if (ing.notes?.toLowerCase().includes('optional')) {
      groups.other.push(ing);
    } else {
      groups.main.push(ing);
    }
  });

  return groups;
}

export default function RecipeDetailModal({ recipe, isOpen, onClose }: RecipeDetailModalProps) {
  const [servingMultiplier, setServingMultiplier] = useState(1);
  const [showFlagModal, setShowFlagModal] = useState(false);
  
  const ingredientGroups = groupIngredients(recipe.ingredients);

  const handlePrint = () => {
    window.print();
  };

  const adjustAmount = (amount: number) => {
    return (amount * servingMultiplier).toFixed(1).replace(/\.0$/, '');
  };

  return (
    <>
      {/* Flag Submission Modal */}
      {showFlagModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[60] flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4">
            <FlagSubmission
              recipe={recipe}
              onBack={() => setShowFlagModal(false)}
            />
          </div>
        </div>
      )}

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
                <Dialog.Panel className="relative transform rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
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
                    {/* Recipe Info and Action Buttons */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                          <ClockIcon className="h-5 w-5 text-gray-500" />
                          <span>{recipe.cookingTime} mins</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => setServingMultiplier(prev => Math.max(1/recipe.servings, prev - 1/recipe.servings))}
                            className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded-full hover:bg-gray-100 text-gray-600"
                          >
                            -
                          </button>
                          <div className="flex items-center gap-2">
                            <UserIcon className="h-5 w-5 text-gray-500" />
                            <span>{Math.round(recipe.servings * servingMultiplier)} servings</span>
                          </div>
                          <button 
                            onClick={() => setServingMultiplier(prev => prev + 1/recipe.servings)}
                            className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded-full hover:bg-gray-100 text-gray-600"
                          >
                            +
                          </button>
                        </div>
                        <div className="flex items-center gap-2">
                          <BeakerIcon className="h-5 w-5 text-gray-500" />
                          <span>{recipe.difficulty}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <button 
                          onClick={handlePrint}
                          className="p-2 hover:bg-gray-100 rounded-full"
                        >
                          <PrinterIcon className="h-5 w-5 text-gray-500" />
                        </button>
                        <div className="flex items-center">
                          <FavoriteButton recipeId={recipe.id} />
                        </div>
                        <button 
                          onClick={() => setShowFlagModal(true)}
                          className="p-2 hover:bg-gray-100 rounded-full"
                        >
                          <FlagIcon className="h-5 w-5 text-gray-500" />
                        </button>
                      </div>
                    </div>

                    {/* Recipe Description */}
                    <p className="text-gray-600 mb-6">{recipe.description}</p>

                    {/* Two Column Layout */}
                    <div className="grid md:grid-cols-2 gap-8">
                      {/* Left Column - Ingredients */}
                      <div>
                        <h3 className="text-lg font-semibold mb-4">Ingredients</h3>
                        
                        {/* Main Ingredients */}
                        {ingredientGroups.main.length > 0 && (
                          <div className="mb-4">
                            <h4 className="font-medium text-gray-700 mb-2">Main Ingredients</h4>
                            <ul className="space-y-2">
                              {ingredientGroups.main.map((ingredient, idx) => (
                                <li key={idx} className="text-gray-600">
                                  {adjustAmount(ingredient.amount)} {ingredient.unit} {ingredient.name}
                                  {ingredient.notes && <span className="text-gray-500 text-sm"> ({ingredient.notes})</span>}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Spices and Seasonings */}
                        {ingredientGroups.spices.length > 0 && (
                          <div className="mb-4">
                            <h4 className="font-medium text-gray-700 mb-2">Spices & Seasonings</h4>
                            <ul className="space-y-2">
                              {ingredientGroups.spices.map((ingredient, idx) => (
                                <li key={idx} className="text-gray-600">
                                  {adjustAmount(ingredient.amount)} {ingredient.unit} {ingredient.name}
                                  {ingredient.notes && <span className="text-gray-500 text-sm"> ({ingredient.notes})</span>}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Garnishes */}
                        {ingredientGroups.garnish.length > 0 && (
                          <div className="mb-4">
                            <h4 className="font-medium text-gray-700 mb-2">For Garnish</h4>
                            <ul className="space-y-2">
                              {ingredientGroups.garnish.map((ingredient, idx) => (
                                <li key={idx} className="text-gray-600">
                                  {adjustAmount(ingredient.amount)} {ingredient.unit} {ingredient.name}
                                  {ingredient.notes && <span className="text-gray-500 text-sm"> ({ingredient.notes})</span>}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Other/Optional Ingredients */}
                        {ingredientGroups.other.length > 0 && (
                          <div className="mb-4">
                            <h4 className="font-medium text-gray-700 mb-2">Optional Ingredients</h4>
                            <ul className="space-y-2">
                              {ingredientGroups.other.map((ingredient, idx) => (
                                <li key={idx} className="text-gray-600">
                                  {adjustAmount(ingredient.amount)} {ingredient.unit} {ingredient.name}
                                  {ingredient.notes && <span className="text-gray-500 text-sm"> ({ingredient.notes})</span>}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
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
    </>
  );
} 