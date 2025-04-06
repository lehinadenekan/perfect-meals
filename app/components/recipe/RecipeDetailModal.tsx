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
    const contentElement = modalContentRef.current;
    if (!contentElement) {
      console.error("Modal content area not found for PDF export.");
      alert("Could not export PDF: Content area missing.");
      return;
    }

    setIsExportingPdf(true);

    // Temporarily add print styles to capture a cleaner view
    const parentDialog = contentElement.closest('dialog'); // Find the parent dialog
    if (parentDialog) {
      parentDialog.classList.add('printing-active', 'print-hide-image', 'print-hide-notes'); // Add classes to hide optional elements for capture
    }


    try {
      // Slight delay to allow styles to apply
      await new Promise(resolve => setTimeout(resolve, 100));

      const canvas = await html2canvas(contentElement, {
        scale: 2, // Increase scale for better resolution
        useCORS: true, // If images are external
        logging: false, // Disable console logging from html2canvas
        onclone: (documentClone) => {
          // Ensure the background is white for the capture
          documentClone.body.style.background = 'white';
          const contentClone = documentClone.getElementById('recipe-modal-content');
          if (contentClone) {
            contentClone.style.background = 'white';
          }
        }
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'p', // portrait
        unit: 'pt', // points, matches css pixels closely
        format: 'a4' // or 'letter'
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);

      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      // const imgY = 30; // Add some top margin
      const imgY = 0; // Start from top

      // Calculate the total height needed in the PDF
      const totalPDFHeight = imgHeight * ratio;
      let currentY = 0;
      let page = 1;

      // Add image page by page
      while (currentY < totalPDFHeight) {
        if (page > 1) {
          pdf.addPage();
        }
        // Calculate the portion of the image to draw on the current page
        const sourceY = (currentY / ratio);
        const sourceHeight = Math.min((pdfHeight / ratio), (imgHeight - sourceY)); // Height of the slice from the source canvas
        const drawHeight = sourceHeight * ratio; // Height to draw this slice in the PDF

        // Correct call signature for adding image slice
        pdf.addImage(
          imgData,       // The base64 image data
          'PNG',         // Format
          imgX,          // X position in PDF
          imgY,          // Y position in PDF (starts at 0 for each page)
          imgWidth * ratio, // Width to draw in PDF
          drawHeight,     // Height to draw in PDF
          undefined,      // Alias (optional)
          'FAST',         // Compression (optional)
          0               // Rotation (optional)
        );
        // The above call adds the whole image scaled. We need to clip or use different params.
        // Let's try a different approach: drawing the slice directly.
        // jsPDF documentation is a bit tricky here. The typical addImage doesn't support source coordinates well.
        // A common workaround is to create temporary canvases for each slice.
        // Simpler alternative: Add the whole image but use clipping (less efficient for many pages)

        // --- Revised addImage call for slicing (using internal methods - might be less stable) ---
        // pdf.addImage(
        //   imgData,       // Base64 string
        //   'PNG',         // Format
        //   imgX,          // PDF X coord
        //   imgY,          // PDF Y coord (0 on new page)
        //   imgWidth * ratio, // PDF width
        //   drawHeight,     // PDF height for this slice
        //   undefined,      // Alias
        //   'FAST',         // Compression
        //   undefined,      // Rotation
        //   sourceY,        // Source Y coord (this is often not supported directly)
        //   sourceHeight    // Source Height (often not supported directly)
        // );

        // --- Safest Approach: Add the full image and let it paginate (less precise control) ---
        // pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);

        // --- Let's try the documented 'addImage(imageData, format, x, y, width, height, alias, compression, rotation)' version
        // It *should* clip automatically if width/height exceed page boundaries, but let's manage pages manually.

        // Revised logic: Draw the correct slice of the full canvas onto the current PDF page
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = imgWidth;
        tempCanvas.height = sourceHeight;
        const tempCtx = tempCanvas.getContext('2d');
        if (tempCtx) {
          // Draw the relevant slice from the original canvas onto the temporary canvas
          const sourceCanvas = await html2canvas(contentElement, { scale: 2, useCORS: true, logging: false }); // Recapture might be needed if state changed
          tempCtx.drawImage(sourceCanvas, 0, sourceY, imgWidth, sourceHeight, 0, 0, imgWidth, sourceHeight);
          const sliceDataUrl = tempCanvas.toDataURL('image/png');
          // Add the slice image to the PDF
          pdf.addImage(sliceDataUrl, 'PNG', imgX, imgY, imgWidth * ratio, drawHeight, undefined, 'FAST');
        } else {
          console.error("Could not create temporary canvas context for PDF slicing.");
          // Fallback: Add the whole image (may overflow)
          if (page === 1) pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
        }

        currentY += drawHeight;
        page++;
      }

      pdf.save(`${recipe.title}.pdf`);

    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Failed to generate PDF. See console for details.");
    } finally {
      setIsExportingPdf(false);
      // Remove temporary print styles
      if (parentDialog) {
        parentDialog.classList.remove('printing-active', 'print-hide-image', 'print-hide-notes');
      }
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

                  {/* Recipe Image */}
                  <div className="relative w-full aspect-video">
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

                  {/* Recipe Content */}
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
                          {/* Serving adjustment controls */}
                          <button
                            onClick={() => setServingMultiplier(prev => Math.max(1 / recipe.servings, prev - 1 / recipe.servings))}
                            disabled={recipe.servings * servingMultiplier <= 1}
                            className="p-1 rounded-full hover:bg-gray-100 disabled:opacity-50 recipe-modal-print-hide"
                            aria-label="Decrease servings"
                          >
                            <span className="text-xs">-</span>
                          </button>
                          <UserIcon className="h-5 w-5 mx-1" aria-hidden="true" />
                          <span>{Math.round(recipe.servings * servingMultiplier)} servings</span>
                          <button
                            onClick={() => setServingMultiplier(prev => prev + 1 / recipe.servings)}
                            className="p-1 rounded-full hover:bg-gray-100 recipe-modal-print-hide"
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
                          <span className="sr-only">Share Recipe</span>
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
                          <span className="sr-only">Share Recipe</span>
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
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
} 