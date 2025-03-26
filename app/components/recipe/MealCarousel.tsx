import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { Recipe } from '@/app/types/recipe';
import RecipeCard from './RecipeCard';
import FlagSubmission from './FlagSubmission';

interface MealCarouselProps {
  recipes: Recipe[];
  isLoading?: boolean;
}

const MealCarousel: React.FC<MealCarouselProps> = ({ recipes, isLoading = false }) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);
  const [flaggedRecipe, setFlaggedRecipe] = useState<Recipe | null>(null);

  // Card dimensions
  const cardWidth = 240; // width of the card
  const cardGap = 20; // gap between cards
  const scrollAmount = cardWidth + cardGap; // amount to scroll

  // Check scroll position on mount and window resize
  useEffect(() => {
    const checkScrollPosition = () => {
      if (!carouselRef.current) return;
      
      setShowLeftButton(carouselRef.current.scrollLeft > 0);
      setShowRightButton(
        carouselRef.current.scrollLeft < 
        carouselRef.current.scrollWidth - carouselRef.current.clientWidth - 10
      );
    };

    // Initial check
    checkScrollPosition();

    // Add resize listener
    window.addEventListener('resize', checkScrollPosition);
    return () => window.removeEventListener('resize', checkScrollPosition);
  }, [recipes]);

  const scroll = (direction: 'left' | 'right') => {
    if (!carouselRef.current) return;

    const currentScroll = carouselRef.current.scrollLeft;
    const newScroll = direction === 'left' 
      ? currentScroll - scrollAmount 
      : currentScroll + scrollAmount;

    carouselRef.current.scrollTo({
      left: newScroll,
      behavior: 'smooth'
    });

    // Update button visibility after scroll
    setTimeout(() => {
      if (!carouselRef.current) return;
      setShowLeftButton(carouselRef.current.scrollLeft > 0);
      setShowRightButton(
        carouselRef.current.scrollLeft < 
        carouselRef.current.scrollWidth - carouselRef.current.clientWidth - 10
      );
    }, 300);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[500px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!recipes.length) {
    return (
      <div className="flex justify-center items-center h-[500px] bg-gray-50 rounded-xl">
        <div className="text-center">
          <p className="text-gray-600 text-lg mb-2">No meals found</p>
          <p className="text-gray-500">Try adjusting your dietary preferences</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Flag Submission Modal */}
      {flaggedRecipe && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4">
            <FlagSubmission
              recipe={flaggedRecipe}
              onBack={() => setFlaggedRecipe(null)}
            />
          </div>
        </div>
      )}

      {/* Left Navigation Button */}
      {showLeftButton && (
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-300 transform hover:scale-110"
          aria-label="Previous recipes"
        >
          <ChevronLeftIcon className="h-6 w-6 text-gray-600" />
        </button>
      )}

      {/* Carousel Container */}
      <div
        ref={carouselRef}
        className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide scroll-smooth"
        style={{ 
          scrollbarWidth: 'none', 
          msOverflowStyle: 'none' 
        }}
        onScroll={() => {
          if (!carouselRef.current) return;
          setShowLeftButton(carouselRef.current.scrollLeft > 0);
          setShowRightButton(
            carouselRef.current.scrollLeft < 
            carouselRef.current.scrollWidth - carouselRef.current.clientWidth - 10
          );
        }}
      >
        {recipes.map((recipe) => (
          <div 
            key={recipe.id} 
            className="flex-none animate-fadeIn transition-transform duration-300"
            style={{ width: `${cardWidth}px` }}
          >
            <RecipeCard 
              recipe={recipe} 
              onFlagClick={() => setFlaggedRecipe(recipe)}
            />
          </div>
        ))}
      </div>

      {/* Right Navigation Button */}
      {showRightButton && (
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-300 transform hover:scale-110"
          aria-label="Next recipes"
        >
          <ChevronRightIcon className="h-6 w-6 text-gray-600" />
        </button>
      )}
    </div>
  );
};

export default MealCarousel; 