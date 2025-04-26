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
    <div className="container mx-auto max-w-2xl py-10 px-4">
      <h1 className="text-3xl font-bold mb-8">Settings</h1>

      <Card>
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
          <CardDescription>
            Customize the look and feel of the application.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-base">Theme</Label>
            <p className="text-sm text-muted-foreground mb-2">
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
        <section>
          <h2 className="text-2xl font-semibold mb-4">Macro Goals</h2>
          <p className="mb-4 text-muted-foreground">Set your daily calorie and macronutrient targets.</p>
          <GoalSettingsForm />
          {/* Add other settings sections here later */}
        </section>
      )}
    </div>
  );
} 