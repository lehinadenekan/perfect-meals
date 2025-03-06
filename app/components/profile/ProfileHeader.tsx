import { User } from 'next-auth';
import Image from 'next/image';

interface ProfileHeaderProps {
  user: User & {
    image?: string | null;
    name?: string | null;
    email?: string | null;
  };
}

export default function ProfileHeader({ user }: ProfileHeaderProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center space-x-6">
        <div className="relative h-24 w-24">
          {user.image ? (
            <Image
              src={user.image}
              alt={user.name || 'Profile picture'}
              className="rounded-full"
              fill
              style={{ objectFit: 'cover' }}
            />
          ) : (
            <div className="h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-3xl text-gray-500">
                {user.name?.[0]?.toUpperCase() || '?'}
              </span>
            </div>
          )}
        </div>
        
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {user.name || 'Anonymous User'}
          </h1>
          <p className="text-gray-600">{user.email}</p>
          
          <div className="mt-4">
            <div className="flex items-center space-x-2">
              <div className="flex-1 h-2 bg-gray-200 rounded-full">
                <div className="h-2 bg-primary rounded-full" style={{ width: '25%' }}></div>
              </div>
              <span className="text-sm text-gray-600">25% Complete</span>
            </div>
            <p className="mt-1 text-sm text-gray-500">
              Complete your profile to get better meal recommendations
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 