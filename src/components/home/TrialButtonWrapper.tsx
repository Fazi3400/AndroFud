"use client";

import { useState } from "react";
import { TrialModal } from "./TrialModal";

export function TrialButtonWrapper() {
  const [isTrialModalOpen, setIsTrialModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsTrialModalOpen(true)}
        className="group relative px-8 py-4 rounded-full font-bold text-lg uppercase tracking-widest transition-all duration-300 overflow-hidden border-2 bg-gradient-to-r from-purple-600 to-pink-600 border-purple-400/50 text-white hover:shadow-2xl hover:shadow-purple-500/50 hover:scale-105"
      >
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-20 bg-gradient-to-r from-purple-600 to-pink-600"></div>

        {/* Glow Effect */}
        <div className="absolute inset-0 rounded-full opacity-100 blur-lg -z-10 bg-gradient-to-r from-purple-600 to-pink-600"></div>

        {/* Text */}
        <span className="relative z-10 flex items-center gap-2">
          🎯 Try Androfud Free
          <span className="inline-block group-hover:translate-x-1 transition-all">
            →
          </span>
        </span>
      </button>

      <TrialModal
        isOpen={isTrialModalOpen}
        onClose={() => setIsTrialModalOpen(false)}
      />
    </>
  );
}
