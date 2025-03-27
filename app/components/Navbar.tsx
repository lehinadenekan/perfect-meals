'use client'

import React, { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import Image from 'next/image';
import AuthModal from './AuthModal';
import { Search, Home } from 'lucide-react';

const Navbar = () => {
  const { data: session, status } = useSession();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    
    // Dispatch custom event instead of navigating
    window.dispatchEvent(new CustomEvent('searchRecipes', {
      detail: { searchTerm: searchTerm.trim() }
    }));
    
    // Clear the search input
    setSearchTerm('');
  };

  const HomeButton = () => (
    <button
      onClick={() => {
        window.location.href = '/';
      }}
      className="px-4 py-2 rounded-md hover:bg-yellow-500/20 transition-colors text-black flex items-center gap-2"
    >
      <Home className="h-4 w-4" />
      Home
    </button>
  );

  return (
    <>
      <nav className="w-full bg-[#ffc800] p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6">
            <div className="relative">
              <form onSubmit={handleSearch} className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setSearchTerm(e.target.value);
                  }}
                  placeholder="Search for recipes or ingredients (e.g. jollof rice, eggs)"
                  className="w-[526px] pl-10 pr-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent bg-white shadow-md transition-all duration-200 hover:border-yellow-300 placeholder-gray-400"
                  aria-label="Search for recipes"
                />
              </form>
            </div>
          </div>
          <div className="flex gap-4 items-center">
            {status === 'loading' ? (
              <div className="text-black">Loading...</div>
            ) : session ? (
              <>
                <div className="flex items-center gap-3 relative">
                  <HomeButton />
                  <div 
                    className="flex items-center gap-3 cursor-pointer"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  >
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
                  
                  {/* Dropdown Menu */}
                  {isDropdownOpen && (
                    <div className="absolute top-full right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                      <div className="py-1">
                        <button
                          onClick={() => {
                            window.dispatchEvent(new CustomEvent('showFavoriteRecipes'));
                            setIsDropdownOpen(false);
                          }}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Favourite Recipes
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                <button
                  onClick={() => signOut()}
                  className="px-4 py-2 rounded-md hover:bg-yellow-500/20 transition-colors text-black"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <HomeButton />
                <div className="px-4 py-2 rounded-md text-black cursor-default">
                  Guest Mode
                </div>
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="px-4 py-2 rounded-md hover:bg-yellow-500/20 transition-colors text-black"
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