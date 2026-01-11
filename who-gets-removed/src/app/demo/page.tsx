"use client";

import { useState, useEffect } from "react";
import { cases } from "@/data/cases";
import { prompts } from "@/data/prompts";
import { decisions } from "@/data/decisions";

import FaceOverlay from "@/components/demo/FaceOverlay";
import DecisionFlow from "@/components/demo/DecisionFlow";
import ProbabilityBars from "@/components/demo/ProbabilityBars";
import ImageSelector from "@/components/demo/ImageSelector";
import PromptSelector from "@/components/demo/PromptSelector";
import ResultReveal from "@/components/demo/ResultReveal";

import type { CaseId } from "@/types/Case";
import type { PromptId } from "@/types/Prompt";

export default function DemoPage() {
  const [selectedCaseId, setSelectedCaseId] = useState<CaseId>("case-1");
  const [selectedPromptId, setSelectedPromptId] = useState<PromptId>("unnecessary");
  const [showEdited, setShowEdited] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isDark, setIsDark] = useState(false);

  // Initialize theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Set initial theme
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    } else {
      document.documentElement.classList.remove('dark');
      setIsDark(false);
    }
    
    // Also set a data attribute for backup
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  }, []);

  // Toggle theme
  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
    }
    
    // Force a re-render
    setTimeout(() => {
      window.dispatchEvent(new Event('themechange'));
    }, 100);
  };

  useEffect(() => {
    setShowEdited(false);
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 800);
    return () => clearTimeout(timer);
  }, [selectedCaseId, selectedPromptId]);

  const selectedCase = cases.find((c) => c.id === selectedCaseId)!;
  const probabilities = decisions[selectedCaseId][selectedPromptId];
  const selectedFaceId = Object.entries(probabilities)
    .sort((a, b) => b[1] - a[1])[0][0];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white transition-colors duration-300">
      {/* Theme Toggle Floating Button */}
      <button
        onClick={toggleTheme}
        className="fixed top-4 right-4 z-50 p-3 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 shadow-lg transition-all duration-300 hover:scale-110"
        aria-label="Toggle theme"
      >
        {isDark ? (
          <span className="text-xl">☀️</span>
        ) : (
          <span className="text-xl">🌙</span>
        )}
      </button>

      {/* Home Link Floating Button */}
      <a
        href="/"
        className="fixed top-4 left-4 z-50 px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm font-medium shadow-lg transition-all duration-300 hover:scale-105"
      >
        ← Back to Article
      </a>

      {/* Header with gradient background */}
      <div className="relative bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:via-black dark:to-gray-900 border-b border-gray-300 dark:border-gray-800">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-1 w-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400 uppercase tracking-wider">
              Interactive Demo
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
            AI Decision <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">Visualizer</span>
          </h1>
          
          <p className="text-gray-700 dark:text-gray-400 max-w-2xl text-lg leading-relaxed">
            See how AI systems interpret ambiguous prompts by ranking visible individuals.
            Watch decision probabilities unfold in real-time.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Control Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <ImageSelector
            selectedCaseId={selectedCaseId}
            onSelectCase={setSelectedCaseId}
            cases={cases}
            isAnimating={isAnimating}
            isDarkMode={isDark}
          />
          <PromptSelector
            selectedPromptId={selectedPromptId}
            onSelectPrompt={setSelectedPromptId}
            prompts={prompts}
            isAnimating={isAnimating}
            isDarkMode={isDark}
          />
        </div>

        {/* Status Indicator */}
        <div className="flex items-center gap-3 mb-8">
          <div className={`h-2 w-2 rounded-full ${isAnimating ? 'animate-pulse bg-blue-500' : 'bg-green-500'}`}></div>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {isAnimating ? 'Processing selection...' : 'Ready for interaction'}
          </span>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Image */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image with stats header */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-300 dark:border-gray-800 overflow-hidden">
              <div className="p-6 border-b border-gray-300 dark:border-gray-800">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {selectedCase.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {selectedCase.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Top Candidate</div>
                      <div className="text-lg font-bold text-gray-900 dark:text-white">{selectedFaceId.toUpperCase()}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Confidence</div>
                      <div className="text-lg font-bold text-green-600 dark:text-green-400">
                        {Math.round(Math.max(...Object.values(probabilities)) * 100)}%
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Image Container */}
              <div className="p-6">
                <FaceOverlay
                  image={showEdited ? selectedCase.editedImage : selectedCase.image}
                  faces={selectedCase.faces}
                  highlightedFaceId={selectedFaceId}
                  isAnimating={isAnimating}
                  isDarkMode={isDark}
                />
              </div>
            </div>

            {/* Action Button */}
            <ResultReveal
              showEdited={showEdited}
              onReveal={() => setShowEdited(true)}
              isAnimating={isAnimating}
              isDarkMode={isDark}
            />
          </div>

          {/* Right Column - Explanation */}
          <div className="space-y-6">
            <DecisionFlow
              prompt={prompts.find(p => p.id === selectedPromptId)!.label}
              isAnimating={isAnimating}
              isDarkMode={isDark}
            />
            <ProbabilityBars
              probabilities={probabilities}
              isAnimating={isAnimating}
              isDarkMode={isDark}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-gray-300 dark:border-gray-800">
          <div className="max-w-3xl">
            <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-3">Understanding This Demo</h4>
            <p className="text-gray-700 dark:text-gray-500 text-sm leading-relaxed">
              This demonstration reconstructs how AI systems resolve ambiguous requests by ranking visible individuals. 
              Percentages represent relative likelihoods based on learned patterns, not factual judgments about people.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}