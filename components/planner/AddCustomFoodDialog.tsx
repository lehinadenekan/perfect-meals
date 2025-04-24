'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import { toast } from "sonner"; // Assuming you use sonner for notifications

interface AddCustomFoodDialogProps {
  // Potentially add props like onFoodAdded to trigger data refresh
  trigger?: React.ReactNode; // Allow custom trigger element
}

export function AddCustomFoodDialog({ trigger }: AddCustomFoodDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // State for form inputs
  const [name, setName] = useState('');
  const [servingSize, setServingSize] = useState('');
  const [calories, setCalories] = useState<number | string>('');
  const [protein, setProtein] = useState<number | string>('');
  const [carbs, setCarbs] = useState<number | string>('');
  const [fat, setFat] = useState<number | string>('');

  const clearForm = () => {
    setName('');
    setServingSize('');
    setCalories('');
    setProtein('');
    setCarbs('');
    setFat('');
    setError(null);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    if (!name) {
      setError('Food name is required.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/custom-foods', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          servingSize: servingSize || null,
          calories: calories ? Number(calories) : null,
          protein: protein ? Number(protein) : null,
          carbs: carbs ? Number(carbs) : null,
          fat: fat ? Number(fat) : null,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add custom food');
      }

      // const newFood = await response.json();
      // console.log('Added food:', newFood);
      // toast.success("Custom food added successfully!"); // Example notification
      clearForm();
      setIsOpen(false); // Close dialog on success
      // Potentially call onFoodAdded prop here

    } catch (err) {
      const error = err as Error;
      console.error('Error adding custom food:', error);
      setError(error.message || 'An unexpected error occurred.');
      // toast.error(error.message || "Failed to add custom food.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenChange = (open: boolean) => {
      setIsOpen(open);
      if (!open) {
          clearForm(); // Clear form when dialog is closed
      }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {trigger || <Button variant="outline">Add Custom Food</Button>}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>Add Custom Food Entry</DialogTitle>
          <DialogDescription>
            Manually add a food item and its nutritional information.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="servingSize" className="text-right">
                Serving Size
              </Label>
              <Input
                id="servingSize"
                placeholder="e.g., 1 cup, 100g"
                value={servingSize}
                onChange={(e) => setServingSize(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="calories" className="text-right">
                Calories
              </Label>
              <Input
                id="calories"
                type="number"
                placeholder="kcal"
                value={calories}
                onChange={(e) => setCalories(e.target.value)}
                className="col-span-3"
                min="0"
              />
            </div>
             <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="protein" className="text-right">
                Protein
              </Label>
              <Input
                id="protein"
                type="number"
                placeholder="grams"
                value={protein}
                onChange={(e) => setProtein(e.target.value)}
                className="col-span-3"
                min="0"
              />
            </div>
             <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="carbs" className="text-right">
                Carbs
              </Label>
              <Input
                id="carbs"
                type="number"
                placeholder="grams"
                value={carbs}
                onChange={(e) => setCarbs(e.target.value)}
                className="col-span-3"
                min="0"
              />
            </div>
             <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="fat" className="text-right">
                Fat
              </Label>
              <Input
                id="fat"
                type="number"
                placeholder="grams"
                value={fat}
                onChange={(e) => setFat(e.target.value)}
                className="col-span-3"
                min="0"
              />
            </div>
            {error && (
              <p className="col-span-4 text-red-600 text-sm text-center">{error}</p>
            )}
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Saving...' : 'Save Custom Food'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
} 