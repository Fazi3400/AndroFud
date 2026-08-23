"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { GoogleDriveEmbed } from "./GoogleDriveEmbed";
import { YouTubeEmbed } from "./YouTubeEmbed";

const getRatFolderName = (ratName: string): string => {
  const folderMap: { [key: string]: string } = {
    "S400 Rat": "s400-rat",
    "Xworm Rat ORG": "xworm-rat",
    "Venom Rat": "venom-rat",
    "Crysome Rat": "crysome-rat",
    "Neptune Rat 5.4": "neptune-rat",
    "Wizorm Rat 4.5": "wizorm-rat",
  };
  return folderMap[ratName] || ratName.toLowerCase().replace(/\s+/g, "-");
};

const ratsData = {
  "S400 Rat": {
    videoId: "1e8thTQ5w1ri8JBdTxEdR3zRVdFxL3FoZ",
    videoType: "google-drive",
    description: "S400 Rat is a newly released and highly advanced all-in-one hacking software designed for Windows, offering a combination of RAT (Remote Access Trojan), HVNC (Hidden Virtual Network Computing), and Worm functionalities. This software enables users to discreetly infiltrate and control the PCs and laptops of unsuspecting victims. S400 rat is designed as a multi-purpose hacking tool, equipped to handle high-stakes cyberattacks, ranging from personal data theft to corporate espionage. The integration of RAT, HVNC, and Worm functionalities makes it one of the most comprehensive tools available for silent hacking and unauthorized system access.",
    keyFeatures: [
      "Remote Access Trojan (RAT) - Allows full remote control with password theft and browser data access",
      "Hidden Virtual Network Computing (HVNC) - Operates in stealth mode with login bypass capabilities",
      "Worm Functionality - Spreads malicious payloads to thousands of devices efficiently",
      "Stealing Bank Login Details - Obtain and exploit sensitive financial information",
      "Silent Browser Operations - Perform hidden browser sessions to bypass security measures",
      "Reverse Proxy - Create secure backdoor for persistent control over infected systems",
      "Bypass Security Layers - Circumvent protections like two-factor authentication",
      "File Theft and Management - Access, steal, or modify files unnoticed"
    ],
    features: [
      "Fast HVNC feature",
      "Login without proxy error",
      "File grabber",
      "Networking",
      "Anarchy stealer",
      "UAC bypass",
      "Windows defender bypass",
      "Credit card stealer",
      "Cookies stealer",
      "Browser login passwords stealer",
      "Ransomware",
      "Antikill & Antidelete",
      "System Sound Control",
      "Regedit",
      "Firewall Control",
      "Task manager enable/disable",
      "Updates enable/disable",
      ".Net 3.5 install",
      "Invoke BSOD",
      "Active windows monitor",
      "TCP connection",
      "Startup manager",
      "Process manager",
      "Service manager",
      "Installed programs",
      "Clipboard manager",
      "Report windows",
      "Keylogger",
      "File searcher",
      "Message box",
      "Botkiller",
      "Windows defender disable",
      "Information monitor",
      "Run and execute files/scripts",
      "Task manager control",
      "Firewall bypass",
      "Shell access",
      "File manager",
      "Remote chat",
      "System control",
      "Hidden VNC viewer",
      "HWID",
      "OS version",
      "Permission control",
      "Password recovery",
      "Google maps integration",
      "Auto startup",
      "Persistence",
      "Downloader",
      "Icon changer",
      "Kill browsers",
      "USDT coin stealer",
      "Windows Defender kill + disable",
      "Disable windows updates",
      "Auto UAC Bypass",
      "Wifi key stealer",
      "Hidden RDP",
      "Ngrok installer",
      "Cryptocurrency stealer",
      "Telegram bot",
      "DDOS"
    ],
    version: "Latest"
  },
  "Xworm Rat ORG": {
    videoId: null,
    videoType: "youtube",
    description: "XWorm RAT 5.6 is a newly released and highly advanced all-in-one hacking software designed for Windows, offering a combination of RAT (Remote Access Trojan), HVNC (Hidden Virtual Network Computing), and Worm functionalities. This software enables users to discreetly infiltrate and control the PCs and laptops of unsuspecting victims. XWorm RAT 5.6 is designed as a multi-purpose hacking tool, equipped to handle high-stakes cyberattacks, ranging from personal data theft to corporate espionage. The integration of RAT, HVNC, and Worm functionalities makes it one of the most comprehensive tools available for silent hacking and unauthorized system access.",
    keyFeatures: [
      "Remote Access Trojan (RAT) - Complete remote control with password theft capabilities",
      "Hidden Virtual Network Computing (HVNC) - Stealth mode with invisible access and login bypass",
      "Worm Functionality - Spreads malicious payloads to thousands of devices efficiently",
      "Stealing Bank Login Details - Obtain and exploit sensitive financial information",
      "Silent Browser Operations - Perform hidden browser sessions to bypass security",
      "Reverse Proxy - Create secure backdoor for persistent control",
      "Bypass Security Layers - Circumvent two-factor authentication and banking security",
      "File Theft and Management - Access, steal, or modify files unnoticed"
    ],
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
      "Stealth Techniques",
      "Data Exfiltration",
      "Custom Payloads",
      "Integration with Exploits",
      "Persistence Mechanisms",
      "Simple Configuration",
      "Automation Tools",
      "Detailed Monitoring"
    ],
    version: "5.6"
  },
  "Venom Rat": {
    videoId: "QwtoZfpaiMk",
    videoType: "youtube",
    description: "Venom Rat 6.03 is a newly released and highly advanced all-in-one hacking software designed for Windows, offering a combination of RAT (Remote Access Trojan), HVNC (Hidden Virtual Network Computing), and Worm functionalities. This software enables users to discreetly infiltrate and control the PCs and laptops of unsuspecting victims. Venom Rat 6.03 is designed as a multi-purpose hacking tool, equipped to handle high-stakes cyberattacks, ranging from personal data theft to corporate espionage. The integration of RAT, HVNC, and Worm functionalities makes it one of the most comprehensive tools available for silent hacking and unauthorized system access.",
    keyFeatures: [
      "Remote Access Trojan (RAT) - Full remote control with password theft and browser data access",
      "Hidden Virtual Network Computing (HVNC) - Stealth mode access with banking platform bypass",
      "Worm Functionality - Spreads payloads to thousands of devices with minimal effort",
      "Stealing Bank Login Details - Obtain and exploit sensitive financial information",
      "Silent Browser Operations - Perform hidden browser sessions to bypass security measures",
      "Reverse Proxy - Create secure backdoor for persistent control over infected systems",
      "Bypass Security Layers - Circumvent two-factor authentication and advanced banking security",
      "File Theft and Management - Access, steal, or modify files on victim's machine unnoticed"
    ],
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
      "Stealth Techniques",
      "Data Exfiltration",
      "Custom Payloads",
      "Integration with Exploits",
      "Persistence Mechanisms",
      "Simple Configuration",
      "Automation Tools",
      "Detailed Monitoring"
    ],
    version: "6.03"
  },
  "Crysome Rat": {
    videoId: "O1Dj0mvUq2g",
    videoType: "youtube",
    description: "Crysome Rat is an advanced cryptographic RAT designed for sophisticated threat actors who require military-grade encryption and anti-forensics capabilities. Built with enterprise-level security in mind, Crysome Rat employs advanced obfuscation techniques and polymorphic code generation to evade detection systems. This RAT combines stealth capabilities with powerful control features, making it ideal for persistent targeted attacks against high-value targets including financial institutions, government agencies, and critical infrastructure.",
    keyFeatures: [
      "Military-Grade Encryption - End-to-end encrypted C2 communications with AES-256 standard",
      "Polymorphic Code - Self-modifying code that changes signature on every execution",
      "Anti-Forensics - Advanced rootkit capabilities to hide traces and evade detection",
      "Anti-Analysis - Obfuscation and anti-debugging to prevent security researcher analysis",
      "Encrypted Communications - All data transmissions protected with cryptographic protocols",
      "Advanced Persistence - Multi-layered persistence mechanisms for long-term control",
      "Selective Stealing - Targeted extraction of valuable enterprise data and credentials",
      "Enterprise-Grade Control - Comprehensive remote access and system manipulation features"
    ],
    features: ["Encrypted C2", "Anti-analysis", "Polymorphic", "Rootkit capabilities", "AES-256 Encryption", "Obfuscation", "Anti-Debugging", "Persistence Mechanisms", "Forensics Evasion", "Code Mutation", "Advanced Stealth", "Selective Payload Delivery", "Multi-layer Defense Bypass", "Zero-Day Compatibility", "Custom Configuration", "Automated Deployment", "Behavioral Analysis Evasion", "Memory Protection", "Rootkit Integration", "Sandbox Detection"],
    version: "TBD"
  },
  "Neptune Rat 5.4": {
    videoId: "TUyhg9YF-tM",
    videoType: "youtube",
    description: "Neptune Rat 5.4 is the latest generation of the Neptune RAT family, featuring comprehensive mobile and system monitoring capabilities combined with advanced surveillance functionalities. Designed for intensive monitoring and data collection, Neptune Rat 5.4 provides real-time access to voice communications, location tracking, and SMS interception on target devices. This version includes enhanced stability, improved anti-detection measures, and a significantly expanded feature set optimized for enterprise-level surveillance and corporate espionage operations.",
    keyFeatures: [
      "Real-Time Device Monitoring - Continuous surveillance with instant alerts on user activities",
      "Voice Call Recording - Capture and store all incoming and outgoing calls with high quality",
      "GPS Location Tracking - Real-time location tracking with historical location logs",
      "SMS Interception - Monitor, intercept, and control all incoming and outgoing messages",
      "Browser History Access - Complete access to browsing history, bookmarks, and search queries",
      "Application Monitoring - Track all installed applications and monitor their usage patterns",
      "Media Theft - Automatic theft of photos, videos, and other multimedia files",
      "Contact Extraction - Access and steal all contacts from the target device"
    ],
    features: ["Real-time monitoring", "Voice recording", "GPS tracking", "SMS interception", "Contact extraction", "Media theft", "Browser history access", "Application monitoring", "Data synchronization", "Cloud integration", "Selective recording", "Encrypted storage", "Custom alerts", "Behavioral tracking", "Network monitoring", "Device information", "Call logs access", "Photo library access", "Video surveillance", "Advanced Analytics"],
    version: "5.4"
  },
  "Wizorm Rat 4.5": {
    videoId: "vS249DrhnAU",
    videoType: "youtube",
    description: "WizWorm RAT 4.5 is a newly released and highly advanced all-in-one hacking software designed for Windows, offering a combination of RAT (Remote Access Trojan), HVNC (Hidden Virtual Network Computing), and Worm functionalities. This software enables users to discreetly infiltrate and control the PCs and laptops of unsuspecting victims. WizWorm RAT 4.5 is designed as a multi-purpose hacking tool, equipped to handle high-stakes cyberattacks, ranging from personal data theft to corporate espionage. The integration of RAT, HVNC, and Worm functionalities makes it one of the most comprehensive tools available for silent hacking and unauthorized system access.",
    keyFeatures: [
      "Remote Access Trojan (RAT) - Full remote control with password theft and data extraction",
      "Hidden Virtual Network Computing (HVNC) - Stealth mode with invisible access and login bypass",
      "Worm Functionality - Spreads malicious payloads to thousands of devices rapidly",
      "Stealing Bank Login Details - Obtain and exploit sensitive financial information",
      "Silent Browser Operations - Perform hidden browser sessions to bypass security measures",
      "Reverse Proxy - Create secure backdoor for persistent control over infected systems",
      "Bypass Security Layers - Circumvent two-factor authentication and banking protections",
      "File Theft and Management - Access, steal, or modify files on victim's machine unnoticed"
    ],
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
      "Stealth Techniques",
      "Data Exfiltration",
      "Custom Payloads",
      "Integration with Exploits",
      "Persistence Mechanisms",
      "Simple Configuration",
      "Automation Tools",
      "Detailed Monitoring"
    ],
    version: "4.5"
  }
};

const screenshotMap: { [key: string]: number } = {
  "S400 Rat": 8,
  "Xworm Rat ORG": 8,
  "Venom Rat": 6,
  "Crysome Rat": 5,
  "Neptune Rat 5.4": 6,
  "Wizorm Rat 4.5": 6,
};

const baseScreenshots = [
  { name: "interface", label: "Interface" },
  { name: "dashboard", label: "Dashboard" },
  { name: "control", label: "Control Panel" },
  { name: "modules", label: "Modules" },
  { name: "settings", label: "Settings" },
  { name: "advanced", label: "Advanced" },
  { name: "extra1", label: "Extra 1" },
  { name: "extra2", label: "Extra 2" },
];

interface WindowsRatsGridProps {
  gradient: string;
  textColor: string;
  selectedRat?: string;
  onRatSelect?: (ratName: string) => void;
}

export function WindowsRatsGrid({
  gradient,
  textColor,
  selectedRat: externalSelectedRat,
  onRatSelect,
}: WindowsRatsGridProps) {
  const [internalSelectedRat, setInternalSelectedRat] = useState("S400 Rat");

  // Use external prop if provided, otherwise use internal state
  const selectedRat = externalSelectedRat !== undefined ? externalSelectedRat : internalSelectedRat;

  const handleRatSelect = (ratName: string) => {
    // Always update internal state
    setInternalSelectedRat(ratName);
    // Notify parent if callback provided
    if (onRatSelect) {
      onRatSelect(ratName);
    }
  };
  const [currentScreenshotIndex, setCurrentScreenshotIndex] = useState(0);
  const rats = Object.keys(ratsData);
  const currentRat = ratsData[selectedRat as keyof typeof ratsData];
  const screenshotCount = screenshotMap[selectedRat] || 6;
  const screenshots = baseScreenshots.slice(0, screenshotCount);

  const nextScreenshot = () => {
    setCurrentScreenshotIndex((prev) => (prev + 1) % screenshots.length);
  };

  const prevScreenshot = () => {
    setCurrentScreenshotIndex((prev) => (prev - 1 + screenshots.length) % screenshots.length);
  };

  const goToScreenshot = (index: number) => {
    setCurrentScreenshotIndex(index);
  };

  // Reset index when RAT changes
  useEffect(() => {
    setCurrentScreenshotIndex(0);
  }, [selectedRat]);

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentScreenshotIndex((prev) => (prev + 1) % screenshots.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [screenshots.length]);

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-900/20 via-emerald-900/15 to-slate-900/20">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16 slide-in-up">
          <div className="inline-block mb-6 px-4 py-2 rounded-full bg-emerald-900/40 border border-emerald-600/60">
            <span className="text-sm font-mono text-emerald-400">$ WINDOWS.RATS.LOAD()</span>
          </div>
          <h2 className={`text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r ${gradient} mb-6`}>
            WINDOWS RATS
          </h2>
          <p className="text-lg text-emerald-400/80 max-w-2xl mx-auto">
            Advanced Remote Access Tools and Exploitation Frameworks for Windows Systems
          </p>
        </div>

        {/* RAT Version Selector Tabs */}
        <div className="flex flex-wrap gap-3 justify-center mb-16 pb-8 border-b-2 border-gradient-to-r from-blue-600/30 via-purple-600/20 to-blue-600/30">
          {rats.map((ratName) => (
            <button
              key={ratName}
              onClick={() => handleRatSelect(ratName)}
              className={`px-8 py-3 rounded-full font-bold text-sm uppercase tracking-wider transition-all duration-300 border-2 backdrop-blur-sm ${
                selectedRat === ratName
                  ? "bg-gradient-to-r from-cyan-500/80 to-blue-500/80 border-cyan-400/80 text-white shadow-2xl shadow-cyan-500/40 scale-110 font-extrabold"
                  : "border-blue-500/40 text-blue-300/90 bg-blue-950/20 hover:border-blue-400/70 hover:bg-blue-900/40 hover:text-blue-200 hover:shadow-lg hover:shadow-blue-500/20"
              }`}
            >
              ◆ {ratName}
            </button>
          ))}
        </div>

        {/* Main RAT Display Panel */}
        <div className="group relative overflow-hidden rounded-3xl backdrop-blur-md border-2 transition-all duration-500 bg-gradient-to-br from-slate-800/40 via-emerald-900/30 to-slate-800/40 border-emerald-600/50 hover:border-emerald-500/70 hover:shadow-2xl hover:shadow-emerald-500/20">
          <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-r from-emerald-500/60 via-teal-500/40 to-transparent"></div>

          {/* Header with RAT Info */}
          <div className="relative z-10 p-12 pb-8 border-b border-blue-500/30 bg-gradient-to-br from-blue-950/30 to-transparent">
            <div className="flex items-start justify-between">
              <div>
                <span className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/50 text-cyan-400 text-xs font-mono mb-4 font-bold">
                  v{currentRat.version}
                </span>
                <h2 className="text-6xl font-black bg-gradient-to-r from-cyan-400 via-blue-300 to-purple-300 bg-clip-text text-transparent mb-3">
                  {selectedRat}
                </h2>
                <div className="h-1 w-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full mb-4"></div>
                <p className="text-blue-300/80 text-lg font-medium">Advanced Windows Remote Access & Exploitation Tool</p>
              </div>
              <div className="px-6 py-3 rounded-lg bg-gradient-to-br from-cyan-500/15 to-blue-500/15 border-2 border-cyan-500/40">
                <p className="text-cyan-400 font-mono text-sm font-bold uppercase tracking-wide">✓ Status: Active</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="relative z-10 p-12 pb-8 border-b border-blue-500/20 bg-blue-950/20">
            <p className="text-blue-200/85 text-base leading-relaxed font-medium">
              {currentRat.description}
            </p>
          </div>

          {/* Key Features */}
          {(ratsData[selectedRat] as any).keyFeatures && (
            <div className="relative z-10 p-12 pb-8 border-b border-blue-500/20 bg-blue-950/20">
              <h3 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-300 bg-clip-text text-transparent mb-2">Key Features</h3>
              <div className="h-1 w-20 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full mb-8"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(ratsData[selectedRat] as any).keyFeatures.map((feature: string, idx: number) => (
                  <div
                    key={idx}
                    className="group/item flex gap-3 p-4 rounded-xl bg-gradient-to-br from-blue-950/40 to-slate-900/40 border-2 border-blue-600/30 hover:border-cyan-500/60 hover:bg-blue-950/60 transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-cyan-500/20"
                  >
                    <span className="text-cyan-400 font-bold text-lg flex-shrink-0 group-hover/item:text-cyan-300 mt-0.5">⚡</span>
                    <span className="text-blue-200/90 text-sm font-medium group-hover/item:text-blue-100">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Complete Features Grid */}
          <div className="relative z-10 p-12 pb-8 border-b border-blue-500/20 bg-blue-950/20">
            <h3 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-300 bg-clip-text text-transparent mb-2">Complete Features</h3>
            <div className="h-1 w-20 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full mb-10"></div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {currentRat.features.map((feature, idx) => (
                <div
                  key={idx}
                  className="group/feature relative overflow-hidden rounded-xl p-4 bg-gradient-to-br from-blue-950/40 to-slate-900/40 border-2 border-blue-600/40 hover:border-cyan-500/80 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-cyan-500/30"
                >
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/10 to-blue-500/0 opacity-0 group-hover/feature:opacity-100 transition-all duration-300"></div>

                  {/* Icon */}
                  <div className="relative z-10 mb-3">
                    <div className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-600/40 to-blue-600/30 group-hover/feature:from-cyan-500/60 group-hover/feature:to-blue-500/50 transition-all duration-300">
                      <span className="text-cyan-400 text-lg group-hover/feature:text-cyan-200 font-bold">◆</span>
                    </div>
                  </div>

                  {/* Feature text */}
                  <p className="relative z-10 text-blue-300/90 text-xs font-semibold leading-snug group-hover/feature:text-blue-100 transition-colors duration-300">
                    {feature}
                  </p>

                  {/* Bottom accent line */}
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-600/0 via-cyan-500/50 to-blue-600/0 opacity-0 group-hover/feature:opacity-100 transition-opacity duration-300"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Screenshots Section */}
          <div className="relative z-10 p-12 pb-16 border-b border-blue-500/20 bg-blue-950/20">
            <h3 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 to-blue-300 bg-clip-text text-transparent mb-3">Screenshots</h3>
            <div className="h-1 w-20 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full mb-4"></div>
            <p className="text-blue-300/70 text-lg mb-12 font-medium">See our interface in action - Full Size Display</p>

            <div className="space-y-6">
              {/* Carousel - Full Size */}
              <div className="relative group">
                <div className="relative overflow-hidden rounded-3xl border-2 border-blue-600/40 group-hover:border-cyan-500/70 transition-all duration-300 w-full shadow-2xl shadow-blue-500/20 group-hover:shadow-cyan-500/30">
                  <div className="w-full min-h-screen md:min-h-[700px] lg:min-h-[800px] bg-gradient-to-br from-blue-950/60 via-slate-900/40 to-blue-950/60 flex items-center justify-center relative overflow-hidden">
                    <img
                      key={currentScreenshotIndex}
                      src={`/assets/windows-tools/${getRatFolderName(selectedRat)}/${screenshots[currentScreenshotIndex].name}.png`}
                      alt={screenshots[currentScreenshotIndex].label}
                      className="w-full h-full object-scale-down md:object-contain transition-opacity duration-500 max-w-7xl mx-auto"
                    />
                  </div>

                  {/* Navigation Arrows */}
                  <button
                    onClick={prevScreenshot}
                    className="absolute left-6 md:left-8 top-1/2 -translate-y-1/2 z-20 w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-cyan-500/40 to-blue-500/40 hover:from-cyan-500/70 hover:to-blue-500/70 text-cyan-200 hover:text-cyan-100 transition-all duration-300 flex items-center justify-center text-4xl md:text-5xl group/btn shadow-lg hover:shadow-cyan-500/50 border-2 border-cyan-500/40 hover:border-cyan-400/70"
                  >
                    ‹
                  </button>
                  <button
                    onClick={nextScreenshot}
                    className="absolute right-6 md:right-8 top-1/2 -translate-y-1/2 z-20 w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-cyan-500/40 to-blue-500/40 hover:from-cyan-500/70 hover:to-blue-500/70 text-cyan-200 hover:text-cyan-100 transition-all duration-300 flex items-center justify-center text-4xl md:text-5xl group/btn shadow-lg hover:shadow-cyan-500/50 border-2 border-cyan-500/40 hover:border-cyan-400/70"
                  >
                    ›
                  </button>

                  {/* Image Label */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent p-8">
                    <p className="text-cyan-300 font-bold text-lg">{screenshots[currentScreenshotIndex].label}</p>
                    <p className="text-blue-300/60 text-sm font-medium mt-1">{selectedRat}</p>
                  </div>
                </div>

                {/* Dots Navigation */}
                <div className="flex justify-center gap-3 mt-8">
                  {screenshots.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => goToScreenshot(idx)}
                      className={`rounded-full transition-all duration-300 ${
                        idx === currentScreenshotIndex
                          ? "bg-gradient-to-r from-cyan-400 to-blue-400 w-4 h-4 md:w-5 md:h-5 shadow-lg shadow-cyan-400/50"
                          : "bg-blue-600/50 hover:bg-blue-500/80 w-3 h-3 md:w-4 md:h-4"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Screenshot Counter */}
              <div className="text-center bg-gradient-to-r from-cyan-400/20 to-blue-400/20 rounded-full py-2 px-4 inline-block mx-auto mt-4">
                <p className="text-cyan-300/90 text-base md:text-lg font-bold">
                  {currentScreenshotIndex + 1} / {screenshots.length}
                </p>
              </div>
            </div>
          </div>

          {/* Live Demo Section - All RATs */}
          <div className="relative z-10 p-12 pb-16 bg-blue-950/20 border-b border-blue-500/20">
            <div className="text-center mb-12">
              <h3 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 to-blue-300 bg-clip-text text-transparent mb-3">Live Demo</h3>
              <div className="h-1 w-20 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full mx-auto mb-4"></div>
              <p className="text-blue-300/70 text-lg font-medium">Watch {selectedRat} in action - Complete Interface Demonstration</p>
            </div>

            {currentRat.videoId ? (
              currentRat.videoType === "google-drive" ? (
                <GoogleDriveEmbed
                  fileId={currentRat.videoId}
                  title={`${selectedRat} Demo Video`}
                  className="rounded-2xl border-2 border-emerald-600/50 hover:border-emerald-500/80 transition-all"
                />
              ) : (
                <YouTubeEmbed
                  videoId={currentRat.videoId}
                  title={`${selectedRat} Demo Video`}
                  className="rounded-2xl border-2 border-emerald-600/50 hover:border-emerald-500/80 transition-all"
                />
              )
            ) : (
              <div className="p-16 rounded-2xl bg-gradient-to-br from-emerald-900/30 to-slate-900/40 border-2 border-emerald-600/50 flex flex-col items-center justify-center space-y-6">
                <div className="w-20 h-20 rounded-full bg-emerald-600/30 flex items-center justify-center">
                  <span className="text-4xl">🎬</span>
                </div>
                <div className="text-center space-y-3">
                  <p className="text-emerald-300 font-bold text-2xl">Demo Video Coming Soon</p>
                  <p className="text-emerald-400/70 text-lg">Live demonstration video for {selectedRat} will be available soon</p>
                </div>
              </div>
            )}
          </div>

          {/* Stats Footer */}
          <div className="relative z-10 px-12 py-8 flex items-center justify-between bg-gradient-to-r from-blue-950/30 via-slate-900/20 to-blue-950/30 border-t-2 border-blue-600/30">
            <div className="text-cyan-400 font-mono font-bold">
              Total Features: <span className="text-blue-300 font-black text-lg">{currentRat.features.length}</span>
            </div>
            <div className="text-cyan-400 text-sm font-bold uppercase tracking-wider">
              ✓ Fully Operational
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
