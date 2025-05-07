'use client'

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useSession, signOut } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import AuthModal from './AuthModal';
import LoginPromptModal from './LoginPromptModal';
import {
  Search, User, Settings, LogOut, Bookmark, PlusCircle, CalendarDays, Compass, ChevronDown, List, History,
  FilePlus2, UploadCloud, Sparkles, UserCircle
} from 'lucide-react';
import { useDebouncedCallback } from 'use-debounce';
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"

interface SearchSuggestion {
  id: string;
  title: string;
}

const Navbar = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isCollectionDropdownOpen, setIsCollectionDropdownOpen] = useState(false);
  const [isAddRecipeDropdownOpen, setIsAddRecipeDropdownOpen] = useState(false);
  const [searchInputValue, setSearchInputValue] = useState('');
  const [isPromptModalOpen, setIsPromptModalOpen] = useState(false);

  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [isSuggestionsLoading, setIsSuggestionsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const commandRef = useRef<HTMLDivElement>(null);

  const userDropdownRef = useRef<HTMLDivElement>(null);
  const collectionDropdownRef = useRef<HTMLDivElement>(null);
  const addRecipeDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target as Node)) {
        setIsUserDropdownOpen(false);
      }
      if (collectionDropdownRef.current && !collectionDropdownRef.current.contains(event.target as Node)) {
        setIsCollectionDropdownOpen(false);
      }
       if (addRecipeDropdownRef.current && !addRecipeDropdownRef.current.contains(event.target as Node)) {
         setIsAddRecipeDropdownOpen(false);
       }
      if (commandRef.current && !commandRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [userDropdownRef, collectionDropdownRef, addRecipeDropdownRef]);

  const fetchSuggestions = useCallback(async (query: string) => {
    if (query.trim().length < 1) {
      setSuggestions([]);
      setShowSuggestions(false);
      setIsSuggestionsLoading(false);
      return;
    }
    setIsSuggestionsLoading(true);
    setShowSuggestions(true);
    try {
      const response = await fetch(`/api/search/suggestions?query=${encodeURIComponent(query)}`);
      if (!response.ok) {
        throw new Error('Failed to fetch suggestions');
      }
      const data: SearchSuggestion[] = await response.json();
      setSuggestions(data);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setSuggestions([]);
    } finally {
      setIsSuggestionsLoading(false);
    }
  }, []);

  const debouncedFetchSuggestions = useDebouncedCallback(fetchSuggestions, 300);

  const handleInputValueChange = (value: string) => {
    setSearchInputValue(value);
    debouncedFetchSuggestions(value);
  };

  const handleSuggestionSelect = (suggestion: SearchSuggestion) => {
    setSearchInputValue(suggestion.title);
    setSuggestions([]);
    setShowSuggestions(false);
    router.push(`/recipes/${suggestion.id}`);
  };

  const handleSearchSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    const termToSearch = searchInputValue.trim();
    if (!termToSearch) return;
    setSuggestions([]);
    setShowSuggestions(false);
    router.push(`/search?query=${encodeURIComponent(termToSearch)}`);
  };

  useEffect(() => {
    setShowSuggestions(false);
  }, [pathname]);

  const UserMenu = () => (
    <div className="relative">
      <button onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)} className="flex items-center gap-2">
        {session?.user?.image ? (
          <Image
             src={session.user.image}
             alt="User profile"
             width={32}
             height={32}
             className="h-8 w-8 rounded-full"
           />
        ) : (
          <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">
            <User size={20} className="text-gray-600" />
          </div>
        )}
        <span className="hidden md:inline text-sm font-medium text-gray-700">{session?.user?.name || 'Account'}</span>
        <ChevronDown size={16} className="text-gray-500" />
      </button>

      {isUserDropdownOpen && (
        <div
          ref={userDropdownRef}
          className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 ring-1 ring-black ring-opacity-5"
        >
          <Link
            href="/profile"
            className="flex items-center gap-2 cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={() => setIsUserDropdownOpen(false)}
          >
            <UserCircle size={16} className="text-gray-500"/> Profile
          </Link>
          <Link
            href="/settings"
            className="flex items-center gap-2 cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={() => setIsUserDropdownOpen(false)}
          >
            <Settings size={16} className="text-gray-500"/> Settings
          </Link>
          <button
            onClick={() => { signOut(); setIsUserDropdownOpen(false); }}
            className="flex items-center gap-2 cursor-pointer w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            <LogOut size={16} className="text-gray-500"/> Sign Out
          </button>
        </div>
      )}
    </div>
  );

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
         <ChevronDown size={16} className={`transition-transform text-gray-500 ${isCollectionDropdownOpen ? 'rotate-180' : ''}`} />
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
        <ChevronDown size={16} className={`transition-transform text-gray-500 ${isAddRecipeDropdownOpen ? 'rotate-180' : ''}`} />
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
             <Link href="/generate-recipe" passHref legacyBehavior>
               <a
                 onClick={() => setIsAddRecipeDropdownOpen(false)}
                 className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                 role="menuitem"
               >
                 <Sparkles size={16} className="text-gray-500"/> Generate Recipe
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

           <div className="flex items-center gap-1 md:gap-2">
              <Link href="/" passHref legacyBehavior>
                 <a className="px-3 py-2 rounded-md hover:bg-yellow-500/20 transition-colors text-black flex items-center gap-1.5 text-sm font-medium">
                   <Compass size={16} />
                   <span className="hidden sm:inline">Discover</span>
                 </a>
              </Link>

              <CollectionDropdown />

              <AddRecipeDropdown />

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

          <div className="flex items-center gap-4 flex-grow justify-end">
            <div className="relative flex-grow max-w-xs lg:max-w-sm" ref={commandRef}>
              <Command shouldFilter={false} className="rounded-md border border-gray-300 bg-white shadow-sm">
                 <div className="relative">
                   <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                   <CommandInput
                      value={searchInputValue}
                      onValueChange={handleInputValueChange}
                      onFocus={() => searchInputValue.length > 0 && setShowSuggestions(true)}
                      onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                        if (e.key === 'Enter' && searchInputValue.trim().length > 0) {
                           handleSearchSubmit();
                           e.preventDefault(); 
                        }
                 }}
                 placeholder="Search recipes..."
                      className="pl-10 h-9"
                      disabled={status === 'loading'}
                   />
                 </div>
                {showSuggestions && (
                  <CommandList className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50 max-h-60 overflow-y-auto">
                    {isSuggestionsLoading ? (
                      <div className="p-2 text-sm text-gray-500 text-center">Loading...</div>
                    ) : suggestions.length > 0 ? (
                      suggestions.map((suggestion) => (
                        <CommandItem
                          key={suggestion.id}
                          value={suggestion.title}
                          onSelect={() => handleSuggestionSelect(suggestion)}
                          className="cursor-pointer"
                        >
                          {suggestion.title}
                        </CommandItem>
                      ))
                    ) : (
                      <CommandEmpty>No results found.</CommandEmpty>
                    )}
                  </CommandList>
                )}
              </Command>
           </div>

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