'use client'

import React, { useState, useRef, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AuthModal from './AuthModal';
import LoginPromptModal from './LoginPromptModal';
import {
  Search, User, Settings, LogOut, Bookmark, PlusCircle, CalendarDays, Compass, ChevronDown, List, History,
  FilePlus2, UploadCloud, Sparkles
} from 'lucide-react';

interface NavbarProps {
  onSearch: (term: string) => Promise<void>;
}

const Navbar = ({ onSearch }: NavbarProps) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isCollectionDropdownOpen, setIsCollectionDropdownOpen] = useState(false);
  const [isAddRecipeDropdownOpen, setIsAddRecipeDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isPromptModalOpen, setIsPromptModalOpen] = useState(false);

  const userDropdownRef = useRef<HTMLDivElement>(null);
  const collectionDropdownRef = useRef<HTMLDivElement>(null);
  const addRecipeDropdownRef = useRef<HTMLDivElement>(null);

  // --- Click outside handler ---
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      // Close User Dropdown
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target as Node)) {
        setIsUserDropdownOpen(false);
      }
      // Close Collection Dropdown
      if (collectionDropdownRef.current && !collectionDropdownRef.current.contains(event.target as Node)) {
        setIsCollectionDropdownOpen(false);
      }
       // Close Add Recipe Dropdown
       if (addRecipeDropdownRef.current && !addRecipeDropdownRef.current.contains(event.target as Node)) {
         setIsAddRecipeDropdownOpen(false);
       }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [userDropdownRef, collectionDropdownRef, addRecipeDropdownRef]);

  // Reset image error state when session changes or user logs out
  React.useEffect(() => {
    if (status !== 'loading') {
      setImageError(false);
    }
  }, [session, status]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedSearchTerm = searchTerm.trim();
    if (!trimmedSearchTerm) return;
    await onSearch(trimmedSearchTerm);
  };

  // --- User Dropdown Menu Component ---
  const UserMenu = () => (
    <div className="relative" ref={userDropdownRef}>
       <button
         className="flex items-center gap-2 cursor-pointer"
         onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
         aria-label="User menu"
       >
         {session?.user?.image && !imageError ? (
           <div className="relative w-8 h-8 rounded-full overflow-hidden">
             <Image
               src={session.user.image}
               alt="Profile"
               className="object-cover"
               fill
               sizes="32px"
               onError={() => setImageError(true)}
             />
           </div>
         ) : (
           <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600">
             <User size={18} />
           </div>
         )}
         <span className="text-black hidden md:inline">{session?.user?.name}</span>
       </button>

       {isUserDropdownOpen && (
          <div className="absolute top-full right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
             <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button">
               <Link href="/profile" passHref legacyBehavior>
                 <a
                   onClick={() => setIsUserDropdownOpen(false)}
                   className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                   role="menuitem"
                 >
                   <User size={16} className="text-gray-500"/> Profile
                 </a>
               </Link>
               <Link href="/settings" passHref legacyBehavior>
                 <a
                   onClick={() => setIsUserDropdownOpen(false)}
                   className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                   role="menuitem"
                 >
                   <Settings size={16} className="text-gray-500"/> Settings
                 </a>
               </Link>
               <hr className="my-1" />
               <button
                 onClick={() => {
                   signOut();
                   setIsUserDropdownOpen(false);
                 }}
                 className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                 role="menuitem"
               >
                 <LogOut size={16} className="text-gray-500"/> Sign Out
               </button>
             </div>
           </div>
       )}
    </div>
  );

  // --- My Collection Dropdown ---
  const CollectionDropdown = () => (
    <div className="relative" ref={collectionDropdownRef}>
       <button
         onClick={() => {
           if (session) {
             setIsCollectionDropdownOpen(!isCollectionDropdownOpen);
           } else {
             setIsPromptModalOpen(true);
           }
         }}
         className="px-3 py-2 rounded-md hover:bg-yellow-500/20 transition-colors text-black flex items-center gap-1.5 text-sm font-medium"
         aria-haspopup="true"
         aria-expanded={isCollectionDropdownOpen}
       >
         <Bookmark size={16} />
         <span className="hidden sm:inline">My Collection</span>
         <ChevronDown size={16} className={`transition-transform ${isCollectionDropdownOpen ? 'rotate-180' : ''}`} />
       </button>
       {isCollectionDropdownOpen && (
          <div className="absolute top-full left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
            <div className="py-1" role="menu" aria-orientation="vertical">
              <Link href="/my-recipes" passHref legacyBehavior>
                <a
                  onClick={() => setIsCollectionDropdownOpen(false)}
                  className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                >
                   <List size={16} className="text-gray-500"/> My Recipes
                </a>
               </Link>
               <Link href="/recently-viewed" passHref legacyBehavior>
                <a
                  onClick={() => setIsCollectionDropdownOpen(false)}
                  className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                >
                   <History size={16} className="text-gray-500"/> Recently Viewed
                </a>
               </Link>
            </div>
          </div>
       )}
    </div>
  );

  // --- Add Recipe Dropdown ---
  const AddRecipeDropdown = () => (
    <div className="relative" ref={addRecipeDropdownRef}>
      <button
        onClick={() => {
          if (session) {
            setIsAddRecipeDropdownOpen(!isAddRecipeDropdownOpen);
          } else {
            setIsPromptModalOpen(true);
          }
        }}
        className="px-3 py-2 rounded-md hover:bg-yellow-500/20 transition-colors text-black flex items-center gap-1.5 text-sm font-medium"
        aria-haspopup="true"
        aria-expanded={isAddRecipeDropdownOpen}
      >
        <PlusCircle size={16} />
        <span className="hidden sm:inline">Add Recipe</span>
        <ChevronDown size={16} className={`transition-transform ${isAddRecipeDropdownOpen ? 'rotate-180' : ''}`} />
      </button>
      {isAddRecipeDropdownOpen && (
         <div className="absolute top-full left-0 mt-2 w-52 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
           <div className="py-1" role="menu" aria-orientation="vertical">
             <Link href="/create-recipe" passHref legacyBehavior>
               <a
                 onClick={() => setIsAddRecipeDropdownOpen(false)}
                 className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                 role="menuitem"
               >
                 <FilePlus2 size={16} className="text-gray-500"/> Create from Scratch
               </a>
              </Link>
             <Link href="/import-recipe" passHref legacyBehavior>
               <a
                 onClick={() => setIsAddRecipeDropdownOpen(false)}
                 className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                 role="menuitem"
               >
                 <UploadCloud size={16} className="text-gray-500"/> Import Recipe
               </a>
              </Link>
             <Link href="/generate-recipe-ai" passHref legacyBehavior>
               <a
                 onClick={() => setIsAddRecipeDropdownOpen(false)}
                 className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                 role="menuitem"
               >
                 <Sparkles size={16} className="text-gray-500"/> Generate with AI
               </a>
              </Link>
           </div>
         </div>
      )}
    </div>
  );


  return (
    <>
      <nav className="w-full bg-[#ffc800] p-4 sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto flex flex-wrap justify-between items-center gap-4">

          {/* Left Side: Logo/Brand (Optional) & Navigation Links */}
           <div className="flex items-center gap-1 md:gap-2">
              {/* Render Discover Link */}
              <Link href="/" passHref legacyBehavior>
                 <a className="px-3 py-2 rounded-md hover:bg-yellow-500/20 transition-colors text-black flex items-center gap-1.5 text-sm font-medium">
                   <Compass size={16} />
                   <span className="hidden sm:inline">Discover</span>
                 </a>
              </Link>

              {/* Conditionally render Collection Dropdown if logged in */}
              {/* {session && <CollectionDropdown />} */}
              <CollectionDropdown />

              {/* Conditionally render Add Recipe Dropdown if logged in */}
              {/* {session && <AddRecipeDropdown />} */}
              <AddRecipeDropdown />

              {/* Render Meal Planner Link/Button */}
              {/* <Link href="/meal-planner" passHref legacyBehavior>
                 <a className="px-3 py-2 rounded-md hover:bg-yellow-500/20 transition-colors text-black flex items-center gap-1.5 text-sm font-medium">
                   <CalendarDays size={16} />
                   <span className="hidden sm:inline">Meal Planner</span>
                 </a>
              </Link> */}
              <button
                onClick={() => {
                  if (session) {
                    router.push('/meal-planner');
                  } else {
                    setIsPromptModalOpen(true);
                  }
                }}
                className="px-3 py-2 rounded-md hover:bg-yellow-500/20 transition-colors text-black flex items-center gap-1.5 text-sm font-medium"
              >
                <CalendarDays size={16} />
                <span className="hidden sm:inline">Meal Planner</span>
              </button>
           </div>

          {/* Middle: Search Bar */}
           <div className="flex-grow md:flex-grow-0 order-last w-full md:w-auto md:order-none">
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
                 placeholder="Search recipes..."
                 className="w-full lg:w-[400px] pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent shadow-sm transition-all duration-200 hover:border-yellow-400 placeholder-gray-500 text-sm"
                 aria-label="Search for recipes"
               />
             </form>
           </div>

           {/* Right Side: User Actions */}
           <div className="flex items-center gap-4">
             {status === 'loading' ? (
               <div className="h-8 w-20 bg-gray-200 rounded animate-pulse"></div>
             ) : session ? (
                 <UserMenu />
             ) : (
               <button
                 onClick={() => setIsAuthModalOpen(true)}
                 className="px-4 py-2 rounded-md hover:bg-yellow-500/20 transition-colors text-black text-sm font-medium"
               >
                 Log In / Sign Up
               </button>
             )}
           </div>
        </div>
      </nav>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />

      <LoginPromptModal
        isOpen={isPromptModalOpen}
        onClose={() => setIsPromptModalOpen(false)}
        onLoginClick={() => {
          setIsPromptModalOpen(false);
          setIsAuthModalOpen(true);
        }}
      />
    </>
  );
};

export default Navbar; 