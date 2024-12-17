'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { Check, X } from 'lucide-react';

interface Request {
  id: string;
  status: string;
  sender: {
    userName: string;
    email: string;
  };
  receiver: {
    userName: string;
    email: string;
  };
  createdAt: string;
}

interface RequestListProps {
  requests: Request[];
  type: 'sent' | 'received';
  isLoading: boolean;
  onStatusUpdate?: () => void;
}

export function RequestList({ requests, type, isLoading, onStatusUpdate }: RequestListProps) {
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const handleStatusUpdate = async (requestId: string, status: 'accepted' | 'rejected') => {
    setUpdatingId(requestId);
    try {
      const response = await fetch(`/api/mentorship/request/${requestId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });

      if (response.ok) {
        toast.success(`Request ${status} successfully`);
        onStatusUpdate?.();
      } else {
        const data = await response.json();
        toast.error(data.message || 'Failed to update request');
      }
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setUpdatingId(null);
    }
  };

  if (isLoading) {
    return <div className="flex justify-center py-8">Loading...</div>;
  }

  return (
    <div className="space-y-4">
      {requests.length === 0 ? (
        <p className="text-gray-500">No requests found</p>
      ) : (
        requests.map((request) => (
          <div key={request.id} className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium">
                  {type === 'received' ? request.sender.userName : request.receiver.userName}
                </p>
                <p className="text-sm text-gray-500">
                  {type === 'received' ? request.sender.email : request.receiver.email}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  {new Date(request.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                {type === 'received' && request.status === 'pending' ? (
                  <>
                    <button
                      onClick={() => handleStatusUpdate(request.id, 'accepted')}
                      disabled={!!updatingId}
                      className="p-1 text-green-600 hover:bg-green-50 rounded-full"
                      title="Accept Request"
                    >
                      <Check className="h-5 w-5" />
                    </button>
                    <button
                      title='Reject'
                      onClick={() => handleStatusUpdate(request.id, 'rejected')}
                      disabled={!!updatingId}
                      className="p-1 text-red-600 hover:bg-red-50 rounded-full"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </>
                ) : (
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    request.status === 'accepted' ? 'bg-green-100 text-green-800' :
                    request.status === 'rejected' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {request.status}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
} 