'use client';

import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { ArrowRight } from 'lucide-react';

interface User {
  id: string;
  User: {
    userName: string;
  };
  role: string;
  skills: string;
}

export function DiscoverSection() {
  const { data: users } = useQuery({
    queryKey: ['discover', 'recent'],
    queryFn: async () => {
      const response = await fetch('/api/users/discover');
      if (!response.ok) throw new Error('Failed to fetch users');
      const data = await response.json();
      return data.users.slice(0, 3);
    },
  });

  const router = useRouter();

  const handleUserClick = (user: User) => {
    router.push(`/discover?search=${encodeURIComponent(user.User.userName)}`);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Discover</h2>
        <button 
          onClick={() => router.push('/discover')}
          className="text-indigo-600 hover:text-indigo-800 flex items-center gap-1 text-base"
        >
          View all <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      <div className="grid gap-4">
        {users?.map((user) => (
          <div 
            key={user.id} 
            onClick={() => handleUserClick(user)}
            className="p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">{user.User.userName}</h3>
                <p className="text-sm text-gray-500 capitalize">{user.role}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {user.skills.split(',').slice(0, 2).map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-1 bg-gray-200 text-xs rounded-full"
                  >
                    {skill.trim()}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 