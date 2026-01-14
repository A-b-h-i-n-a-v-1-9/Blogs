"use client";

import { motion } from "framer-motion";

interface Props {
  showEdited: boolean;
  onReveal: () => void;
  isAnimating: boolean;
  isDarkMode: boolean;
}

export default function ResultReveal({ showEdited, onReveal, isAnimating }: Props) {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800 transition-colors duration-300">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <div>
          <h3 className="font-medium text-gray-900 dark:text-white">Visual Edit</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">See the AI's final output</p>
        </div>
      </div>

      <p className="text-gray-700 dark:text-gray-300 mb-6">
        The visual edit occurs after the decision is made, showing how the AI would modify the image based on its analysis.
      </p>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onReveal}
        disabled={showEdited || isAnimating}
        className={`w-full py-4 rounded-xl font-medium transition-all duration-300 ${
          showEdited
            ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800'
            : 'bg-gradient-to-r from-green-500 to-emerald-500 hover:shadow-lg hover:shadow-green-500/25 text-white'
        } ${isAnimating ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
      >
        {showEdited ? (
          <div className="flex items-center justify-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Edited Result Shown
          </div>
        ) : (
          <div className="flex items-center justify-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            Reveal Edited Result
          </div>
        )}
      </motion.button>
    </div>
  );
}