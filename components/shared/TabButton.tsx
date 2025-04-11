// components/shared/TabButton.tsx
'use client';

import React from 'react';

interface TabButtonProps {
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

const TabButton: React.FC<TabButtonProps> = ({ isActive, onClick, children }) => {
  const baseStyle = "px-4 py-2 rounded-md transition-colors text-sm font-medium";
  const activeStyle = "bg-white text-gray-900 shadow";
  const inactiveStyle = "text-gray-700 hover:bg-white/50 hover:text-gray-800";

  return (
    <button
      onClick={onClick}
      className={`${baseStyle} ${isActive ? activeStyle : inactiveStyle}`}
    >
      {children}
    </button>
  );
};

export default TabButton;