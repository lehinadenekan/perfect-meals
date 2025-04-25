import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { MealType } from '@prisma/client'; // Assuming MealType enum is available
import { toast } from 'react-hot-toast';
import Image from 'next/image'; // Ensure this import exists

// Type for search results (adjust based on actual API response)
type SearchResultItem = {
    id: string;
    name: string;
    type: 'recipe' | 'custom';
    imageUrl?: string | null;
};

interface AddMealModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAddMeal: (mealData: { 
        date: string; 
        mealType: MealType; 
        servings: number; 
        recipeId?: string; 
        customFoodEntryId?: string 
    }) => Promise<void>; // Function to handle adding the meal
    selectedDate: Date | null;
}

const AddMealModal: React.FC<AddMealModalProps> = ({ 
    isOpen, 
    onClose, 
    onAddMeal, 
    selectedDate 
}) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<SearchResultItem[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [searchError, setSearchError] = useState<string | null>(null);
    const [selectedItem, setSelectedItem] = useState<SearchResultItem | null>(null);
    const [selectedMealType, setSelectedMealType] = useState<MealType | ''>('');
    const [selectedServings, setSelectedServings] = useState<number>(1);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Reset state when modal closes or opens
    useEffect(() => {
        if (!isOpen) {
            setSearchQuery('');
            setSearchResults([]);
            setIsSearching(false);
            setSearchError(null);
            setSelectedItem(null);
            setSelectedMealType('');
            setSelectedServings(1);
            setIsSubmitting(false);
        }
    }, [isOpen]);

    // Placeholder for search logic (to be implemented)
    const handleSearch = async () => {
        if (!searchQuery.trim()) {
            setSearchResults([]);
            setSelectedItem(null); // Clear selection if search query is cleared
            return;
        }
        // Don't search if the query matches the currently selected item's name
        if (selectedItem && searchQuery === selectedItem.name) {
            return;
        }

        setIsSearching(true);
        setSearchError(null);
        setSelectedItem(null); // Clear selection when starting a new search
        
        try {
            const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery.trim())}`);
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ message: 'Failed to fetch search results' }));
                throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
            }
            const results: SearchResultItem[] = await response.json();
            setSearchResults(results);
        } catch (err) {
            console.error("Search error:", err);
            setSearchError(err instanceof Error ? err.message : 'An unexpected error occurred during search.');
            setSearchResults([]); // Clear results on error
        } finally {
            setIsSearching(false);
        }
    };

     // Debounced search effect
     useEffect(() => {
        // If the user has selected an item and the search query matches it, don't trigger search
        if (selectedItem && searchQuery === selectedItem.name) {
            return;
        }
        
        const timer = setTimeout(() => {
            handleSearch();
        }, 300); // Debounce time (e.g., 300ms)
        return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchQuery]); // Rerun when searchQuery changes

    const handleSelectItem = (item: SearchResultItem) => {
        setSelectedItem(item);
        setSearchResults([]); // Clear results after selection
        setSearchQuery(item.name); // Put selected item name in search bar
    };

    const handleSubmit = async () => {
        if (!selectedItem || !selectedMealType || !selectedDate || selectedServings <= 0) {
            toast.error('Please select a meal, meal type, servings, and ensure date is set.');
            return;
        }

        setIsSubmitting(true);
        try {
            const mealData = {
                date: selectedDate.toISOString().split('T')[0], // Format as YYYY-MM-DD
                mealType: selectedMealType,
                servings: selectedServings,
                recipeId: selectedItem.type === 'recipe' ? selectedItem.id : undefined,
                customFoodEntryId: selectedItem.type === 'custom' ? selectedItem.id : undefined,
            };
            await onAddMeal(mealData);
            toast.success(`${selectedItem.name} added successfully!`);
            onClose(); // Close modal on success
        } catch (error) {
            console.error("Error adding meal:", error);
            toast.error(error instanceof Error ? error.message : 'Failed to add meal.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add Meal</DialogTitle>
                    <DialogDescription>
                        Search for a recipe or custom food item to add to your planner for {selectedDate ? selectedDate.toLocaleDateString() : ''}.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    {/* Search Input */}
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="search" className="text-right">
                            Search
                        </Label>
                        <Input
                            id="search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="col-span-3"
                            placeholder="Search recipes or foods..."
                            disabled={isSubmitting}
                        />
                    </div>

                    {/* Search Results / Selected Item Display */}
                    <div className="col-span-4">
                        {isSearching && <p className="text-sm text-gray-500">Searching...</p>}
                        {searchError && <p className="text-sm text-red-500">{searchError}</p>}
                        {searchResults.length > 0 && (
                            <ul className="mt-2 border rounded-md max-h-40 overflow-y-auto">
                                {searchResults.map((item) => (
                                    <li key={item.id} 
                                        className="px-3 py-2 hover:bg-accent cursor-pointer flex items-center gap-2"
                                        onClick={() => handleSelectItem(item)}
                                    >
                                        {item.imageUrl && (
                                            <Image
                                                src={item.imageUrl}
                                                alt={item.name ?? 'Item image'}
                                                width={32}
                                                height={32}
                                                className="w-8 h-8 object-cover rounded"
                                            />
                                        )}
                                        <span>{item.name} ({item.type})</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                        {selectedItem && !searchResults.length && (
                             <div className="mt-2 p-2 border rounded-md bg-gray-50">
                                <p className="text-sm font-medium">Selected: {selectedItem.name} ({selectedItem.type})</p>
                                {/* Optionally show more details or an image here */}
                             </div>
                        )}
                    </div>

                    {/* Meal Type Select */}
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="mealType" className="text-right">
                            Meal Type
                        </Label>
                        <Select 
                            value={selectedMealType}
                            onValueChange={(value: MealType | '') => setSelectedMealType(value)}
                            disabled={isSubmitting || !selectedItem} // Disable if no item selected
                        >
                            <SelectTrigger id="mealType" className="col-span-3">
                                <SelectValue placeholder="Select meal type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value={MealType.BREAKFAST}>Breakfast</SelectItem>
                                <SelectItem value={MealType.LUNCH}>Lunch</SelectItem>
                                <SelectItem value={MealType.DINNER}>Dinner</SelectItem>
                                <SelectItem value={MealType.SNACK}>Snack</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Servings Input */}
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="servings" className="text-right">
                            Servings
                        </Label>
                        <Input
                            id="servings"
                            type="number"
                            value={selectedServings}
                            onChange={(e) => setSelectedServings(Number(e.target.value))}
                            min={1}
                            className="col-span-3"
                            disabled={isSubmitting || !selectedItem} // Disable if no item selected
                        />
                    </div>

                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button type="button" onClick={handleSubmit} disabled={isSubmitting || !selectedItem || !selectedMealType}>
                        {isSubmitting ? 'Adding...' : 'Add Meal'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default AddMealModal; 