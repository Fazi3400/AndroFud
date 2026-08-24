"use client";

import { Icons } from "@/components/layouts/icons";

interface FeaturesGridProps {
  features: any[];
  brand: string;
  gradient: string;
  textColor: string;
}

export function FeaturesGrid({
  features,
  brand,
  gradient,
  textColor,
}: FeaturesGridProps) {
  return (
    <section
      className={`py-32 px-4 sm:px-6 lg:px-8 ${brand === "windowstools" ? "bg-gradient-to-b from-blue-950/30 via-slate-900/20 to-blue-950/30" : "bg-gradient-to-b from-[#000000] to-[#000000]"}`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-24 slide-in-up">
          <div className="inline-block mb-6 code-flow">
            <span
              className={`text-sm font-mono px-4 py-2 border rounded-full transition-all ${
                brand === "windowstools"
                  ? "border-cyan-500/60 bg-blue-950/40 text-cyan-400"
                  : `border-[#0099ff]-500/30 bg-purple-500/10 ${textColor}`
              }`}
            >
              $ FEATURES.LOAD()
            </span>
          </div>
          <h2
            className={`text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r ${gradient} mb-6`}
          >
            SYSTEM CAPABILITIES
          </h2>
          <div
            className={`text-xl transition-all ${brand === "windowstools" ? "text-cyan-400/80" : textColor} opacity-80 max-w-2xl mx-auto`}
          >
            Advanced features powered by cutting-edge technology
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, idx) => {
            const IconComponent = Icons[
              feature.icon as keyof typeof Icons
            ] as any;
            return (
              <div
                key={idx}
                className={`group relative code-flow overflow-hidden rounded-2xl p-8 backdrop-blur-sm border-2 transition-all duration-500 hover:scale-105 ${
                  brand === "androfud"
                    ? "bg-gradient-to-br from-purple-900/20 to-pink-900/10 border-purple-500/50 hover:border-purple-400 hover:shadow-lg hover:shadow-purple-500/30"
                    : brand === "windowstools"
                      ? "bg-gradient-to-br from-blue-950/40 via-slate-900/30 to-blue-950/40 border-blue-600/40 hover:border-cyan-500/70 hover:shadow-lg hover:shadow-cyan-500/30"
                      : "bg-gradient-to-br from-cyan-900/20 to-blue-900/10 border-cyan-500/50 hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-500/30"
                }`}
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                {/* Top Border Accent */}
                <div
                  className={`absolute top-0 left-0 right-0 h-1 ${brand === "androfud" ? "bg-gradient-to-r from-purple-500 via-pink-500 to-transparent" : brand === "windowstools" ? "bg-gradient-to-r from-cyan-500/80 via-blue-500/60 to-transparent" : "bg-gradient-to-r from-cyan-500 via-blue-500 to-transparent"}`}
                ></div>

                {/* Icon Container */}
                <div className="mb-6 relative z-10">
                  <div
                    className={`p-4 rounded-xl w-fit transition-all ${
                      brand === "androfud"
                        ? "bg-gradient-to-br from-purple-600/40 to-pink-600/20"
                        : brand === "windowstools"
                          ? "bg-gradient-to-br from-cyan-600/40 to-blue-600/30"
                          : "bg-gradient-to-br from-cyan-600/40 to-blue-600/20"
                    } group-hover:scale-125 transition-transform duration-300`}
                  >
                    {IconComponent && (
                      <IconComponent
                        className={`w-8 h-8 transition-colors ${brand === "androfud" ? "text-purple-300" : brand === "windowstools" ? "text-cyan-400" : "text-cyan-300"}`}
                      />
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="relative z-10 space-y-4">
                  <h3
                    className={`text-2xl font-black transition-all ${brand === "windowstools" ? "text-cyan-400 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-300 group-hover:to-blue-300" : `${brand === "androfud" ? "text-white" : "text-white"} group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r ${brand === "androfud" ? "group-hover:from-purple-300 group-hover:to-pink-300" : "group-hover:from-cyan-300 group-hover:to-blue-300"}`}`}
                  >
                    {feature.title}
                  </h3>
                  <p
                    className={`text-sm leading-relaxed transition-colors ${brand === "windowstools" ? "text-blue-200/80 group-hover:text-cyan-100" : `${brand === "androfud" ? "text-purple-200/80" : "text-cyan-200/80"} group-hover:text-white/90`}`}
                  >
                    {feature.description}
                  </p>
                </div>

                {/* Corner Accent - Bottom Right */}
                <div className="absolute bottom-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-20 transition-opacity duration-300">
                  <div
                    className={`absolute bottom-2 right-2 w-10 h-10 border-b-2 border-r-2 ${brand === "androfud" ? "border-purple-400" : brand === "windowstools" ? "border-cyan-500" : "border-cyan-400"}`}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Divider */}
        <div
          className={`border-t pt-12 text-center ${brand === "windowstools" ? "border-blue-600/40" : "border-[#0099ff]-500/10"}`}
        >
          <p
            className={`text-sm font-mono transition-colors ${brand === "windowstools" ? "text-cyan-500/60" : `${textColor} opacity-50`}`}
          >
            * All features available on all supported platforms
          </p>
        </div>
      </div>
    </section>
  );
}
