import React from 'react';
import { PlusIcon } from '@heroicons/react/24/solid';

interface AddToAlbumButtonProps {
  onClick: () => void;
  size?: 'small' | 'medium'; // Optional size prop
}

export default function AddToAlbumButton({ onClick, size = 'medium' }: AddToAlbumButtonProps) {
  const sizeClasses = size === 'small' ? 'w-5 h-5' : 'w-6 h-6'; // Adjust sizes as needed

  return (
    <button
      onClick={(e) => {
        e.stopPropagation(); // Prevent card's onClick from firing
        onClick();
      }}
      className="p-1 rounded-full text-gray-500 hover:text-blue-600 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-150"
      aria-label="Add recipe to album"
    >
      <PlusIcon className={sizeClasses} />
    </button>
  );
} 