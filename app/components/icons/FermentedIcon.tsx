import React from 'react';

interface FermentedIconProps {
  className?: string;
  'aria-hidden'?: boolean;
}

const FermentedIcon: React.FC<FermentedIconProps> = ({ className = '', ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      {/* Jar lid */}
      <path d="M8 3h8" />
      <path d="M9 3v2" />
      <path d="M15 3v2" />
      
      {/* Jar body */}
      <path d="M7 5h10v14a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V5z" />
      
      {/* Bubbles */}
      <circle cx="11" cy="10" r="1" />
      <circle cx="14" cy="14" r="1" />
      <circle cx="10" cy="16" r="1" />
      <circle cx="13" cy="12" r="1" />
      <circle cx="12" cy="8" r="1" />
    </svg>
  );
};

export default FermentedIcon; 