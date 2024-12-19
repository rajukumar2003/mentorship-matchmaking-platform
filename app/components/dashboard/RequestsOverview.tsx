'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

interface Request {
  id: string;
  status: string;
  sender: {
    userName: string;
  };
  receiver: {
    userName: string;
  };
  createdAt: string;
}

export function RequestsOverview() {
  const [pendingRequests, setPendingRequests] = useState<Request[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetchRequests();
  }, []);
  
  const fetchRequests = async () => {
    try {
      const response = await fetch('/api/mentorship/request');
      const data = await response.json();
      if (response.ok) {
        const pending = data.receivedRequests.filter(
          (req: Request) => req.status === 'pending'
        );
        setPendingRequests(pending);
      }
    } catch (error) {
      console.error('Failed to fetch requests:', error);
    }
  };

  const handleStatusUpdate = async (requestId: string, status: 'accepted' | 'rejected') => {
    try {
      const response = await fetch(`/api/mentorship/request/${requestId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });

      if (response.ok) {
        toast.success(`Request ${status} successfully`);
        fetchRequests(); // Refresh the requests
      } else {
        const data = await response.json();
        toast.error(data.message || 'Failed to update request');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-lg font-semibold">Pending Requests</h2>
          <p className="text-gray-500 text-sm mt-1">
            Respond to your connection requests
          </p>
        </div>
        <button 
          onClick={() => router.push('/requests')}
          className="text-indigo-600 hover:text-indigo-800 flex items-center gap-1 text-base"
        >
          View all <ArrowRight className="h-4 w-4" />
        </button>
      </div>
      
      <div className="space-y-4">
        {pendingRequests.length === 0 ? (
          <div className="text-center py-8 bg-gray-50 rounded-lg">
            <p className="text-gray-500">No pending requests</p>
          </div>
        ) : (
          pendingRequests.slice(0, 5).map((request) => (
            <div 
              key={request.id} 
              className="flex justify-between items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex-1">
                <h3 className="font-medium">{request.sender.userName}</h3>
                <p className="text-sm text-gray-500">
                  Wants to connect with you
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  {new Date(request.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleStatusUpdate(request.id, 'accepted')}
                  className="px-3 py-1.5 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors text-sm font-medium"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleStatusUpdate(request.id, 'rejected')}
                  className="px-3 py-1.5 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors text-sm font-medium"
                >
                  Decline
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
} 