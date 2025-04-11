// components/shared/LoadingSpinner.tsx
import React from 'react';
import { Loader2 } from 'lucide-react'; // Make sure lucide-react is installed

const LoadingSpinner = () => {
  // Using fixed size classes (h-6 w-6). Adjust as needed (e.g., h-5 w-5).
  // Added text color for visibility against different backgrounds.
  return (
    <Loader2 className="h-6 w-6 animate-spin text-gray-700" />
  );
};

export default LoadingSpinner;
