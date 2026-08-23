"use client";

import { useState } from "react";

const ratInfo = {
  "S400 Rat": {
    description: "S400 Rat is a newly released and highly advanced all-in-one hacking software designed for Windows, offering a combination of RAT (Remote Access Trojan), HVNC (Hidden Virtual Network Computing), and Worm functionalities. This software enables users to discreetly infiltrate and control the PCs and laptops of unsuspecting victims.",
    features: [
      "Remote Access Trojan (RAT)",
      "Hidden Virtual Network Computing (HVNC)",
      "Fast HVNC feature",
      "UAC bypass",
      "Windows Defender bypass",
      "Credit card stealer",
      "Cookies stealer",
      "Browser login passwords stealer",
      "Keylogger",
      "File grabber",
      "Ransomware",
      "Antikill & Antidelete",
      "Hidden RDP/VNC",
      "Reverse proxy",
      "Cryptocurrency stealer"
    ],
    version: "Latest",
    status: "Active"
  },
  "Xworm Rat ORG": {
    description: "XWorm RAT 5.6 is a newly released and highly advanced all-in-one hacking software designed for Windows, offering a combination of RAT (Remote Access Trojan), HVNC (Hidden Virtual Network Computing), and Worm functionalities. This software enables users to discreetly infiltrate and control the PCs and laptops of unsuspecting victims.",
    features: [
      "Full System Control",
      "Credential Theft",
      "Browser-Stored Data Extraction",
      "Keylogging",
      "File Management",
      "Stealth Mode Access",
      "Login Bypass",
      "Persistent Control",
      "File System Access",
      "Self-Replication",
      "Mass Infection",
      "Automated Spread",
      "Silent Browser Operations",
      "Bypassing Banking Security",
      "Reverse Proxy",
      "Data Exfiltration"
    ],
    version: "5.6",
    status: "Active"
  },
  "Venom Rat": {
    description: "Venom Rat 6.03 is a newly released and highly advanced all-in-one hacking software designed for Windows, offering a combination of RAT (Remote Access Trojan), HVNC (Hidden Virtual Network Computing), and Worm functionalities. Equipped to handle high-stakes cyberattacks, ranging from personal data theft to corporate espionage.",
    features: [
      "Full System Control",
      "Credential Theft",
      "Browser-Stored Data Extraction",
      "Keylogging",
      "File Management",
      "Stealth Mode Access",
      "Login Bypass",
      "Persistent Control",
      "File System Access",
      "Self-Replication",
      "Mass Infection",
      "Automated Spread",
      "Silent Browser Operations",
      "Bypassing Banking Security",
      "Reverse Proxy",
      "Data Exfiltration"
    ],
    version: "6.03",
    status: "Active"
  },
  "Crysome Rat": {
    description: "Coming Soon - Advanced cryptographic RAT with stealth capabilities",
    features: ["Encrypted C2", "Anti-analysis", "Polymorphic", "Rootkit capabilities", "Awaiting detailed specs"],
    version: "TBD",
    status: "Coming Soon"
  },
  "Neptune Rat 5.4": {
    description: "Coming Soon - Latest Neptune RAT version with enhanced features",
    features: ["Real-time monitoring", "Voice recording", "GPS tracking", "SMS interception", "Awaiting detailed specs"],
    version: "5.4",
    status: "Coming Soon"
  },
  "Wizorm Rat 4.5": {
    description: "WizWorm RAT 4.5 is a newly released and highly advanced all-in-one hacking software designed for Windows, offering a combination of RAT (Remote Access Trojan), HVNC (Hidden Virtual Network Computing), and Worm functionalities. Equipped to handle high-stakes cyberattacks with comprehensive features.",
    features: [
      "Full System Control",
      "Credential Theft",
      "Browser-Stored Data Extraction",
      "Keylogging",
      "File Management",
      "Stealth Mode Access",
      "Login Bypass",
      "Persistent Control",
      "File System Access",
      "Self-Replication",
      "Mass Infection",
      "Automated Spread",
      "Silent Browser Operations",
      "Bypassing Banking Security",
      "Reverse Proxy",
      "Data Exfiltration"
    ],
    version: "4.5",
    status: "Active"
  },
};

export function WindowsRatsInfoSection({ gradient, textColor }: { gradient: string; textColor: string }) {
  const [selectedRat, setSelectedRat] = useState<string | null>(null);
  const rats = Object.keys(ratInfo);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#001a00] to-[#000000]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 slide-in-up">
          <h2 className={`text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${gradient} mb-4`}>
            Windows Rats
          </h2>
          <p className="text-lg text-[#00ff00]">
            Select a RAT to view detailed information
          </p>
        </div>

        {/* RAT Buttons Grid */}
        <div className="flex flex-wrap gap-4 justify-center items-center mb-12">
          {rats.map((rat, idx) => (
            <button
              key={rat}
              onClick={() => setSelectedRat(selectedRat === rat ? null : rat)}
              className={`relative px-6 py-2.5 slide-in-up group border transition-all duration-300 rounded-lg cursor-pointer ${
                selectedRat === rat
                  ? "bg-gradient-to-r from-green-600 to-emerald-600 border-[#00ff00]-500 text-white shadow-lg shadow-green-500/50"
                  : "border-[#00ff00]-500/50 bg-green-900/20 hover:bg-green-800/30 text-[#00ff00]-300 hover:text-[#00ff00]-200"
              }`}
              style={{ animationDelay: `${idx * 0.08}s` }}
            >
              <span className="relative z-10 text-sm font-semibold">◆ {rat}</span>
              <div className={`absolute inset-0 bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-lg`}></div>
            </button>
          ))}
        </div>

        {/* RAT Information Card */}
        {selectedRat && ratInfo[selectedRat as keyof typeof ratInfo] && (
          <div className="max-w-3xl mx-auto">
            <div className="group relative slide-in-up overflow-hidden rounded-2xl p-8 backdrop-blur-md border-2 transition-all duration-500 bg-gradient-to-br from-green-900/30 via-slate-900/20 to-black/30 border-green-500/60 hover:border-green-300">
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-green-500 via-emerald-500 to-transparent"></div>

              <div className="relative z-10 space-y-6">
                {/* Title */}
                <div className="flex items-center justify-between">
                  <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-200 to-emerald-200">
                    {selectedRat}
                  </h3>
                  <div className="flex gap-3">
                    <span className="px-3 py-1 rounded-full bg-green-600/30 border border-green-500/50 text-green-300 text-xs font-mono">
                      v{ratInfo[selectedRat as keyof typeof ratInfo].version}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-emerald-600/30 border border-emerald-500/50 text-emerald-300 text-xs font-mono">
                      {ratInfo[selectedRat as keyof typeof ratInfo].status}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-green-200/85 text-lg leading-relaxed">
                  {ratInfo[selectedRat as keyof typeof ratInfo].description}
                </p>

                {/* Features */}
                <div>
                  <h4 className="text-lg font-bold text-green-300 mb-4">Key Features:</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {ratInfo[selectedRat as keyof typeof ratInfo].features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2 p-3 rounded-lg bg-green-600/15 border border-green-500/40 hover:bg-green-600/25 transition-colors"
                      >
                        <span className="text-green-400 font-bold text-lg mt-0.5">◆</span>
                        <span className="text-green-200 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Close Button */}
                <div className="pt-4 border-t border-green-500/20">
                  <button
                    onClick={() => setSelectedRat(null)}
                    className="text-green-400 hover:text-green-300 text-sm font-mono underline transition-colors"
                  >
                    ← Back to RATs
                  </button>
                </div>
              </div>

              {/* Corner Accent */}
              <div className="absolute -bottom-8 -right-8 w-24 h-24 opacity-0 group-hover:opacity-30 transition-opacity duration-500">
                <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-green-400"></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
