// components/recipe/RecipeDetailModal.tsx
'use client';

import { Fragment, useState, useEffect, useRef, useCallback } from 'react';
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
  ChevronLeftIcon,
  ChevronRightIcon,
  PencilSquareIcon,
  TrashIcon,
  ShoppingCartIcon,
  ShoppingBagIcon // Ensure this is imported
} from '@heroicons/react/24/outline';
import { Recipe } from '@/lib/types/recipe';
import { RecipeDetailData } from '@/lib/data/recipes';
import FavoriteButton from '../shared/FavouriteButton';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import FlagSubmission from './FlagSubmission';
import { addRecentlyViewed } from '@/lib/utils/recentlyViewed';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'react-hot-toast';
import { useSession } from 'next-auth/react';
import LoadingSpinner from '@/components/shared/LoadingSpinner'; // Ensure this is imported
import Image from 'next/image';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import html2canvas from 'html2canvas'; // <-- ADD ESLint Disable Comment
import clsx from 'clsx';

// Helper function to format minutes into hours/minutes string
const formatMinutes = (totalMinutes: number | null | undefined): string => {
  if (totalMinutes == null || totalMinutes <= 0) {
    return 'N/A';
  }
  if (totalMinutes < 60) {
    return `${totalMinutes} min`;
  }
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  if (minutes === 0) {
    return `${hours} hour${hours > 1 ? 's' : ''}`;
  }
  return `${hours}h ${minutes}m`;
};

// Combine base Recipe with isFavourite possibility for initial data
type InitialRecipeData = Recipe & { isFavourite?: boolean };

interface RecipeDetailModalProps {
  recipe: InitialRecipeData;
  isOpen: boolean;
  onClose: () => void;
  onFavouriteChange?: (recipeId: string, newIsFavourite: boolean) => void;
  onGoToPrevious?: () => void;
  onGoToNext?: () => void;
  canGoPrevious?: boolean;
  canGoNext?: boolean;
}

// Timer related interfaces and functions
interface TimerState { isActive: boolean; remainingTime: number; intervalId: NodeJS.Timeout | null; initialDuration: number; }
interface TimerStates { [stepNumber: number]: TimerState; }
interface PrintOptions { includeImage: boolean; includeNotes: boolean; }
const formatTime = (totalSeconds: number): string => { const minutes = Math.floor(totalSeconds / 60); const seconds = totalSeconds % 60; return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`; };
const parseDuration = (text: string): number | null => { const timeRegex = /(\d+)\s*(?:minute|min|m)|(\d+)\s*(?:second|sec|s)|(\d+)\s*(?:hour|hr|h)/gi; let totalSeconds = 0; let match; let found = false; while ((match = timeRegex.exec(text)) !== null) { found = true; if (match[1]) totalSeconds += parseInt(match[1], 10) * 60; else if (match[2]) totalSeconds += parseInt(match[2], 10); else if (match[3]) totalSeconds += parseInt(match[3], 10) * 3600; } return found ? totalSeconds : null; };
const REWIND_AMOUNT = 10;
const FAST_FORWARD_AMOUNT = 10;

export default function RecipeDetailModal({
  recipe: initialRecipe,
  isOpen,
  onClose,
  onFavouriteChange,
  onGoToPrevious,
  onGoToNext,
  canGoPrevious = false,
  canGoNext = false
}: RecipeDetailModalProps) {
  const { data: session } = useSession();
  const [detailedRecipe, setDetailedRecipe] = useState<RecipeDetailData | null>(null);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);
  const [detailError, setDetailError] = useState<string | null>(null);
  const [selectedIngredients, setSelectedIngredients] = useState<Set<string>>(new Set());
  const [isGeneratingLink, setIsGeneratingLink] = useState(false); // Amazon link state
  const [isGeneratingInstacartLink, setIsGeneratingInstacartLink] = useState(false); // Instacart link state
  const [servingMultiplier, setServingMultiplier] = useState(1);
  const [showFlagModal, setShowFlagModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const [timerStates, setTimerStates] = useState<TimerStates>({});
  const [showPrintOptions, setShowPrintOptions] = useState(false);
  const [printOptions, setPrintOptions] = useState<PrintOptions>({ includeImage: true, includeNotes: true });
  const [isPrinting, setIsPrinting] = useState(false);
  const modalContentRef = useRef<HTMLDivElement>(null);

  // --- Calculate dynamic classes for printing ---
  const printRootClasses = clsx({
    'printing-active': isPrinting,
    'print-hide-image': isPrinting && !printOptions.includeImage,
    'print-hide-notes': isPrinting && !printOptions.includeNotes,
  });

  const recipeToDisplay = detailedRecipe || initialRecipe;
  const isAuthor = session?.user?.id === recipeToDisplay?.authorId;
  const initialIsFavourite = initialRecipe?.isFavourite ?? false;

  // Effect to fetch detailed recipe data
  useEffect(() => {
    if (isOpen && initialRecipe?.id) {
      setDetailedRecipe(null);
      setDetailError(null);
      setIsLoadingDetails(true);
      setSelectedIngredients(new Set());
      setIsGeneratingLink(false);
      setIsGeneratingInstacartLink(false);
      console.log(`RecipeDetailModal: Fetching details for recipe ID: ${initialRecipe.id}`);
      const fetchDetails = async () => {
        try {
          const response = await fetch(`/api/recipes/${initialRecipe.id}`);
          if (!response.ok) {
            const errorData = await response.json().catch(() => ({ error: "Failed to parse error response" }));
            throw new Error(errorData.error || `Failed to fetch details: ${response.status}`);
          }
          const data: RecipeDetailData = await response.json();
          setDetailedRecipe(data);
          setServingMultiplier(1);
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
      setDetailedRecipe(null);
      setDetailError(null);
      setIsLoadingDetails(false);
      setTimerStates({});
      setSelectedIngredients(new Set());
      setIsGeneratingLink(false);
      setIsGeneratingInstacartLink(false);
    }
  }, [isOpen, initialRecipe?.id]);

  // Effect to add recipe to recently viewed
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

  // Handler for ingredient checkbox changes
  const handleIngredientToggle = useCallback((ingredientIdentifier: string) => {
    setSelectedIngredients(prevSelected => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(ingredientIdentifier)) {
        newSelected.delete(ingredientIdentifier);
      } else {
        newSelected.add(ingredientIdentifier);
      }
      return newSelected;
    });
  }, []);

  // Handler for the "Buy" button click (Amazon)
  const handleBuyOnAmazon = useCallback(async () => {
    // Note: recipeToDisplay is derived from state/props, so it should be a dependency
    if (selectedIngredients.size === 0 || !recipeToDisplay?.ingredients) {
      toast.error("Please select at least one ingredient.");
      return;
    }
    setIsGeneratingLink(true);
    const ingredientMap = new Map<string, typeof recipeToDisplay.ingredients[number]>();
    recipeToDisplay.ingredients.forEach((ing, index) => {
        const identifier = ing.id || `${ing.name}-${index}`;
        ingredientMap.set(identifier, ing);
    });
    const selectedIngredientNames = Array.from(selectedIngredients)
        .map(identifier => ingredientMap.get(identifier)?.name)
        .filter((name): name is string => !!name);
    if (selectedIngredientNames.length === 0) {
       console.error("Could not map selected items to ingredient names.");
       toast.error("Could not process selected ingredients.");
       setIsGeneratingLink(false);
       return;
    }
    try {
      console.log("Sending ingredients to Amazon API:", selectedIngredientNames);
      const response = await fetch('/api/amazon/generate-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify({ ingredients: selectedIngredientNames }),
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData?.error || `API Error: ${response.statusText} (${response.status})`;
        console.error("Error response from Amazon API:", errorData);
        throw new Error(errorMessage);
      }
      const data = await response.json();
      const amazonUrl = data?.url;
      if (amazonUrl && typeof amazonUrl === 'string') {
        console.log("Received Amazon URL:", amazonUrl);
        window.open(amazonUrl, '_blank', 'noopener,noreferrer');
      } else {
        console.error("API returned success but no valid Amazon URL:", data);
        throw new Error("Failed to retrieve a valid Amazon link.");
      }
    } catch (error) {
      console.error('Error generating or opening Amazon link:', error);
      toast.error(error instanceof Error ? error.message : "An unexpected error occurred while generating the Amazon link.");
    } finally {
      setIsGeneratingLink(false);
    }
  }, [selectedIngredients, recipeToDisplay]); // *** FIXED: Added recipeToDisplay dependency ***

  // *** NEW: Handler for the "Shop with Instacart" button click ***
  const handleShopWithInstacart = useCallback(async () => {
    // Note: recipeToDisplay is derived from state/props, so it should be a dependency
    if (selectedIngredients.size === 0 || !recipeToDisplay?.ingredients || !recipeToDisplay?.title) {
      toast.error("Please select at least one ingredient.");
      return;
    }
    setIsGeneratingInstacartLink(true);

    const ingredientMap = new Map<string, typeof recipeToDisplay.ingredients[number]>();
    recipeToDisplay.ingredients.forEach((ing, index) => {
        const identifier = ing.id || `${ing.name}-${index}`;
        ingredientMap.set(identifier, ing);
    });

    // Map selected identifiers to full ingredient description strings required by Instacart
    const selectedIngredientDescriptions = Array.from(selectedIngredients)
      .map(identifier => {
        const ingredient = ingredientMap.get(identifier);
        if (!ingredient) return null;
        let desc = '';
        // Calculate adjusted amount based on serving multiplier
        const originalAmount = ingredient.amount;
        const adjustedAmountValue = !isNaN(Number(originalAmount)) ? (Number(originalAmount) * servingMultiplier) : null;
        const displayAmount = adjustedAmountValue !== null ? (Number.isInteger(adjustedAmountValue) ? adjustedAmountValue : adjustedAmountValue.toFixed(1)) : '';

        if (displayAmount) desc += `${displayAmount} `;
        if (ingredient.unit) desc += `${ingredient.unit} `;
        desc += ingredient.name;
        if (ingredient.notes) desc += ` (${ingredient.notes})`;
        return desc.trim();
      })
      .filter((desc): desc is string => !!desc); // Filter out nulls

    if (selectedIngredientDescriptions.length === 0) {
       console.error("Could not map selected items to ingredient descriptions for Instacart.");
       toast.error("Could not process selected ingredients for Instacart.");
       setIsGeneratingInstacartLink(false);
       return;
    }

    try {
      console.log("Sending data to Instacart API:", {
        title: recipeToDisplay.title,
        ingredients: selectedIngredientDescriptions
      });

      // Call the backend API endpoint
      const response = await fetch('/api/instacart/generate-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify({
          recipe_title: recipeToDisplay.title,
          ingredients: selectedIngredientDescriptions // Pass the array of formatted descriptions
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData?.error || `Instacart API Error: ${response.statusText} (${response.status})`;
        console.error("Error response from Instacart API endpoint:", errorData);
        throw new Error(errorMessage);
      }

      const data = await response.json();
      const instacartUrl = data?.instacartUrl; // Expecting this key from backend

      if (instacartUrl && typeof instacartUrl === 'string') {
        console.log("Received Instacart URL:", instacartUrl);
        window.open(instacartUrl, '_blank', 'noopener,noreferrer');
      } else {
        console.error("Backend API returned success but no valid Instacart URL:", data);
        throw new Error("Failed to retrieve a valid Instacart link from the server.");
      }
    } catch (error) {
      console.error('Error generating or opening Instacart link:', error);
      toast.error(error instanceof Error ? error.message : "An unexpected error occurred while generating the Instacart link.");
    } finally {
      setIsGeneratingInstacartLink(false);
    }
  }, [
      selectedIngredients,
      recipeToDisplay, // *** FIXED: Added recipeToDisplay dependency ***
      servingMultiplier
  ]);

  // Button Handlers
  const handleInitiatePrint = () => setShowPrintOptions(true);
  const handleConfirmPrint = () => { setIsPrinting(true); setShowPrintOptions(false); setTimeout(() => { window.print(); setTimeout(() => setIsPrinting(false), 1000); }, 100); };
  const handleShare = async () => { if (!recipeToDisplay?.id) { toast.error('Cannot share recipe, ID is missing.'); return; } const url = `${window.location.origin}/recipes/${recipeToDisplay.id}`; try { await navigator.clipboard.writeText(url); toast.success('Recipe link copied!'); setCopied(true); setTimeout(() => setCopied(false), 2000); } catch (err) { console.error('Failed to copy URL: ', err); toast.error('Failed to copy link.'); } };

  // Timer Functions
  // ... (playTimer, pauseTimer, rewindTimer, fastForwardTimer remain the same) ...
  const playTimer = (stepNumber: number) => { const description = recipeToDisplay?.instructions?.find(i => i.stepNumber === stepNumber)?.description || ''; const existingTimer = timerStates[stepNumber]; if (existingTimer?.isActive || (existingTimer && existingTimer.remainingTime <= 0)) return; if (existingTimer?.intervalId) clearInterval(existingTimer.intervalId); let durationToUse: number; let isNewTimer = false; if (existingTimer && existingTimer.remainingTime > 0 && existingTimer.initialDuration > 0) { durationToUse = existingTimer.remainingTime; } else { let initialDurationForStep: number | null | undefined = existingTimer?.initialDuration; if (!initialDurationForStep || initialDurationForStep <= 0) { initialDurationForStep = parseDuration(description); } if (!initialDurationForStep || initialDurationForStep <= 0) { setTimerStates(prev => ({ ...prev, [stepNumber]: { ...prev[stepNumber], isActive: false, intervalId: null } })); return; } durationToUse = initialDurationForStep; isNewTimer = true; } const intervalId = setInterval(() => { setTimerStates(prev => { const cs = prev[stepNumber]; if (!cs || !cs.isActive || cs.intervalId !== intervalId) { if(intervalId) clearInterval(intervalId); return prev; } const nr = cs.remainingTime - 1; if (nr <= 0) { clearInterval(intervalId); return { ...prev, [stepNumber]: { ...cs, isActive: false, remainingTime: 0, intervalId: null } }; } return { ...prev, [stepNumber]: { ...cs, remainingTime: nr } }; }); }, 1000); setTimerStates(prev => ({ ...prev, [stepNumber]: { ...(prev[stepNumber] || {}), isActive: true, remainingTime: durationToUse, intervalId: intervalId, ...(isNewTimer && { initialDuration: durationToUse }) } })); };
  const pauseTimer = (stepNumber: number) => { const timer = timerStates[stepNumber]; if (timer?.isActive && timer.intervalId) { clearInterval(timer.intervalId); setTimerStates(prev => ({ ...prev, [stepNumber]: { ...prev[stepNumber], isActive: false, intervalId: null } })); } };
  const rewindTimer = (stepNumber: number) => { setTimerStates(prev => { const cs = prev[stepNumber]; if (!cs || cs.remainingTime <= 0) return prev; const nr = Math.max(0, cs.remainingTime - REWIND_AMOUNT); return { ...prev, [stepNumber]: { ...cs, remainingTime: nr } }; }); };
  const fastForwardTimer = (stepNumber: number) => { setTimerStates(prev => { const cs = prev[stepNumber]; if (!cs) return prev; const nr = cs.remainingTime + FAST_FORWARD_AMOUNT; return { ...prev, [stepNumber]: { ...cs, remainingTime: nr } }; }); };


  // Cleanup timers on modal close
  useEffect(() => {
    if (!isOpen) {
      Object.values(timerStates).forEach(timer => { if (timer.intervalId) clearInterval(timer.intervalId); });
      setTimerStates({});
    }
    // *** FIXED: Added timerStates dependency ***
  }, [isOpen, timerStates]);

  // Sort instructions
  const sortedInstructions = recipeToDisplay?.instructions?.sort((a, b) => a.stepNumber - b.stepNumber) || [];

  // Export Helper Functions
  const downloadFile = (content: string, filename: string, mimeType: string) => { const blob = new Blob([content], { type: mimeType }); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = filename; document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url); };
  const formatRecipeText = (recipeData: RecipeDetailData | InitialRecipeData): string => { let text = `${recipeData.title}\n\n`; text += `Description: ${recipeData.description || 'N/A'}\n`; text += `Cooking Time: ${formatMinutes(recipeData.cookingTime)}\n`; text += `Servings: ${recipeData.servings || 'N/A'}\n\n`; text += `Ingredients:\n`; recipeData.ingredients?.forEach(ing => text += `- ${ing.amount || ''} ${ing.unit || ''} ${ing.name}${ing.notes ? ` (${ing.notes})` : ''}\n`); text += `\nInstructions:\n`; (recipeData.instructions?.sort((a, b) => a.stepNumber - b.stepNumber) || []).forEach(ins => text += `${ins.stepNumber}. ${ins.description}\n`); if (recipeData.notes && recipeData.notes.length > 0) { text += `\nNotes:\n`; recipeData.notes.forEach(note => text += `- ${note}\n`); } return text; };
  const formatRecipeMarkdown = (recipeData: RecipeDetailData | InitialRecipeData): string => { let md = `# ${recipeData.title}\n\n`; md += `*Cooking Time: ${formatMinutes(recipeData.cookingTime)} | Servings: ${recipeData.servings || 'N/A'}*\n\n`; md += `${recipeData.description || ''}\n\n`; md += `## Ingredients\n`; recipeData.ingredients?.forEach(ing => md += `- **${ing.amount || ''} ${ing.unit || ''}** ${ing.name}${ing.notes ? ` (${ing.notes})` : ''}\n`); md += `\n## Instructions\n`; (recipeData.instructions?.sort((a, b) => a.stepNumber - b.stepNumber) || []).forEach(ins => md += `${ins.stepNumber}. ${ins.description}\n`); if (recipeData.notes && recipeData.notes.length > 0) { md += `\n## Notes\n`; recipeData.notes.forEach(note => md += `- ${note}\n`); } return md; };
  const handleExportTxt = () => { if(recipeToDisplay) downloadFile(formatRecipeText(recipeToDisplay), `${recipeToDisplay.title}.txt`, 'text/plain;charset=utf-8'); };
  const handleExportMd = () => { if(recipeToDisplay) downloadFile(formatRecipeMarkdown(recipeToDisplay), `${recipeToDisplay.title}.md`, 'text/markdown;charset=utf-8'); };
  const handleExportPdf = async () => { if(recipeToDisplay && window){ const { jsPDF } = await import('jspdf'); const doc = new jsPDF(); doc.text(formatRecipeText(recipeToDisplay), 10, 10); doc.save(`${recipeToDisplay.title}.pdf`); } };


  return (
    <>
      {/* Print Options Modal */}
      {showPrintOptions && ( <Dialog open={showPrintOptions} onClose={() => setShowPrintOptions(false)} className="relative z-[60]"> <div className="fixed inset-0 bg-black/30" aria-hidden="true" /> <div className="fixed inset-0 flex items-center justify-center p-4"> <Dialog.Panel className="w-full max-w-sm rounded-lg bg-white p-6 shadow-xl"> <Dialog.Title className="text-lg font-medium text-gray-900">Print Options</Dialog.Title> <Dialog.Description className="mt-1 text-sm text-gray-500">Choose what to include.</Dialog.Description> <div className="mt-4 space-y-3"> <div className="flex items-center space-x-2"><Checkbox id="printIncludeImage" checked={printOptions.includeImage} onCheckedChange={(checked) => setPrintOptions(prev => ({ ...prev, includeImage: !!checked }))}/><label htmlFor="printIncludeImage" className="text-sm font-medium">Include Image</label></div> <div className="flex items-center space-x-2"><Checkbox id="printIncludeNotes" checked={printOptions.includeNotes} onCheckedChange={(checked) => setPrintOptions(prev => ({ ...prev, includeNotes: !!checked }))}/><label htmlFor="printIncludeNotes" className="text-sm font-medium">Include Notes</label></div> </div> <div className="mt-6 flex justify-end space-x-3"> <Button variant="outline" onClick={() => setShowPrintOptions(false)}>Cancel</Button> <Button onClick={handleConfirmPrint}>Print Now</Button> </div> </Dialog.Panel> </div> </Dialog> )}
      {/* Flag Submission Modal */}
      {showFlagModal && initialRecipe && ( <div className="fixed inset-0 bg-black bg-opacity-50 z-[60] flex items-center justify-center"> <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4"> <FlagSubmission recipe={initialRecipe} onBack={() => setShowFlagModal(false)} /> </div> </div> )}

      <Transition.Root
        show={isOpen}
        as={Fragment}
        // --- Apply dynamic print classes here ---
        className={printRootClasses}
      >
        <Dialog as="div" className="relative z-10" initialFocus={modalContentRef} onClose={onClose}>
          {/* Backdrop */}
          <Transition.Child
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
              {/* Navigation Buttons */}
              {canGoPrevious && onGoToPrevious && (<button onClick={onGoToPrevious} className="fixed left-2 sm:left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/70 p-2 text-gray-700 hover:bg-white shadow-md transition disabled:opacity-30" aria-label="Previous recipe" disabled={!canGoPrevious}><ChevronLeftIcon className="h-6 w-6 sm:h-8 sm:w-8" /></button>)}
              {canGoNext && onGoToNext && (<button onClick={onGoToNext} className="fixed right-2 sm:right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/70 p-2 text-gray-700 hover:bg-white shadow-md transition disabled:opacity-30" aria-label="Next recipe" disabled={!canGoNext}><ChevronRightIcon className="h-6 w-6 sm:h-8 sm:w-8" /></button>)}

              <Transition.Child
                as="div"
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel id="recipe-modal-content" className="relative transform rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 w-full max-w-md sm:max-w-xl md:max-w-2xl lg:max-w-4xl max-h-[90vh] overflow-y-auto flex flex-col">
                  <div className="absolute right-0 top-0 pr-4 pt-4 z-10"><button type="button" className="rounded-md bg-white text-gray-400 hover:text-gray-500" onClick={onClose}><XMarkIcon className="h-6 w-6" aria-hidden="true" /></button></div>

                   {/* Image Section */}
                   <div id="recipe-modal-image-container" className="relative w-full aspect-video min-h-[200px] print-image-container overflow-hidden rounded-t-lg bg-gray-200">
                    {(recipeToDisplay?.imageUrl) ? ( <Image key={recipeToDisplay.id || recipeToDisplay.imageUrl} src={recipeToDisplay.imageUrl} alt={recipeToDisplay.title ?? 'Recipe Image'} fill style={{ objectFit: 'cover' }} priority onError={(e) => { console.error(`Image Error: Failed loading image for "${recipeToDisplay.title}". Src: ${recipeToDisplay.imageUrl}`, e); const target = e.target as HTMLImageElement; target.style.opacity = '0'; target.style.pointerEvents = 'none'; }}/> ) : ( <div className="absolute inset-0 bg-gray-300 flex items-center justify-center rounded-t-lg"><span className="text-gray-500">No Image</span></div> )}
                    {recipeToDisplay?.imageUrl && ( <h2 className="absolute bottom-4 left-4 text-2xl font-bold text-white drop-shadow-md pointer-events-none">{recipeToDisplay.title ?? 'Loading...'}</h2> )}
                  </div>

                  {/* Content Wrapper */}
                  <div id="recipe-modal-text-content">
                    {isLoadingDetails && ( <div className="p-6 text-center"><LoadingSpinner /><p className="mt-2 text-gray-500">Loading details...</p></div> )}
                    {detailError && !isLoadingDetails && ( <div className="p-6 text-center text-red-600 bg-red-50 rounded-b-lg"> Error loading details: {detailError}</div> )}

                    {!isLoadingDetails && !detailError && recipeToDisplay && (
                        <div className="p-6">
                          {/* Meta Info and Actions */}
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-y-2 mb-4">
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <div className="flex items-center"><ClockIcon className="h-5 w-5 mr-1.5"/><span>{formatMinutes(recipeToDisplay.cookingTime)}</span></div>
                              <div className="flex items-center"> <button onClick={() => setServingMultiplier(prev => Math.max(0.1, prev - (1 / (recipeToDisplay.servings || 1))))} disabled={!recipeToDisplay.servings || (recipeToDisplay.servings * servingMultiplier <= 1)} className="p-1 rounded-full hover:bg-gray-100 disabled:opacity-50 pdf-hide" aria-label="Decrease servings"><span className="text-xs">-</span></button> <UserIcon className="h-5 w-5 mx-1"/><span >{recipeToDisplay.servings ? Math.round(recipeToDisplay.servings * servingMultiplier) : 'N/A'} servings</span> <button onClick={() => setServingMultiplier(prev => prev + (1 / (recipeToDisplay.servings || 1)))} disabled={!recipeToDisplay.servings} className="p-1 rounded-full hover:bg-gray-100 pdf-hide" aria-label="Increase servings"><span className="text-xs">+</span></button> </div>
                              <div className="flex items-center"><BeakerIcon className="h-5 w-5 mr-1.5"/><span>{recipeToDisplay.difficulty ?? 'N/A'}</span></div>
                            </div>
                            <div className="hidden md:flex items-center gap-1 md:gap-2 recipe-modal-print-hide">
                              {recipeToDisplay.id && <FavoriteButton recipeId={recipeToDisplay.id} className="p-1 rounded-md text-gray-600 hover:bg-gray-100 hover:text-red-500" onSuccess={onFavouriteChange} initialIsFavourite={initialIsFavourite} />}
                              <button onClick={handleInitiatePrint} className="p-1 rounded-md text-gray-600 hover:bg-gray-100" title="Print Recipe"><PrinterIcon className="h-5 w-5" /></button>
                              <Menu as="div" className="relative inline-block text-left"> <div><Menu.Button className="inline-flex justify-center items-center w-full rounded-md p-1 text-gray-600 hover:bg-gray-100" title="Export"><ArrowDownTrayIcon className="h-5 w-5"/></Menu.Button></div> <Transition
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                  >
                                    <Menu.Items as="div" className="absolute right-0 mt-2 w-40 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                                      <div className="px-1 py-1">
                                        <Menu.Item>{({ active }) => (<button onClick={handleExportTxt} className={`${active ? 'bg-gray-100' : ''} group flex w-full items-center rounded-md px-2 py-2 text-sm text-gray-700`}>Text (.txt)</button>)}</Menu.Item>
                                        <Menu.Item>{({ active }) => (<button onClick={handleExportMd} className={`${active ? 'bg-gray-100' : ''} group flex w-full items-center rounded-md px-2 py-2 text-sm text-gray-700`}>Markdown (.md)</button>)}</Menu.Item>
                                        <Menu.Item>{({ active }) => (<button onClick={handleExportPdf} className={`${active ? 'bg-gray-100' : ''} group flex w-full items-center rounded-md px-2 py-2 text-sm text-gray-700`}>PDF (.pdf)</button>)}</Menu.Item>
                                      </div>
                                    </Menu.Items>
                                  </Transition> </Menu>
                              <button onClick={handleShare} className="p-1 rounded-md text-gray-600 hover:bg-gray-100 relative" title="Share Recipe"><ShareIcon className="h-5 w-5" />{copied && <span className="absolute -top-7 left-1/2 -translate-x-1/2 text-xs bg-gray-700 text-white px-1 py-0.5 rounded">Copied!</span>}</button>
                              <button onClick={() => setShowFlagModal(true)} className="p-1 rounded-md text-gray-600 hover:bg-gray-100" title="Flag Issue"><FlagIcon className="h-5 w-5" /></button>
                              {isAuthor && (<> <button onClick={() => { /* Edit */ }} className="p-1 rounded-md text-gray-600 hover:bg-gray-100 hover:text-blue-600" title="Edit Recipe"><PencilSquareIcon className="h-5 w-5" /></button> <button onClick={() => { /* Delete */ }} className="p-1 rounded-md text-gray-600 hover:bg-gray-100 hover:text-red-600" title="Delete Recipe"><TrashIcon className="h-5 w-5" /></button> </>)}
                            </div>
                          </div>
                          <p className="text-gray-600 mb-6">{recipeToDisplay.description ?? 'No description available.'}</p>
                          <div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
                            {/* Ingredients */}
                            <div>
                              <h3 className="text-lg font-semibold mb-4">Ingredients</h3>
                              {recipeToDisplay.ingredients && recipeToDisplay.ingredients.length > 0 ? (
                                <div className="space-y-3">
                                  {recipeToDisplay.ingredients.map((ing, index) => {
                                    const originalAmount = ing.amount;
                                    // Calculate adjusted amount based on serving multiplier
                                    const adjustedAmountValue = !isNaN(Number(originalAmount)) ? (Number(originalAmount) * servingMultiplier) : null;
                                    // Format the amount for display
                                    const displayAmount = adjustedAmountValue !== null ? (Number.isInteger(adjustedAmountValue) ? adjustedAmountValue : adjustedAmountValue.toFixed(1)) : '';
                                    const ingredientIdentifier = ing.id || `${ing.name}-${index}`;
                                    const checkboxId = `ingredient-checkbox-${ingredientIdentifier}`;
                                    return (
                                      <div key={ingredientIdentifier} className="flex items-start space-x-3">
                                        <Checkbox id={checkboxId} checked={selectedIngredients.has(ingredientIdentifier)} onCheckedChange={() => handleIngredientToggle(ingredientIdentifier)} className="mt-1" aria-labelledby={`${checkboxId}-label`} />
                                        <label htmlFor={checkboxId} id={`${checkboxId}-label`} className="flex-1 text-gray-700 cursor-pointer"> <span className="font-medium">{displayAmount}</span> <span className="ml-1">{ing.unit || ''}</span> <span className="ml-2">{ing.name}</span> {ing.notes && <span className="text-gray-500 text-sm ml-1 italic">({ing.notes})</span>} </label>
                                      </div>
                                    );
                                  })}
                                  {/* --- Shopping Buttons Section (MODIFIED) --- */}
                                  <div className="mt-6 border-t pt-4">
                                    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4"> {/* Stack vertically on small screens, side-by-side otherwise */}
                                      {/* Amazon Button */}
                                      <Button
                                        onClick={handleBuyOnAmazon}
                                        disabled={selectedIngredients.size === 0 || isGeneratingLink || isGeneratingInstacartLink} // Disable if either is loading
                                        className="flex-1 flex items-center justify-center gap-2" // Ensure icon and text are centered
                                      >
                                        {isGeneratingLink ? (
                                            <>
                                                <LoadingSpinner className="h-5 w-5" />
                                                Checking Amazon...
                                            </>
                                        ) : (
                                            <>
                                                <ShoppingCartIcon className="h-5 w-5"/>
                                                Shop on Amazon
                                            </>
                                        )}
                                      </Button>

                                      {/* Instacart Button (NEW) */}
                                      <Button
                                        variant="secondary" // Use a different style if desired
                                        onClick={handleShopWithInstacart} // Use the new handler
                                        disabled={selectedIngredients.size === 0 || isGeneratingLink || isGeneratingInstacartLink} // Disable if either is loading
                                        className="flex-1 flex items-center justify-center gap-2" // Ensure icon and text are centered
                                      >
                                        {isGeneratingInstacartLink ? (
                                            <>
                                                <LoadingSpinner className="h-5 w-5" />
                                                Checking Instacart...
                                            </>
                                        ) : (
                                            <>
                                                <ShoppingBagIcon className="h-5 w-5"/> {/* Different icon */}
                                                Shop via Instacart
                                            </>
                                        )}
                                      </Button>
                                    </div>
                                    {/* --- Disclosure Text (UPDATED) --- */}
                                    <p className="text-xs text-gray-500 mt-3 text-center px-4">
                                        Shop ingredients via Amazon or Instacart (opens new tab). As an Amazon Associate and potentially other affiliate programs, we may earn from qualifying purchases.
                                    </p>
                                  </div>
                                </div>
                              ) : (<p className="text-gray-500">No ingredients listed.</p>)}
                            </div>
                            {/* Instructions */}
                            <div>
                              <h3 className="text-lg font-semibold mb-4">Instructions</h3>
                              {sortedInstructions.length > 0 ? (
                                <ol className="space-y-4 list-decimal list-inside">
                                  {sortedInstructions.map((instruction) => {
                                    const timerState = timerStates[instruction.stepNumber];
                                    const hasInitialDuration = timerState?.initialDuration && timerState.initialDuration > 0;
                                    const canEverHaveTimer = !!(hasInitialDuration || parseDuration(instruction.description) !== null);
                                    const isFinished = Boolean(hasInitialDuration && timerState?.remainingTime <= 0);
                                    return (
                                      <li key={instruction.id} className="text-gray-700 group">
                                        <div className="flex items-start">
                                          <div className="flex-1">
                                            <span>{instruction.description}</span>
                                            {canEverHaveTimer && (
                                              <div className="flex items-center gap-1 mt-1 ml-4 text-sm text-gray-500">
                                                <button onClick={() => rewindTimer(instruction.stepNumber)} disabled={!timerState || timerState.remainingTime <= 0} className="p-0.5 rounded-full hover:bg-gray-100 disabled:opacity-50" aria-label="Rewind"><BackwardIcon className="h-4 w-4" /></button>
                                                {timerState?.isActive ? (
                                                  <button onClick={() => pauseTimer(instruction.stepNumber)} className="p-0.5 rounded-full text-blue-600 hover:bg-blue-100" aria-label="Pause"><PauseIcon className="h-4 w-4" /></button>
                                                ) : (
                                                  <button onClick={() => playTimer(instruction.stepNumber)} disabled={!canEverHaveTimer || isFinished} className="p-0.5 rounded-full text-green-600 hover:bg-green-100 disabled:opacity-50" aria-label="Play"><PlayIcon className="h-4 w-4" /></button>
                                                )}
                                                <button onClick={() => fastForwardTimer(instruction.stepNumber)} disabled={!timerState} className="p-0.5 rounded-full hover:bg-gray-100 disabled:opacity-50" aria-label="Fast forward"><ForwardIcon className="h-4 w-4" /></button>
                                                <div className="font-mono min-w-[55px] text-xs text-center tabular-nums">
                                                  {isFinished ? (
                                                    <span className="text-red-500 font-medium">Done!</span>
                                                  ) : timerState ? (
                                                    <span className={timerState.isActive ? 'text-blue-600 font-medium' : 'text-gray-600'}>{formatTime(timerState.remainingTime)}</span>
                                                  ) : (
                                                    <span className="text-gray-400">--:--</span>
                                                  )}
                                                </div>
                                              </div>
                                            )}
                                          </div>
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
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4"> <div className="bg-gray-50 p-4 rounded-lg"><div className="text-sm text-gray-500">Calories</div><div className="text-xl font-semibold">{recipeToDisplay.calories ?? 'N/A'}</div></div> <div className="bg-gray-50 p-4 rounded-lg"><div className="text-sm text-gray-500">Protein</div><div className="text-xl font-semibold">{recipeToDisplay.nutritionFacts?.protein?.toFixed(1) ?? 'N/A'}g</div></div> <div className="bg-gray-50 p-4 rounded-lg"><div className="text-sm text-gray-500">Carbs</div><div className="text-xl font-semibold">{recipeToDisplay.nutritionFacts?.carbs?.toFixed(1) ?? 'N/A'}g</div></div> <div className="bg-gray-50 p-4 rounded-lg"><div className="text-sm text-gray-500">Fat</div><div className="text-xl font-semibold">{recipeToDisplay.nutritionFacts?.fat?.toFixed(1) ?? 'N/A'}g</div></div> </div>
                          </div>
                          {/* Notes */}
                          {recipeToDisplay.notes && recipeToDisplay.notes.length > 0 && ( <div className="mt-8 recipe-modal-notes"> <h3 className="text-lg font-semibold mb-4">Notes</h3> <div className="bg-blue-50 p-4 rounded-lg"><ul className="list-disc list-inside space-y-2 text-gray-700 text-sm">{recipeToDisplay.notes.map((note, index) => (<li key={index}>{note}</li>))}</ul></div> </div> )}
                          {/* Mobile Action Buttons */}
                          <div className="flex md:hidden justify-around items-center mt-8 pt-4 border-t border-gray-200 recipe-modal-print-hide">
                             {recipeToDisplay.id && <FavoriteButton recipeId={recipeToDisplay.id} className="p-1 rounded-md text-gray-600 hover:bg-gray-100 hover:text-red-500" onSuccess={onFavouriteChange} initialIsFavourite={initialIsFavourite}/>}
                            <button onClick={handleInitiatePrint} className="p-1 rounded-md text-gray-600 hover:bg-gray-100" title="Print"><PrinterIcon className="h-5 w-5"/></button>
                            <Menu as="div" className="relative inline-block text-left"> <div><Menu.Button className="inline-flex justify-center items-center w-full rounded-md p-1 text-gray-600 hover:bg-gray-100" title="Export"><ArrowDownTrayIcon className="h-5 w-5"/></Menu.Button></div> <Transition
                                  enter="transition ease-out duration-100"
                                  enterFrom="transform opacity-0 scale-95"
                                  enterTo="transform opacity-100 scale-100"
                                  leave="transition ease-in duration-75"
                                  leaveFrom="transform opacity-100 scale-100"
                                  leaveTo="transform opacity-0 scale-95"
                                >
                                  <Menu.Items as="div" className="absolute bottom-full right-0 mb-2 w-40 origin-bottom-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                                    <div className="px-1 py-1">
                                      <Menu.Item>{({ active }) => (<button onClick={handleExportTxt} className={`${active ? 'bg-gray-100' : ''} group flex w-full items-center rounded-md px-2 py-2 text-sm text-gray-700`}>Text</button>)}</Menu.Item>
                                      <Menu.Item>{({ active }) => (<button onClick={handleExportMd} className={`${active ? 'bg-gray-100' : ''} group flex w-full items-center rounded-md px-2 py-2 text-sm text-gray-700`}>Markdown</button>)}</Menu.Item>
                                      <Menu.Item>{({ active }) => (<button onClick={handleExportPdf} className={`${active ? 'bg-gray-100' : ''} group flex w-full items-center rounded-md px-2 py-2 text-sm text-gray-700`}>PDF</button>)}</Menu.Item>
                                    </div>
                                  </Menu.Items>
                                </Transition> </Menu>
                            <button onClick={handleShare} className="p-1 rounded-md text-gray-600 hover:bg-gray-100 relative" title="Share"><ShareIcon className="h-5 w-5"/></button>
                            <button onClick={() => setShowFlagModal(true)} className="p-1 rounded-md text-gray-600 hover:bg-gray-100" title="Flag Issue"><FlagIcon className="h-5 w-5"/></button>
                            {isAuthor && (<> <button onClick={() => {/* Edit */}} className="p-1 rounded-md text-gray-600 hover:bg-gray-100 hover:text-blue-600" title="Edit"><PencilSquareIcon className="h-5 w-5"/></button> <button onClick={() => {/* Delete */}} className="p-1 rounded-md text-gray-600 hover:bg-gray-100 hover:text-red-600" title="Delete"><TrashIcon className="h-5 w-5"/></button> </>)}
                          </div>
                        </div>
                    )}
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