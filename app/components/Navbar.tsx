import React from 'react';

const Navbar = () => {
  return (
    <nav className="w-full bg-[#ffc800] p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-black text-xl font-bold">
          Perfect Meals
        </div>
        <div className="flex gap-4">
          <button className="px-4 py-2 bg-white rounded-md hover:bg-gray-100 transition-colors text-black">
            Guest Mode
          </button>
          <button className="px-4 py-2 bg-white rounded-md hover:bg-gray-100 transition-colors text-black">
            Log In
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 