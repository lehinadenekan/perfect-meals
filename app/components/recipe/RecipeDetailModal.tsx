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
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';
import { Recipe } from '@/app/types/recipe';
import Image from 'next/image';
import FavoriteButton from '../shared/FavoriteButton';
import FlagSubmission from './FlagSubmission';
import { addRecentlyViewed } from '@/app/utils/recentlyViewed';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useUser } from '@clerk/nextjs';
import { toast } from 'react-hot-toast';
import RecipeDisplay from '@/app/components/recipes/RecipeDisplay';

interface RecipeDetailModalProps {
  recipe: Recipe;
  isOpen: boolean;
  onClose: () => void;
  onFavoriteChange?: (recipeId: string, newIsFavorite: boolean) => void;
  onGoToPrevious?: () => void;
  onGoToNext?: () => void;
  canGoPrevious?: boolean;
  canGoNext?: boolean;
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

interface PrintOptions {
  includeImage: boolean;
  includeNotes: boolean;
  // Add more options as needed (e.g., includeNutrition)
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

export default function RecipeDetailModal({
  recipe,
  isOpen,
  onClose,
  onFavoriteChange,
  onGoToPrevious,
  onGoToNext,
  canGoPrevious = false,
  canGoNext = false
}: RecipeDetailModalProps) {
  const [servingMultiplier, setServingMultiplier] = useState(1);
  const [showFlagModal, setShowFlagModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const [timerStates, setTimerStates] = useState<TimerStates>({}); // State for timers
  const [showPrintOptions, setShowPrintOptions] = useState(false); // State for print options modal
  const [printOptions, setPrintOptions] = useState<PrintOptions>({ // State for print choices
    includeImage: true,
    includeNotes: true,
  });
  const [isPrinting, setIsPrinting] = useState(false); // State to add print-specific classes
  const [isExportingPdf, setIsExportingPdf] = useState(false); // State for PDF export loading
  const modalContentRef = useRef<HTMLDivElement>(null); // Ref for the content area to export

  // Effect to add recipe to recently viewed when modal opens
  useEffect(() => {
    if (isOpen && recipe) {
      addRecentlyViewed(recipe);
      console.log("Added to recently viewed:", recipe.title);
    }
  }, [isOpen, recipe]); // Run when isOpen changes or the recipe itself changes while open

  // --- Keyboard Navigation Effect ---
  useEffect(() => {
    if (!isOpen) return; // Only listen when modal is open

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        if (canGoPrevious && onGoToPrevious) {
          onGoToPrevious();
        }
      } else if (event.key === 'ArrowRight') {
        if (canGoNext && onGoToNext) {
          onGoToNext();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Cleanup listener on component unmount or when modal closes
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, canGoPrevious, canGoNext, onGoToPrevious, onGoToNext]); // Dependencies

  // --- Button Handlers ---

  // Updated Print Handler: Opens the options modal first
  const handleInitiatePrint = () => {
    setShowPrintOptions(true);
  };

  // Actual Print Function (called from options modal)
  const handleConfirmPrint = () => {
    setIsPrinting(true);
    setShowPrintOptions(false);

    // Give React time to apply the isPrinting state/classes before triggering print
    setTimeout(() => {
      window.print();
      // We can't reliably know when printing finishes, so we remove the class after a delay.
      // Using onafterprint is another option but has browser compatibility issues.
      setTimeout(() => {
        setIsPrinting(false);
      }, 1000); // Adjust delay as needed
    }, 100);
  };

  // Function to handle copying the URL
  const handleShare = async () => {
    // Construct the correct URL using the recipe ID
    const url = `${window.location.origin}/recipes/${recipe.id}`;
    
    if (!recipe || !recipe.id) {
        console.error('Share failed: Recipe or Recipe ID is missing.');
        toast.error('Cannot share recipe, ID is missing.');
        return;
    }

    try {
      await navigator.clipboard.writeText(url);
      toast.success('Recipe link copied!'); // Use toast for feedback
      setCopied(true); // Keep internal state if needed elsewhere
      // Reset the copied state after a short delay if you rely on it for UI changes
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy URL: ', err);
      toast.error('Failed to copy link.'); // Use toast for error feedback
    }
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
          const newState = { ...prev };
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
        if (!currentStepState || !currentStepState.isActive || currentStepState.intervalId !== intervalId) {
          if (intervalId) clearInterval(intervalId);
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

  // --- Export Helper Functions ---

  // Utility to trigger file download
  const downloadFile = (content: string, filename: string, mimeType: string) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Formats recipe data as plain text
  const formatRecipeText = (recipeData: Recipe): string => {
    let text = `${recipeData.title}\n\n`;
    text += `Description: ${recipeData.description || 'N/A'}\n\n`;
    text += `Cooking Time: ${recipeData.cookingTime} min\n`;
    text += `Servings: ${recipeData.servings}\n`;
    text += `Difficulty: ${recipeData.difficulty}\n\n`;

    text += "Ingredients:\n";
    const ingredients = recipeData.ingredients || [];
    if (ingredients.length > 0) {
      ingredients.forEach(ing => {
        text += `- ${ing.amount} ${ing.unit || ''} ${ing.name}${ing.notes ? ` (${ing.notes})` : ''}\n`;
      });
    } else {
      text += "- N/A\n";
    }
    text += "\n";

    text += "Instructions:\n";
    const instructions = recipeData.instructions?.sort((a, b) => a.stepNumber - b.stepNumber) || [];
    if (instructions.length > 0) {
      instructions.forEach(inst => {
        text += `${inst.stepNumber}. ${inst.description}\n`;
      });
    } else {
      text += "- N/A\n";
    }
    text += "\n";

    return text;
  };

  // Formats recipe data as Markdown
  const formatRecipeMarkdown = (recipeData: Recipe): string => {
    let md = `# ${recipeData.title}\n\n`;
    md += `*Description:* ${recipeData.description || 'N/A'}\n\n`;
    md += `**Cooking Time:** ${recipeData.cookingTime} min  \n`; // Double space for line break
    md += `**Servings:** ${recipeData.servings}  \n`;
    md += `**Difficulty:** ${recipeData.difficulty}\n\n`;

    md += "## Ingredients\n";
    const ingredients = recipeData.ingredients || [];
    if (ingredients.length > 0) {
      ingredients.forEach(ing => {
        md += `* ${ing.amount} ${ing.unit || ''} ${ing.name}${ing.notes ? ` (${ing.notes})` : ''}\n`;
      });
    } else {
      md += "* N/A\n";
    }
    md += "\n";

    md += "## Instructions\n";
    const instructions = recipeData.instructions?.sort((a, b) => a.stepNumber - b.stepNumber) || [];
    if (instructions.length > 0) {
      instructions.forEach(inst => {
        md += `${inst.stepNumber}. ${inst.description}\n`;
      });
    } else {
      md += "* N/A\n";
    }
    md += "\n";

    return md;
  };

  // Handles Text export
  const handleExportTxt = () => {
    const textContent = formatRecipeText(recipe);
    downloadFile(textContent, `${recipe.title}.txt`, 'text/plain;charset=utf-8');
  };

  // Handles Markdown export
  const handleExportMd = () => {
    const mdContent = formatRecipeMarkdown(recipe);
    downloadFile(mdContent, `${recipe.title}.md`, 'text/markdown;charset=utf-8');
  };

  // Handles PDF export (Client-side)
  const handleExportPdf = async () => {
    setIsExportingPdf(true);
    const pdf = new jsPDF('p', 'pt', 'a4'); // Use A4 page size
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const pdfMargin = 20; // Increased margin
    const usableWidth = pdfWidth - pdfMargin * 2;
    const usableHeight = pdfHeight - pdfMargin * 2;

    // Find the parent modal content panel to add/remove class
    const modalContentElement = document.getElementById('recipe-modal-content');

    try {
      // Add class to hide elements before capturing
      modalContentElement?.classList.add('pdf-exporting');

      // Capture the image container
      const imageContainerElement = document.getElementById('recipe-modal-image-container');
      let imageCanvas, imageBaseHeight = 0;
      if (imageContainerElement) {
        imageCanvas = await html2canvas(imageContainerElement, {
          scale: 2, // Increase scale for better resolution
          useCORS: true, // Important for external images
          logging: false, // Reduce console noise
        });
        const imgData = imageCanvas.toDataURL('image/jpeg', 0.9); // Use JPEG for potentially smaller size
        const imgProps = pdf.getImageProperties(imgData);
        const imgHeight = (imgProps.height * usableWidth) / imgProps.width;
        pdf.addImage(imgData, 'JPEG', pdfMargin, pdfMargin, usableWidth, imgHeight);
        imageBaseHeight = imgHeight + pdfMargin; // Position where text should start initially
      } else {
          console.warn("Recipe image container not found for PDF export.");
      }


      // Capture the text content container
      const textContentElement = document.getElementById('recipe-modal-text-content');
      if (!textContentElement) {
          throw new Error("Recipe text content container not found for PDF export.");
      }

      const textContentCanvas = await html2canvas(textContentElement, {
          scale: 2, // Increase scale for better resolution
          scrollY: -window.scrollY, // Capture based on element, not window scroll
          windowWidth: textContentElement.scrollWidth,
          windowHeight: textContentElement.scrollHeight,
          logging: false, // Reduce console noise
          // Optionally add more html2canvas configs if needed
      });

      const textImgData = textContentCanvas.toDataURL('image/png'); // Use PNG for text clarity
      const textImgProps = pdf.getImageProperties(textImgData);
      const totalTextHeightScaled = (textImgProps.height * usableWidth) / textImgProps.width;


      let currentTextY = imageBaseHeight + 10; // Start text below image + small gap
      let remainingTextCanvasHeight = textContentCanvas.height; // Use original canvas height for slicing
      let sourceY = 0; // The Y position on the source canvas to start slicing from

      // Loop to add text pages
      while (remainingTextCanvasHeight > 0) {
        // If not the first text page, add a new page
        if (sourceY > 0) {
            pdf.addPage();
            currentTextY = pdfMargin; // Reset Y for new page
        }

        // Calculate height of content that fits on the *current* page
        let spaceLeftOnPage = usableHeight - (currentTextY - pdfMargin); // Subtract space already used (e.g., by image)
        if (spaceLeftOnPage <= 0) { // If image took the whole page or more
             pdf.addPage();
             currentTextY = pdfMargin;
             spaceLeftOnPage = usableHeight;
        }

        // Calculate the height of the slice from the source canvas
        // Convert the spaceLeftOnPage (in PDF units) back to canvas pixel height
        const sliceHeightPx = (spaceLeftOnPage / usableWidth) * textContentCanvas.width;

        // Determine the actual height to slice: minimum of remaining height and calculated slice height
        const currentSliceHeightPx = Math.min(remainingTextCanvasHeight, sliceHeightPx);
        // Calculate the height this slice will occupy in the PDF
        const pdfSliceHeight = (currentSliceHeightPx / textContentCanvas.width) * usableWidth;


        // Create a temporary canvas for the slice
        const sliceCanvas = document.createElement('canvas');
        sliceCanvas.width = textContentCanvas.width;
        sliceCanvas.height = currentSliceHeightPx;
        const sliceCtx = sliceCanvas.getContext('2d');

        // Draw the slice from the main text canvas onto the temporary canvas
         sliceCtx?.drawImage(
            textContentCanvas,
            0, sourceY, // Source x, y
            textContentCanvas.width, currentSliceHeightPx, // Source width, height
            0, 0, // Destination x, y
            textContentCanvas.width, currentSliceHeightPx // Destination width, height
        );


        // Add the slice image to the PDF
        const sliceImgData = sliceCanvas.toDataURL('image/png');
        pdf.addImage(sliceImgData, 'PNG', pdfMargin, currentTextY, usableWidth, pdfSliceHeight);

        // Update remaining height and source Y position
        remainingTextCanvasHeight -= currentSliceHeightPx;
        sourceY += currentSliceHeightPx;
        // Update currentTextY for the next iteration (though it resets if a new page is added)
        currentTextY += pdfSliceHeight + 10; // Add a small gap between slices if on same page (unlikely with current logic)

      }


      pdf.save(`${recipe.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.pdf`); // Sanitize filename

    } catch (error) {
      console.error("Error generating PDF:", error);
      // Type check the error before accessing its message property
      let errorMessage = 'An unknown error occurred.';
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === 'string') {
        errorMessage = error; // Handle if error is just a string
      }
      // Use the extracted message or the default
      alert(`Failed to generate PDF. ${errorMessage || 'See console for details.'}`);
    } finally {
      // Always remove the class and reset loading state
      modalContentElement?.classList.remove('pdf-exporting');
      setIsExportingPdf(false);
    }
  };

  return (
    <>
      {/* Print Options Modal */}
      {showPrintOptions && (
        <Dialog open={showPrintOptions} onClose={() => setShowPrintOptions(false)} className="relative z-[60]">
          {/* Backdrop */}
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

          {/* Full-screen container to center the panel */}
          <div className="fixed inset-0 flex items-center justify-center p-4">
            {/* The actual dialog panel */}
            <Dialog.Panel className="w-full max-w-sm rounded-lg bg-white p-6 shadow-xl">
              <Dialog.Title className="text-lg font-medium text-gray-900">Print Options</Dialog.Title>
              <Dialog.Description className="mt-1 text-sm text-gray-500">
                Choose what to include in the printout.
              </Dialog.Description>

              <div className="mt-4 space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="includeImage"
                    checked={printOptions.includeImage}
                    onCheckedChange={(checked) => setPrintOptions(prev => ({ ...prev, includeImage: !!checked }))}
                  />
                  <label htmlFor="includeImage" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Include Recipe Image
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="includeNotes"
                    checked={printOptions.includeNotes}
                    onCheckedChange={(checked) => setPrintOptions(prev => ({ ...prev, includeNotes: !!checked }))}
                  />
                  <label htmlFor="includeNotes" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Include Notes Section
                  </label>
                </div>
                {/* Add more checkboxes for other sections like nutrition here */}
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <Button variant="outline" onClick={() => setShowPrintOptions(false)}>
                  Cancel
                </Button>
                <Button onClick={handleConfirmPrint}>
                  Print Now
                </Button>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      )}

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
        <Dialog ref={modalContentRef} as="div" className={`${isPrinting ? 'printing-active' : ''} ${printOptions.includeImage ? '' : 'print-hide-image'} ${printOptions.includeNotes ? '' : 'print-hide-notes'} relative z-50`} onClose={onClose}>
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
              {/* Previous Button */}
              {canGoPrevious && onGoToPrevious && (
                <button
                  onClick={onGoToPrevious}
                  className="fixed left-2 sm:left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/70 p-2 text-gray-700 hover:bg-white shadow-md transition disabled:opacity-30 disabled:cursor-not-allowed"
                  aria-label="Previous recipe"
                  disabled={!canGoPrevious}
                >
                  <ChevronLeftIcon className="h-6 w-6 sm:h-8 sm:w-8" />
                </button>
              )}

              {/* Next Button */}
              {canGoNext && onGoToNext && (
                <button
                  onClick={onGoToNext}
                  className="fixed right-2 sm:right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/70 p-2 text-gray-700 hover:bg-white shadow-md transition disabled:opacity-30 disabled:cursor-not-allowed"
                  aria-label="Next recipe"
                  disabled={!canGoNext}
                >
                  <ChevronRightIcon className="h-6 w-6 sm:h-8 sm:w-8" />
                </button>
              )}

              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel id="recipe-modal-content" className="relative transform rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 w-full max-w-md sm:max-w-xl md:max-w-2xl lg:max-w-4xl max-h-[90vh] overflow-y-auto flex flex-col">
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

                  {/* Recipe Image - Add ID here */}
                  <div id="recipe-modal-image-container" className="relative w-full aspect-video">
                    {recipe.imageUrl && (
                      <Image
                        src={recipe.imageUrl}
                        alt={recipe.title}
                        fill
                        className="object-cover rounded-t-lg"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <h2 className="absolute bottom-4 left-4 text-2xl font-bold text-white">
                      {recipe.title}
                    </h2>
                  </div>

                  {/* Wrap the rest of the content - Add Wrapper Div Here */}
                  <div id="recipe-modal-text-content">
                    <div className="p-6">
                      {/* Recipe Meta Info and Action Buttons Container */}
                      {/* This container now mainly handles layout for md+ screens */}
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-y-2 mb-4">
                        {/* Left Side: Time, Servings, Difficulty (Always Visible Here) */}
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center">
                            <ClockIcon className="h-5 w-5 mr-1.5" aria-hidden="true" />
                            <span>{recipe.cookingTime} min</span>
                          </div>
                          <div className="flex items-center">
                            {/* Serving adjustment controls - ADD pdf-hide HERE */}
                            <button
                              onClick={() => setServingMultiplier(prev => Math.max(1 / recipe.servings, prev - 1 / recipe.servings))}
                              disabled={recipe.servings * servingMultiplier <= 1}
                              className="p-1 rounded-full hover:bg-gray-100 disabled:opacity-50 pdf-hide" // Added pdf-hide
                              aria-label="Decrease servings"
                            >
                              <span className="text-xs">-</span>
                            </button>
                            <UserIcon className="h-5 w-5 mx-1" aria-hidden="true" />
                            <span>{Math.round(recipe.servings * servingMultiplier)} servings</span>
                            {/* Serving adjustment controls - ADD pdf-hide HERE */}
                            <button
                              onClick={() => setServingMultiplier(prev => prev + 1 / recipe.servings)}
                              className="p-1 rounded-full hover:bg-gray-100 pdf-hide" // Added pdf-hide
                              aria-label="Increase servings"
                            >
                              <span className="text-xs">+</span>
                            </button>
                          </div>
                          <div className="flex items-center">
                            <BeakerIcon className="h-5 w-5 mr-1.5" aria-hidden="true" />
                            <span>{recipe.difficulty}</span>
                          </div>
                        </div>

                        {/* Right Side: Action Buttons (Desktop - Visible md+) */}
                        {/* Added hidden md:flex */}
                        <div className="hidden md:flex items-center gap-1 md:gap-2 recipe-modal-print-hide">
                          {/* Favorite Button */}
                          <FavoriteButton
                            recipeId={recipe.id}
                            className="p-1 rounded-md text-gray-600 hover:bg-gray-100 hover:text-red-500"
                            onSuccess={onFavoriteChange}
                          />
                          {/* Print Button */}
                          <button
                            onClick={handleInitiatePrint}
                            className="p-1 rounded-md text-gray-600 hover:bg-gray-100"
                            title="Print Recipe"
                          >
                            <PrinterIcon className="h-5 w-5" />
                            <span className="sr-only">Print Recipe</span>
                          </button>
                          {/* Export Dropdown */}
                          <Menu as="div" className="relative inline-block text-left">
                            <div>
                              <Menu.Button
                                className="inline-flex justify-center items-center w-full rounded-md p-1 text-gray-600 hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 disabled:opacity-50"
                                disabled={isExportingPdf}
                                title="Export Recipe"
                              >
                                {isExportingPdf ? (
                                  <svg className="animate-spin h-5 w-5 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                  </svg>
                                ) : (
                                  <ArrowDownTrayIcon className="h-5 w-5" aria-hidden="true" />
                                )}
                                {/* No chevron needed for mobile? Optional. */}
                              </Menu.Button>
                            </div>
                            <Transition
                              as={Fragment}
                              enter="transition ease-out duration-100"
                              enterFrom="transform opacity-0 scale-95"
                              enterTo="transform opacity-100 scale-100"
                              leave="transition ease-in duration-75"
                              leaveFrom="transform opacity-100 scale-100"
                              leaveTo="transform opacity-0 scale-95"
                            >
                              {/* Ensure dropdown opens upwards or carefully positioned on mobile - updated below for mobile */}
                              <Menu.Items className="absolute right-0 mt-2 w-40 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                                <div className="px-1 py-1">
                                  <Menu.Item>
                                    {({ active }) => (
                                      <button onClick={handleExportTxt} className={`${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'} group flex w-full items-center rounded-md px-2 py-2 text-sm`}>Text (.txt)</button>
                                    )}
                                  </Menu.Item>
                                  <Menu.Item>
                                    {({ active }) => (
                                      <button onClick={handleExportMd} className={`${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'} group flex w-full items-center rounded-md px-2 py-2 text-sm`}>Markdown (.md)</button>
                                    )}
                                  </Menu.Item>
                                  <Menu.Item>
                                    {({ active }) => (
                                      <button onClick={handleExportPdf} disabled={isExportingPdf} className={`${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'} group flex w-full items-center rounded-md px-2 py-2 text-sm disabled:opacity-50`}>PDF (.pdf)</button>
                                    )}
                                  </Menu.Item>
                                </div>
                              </Menu.Items>
                            </Transition>
                          </Menu>
                          {/* Share Button */}
                          <button
                            onClick={handleShare}
                            className="p-1 rounded-md text-gray-600 hover:bg-gray-100 relative"
                            title="Share Recipe"
                          >
                            <ShareIcon className="h-5 w-5" />
                            {/* Position copied confirmation appropriately for bottom layout */}
                            {copied && (
                              <span className="absolute -top-7 left-1/2 -translate-x-1/2 text-xs bg-gray-700 text-white px-1 py-0.5 rounded">
                                Copied!
                              </span>
                            )}
                          </button>
                          {/* Flag Button */}
                          <button
                            onClick={() => setShowFlagModal(true)}
                            className="p-1 rounded-md text-gray-600 hover:bg-gray-100"
                            title="Flag Issue"
                          >
                            <FlagIcon className="h-5 w-5" />
                            <span className="sr-only">Flag Issue</span>
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
                          {/* Main ingredients are handled in RecipeDisplay */}

                          {/* Spices and Seasonings */}
                          {/* Spices and seasonings are handled in RecipeDisplay */}

                          {/* Garnishes */}
                          {/* Garnishes are handled in RecipeDisplay */}

                          {/* Other/Optional Ingredients */}
                          {/* Other ingredients are handled in RecipeDisplay */}
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
                            <div className="text-xl font-semibold">{recipe.calories ?? 'N/A'}</div>
                          </div>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="text-sm text-gray-500">Protein</div>
                            <div className="text-xl font-semibold">{recipe.nutritionFacts?.protein ?? 0}g</div>
                          </div>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="text-sm text-gray-500">Carbs</div>
                            <div className="text-xl font-semibold">{recipe.nutritionFacts?.carbs ?? 0}g</div>
                          </div>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="text-sm text-gray-500">Fat</div>
                            <div className="text-xl font-semibold">{recipe.nutritionFacts?.fat ?? 0}g</div>
                          </div>
                        </div>
                      </div>

                      {/* Notes Section (Replaces Cooking Tips) */}
                      {recipe.notes && recipe.notes.length > 0 && (
                        <div className="mt-8 recipe-modal-notes">
                          <h3 className="text-lg font-semibold mb-4">Notes</h3>
                          <div className="bg-blue-50 p-4 rounded-lg"> {/* Optional: Changed background color */}
                            <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm">
                              {recipe.notes.map((note, index) => (
                                <li key={index}>{note}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}

                      {/* --- Action Buttons (Mobile - Visible below content, hidden md+) --- */}
                      <div className="flex md:hidden justify-around items-center mt-8 pt-4 border-t border-gray-200 recipe-modal-print-hide">
                          {/* Favorite Button */}
                          <FavoriteButton
                            recipeId={recipe.id}
                            className="p-1 rounded-md text-gray-600 hover:bg-gray-100 hover:text-red-500"
                            onSuccess={onFavoriteChange}
                          />
                          {/* Print Button */}
                          <button
                            onClick={handleInitiatePrint}
                            className="p-1 rounded-md text-gray-600 hover:bg-gray-100"
                            title="Print Recipe"
                          >
                            <PrinterIcon className="h-5 w-5" />
                            <span className="sr-only">Print Recipe</span>
                          </button>
                          {/* Export Dropdown (Mobile) */}
                          <Menu as="div" className="relative inline-block text-left">
                            <div>
                              <Menu.Button
                                className="inline-flex justify-center items-center w-full rounded-md p-1 text-gray-600 hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 disabled:opacity-50"
                                disabled={isExportingPdf}
                                title="Export Recipe"
                              >
                                {isExportingPdf ? (
                                  <svg className="animate-spin h-5 w-5 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                  </svg>
                                ) : (
                                  <ArrowDownTrayIcon className="h-5 w-5" aria-hidden="true" />
                                )}
                              </Menu.Button>
                            </div>
                            <Transition
                              as={Fragment}
                              enter="transition ease-out duration-100"
                              enterFrom="transform opacity-0 scale-95"
                              enterTo="transform opacity-100 scale-100"
                              leave="transition ease-in duration-75"
                              leaveFrom="transform opacity-100 scale-100"
                              leaveTo="transform opacity-0 scale-95"
                            >
                              {/* Opens upwards for mobile */}
                              <Menu.Items className="absolute bottom-full right-0 mb-2 w-40 origin-bottom-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                                <div className="px-1 py-1">
                                  <Menu.Item>
                                    {({ active }) => (
                                      <button onClick={handleExportTxt} className={`${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'} group flex w-full items-center rounded-md px-2 py-2 text-sm`}>Text (.txt)</button>
                                    )}
                                  </Menu.Item>
                                  <Menu.Item>
                                    {({ active }) => (
                                      <button onClick={handleExportMd} className={`${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'} group flex w-full items-center rounded-md px-2 py-2 text-sm`}>Markdown (.md)</button>
                                    )}
                                  </Menu.Item>
                                  <Menu.Item>
                                    {({ active }) => (
                                      <button onClick={handleExportPdf} disabled={isExportingPdf} className={`${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'} group flex w-full items-center rounded-md px-2 py-2 text-sm disabled:opacity-50`}>PDF (.pdf)</button>
                                    )}
                                  </Menu.Item>
                                </div>
                              </Menu.Items>
                            </Transition>
                          </Menu>
                          {/* Share Button */}
                          <button
                            onClick={handleShare}
                            className="p-1 rounded-md text-gray-600 hover:bg-gray-100 relative"
                            title="Share Recipe"
                          >
                            <ShareIcon className="h-5 w-5" />
                            {copied && (
                              <span className="absolute -top-7 left-1/2 -translate-x-1/2 text-xs bg-gray-700 text-white px-1 py-0.5 rounded">
                                Copied!
                              </span>
                            )}
                          </button>
                          {/* Flag Button */}
                          <button
                            onClick={() => setShowFlagModal(true)}
                            className="p-1 rounded-md text-gray-600 hover:bg-gray-100"
                            title="Flag Issue"
                          >
                            <FlagIcon className="h-5 w-5" />
                            <span className="sr-only">Flag Issue</span>
                          </button>
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