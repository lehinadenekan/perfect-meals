import React, { useState, useMemo } from 'react';
import { format } from 'date-fns';
import { MealType, Recipe, CustomFoodEntry, NutritionFacts, Ingredient, Instruction } from '@prisma/client';
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox"; // Assuming usage of shadcn checkbox
import { ScrollArea } from "@/components/ui/scroll-area"; // For scrollable meal lists

// Reusing types defined in page.tsx - consider moving to a shared types file
type PlannerMealData = {
  id: string;
  plannerDayId: string;
  mealType: MealType;
  mealTime: string | null;
  servings: number | null;
  recipeId: string | null;
  customFoodEntryId: string | null;
  isCompleted: boolean; // Keep for potential future use, though not directly used for selection here
  recipe: (Omit<Recipe, 'dietaryNotes' | 'dietaryFeedback' | 'albums' | 'reviews' | 'recipeHistory' | 'categories' | 'cuisines' | 'savedBy' | 'plannedMeals' | 'search_vector'> & {
    nutritionFacts: NutritionFacts | null;
    ingredients: Ingredient[];
    instructions: Instruction[];
  }) | null;
  customFoodEntry: CustomFoodEntry | null;
};

type PlannerApiResponseDay = {
  id: string;
  date: string; // ISO Date string YYYY-MM-DDTHH:mm:ss.sssZ
  notes: string | null;
  meals: PlannerMealData[];
};

interface SelectMealsForShoppingListModalProps {
  isOpen: boolean;
  onClose: () => void;
  plannerData: PlannerApiResponseDay[]; // Full data for the week
  onConfirm: (selectedMealIds: string[]) => void; // Callback with selected IDs
}

const SelectMealsForShoppingListModal: React.FC<SelectMealsForShoppingListModalProps> = ({
  isOpen,
  onClose,
  plannerData,
  onConfirm,
}) => {
  const [selectedMealIds, setSelectedMealIds] = useState<Set<string>>(new Set());

  const handleMealCheckboxChange = (mealId: string, checked: boolean | string) => {
    setSelectedMealIds(prev => {
      const newSet = new Set(prev);
      if (checked) {
        newSet.add(mealId);
      } else {
        newSet.delete(mealId);
      }
      return newSet;
    });
  };

  const handleDayCheckboxChange = (dayMealIds: string[], checked: boolean | string) => {
      setSelectedMealIds(prev => {
          const newSet = new Set(prev);
          if (checked) {
              dayMealIds.forEach(id => newSet.add(id));
          } else {
              dayMealIds.forEach(id => newSet.delete(id));
          }
          return newSet;
      });
  };

  const handleConfirmClick = () => {
    onConfirm(Array.from(selectedMealIds));
  };

  // Group meals by day for easier rendering, converting date string
  const daysWithMeals = useMemo(() => {
      return plannerData.map(day => ({
          ...day,
          dateObj: new Date(day.date) // Convert string to Date for formatting
      })).sort((a, b) => a.dateObj.getTime() - b.dateObj.getTime()); // Ensure days are sorted
  }, [plannerData]);


  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] flex flex-col">
        <h2 className="text-xl font-bold mb-4">Select Meals for Shopping List</h2>

        <ScrollArea className="flex-grow mb-4 pr-4 -mr-4 border-b border-t py-2"> {/* Added padding compensation */}
          <div className="space-y-4">
            {daysWithMeals.map((day) => {
              const dayMealIds = day.meals.map(m => m.id);
              const allMealsSelectedForDay = dayMealIds.length > 0 && dayMealIds.every(id => selectedMealIds.has(id));
              const someMealsSelectedForDay = dayMealIds.some(id => selectedMealIds.has(id));

              return (
                <div key={day.id}>
                  <div className="flex items-center justify-between mb-2 pb-1 border-b">
                    <h3 className="font-semibold">{format(day.dateObj, 'EEEE, MMM d')}</h3>
                    {day.meals.length > 0 && (
                      <div className="flex items-center space-x-2">
                         <label htmlFor={`day-select-${day.id}`} className="text-xs font-medium text-gray-600">Select All</label>
                         <Checkbox
                            id={`day-select-${day.id}`}
                            checked={allMealsSelectedForDay || (someMealsSelectedForDay ? 'indeterminate' : false)}
                            onCheckedChange={(checked) => handleDayCheckboxChange(dayMealIds, checked)}
                         />
                      </div>
                    )}
                  </div>
                  {day.meals.length > 0 ? (
                    <ul className="space-y-1.5 pl-2">
                      {day.meals.map((meal) => (
                        <li key={meal.id} className="flex items-center space-x-3">
                          <Checkbox
                            id={`meal-select-${meal.id}`}
                            checked={selectedMealIds.has(meal.id)}
                            onCheckedChange={(checked) => handleMealCheckboxChange(meal.id, checked)}
                            className="mt-1" // Align checkbox slightly better
                          />
                           <label htmlFor={`meal-select-${meal.id}`} className="flex-grow text-sm cursor-pointer">
                              <span className="font-medium">{meal.recipe?.title ?? meal.customFoodEntry?.name ?? 'Unnamed Meal'}</span>
                              <span className="text-xs text-gray-500 ml-2">({meal.mealType})</span>
                              {meal.mealTime && <span className="text-xs text-gray-500 ml-1">({meal.mealTime})</span>}
                           </label>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-500 italic pl-2">No meals planned for this day.</p>
                  )}
                </div>
              );
            })}
          </div>
        </ScrollArea>

        <div className="mt-auto pt-4 flex justify-end border-t">
          <Button variant="outline" onClick={onClose} className="mr-2">
            Cancel
          </Button>
          <Button onClick={handleConfirmClick} disabled={selectedMealIds.size === 0}>
            Generate List ({selectedMealIds.size} meals selected)
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SelectMealsForShoppingListModal; 