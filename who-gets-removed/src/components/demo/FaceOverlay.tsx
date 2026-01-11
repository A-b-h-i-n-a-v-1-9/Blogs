"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Face } from "@/types/Face";

interface Props {
  image: string;
  faces: Face[];
  highlightedFaceId?: string;
  isAnimating?: boolean;
  isDarkMode: boolean;
}

export default function FaceOverlay({
  image,
  faces,
  highlightedFaceId,
  isAnimating = false,
  isDarkMode
}: Props) {
  return (
    <div className={`relative rounded-xl overflow-hidden border transition-colors duration-300 ${
      isDarkMode ? 'border-gray-800 bg-gray-900' : 'border-gray-300 bg-gray-100'
    }`}>
      
      {isAnimating && (
        <div className={`absolute inset-0 backdrop-blur-sm z-10 flex items-center justify-center ${
          isDarkMode ? 'bg-gray-900/90' : 'bg-gray-800/80'
        }`}>
          <div className="flex flex-col items-center gap-3">
            <div className="relative">
              <div className={`w-12 h-12 border-3 rounded-full ${
                isDarkMode ? 'border-gray-700' : 'border-gray-300'
              }`}></div>
              <div className={`absolute inset-0 w-12 h-12 border-3 border-transparent rounded-full animate-spin ${
                isDarkMode ? 'border-t-blue-400' : 'border-t-blue-500'
              }`}></div>
            </div>
            <p className={`text-sm ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Analyzing image...
            </p>
          </div>
        </div>
      )}

      <motion.div
        initial={{ opacity: 0.9, scale: 1.01 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Image
          src={image}
          alt="Case image"
          width={1200}
          height={800}
          className="w-full h-auto"
          priority
        />
      </motion.div>

      {/* Face Overlays */}
      {faces.map((face) => {
        const isHighlighted = face.id === highlightedFaceId;

        return (
          <motion.div
            key={face.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className={`absolute rounded-lg transition-all duration-500 ${
              isHighlighted
                ? `border-3 ${isDarkMode ? 'border-blue-400' : 'border-blue-500'} ${
                    isDarkMode 
                      ? 'shadow-[0_0_30px_rgba(96,165,250,0.6)]' 
                      : 'shadow-[0_0_30px_rgba(59,130,246,0.5)]'
                  }`
                : `border-2 ${isDarkMode ? 'border-gray-500' : 'border-gray-300'}`
            }`}
            style={{
              left: `${face.x}%`,
              top: `${face.y}%`,
              width: `${face.width}%`,
              height: `${face.height}%`,
            }}
          >
            {/* Label */}
            <div className={`absolute -top-8 left-0 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 ${
              isHighlighted
                ? `bg-gradient-to-r ${
                    isDarkMode ? 'from-blue-500 to-purple-500' : 'from-blue-600 to-purple-600'
                  } text-white shadow-lg`
                : `${isDarkMode ? 'bg-gray-700/90 text-gray-200' : 'bg-gray-800/90 text-gray-300'}`
            }`}>
              <div className="flex items-center gap-2">
                <span>{face.id.toUpperCase()}</span>
                {isHighlighted && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-2 h-2 bg-white rounded-full"
                  />
                )}
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}