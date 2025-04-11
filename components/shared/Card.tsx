import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
  title: string;
  description: string;
  isSelected: boolean;
  onClick: () => void;
  icon?: React.ReactNode;
  tooltipPosition?: 'top' | 'bottom';
}

const Card = ({ title, description, isSelected, onClick, icon, tooltipPosition = 'top' }: CardProps) => {
  return (
    <div className="group relative">
      {/* Tooltip */}
      <div className={cn(
        "absolute left-1/2 -translate-x-1/2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10",
        tooltipPosition === 'top' ? "-top-12" : "top-full mt-2"
      )}>
        {description}
        {/* Arrow */}
        <div className={cn(
          "absolute left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 transform rotate-45",
          tooltipPosition === 'top' ? "-bottom-1" : "-top-1"
        )}></div>
      </div>

      {/* Card */}
      <div
        onClick={onClick}
        className={cn(
          "relative p-6 rounded-xl shadow-lg cursor-pointer transition-all duration-300 transform hover:scale-105",
          "border-2",
          isSelected 
            ? "bg-yellow-100 border-yellow-500" 
            : "bg-white border-transparent hover:border-yellow-200"
        )}
      >
        <div className="flex items-center justify-between">
          {icon && <div className="flex-shrink-0 w-8 h-8 mr-4">{icon}</div>}
          <h3 className="text-lg font-semibold flex-1 text-center">{title}</h3>
          {isSelected && (
            <div className="absolute top-3 right-3">
              <svg
                className="w-6 h-6 text-yellow-500"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card; 