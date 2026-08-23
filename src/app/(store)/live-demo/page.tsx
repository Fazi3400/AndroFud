"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import { YouTubeEmbed } from "@/components/home/YouTubeEmbed";

interface VideoItem {
  title: string;
  videoId: string;
}

export default function LiveDemoPage() {
  const [selectedBrand, setSelectedBrand] = useState<"androfud" | "btmob">("androfud");
  const [selectedBtmobVersion, setSelectedBtmobVersion] = useState<"4.6.1" | "3.6.3">("4.6.1");

  const allVideos = {
    androfud: [
      { title: "Androfud v 4.0", videoId: "5oV5Yp3-f-U" },
    ],
    btmob: {
      "4.6.1": [
        { title: "BTMOB 4.6.1 Latest", videoId: "uNS0Gu9MzOM" },
      ],
      "3.6.3": [
        { title: "BTMOB 3.6.3 Other Options", videoId: "B1VBnA4N6Ms" },
        { title: "BTMOB 3.6.3 Target Device Screen Controlling", videoId: "L7XdREoTiMU" },
        { title: "BTMOB 3.6.3 How to Unlock Phone Automatically", videoId: "PwMcEDl_s2Q" },
        { title: "BTMOB APK Installation Process", videoId: "gnyzShP5j8o" },
        { title: "BTMOB 3.6.3 APK Building Process Complete", videoId: "Dpn9EwlCvog" },
      ],
    },
  };

  const currentVideos = useMemo(() => {
    return selectedBrand === "androfud"
      ? allVideos.androfud
      : allVideos.btmob[selectedBtmobVersion];
  }, [selectedBrand, selectedBtmobVersion]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#000000] to-[#000000] pt-32">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="text-center space-y-6 slide-in-up">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-widest uppercase text-transparent bg-clip-text bg-gradient-to-r from-[#0099ff] via-[#a855f7] to-[#000000]">
            Live Demo
          </h1>
          <p className="text-xl text-[#67e8f9]">
            Watch our systems in action
          </p>
        </div>
      </div>

      {/* Brand Selector */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="flex gap-6 justify-center mb-12 flex-wrap">
          <button
            onClick={() => setSelectedBrand("androfud")}
            className={`px-12 py-4 rounded-full font-bold text-lg uppercase tracking-widest transition-all duration-300 border-3 ${
              selectedBrand === "androfud"
                ? "bg-gradient-to-r from-purple-600 to-pink-600 border-[#0099ff] text-white shadow-lg shadow-purple-500/50"
                : "border-[#0099ff]/50 text-[#0099ff] hover:border-[#0099ff] hover:bg-purple-500/10"
            }`}
          >
            AndroFud Demo
          </button>
          <button
            onClick={() => setSelectedBrand("btmob")}
            className={`px-12 py-4 rounded-full font-bold text-lg uppercase tracking-widest transition-all duration-300 border-3 ${
              selectedBrand === "btmob"
                ? "bg-gradient-to-r from-cyan-600 to-blue-600 border-[#0099ff] text-white shadow-lg shadow-cyan-500/50"
                : "border-[#0099ff]/50 text-[#67e8f9] hover:border-[#0099ff] hover:bg-cyan-500/10"
            }`}
          >
            BT Mob Demo
          </button>
        </div>

        {/* BTMOB Version Selector - Only show when BTMOB is selected */}
        {selectedBrand === "btmob" && (
          <div className="flex gap-6 justify-center mb-12">
            <button
              onClick={() => setSelectedBtmobVersion("4.6.1")}
              className={`px-8 py-3 rounded-full font-bold text-md uppercase tracking-widest transition-all duration-300 border-2 ${
                selectedBtmobVersion === "4.6.1"
                  ? "bg-gradient-to-r from-cyan-600 to-blue-600 border-cyan-400 text-white shadow-lg shadow-cyan-500/50"
                  : "border-cyan-500/50 text-cyan-300 hover:border-cyan-400 hover:bg-cyan-500/10"
              }`}
            >
              Version 4.6.1
            </button>
            <button
              onClick={() => setSelectedBtmobVersion("3.6.3")}
              className={`px-8 py-3 rounded-full font-bold text-md uppercase tracking-widest transition-all duration-300 border-2 ${
                selectedBtmobVersion === "3.6.3"
                  ? "bg-gradient-to-r from-cyan-600 to-blue-600 border-cyan-400 text-white shadow-lg shadow-cyan-500/50"
                  : "border-cyan-500/50 text-cyan-300 hover:border-cyan-400 hover:bg-cyan-500/10"
              }`}
            >
              Version 3.6.3
            </button>
          </div>
        )}
      </div>

      {/* Video Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="space-y-12">
          {currentVideos.map((video, idx) => (
            <div
              key={idx}
              className={`group relative overflow-hidden rounded-3xl backdrop-blur-md border-2 transition-all duration-500 hover:shadow-2xl slide-in-up ${
                selectedBrand === "androfud"
                  ? "bg-gradient-to-br from-purple-900/30 via-slate-900/20 to-black/30 border-purple-500/60 hover:border-purple-300 hover:shadow-purple-500/40"
                  : "bg-gradient-to-br from-cyan-900/30 via-slate-900/20 to-black/30 border-cyan-500/60 hover:border-cyan-300 hover:shadow-cyan-500/40"
              }`}
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              {/* Top Border */}
              <div
                className={`absolute top-0 left-0 right-0 h-2 ${
                  selectedBrand === "androfud"
                    ? "bg-gradient-to-r from-purple-500 via-pink-500 to-transparent"
                    : "bg-gradient-to-r from-cyan-500 via-blue-500 to-transparent"
                }`}
              ></div>

              {/* Video Container - YouTube Embed */}
              <YouTubeEmbed videoId={video.videoId} title={video.title} className="rounded-lg" />

              {/* Content */}
              <div className="relative z-10 p-8 space-y-3">
                <h3 className={`text-2xl md:text-3xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r ${
                  selectedBrand === "androfud"
                    ? "group-hover:from-purple-200 group-hover:to-pink-200"
                    : "group-hover:from-cyan-200 group-hover:to-blue-200"
                } transition-all duration-300`}>
                  {video.title}
                </h3>
              </div>

              {/* Corner Accent */}
              <div className={`absolute -bottom-12 -right-12 w-32 h-32 opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none`}>
                <div
                  className={`absolute bottom-0 right-0 w-16 h-16 border-b-3 border-r-3 ${
                    selectedBrand === "androfud" ? "border-purple-400" : "border-cyan-400"
                  }`}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 text-center">
        <Link
          href="/"
          className="inline-block px-8 py-3 rounded-full border-2 border-[#0099ff] text-[#0099ff] font-bold hover:bg-[#0099ff]/10 transition-all duration-300"
        >
          ← Back to Home
        </Link>
      </div>
    </main>
  );
}
