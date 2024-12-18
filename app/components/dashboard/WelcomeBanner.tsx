'use client';

import { motion } from 'framer-motion';

export function WelcomeBanner({ userName }: { userName?: string }) {

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-blue-600 via-purple-600 to-violet-600 rounded-xl p-6 text-white shadow-lg relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-white/5 backdrop-blur-sm"></div>
      <div className="relative">
        <h1 className="text-2xl font-bold">
          Welcome, {userName || "there"}! ✨
        </h1>
        <p className="text-lg text-white/90 mt-2 font-medium">
          Your mentorship journey awaits
        </p>
      </div>
    </motion.div>
  );
} 