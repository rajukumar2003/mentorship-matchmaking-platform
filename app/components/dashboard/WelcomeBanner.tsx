'use client';

import { motion } from 'framer-motion';

export function WelcomeBanner({ userName }: { userName?: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-xl p-4 text-white shadow-lg"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">
            Welcome back, {userName || 'there'}! 👋
          </h1>
          <p className="text-sm text-indigo-100 mt-1">
            Find your perfect mentor match today
          </p>
        </div>
      </div>
    </motion.div>
  );
} 