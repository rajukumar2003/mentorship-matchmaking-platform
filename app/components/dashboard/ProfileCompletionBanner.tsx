'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AlertCircle } from 'lucide-react';

interface ProfileCompletionBannerProps {
  userName: string;
}

export function ProfileCompletionBanner({ userName }: ProfileCompletionBannerProps) {
  const [dismissed, setDismissed] = useState(false);
  const router = useRouter();

  if (dismissed) return null;

  return (
    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <AlertCircle className="h-5 w-5 text-yellow-400" />
        </div>
        <div className="ml-3 flex-1 md:flex md:justify-between">
          <p className="text-sm text-yellow-700">
            Welcome {userName}! Complete your profile to get personalized recommendations
          </p>
          <div className="mt-3 flex space-x-3 md:mt-0 md:ml-6">
            <button
              onClick={() => router.push('/profile')}
              className="text-sm font-medium text-yellow-700 hover:text-yellow-600 underline"
            >
              Complete Profile
            </button>
            <button
              onClick={() => setDismissed(true)}
              className="text-sm font-medium text-yellow-700 hover:text-yellow-600"
            >
              Dismiss
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 