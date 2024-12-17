'use client';

import { useState } from 'react';
import { toast } from 'sonner';

interface User {
  id: string;
  User: {
    userName: string;
    email: string;
  };
  role: string;
  skills: string;
  bio: string;
}

interface UserListProps {
  users: User[];
  isLoading: boolean;
}

export function UserList({ users, isLoading }: UserListProps) {
  const [requestLoading, setRequestLoading] = useState<string | null>(null);

  const handleConnect = async (userId: string) => {
    
      setRequestLoading(userId);
    try {
      const response = await fetch('/api/mentorship/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ receiverId: userId }),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success('Connection request sent!');
      } else {
        toast.error(data.message || 'Failed to send request');
      }
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setRequestLoading(null);
    }
  };

  if (isLoading) {
    return <div className="flex justify-center py-8">Loading...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
      {users.map((user) => (
        <div key={user.id} className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold">{user.User.userName}</h3>
              <p className="text-sm text-gray-500 capitalize">{user.role}</p>
            </div>
          </div>
          
          <div className="mt-4">
            <p className="text-sm text-gray-600">{user.bio}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {user.skills.split(',').map((skill) => (
                <span
                  key={skill}
                  className="px-2 py-1 bg-gray-100 text-xs rounded-full"
                >
                  {skill.trim()}
                </span>
              ))}
            </div>
          </div>

          <button
            onClick={() => handleConnect(user.userId)}
            disabled={requestLoading === user.id}
            className="mt-4 w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {requestLoading === user.id ? 'Sending...' : 'Connect'}
          </button>
        </div>
      ))}
    </div>
  );
} 