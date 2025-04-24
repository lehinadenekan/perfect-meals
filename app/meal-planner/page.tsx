'use client' // Likely needs client-side interactivity

import React, { useState, useEffect, useCallback } from 'react';
import { calculateDailyMacros, DailyMacroTotals } from '@/lib/plannerUtils'; // Adjust path if needed
import { generateShoppingList, ShoppingListItem } from '@/lib/shoppingListUtils'; // Import shopping list utils
import { addDays, format, startOfWeek, endOfWeek, subDays, eachDayOfInterval } from 'date-fns'; // Removed unused isEqual
import { MealType, UserPreference, Recipe, CustomFoodEntry, NutritionFacts, Ingredient, Instruction } from '@prisma/client'; // Import MealType enum and UserPreference type, and other needed types
import MealDetailsModal from '@/components/MealDetailsModal'; // Import the new modal
import ShoppingListDisplay from '@/components/ShoppingListDisplay'; // Import the shopping list display component
import SelectMealsForShoppingListModal from '@/components/SelectMealsForShoppingListModal'; // Import the new selection modal
import { Textarea } from "@/components/ui/textarea"; // Import Textarea
import { Button } from "@/components/ui/button"; // Import Button (if not already used implicitly)
import { toast } from 'sonner'; // Assuming Sonner for toasts
import { Input } from "@/components/ui/input"; // Import Input for time field
import { Label } from "@/components/ui/label"; // Import Label for time field
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ScrollArea } from "@/components/ui/scroll-area"; // Import ScrollArea

// Define the expected shape of data from the API GET /api/planner
// Reusing/Adapting the structure from plannerUtils or defining anew
// Note: Ensure this matches the ACTUAL API response structure
type PlannerMealData = {
  id: string;
  plannerDayId: string;
  mealType: MealType; // Use MealType enum
  mealTime: string | null; // Added mealTime
  servings: number | null;
  recipeId: string | null;
  customFoodEntryId: string | null;
  isCompleted: boolean;
  recipe: (Omit<Recipe, 'dietaryNotes' | 'dietaryFeedback' | 'albums' | 'reviews' | 'recipeHistory' | 'categories' | 'cuisines' | 'savedBy' | 'plannedMeals' | 'search_vector'> & {
    nutritionFacts: NutritionFacts | null;
    ingredients: Ingredient[];
    instructions: Instruction[]; // Ensure instructions are included
  }) | null;
  customFoodEntry: CustomFoodEntry | null;
};

// Define PlannerApiResponseDay type (move to shared types?)
type PlannerApiResponseDay = {
  id: string;
  date: string; // ISO Date string YYYY-MM-DDTHH:mm:ss.sssZ
  userId: string; // Add the missing userId property
  notes: string | null;
  meals: PlannerMealData[];
};

// Type for search results
type SearchResultItem = {
  id: string;
  name: string;
  type: 'recipe' | 'custom'; // To distinguish between result types
  imageUrl?: string | null; // Optional image for recipes
};

// Helper component for progress bar
const ProgressBar = ({ current, goal }: { current: number; goal: number | null | undefined }) => {
  if (!goal || goal <= 0 || current < 0) return null; // Don't render if no goal or invalid values
  const percentage = Math.min(Math.max((current / goal) * 100, 0), 100); // Cap percentage between 0-100
  const isOver = current > goal;

  return (
    <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden mt-0.5">
      <div 
        className={`h-1 rounded-full ${isOver ? 'bg-red-500' : 'bg-blue-500'}`}
        style={{ width: `${isOver ? 100 : percentage}%` }} // Fill bar if over, else show percentage
      ></div>
    </div>
  );
};

const MealPlannerPage = () => {
  const [currentWeekStart, setCurrentWeekStart] = useState(startOfWeek(new Date(), { weekStartsOn: 1 })); // weekStartsOn: 1 for Monday
  const [_plannerData, setPlannerData] = useState<PlannerApiResponseDay[]>([]);
  const [dailyMacros, setDailyMacros] = useState<DailyMacroTotals[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDateForMeal, setSelectedDateForMeal] = useState<Date | null>(null);

  // State for Add Meal Modal Search
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResultItem[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<SearchResultItem | null>(null);

  // State for Add Meal Modal Form
  const [selectedMealType, setSelectedMealType] = useState<MealType | ''>('');
  const [selectedServings, setSelectedServings] = useState<number>(1);
  const [selectedMealTime, setSelectedMealTime] = useState<string>(''); // Added state for Add Meal time

  // State for Add Meal Modal submission
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // State for Shopping List Modal (Now using two modals)
  const [isSelectMealsModalOpen, setIsSelectMealsModalOpen] = useState(false); // State for the new selection modal
  const [isShoppingListModalOpen, setIsShoppingListModalOpen] = useState(false);
  const [shoppingListItems, setShoppingListItems] = useState<ShoppingListItem[]>([]);
  const [isGeneratingList, setIsGeneratingList] = useState(false);

  // State for User Preferences (Macro Goals)
  const [userPreferences, setUserPreferences] = useState<UserPreference | null>(null);
  const [prefsLoading, setPrefsLoading] = useState(true);
  const [prefsError, setPrefsError] = useState<string | null>(null);

  // State for Meal Details Modal 
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedMealForDetails, setSelectedMealForDetails] = useState<PlannerMealData | null>(null);

  // State for Daily Notes (NEW)
  const [dailyNotes, setDailyNotes] = useState<Record<string, string>>({}); // Key: YYYY-MM-DD string, Value: note content
  const [savingNoteForDate, setSavingNoteForDate] = useState<string | null>(null); // Track which date's note is saving

  // --- NEW State for Quick Add ---
  const [quickItemName, setQuickItemName] = useState<string>('');

  // --- Data Fetching useEffects (Modified fetchPlannerData to init notes) ---
  const fetchPlannerData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    const startDate = format(currentWeekStart, 'yyyy-MM-dd');
    const endDate = format(endOfWeek(currentWeekStart, { weekStartsOn: 1 }), 'yyyy-MM-dd');

    try {
      const response = await fetch(`/api/planner?startDate=${startDate}&endDate=${endDate}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch planner data: ${response.statusText}`);
      }
      const data: PlannerApiResponseDay[] = await response.json();

      // Initialize dailyNotes state from fetched data
      const initialNotes: Record<string, string> = {};
      const dataWithDates = data.map(day => {
        const dayStr = day.date.substring(0, 10); // Get YYYY-MM-DD from ISO string
        initialNotes[dayStr] = day.notes || ''; // Initialize with fetched note or empty string
        return {
            ...day,
            date: new Date(day.date), // Convert ISO string back to Date object for macro calc
        }
      });
      setDailyNotes(initialNotes); // Set initial notes state

      setPlannerData(data); // Store original data if needed elsewhere
      const calculatedMacros = calculateDailyMacros(dataWithDates);
      setDailyMacros(calculatedMacros);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      setPlannerData([]);
      setDailyMacros([]);
      setDailyNotes({}); // Reset notes on error
    } finally {
      setIsLoading(false);
    }
  }, [currentWeekStart]); 

  useEffect(() => {
    fetchPlannerData();
  }, [fetchPlannerData]); 

  // Fetch User Preferences
  useEffect(() => {
    const fetchUserPreferences = async () => {
      setPrefsLoading(true);
      setPrefsError(null);
      try {
        const response = await fetch('/api/user/preferences');
        if (!response.ok) {
          const errorBody = await response.json().catch(() => ({})); // Catch potential JSON parse errors
          if (response.status === 404 || (errorBody && !errorBody.preferences)) { // Handle 404 or empty preferences gracefully
            setUserPreferences(null);
            console.log('User preferences not set up yet or not found.');
          } else {
            throw new Error(`Failed to fetch preferences: ${response.statusText}`);
          }
        } else {
           const data = await response.json();
           if (data && data.preferences && typeof data.preferences === 'object') {
             setUserPreferences(data.preferences);
           } else {
             console.warn('Unexpected preferences data format:', data);
             setUserPreferences(null); 
           }
        }
      } catch (err) {
        setPrefsError(err instanceof Error ? err.message : 'An unknown error occurred fetching preferences');
        setUserPreferences(null);
      } finally {
        setPrefsLoading(false);
      }
    };
    fetchUserPreferences();
  }, []); // Fetch only once on component mount

  // --- Debounce Search --- (Simple timeout version)
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setSearchError(null);
      return; // Don't search if query is empty
    }

    setIsSearching(true);
    setSearchError(null);
    setSelectedItem(null); // Clear selection when query changes

    const handler = setTimeout(() => {
      performSearch(searchQuery);
    }, 500); // Debounce for 500ms

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  const performSearch = async (query: string) => {
    setIsSearching(true);
    setSearchError(null);
    console.log(`Searching for: ${query}`);
    try {
      // Call the actual API endpoint
      const response = await fetch(`/api/search/planner-items?query=${encodeURIComponent(query)}`);
      if (!response.ok) {
         const errorData = await response.json().catch(() => ({ error: 'Search request failed' }));
         throw new Error(errorData.error || `Search failed with status: ${response.status}`);
      }
      const data: SearchResultItem[] = await response.json();
      setSearchResults(data);

      // --- Remove Mock Results --- 
      // await new Promise(resolve => setTimeout(resolve, 300)); // Simulate network delay
      // const mockResults: SearchResultItem[] = [
      //   { id: 'recipe-1', name: `Recipe: ${query} Salad`, type: 'recipe', imageUrl: 'https://via.placeholder.com/40' },
      //   { id: 'custom-1', name: `Custom: ${query} Bar`, type: 'custom' },
      //   { id: 'recipe-2', name: `Recipe: Baked ${query}`, type: 'recipe' },
      // ].filter(item => item.name.toLowerCase().includes(query.toLowerCase()));
      // setSearchResults(mockResults);
      // --- End Mock Results ---

    } catch (error) {
      console.error('Search error:', error);
      setSearchError(error instanceof Error ? error.message : 'Search failed');
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handlePreviousWeek = () => {
    setCurrentWeekStart(subDays(currentWeekStart, 7));
  };

  const handleNextWeek = () => {
    setCurrentWeekStart(addDays(currentWeekStart, 7));
  };

  const currentWeekEnd = endOfWeek(currentWeekStart, { weekStartsOn: 1 });

  // Generate dates for the current week
  const daysInWeek = eachDayOfInterval({
    start: currentWeekStart,
    end: currentWeekEnd,
  });

  // Handler to open the Add Meal modal
  const handleAddMealClick = (day: Date) => {
    setSelectedDateForMeal(day);
    setIsModalOpen(true);
  };

  // Handler to close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedDateForMeal(null);
  };

  // Reset search and form state when modal closes
  const handleCloseModalAndReset = () => {
    handleCloseModal();
    setSearchQuery('');
    setSearchResults([]);
    setIsSearching(false);
    setSearchError(null);
    setSelectedItem(null);
    setSelectedMealType(''); // Reset form state
    setSelectedServings(1); // Reset form state
    setSelectedMealTime(''); // Reset time state
    setIsSubmitting(false); // Reset submission state
    setSubmitError(null);   // Reset submission error
    setQuickItemName(''); // Reset quick add input
  };

  // Select an item from search results and reset form
  const handleSelectItem = (item: SearchResultItem) => {
    setSelectedItem(item);
    setQuickItemName(''); // Clear quick add input when selecting search result
    setSelectedMealType(''); // Reset form when new item selected
    setSelectedServings(1); // Reset form when new item selected
    setSelectedMealTime(''); // Reset time when item changes
    // Optional: Clear search query/results after selection?
    // setSearchQuery(item.name);
    // setSearchResults([]);
  };

  // Clear selected item when quick add input is typed into
  const handleQuickItemNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuickItemName(e.target.value);
    if (e.target.value.trim() !== '') {
        setSelectedItem(null); // Clear search selection if typing quick add
        // Optional: Clear search query/results as well?
        // setSearchQuery('');
        // setSearchResults([]);
    }
  };

  // Actually adding the meal via API
  const handleConfirmAddMeal = async () => {
    if (!selectedItem || !selectedMealType || !selectedDateForMeal || isSubmitting || quickItemName.trim() !== '') {
      console.error('Missing data for adding meal, already submitting, or quick add item entered');
      if (quickItemName.trim() !== '') {
        setSubmitError('Please use the "Add Quick Item" button for the item you typed.');
      }
      return;
    }

    // Construct mealData conditionally to handle optional fields correctly
    const finalMealTime = selectedMealTime.trim() === '' ? null : selectedMealTime.trim(); // Send null if empty
    
    // Optional: Add time format validation here if needed before sending
    const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
    if (finalMealTime && !timeRegex.test(finalMealTime)) {
        toast.error('Invalid time format. Please use HH:mm.');
        return; 
    }

    const mealDataBase = {
      date: format(selectedDateForMeal, 'yyyy-MM-dd'),
      mealType: selectedMealType,
      servings: selectedServings,
      mealTime: finalMealTime, // Include mealTime
    };

    const mealData = selectedItem.type === 'recipe' 
      ? { ...mealDataBase, recipeId: selectedItem.id } 
      : { ...mealDataBase, customFoodEntryId: selectedItem.id };

    console.log('Submitting Meal Data:', mealData);
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch('/api/planner', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(mealData),
      });

      if (!response.ok) {
        let errorMsg = 'Failed to add meal';
        try {
           const errorData = await response.json();
           errorMsg = errorData.error || `Error ${response.status}: ${response.statusText}`;
        } catch (_parseError) {
           errorMsg = `Error ${response.status}: ${response.statusText}`;
        }
        throw new Error(errorMsg);
      }
      
      handleCloseModalAndReset();
      toast.success('Meal added!');
      fetchPlannerData(); // Re-call fetchPlannerData after adding meal

    } catch (error) {
      console.error('Failed to add meal:', error);
      const errorMsg = error instanceof Error ? error.message : 'Unknown error';
      setSubmitError(errorMsg); // Set error state to display in modal
      // Keep modal open to show error
      // alert(`Error adding meal: ${errorMsg}`); // Replaced alert with state
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- NEW Handler for Quick Add Item ---
  const handleConfirmQuickAddItem = async () => {
      if (!quickItemName.trim() || !selectedMealType || !selectedDateForMeal || isSubmitting || selectedItem) {
          console.error('Missing data for quick add, already submitting, or search item selected');
          if (selectedItem) {
              setSubmitError('Please clear the quick add field or use the regular "Add Meal" button.');
          }
          return;
      }

      setIsSubmitting(true);
      setSubmitError(null);
      const itemName = quickItemName.trim(); // Use trimmed name

      // Prepare data for the new API endpoint
      const quickAddData = {
          date: format(selectedDateForMeal, 'yyyy-MM-dd'), // Send date as string
          mealType: selectedMealType,
          itemName: itemName,
          // Add optional macros here if implemented
      };

      console.log('Submitting Quick Add Data:', quickAddData);

      try {
        // Call the new backend endpoint
        const response = await fetch('/api/planner/quick-add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(quickAddData),
        });

        if (!response.ok) {
            let errorMsg = 'Failed to quick add item';
            try {
                const errorBody = await response.json();
                errorMsg = errorBody.message || (errorBody.errors ? JSON.stringify(errorBody.errors) : errorMsg);
            } catch { /* Ignore JSON parsing errors */ }
            throw new Error(errorMsg);
        }

        // const newMeal = await response.json(); // Contains the created PlannerMeal + CustomFoodEntry
        // console.log('Quick Add Success Response:', newMeal);
        
        toast.success(`Quick item "${itemName}" added!`);
        handleCloseModalAndReset();
        fetchPlannerData(); // Refresh planner data

      } catch (error) {
          console.error("Failed to quick add item:", error);
          const errorMsg = error instanceof Error ? error.message : 'An unknown error occurred';
          setSubmitError(errorMsg);
          toast.error(`Failed to add quick item: ${errorMsg}`);
      } finally {
          setIsSubmitting(false);
      }
  };

  // --- Meal Edit/Delete Handlers ---

  // Keep handleDeleteMeal and handleToggleMealComplete as they are still needed
  const handleDeleteMeal = async (mealId: string) => {
    if (window.confirm('Are you sure you want to remove this meal?')) {
      console.log('Delete meal clicked:', mealId);
      try {
        // TODO: Add loading state for delete?
        const response = await fetch(`/api/planner/meal/${mealId}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          let errorMsg = 'Failed to delete meal';
          try {
             const errorData = await response.json();
             errorMsg = errorData.error || `Error ${response.status}: ${response.statusText}`;
          } catch (_parseError) {
             errorMsg = `Error ${response.status}: ${response.statusText}`;
          }
          throw new Error(errorMsg);
        }

        console.log('Meal deleted successfully, refetching data...');
        toast.success('Meal removed!');
        fetchPlannerData(); // Refetch

      } catch (error) {
        console.error('Failed to delete meal:', error);
        toast.error(`Error deleting meal: ${error instanceof Error ? error.message : 'Unknown error'}`);
      } finally {
        // TODO: Reset loading state?
      }
    }
  };

  // --- Shopping List Handlers --- (Updated)
  const handleGenerateShoppingList = () => {
    // Open the selection modal instead of generating directly
    setIsSelectMealsModalOpen(true); 
  };

  // New handler for when selection is confirmed in the modal
  const handleConfirmShoppingListSelection = (selectedMealIds: string[]) => {
    setIsSelectMealsModalOpen(false); // Close selection modal
    if (selectedMealIds.length === 0) {
      toast.info("No meals selected for the shopping list.");
      return;
    }

    setIsGeneratingList(true); // Show loading indicator on the main button/page

    try {
      // 1. Flatten the planner data to easily find selected meals
      const allMeals = _plannerData.flatMap(day => day.meals);
      
      // 2. Filter the full meal data objects based on the selected IDs
      const selectedMealsData = allMeals.filter(meal => selectedMealIds.includes(meal.id));

      if (selectedMealsData.length === 0) {
          // This case might happen if IDs are stale, though unlikely with current flow
          throw new Error("Could not find data for the selected meals.");
      }

      // 3. Generate the shopping list using the utility function
      const generatedList = generateShoppingList(selectedMealsData);
      setShoppingListItems(generatedList);

      // 4. Open the display modal
      setIsShoppingListModalOpen(true); 
      toast.success(`Shopping list generated from ${selectedMealIds.length} meals.`);

    } catch (error) {
      console.error("Error generating shopping list:", error);
      toast.error(`Failed to generate shopping list: ${error instanceof Error ? error.message : 'Unknown error'}`);
      setShoppingListItems([]); // Clear list on error
    } finally {
        setIsGeneratingList(false); // Hide loading indicator
    }
  };

  const handleCloseShoppingListModal = () => {
    setIsShoppingListModalOpen(false);
    // Optionally clear shoppingListItems here or keep it cached
  };

  // --- View Meal Details Handler (Placeholder) ---
  const handleViewMealDetails = (meal: PlannerMealData) => {
    console.log('Opening details for meal:', meal);
    setSelectedMealForDetails(meal); 
    setIsDetailsModalOpen(true);     
  };

  const handleCloseDetailsModal = () => {
      setIsDetailsModalOpen(false);
      setSelectedMealForDetails(null);
  };

  // --- Daily Note Handlers (NEW) ---
  const handleNoteChange = (dateString: string, value: string) => {
      setDailyNotes(prev => ({
          ...prev,
          [dateString]: value
      }));
  };

  const handleSaveNote = async (dateString: string) => {
    const noteContent = dailyNotes[dateString];
    setSavingNoteForDate(dateString); // Set loading state for this specific date
    try {
        const response = await fetch('/api/planner/day/notes', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ date: dateString, notes: noteContent }),
        });
        if (!response.ok) {
            let errorMsg = 'Failed to save note';
            try { const errorData = await response.json(); errorMsg = errorData.error || `Error: ${response.statusText}`; } catch { errorMsg = `Error: ${response.statusText}`; }
            throw new Error(errorMsg);
        }
        toast.success(`Note for ${format(new Date(dateString + 'T00:00:00'), 'MMM d')} saved!`); // Add T00:00:00 to parse correctly
        // Update the main planner data state to reflect the saved note immediately
        setPlannerData(prevData => 
            prevData.map(day => 
                day.date.startsWith(dateString) ? { ...day, notes: noteContent } : day
            )
        );
    } catch (error) {
        console.error('Failed to save note:', error);
        toast.error(`Error saving note: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
        setSavingNoteForDate(null); // Clear loading state
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Meal Planner</h1>

      {/* Week Navigation & Shopping List Button */}
      <div className="flex justify-between items-center mb-6">
        {/* Previous Week Button */}
        <button
          onClick={handlePreviousWeek}
          className="bg-gray-900 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
          disabled={isLoading || isGeneratingList}
        >
          &lt; Previous Week
        </button>
        
        <div className="flex flex-col items-center"> {/* Center title and button */}
          <h2 className="text-xl font-semibold">
            {format(currentWeekStart, 'MMM d')} - {format(currentWeekEnd, 'MMM d, yyyy')}
          </h2>
          {/* Shopping List Button */}
          <button
            onClick={handleGenerateShoppingList}
            className="mt-2 bg-gray-900 hover:bg-gray-700 text-white font-bold py-1 px-3 text-sm rounded disabled:opacity-50 flex items-center justify-center space-x-1.5"
            disabled={isLoading || _plannerData.length === 0 || isGeneratingList}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
            <span>{isGeneratingList ? 'Generating...' : 'Generate Shopping List'}</span>
          </button>
        </div>

        {/* Next Week Button */}
        <button
          onClick={handleNextWeek}
          className="bg-gray-900 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
          disabled={isLoading || isGeneratingList}
        >
          Next Week &gt;
        </button>
      </div>

      {/* Status Indicators */}
      {isLoading && <p className="text-center text-gray-500">Loading planner...</p>}
      {error && <p className="text-center text-red-500">Planner Error: {error}</p>}
      {prefsLoading && <p className="text-center text-gray-500">Loading preferences...</p>}
      {prefsError && <p className="text-center text-orange-500">Preferences Error: {prefsError}</p>}

      {/* Daily Grid */}
      {!isLoading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 mt-6">
          {daysInWeek.map((day) => {
            // Find macro data for this day (already done)
            const macros = dailyMacros.find(m =>
              m.date.getFullYear() === day.getFullYear() &&
              m.date.getMonth() === day.getMonth() &&
              m.date.getDate() === day.getDate()
            );

            // Find the planner day data from the original fetched data
            // Need to compare date strings carefully
            const dayString = format(day, 'yyyy-MM-dd'); // Format the loop date
            const plannerDay = _plannerData.find(pd => pd.date.startsWith(dayString));

            // Get goals (default to null if preferences not loaded/set)
            const goals = {
              calories: userPreferences?.dailyCalorieGoal,
              protein: userPreferences?.dailyProteinGoal,
              carbs: userPreferences?.dailyCarbGoal,
              fat: userPreferences?.dailyFatGoal,
            };

            const currentNote = dailyNotes[dayString] ?? '';
            const isSavingThisNote = savingNoteForDate === dayString;

            return (
              <div key={day.toISOString()} className="bg-white p-4 rounded-lg shadow border border-gray-200 flex flex-col">
                <h3 className="font-semibold text-center text-sm mb-2">{format(day, 'E, MMM d')}</h3>
                {/* Macro Totals vs Goals */}
                <div className="text-xs space-y-1 mb-3">
                  <div>
                    <p><strong>Cal:</strong> {macros?.totalCalories ?? 0}{goals.calories ? ` / ${goals.calories}` : ''}</p>
                    <ProgressBar current={macros?.totalCalories ?? 0} goal={goals.calories} />
                  </div>
                  <div>
                    <p><strong>P:</strong> {macros?.totalProtein ?? 0}g{goals.protein ? ` / ${goals.protein}g` : ''}</p>
                    <ProgressBar current={macros?.totalProtein ?? 0} goal={goals.protein} />
                  </div>
                  <div>
                    <p><strong>C:</strong> {macros?.totalCarbs ?? 0}g{goals.carbs ? ` / ${goals.carbs}g` : ''}</p>
                    <ProgressBar current={macros?.totalCarbs ?? 0} goal={goals.carbs} />
                  </div>
                  <div>
                    <p><strong>F:</strong> {macros?.totalFat ?? 0}g{goals.fat ? ` / ${goals.fat}g` : ''}</p>
                    <ProgressBar current={macros?.totalFat ?? 0} goal={goals.fat} />
                  </div>
                </div>
                
                <hr className="my-2" />

                {/* Meal List */}
                <div className="text-xs flex-grow space-y-1.5 overflow-y-auto mb-2" style={{ maxHeight: '150px' }}>
                  {plannerDay && plannerDay.meals.length > 0 ? (
                    plannerDay.meals.map((meal) => (
                      <div key={meal.id} className={`bg-white p-1.5 rounded border border-gray-200 ${meal.isCompleted ? 'opacity-70' : ''}`}>
                        {/* Always show DISPLAY VIEW now */}
                        <>
                          {/* --- Top Row: Checkbox, Image, Name (Clickable) --- */}
                          <div className="flex items-center justify-between">
                            <div 
                              className="flex items-center flex-grow overflow-hidden mr-2 cursor-pointer group"
                              onClick={() => handleViewMealDetails(meal)} // Still opens details modal
                            >
                              {/* Remove the input checkbox and its event handlers */}
                              {/* <input type="checkbox" checked={meal.isCompleted} onChange={(e) => { e.stopPropagation(); handleToggleMealComplete(meal.id, meal.isCompleted); }} onClick={(e) => e.stopPropagation()} className="mr-1.5 h-3.5 w-3.5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 shrink-0" title={meal.isCompleted ? 'Mark as not completed' : 'Mark as completed'}/> */}
                              
                              {/* Adjust spacing if needed after removing checkbox */}
                              {meal.recipe?.imageUrl ? <img src={meal.recipe.imageUrl} alt={meal.recipe.title ?? 'Recipe'} className="w-6 h-6 rounded object-cover mr-1.5 flex-shrink-0" /> : <div className="w-6 h-6 rounded bg-gray-200 mr-1.5 flex-shrink-0"></div>}
                              
                              {/* Remove line-through styling based on isCompleted */}
                              <p className={`font-medium truncate text-sm group-hover:text-blue-600 text-gray-800`} title={meal.recipe?.title ?? meal.customFoodEntry?.name}>{meal.recipe?.title ?? meal.customFoodEntry?.name ?? 'Unnamed Item'}</p>
                            </div>
                          </div>
                          {/* --- Bottom Row: Type, Delete Button ONLY --- */}
                          <div className="flex items-center justify-between mt-0.5 pl-[2.25rem]"> 
                            <div className="flex items-center space-x-1">
                              {meal.mealTime && (
                                <span className="text-[10px] font-medium text-gray-500 bg-gray-100 px-1 rounded">{meal.mealTime}</span>
                              )}
                              <p className="text-[10px] font-medium capitalize text-gray-500">
                                {meal.mealType.toLowerCase()}
                              </p>
                            </div>
                            <div className="flex items-center space-x-1">
                              <button 
                                onClick={(e) => { e.stopPropagation(); handleDeleteMeal(meal.id); }} 
                                title="Delete Meal"
                                className="p-0.5 text-red-600 hover:text-red-800 text-xs"
                              >
                                {/* Trash Icon SVG */}
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                              </button>
                            </div>
                          </div>
                        </>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-400 text-center italic mt-4">No meals planned</p>
                  )}
                </div>
                {/* Add Meal Button */}
                <button 
                  onClick={() => handleAddMealClick(day)} 
                  className="mt-auto pt-1 text-xs bg-green-100 hover:bg-green-200 text-green-700 font-semibold rounded w-full"
                >
                  Add +
                </button>
                
                {/* Daily Notes Section (NEW UI) */}
                <div className="mt-3 pt-3 border-t border-gray-200">
                    <label htmlFor={`notes-${dayString}`} className="block text-xs font-medium text-gray-600 mb-1">Notes</label>
                    <Textarea
                        id={`notes-${dayString}`}
                        value={currentNote} // Use state variable
                        onChange={(e) => handleNoteChange(dayString, e.target.value)} // Use handler
                        placeholder="Add notes for the day..."
                        rows={3}
                        className="w-full text-xs p-1 border rounded-md focus:ring-indigo-500 focus:border-indigo-500" // Added focus styles
                        disabled={isSavingThisNote} // Disable while saving
                    />
                    <Button
                        onClick={() => handleSaveNote(dayString)} // Use handler
                        size="sm" // Use Shadcn size prop
                        variant="outline" // Use Shadcn variant prop
                        className="mt-1 w-full text-xs py-0.5 h-auto" // Adjust padding/height
                        disabled={isSavingThisNote || currentNote === (plannerDay?.notes ?? '')} // Disable if saving or note is unchanged from fetched value
                    >
                        {isSavingThisNote ? 'Saving...' : 'Save Note'} 
                    </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add Meal Modal */}
      {isModalOpen && selectedDateForMeal && (
        <AlertDialog open={isModalOpen} onOpenChange={!isSubmitting ? handleCloseModalAndReset : undefined}>
          <AlertDialogContent className="sm:max-w-[550px] max-h-[90vh] flex flex-col">
            <AlertDialogHeader>
              <AlertDialogTitle>
                Add Meal for {format(selectedDateForMeal, 'MMM d, yyyy')}
              </AlertDialogTitle>
              <AlertDialogDescription>
                Search for a recipe/food or add a quick item.
              </AlertDialogDescription>
            </AlertDialogHeader>

            {/* Combined Content Area */}
            <div className="flex-grow overflow-hidden flex flex-col space-y-4 pr-2">

              {/* Search Input */}
              <div className="relative">
                <Input
                  placeholder="Search recipes or custom foods..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pr-8"
                  disabled={isSubmitting}
                />
                {isSearching && <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-500">Searching...</span>}
              </div>

              {/* Search Results or Quick Add Input */}
              <div className="flex-grow overflow-y-auto border rounded-md p-2 min-h-[100px]">
                  {searchError && <p className="text-red-500 text-sm text-center">{searchError}</p>}
                  {!isSearching && searchResults.length === 0 && searchQuery.trim() !== '' && (
                     <p className="text-gray-500 text-sm text-center">No results found.</p>
                  )}
                  {searchResults.length > 0 && (
                    <ScrollArea className="h-full">
                        <ul className="space-y-2">
                        {searchResults.map((item) => (
                            <li
                            key={item.id}
                            onClick={() => !isSubmitting && handleSelectItem(item)}
                            className={`p-2 rounded cursor-pointer flex items-center space-x-2 ${
                                selectedItem?.id === item.id ? 'bg-blue-100' : 'hover:bg-gray-100'
                            } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                            {item.imageUrl && <img src={item.imageUrl} alt={item.name} className="w-8 h-8 rounded object-cover flex-shrink-0" />}
                            {!item.imageUrl && <div className="w-8 h-8 rounded bg-gray-200 flex-shrink-0"></div>}
                            <span className="text-sm font-medium">{item.name} ({item.type})</span>
                            </li>
                        ))}
                        </ul>
                    </ScrollArea>
                  )}
                  {/* Show hint if search is empty */}
                  {!isSearching && searchResults.length === 0 && searchQuery.trim() === '' && (
                     <p className="text-gray-400 text-xs text-center pt-4">Type above to search your recipes and custom foods.</p>
                  )}
              </div>

              {/* Divider */}
              <div className="relative flex items-center py-2">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="flex-shrink mx-4 text-gray-500 text-xs">OR</span>
                <div className="flex-grow border-t border-gray-300"></div>
              </div>

              {/* Quick Add Input */}
              <div>
                 <Label htmlFor="quick-item-name" className="text-sm font-medium">Add Quick Item</Label>
                 <Input
                   id="quick-item-name"
                   placeholder="e.g., Apple, 2 Eggs, Leftovers..."
                   value={quickItemName}
                   onChange={handleQuickItemNameChange}
                   className="mt-1"
                   disabled={isSubmitting}
                 />
              </div>

              {/* Meal Type, Servings, Time (Conditionally Rendered based on selection OR quick add) */}
              {(selectedItem || quickItemName.trim() !== '') && (
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="meal-type" className="text-sm font-medium">Meal Type *</Label>
                    <select
                      id="meal-type"
                      value={selectedMealType}
                      onChange={(e) => setSelectedMealType(e.target.value as MealType)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm h-9 text-sm" // Adjusted height and text size
                      required
                      disabled={isSubmitting}
                    >
                      <option value="" disabled>Select...</option>
                      {Object.values(MealType).map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="servings" className="text-sm font-medium">Servings *</Label>
                    <Input
                      id="servings"
                      type="number"
                      min="0.1"
                      step="0.1"
                      value={selectedServings}
                      onChange={(e) => setSelectedServings(parseFloat(e.target.value) || 1)}
                      className="mt-1"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                   <div>
                      <Label htmlFor="meal-time" className="text-sm font-medium">Time (Optional)</Label>
                      <Input
                          id="meal-time"
                          type="time"
                          value={selectedMealTime}
                          onChange={(e) => setSelectedMealTime(e.target.value)}
                          className="mt-1"
                          disabled={isSubmitting}
                      />
                   </div>
                </div>
              )}
             </div> {/* End Combined Content Area */}


            {submitError && (
                <p className="text-sm text-red-600 mt-2 text-center">{submitError}</p>
            )}

            <AlertDialogFooter className="mt-4 pt-4 border-t">
              <AlertDialogCancel onClick={handleCloseModalAndReset} disabled={isSubmitting}>Cancel</AlertDialogCancel>
              {/* Show Quick Add button only if quick item name is entered */}
              {quickItemName.trim() !== '' && (
                <Button
                    onClick={handleConfirmQuickAddItem}
                    disabled={isSubmitting || !selectedMealType || quickItemName.trim() === ''}
                    className="bg-green-600 hover:bg-green-700"
                >
                    {isSubmitting ? 'Adding...' : 'Add Quick Item'}
                </Button>
              )}
              {/* Show Regular Add Meal button only if an item is selected AND quick add is empty */}
              {selectedItem && quickItemName.trim() === '' && (
                 <AlertDialogAction
                    onClick={handleConfirmAddMeal}
                    disabled={isSubmitting || !selectedMealType || !selectedItem || quickItemName.trim() !== ''}
                    className="bg-blue-600 hover:bg-blue-700" // Different color for clarity
                 >
                    {isSubmitting ? 'Adding...' : 'Add Meal'}
                </AlertDialogAction>
              )}
              {/* Show disabled placeholder if nothing is ready */}
              {!selectedItem && quickItemName.trim() === '' && (
                   <Button disabled className="bg-gray-400">Add Meal</Button>
              )}

            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}

      {/* Shopping List Modal (Placeholder Structure) */}
      {isShoppingListModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Shopping List</h2>
              <button 
                onClick={handleCloseShoppingListModal} 
                className="text-gray-500 hover:text-gray-800 text-2xl"
              >
                &times; {/* Close button */}
              </button>
            </div>
            <div className="overflow-y-auto flex-grow">
              {/* Use the ShoppingListDisplay component instead of the raw ul */}
              <ShoppingListDisplay items={shoppingListItems} />
              {/* {shoppingListItems.length > 0 ? (
                <ul className="list-disc pl-5 space-y-1">
                  {shoppingListItems.map((item, index) => (
                    <li key={`${item.name}-${item.unit}-${index}`} className="text-sm">
                      {item.amount} {item.unit} {item.name}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 italic text-center">Shopping list is empty or not generated yet.</p>
              )} */}
            </div>
            <div className="mt-4 pt-4 border-t flex justify-end">
               {/* TODO: Add Print/Copy buttons? */}
               <button 
                onClick={handleCloseShoppingListModal} 
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Meal Details Modal (Pass onMealUpdate prop) */}
      <MealDetailsModal 
        isOpen={isDetailsModalOpen}
        onClose={handleCloseDetailsModal} 
        mealData={selectedMealForDetails}
        onMealUpdate={fetchPlannerData} // Pass fetchPlannerData as the callback
      />

      {/* New Select Meals Modal */} 
      <SelectMealsForShoppingListModal
        isOpen={isSelectMealsModalOpen}
        onClose={() => setIsSelectMealsModalOpen(false)}
        plannerData={_plannerData} // Pass the full planner data for the week
        onConfirm={handleConfirmShoppingListSelection} // Pass the new confirmation handler
      />

    </div>
  );
};

export default MealPlannerPage; 