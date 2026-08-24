"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

interface BrandSelectorProps {
  brand: string;
}

export function BrandSelector({ brand }: BrandSelectorProps) {
  const [hoveredBrand, setHoveredBrand] = useState<string | null>(null);

  useEffect(() => {
    if (!hoveredBrand) return;

    const timer = setTimeout(() => {
      setHoveredBrand(null);
    }, 15000); // 15 seconds

    return () => clearTimeout(timer);
  }, [hoveredBrand]);

  const submenus = {
    btmob: ["3.6.3", "4.6.1"],
    windowstools: [
      "S400",
      "XWORM",
      "WIZORM",
      "CRYSOME",
      "VENOM RAT",
      "NEPTUNE",
    ],
  };

  return (
    <section className="w-full bg-gradient-to-r from-[#000000] via-[#0a0a0a] to-[#000000]">
      {/* Main Brand Buttons */}
      <div className="mt-0 pt-12 sm:pt-10 md:pt-12 pb-6 md:pb-8 px-3 sm:px-4 lg:px-8 border-b border-[#0099ff]/20 bg-gradient-to-r from-[#000000] via-[#0a0a0a] to-[#000000]">
        <div className="max-w-7xl mx-auto">
          <div
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 justify-center items-center"
            style={{ animation: "slideInUp 0.8s ease-out both" }}
          >
            {/* ANDROFUD */}
            <Link
              href="/?brand=androfud"
              className={`flex items-center justify-center gap-2 sm:gap-3 md:gap-4 px-4 sm:px-6 md:px-12 py-2 sm:py-3 md:py-4 rounded-full font-bold text-sm sm:text-base md:text-lg lg:text-xl uppercase tracking-widest transition-all duration-300 border-2 sm:border-4 w-full sm:w-auto ${
                brand === "androfud"
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 border-purple-400 text-white shadow-lg shadow-purple-500/50"
                  : "border-[#0099ff]-500/50 text-[#0099ff]-300 hover:border-[#0099ff]-500 hover:bg-purple-500/10"
              }`}
            >
              <Image
                src="/androfud-icon.ico"
                alt="AndroFud"
                width={40}
                height={40}
                className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10"
              />
              ANDROFUD
            </Link>

            {/* BTMOB */}
            <div
              onMouseEnter={() => setHoveredBrand("btmob")}
              className="w-full sm:w-auto"
            >
              <Link
                href="/?brand=btmob"
                className={`flex items-center justify-center gap-2 sm:gap-3 md:gap-4 px-4 sm:px-6 md:px-12 py-2 sm:py-3 md:py-4 rounded-full font-bold text-sm sm:text-base md:text-lg lg:text-xl uppercase tracking-widest transition-all duration-300 border-2 sm:border-4 w-full sm:w-auto ${
                  brand === "btmob"
                    ? "bg-gradient-to-r from-cyan-600 to-blue-600 border-cyan-400 text-white shadow-lg shadow-cyan-500/50"
                    : "border-[#0099ff]-500/50 text-[#67e8f9]-300 hover:border-[#0099ff]-500 hover:bg-cyan-500/10"
                }`}
              >
                <Image
                  src="/btmob-icon.ico"
                  alt="BtMob"
                  width={40}
                  height={40}
                  className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10"
                />
                BT MOB
              </Link>
            </div>

            {/* WINDOWS TOOLS */}
            <div
              onMouseEnter={() => setHoveredBrand("windowstools")}
              className="w-full sm:w-auto"
            >
              <Link
                href="/?brand=windowstools"
                className={`flex items-center justify-center gap-2 sm:gap-3 md:gap-4 px-4 sm:px-6 md:px-12 py-2 sm:py-3 md:py-4 rounded-full font-bold text-sm sm:text-base md:text-lg lg:text-xl uppercase tracking-widest transition-all duration-300 border-2 sm:border-4 w-full sm:w-auto ${
                  brand === "windowstools"
                    ? "bg-gradient-to-r from-green-600 to-emerald-600 border-green-400 text-white shadow-lg shadow-green-500/50"
                    : "border-[#00ff00]-500/50 text-[#00ff00]-300 hover:border-[#00ff00]-500 hover:bg-green-500/10"
                }`}
              >
                <Image
                  src="/windowstools-icon.ico"
                  alt="Windows Tools"
                  width={40}
                  height={40}
                  className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10"
                />
                WINDOWS TOOLS
              </Link>
            </div>

            {/* DRAGNOROID RAT */}
            <Link
              href="/?brand=dragnoroid"
              className={`flex items-center justify-center gap-2 sm:gap-3 md:gap-4 px-4 sm:px-6 md:px-12 py-2 sm:py-3 md:py-4 rounded-full font-bold text-sm sm:text-base md:text-lg lg:text-xl uppercase tracking-widest transition-all duration-300 border-2 sm:border-4 w-full sm:w-auto ${
                brand === "dragnoroid"
                  ? "bg-gradient-to-r from-orange-600 to-red-600 border-orange-400 text-white shadow-lg shadow-orange-500/50"
                  : "border-[#ff6b00]/50 text-[#ff8c00] hover:border-[#ff6b00] hover:bg-orange-500/10"
              }`}
            >
              <Image
                src="/Dragnoroid Rat.png"
                alt="Dragnoroid"
                width={40}
                height={40}
                className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10"
              />
              DRAGNOROID
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Submenu Bar */}
      {hoveredBrand && (
        <div className="bg-gradient-to-r from-[#0a0a2e] via-[#1a0a3e] to-[#0a0a2e] border-t border-b border-[#0099ff]-500/30 py-3 px-4">
          <div className="max-w-7xl mx-auto flex gap-4 justify-center flex-wrap">
            {hoveredBrand === "btmob" &&
              submenus.btmob.map((version) => (
                <Link
                  key={version}
                  href={`/?brand=btmob&version=${version}`}
                  className="px-6 py-2 bg-cyan-600/30 hover:bg-cyan-600/60 border border-cyan-500/50 rounded-lg text-cyan-300 hover:text-white font-bold transition-all"
                >
                  BTMOB {version}
                </Link>
              ))}
            {hoveredBrand === "windowstools" &&
              submenus.windowstools.map((rat) => (
                <Link
                  key={rat}
                  href={`/?brand=windowstools&rat=${rat}`}
                  className="px-6 py-2 bg-green-600/30 hover:bg-green-600/60 border border-green-500/50 rounded-lg text-green-300 hover:text-white font-bold transition-all"
                >
                  {rat}
                </Link>
              ))}
          </div>
        </div>
      )}
    </section>
  );
}
