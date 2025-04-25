'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import toast from 'react-hot-toast';
import { Loader2 } from 'lucide-react';
import { useSession } from 'next-auth/react';

// Zod schema for form validation (matching API validation)
const goalSettingsSchema = z.object({
  dailyCalorieGoal: z.coerce.number().int().positive('Must be a positive number').optional().nullable(),
  dailyProteinGoal: z.coerce.number().int().positive('Must be a positive number').optional().nullable(),
  dailyCarbGoal: z.coerce.number().int().positive('Must be a positive number').optional().nullable(),
  dailyFatGoal: z.coerce.number().int().positive('Must be a positive number').optional().nullable(),
});

type GoalSettingsFormData = z.infer<typeof goalSettingsSchema>;

export default function GoalSettingsForm() {
  const { status: sessionStatus } = useSession();
  const [isLoading, setIsLoading] = useState(true); // Loading state for initial fetch

  const {
    register,
    handleSubmit,
    reset, // To reset form with fetched data
    formState: { errors, isSubmitting, isDirty }, // isDirty to enable save button only on changes
  } = useForm<GoalSettingsFormData>({
    resolver: zodResolver(goalSettingsSchema),
    defaultValues: { // Initial defaults, will be overwritten by fetched data
        dailyCalorieGoal: null,
        dailyProteinGoal: null,
        dailyCarbGoal: null,
        dailyFatGoal: null,
    }
  });

  // Fetch current preferences when component mounts and session is available
  useEffect(() => {
    const fetchPreferences = async () => {
      if (sessionStatus === 'authenticated') {
        setIsLoading(true);
        try {
          const response = await fetch('/api/user/preferences');
          if (!response.ok) {
            throw new Error('Failed to fetch preferences');
          }
          const data = await response.json();
          // Reset the form with fetched data (or defaults if data is empty/null)
          reset({
            dailyCalorieGoal: data?.dailyCalorieGoal || null,
            dailyProteinGoal: data?.dailyProteinGoal || null,
            dailyCarbGoal: data?.dailyCarbGoal || null,
            dailyFatGoal: data?.dailyFatGoal || null,
          });
        } catch (error) {
          console.error("Error fetching preferences:", error);
          toast.error(error instanceof Error ? error.message : 'Could not load preferences.');
        } finally {
          setIsLoading(false);
        }
      } else if (sessionStatus === 'unauthenticated') {
          // Handle unauthenticated state (e.g., show message, redirect) if needed
          setIsLoading(false);
      } // Still loading if status === 'loading'
    };

    fetchPreferences();
  }, [sessionStatus, reset]);

  const onSubmit = async (data: GoalSettingsFormData) => {
    const savingToastId = toast.loading('Saving goals...');
    try {
        const response = await fetch('/api/user/preferences', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            // Send only the goal fields, converting empty strings/NaN from input to null
            body: JSON.stringify({
                dailyCalorieGoal: data.dailyCalorieGoal || null,
                dailyProteinGoal: data.dailyProteinGoal || null,
                dailyCarbGoal: data.dailyCarbGoal || null,
                dailyFatGoal: data.dailyFatGoal || null,
            }),
        });

        if (!response.ok) {
            let errorMessage = 'Failed to save goals.';
            try {
                 const errorBody = await response.json();
                 errorMessage = errorBody.message || (errorBody.details ? JSON.stringify(errorBody.details) : errorMessage);
            } catch {}
            throw new Error(errorMessage);
        }

        const updatedPrefs = await response.json();
        reset(updatedPrefs); // Reset form to show saved data and clear dirty state
        toast.success('Goals saved successfully!', { id: savingToastId });

        // TODO: Optionally trigger a refresh of planner data if goals affect it immediately elsewhere

    } catch (error) {
        console.error("Error saving goals:", error);
        toast.error(error instanceof Error ? error.message : 'An unknown error occurred.', { id: savingToastId });
    }
  };

  if (sessionStatus === 'loading' || isLoading) {
      return (
        <div className="flex justify-center items-center p-10">
            <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
        </div>
      );
  }

  if (sessionStatus === 'unauthenticated') {
      return <p className="text-center text-red-500">Please log in to manage your settings.</p>;
  }

  return (
    <Card className="max-w-lg mx-auto">
      <CardHeader>
        <CardTitle>Macro Goals</CardTitle>
        <CardDescription>Set your daily nutritional targets.</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="dailyCalorieGoal">Daily Calories (kcal)</Label>
            <Input 
                id="dailyCalorieGoal" 
                type="number" 
                {...register('dailyCalorieGoal')} 
                placeholder="e.g., 2000" 
                disabled={isSubmitting}
            />
             {errors.dailyCalorieGoal && <p className="text-red-500 text-xs mt-1">{errors.dailyCalorieGoal.message}</p>}
          </div>
          <div>
            <Label htmlFor="dailyProteinGoal">Daily Protein (g)</Label>
            <Input 
                id="dailyProteinGoal" 
                type="number" 
                {...register('dailyProteinGoal')} 
                placeholder="e.g., 150" 
                disabled={isSubmitting}
            />
             {errors.dailyProteinGoal && <p className="text-red-500 text-xs mt-1">{errors.dailyProteinGoal.message}</p>}
          </div>
           <div>
            <Label htmlFor="dailyCarbGoal">Daily Carbs (g)</Label>
            <Input 
                id="dailyCarbGoal" 
                type="number" 
                {...register('dailyCarbGoal')} 
                placeholder="e.g., 250" 
                disabled={isSubmitting}
            />
             {errors.dailyCarbGoal && <p className="text-red-500 text-xs mt-1">{errors.dailyCarbGoal.message}</p>}
          </div>
           <div>
            <Label htmlFor="dailyFatGoal">Daily Fat (g)</Label>
            <Input 
                id="dailyFatGoal" 
                type="number" 
                {...register('dailyFatGoal')} 
                placeholder="e.g., 70" 
                disabled={isSubmitting}
            />
             {errors.dailyFatGoal && <p className="text-red-500 text-xs mt-1">{errors.dailyFatGoal.message}</p>}
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={isSubmitting || !isDirty} className="ml-auto">
            {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            {isSubmitting ? 'Saving...' : 'Save Goals'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
} 