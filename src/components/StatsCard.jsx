import React from 'react';
import { motion } from 'framer-motion';

export const StatsCard = ({ title, value, icon: Icon, colorClass, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="bg-white dark:bg-slate-900 p-3 sm:p-6 rounded-xl shadow-md border border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2 sm:gap-4 transition-shadow hover:shadow-lg"
    >
      <div className="flex flex-col gap-0.5 sm:gap-1 text-left min-w-0">
        <span className="text-[10px] sm:text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider truncate">
          {title}
        </span>
        <span className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-white leading-tight">
          {value}
        </span>
      </div>
      <div className={`p-2 sm:p-3.5 rounded-xl ${colorClass} text-white shadow-md flex items-center justify-center shrink-0`}>
        <Icon className="w-4 h-4 sm:w-5.5 sm:h-5.5" />
      </div>
    </motion.div>
  );
};

export default StatsCard;
