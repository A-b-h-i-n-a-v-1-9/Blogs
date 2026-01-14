"use client";

import { motion } from "framer-motion";
import type { PromptId, Prompt } from "@/types/Prompt";

interface Props {
  selectedPromptId: PromptId;
  onSelectPrompt: (id: PromptId) => void;
  prompts: Prompt[];
  isAnimating: boolean;
  isDarkMode: boolean;
}

export default function PromptSelector({ selectedPromptId, onSelectPrompt, prompts, isAnimating }: Props) {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-5 border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 transition-colors duration-300">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
          <svg className="w-5 h-5 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </div>
        <div>
          <h3 className="font-medium text-gray-900 dark:text-white">AI Prompt</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">Choose what to analyze</p>
        </div>
      </div>

      <div className="space-y-3">
        {prompts.map((p) => {
          const isSelected = p.id === selectedPromptId;
          return (
            <motion.button
              key={p.id}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => !isAnimating && onSelectPrompt(p.id)}
              disabled={isAnimating}
              className={`w-full p-4 rounded-lg transition-all duration-300 text-left ${
                isSelected
                  ? 'bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800'
                  : 'bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50'
              } ${isAnimating ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${isSelected ? 'bg-purple-100 dark:bg-purple-800' : 'bg-gray-100 dark:bg-gray-700'}`}>
                  <svg className="w-4 h-4 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-1">{p.label}</h4>
                </div>
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                  />
                )}
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}