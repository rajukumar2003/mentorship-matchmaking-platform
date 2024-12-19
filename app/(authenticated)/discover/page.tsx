'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { UserSearch } from '../../components/discover/UserSearch'
import { UserList } from '../../components/discover/UserList';
import { Filters } from '../../components/discover/Filters';
import { toast } from 'sonner';

export default function DiscoverPage() {
  const searchParams = useSearchParams();
  const [users, setUsers] = useState([]);
  const [filters, setFilters] = useState({
    role: '',
    skills: [],
    interests: [],
    search: searchParams.get('search') || ''
  });
  const [isLoading, setIsLoading] = useState(true);

  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    try {
      const queryParams = new URLSearchParams({
        role: filters.role,
        skills: filters.skills.join(','),
        interests: filters.interests.join(','),
        search: filters.search
      }).toString();

      const response = await fetch(`/api/users/discover?${queryParams}`);
      const data = await response.json();
      
      if (response.ok) {
        setUsers(data.users);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(`Failed to fetch users, ${error}`);
    } finally {
      setIsLoading(false);
    }
  }, [filters]);


  useEffect(() => {
    fetchUsers();
  }, [filters, fetchUsers]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Discover Mentors & Mentees</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1">
          <Filters filters={filters} setFilters={setFilters} />
        </div>
        <div className="md:col-span-3">
          <UserSearch initialSearch={filters.search} setFilters={setFilters} />
          <UserList users={users} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}