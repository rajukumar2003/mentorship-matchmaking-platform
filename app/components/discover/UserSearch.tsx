'use client';

import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';

interface UserSearchProps {
  initialSearch: string;
  setFilters: (filters: any) => void;
}

export function UserSearch({ initialSearch, setFilters }: UserSearchProps) {
  const [searchTerm, setSearchTerm] = useState(initialSearch);

  useEffect(() => {
    setSearchTerm(initialSearch);
    handleSearch(initialSearch);
  }, [initialSearch]);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setFilters((prev: any) => ({
      ...prev,
      search: value
    }));
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
        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        placeholder="Search by Skills or Name..."
      />
    </div>
  );
} 