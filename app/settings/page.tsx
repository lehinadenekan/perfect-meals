'use client';

import React from 'react';
import GoalSettingsForm from '@/components/settings/GoalSettingsForm';
import { useSession } from 'next-auth/react';

const SettingsPage: React.FC = () => {
  const { status } = useSession();

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Settings</h1>

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
};

export default SettingsPage; 