"use client";

import { motion } from "framer-motion";
import { DecisionMap } from "@/types/Decision";

interface Props {
  probabilities: DecisionMap;
  isAnimating?: boolean;
  isDarkMode: boolean;
}

export default function ProbabilityBars({ probabilities, isAnimating = false }: Props) {
  const sorted = Object.entries(probabilities).sort((a, b) => b[1] - a[1]);

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800 transition-colors duration-300">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <div>
          <h3 className="font-medium text-gray-900 dark:text-white">Confidence Distribution</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">AI's certainty for each person</p>
        </div>
      </div>

      <div className="space-y-4">
        {sorted.map(([id, value], index) => {
          const percent = Math.round(value * 100);
          const isTop = index === 0;

          return (
            <motion.div
              key={id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: isAnimating ? 0.5 : 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="group"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    isTop
                      ? 'bg-purple-100 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-800'
                      : 'bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700'
                  }`}>
                    <span className={`font-medium ${isTop ? 'text-purple-700 dark:text-purple-300' : 'text-gray-700 dark:text-gray-300'}`}>
                      {id.toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <span className={`font-medium ${isTop ? 'text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'}`}>
                      Person {id}
                    </span>
                    {isTop && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="inline-flex items-center gap-1 ml-2 px-2 py-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                      >
                        <span className="text-xs text-white">Selected</span>
                      </motion.div>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <span className={`text-xl font-bold ${
                    isTop
                      ? 'text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400'
                      : 'text-gray-700 dark:text-gray-300'
                  }`}>
                    {percent}%
                  </span>
                </div>
              </div>

              <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${percent}%` }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                  className={`h-full rounded-full ${
                    isTop
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500'
                      : 'bg-gradient-to-r from-gray-400 to-gray-500 dark:from-gray-600 dark:to-gray-500'
                  }`}
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}