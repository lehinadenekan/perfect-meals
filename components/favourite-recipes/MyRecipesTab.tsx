    // app/components/favourites/MyRecipesTab.tsx
    'use client';

    import React from 'react';

    export default function MyRecipesTab() {
      // TODO: Fetch and display user's created recipes here

      return (
        <div>
          <h2 className="text-xl font-semibold mb-4">My Recipes</h2>
          <p>User&apos;s created recipes will go here.</p>
          {/* Add recipe list, create button link, etc. */}
          {/* Example: Display the empty state from the screenshot */}
           <div className="text-center py-10 text-gray-500">
              You haven&apos;t created any recipes yet.
           </div>
        </div>
      );
    }