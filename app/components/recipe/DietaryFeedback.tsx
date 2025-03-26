'use client';

import { FlagIcon } from '@heroicons/react/24/outline';

interface DietaryFeedbackProps {
  onFlagClick?: () => void;
}

export function DietaryFeedback({ onFlagClick }: DietaryFeedbackProps) {
  return (
    <button
      onClick={onFlagClick}
      className="text-gray-500 hover:text-gray-700 group relative"
      aria-label="Report recipe issue"
    >
      <FlagIcon className="h-5 w-5" />
      <span className="invisible group-hover:visible absolute -top-8 left-0 whitespace-nowrap bg-gray-800 text-white text-xs rounded px-2 py-1">
        Report recipe issue
      </span>
    </button>
  );
} 