'use client';

import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';


export function RecommendedMatches() {
  const { data: matches, isLoading } = useQuery({
    queryKey: ['matches'],
    queryFn: async () => {
      const response = await fetch('/api/users/matches');
      if (!response.ok) throw new Error('Failed to fetch matches');
      return response.json();
    },
  });

  const router = useRouter();

  const handleMatchClick = (userName: string) => {
    router.push(`/discover?search=${encodeURIComponent(userName)}`);
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="h-24 bg-gray-200 rounded"></div>
          <div className="h-24 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center gap-2 mb-6">
        <Sparkles className="h-5 w-5 text-yellow-500" />
        <h2 className="text-xl font-semibold">Recommended Matches</h2>
      </div>

      <div className="space-y-4">
        {matches?.matches.length === 0 ? (
          <div className="text-center py-8 bg-gray-50 rounded-lg">
            <p className="text-gray-500">No recommendations available yet</p>
            <p className="text-sm text-gray-400 mt-1">Complete your profile to get matched</p>
          </div>
        ) : (
          matches?.matches.slice(0, 3).map((match, index) => (
            <motion.div
              key={match.userId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => handleMatchClick(match.userName)}
              className="p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg hover:from-indigo-100 hover:to-purple-100 transition-colors cursor-pointer"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{match.userName}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                      {Math.round(match.score)}% Match
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {match.matchedSkills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-1 bg-white/50 text-xs rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
} 