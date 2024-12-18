'use client';

import { useRouter } from 'next/navigation';
import { User, Settings } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useProfile } from '@/providers/ProfileContext';

export function ProfileOverview() {
  const { profile, isLoading } = useProfile();
  const router = useRouter();
  const { data: session } = useSession();

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Profile</h2>
        </div>
        <div className="text-center py-4">
          <User className="h-12 w-12 mx-auto text-gray-400" />
          <p className="mt-2 text-gray-500">Welcome {session?.user?.email}!</p>
          <p className="text-sm text-gray-400 mt-1">Complete your profile to get started</p>
          <button
            onClick={() => router.push('/profile')}
            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Set up profile
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Profile</h2>
        <button
          onClick={() => router.push('/profile')}
          className="text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
        >
          <Settings className="h-4 w-4" />
          <span className="text-sm">Update Profile</span>
        </button>
      </div>
      
      <div className="space-y-4">
        <div>
          <p className="text-sm text-gray-500">Role</p>
          <p className="font-medium capitalize">{profile.role}</p>
        </div>
        
        <div>
          <p className="text-sm text-gray-500">Skills</p>
          <div className="flex flex-wrap gap-2 mt-1">
            {profile.skills.split(',').map((skill) => (
              <span
                key={skill}
                className="px-2 py-1 bg-gray-100 text-xs rounded-full"
              >
                {skill.trim()}
              </span>
            ))}
          </div>
        </div>
        
        <div>
          <p className="text-sm text-gray-500">Bio</p>
          <p className="text-sm">{profile.bio}</p>
        </div>
      </div>
    </div>
  );
} 