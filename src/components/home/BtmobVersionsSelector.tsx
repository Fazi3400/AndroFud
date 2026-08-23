"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Icons } from "@/components/layouts/icons";
import { ImageCarousel } from "./ImageCarousel";
import { CheckoutModal } from "./CheckoutModal";
import { useProductDiscount } from "@/hooks/useProductDiscount";

const versions = {
  "3.6.3": {
    description:
      "BT Mob Version 3.6.3 is our most advanced release, packed with comprehensive device control, advanced monitoring capabilities, and enterprise-grade security features. This version includes real-time screen viewing, media access, file management, communication monitoring, app management, banking/crypto injection capabilities, device information tracking, stealth mode operation, and custom overlay support with over 250 pre-built overlays. Works seamlessly on Android 7.0 to 16+ across all major brands without requiring root access.",
    features: [
      "Real-time Screen Viewing & Remote Control",
      "Front & Back Camera Access",
      "File System Browsing & Management",
      "SMS, Call Logs & Contact Extraction",
      "App Installation & Management",
      "Banking & Crypto Injection Overlays",
      "GPS Location Tracking",
      "System-wide Keylogger",
      "Clipboard Monitoring",
      "Hidden App Icon Mode",
      "Over 250 Pre-Built Custom Overlays",
      "Screen Lock/Unlock Control",
      "VPN Detection & Proxy Support",
      "Android 7.0 → 16+ Support",
      "FuD Encrypting Service Included",
    ],
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  "4.6.1": {
    description:
      "BT Mob Version 4.6.1 is our latest release focusing on stability, performance, and enhanced security. This version introduces new Connection Modes (Secure Mode with encryption and Speed Mode for faster performance), improved Remote Screen control with screen blocking capabilities, enhanced anti-decompile protection, and optimized obfuscation for smoother operation. All device pairing and authentication remain encrypted and signed. Includes comprehensive device control, advanced monitoring, banking/crypto injection, and stealth features with over 250 pre-built overlays.",
    features: [
      "Dual Connection Modes (Secure & Speed)",
      "Real-time Screen Viewing & Recording",
      "Remote Screen Blocking & Touch Control",
      "Screen Reader Integration",
      "Front & Back Camera Access",
      "Full File System Management",
      "SMS, Call & Contact Control",
      "App Management & Installation",
      "Banking & Crypto Injection Overlays",
      "GPS Location & Device Tracking",
      "System-wide Keylogger & Monitoring",
      "Over 250 Pre-Built Custom Overlays",
      "Advanced Security & Anti-Decompile",
      "Improved Obfuscation & Performance",
      "Android 7.0 → 16+ Support",
    ],
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
};

const btmob363FeatureCategories = [
  {
    icon: "monitor",
    title: "Remote Control",
    features: [
      "Real-time screen viewing",
      "Touch simulation & full remote interaction",
      "Screen recording (FFMPEG)",
      "Screenshot capture on demand",
      "Remote device reboot / shutdown",
    ],
  },
  {
    icon: "view",
    title: "Remote Screen",
    features: [
      "Screen blocking with custom pages",
      "Target screen touch blocking",
      "Screen reader integration",
    ],
  },
  {
    icon: "camera",
    title: "Media Access",
    features: [
      "Front & back camera access",
      "Remote photo capture",
      "Microphone recording",
      "Live audio streaming",
      "Gallery browsing",
    ],
  },
  {
    icon: "folder",
    title: "File Management",
    features: [
      "Full file system browsing",
      "Upload / download files",
      "File search & filtering",
      "Delete, rename & move files",
      "Directory creation",
    ],
  },
  {
    icon: "message",
    title: "Communication",
    features: [
      "SMS read & send",
      "Call logs access",
      "Contact list extraction",
      "Live chat messaging",
      "Call forwarding control",
      "USSD code execution",
    ],
  },
  {
    icon: "layers",
    title: "App Management",
    features: [
      "View all installed applications",
      "Launch / close apps remotely",
      "Install / uninstall APKs",
      "App usage statistics",
      "Package & permission information",
    ],
  },
  {
    icon: "billing",
    title: "Banking/Crypto Injections",
    features: [
      "HTML / JavaScript injection",
      "Browser overlay injection",
      "WebView injection",
      "Accessibility-based injection",
      "Real-time form & input data capture",
    ],
  },
  {
    icon: "info",
    title: "Device Information",
    features: [
      "Full device specifications",
      "Battery status",
      "Network (WiFi / mobile) information",
      "GPS location tracking",
      "Storage details",
      "SIM card information",
      "IMEI & device identifiers",
    ],
  },
  {
    icon: "activity",
    title: "Monitoring",
    features: [
      "System-wide keylogger (all apps)",
      "Clipboard monitoring",
      "Notification reading",
      "App activity tracking",
    ],
  },
  {
    icon: "key",
    title: "Permissions & Access",
    features: [
      "Accessibility service integration",
      "Device admin privileges",
      "Auto-start on boot",
      "Battery optimization bypass",
      "Notification listener access",
      "Overlay permission handling",
      "Usage statistics access",
    ],
  },
  {
    icon: "hide",
    title: "Stealth Features",
    features: [
      "Hidden app icon mode",
      "Background service operation",
      "Persistent encrypted connection",
      "Auto-reconnect on disconnect",
      "Excluded from recent apps",
      "Silent operation (no user alerts)",
    ],
  },
  {
    icon: "grid",
    title: "Custom Overlays",
    features: [
      "Over 250 Pre-Built Overlays",
      "Custom Overlay Maker and Editor",
      "Real-time Viewing",
    ],
  },
  {
    icon: "settings",
    title: "Advanced Controls",
    features: [
      "Custom notification injection",
      "Screen lock / unlock",
      "Flashlight control",
      "Vibration control",
      "Toast message display",
      "Volume & brightness control",
      "VPN detection",
      "Proxy support",
      "DDoS capability",
    ],
  },
  {
    icon: "wifi",
    title: "Connection & Networking",
    features: [
      "HTTP / HTTPS support",
      "WebSocket real-time communication",
      "Automatic reconnection",
      "Multiple server support",
      "Encrypted connections",
    ],
  },
  {
    icon: "checkCircle",
    title: "Compatibility",
    features: [
      "Android 7.0 → 16+",
      "Multi-language support (EN, AR, ZH, RU, TR, PT, ES)",
      "Works across all major brands",
      "No root required",
    ],
  },
  {
    icon: "sparkles",
    title: "EXTRA",
    features: [
      "ANTI Delete / Anti Kill Mode",
      "No Port Forwarding Needed",
      "Social Media Monitoring",
      "Play Store Integration",
      "FuD Crypting Service Included",
    ],
  },
];

export function BtmobVersionsSelector() {
  const searchParams = useSearchParams();
  const [selectedVersion, setSelectedVersion] = useState<"3.6.3" | "4.6.1">(
    "4.6.1",
  );
  const [products, setProducts] = useState<any[]>([]);
  const [checkoutProduct, setCheckoutProduct] = useState<any>(null);
  const { getDiscount } = useProductDiscount();
  const version = versions[selectedVersion];

  // Read version from URL parameter and scroll to section
  useEffect(() => {
    try {
      const versionParam = searchParams?.get?.("version");
      if (versionParam === "3.6.3" || versionParam === "4.6.1") {
        setSelectedVersion(versionParam);
        // Scroll to this section after a short delay to allow render
        setTimeout(() => {
          const element = document.getElementById("btmob-section");
          element?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    } catch (error) {
      console.error("Error reading version param:", error);
    }
  }, [searchParams]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`/api/admin/products`);
        const apiData = await response.json();

        if (apiData.products) {
          const btmobProducts = apiData.products
            .filter(
              (product: any) => product.section?.toLowerCase() === "btmob",
            )
            .map((product: any) => ({
              node: product,
            }));
          setProducts(btmobProducts);
        }
      } catch (err) {
        console.error("Failed to fetch BTMOB products:", err);
      }
    };

    fetchProducts();
  }, []);

  const versionProducts = products.filter((edge: any) =>
    edge.node.name.toLowerCase().includes(selectedVersion),
  );

  const phoneStyle = {
    width: "270px",
    height: "538px",
    background: "#000",
    borderRadius: "40px",
    border: "10px solid #000",
    boxShadow:
      "0 0 40px 10px rgba(0, 0, 0, 0.3), inset 0 0 0 8px #1a1a1a, inset 0 0 0 9px #000",
    overflow: "hidden" as const,
    position: "relative" as const,
    animation: "float 3s ease-in-out infinite",
  };

  return (
    <div id="btmob-section">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
      `}</style>

      {/* Version Buttons */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0c2d3d] to-[#1e1b4b]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-4 justify-center items-center">
            {(["3.6.3", "4.6.1"] as const).map((v) => (
              <button
                key={v}
                onClick={() => setSelectedVersion(v)}
                className={`px-10 py-2 rounded-full border-2 transition-all duration-300 transform hover:scale-110 font-bold text-base ${
                  selectedVersion === v
                    ? "bg-gradient-to-r from-[#0099ff] to-[#000000] border-[#06b6d4] text-white shadow-lg shadow-[#06b6d4]/50"
                    : "bg-gradient-to-r from-[#0c2d3d] to-[#1e3a8a] border-[#06b6d4]/50 text-[#67e8f9]-300 hover:border-[#06b6d4]"
                }`}
              >
                BT Mob {v}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Version Details */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#1e1b4b] to-[#0c2d3d]">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-8">
            {/* Description & Features */}
            <div className="space-y-8">
              <div>
                <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#0099ff] to-[#8b5cf6] mb-4">
                  Version {selectedVersion}
                </h3>
                <p className="text-[#67e8f9]-200 text-lg leading-relaxed">
                  {version.description}
                </p>
              </div>

              {/* Features List */}
              <div className="space-y-4">
                <h4 className="text-xl font-bold text-[#06b6d4] mb-6">
                  Key Features:
                </h4>
                <div className="space-y-3">
                  {version.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div className="flex items-center justify-center h-6 w-6 rounded-full bg-[#06b6d4]">
                          <svg
                            className="h-4 w-4 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                      </div>
                      <p className="text-[#67e8f9]-100 text-base">{feature}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BTMOB Comprehensive Features Section */}
      {(selectedVersion === "3.6.3" || selectedVersion === "4.6.1") && (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0c2d3d] via-[#1e1b4b] to-[#1a0f3e]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#0099ff] to-[#8b5cf6] mb-4">
                Complete Feature Breakdown
              </h2>
              <p className="text-xl text-[#67e8f9]-300">
                Explore all 15 categories with comprehensive capabilities
              </p>
              <div className="mt-6 inline-block">
                <div className="h-1 w-24 bg-gradient-to-r from-[#0099ff] to-[#000000] rounded-full"></div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {btmob363FeatureCategories.map((category, idx) => (
                <div
                  key={idx}
                  className="group relative bg-gradient-to-br from-[#0c2d3d]/50 to-[#1e3a8a]/30 rounded-2xl p-6 border border-[#06b6d4]/20 hover:border-[#06b6d4]/60 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-[#06b6d4]/30"
                >
                  {/* Gradient Background Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#0099ff]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>

                  {/* Content */}
                  <div className="relative z-10 space-y-4">
                    {/* Icon and Title */}
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-gradient-to-br from-[#0099ff]/20 to-[#000000]/10 rounded-lg">
                        {Icons[category.icon as keyof typeof Icons] &&
                          (() => {
                            const IconComponent =
                              Icons[category.icon as keyof typeof Icons];
                            return typeof IconComponent === "function" ? (
                              <IconComponent className="w-6 h-6 text-[#06b6d4]" />
                            ) : null;
                          })()}
                      </div>
                      <h3 className="text-xl font-bold text-[#67e8f9]-300 pt-1">
                        {category.title}
                      </h3>
                    </div>

                    {/* Features List */}
                    <div className="space-y-2 pt-2">
                      {category.features.map((feature, featureIdx) => (
                        <div
                          key={featureIdx}
                          className="flex items-start gap-3"
                        >
                          <div className="flex-shrink-0 mt-1">
                            <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#0099ff] to-[#000000]"></div>
                          </div>
                          <p className="text-sm text-[#67e8f9]-200 group-hover:text-[#67e8f9]-100 transition-colors">
                            {feature}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Accent */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0099ff] via-[#3b82f6] to-transparent rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Pricing Section for Selected Version */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0c2d3d] to-[#1e1b4b]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 slide-in-up">
            <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#0099ff] to-[#06b6d4] mb-4">
              BTMOB {selectedVersion} Pricing
            </h2>
            <p className="text-lg text-[#67e8f9]">
              Choose the perfect plan for your needs
            </p>
          </div>

          {versionProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {versionProducts.map((edge: any, idx: number) => (
                <div
                  key={idx}
                  className="card-neon group slide-in-up flex flex-col justify-between rounded-3xl border-2 transition-all duration-500 bg-gradient-to-br from-[#1a1a2e] to-[#0a0a0a] border-[#0099ff]/30 hover:border-[#00f5ff]/80 hover:shadow-2xl hover:shadow-[#0099ff]/40"
                  style={{
                    animation: `curveFloat 3s ease-in-out infinite`,
                    animationDelay: `${idx * 0.2}s`,
                  }}
                >
                  <div className="p-6 space-y-4">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0099ff] to-[#06b6d4] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t"></div>
                    <h3 className="text-lg font-bold break-words overflow-hidden text-[#00f5ff]">
                      {edge.node.name}
                    </h3>
                    {(() => {
                      const discountInfo = getDiscount(edge.node.name);
                      return (
                        discountInfo.discount > 0 && (
                          <div
                            className="mb-3 bg-gradient-to-r from-[#ff4500] via-[#ff6b00] to-[#ff4500] text-white py-2 px-3 text-center font-black text-sm shadow-lg shadow-orange-500/50"
                            style={{
                              animation: "pulse 2s ease-in-out infinite",
                            }}
                          >
                            <div className="flex items-center justify-center gap-2">
                              <span className="animate-bounce">🔥</span>
                              <span>{discountInfo.discount}% OFF</span>
                              <span
                                className="animate-bounce"
                                style={{ animationDelay: "0.2s" }}
                              >
                                🔥
                              </span>
                            </div>
                          </div>
                        )
                      );
                    })()}
                    <div className="mb-6 relative">
                      {(() => {
                        const discountInfo = getDiscount(edge.node.name);
                        const originalPrice = edge.node.price;
                        const discountedPrice = Math.round(
                          originalPrice * (1 - discountInfo.discount / 100),
                        );

                        return (
                          <>
                            {discountInfo.discount > 0 && (
                              <div className="text-sm line-through opacity-60 mb-1 text-[#00f5ff]">
                                ${originalPrice}
                              </div>
                            )}
                            <div
                              className={`text-4xl font-bold mb-1 ${
                                discountInfo.discount > 0
                                  ? "text-green-400"
                                  : "text-[#00f5ff]"
                              }`}
                            >
                              $
                              {discountInfo.discount > 0
                                ? discountedPrice
                                : originalPrice}
                            </div>
                          </>
                        );
                      })()}
                    </div>

                    <div className="space-y-3 mb-8">
                      <p className="flex items-center gap-3 text-[#00f5ff]">
                        <span className="text-lg text-[#00f5ff]">✓</span> Full
                        Access
                      </p>
                      <p className="flex items-center gap-3 text-[#00f5ff]">
                        <span className="text-lg text-[#00f5ff]">✓</span>{" "}
                        Priority Support
                      </p>
                      <p className="flex items-center gap-3 text-[#00f5ff]">
                        <span className="text-lg text-[#00f5ff]">✓</span> All
                        Updates
                      </p>
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-2">
                    <button
                      onClick={() => setCheckoutProduct(edge.node)}
                      className="w-full py-4 font-bold rounded-2xl text-sm group relative text-white uppercase tracking-wide transition-all duration-300 bg-gradient-to-r from-[#0099ff] to-[#00f5ff] hover:shadow-lg hover:shadow-[#0099ff]/60 cursor-pointer"
                      style={{
                        animation: `buttonGlow 2s ease-in-out infinite`,
                        animationDelay: `${idx * 0.2}s`,
                      }}
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        ✦ SUBSCRIBE NOW
                      </span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 space-y-4">
              <p className="text-lg text-[#67e8f9]">
                Add BTMOB {selectedVersion} products through admin panel to
                display them here
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Checkout Modal */}
      {checkoutProduct && (
        <CheckoutModal
          isOpen={!!checkoutProduct}
          onClose={() => setCheckoutProduct(null)}
          productId={checkoutProduct.id}
          productName={checkoutProduct.name}
          productPrice={checkoutProduct.price}
        />
      )}

      {/* Version-specific Screenshots Carousel */}
      <ImageCarousel version={selectedVersion} />
    </div>
  );
}
