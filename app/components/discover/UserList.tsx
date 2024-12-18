'use client';

import { useState, useEffect } from 'react';
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
  const [connectionStatus, setConnectionStatus] = useState<Record<string, string>>({});

  useEffect(() => {
    fetchExistingRequests();
  }, []);

  const fetchExistingRequests = async () => {
    try {
      const response = await fetch('/api/mentorship/request');
      const data = await response.json();
      
      // Create a map of userId to request status
      const statusMap: Record<string, string> = {};
      [...data.sentRequests, ...data.receivedRequests].forEach((req: any) => {
        statusMap[req.receiverId] = req.status;
        statusMap[req.senderId] = req.status;
      });
      
      setConnectionStatus(statusMap);
    } catch (error) {
      console.error('Failed to fetch requests:', error);
    }
  };

  const getButtonText = (userId: string) => {
    const status = connectionStatus[userId];
    if (status === 'pending') return 'Request Pending';
    if (status === 'accepted') return 'Connected';
    if (status === 'rejected') return 'Connect';
    return 'Connect';
  };

  const handleConnect = async (userId: string) => {
    setRequestLoading(userId);
    
    try {
      const promise = fetch('/api/mentorship/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ receiverId: userId }),
      });

      toast.promise(promise, {
        loading: 'Sending...',
        success: 'Connection request sent!',
        error: 'Failed to send request',
      });

        const response = await promise;

      if (!response.ok) {
          const errorData = await response.json();
          toast.error(`${errorData.message}`)
        throw new Error(errorData.message || 'Failed to send request');
      }

    } catch (error) {
        console.error("Failed to connect, try again!",error)
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
            disabled={requestLoading === user.id || connectionStatus[user.userId] === 'accepted' || connectionStatus[user.userId] === 'pending'}
            className="mt-4 w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {requestLoading === user.id ? 'Sending...' : getButtonText(user.userId)}
          </button>
        </div>
      ))}
    </div>
  );
} 