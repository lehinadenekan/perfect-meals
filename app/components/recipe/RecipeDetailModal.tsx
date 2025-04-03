'use client';

import { Fragment, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import {
  XMarkIcon,
  ClockIcon,
  UserIcon,
  BeakerIcon,
  PrinterIcon,
  FlagIcon,
  ShareIcon,
  PlayIcon,
  PauseIcon,
  BackwardIcon,
  ForwardIcon
} from '@heroicons/react/24/outline';
import { Recipe } from '@/app/types/recipe';
import Image from 'next/image';
import FavoriteButton from '../shared/FavoriteButton';
import FlagSubmission from './FlagSubmission';
import { addRecentlyViewed } from '@/app/utils/recentlyViewed';

interface RecipeDetailModalProps {
  recipe: Recipe;
  isOpen: boolean;
  onClose: () => void;
}

interface TimerState {
  isActive: boolean;
  remainingTime: number; // in seconds
  intervalId: NodeJS.Timeout | null;
  initialDuration: number; // in seconds
}

interface TimerStates {
  [stepNumber: number]: TimerState;
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

// Helper function to format seconds into MM:SS
const formatTime = (totalSeconds: number): string => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

// Helper function to parse duration from text (returns seconds)
const parseDuration = (text: string): number | null => {
  const timeRegex = /(\d+)\s*(?:minute|min|m)|(\d+)\s*(?:second|sec|s)|(\d+)\s*(?:hour|hr|h)/gi;
  let totalSeconds = 0;
  let match;
  let found = false;

  while ((match = timeRegex.exec(text)) !== null) {
    found = true;
    if (match[1]) { // Minutes
      totalSeconds += parseInt(match[1], 10) * 60;
    } else if (match[2]) { // Seconds
      totalSeconds += parseInt(match[2], 10);
    } else if (match[3]) { // Hours
      totalSeconds += parseInt(match[3], 10) * 3600;
    }
  }

  return found ? totalSeconds : null; // Return null if no time found
};

const REWIND_AMOUNT = 10; // seconds
const FAST_FORWARD_AMOUNT = 10; // seconds

export default function RecipeDetailModal({ recipe, isOpen, onClose }: RecipeDetailModalProps) {
  const [servingMultiplier, setServingMultiplier] = useState(1);
  const [showFlagModal, setShowFlagModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const [timerStates, setTimerStates] = useState<TimerStates>({}); // State for timers

  // Group ingredients only if they exist
  const ingredientGroups = (recipe.ingredients && Array.isArray(recipe.ingredients))
    ? groupIngredients(recipe.ingredients)
    : { main: [], spices: [], garnish: [], other: [] }; // Default empty groups

  // Effect to add recipe to recently viewed when modal opens
  useEffect(() => {
    if (isOpen && recipe) {
      addRecentlyViewed(recipe);
      console.log("Added to recently viewed:", recipe.title);
    }
  }, [isOpen, recipe]); // Run when isOpen changes or the recipe itself changes while open

  const handlePrint = () => {
    window.print();
  };

  // Function to handle copying the URL
  const handleShare = async () => {
    try {
      const url = window.location.href; // Get current URL (assuming modal doesn't change route)
      await navigator.clipboard.writeText(url);
      setCopied(true);
      // Reset the copied state after a short delay
      setTimeout(() => setCopied(false), 2000); 
    } catch (err) {
      console.error('Failed to copy URL: ', err);
      // Optionally handle the error (e.g., show an error message)
    }
  };

  const adjustAmount = (amount: number) => {
    return (amount * servingMultiplier).toFixed(1).replace(/\.0$/, '');
  };

  // --- Timer Functions ---

  // Renamed from startTimer
  const playTimer = (stepNumber: number, description: string) => {
    const existingTimer = timerStates[stepNumber];

    // Don't start if already active or if timer has finished
    if (existingTimer?.isActive || (existingTimer && existingTimer.remainingTime <= 0)) return; 

    // Clear any previous interval for this step just in case (e.g., from rapid clicks)
    if (existingTimer?.intervalId) {
      clearInterval(existingTimer.intervalId);
    }

    let durationToUse: number;
    let isNewTimer = false;

    // Determine the duration: Use remaining time if paused, otherwise parse/use initial
    if (existingTimer && existingTimer.remainingTime > 0 && existingTimer.initialDuration > 0) {
      durationToUse = existingTimer.remainingTime; // Resume from paused time
    } else {
      // Try to parse or use existing initial duration
      let initialDurationForStep: number | undefined | null = existingTimer?.initialDuration;
      if (initialDurationForStep === undefined || initialDurationForStep === null || initialDurationForStep <= 0) {
          initialDurationForStep = parseDuration(description);
      }

      if (initialDurationForStep === null || initialDurationForStep <= 0) {
          // console.log(`No valid duration for step ${stepNumber}. Cannot play.`);
          setTimerStates(prev => {
              const newState = {...prev};
              if (newState[stepNumber]) {
                  newState[stepNumber] = { ...newState[stepNumber], isActive: false, intervalId: null };
              }
              return newState;
          });
          return; 
      }
      durationToUse = initialDurationForStep;
      isNewTimer = true; // Flag that we might need to set initialDuration
    }

    const intervalId = setInterval(() => {
      setTimerStates(prev => {
        const currentStepState = prev[stepNumber];
        if (!currentStepState || !currentStepState.isActive || currentStepState.intervalId !== intervalId ) {
             if(intervalId) clearInterval(intervalId); 
             return prev;
        }

        const newRemainingTime = currentStepState.remainingTime - 1;
        if (newRemainingTime <= 0) {
          clearInterval(intervalId);
          return {
            ...prev,
            [stepNumber]: { ...currentStepState, isActive: false, remainingTime: 0, intervalId: null }
          };
        }
        return {
          ...prev,
          [stepNumber]: { ...currentStepState, remainingTime: newRemainingTime }
        };
      });
    }, 1000);

    // Update the state with the active timer
    setTimerStates(prev => ({
      ...prev,
      [stepNumber]: {
        ...(prev[stepNumber] || {}), // Keep existing state like initialDuration if resuming
        isActive: true,
        remainingTime: durationToUse,
        intervalId: intervalId,
        // Only set initialDuration if it's a completely new timer start
        ...(isNewTimer && { initialDuration: durationToUse })
      }
    }));
  };

  // Renamed from stopTimer
  const pauseTimer = (stepNumber: number) => {
    const timer = timerStates[stepNumber];
    if (timer && timer.isActive && timer.intervalId) {
      clearInterval(timer.intervalId);
      setTimerStates(prev => ({
        ...prev,
        [stepNumber]: { ...prev[stepNumber], isActive: false, intervalId: null } // Keep remaining time
      }));
    }
  };

  const rewindTimer = (stepNumber: number) => {
      setTimerStates(prev => {
          const currentStepState = prev[stepNumber];
          if (!currentStepState || currentStepState.remainingTime <= 0) return prev; // No state or already at 0

          const newRemainingTime = Math.max(0, currentStepState.remainingTime - REWIND_AMOUNT);
          return {
              ...prev,
              [stepNumber]: { ...currentStepState, remainingTime: newRemainingTime }
          };
      });
  };

  const fastForwardTimer = (stepNumber: number) => {
      setTimerStates(prev => {
          const currentStepState = prev[stepNumber];
          if (!currentStepState) return prev; // No state yet

          const newRemainingTime = currentStepState.remainingTime + FAST_FORWARD_AMOUNT;
          // Optional: Add check against initialDuration if you don't want to FF past it?
          // newRemainingTime = Math.min(currentStepState.initialDuration, newRemainingTime);
          return {
              ...prev,
              [stepNumber]: { ...currentStepState, remainingTime: newRemainingTime }
          };
      });
  };

  // Cleanup timers on modal close
  useEffect(() => {
    if (!isOpen) {
      Object.values(timerStates).forEach(timer => {
        if (timer.intervalId) {
          clearInterval(timer.intervalId);
        }
      });
      setTimerStates({}); // Reset all timers when modal closes
    }
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]); // Only run when isOpen changes

  // Sort instructions by step number
  const sortedInstructions = recipe.instructions?.sort((a, b) => a.stepNumber - b.stepNumber) || [];

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
                            onClick={() => setServingMultiplier(prev => Math.max(1 / recipe.servings, prev - 1 / recipe.servings))}
                            className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded-full hover:bg-gray-100 text-gray-600"
                          >
                            -
                          </button>
                          <div className="flex items-center gap-2">
                            <UserIcon className="h-5 w-5 text-gray-500" />
                            <span>{Math.round(recipe.servings * servingMultiplier)} servings</span>
                          </div>
                          <button
                            onClick={() => setServingMultiplier(prev => prev + 1 / recipe.servings)}
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
                          onClick={handleShare}
                          className="p-2 hover:bg-gray-100 rounded-full relative"
                          aria-label="Share recipe"
                        >
                          <ShareIcon className="h-5 w-5 text-gray-500" />
                          {copied && (
                            <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap rounded bg-gray-800 px-2 py-1 text-xs text-white">
                              Copied!
                            </span>
                          )}
                        </button>
                        <button
                          onClick={handlePrint}
                          className="p-2 hover:bg-gray-100 rounded-full"
                          aria-label="Print recipe"
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
                        {sortedInstructions.length > 0 ? (
                          <ol className="space-y-4 list-decimal list-inside">
                            {sortedInstructions.map((instruction) => {
                              const timerState = timerStates[instruction.stepNumber];
                              // Determine if timer controls should be shown at all
                              const hasInitialDuration = timerState?.initialDuration > 0;
                              const canEverHaveTimer = hasInitialDuration || parseDuration(instruction.description) !== null;
                              const isFinished = hasInitialDuration && timerState?.remainingTime <= 0;

                              return (
                                <li key={instruction.id} className="text-gray-700 flex items-start group">
                                  <span className="mr-2 font-medium">{instruction.stepNumber}.</span>
                                  <div className="flex-1">
                                    <span>{instruction.description}</span>
                                    {/* Timer UI - Show only if a duration can be determined */}
                                    {canEverHaveTimer && (
                                      <div className="flex items-center gap-2 mt-1 ml-4 text-sm">
                                        {/* Rewind Button */} 
                                        <button
                                          onClick={() => rewindTimer(instruction.stepNumber)}
                                          disabled={!timerState || timerState.remainingTime <= 0} // Disable if no timer state or at 0
                                          className="p-1 rounded-full text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                          aria-label={`Rewind timer for step ${instruction.stepNumber} by ${REWIND_AMOUNT} seconds`}
                                        >
                                          <BackwardIcon className="h-4 w-4" />
                                        </button>

                                        {/* Play/Pause Button */} 
                                        {timerState?.isActive ? (
                                          <button
                                            onClick={() => pauseTimer(instruction.stepNumber)}
                                            className="p-1 rounded-full text-blue-600 hover:bg-blue-100 transition-colors"
                                            aria-label={`Pause timer for step ${instruction.stepNumber}`}
                                          >
                                            <PauseIcon className="h-5 w-5" />
                                          </button>
                                        ) : (
                                          <button
                                            onClick={() => playTimer(instruction.stepNumber, instruction.description)}
                                            disabled={!canEverHaveTimer || isFinished} // Disable if cannot parse time or already finished
                                            className="p-1 rounded-full text-green-600 hover:bg-green-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                            aria-label={`Play timer for step ${instruction.stepNumber}`}
                                          >
                                            <PlayIcon className="h-5 w-5" />
                                          </button>
                                        )}

                                        {/* Fast Forward Button */} 
                                        <button
                                          onClick={() => fastForwardTimer(instruction.stepNumber)}
                                          disabled={!timerState} // Disable if no timer state yet
                                          className="p-1 rounded-full text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                          aria-label={`Fast forward timer for step ${instruction.stepNumber} by ${FAST_FORWARD_AMOUNT} seconds`}
                                        >
                                          <ForwardIcon className="h-4 w-4" />
                                        </button>

                                        {/* Time Display */} 
                                        <div className="font-mono min-w-[50px] text-center">
                                          {isFinished ? (
                                             <span className="text-red-500 font-medium">Finished!</span>
                                          ) : timerState ? (
                                            <span className={timerState.isActive ? 'text-blue-600' : 'text-gray-600'}>
                                              {formatTime(timerState.remainingTime)}
                                            </span>
                                          ) : (
                                            <span className="text-gray-400">--:--</span> // Placeholder if timer never started
                                          )}
                                        </div>

                                      </div>
                                    )}
                                  </div>
                                </li>
                              );
                            })}
                          </ol>
                        ) : (
                          <p className="text-gray-500">No instructions provided.</p>
                        )}
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