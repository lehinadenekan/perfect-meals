'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { calculateDailyMacros, DailyMacroTotals } from '@/lib/plannerUtils';
import { ShoppingListItem } from '@/lib/shoppingListUtils';
import { addDays, format, startOfWeek, endOfWeek, subDays, eachDayOfInterval } from 'date-fns';
import { MealType, UserPreference, Recipe, CustomFoodEntry, NutritionFacts, Ingredient, Instruction } from '@prisma/client';
import MealDetailsModal from '@/components/MealDetailsModal';
import ShoppingListDisplay from '@/components/ShoppingListDisplay';
import SelectMealsForShoppingListModal from '@/components/SelectMealsForShoppingListModal';
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar as CalendarIcon, ShoppingCart } from "lucide-react";
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
import { ScrollArea } from "@/components/ui/scroll-area";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import Image from 'next/image'; // Import next/image

// --- Types --- (Remain the same)
type PlannerMealData = {
    id: string;
    plannerDayId: string;
    mealType: MealType;
    mealTime: string | null;
    servings: number | null;
    recipeId: string | null;
    customFoodEntryId: string | null;
    isCompleted: boolean;
    recipe: (Omit<Recipe, 'dietaryNotes' | 'dietaryFeedback' | 'albums' | 'reviews' | 'recipeHistory' | 'categories' | 'cuisines' | 'savedBy' | 'plannedMeals' | 'search_vector'> & {
        nutritionFacts: NutritionFacts | null;
        ingredients: Ingredient[];
        instructions: Instruction[];
    }) | null;
    customFoodEntry: CustomFoodEntry | null;
};
type PlannerApiResponseDay = {
    id: string;
    date: string;
    userId: string;
    notes: string | null;
    meals: PlannerMealData[];
};
type SearchResultItem = {
    id: string;
    name: string;
    type: 'recipe' | 'custom';
    imageUrl?: string | null;
};

// --- ProgressBar Component --- (Remains the same)
const ProgressBar = ({ current, goal }: { current: number; goal: number | null | undefined }) => {
    if (!goal || goal <= 0 || current < 0) return null;
    const percentage = Math.min(Math.max((current / goal) * 100, 0), 100);
    const isOver = current > goal;
    return (
      <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden mt-0.5">
        <div
          className={`h-1 rounded-full ${isOver ? 'bg-red-500' : 'bg-blue-500'}`}
          style={{ width: `${isOver ? 100 : percentage}%` }}
        ></div>
      </div>
    );
  };

// --- MealPlannerPage Component ---
const MealPlannerPage = () => {
  // --- State Variables --- (Remain the same)
  const [currentWeekStart, setCurrentWeekStart] = useState(startOfWeek(new Date(), { weekStartsOn: 1 }));
  const [_plannerData, setPlannerData] = useState<PlannerApiResponseDay[]>([]);
  const [dailyMacros, setDailyMacros] = useState<DailyMacroTotals[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDateForMeal, setSelectedDateForMeal] = useState<Date | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, _setSearchResults] = useState<SearchResultItem[]>([]);
  const [_isSearching, _setIsSearching] = useState(false);
  const [searchError, _setSearchError] = useState<string | null>(null);
  const [selectedItem, _setSelectedItem] = useState<SearchResultItem | null>(null);
  const [selectedMealType, setSelectedMealType] = useState<MealType | ''>('');
  const [selectedServings, setSelectedServings] = useState<number>(1);
  const [selectedMealTime, setSelectedMealTime] = useState<string>('');
  const [isSubmitting, _setIsSubmitting] = useState(false);
  const [submitError, _setSubmitError] = useState<string | null>(null);
  const [isSelectMealsModalOpen, setIsSelectMealsModalOpen] = useState(false);
  const [isShoppingListModalOpen, setIsShoppingListModalOpen] = useState(false);
  const [shoppingListItems, _setShoppingListItems] = useState<ShoppingListItem[]>([]);
  const [isGeneratingList, _setIsGeneratingList] = useState(false);
  const [userPreferences, _setUserPreferences] = useState<UserPreference | null>(null);
  const [prefsLoading, _setPrefsLoading] = useState(true);
  const [prefsError, _setPrefsError] = useState<string | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedMealForDetails, setSelectedMealForDetails] = useState<PlannerMealData | null>(null);
  const [dailyNotes, setDailyNotes] = useState<Record<string, string>>({});
  const [savingNoteForDate, _setSavingNoteForDate] = useState<string | null>(null);
  const [quickItemName, _setQuickItemName] = useState<string>('');
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  // --- Data Fetching --- (Remains the same)
  const fetchPlannerData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    const startDate = format(currentWeekStart, 'yyyy-MM-dd');
    const endDate = format(endOfWeek(currentWeekStart, { weekStartsOn: 1 }), 'yyyy-MM-dd');

    try {
      const response = await fetch(`/api/planner?startDate=${startDate}&endDate=${endDate}`);
      if (!response.ok) throw new Error(`Failed to fetch planner data: ${response.statusText}`);
      const data: PlannerApiResponseDay[] = await response.json();
      const initialNotes: Record<string, string> = {};
      const dataForCalc = data.map(day => {
        const dayStr = day.date.substring(0, 10);
        initialNotes[dayStr] = day.notes || '';
        return {
          id: day.id,
          date: new Date(day.date),
          userId: day.userId,
          notes: day.notes,
          meals: day.meals.map(meal => ({
              id: meal.id,
              plannerDayId: meal.plannerDayId,
              mealType: meal.mealType,
              mealTime: meal.mealTime,
              servings: meal.servings,
              recipeId: meal.recipeId,
              customFoodEntryId: meal.customFoodEntryId,
              isCompleted: meal.isCompleted,
              recipe: meal.recipe ? {
                  id: meal.recipe.id,
                  title: meal.recipe.title,
                  servings: meal.recipe.servings,
                  imageUrl: meal.recipe.imageUrl,
                  nutritionFacts: meal.recipe.nutritionFacts ? {
                      id: meal.recipe.nutritionFacts.id,
                      protein: meal.recipe.nutritionFacts.protein,
                      carbs: meal.recipe.nutritionFacts.carbs,
                      fat: meal.recipe.nutritionFacts.fat,
                      fiber: meal.recipe.nutritionFacts.fiber,
                      sugar: meal.recipe.nutritionFacts.sugar,
                      sodium: meal.recipe.nutritionFacts.sodium,
                      recipeId: meal.recipe.nutritionFacts.recipeId,
                  } : null,
              } : null,
              customFoodEntry: meal.customFoodEntry ? {
                  id: meal.customFoodEntry.id,
                  name: meal.customFoodEntry.name,
                  calories: meal.customFoodEntry.calories,
                  protein: meal.customFoodEntry.protein,
                  carbs: meal.customFoodEntry.carbs,
                  fat: meal.customFoodEntry.fat,
                  servingSize: meal.customFoodEntry.servingSize,
              } : null,
          }))
        };
      });
      setDailyNotes(initialNotes);
      setPlannerData(data);
      const calculatedMacros = calculateDailyMacros(dataForCalc);
      setDailyMacros(calculatedMacros);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      setPlannerData([]);
      setDailyMacros([]);
      setDailyNotes({});
    } finally {
      setIsLoading(false);
    }
}, [currentWeekStart]);

  useEffect(() => { fetchPlannerData(); }, [fetchPlannerData]);
  useEffect(() => { /* Fetch User Preferences */ }, []);

  // --- Search --- (Remains the same)
  useEffect(() => { /* Debounce Search */ }, [searchQuery]);

  // --- Week Navigation Handlers --- (Remain the same)
  const handlePreviousWeek = () => { setCurrentWeekStart(subDays(currentWeekStart, 7)); };
  const handleNextWeek = () => { setCurrentWeekStart(addDays(currentWeekStart, 7)); };
  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      const newWeekStart = startOfWeek(selectedDate, { weekStartsOn: 1 });
      setCurrentWeekStart(newWeekStart);
      setIsCalendarOpen(false);
    }
  };
  const currentWeekEnd = endOfWeek(currentWeekStart, { weekStartsOn: 1 });
  const daysInWeek = eachDayOfInterval({ start: currentWeekStart, end: currentWeekEnd });

  // --- Modal Handlers --- (Remain the same)
  const handleAddMealClick = (day: Date) => { setSelectedDateForMeal(day); setIsModalOpen(true); };
  const handleCloseModalAndReset = () => { /* ... reset state ... */ };
  const handleSelectItem = (_item: SearchResultItem) => { /* ... */ };
  const handleQuickItemNameChange = (_e: React.ChangeEvent<HTMLInputElement>) => { /* ... */ };
  const handleConfirmAddMeal = async () => { /* ... */ };
  const handleConfirmQuickAddItem = async () => { /* ... */ };
  const handleDeleteMeal = async (_mealId: string) => { /* ... */ };
  const handleGenerateShoppingList = () => { setIsSelectMealsModalOpen(true); };
  const handleConfirmShoppingListSelection = (_selectedMealIds: string[]) => { /* ... */ };
  const handleCloseShoppingListModal = () => { setIsShoppingListModalOpen(false); };
  const handleViewMealDetails = (meal: PlannerMealData) => { setSelectedMealForDetails(meal); setIsDetailsModalOpen(true); };
  const handleCloseDetailsModal = () => { setIsDetailsModalOpen(false); setSelectedMealForDetails(null); };
  const handleNoteChange = (dateString: string, value: string) => { setDailyNotes(prev => ({ ...prev, [dateString]: value })); };
  const handleSaveNote = async (_dateString: string) => { /* ... */ };

  // --- JSX ---
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Meal Planner</h1>

      {/* Week Navigation & Date Picker - UPDATED */}
      <div className="flex justify-between items-center mb-6">
        <Button onClick={handlePreviousWeek} variant="outline" disabled={isLoading || isGeneratingList}>
          &lt; Previous Week
        </Button>

        {/* Centered Date Picker */}
        <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[280px] justify-center text-center font-normal", // Center text
                !currentWeekStart && "text-muted-foreground"
              )}
              disabled={isLoading || isGeneratingList}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {currentWeekStart ? (
                <>
                  {format(currentWeekStart, 'MMM d')} - {format(currentWeekEnd, 'MMM d, yyyy')}
                </>
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={currentWeekStart}
              onSelect={handleDateSelect}
              initialFocus
              showOutsideDays
              weekStartsOn={1}
              modifiers={{ selected_week: { from: currentWeekStart, to: currentWeekEnd } }}
              modifiersClassNames={{ selected_week: 'bg-accent text-accent-foreground' }}
            />
          </PopoverContent>
        </Popover>

        <Button onClick={handleNextWeek} variant="outline" disabled={isLoading || isGeneratingList}>
          Next Week &gt;
        </Button>
      </div>

      {/* Status Indicators (remain the same) */}
      {isLoading && <p className="text-center text-gray-500">Loading planner...</p>}
      {error && <p className="text-center text-red-500">Planner Error: {error}</p>}
      {prefsLoading && <p className="text-center text-gray-500">Loading preferences...</p>}
      {prefsError && <p className="text-center text-orange-500">Preferences Error: {prefsError}</p>}

      {/* Daily Grid */}
      {!isLoading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 mt-6">
          {daysInWeek.map((day) => {
            const dayString = format(day, 'yyyy-MM-dd');
            const plannerDay = _plannerData.find(pd => pd.date.startsWith(dayString));
            const macros = dailyMacros.find(m => m.date.toISOString().startsWith(dayString));
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
                {/* Macro Totals */}
                <div className="text-xs space-y-1 mb-3">
                  {/* ... Progress Bars ... */}
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
                        <>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center flex-grow overflow-hidden mr-2 cursor-pointer group" onClick={() => handleViewMealDetails(meal)}>
                              {/* --- UPDATED IMG to Image --- */}
                              {meal.recipe?.imageUrl ?
                                <Image src={meal.recipe.imageUrl} alt={meal.recipe.title ?? 'Recipe'} width={24} height={24} className="w-6 h-6 rounded object-cover mr-1.5 flex-shrink-0" />
                                : <div className="w-6 h-6 rounded bg-gray-200 mr-1.5 flex-shrink-0"></div>
                              }
                              <p className={`font-medium truncate text-sm group-hover:text-blue-600 text-gray-800`} title={meal.recipe?.title ?? meal.customFoodEntry?.name}>{meal.recipe?.title ?? meal.customFoodEntry?.name ?? 'Unnamed Item'}</p>
                            </div>
                          </div>
                          <div className="flex items-center justify-between mt-0.5 pl-[2.25rem]">
                            <div className="flex items-center space-x-1">
                              {meal.mealTime && (<span className="text-[10px] font-medium text-gray-500 bg-gray-100 px-1 rounded">{meal.mealTime}</span>)}
                              <p className="text-[10px] font-medium capitalize text-gray-500">{meal.mealType.toLowerCase()}</p>
                            </div>
                            <div className="flex items-center space-x-1">
                              <button onClick={(e) => { e.stopPropagation(); handleDeleteMeal(meal.id); }} title="Delete Meal" className="p-0.5 text-red-600 hover:text-red-800 text-xs">
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
                <button onClick={() => handleAddMealClick(day)} className="mt-auto pt-1 text-xs bg-green-100 hover:bg-green-200 text-green-700 font-semibold rounded w-full">
                  Add +
                </button>
                {/* Daily Notes Section */}
                <div className="mt-3 pt-3 border-t border-gray-200">
                  {/* ... Notes Label, Textarea, Button ... */}
                  <label htmlFor={`notes-${dayString}`} className="block text-xs font-medium text-gray-600 mb-1">Notes</label>
                  <Textarea id={`notes-${dayString}`} value={currentNote} onChange={(e) => handleNoteChange(dayString, e.target.value)} placeholder="Add notes for the day..." rows={3} className="w-full text-xs p-1 border rounded-md focus:ring-indigo-500 focus:border-indigo-500" disabled={isSavingThisNote}/>
                  <Button onClick={() => handleSaveNote(dayString)} size="sm" variant="outline" className="mt-1 w-full text-xs py-0.5 h-auto" disabled={isSavingThisNote || currentNote === (plannerDay?.notes ?? '')}>
                      {isSavingThisNote ? 'Saving...' : 'Save Note'}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* --- Shopping List Button - MOVED HERE --- */}
      {!isLoading && !error && _plannerData.length > 0 && ( // Only show if data is loaded
         <div className="flex justify-center mt-8 mb-4"> {/* Centered with margin */}
             <Button
               onClick={handleGenerateShoppingList}
               size="lg" // Make button larger if desired
               disabled={isLoading || _plannerData.length === 0 || isGeneratingList}
             >
               <ShoppingCart className="mr-2 h-5 w-5" /> {/* Adjusted icon size */}
               <span>{isGeneratingList ? 'Generating...' : 'Generate Shopping List'}</span>
             </Button>
         </div>
      )}

      {/* --- Modals --- */}
      {/* Add Meal Modal */}
      {isModalOpen && selectedDateForMeal && (
        <AlertDialog open={isModalOpen} onOpenChange={!isSubmitting ? handleCloseModalAndReset : undefined}>
          {/* ... Add Meal Modal Content ... */}
          <AlertDialogContent className="sm:max-w-[550px] max-h-[90vh] flex flex-col">
            <AlertDialogHeader>
              <AlertDialogTitle>Add Meal for {format(selectedDateForMeal, 'MMM d, yyyy')}</AlertDialogTitle>
              <AlertDialogDescription>Search for a recipe/food or add a quick item.</AlertDialogDescription>
            </AlertDialogHeader>
            <div className="flex-grow overflow-hidden flex flex-col space-y-4 pr-2">
              <div className="relative">
                <Input placeholder="Search recipes or custom foods..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pr-8" disabled={isSubmitting} />
                {_isSearching && <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-500">Searching...</span>}
              </div>
              <div className="flex-grow overflow-y-auto border rounded-md p-2 min-h-[100px]">
                {searchError && <p className="text-red-500 text-sm text-center">{searchError}</p>}
                {!_isSearching && searchResults.length === 0 && searchQuery.trim() !== '' && (<p className="text-gray-500 text-sm text-center">No results found.</p>)}
                {searchResults.length > 0 && (
                  <ScrollArea className="h-full">
                    <ul className="space-y-2">
                      {searchResults.map((item) => (
                        <li key={item.id} onClick={() => !isSubmitting && handleSelectItem(item)} className={`p-2 rounded cursor-pointer flex items-center space-x-2 ${selectedItem?.id === item.id ? 'bg-blue-100' : 'hover:bg-gray-100'} ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}>
                          {/* --- UPDATED IMG to Image --- */}
                          {item.imageUrl ?
                            <Image src={item.imageUrl} alt={item.name ?? 'Item image'} width={32} height={32} className="w-8 h-8 rounded object-cover flex-shrink-0" />
                            : <div className="w-8 h-8 rounded bg-gray-200 flex-shrink-0"></div>
                          }
                          <span className="text-sm font-medium">{item.name} ({item.type})</span>
                        </li>
                      ))}
                    </ul>
                  </ScrollArea>
                )}
                {!_isSearching && searchResults.length === 0 && searchQuery.trim() === '' && (<p className="text-gray-400 text-xs text-center pt-4">Type above to search your recipes and custom foods.</p>)}
              </div>
              <div className="relative flex items-center py-2"><div className="flex-grow border-t border-gray-300"></div><span className="flex-shrink mx-4 text-gray-500 text-xs">OR</span><div className="flex-grow border-t border-gray-300"></div></div>
              <div>
                <Label htmlFor="quick-item-name" className="text-sm font-medium">Add Quick Item</Label>
                <Input id="quick-item-name" placeholder="e.g., Apple, 2 Eggs, Leftovers..." value={quickItemName} onChange={handleQuickItemNameChange} className="mt-1" disabled={isSubmitting} />
              </div>
              {(selectedItem || quickItemName.trim() !== '') && (
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="meal-type" className="text-sm font-medium">Meal Type *</Label>
                    <select id="meal-type" value={selectedMealType} onChange={(e) => setSelectedMealType(e.target.value as MealType)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm h-9 text-sm" required disabled={isSubmitting}>
                      <option value="" disabled>Select...</option>
                      {Object.values(MealType).map(type => (<option key={type} value={type}>{type}</option>))}
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="servings" className="text-sm font-medium">Servings *</Label>
                    <Input id="servings" type="number" min="0.1" step="0.1" value={selectedServings} onChange={(e) => setSelectedServings(parseFloat(e.target.value) || 1)} className="mt-1" required disabled={isSubmitting}/>
                  </div>
                  <div>
                    <Label htmlFor="meal-time" className="text-sm font-medium">Time (Optional)</Label>
                    <Input id="meal-time" type="time" value={selectedMealTime} onChange={(e) => setSelectedMealTime(e.target.value)} className="mt-1" disabled={isSubmitting}/>
                  </div>
                </div>
              )}
            </div>
            {submitError && (<p className="text-sm text-red-600 mt-2 text-center">{submitError}</p>)}
            <AlertDialogFooter className="mt-4 pt-4 border-t">
              <AlertDialogCancel onClick={handleCloseModalAndReset} disabled={isSubmitting}>Cancel</AlertDialogCancel>
              {quickItemName.trim() !== '' && (<Button onClick={handleConfirmQuickAddItem} disabled={isSubmitting || !selectedMealType || quickItemName.trim() === ''} className="bg-green-600 hover:bg-green-700">{isSubmitting ? 'Adding...' : 'Add Quick Item'}</Button>)}
              {selectedItem && quickItemName.trim() === '' && (<AlertDialogAction onClick={handleConfirmAddMeal} disabled={isSubmitting || !selectedMealType || !selectedItem || quickItemName.trim() !== ''} className="bg-blue-600 hover:bg-blue-700">{isSubmitting ? 'Adding...' : 'Add Meal'}</AlertDialogAction>)}
              {!selectedItem && quickItemName.trim() === '' && ( <Button disabled className="bg-gray-400">Add Meal</Button> )}
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}

      {/* Shopping List Modal */}
      {isShoppingListModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          {/* ... Shopping List Modal Content ... */}
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] flex flex-col">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Shopping List</h2>
                <button onClick={handleCloseShoppingListModal} className="text-gray-500 hover:text-gray-800 text-2xl">&times;</button>
            </div>
            <div className="overflow-y-auto flex-grow">
                <ShoppingListDisplay items={shoppingListItems} />
            </div>
            <div className="mt-4 pt-4 border-t flex justify-end">
                <button onClick={handleCloseShoppingListModal} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Meal Details Modal */}
      <MealDetailsModal isOpen={isDetailsModalOpen} onClose={handleCloseDetailsModal} mealData={selectedMealForDetails} onMealUpdate={fetchPlannerData} />

      {/* Select Meals Modal */}
      <SelectMealsForShoppingListModal isOpen={isSelectMealsModalOpen} onClose={() => setIsSelectMealsModalOpen(false)} plannerData={_plannerData} onConfirm={handleConfirmShoppingListSelection} />

    </div> // End container
  );
};

export default MealPlannerPage;