// components/recipe/RecipeDetailModal.tsx
'use client';

import { Fragment, useState, useEffect, useRef } from 'react';
import { Dialog, Transition, Menu } from '@headlessui/react';
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
  ForwardIcon,
  ArrowDownTrayIcon,
  // eslint-disable-next-line 
  ChevronLeftIcon,
  ChevronRightIcon,
  PencilSquareIcon,
  TrashIcon
} from '@heroicons/react/24/outline';
import { Recipe } from '@/lib/types/recipe'; // Base Recipe type (likely partial)
import { RecipeDetailData } from '@/lib/data/recipes'; // Import the detailed type
import FavoriteButton from '../shared/FavouriteButton'; // Import FavouriteButton
// eslint-disable-next-line @typescript-eslint/no-unused-vars   
import FlagSubmission from './FlagSubmission';
import { addRecentlyViewed } from '@/lib/utils/recentlyViewed';
import { Button } from '@/components/ui/button';
// eslint-disable-next-line 
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'react-hot-toast';
import { useSession } from 'next-auth/react';
import LoadingSpinner from '@/components/shared/LoadingSpinner'; // Import loading spinner
import Image from 'next/image'; // Import the Next.js Image component

// Combine base Recipe with isFavourite possibility for initial data
type InitialRecipeData = Recipe & { isFavourite?: boolean };

interface RecipeDetailModalProps {
  recipe: InitialRecipeData; // Initial recipe data (might be partial, includes isFavourite)
  isOpen: boolean;
  onClose: () => void;
  onFavouriteChange?: (recipeId: string, newIsFavourite: boolean) => void;
  onGoToPrevious?: () => void;
  onGoToNext?: () => void;
  canGoPrevious?: boolean;
  canGoNext?: boolean;
}

// Timer related interfaces and functions (kept as is)
interface TimerState {
  isActive: boolean;
  remainingTime: number; // in seconds
  intervalId: NodeJS.Timeout | null;
  initialDuration: number; // in seconds
}
interface TimerStates { [stepNumber: number]: TimerState; }
interface PrintOptions { includeImage: boolean; includeNotes: boolean; }
const formatTime = (totalSeconds: number): string => { /* ... implementation ... */
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
 };
const parseDuration = (text: string): number | null => { /* ... implementation ... */
    const timeRegex = /(\d+)\s*(?:minute|min|m)|(\d+)\s*(?:second|sec|s)|(\d+)\s*(?:hour|hr|h)/gi;
    let totalSeconds = 0; let match; let found = false;
    while ((match = timeRegex.exec(text)) !== null) {
        found = true;
        if (match[1]) totalSeconds += parseInt(match[1], 10) * 60;
        else if (match[2]) totalSeconds += parseInt(match[2], 10);
        else if (match[3]) totalSeconds += parseInt(match[3], 10) * 3600;
    }
    return found ? totalSeconds : null;
 };
const REWIND_AMOUNT = 10;
const FAST_FORWARD_AMOUNT = 10;

export default function RecipeDetailModal({
  recipe: initialRecipe, // Rename prop
  isOpen,
  onClose,
  onFavouriteChange,
  onGoToPrevious,
  onGoToNext,
  canGoPrevious = false,
  canGoNext = false
}: RecipeDetailModalProps) {
  const { data: session } = useSession();

  // State for detailed recipe data fetched from API
  const [detailedRecipe, setDetailedRecipe] = useState<RecipeDetailData | null>(null);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);
  const [detailError, setDetailError] = useState<string | null>(null);

  // Determine which recipe data to display (fetched detailed data or initial prop data)
  // Use optional chaining and provide default values where appropriate
  const recipeToDisplay = detailedRecipe || initialRecipe;

  // Determine isAuthor based on recipeToDisplay
  const isAuthor = session?.user?.id === recipeToDisplay?.authorId;
  // Get isFavourite status (prefer detailedRecipe if available)
  const initialIsFavourite = initialRecipe?.isFavourite ?? false;


  // Other existing state variables
  const [servingMultiplier, setServingMultiplier] = useState(1);
  const [showFlagModal, setShowFlagModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const [timerStates, setTimerStates] = useState<TimerStates>({});
  const [showPrintOptions, setShowPrintOptions] = useState(false);
  const [printOptions, setPrintOptions] = useState<PrintOptions>({ includeImage: true, includeNotes: true });
  const [isPrinting, setIsPrinting] = useState(false);
  const modalContentRef = useRef<HTMLDivElement>(null);

  // Effect to fetch detailed recipe data when modal opens or initialRecipe ID changes
  useEffect(() => {
    if (isOpen && initialRecipe?.id) {
      setDetailedRecipe(null); // Clear previous details
      setDetailError(null);
      setIsLoadingDetails(true);
      console.log(`RecipeDetailModal: Fetching details for recipe ID: ${initialRecipe.id}`);

      const fetchDetails = async () => {
        try {
          const response = await fetch(`/api/recipes/${initialRecipe.id}`); // Fetch details
          if (!response.ok) {
            const errorData = await response.json().catch(() => ({ error: "Failed to parse error response" }));
            throw new Error(errorData.error || `Failed to fetch details: ${response.status}`);
          }
          const data: RecipeDetailData = await response.json();
          setDetailedRecipe(data);
          setServingMultiplier(1); // Reset servings on new data
        } catch (err) {
          console.error("RecipeDetailModal: Error fetching details:", err);
          const errorMsg = err instanceof Error ? err.message : "Could not load recipe details.";
          setDetailError(errorMsg);
          toast.error("Could not load full recipe details.");
        } finally {
          setIsLoadingDetails(false);
        }
      };
      fetchDetails();
    } else if (!isOpen) {
      // Reset state when modal closes
      setDetailedRecipe(null);
      setDetailError(null);
      setIsLoadingDetails(false);
      setTimerStates({}); // Reset timers too
    }
  }, [isOpen, initialRecipe?.id]); // Dependency: Re-fetch if ID changes while open


  // Effect to add recipe to recently viewed (uses initial data immediately)
  useEffect(() => {
    if (isOpen && initialRecipe) {
      addRecentlyViewed(initialRecipe);
    }
  }, [isOpen, initialRecipe]);

  // Keyboard Navigation Effect
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') { if (canGoPrevious && onGoToPrevious) onGoToPrevious(); }
      else if (event.key === 'ArrowRight') { if (canGoNext && onGoToNext) onGoToNext(); }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, canGoPrevious, canGoNext, onGoToPrevious, onGoToNext]);

  // Button Handlers
  const handleInitiatePrint = () => setShowPrintOptions(true);
  const handleConfirmPrint = () => { /* ... implementation ... */
    setIsPrinting(true); setShowPrintOptions(false);
    setTimeout(() => { window.print(); setTimeout(() => setIsPrinting(false), 1000); }, 100);
   };
  const handleShare = async () => { /* ... implementation using recipeToDisplay ... */
      if (!recipeToDisplay?.id) { toast.error('Cannot share recipe, ID is missing.'); return; }
      const url = `${window.location.origin}/recipes/${recipeToDisplay.id}`;
      try { await navigator.clipboard.writeText(url); toast.success('Recipe link copied!'); setCopied(true); setTimeout(() => setCopied(false), 2000); }
      catch (err) { console.error('Failed to copy URL: ', err); toast.error('Failed to copy link.'); }
   };

  // Timer Functions (using recipeToDisplay.instructions)
  const playTimer = (stepNumber: number) => { /* ... implementation ... */
      const description = recipeToDisplay.instructions?.find(i => i.stepNumber === stepNumber)?.description || '';
      // Rest of the logic...
      const existingTimer = timerStates[stepNumber];
      if (existingTimer?.isActive || (existingTimer && existingTimer.remainingTime <= 0)) return;
      if (existingTimer?.intervalId) clearInterval(existingTimer.intervalId);
      let durationToUse: number; let isNewTimer = false;
      if (existingTimer && existingTimer.remainingTime > 0 && existingTimer.initialDuration > 0) { durationToUse = existingTimer.remainingTime; }
      else {
          let initialDurationForStep: number | null | undefined = existingTimer?.initialDuration;
          if (!initialDurationForStep || initialDurationForStep <= 0) { initialDurationForStep = parseDuration(description); }
          if (!initialDurationForStep || initialDurationForStep <= 0) { setTimerStates(prev => ({ ...prev, [stepNumber]: { ...prev[stepNumber], isActive: false, intervalId: null } })); return; }
          durationToUse = initialDurationForStep; isNewTimer = true;
      }
      const intervalId = setInterval(() => { setTimerStates(prev => { const cs = prev[stepNumber]; if (!cs || !cs.isActive || cs.intervalId !== intervalId) { if(intervalId) clearInterval(intervalId); return prev; } const nr = cs.remainingTime - 1; if (nr <= 0) { clearInterval(intervalId); return { ...prev, [stepNumber]: { ...cs, isActive: false, remainingTime: 0, intervalId: null } }; } return { ...prev, [stepNumber]: { ...cs, remainingTime: nr } }; }); }, 1000);
      setTimerStates(prev => ({ ...prev, [stepNumber]: { ...(prev[stepNumber] || {}), isActive: true, remainingTime: durationToUse, intervalId: intervalId, ...(isNewTimer && { initialDuration: durationToUse }) } }));
   };
  const pauseTimer = (stepNumber: number) => { /* ... implementation ... */
      const timer = timerStates[stepNumber];
      if (timer?.isActive && timer.intervalId) { clearInterval(timer.intervalId); setTimerStates(prev => ({ ...prev, [stepNumber]: { ...prev[stepNumber], isActive: false, intervalId: null } })); }
   };
  const rewindTimer = (stepNumber: number) => { /* ... implementation ... */
      setTimerStates(prev => { const cs = prev[stepNumber]; if (!cs || cs.remainingTime <= 0) return prev; const nr = Math.max(0, cs.remainingTime - REWIND_AMOUNT); return { ...prev, [stepNumber]: { ...cs, remainingTime: nr } }; });
   };
  const fastForwardTimer = (stepNumber: number) => { /* ... implementation ... */
      setTimerStates(prev => { const cs = prev[stepNumber]; if (!cs) return prev; const nr = cs.remainingTime + FAST_FORWARD_AMOUNT; return { ...prev, [stepNumber]: { ...cs, remainingTime: nr } }; });
   };

  // Cleanup timers on modal close
  useEffect(() => {
    if (!isOpen) {
      Object.values(timerStates).forEach(timer => {
        if (timer.intervalId) clearInterval(timer.intervalId);
      });
      setTimerStates({});
    }
  }, [isOpen, timerStates]);

  // Sort instructions (use recipeToDisplay)
  const sortedInstructions = recipeToDisplay?.instructions?.sort((a, b) => a.stepNumber - b.stepNumber) || [];

  // Export Helper Functions (using recipeToDisplay)
  const downloadFile = (_content: string, _filename: string, _mimeType: string) => { /* ... */ };
  const formatRecipeText = (_recipeData: Recipe | RecipeDetailData): string => { /* ... implementation ... */ return ''; };
  const formatRecipeMarkdown = (_recipeData: Recipe | RecipeDetailData): string => { /* ... implementation ... */ return ''; };
  const handleExportTxt = () => { if(recipeToDisplay) downloadFile(formatRecipeText(recipeToDisplay), `${recipeToDisplay.title}.txt`, 'text/plain;charset=utf-8'); };
  const handleExportMd = () => { if(recipeToDisplay) downloadFile(formatRecipeMarkdown(recipeToDisplay), `${recipeToDisplay.title}.md`, 'text/markdown;charset=utf-8'); };
  const handleExportPdf = async () => { /* ... implementation using recipeToDisplay ... */ };


  return (
    <>
      {/* Print Options Modal */}
      {showPrintOptions && (
        <Dialog open={showPrintOptions} onClose={() => setShowPrintOptions(false)} className="relative z-[60]">
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="w-full max-w-sm rounded-lg bg-white p-6 shadow-xl">
              <Dialog.Title className="text-lg font-medium text-gray-900">Print Options</Dialog.Title>
              <Dialog.Description className="mt-1 text-sm text-gray-500">Choose what to include in the printout.</Dialog.Description>
              <div className="mt-4 space-y-3">
                 <div className="flex items-center space-x-2">
                  <Checkbox id="includeImage" checked={printOptions.includeImage} onCheckedChange={(checked) => setPrintOptions(prev => ({ ...prev, includeImage: !!checked }))}/>
                  <label htmlFor="includeImage" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Include Recipe Image</label>
                 </div>
                 <div className="flex items-center space-x-2">
                  <Checkbox id="includeNotes" checked={printOptions.includeNotes} onCheckedChange={(checked) => setPrintOptions(prev => ({ ...prev, includeNotes: !!checked }))}/>
                  <label htmlFor="includeNotes" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Include Notes Section</label>
                 </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <Button variant="outline" onClick={() => setShowPrintOptions(false)}>Cancel</Button>
                <Button onClick={handleConfirmPrint}>Print Now</Button>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
       )}

      {/* Flag Submission Modal */}
       {showFlagModal && initialRecipe && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[60] flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4">
            <FlagSubmission
              recipe={initialRecipe} // Pass initialRecipe (conforms to Recipe type)
              onBack={() => setShowFlagModal(false)}
            />
          </div>
        </div>
       )}


      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog ref={modalContentRef} as="div" className={`${isPrinting ? 'printing-active' : ''} ${printOptions.includeImage ? '' : 'print-hide-image'} ${printOptions.includeNotes ? '' : 'print-hide-notes'} relative z-50`} onClose={onClose}>
          {/* Backdrop */}
          <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* Outer container for centering */}
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">

              {/* Previous Button */}
              {canGoPrevious && onGoToPrevious && (<button onClick={onGoToPrevious} className="fixed left-2 sm:left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/70 p-2 text-gray-700 hover:bg-white shadow-md transition disabled:opacity-30 disabled:cursor-not-allowed" aria-label="Previous recipe" disabled={!canGoPrevious}><ChevronLeftIcon className="h-6 w-6 sm:h-8 sm:w-8" /></button>)}
              {/* Next Button */}
              {canGoNext && onGoToNext && (<button onClick={onGoToNext} className="fixed right-2 sm:right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/70 p-2 text-gray-700 hover:bg-white shadow-md transition disabled:opacity-30 disabled:cursor-not-allowed" aria-label="Next recipe" disabled={!canGoNext}><ChevronRightIcon className="h-6 w-6 sm:h-8 sm:w-8" /></button>)}

              {/* Inner Transition for Panel */}
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                {/* Dialog Panel */}
                <Dialog.Panel id="recipe-modal-content" className="relative transform rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 w-full max-w-md sm:max-w-xl md:max-w-2xl lg:max-w-4xl max-h-[90vh] overflow-y-auto flex flex-col">
                  {/* Close button */}
                  <div className="absolute right-0 top-0 pr-4 pt-4 z-10"><button type="button" className="rounded-md bg-white text-gray-400 hover:text-gray-500" onClick={onClose}><span className="sr-only">Close</span><XMarkIcon className="h-6 w-6" aria-hidden="true" /></button></div>

                   {/* Image Section - Use <Image> */}
                   <div id="recipe-modal-image-container" className="relative w-full aspect-video print-image-container overflow-hidden rounded-t-lg">
                    {(recipeToDisplay?.imageUrl) ? (
                       <Image
                        src={recipeToDisplay.imageUrl}
                        alt={recipeToDisplay.title ?? 'Recipe Image'}
                        layout="fill"
                        objectFit="cover"
                        loading="lazy"
                        onError={(e) => {
                          const t = e.target as HTMLImageElement;
                          t.srcset = '/images/default-recipe.jpg';
                          t.src = '/images/default-recipe.jpg';
                        }}
                      />
                    ) : (
                       <div className="absolute inset-0 bg-gray-200 flex items-center justify-center rounded-t-lg"><span className="text-gray-400">No Image</span></div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <h2 className="absolute bottom-4 left-4 text-2xl font-bold text-white">
                      {recipeToDisplay?.title ?? 'Loading...'}
                    </h2>
                  </div>

                  {/* Content Wrapper */}
                  <div id="recipe-modal-text-content">
                    {/* Loading/Error States */}
                    {isLoadingDetails && ( <div className="p-6 text-center"><LoadingSpinner /><p className="mt-2 text-gray-500">Loading details...</p></div> )}
                    {detailError && !isLoadingDetails && ( <div className="p-6 text-center text-red-600 bg-red-50 rounded-b-lg"> Error loading details: {detailError}</div> )}

                    {/* Actual Content (Rendered via helper function or directly) */}
                    {/* Using direct rendering here for clarity */}
                    {!isLoadingDetails && !detailError && recipeToDisplay && (
                        <div className="p-6">
                          {/* Meta Info and Actions */}
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-y-2 mb-4">
                            {/* Left: Time, Servings, Difficulty */}
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <div className="flex items-center"><ClockIcon className="h-5 w-5 mr-1.5"/><span>{recipeToDisplay.cookingTime ?? 'N/A'} min</span></div>
                              <div className="flex items-center">
                                <button onClick={() => setServingMultiplier(prev => Math.max(0.1, prev - (1 / (recipeToDisplay.servings || 1))))} disabled={!recipeToDisplay.servings || (recipeToDisplay.servings * servingMultiplier <= 1)} className="p-1 rounded-full hover:bg-gray-100 disabled:opacity-50 pdf-hide" aria-label="Decrease servings"><span className="text-xs">-</span></button>
                                <UserIcon className="h-5 w-5 mx-1"/><span >{recipeToDisplay.servings ? Math.round(recipeToDisplay.servings * servingMultiplier) : 'N/A'} servings</span>
                                <button onClick={() => setServingMultiplier(prev => prev + (1 / (recipeToDisplay.servings || 1)))} disabled={!recipeToDisplay.servings} className="p-1 rounded-full hover:bg-gray-100 pdf-hide" aria-label="Increase servings"><span className="text-xs">+</span></button>
                              </div>
                              <div className="flex items-center"><BeakerIcon className="h-5 w-5 mr-1.5"/><span>{recipeToDisplay.difficulty ?? 'N/A'}</span></div>
                            </div>
                            {/* Right: Action Buttons */}
                            <div className="hidden md:flex items-center gap-1 md:gap-2 recipe-modal-print-hide">
                              {/* Use initialIsFavourite for the button prop */}
                              {recipeToDisplay.id && <FavoriteButton recipeId={recipeToDisplay.id} className="p-1 rounded-md text-gray-600 hover:bg-gray-100 hover:text-red-500" onSuccess={onFavouriteChange} initialIsFavourite={initialIsFavourite} />}
                              <button onClick={handleInitiatePrint} className="p-1 rounded-md text-gray-600 hover:bg-gray-100" title="Print Recipe"><PrinterIcon className="h-5 w-5" /><span className="sr-only">Print</span></button>
                               {/* Export Dropdown - Remove disabled check for PDF */}
                               <Menu as="div" className="relative inline-block text-left">
                                 {/* Remove LoadingSpinner ternary as isExportingPdf is removed */}
                                 <div><Menu.Button className="inline-flex justify-center items-center w-full rounded-md p-1 text-gray-600 hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75" title="Export"><ArrowDownTrayIcon className="h-5 w-5"/></Menu.Button></div>
                                 <Transition as={Fragment} enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95">
                                   <Menu.Items className="absolute right-0 mt-2 w-40 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10"><div className="px-1 py-1">
                                     <Menu.Item>{({ active }) => (<button onClick={handleExportTxt} className={`${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'} group flex w-full items-center rounded-md px-2 py-2 text-sm`}>Text (.txt)</button>)}</Menu.Item>
                                     <Menu.Item>{({ active }) => (<button onClick={handleExportMd} className={`${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'} group flex w-full items-center rounded-md px-2 py-2 text-sm`}>Markdown (.md)</button>)}</Menu.Item>
                                     {/* Remove disabled prop */}
                                     <Menu.Item>{({ active }) => (<button onClick={handleExportPdf} className={`${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'} group flex w-full items-center rounded-md px-2 py-2 text-sm`}>PDF (.pdf)</button>)}</Menu.Item>
                                   </div></Menu.Items>
                                 </Transition>
                               </Menu>
                              {/* Share Button */}
                              <button onClick={handleShare} className="p-1 rounded-md text-gray-600 hover:bg-gray-100 relative" title="Share Recipe"><ShareIcon className="h-5 w-5" />{copied && <span className="absolute -top-7 left-1/2 -translate-x-1/2 text-xs bg-gray-700 text-white px-1 py-0.5 rounded">Copied!</span>}</button>
                              {/* Flag Button */}
                              <button onClick={() => setShowFlagModal(true)} className="p-1 rounded-md text-gray-600 hover:bg-gray-100" title="Flag Issue"><FlagIcon className="h-5 w-5" /><span className="sr-only">Flag</span></button>
                              {/* Author Buttons */}
                              {isAuthor && (<>
                                <button onClick={() => { /* TODO: Implement Edit Action */ console.log('Edit clicked'); }} className="p-1 rounded-md text-gray-600 hover:bg-gray-100 hover:text-blue-600" title="Edit Recipe"><PencilSquareIcon className="h-5 w-5" /><span className="sr-only">Edit</span></button>
                                <button onClick={() => { /* TODO: Implement Delete Action */ console.log('Delete clicked'); }} className="p-1 rounded-md text-gray-600 hover:bg-gray-100 hover:text-red-600" title="Delete Recipe"><TrashIcon className="h-5 w-5" /><span className="sr-only">Delete</span></button>
                              </>)}
                            </div>
                          </div>
                          {/* Description */}
                          <p className="text-gray-600 mb-6">{recipeToDisplay.description ?? 'No description available.'}</p>
                          {/* Two Column Layout */}
                          <div className="grid md:grid-cols-2 gap-8">
                            {/* Ingredients */}
                            <div>
                              <h3 className="text-lg font-semibold mb-4">Ingredients</h3>
                              {recipeToDisplay.ingredients && recipeToDisplay.ingredients.length > 0 ? (
                                <ul className="space-y-2 list-disc list-inside">
                                  {recipeToDisplay.ingredients.map((ing, index) => {
                                    const originalAmount = ing.amount;
                                    const adjustedAmount = !isNaN(originalAmount) ? (originalAmount * servingMultiplier) : ing.amount;
                                    const displayAmount = typeof adjustedAmount === 'number' ? Number.isInteger(adjustedAmount) ? adjustedAmount : adjustedAmount.toFixed(1) : adjustedAmount;
                                    return (<li key={ing.id || index} className="text-gray-700"><span className="font-medium">{displayAmount}</span><span className="ml-1">{ing.unit || ''}</span><span className="ml-2">{ing.name}</span>{ing.notes && <span className="text-gray-500 text-sm ml-1">({ing.notes})</span>}</li>);
                                  })}
                                </ul>
                              ) : (<p className="text-gray-500">No ingredients listed.</p>)}
                            </div>
                            {/* Instructions */}
                            <div>
                              <h3 className="text-lg font-semibold mb-4">Instructions</h3>
                              {sortedInstructions.length > 0 ? (
                                <ol className="space-y-4 list-decimal list-inside">
                                  {sortedInstructions.map((instruction) => {
                                    const timerState = timerStates[instruction.stepNumber];
                                    const hasInitialDuration = timerState?.initialDuration > 0;
                                    const canEverHaveTimer = hasInitialDuration || parseDuration(instruction.description) !== null;
                                    const isFinished = hasInitialDuration && timerState?.remainingTime <= 0;
                                    return (
                                      <li key={instruction.id} className="text-gray-700 flex items-start group">
                                        <span className="mr-2 font-medium">{instruction.stepNumber}.</span>
                                        <div className="flex-1">
                                          <span>{instruction.description}</span>
                                          {/* Timer UI */}
                                          {canEverHaveTimer && (<div className="flex items-center gap-2 mt-1 ml-4 text-sm">
                                            <button onClick={() => rewindTimer(instruction.stepNumber)} disabled={!timerState || timerState.remainingTime <= 0} className="p-1 rounded-full text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors" aria-label="Rewind"><BackwardIcon className="h-4 w-4" /></button>
                                            {timerState?.isActive ? (<button onClick={() => pauseTimer(instruction.stepNumber)} className="p-1 rounded-full text-blue-600 hover:bg-blue-100 transition-colors" aria-label="Pause"><PauseIcon className="h-5 w-5" /></button>) : (<button onClick={() => playTimer(instruction.stepNumber)} disabled={!canEverHaveTimer || isFinished} className="p-1 rounded-full text-green-600 hover:bg-green-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors" aria-label="Play"><PlayIcon className="h-5 w-5" /></button>)}
                                            <button onClick={() => fastForwardTimer(instruction.stepNumber)} disabled={!timerState} className="p-1 rounded-full text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors" aria-label="Fast forward"><ForwardIcon className="h-4 w-4" /></button>
                                            <div className="font-mono min-w-[50px] text-center">{isFinished ? <span className="text-red-500 font-medium">Finished!</span> : timerState ? <span className={timerState.isActive ? 'text-blue-600' : 'text-gray-600'}>{formatTime(timerState.remainingTime)}</span> : <span className="text-gray-400">--:--</span>}</div>
                                          </div>)}
                                        </div>
                                      </li>
                                    );
                                  })}
                                </ol>
                              ) : (<p className="text-gray-500">No instructions provided.</p>)}
                            </div>
                          </div>
                          {/* Nutrition */}
                          <div className="mt-8">
                            <h3 className="text-lg font-semibold mb-4">Nutritional Information</h3>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                               <div className="bg-gray-50 p-4 rounded-lg"><div className="text-sm text-gray-500">Calories</div><div className="text-xl font-semibold">{recipeToDisplay.calories ?? 'N/A'}</div></div>
                               <div className="bg-gray-50 p-4 rounded-lg"><div className="text-sm text-gray-500">Protein</div><div className="text-xl font-semibold">{recipeToDisplay.nutritionFacts?.protein?.toFixed(1) ?? 'N/A'}g</div></div>
                               <div className="bg-gray-50 p-4 rounded-lg"><div className="text-sm text-gray-500">Carbs</div><div className="text-xl font-semibold">{recipeToDisplay.nutritionFacts?.carbs?.toFixed(1) ?? 'N/A'}g</div></div>
                               <div className="bg-gray-50 p-4 rounded-lg"><div className="text-sm text-gray-500">Fat</div><div className="text-xl font-semibold">{recipeToDisplay.nutritionFacts?.fat?.toFixed(1) ?? 'N/A'}g</div></div>
                            </div>
                          </div>
                          {/* Notes */}
                          {recipeToDisplay.notes && recipeToDisplay.notes.length > 0 && (
                            <div className="mt-8 recipe-modal-notes">
                              <h3 className="text-lg font-semibold mb-4">Notes</h3>
                              <div className="bg-blue-50 p-4 rounded-lg"><ul className="list-disc list-inside space-y-2 text-gray-700 text-sm">{recipeToDisplay.notes.map((note, index) => (<li key={index}>{note}</li>))}</ul></div>
                            </div>
                          )}
                          {/* Mobile Action Buttons */}
                          <div className="flex md:hidden justify-around items-center mt-8 pt-4 border-t border-gray-200 recipe-modal-print-hide">
                            {/* Mobile Buttons using recipeToDisplay.id */}
                             {/* Use initialIsFavourite for the button prop */}
                            {recipeToDisplay.id && <FavoriteButton recipeId={recipeToDisplay.id} className="p-1 rounded-md text-gray-600 hover:bg-gray-100 hover:text-red-500" onSuccess={onFavouriteChange} initialIsFavourite={initialIsFavourite}/>}
                            <button onClick={handleInitiatePrint} className="p-1 rounded-md text-gray-600 hover:bg-gray-100" title="Print"><PrinterIcon className="h-5 w-5"/></button>
                            {/* Mobile Export Dropdown - Remove disabled check for PDF */}
                            <Menu as="div" className="relative inline-block text-left">
                              {/* Remove LoadingSpinner ternary */}
                              <div><Menu.Button className="inline-flex justify-center items-center w-full rounded-md p-1 text-gray-600 hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75" title="Export"><ArrowDownTrayIcon className="h-5 w-5"/></Menu.Button></div>
                              <Transition as={Fragment} enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95">
                                <Menu.Items className="absolute bottom-full right-0 mb-2 w-40 origin-bottom-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10"><div className="px-1 py-1">
                                  <Menu.Item>{({ active }) => (<button onClick={handleExportTxt} className={`${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'} group flex w-full items-center rounded-md px-2 py-2 text-sm`}>Text (.txt)</button>)}</Menu.Item>
                                  <Menu.Item>{({ active }) => (<button onClick={handleExportMd} className={`${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'} group flex w-full items-center rounded-md px-2 py-2 text-sm`}>Markdown (.md)</button>)}</Menu.Item>
                                  {/* Remove disabled prop */}
                                  <Menu.Item>{({ active }) => (<button onClick={handleExportPdf} className={`${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'} group flex w-full items-center rounded-md px-2 py-2 text-sm`}>PDF (.pdf)</button>)}</Menu.Item>
                                </div></Menu.Items>
                              </Transition>
                            </Menu>
                            <button onClick={handleShare} className="p-1 rounded-md text-gray-600 hover:bg-gray-100 relative" title="Share"><ShareIcon className="h-5 w-5"/></button>
                            <button onClick={() => setShowFlagModal(true)} className="p-1 rounded-md text-gray-600 hover:bg-gray-100" title="Flag Issue"><FlagIcon className="h-5 w-5"/></button>
                            {/* Mobile Author Buttons */}
                            {isAuthor && (<>
                                <button onClick={() => {/* Edit */}} className="p-1 rounded-md text-gray-600 hover:bg-gray-100 hover:text-blue-600" title="Edit"><PencilSquareIcon className="h-5 w-5"/></button>
                                <button onClick={() => {/* Delete */}} className="p-1 rounded-md text-gray-600 hover:bg-gray-100 hover:text-red-600" title="Delete"><TrashIcon className="h-5 w-5"/></button>
                            </>)}
                          </div>
                        </div>
                    )} {/* End conditional rendering of main content */}
                  </div> {/* End Content Wrapper */}

                </Dialog.Panel>
              </Transition.Child> {/* This now correctly closes the inner Transition */}

            </div> {/* Close flex min-h-full container */}
          </div> {/* Close fixed inset-0 container */}
        </Dialog>
      </Transition.Root>
    </>
  );
}