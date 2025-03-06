'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import ProfileHeader from '../components/profile/ProfileHeader';
import PreferencesForm from '../components/profile/PreferencesForm';
import AllergySection from '../components/profile/AllergySection';
import CuisinePreferences from '../components/profile/CuisinePreferences';
import DietaryRestrictions from '../components/profile/DietaryRestrictions';

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <ProfileHeader user={session.user} />
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-6">Food Preferences</h2>
          <div className="space-y-8">
            <PreferencesForm />
            <DietaryRestrictions />
            <AllergySection />
            <CuisinePreferences />
          </div>
        </div>
      </div>
    </div>
  );
} 