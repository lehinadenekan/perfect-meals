'use client';

import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import GoalSettingsForm from '@/components/settings/GoalSettingsForm';
import { useSession } from 'next-auth/react';
import { ThemeToggle } from "@/components/theme-toggle";

export default function SettingsPage() {
  const { status } = useSession();

  return (
    <div className="container mx-auto max-w-2xl py-10 px-4 dark:bg-gray-950 dark:text-gray-100">
      <h1 className="text-3xl font-bold mb-8 dark:text-white">Settings</h1>

      <Card className="bg-yellow-400 dark:bg-card">
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
          <CardDescription>
            Customize the look and feel of the application.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-base dark:text-gray-100">Theme</Label>
            <p className="text-sm text-muted-foreground dark:text-gray-400 mb-2">
              Select the theme for the application.
            </p>
            <ThemeToggle />
          </div>
          {/* Add other appearance settings here if needed */}
        </CardContent>
      </Card>

      {status === 'loading' && (
        <p>Loading session...</p>
      )}

      {status === 'unauthenticated' && (
        <p>Please log in to access settings.</p>
        // Optionally add a login button here
      )}

      {status === 'authenticated' && (
        <section className="mt-8">
          <Card className="bg-yellow-400 dark:bg-card">
            <CardHeader>
              <CardTitle>Macro Goals</CardTitle>
              <CardDescription>Set your daily calorie and macronutrient targets.</CardDescription>
            </CardHeader>
            <CardContent>
              <GoalSettingsForm />
              {/* Add other settings sections here later */}
            </CardContent>
          </Card>
        </section>
      )}
    </div>
  );
} 