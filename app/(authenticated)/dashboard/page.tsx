'use client';

import { useSession } from 'next-auth/react';
import { WelcomeBanner } from '@/components/dashboard/WelcomeBanner';
import { RequestsOverview } from '@/components/dashboard/RequestsOverview';
import { DiscoverSection } from '@/components/dashboard/DiscoverSection';
import { ProfileOverview } from '@/components/dashboard/ProfileOverview';

export default function DashboardPage() {
  const { data: session } = useSession();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-3">
          <ProfileOverview />
        </div>

        <div className="lg:col-span-6 space-y-6">
          <WelcomeBanner userName={session?.user?.userName} />
          <DiscoverSection />
        </div>

        <div className="lg:col-span-3">
          <RequestsOverview />
        </div>
      </div>
    </div>
  );
}