'use client';

import { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

interface UserSearchProps {
  initialSearch: string;
  setFilters: (filters: any) => void;
}

export function UserSearch({ initialSearch, setFilters }: UserSearchProps) {
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setFilters((prev: any) => ({
      ...prev,
      search: value
    }));
    
    // Update URL without the search parameter
    const currentParams = new URLSearchParams(searchParams.toString());
    if (value === '') {
      currentParams.delete('search');
    } else {
      currentParams.set('search', value);
    }
    const newUrl = `/discover${currentParams.toString() ? `?${currentParams.toString()}` : ''}`;
    router.push(newUrl);
  };

  const clearSearch = () => {
    handleSearch('');
  };

  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
        className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        placeholder="Search by Skills or Name..."
      />
      {searchTerm && (
        <button
          title='clear'
          onClick={clearSearch}
          className="absolute inset-y-0 right-0 pr-3 flex items-center"
        >
          <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
        </button>
      )}
    </div>
  );
} 