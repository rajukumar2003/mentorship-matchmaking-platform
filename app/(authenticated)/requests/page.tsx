'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { RequestList } from '../../components/requests/RequestList';
import { toast } from 'sonner';

export default function RequestsPage() {
  const { data: session } = useSession();
  const [receivedRequests, setReceivedRequests] = useState([]);
  const [sentRequests, setSentRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await fetch('/api/mentorship/request');
      const data = await response.json();

      if (response.ok) {
        setReceivedRequests(data.receivedRequests);
        setSentRequests(data.sentRequests);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('Failed to fetch requests');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Mentorship Requests</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Received Requests</h2>
          <RequestList 
            requests={receivedRequests}
            type="received"
            isLoading={isLoading}
            onStatusUpdate={fetchRequests}
          />
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-4">Sent Requests</h2>
          <RequestList 
            requests={sentRequests}
            type="sent"
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
} 