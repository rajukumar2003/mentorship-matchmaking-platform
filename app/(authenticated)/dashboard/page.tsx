'use client';

import { useSession } from 'next-auth/react';
import { ProfileProvider } from '@/providers/ProfileContext';
import { WelcomeBanner } from '@/components/dashboard/WelcomeBanner';
import { RequestsOverview } from '@/components/dashboard/RequestsOverview';
import { DiscoverSection } from '@/components/dashboard/DiscoverSection';
import { ProfileOverview } from '@/components/dashboard/ProfileOverview';
import { RecommendedMatches } from '@/components/dashboard/RecommendedMatches';
import { useProfile } from '@/providers/ProfileContext';
import { ProfileCompletionBanner } from '@/components/dashboard/ProfileCompletionBanner';

function DashboardContent() {
  const { data: session } = useSession();
  const { profile } = useProfile();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {!profile && (
        <ProfileCompletionBanner userName={session?.user?.name || ''} />
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-3">
          <ProfileOverview />
        </div>

        <div className="lg:col-span-6 space-y-6">
          <WelcomeBanner userName={ session?.user?.name || ''} />
          <RecommendedMatches />
          <DiscoverSection />
        </div>

        <div className="lg:col-span-3">
          <RequestsOverview />
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <ProfileProvider>
      <DashboardContent />
    </ProfileProvider>
  );
}