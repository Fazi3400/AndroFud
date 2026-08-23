"use client";

import Link from "next/link";
import Image from "next/image";

interface HeroSectionProps {
  brand: string;
  content: any;
}

export function HeroSection({ brand, content }: HeroSectionProps) {
  return (
    <section className={`relative w-full min-h-screen flex items-center justify-center overflow-hidden pt-32 sm:pt-40 bg-gradient-to-br ${content.bgFrom} ${content.bgTo}`}>
      {/* Brand Background Videos */}
      {brand === "androfud" && (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src="/androfud-bg.mp4" type="video/mp4" />
        </video>
      )}
      {brand === "btmob" && (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src="/btmob-bg.mp4" type="video/mp4" />
        </video>
      )}
      {brand === "windowstools" && (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src="/assets/videos/intro.mp4" type="video/mp4" />
        </video>
      )}

      {/* Animated Grid Background */}
      <div className="absolute inset-0 cyber-grid opacity-30 z-0"></div>

      {/* Gradient Background */}
      <div className="absolute inset-0 z-0">
        <div className={`absolute inset-0 bg-gradient-to-br ${content.gradient} opacity-20`}></div>
      </div>

      {/* Video Overlay - Dark shade for text readability */}
      <div className="absolute inset-0 z-1 bg-black/40"></div>

      {/* Animated Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden z-2">
        <div className={`absolute -top-20 -right-20 w-40 h-40 sm:w-96 sm:h-96 ${brand === "androfud" ? "bg-purple-500" : "bg-cyan-500"} rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse`}></div>
        <div
          className={`absolute -bottom-20 -left-20 w-40 h-40 sm:w-96 sm:h-96 ${brand === "androfud" ? "bg-pink-500" : "bg-blue-500"} rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse`}
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className={`absolute top-1/2 left-1/3 w-32 h-32 sm:w-80 sm:h-80 ${brand === "androfud" ? "bg-indigo-500" : "bg-purple-500"} rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-pulse`}
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      {/* Animated Floating Code Elements */}
      <div className="absolute inset-0 z-3 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute font-mono text-xs opacity-20 text-[#0099ff]-400 whitespace-nowrap floating"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
            }}
          >
            {'<'} {['ACCESS', 'SECURE', 'LOCKED', 'BYPASS', 'ACTIVE'][i]} {'>'}
          </div>
        ))}
      </div>


      {/* Content */}
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-20 h-full flex items-center justify-center">
        <div className="text-center space-y-8 sm:space-y-12 slide-in-up w-full">
          {/* Welcome Text - Responsive */}
          <div className={`text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black tracking-widest uppercase ${content.textColor} leading-tight max-w-full mx-auto`} style={{ animation: "glitch-text 3s ease-in-out infinite, neonGlow 2s ease-in-out infinite" }}>
            <div>Welcome</div>
            <div>to</div>
            <div>
              {brand === "androfud"
                ? "AndroFud"
                : brand === "windowstools"
                ? "Windows Hacking"
                : "BT Mob"}
            </div>
          </div>
        </div>
      </div>

      {/* Scanning Effect */}
      <div className="absolute inset-0 z-30 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black opacity-20"></div>
      </div>
    </section>
  );
}
