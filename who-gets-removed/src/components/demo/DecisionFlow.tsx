// src/components/demo/DecisionFlow.tsx (UPDATED FOR DARK/LIGHT MODE)
"use client";

import { motion } from "framer-motion";

interface Props {
  prompt: string;
  isAnimating?: boolean;
}

export default function DecisionFlow({ prompt, isAnimating = false }: Props) {
  const steps = [
    {
      title: "Visual Analysis",
      description: "Detects faces, positions, and visual prominence",
      icon: "👁️",
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Context Understanding",
      description: "Applies learned patterns about social roles",
      icon: "🧠",
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "Prompt Resolution",
      description: "Resolves ambiguous meaning to specific interpretation",
      icon: "🎯",
      color: "from-green-500 to-emerald-500",
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <h3 className="font-medium text-gray-900 dark:text-white">Decision Process</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">How AI interprets the prompt</p>
        </div>
      </div>

      <div className="mb-6 p-4 bg-gray-100 dark:bg-gray-800/50 rounded-lg border border-gray-300 dark:border-gray-700">
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">User Prompt</p>
        <p className="text-lg font-medium text-gray-900 dark:text-white">
          "{prompt}"
        </p>
      </div>

      <div className="space-y-4">
        {steps.map((step, index) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: isAnimating ? 0.5 : 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-800/30 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/30 transition-colors border border-gray-200 dark:border-gray-700/50"
          >
            <div className={`p-3 rounded-lg bg-gradient-to-br ${step.color} bg-opacity-20`}>
              <span className="text-xl">{step.icon}</span>
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-gray-900 dark:text-white mb-1">{step.title}</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">{step.description}</p>
            </div>
            <div className="text-xs font-medium text-gray-500 dark:text-gray-400 px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded">
              Step {index + 1}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}