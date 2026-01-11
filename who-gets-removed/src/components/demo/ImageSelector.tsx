"use client";

import { motion } from "framer-motion";
import type { CaseId, Case } from "@/types/Case";

interface Props {
  selectedCaseId: CaseId;
  onSelectCase: (id: CaseId) => void;
  cases: Case[];
  isAnimating: boolean;
  isDarkMode: boolean;
}

export default function ImageSelector({ 
  selectedCaseId, 
  onSelectCase, 
  cases, 
  isAnimating,
  isDarkMode 
}: Props) {
  return (
    <div className={`rounded-xl p-5 border transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gray-900 border-gray-800 hover:border-gray-700' 
        : 'bg-white border-gray-300 hover:border-gray-400'
    }`}>
      <div className="flex items-center gap-3 mb-4">
        <div className={`p-2 rounded-lg ${
          isDarkMode ? 'bg-blue-900/30' : 'bg-blue-100'
        }`}>
          <svg className={`w-5 h-5 ${
            isDarkMode ? 'text-blue-400' : 'text-blue-600'
          }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <div>
          <h3 className={`font-medium ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>Scenario</h3>
          <p className={`text-sm ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>Choose an image to analyze</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {cases.map((c) => {
          const isSelected = c.id === selectedCaseId;
          return (
            <motion.button
              key={c.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => !isAnimating && onSelectCase(c.id)}
              disabled={isAnimating}
              className={`relative overflow-hidden rounded-lg transition-all duration-300 ${
                isSelected
                  ? isDarkMode ? 'ring-2 ring-blue-400' : 'ring-2 ring-blue-500'
                  : isDarkMode ? 'ring-1 ring-gray-700' : 'ring-1 ring-gray-300'
              } ${isAnimating ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <div className="aspect-video relative overflow-hidden">
                <img
                  src={c.image}
                  alt={c.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent ${
                  isSelected ? 'opacity-70' : 'opacity-50'
                }`} />
              </div>
              <div className="absolute bottom-3 left-3 right-3 text-left">
                <h4 className="font-medium text-white text-sm mb-1">{c.title}</h4>
              </div>
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-3 right-3 w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center"
                >
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}