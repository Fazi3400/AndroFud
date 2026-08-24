"use client";

import { useState } from "react";
import Link from "next/link";

export function FloatingOfferBadge() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <>
      <style>{`
        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(236, 72, 153, 0.6), 0 0 40px rgba(236, 72, 153, 0.3);
            transform: scale(1);
          }
          50% {
            box-shadow: 0 0 30px rgba(236, 72, 153, 0.9), 0 0 60px rgba(236, 72, 153, 0.5);
            transform: scale(1.05);
          }
        }

        @keyframes float-up {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        .floating-badge {
          animation: pulse-glow 2s ease-in-out infinite, float-up 3s ease-in-out infinite;
        }
      `}</style>

      <div className="fixed top-24 right-6 z-40 floating-badge">
        <Link
          href="/?brand=androfud#features"
          className="block relative bg-gradient-to-r from-pink-600 to-purple-600 rounded-full p-6 text-center min-w-max border-2 border-pink-400 hover:border-pink-300 transition-all duration-300 hover:shadow-2xl"
        >
          {/* Close Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsVisible(false);
            }}
            className="absolute -top-2 -right-2 bg-gray-800 text-white rounded-full w-7 h-7 flex items-center justify-center text-lg hover:bg-gray-700 transition-all"
          >
            ×
          </button>

          {/* Content */}
          <div className="space-y-1">
            <div className="text-xs font-bold text-pink-100 uppercase tracking-widest">
              🎉 MEGA OFFER
            </div>
            <div className="text-2xl font-black text-white">30% OFF</div>
            <div className="text-xs text-pink-100 font-semibold">
              All Products
            </div>
            <div className="pt-2 border-t border-pink-400 mt-2">
              <span className="text-xs font-bold text-yellow-300">
                ⏰ Limited Time
              </span>
            </div>
          </div>

          {/* Animated Dots */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
            <span className="w-1.5 h-1.5 bg-yellow-300 rounded-full animate-bounce"></span>
            <span
              className="w-1.5 h-1.5 bg-yellow-300 rounded-full animate-bounce"
              style={{ animationDelay: "0.1s" }}
            ></span>
            <span
              className="w-1.5 h-1.5 bg-yellow-300 rounded-full animate-bounce"
              style={{ animationDelay: "0.2s" }}
            ></span>
          </div>
        </Link>
      </div>
    </>
  );
}
