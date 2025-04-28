'use client';

import React from 'react';
// Remove unused Card imports as the only card is being deleted
// import {
//  Card,
//  CardContent,
// } from "@/components/ui/card";
// Remove GoalSettingsForm import as it's no longer used
// import GoalSettingsForm from '@/components/settings/GoalSettingsForm';
import { useSession } from 'next-auth/react';

export default function SettingsPage() {
  const { status } = useSession();

  return (
    <div className="container mx-auto max-w-2xl py-10 px-4">
      <h1 className="text-3xl font-bold mb-8">Settings</h1>

      {/* Appearance Card was already removed */}

      {status === 'loading' && (
        <p>Loading session...</p>
      )}

      {status === 'unauthenticated' && (
        <p>Please log in to access settings.</p>
        // Optionally add a login button here
      )}

      {/* Remove Macro Goals section completely */}
      {/*
      {status === 'authenticated' && (
        <Card className="mt-8 bg-[#ffc800] border-none shadow-none">
          {}
          <CardContent>
            <GoalSettingsForm />
            {}
          </CardContent>
        </Card>
      )}
      */}
    </div>
  );
} 