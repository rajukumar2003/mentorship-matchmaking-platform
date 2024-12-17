'use client';

import { LogOut, Sun, Moon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { NotificationDropdown } from '../notifications/NotificationDropdown';

export function Navbar() {
  const router = useRouter();

  return (
    <div className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <button
              onClick={() => router.push('/dashboard')}
              className="text-xl font-bold text-indigo-600 hover:text-indigo-700 transition-colors"
            >
              MentorMatch
            </button>
          </div>
          
          <div className="flex items-center space-x-4">
            <NotificationDropdown />
            
            <button
              className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100"
              title="Toggle theme"
            >
              <Sun className="h-5 w-5" />
            </button>
            
            <button
              onClick={() => signOut({callbackUrl : '/login'})}
              className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
            >
              <LogOut className="h-4 w-4" />
              <span>Sign out</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 