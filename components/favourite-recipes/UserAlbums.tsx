// components/favourite-recipes/UserAlbums.tsx
'use client';

import React from 'react';
import AlbumManager from '@/components/albums/AlbumManager';
// --- Import Album Type ---
import type { FetchedAlbum } from '@/components/albums/AlbumManager'; // Adjust path/source if needed

// --- Define props interface ---
interface UserAlbumsProps {
    onViewAlbum: (album: FetchedAlbum) => void;
}

// --- Update component signature to accept props ---
const UserAlbums = ({ onViewAlbum }: UserAlbumsProps) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow">
      {/* Render the AlbumManager and pass down the onViewAlbum prop */}
      <AlbumManager onViewAlbum={onViewAlbum} />
    </div>
  );
};

export default UserAlbums;