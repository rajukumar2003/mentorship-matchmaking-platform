'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { UserSearch } from '../../components/discover/UserSearch'
import { UserList } from '../../components/discover/UserList';
import { Filters } from '../../components/discover/Filters';
import { toast } from 'sonner';

export default function DiscoverPage() {
  const { data: session } = useSession();
  const [users, setUsers] = useState([]);
  const [filters, setFilters] = useState({
    role: '',
    skills: [],
    interests: [],
    search: ''
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, [filters]);

  const fetchUsers = async () => {
    try {
      const queryParams = new URLSearchParams({
        role: filters.role,
        skills: filters.skills.join(','),
        interests: filters.interests.join(','),
        search: filters.search || ''
      });

      const response = await fetch(`/api/users/discover?${queryParams}`);
      const data = await response.json();
      
      if (response.ok) {
        setUsers(data.users);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('Failed to fetch users');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Discover Mentors & Mentees</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1">
          <Filters filters={filters} setFilters={setFilters} />
        </div>
        <div className="md:col-span-3">
          <UserSearch setFilters={setFilters} />
          <UserList users={users} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
} 