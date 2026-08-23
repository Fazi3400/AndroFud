"use client";

interface TechSpecsProps {
  brand: string;
  gradient: string;
  textColor: string;
}

export function TechSpecs({ brand, gradient, textColor }: TechSpecsProps) {
  const specs = brand === "windowstools" ? [
    {
      category: "SYSTEM SUPPORT",
      items: ["Windows 7 - Windows 11", "32-bit & 64-bit", "All Hardware", "Universal Compatibility"],
    },
    {
      category: "SECURITY FEATURES",
      items: ["Military-Grade Encryption", "Anti-Forensics", "Rootkit Detection Bypass", "Auto-Update"],
    },
    {
      category: "PERFORMANCE",
      items: ["99.9% Uptime", "<50ms Latency", "Multi-Server Network", "Auto-Reconnect"],
    },
    {
      category: "SUPPORT",
      items: ["24/7 Technical Support", "Live Chat Assistance", "Email Support", "Priority Updates"],
    },
  ] : [
    {
      category: "COMPATIBILITY",
      items: ["Android 7.0 - 16+", "All Devices", "No Root Required", "Multi-Language"],
    },
    {
      category: "SECURITY",
      items: ["256-bit AES Encryption", "Anti-Decompile", "FuD Service", "Auto-Update"],
    },
    {
      category: "PERFORMANCE",
      items: ["99.9% Uptime", "<100ms Latency", "Multi-Server", "Auto-Reconnect"],
    },
    {
      category: "SUPPORT",
      items: ["24/7 Assistance", "Live Chat", "Email Support", "Priority Access"],
    },
  ];

  return (
    <section className={`py-32 px-4 sm:px-6 lg:px-8 ${brand === "windowstools" ? "bg-gradient-to-b from-blue-950/30 via-slate-900/20 to-blue-950/30" : "bg-gradient-to-b from-[#1e0b3e] to-[#0f2a3d]"}`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-24 slide-in-up">
          <div className="inline-block mb-6 code-flow">
            <span className={`text-sm font-mono px-4 py-2 border rounded-full transition-all ${
              brand === "windowstools"
                ? "border-cyan-500/60 bg-blue-950/40 text-cyan-400"
                : `border-[#0099ff]-500/30 bg-purple-500/10 ${textColor}`
            }`}>
              $ SPECS.ANALYZE()
            </span>
          </div>
          <h2 className={`text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r ${gradient} mb-6`}>
            TECHNICAL SPECIFICATIONS
          </h2>
        </div>

        {/* Specs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {specs.map((spec, idx) => (
            <div
              key={idx}
              className={`group relative code-flow overflow-hidden rounded-2xl p-8 backdrop-blur-sm border-2 transition-all duration-500 hover:scale-105 ${
                brand === "androfud"
                  ? "bg-gradient-to-br from-purple-900/20 to-pink-900/10 border-purple-500/50 hover:border-purple-400 hover:shadow-lg hover:shadow-purple-500/30"
                  : brand === "windowstools"
                  ? "bg-gradient-to-br from-blue-950/40 via-slate-900/30 to-blue-950/40 border-blue-600/40 hover:border-cyan-500/70 hover:shadow-lg hover:shadow-cyan-500/30"
                  : "bg-gradient-to-br from-cyan-900/20 to-blue-900/10 border-cyan-500/50 hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-500/30"
              }`}
              style={{ animationDelay: `${idx * 0.15}s` }}
            >
              {/* Top Border Accent */}
              <div className={`absolute top-0 left-0 right-0 h-1 ${brand === "androfud" ? "bg-gradient-to-r from-purple-500 via-pink-500 to-transparent" : brand === "windowstools" ? "bg-gradient-to-r from-cyan-500/80 via-blue-500/60 to-transparent" : "bg-gradient-to-r from-cyan-500 via-blue-500 to-transparent"}`}></div>

              {/* Category Header */}
              <h3 className={`text-sm font-black uppercase tracking-widest mb-6 relative inline-block px-3 py-1 rounded-lg border-2 transition-all ${
                brand === "androfud"
                  ? "border-purple-500/60 bg-purple-600/30 text-white"
                  : brand === "windowstools"
                  ? "border-cyan-500/50 bg-blue-950/40 text-cyan-400 group-hover:border-cyan-400/80 group-hover:bg-blue-950/60"
                  : "border-cyan-500/60 bg-cyan-600/30 text-white group-hover:border-white group-hover:bg-white/10"
              }`}>
                {spec.category}
              </h3>

              {/* Spec Items */}
              <div className="space-y-4 mt-6">
                {spec.items.map((item, itemIdx) => (
                  <div key={itemIdx} className="flex items-start gap-3 group/item">
                    <div className={`mt-1.5 w-2.5 h-2.5 rounded-full flex-shrink-0 group-hover/item:scale-150 transition-transform ${brand === "androfud" ? "bg-gradient-to-r from-purple-400 to-pink-400" : brand === "windowstools" ? "bg-gradient-to-r from-cyan-500 to-blue-500" : "bg-gradient-to-r from-cyan-400 to-blue-400"}`}></div>
                    <span className={`text-sm font-mono leading-relaxed transition-colors ${brand === "androfud" ? "text-purple-200/90 group-hover/item:text-white" : brand === "windowstools" ? "text-blue-200/80 group-hover/item:text-cyan-100" : "text-cyan-200/90 group-hover/item:text-white"}`}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              {/* Corner Accent - Bottom Right */}
              <div className="absolute bottom-0 right-0 w-16 h-16 opacity-0 group-hover:opacity-15 transition-opacity duration-300">
                <div className={`absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 ${brand === "androfud" ? "border-purple-400" : brand === "windowstools" ? "border-emerald-600" : "border-cyan-400"}`}></div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Info */}
        <div className={`mt-20 p-8 rounded-2xl text-center code-flow border-2 backdrop-blur-sm transition-all duration-300 hover:shadow-lg ${
          brand === "androfud"
            ? "bg-gradient-to-r from-purple-900/20 to-pink-900/10 border-purple-500/40 hover:border-purple-400 hover:shadow-purple-500/20"
            : brand === "windowstools"
            ? "bg-gradient-to-r from-emerald-900/20 to-teal-900/15 border-emerald-600/40 hover:border-emerald-500/70 hover:shadow-emerald-500/15"
            : "bg-gradient-to-r from-cyan-900/20 to-blue-900/10 border-cyan-500/40 hover:border-cyan-400 hover:shadow-cyan-500/20"
        }`} style={{ animationDelay: "0.6s" }}>
          <p className={`text-sm font-mono transition-colors ${brand === "windowstools" ? "text-emerald-400" : textColor} opacity-90`}>
            ✓ All specifications verified and tested on real systems
          </p>
        </div>
      </div>
    </section>
  );
}
