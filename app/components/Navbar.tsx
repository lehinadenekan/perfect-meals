'use client'

import React, { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import Image from 'next/image';
import AuthModal from './AuthModal';

const Navbar = () => {
  const { data: session, status } = useSession();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Add logging for session and image data
  React.useEffect(() => {
    if (session?.user) {
      console.log('Session user data:', {
        name: session.user.name,
        email: session.user.email,
        image: session.user.image
      });
    }
  }, [session]);

  return (
    <>
      <nav className="w-full bg-[#ffc800] p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-black text-xl font-bold lowercase">
            perfect meals
          </div>
          <div className="flex gap-4 items-center">
            {status === 'loading' ? (
              <div className="text-black">Loading...</div>
            ) : session ? (
              <>
                <div className="flex items-center gap-3">
                  {session.user?.image && !imageError ? (
                    <div className="relative w-8 h-8">
                      <Image
                        src={session.user.image}
                        alt="Profile"
                        className="rounded-full"
                        fill
                        sizes="32px"
                        onError={(e) => {
                          console.error('Image load error:', e);
                          setImageError(true);
                        }}
                      />
                    </div>
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-black">
                      {session.user?.name?.[0]?.toUpperCase() || '?'}
                    </div>
                  )}
                  <span className="text-black">{session.user?.name}</span>
                </div>
                <button
                  onClick={() => signOut()}
                  className="px-4 py-2 bg-white rounded-md hover:bg-gray-100 transition-colors text-black"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <button className="px-4 py-2 bg-white rounded-md hover:bg-gray-100 transition-colors text-black">
                  Guest Mode
                </button>
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="px-4 py-2 bg-white rounded-md hover:bg-gray-100 transition-colors text-black"
                >
                  Log In
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </>
  );
};

export default Navbar; 