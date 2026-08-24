import { getCurrentUser } from "@/features/users/actions";
import { env } from "@/env.mjs";
import { getClient } from "@/lib/urql";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import VersionsSection from "@/components/home/VersionsSection";
import { Icons } from "@/components/layouts/icons";
import { BtmobVersionsSelector } from "@/components/home/BtmobVersionsSelector";
import { CheckoutModal } from "@/components/home/CheckoutModal";
import { ProductsSection } from "@/components/home/ProductsSection";
import { ImageCarousel } from "@/components/home/ImageCarousel";
import { HeroSection } from "@/components/home/HeroSection";
import { BrandSelector } from "@/components/home/BrandSelector";
import { FeaturesGrid } from "@/components/home/FeaturesGrid";
import { TechSpecs } from "@/components/home/TechSpecs";
import { PrivateGroupCard } from "@/components/home/PrivateGroupCard";
import { YouTubeEmbed } from "@/components/home/YouTubeEmbed";
import { WindowsRatsGrid } from "@/components/home/WindowsRatsGrid";
import { WindowsToolsSection } from "@/components/home/WindowsToolsSection";
import { ReviewsSection } from "@/components/home/ReviewsSection";
import { TrialModal } from "@/components/home/TrialModal";

const brandContent = {
  androfud: {
    featureBar: [
      "● BYPASSES GOOGLE PLAY",
      "● ALL ANTIVIRUS",
      "● LIFETIME ENCRYPTION",
      "● CUSTOM DROPPER",
    ],
    heading: "Welcome to Androfud",
    features: [
      {
        icon: "lock",
        title: "Automatic Encryption",
        description:
          "Payload downloaded & encrypted automatically from our server. No manual work needed.",
      },
      {
        icon: "palette",
        title: "Custom Dropper",
        description:
          "Any design, any app icon, any theme. Delivered in under 30 minutes.",
      },
      {
        icon: "shield",
        title: "AV Bypass",
        description:
          "Bypasses Avast, Kaspersky, Bitdefender, McAfee, ESET, Avira & 50+ more.",
      },
      {
        icon: "smartphone",
        title: "Universal Compatibility",
        description:
          "Works perfectly on Samsung, Xiaomi, OPPO, Vivo, Huawei, Pixel and all other brands.",
      },
      {
        icon: "zap",
        title: "Permanent Updates",
        description: "Stays undetectable forever with server-side updates.",
      },
      {
        icon: "rocket",
        title: "Works with All RATs",
        description:
          "CraxsRat, Spynote, AhMyth, AndroRAT, BTMOB and hundreds more...",
      },
    ],
    rats: ["CraxsRAT", "Spynote", "AhMyth", "AndroRAT", "BTMOB", "ALBIRIOX"],
    gradient: "from-[#0099ff] via-[#a855f7] to-[#000000]",
    textColor: "text-[#67e8f9]",
    bgFrom: "from-[#000000]",
    bgTo: "to-[#000000]",
    gradientAccent: "from-[#0099ff] to-[#000000]",
    collection: "androfud",
    video: "/assets/videos/androfud.mp4",
  },
  btmob: {
    featureBar: [
      "● ADVANCED TRACKING",
      "● REAL-TIME MONITORING",
      "● SECURE COMMUNICATION",
      "● MULTI-DEVICE SUPPORT",
    ],
    heading: "Welcome to BT Mob",
    features: [
      {
        icon: "view",
        title: "Live Screen Capture",
        description:
          "Real-time screen monitoring with instant updates. See what users see.",
      },
      {
        icon: "smartphone",
        title: "Device Management",
        description:
          "Control multiple devices simultaneously with easy-to-use dashboard.",
      },
      {
        icon: "lock",
        title: "Military Grade Security",
        description:
          "Bank-level encryption for all communications and data transfers.",
      },
      {
        icon: "globe",
        title: "Global Connectivity",
        description: "Works worldwide with optimized servers in every region.",
      },
      {
        icon: "zap",
        title: "Lightning Fast",
        description:
          "Millisecond response times with optimized network protocols.",
      },
      {
        icon: "award",
        title: "Premium Support",
        description: "24/7 dedicated support team ready to assist you anytime.",
      },
    ],
    rats: [
      "CraxsRAT",
      "SpyNote Pro",
      "AndroRAT",
      "BTMOB",
      "MetaExploit",
      "ShadowRAT",
    ],
    gradient: "from-[#0099ff] via-[#3b82f6] to-[#8b5cf6]",
    textColor: "text-[#67e8f9]",
    bgFrom: "from-[#0c2d3d]",
    bgTo: "to-[#1e1b4b]",
    gradientAccent: "from-[#0099ff] to-[#000000]",
    collection: "btmob",
    video: "/assets/videos/btmob.mp4",
  },
  windowstools: {
    featureBar: [
      "● ADVANCED EXPLOITATION",
      "● SYSTEM PENETRATION",
      "● PRIVILEGE ESCALATION",
      "● PERSISTENT ACCESS",
    ],
    heading: "Welcome to Windows Tools",
    features: [
      {
        icon: "shield",
        title: "System Exploitation",
        description:
          "Advanced tools for Windows system penetration and exploitation.",
      },
      {
        icon: "lock",
        title: "Security Bypass",
        description:
          "Bypass Windows security features and protections with precision.",
      },
      {
        icon: "zap",
        title: "Lightning Speed",
        description:
          "Ultra-fast execution with optimized payload delivery mechanisms.",
      },
      {
        icon: "rocket",
        title: "Persistent Access",
        description:
          "Maintain long-term access with advanced persistence techniques.",
      },
      {
        icon: "palette",
        title: "Customization",
        description:
          "Fully customizable tools tailored to your specific requirements.",
      },
      {
        icon: "globe",
        title: "Remote Management",
        description:
          "Control systems remotely with secure command and control channels.",
      },
    ],
    rats: [
      "S400 Rat",
      "Xworm Rat ORG",
      "Venom Rat",
      "Crysome Rat",
      "Neptune Rat 5.4",
      "Wizorm Rat 4.5",
    ],
    gradient: "from-[#00ff00] via-[#00dd00] to-[#000000]",
    textColor: "text-[#00ff00]",
    bgFrom: "from-[#001a00]",
    bgTo: "to-[#000000]",
    gradientAccent: "from-[#00ff00] to-[#000000]",
    collection: "windowstools",
    video: "/assets/videos/intro.mp4",
  },
  dragnoroid: {
    featureBar: [
      "● ADVANCED ANDROID",
      "● DRAGON POWER",
      "● COMING SOON",
      "● STAY TUNED",
    ],
    heading: "Dragnoroid Rat - Coming Soon",
    features: [],
    gradient: "from-[#ff6b00] via-[#ff8c00] to-[#000000]",
    textColor: "text-[#ff8c00]",
    bgFrom: "from-[#1a0a00]",
    bgTo: "to-[#000000]",
    gradientAccent: "from-[#ff6b00] to-[#000000]",
    collection: "dragnoroid",
  },
};

export default async function Home({
  searchParams,
}: {
  searchParams: { brand?: string };
}) {
  const currentUser = await getCurrentUser();
  const brand = (searchParams.brand || "androfud") as keyof typeof brandContent;
  const content = brandContent[brand] || brandContent.androfud;

  try {
    // Fetch products from API instead of GraphQL (API filters by section)
    let brandedProducts: any[] = [];

    try {
      const baseUrl =
        process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
      const response = await fetch(`${baseUrl}/api/admin/products`, {
        cache: "no-store",
      });

      if (response.ok) {
        const apiData = await response.json();
        const sectionMap: { [key: string]: string } = {
          androfud: "androfud",
          btmob: "btmob",
          windowstools: "windows",
        };

        const requiredSection = sectionMap[brand];

        console.log("API Response:", apiData);
        console.log("Required Section:", requiredSection);
        console.log("All Products:", apiData.products);

        // Filter products by section
        brandedProducts = (apiData.products || [])
          .filter((product: any) => {
            if (!product || !product.section) return false;
            const productSection = String(product.section).toLowerCase().trim();
            const matches = productSection === requiredSection.toLowerCase();
            if (matches) {
              console.log(
                `✓ Matched: "${product.name}" (section: "${productSection}")`,
              );
            }
            return matches;
          })
          .map((product: any) => ({
            node: product,
          }));

        console.log(
          `Brand: ${brand} | Required: "${requiredSection}" | Found: ${brandedProducts.length} products`,
        );
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      brandedProducts = [];
    }

    const data = { products: { edges: brandedProducts } };
    const error = null;

    return (
      <main className="min-h-screen bg-gradient-to-b from-[#000000] to-[#000000]">
        {/* Brand Selector - Below Navbar */}
        <BrandSelector brand={brand} />

        {/* New Hero Section */}
        <HeroSection brand={brand} content={content} />

        {/* Features Grid */}
        <div id="features">
          <FeaturesGrid
            features={content.features}
            brand={brand}
            gradient={content.gradient}
            textColor={content.textColor}
          />
        </div>

        {/* Tech Specs */}
        <TechSpecs
          brand={brand}
          gradient={content.gradient}
          textColor={content.textColor}
        />

        {/* Features Bar - Only for Androfud */}
        {brand === "androfud" && (
          <section
            className={`bg-gradient-to-r from-[#0099ff]/10 to-[#000000]/10 py-8 border-y border-[#0099ff]-500/30`}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-wrap gap-8 md:gap-16 justify-center items-center">
                {content.featureBar.map((item, idx) => (
                  <span
                    key={idx}
                    className="text-[#0099ff]-300 font-semibold text-base"
                    style={{ animationDelay: `${idx * 0.1}s` }}
                  >
                    <span className="text-[#0099ff]-500 mr-2">◆</span>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* BT Mob Versions Selector */}
        {brand === "btmob" && <BtmobVersionsSelector />}

        {/* Live Demo Videos - BTMOB Version Specific */}
        {brand === "btmob" && (
          <section
            className={`py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0c2d3d] to-[#1e1b4b]`}
          >
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16 slide-in-up">
                <h2
                  className={`text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#0099ff] via-[#3b82f6] to-[#8b5cf6] mb-4`}
                >
                  Live Demo
                </h2>
                <p className="text-xl text-[#67e8f9]">Watch BTMOB in action</p>
              </div>

              {/* BTMOB 4.6.1 Demo */}
              <div className="mb-16">
                <div className="mb-8">
                  <h3 className="text-3xl font-bold text-cyan-300 mb-2">
                    Version 4.6.1
                  </h3>
                </div>
                <div className="space-y-8">
                  {[
                    { title: "BTMOB 4.6.1 Latest", videoId: "uNS0Gu9MzOM" },
                  ].map((demo, idx) => (
                    <div
                      key={idx}
                      className={`group relative overflow-hidden rounded-3xl backdrop-blur-md border-2 transition-all duration-500 hover:scale-105 bg-gradient-to-br from-cyan-900/30 via-slate-900/20 to-black/30 border-cyan-500/60 hover:border-cyan-300 hover:shadow-2xl hover:shadow-cyan-500/40`}
                    >
                      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-cyan-500 via-blue-500 to-transparent"></div>

                      <YouTubeEmbed videoId={demo.videoId} title={demo.title} />

                      <div className="relative z-10 p-8 space-y-3">
                        <h3 className="text-3xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-200 group-hover:to-blue-200 transition-all duration-300">
                          {demo.title}
                        </h3>
                        <p className="text-cyan-200/80 text-lg">
                          Watch the latest version features
                        </p>
                      </div>

                      <div className="absolute -bottom-12 -right-12 w-32 h-32 opacity-0 group-hover:opacity-30 transition-opacity duration-500">
                        <div className="absolute bottom-0 right-0 w-16 h-16 border-b-3 border-r-3 border-cyan-400"></div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="text-center mt-8">
                  <Link
                    href="/live-demo?brand=btmob&version=4.6.1"
                    className="inline-block px-8 py-3 rounded-full border-2 border-cyan-500 text-cyan-300 font-bold hover:bg-cyan-500/10 transition-all duration-300"
                  >
                    Watch More Videos →
                  </Link>
                </div>
              </div>

              {/* BTMOB 3.6.3 Demo */}
              <div className="border-t border-cyan-500/20 pt-16">
                <div className="mb-8">
                  <h3 className="text-3xl font-bold text-cyan-300 mb-2">
                    Version 3.6.3
                  </h3>
                </div>
                <div className="space-y-8">
                  {[{ title: "BTMOB 3.6.3 Demo", videoId: "B1VBnA4N6Ms" }].map(
                    (demo, idx) => (
                      <div
                        key={idx}
                        className={`group relative overflow-hidden rounded-3xl backdrop-blur-md border-2 transition-all duration-500 hover:scale-105 bg-gradient-to-br from-cyan-900/30 via-slate-900/20 to-black/30 border-cyan-500/60 hover:border-cyan-300 hover:shadow-2xl hover:shadow-cyan-500/40`}
                      >
                        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-cyan-500 via-blue-500 to-transparent"></div>

                        <YouTubeEmbed
                          videoId={demo.videoId}
                          title={demo.title}
                        />

                        <div className="relative z-10 p-8 space-y-3">
                          <h3 className="text-3xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-200 group-hover:to-blue-200 transition-all duration-300">
                            {demo.title}
                          </h3>
                          <p className="text-cyan-200/80 text-lg">
                            Explore version 3.6.3 capabilities
                          </p>
                        </div>

                        <div className="absolute -bottom-12 -right-12 w-32 h-32 opacity-0 group-hover:opacity-30 transition-opacity duration-500">
                          <div className="absolute bottom-0 right-0 w-16 h-16 border-b-3 border-r-3 border-cyan-400"></div>
                        </div>
                      </div>
                    ),
                  )}
                </div>
                <div className="text-center mt-8">
                  <Link
                    href="/live-demo?brand=btmob&version=3.6.3"
                    className="inline-block px-8 py-3 rounded-full border-2 border-cyan-500 text-cyan-300 font-bold hover:bg-cyan-500/10 transition-all duration-300"
                  >
                    Watch More Videos →
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Powerful Features Section - Only for Androfud */}
        {brand === "androfud" && (
          <section
            className={`py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#000000] to-[#000000]`}
          >
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16 slide-in-up">
                <h2
                  className={`text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${content.gradient} mb-4`}
                >
                  Powerful Features
                </h2>
                <p className="text-xl text-[#0099ff]-300">
                  Advanced protection that no other tool can match
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {content.features.map((feature, idx) => {
                  const IconComponent = Icons[
                    feature.icon as keyof typeof Icons
                  ] as any;
                  return (
                    <div
                      key={idx}
                      className={`group relative slide-in-up overflow-hidden rounded-2xl p-8 backdrop-blur-md border-2 transition-all duration-500 hover:scale-105 bg-gradient-to-br from-purple-900/30 via-slate-900/20 to-black/30 border-purple-500/60 hover:border-purple-300 hover:shadow-2xl hover:shadow-purple-500/40`}
                      style={{ animationDelay: `${idx * 0.1}s` }}
                    >
                      {/* Top Border Gradient */}
                      <div
                        className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-purple-500 via-pink-500 to-transparent`}
                      ></div>

                      {/* Left Side Glow */}
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-1/2 bg-gradient-to-b from-purple-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                      <div className="relative z-10 space-y-4">
                        {/* Icon Container - Enhanced */}
                        <div className="relative w-fit">
                          <div
                            className={`p-5 rounded-xl bg-gradient-to-br from-purple-600/60 to-pink-600/40 group-hover:from-purple-500/80 group-hover:to-pink-500/60 group-hover:scale-125 transition-all duration-300 shadow-lg shadow-purple-600/30 group-hover:shadow-purple-500/60`}
                          >
                            {IconComponent && (
                              <IconComponent
                                className={`w-8 h-8 text-purple-200 group-hover:text-white transition-colors duration-300`}
                              />
                            )}
                          </div>
                          {/* Glow Effect Behind Icon */}
                          <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-purple-600/20 to-pink-600/10 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                        </div>

                        {/* Title - Enhanced */}
                        <h3 className="text-2xl font-black text-white leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-200 group-hover:to-pink-200 transition-all duration-300">
                          {feature.title}
                        </h3>

                        {/* Description - Enhanced */}
                        <p className="text-purple-200/85 text-sm leading-relaxed group-hover:text-purple-100/95 transition-colors duration-300">
                          {feature.description}
                        </p>
                      </div>

                      {/* Corner Accent - Enhanced */}
                      <div className="absolute -bottom-8 -right-8 w-24 h-24 opacity-0 group-hover:opacity-30 transition-opacity duration-500">
                        <div
                          className={`absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-purple-400`}
                        ></div>
                      </div>

                      {/* Animated Dots - Hidden by default */}
                      <div className="absolute top-4 right-4 flex gap-1 opacity-0 group-hover:opacity-40 transition-opacity duration-300">
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-400"></div>
                        <div className="w-1.5 h-1.5 rounded-full bg-pink-400"></div>
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-400"></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* Screenshots Section - Only for Androfud */}
        {brand === "androfud" && <ImageCarousel version="androfud" />}

        {/* Compatible RATs Section - Only for Androfud */}
        {brand === "androfud" && (
          <section
            className={`py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#1e0b3e] to-[#0f172a]`}
          >
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16 slide-in-up">
                <h2
                  className={`text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${content.gradient} mb-4`}
                >
                  Compatible With All Major
                  <span
                    className={`block text-transparent bg-clip-text bg-gradient-to-r ${content.gradient}`}
                  >
                    RATs
                  </span>
                </h2>
                <p className="text-lg text-[#0099ff]-300">
                  Seamlessly integrate with the most popular Remote Access Tools
                </p>
              </div>

              <div className="flex flex-wrap gap-4 justify-center items-center">
                {content.rats.map((rat, idx) => (
                  <button
                    key={rat}
                    className={`relative px-6 py-2.5 slide-in-up group border border-[#0099ff]-500/50 bg-purple-900/20 hover:bg-purple-800/30 text-[#0099ff]-300 hover:text-[#0099ff]-200 rounded-lg transition-all duration-300`}
                    style={{ animationDelay: `${idx * 0.08}s` }}
                  >
                    <span className="relative z-10 text-sm">◆ {rat}</span>
                    <div
                      className={`absolute inset-0 bg-gradient-to-r ${content.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-lg`}
                    ></div>
                  </button>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Live Demo Videos - Only for Androfud */}
        {brand === "androfud" && (
          <section
            className={`py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#000000] to-[#0a0a0a]`}
          >
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16 slide-in-up">
                <h2
                  className={`text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${content.gradient} mb-4`}
                >
                  Live Demo
                </h2>
                <p className="text-xl text-[#0099ff]-300">
                  Watch AndroFud in action
                </p>
              </div>

              <div className="space-y-8">
                {[{ title: "Androfud v 4.0", videoId: "5oV5Yp3-f-U" }].map(
                  (demo, idx) => (
                    <div
                      key={idx}
                      className={`group relative overflow-hidden rounded-3xl backdrop-blur-md border-2 transition-all duration-500 hover:scale-105 bg-gradient-to-br from-purple-900/30 via-slate-900/20 to-black/30 border-purple-500/60 hover:border-purple-300 hover:shadow-2xl hover:shadow-purple-500/40`}
                    >
                      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-purple-500 via-pink-500 to-transparent"></div>

                      <YouTubeEmbed videoId={demo.videoId} title={demo.title} />

                      <div className="relative z-10 p-8 space-y-3">
                        <h3 className="text-3xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-200 group-hover:to-pink-200 transition-all duration-300">
                          {demo.title}
                        </h3>
                        <p className="text-purple-200/80 text-lg">
                          Watch our latest version in action
                        </p>
                      </div>

                      <div className="absolute -bottom-12 -right-12 w-32 h-32 opacity-0 group-hover:opacity-30 transition-opacity duration-500">
                        <div className="absolute bottom-0 right-0 w-16 h-16 border-b-3 border-r-3 border-purple-400"></div>
                      </div>
                    </div>
                  ),
                )}
              </div>

              <div className="text-center mt-12">
                <Link
                  href="/live-demo?brand=androfud"
                  className="inline-block px-8 py-3 rounded-full border-2 border-purple-500 text-purple-300 font-bold hover:bg-purple-500/10 transition-all duration-300"
                >
                  View All Demos →
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* Windows Tools Section - with RAT selection and pricing */}
        {brand === "windowstools" && (
          <WindowsToolsSection
            gradient={content.gradient}
            textColor={content.textColor}
            content={content}
            brandedProducts={brandedProducts}
          />
        )}

        {/* Dragnoroid - Coming Soon */}
        {brand === "dragnoroid" && (
          <section className="py-40 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#1a0a00] to-[#000000] relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-600/10 blur-3xl"></div>
              <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-red-600/10 blur-3xl"></div>
            </div>

            <div className="max-w-4xl mx-auto text-center relative z-10">
              <div className="text-6xl md:text-8xl mb-8">🐉</div>
              <h2 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-orange-400 via-red-400 to-orange-400 bg-clip-text text-transparent mb-6">
                DRAGNOROID RAT
              </h2>
              <p className="text-2xl md:text-3xl text-orange-300/80 mb-8 font-bold">
                Coming Soon
              </p>
              <p className="text-lg md:text-xl text-orange-200/70 mb-12 max-w-2xl mx-auto leading-relaxed">
                We&rsquo;re working on something powerful. The Dragon is being awakened. Stay tuned for an extraordinary experience coming your way.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/?brand=androfud"
                  className="px-8 py-4 bg-gradient-to-r from-orange-600 to-red-600 text-white font-bold rounded-full hover:shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 hover:scale-105"
                >
                  Explore Other Tools
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* Products Section - Only show for Androfud & Others (BTMOB & Dragnoroid excluded) */}
        {brand !== "btmob" && brand !== "windowstools" && brand !== "dragnoroid" && (
          <ProductsSection
            brand={brand}
            content={content}
            brandedProducts={brandedProducts}
          />
        )}

        {/* Join Community Section - Only for Androfud */}
        {brand === "androfud" && (
          <section
            id="community"
            className={`py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#000000] to-[#000000]`}
          >
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16 slide-in-up">
                <h2
                  className={`text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r ${content.gradient} mb-6`}
                >
                  Join Our Community
                </h2>
                <p className="text-xl text-[#0099ff]-300">
                  Connect with thousands of users and get exclusive access to
                  tools and resources
                </p>
              </div>

              {/* Community Options Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {/* Public Channel */}
                <div className="group relative slide-in-up overflow-hidden rounded-2xl p-8 backdrop-blur-md border-2 transition-all duration-500 hover:scale-105 bg-gradient-to-br from-cyan-900/30 via-slate-900/20 to-black/30 border-cyan-500/60 hover:border-cyan-300 hover:shadow-2xl hover:shadow-cyan-500/40">
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-cyan-500 via-blue-500 to-transparent"></div>

                  <div className="relative z-10 space-y-4">
                    {/* Icon */}
                    <div className="relative w-fit">
                      <div className="p-5 rounded-xl bg-gradient-to-br from-cyan-600/60 to-blue-600/40 group-hover:from-cyan-500/80 group-hover:to-blue-500/60 group-hover:scale-125 transition-all duration-300 shadow-lg shadow-cyan-600/30 group-hover:shadow-cyan-500/60">
                        <svg
                          className="w-8 h-8 text-cyan-200"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 0C5.373 0 0 5.373 0 12c0 6.627 5.373 12 12 12s12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.328-.373-.115l-6.869 4.332-2.96-.924c-.643-.204-.657-.643.135-.954l11.566-4.458c.54-.197 1.01.132.84.951z" />
                        </svg>
                      </div>
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-cyan-600/20 to-blue-600/10 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-black text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-200 group-hover:to-blue-200 transition-all duration-300">
                      Public Channel
                    </h3>

                    {/* Description */}
                    <p className="text-cyan-200/85 text-sm leading-relaxed">
                      Free community access, updates, and announcements
                    </p>

                    {/* CTA Button */}
                    <Link
                      href="https://t.me/androfud"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-4 px-6 py-2 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300"
                    >
                      Join Telegram →
                    </Link>
                  </div>
                </div>

                {/* Private Paid Group - Using Client Component */}
                <PrivateGroupCard />
              </div>

              {/* Details Expandable Section */}
              <div className="bg-gradient-to-br from-purple-900/20 via-slate-900/10 to-black/20 border border-purple-500/40 rounded-2xl p-8 slide-in-up">
                <h3 className="text-2xl font-bold text-white mb-6">
                  Private Group Benefits
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Free Tools */}
                  <div className="space-y-3">
                    <h4 className="text-lg font-bold text-purple-300">
                      Free Android RATs
                    </h4>
                    <div className="text-sm text-purple-200/80 space-y-1">
                      <p>• Craxsrat (All Versions)</p>
                      <p>• Spyroid VIP with Admin Access</p>
                      <p>• Eagle Spy v5 & v4</p>
                      <p>• Big Shark</p>
                      <p>• Medusa RAT</p>
                      <p>• Fatrinadia RAT</p>
                      <p>• Anonymous RAT</p>
                      <p>• Cypher RAT</p>
                      <p>• G700 v5 PRO, 6.1.5, 6.4</p>
                      <p>• Spynote 7.2 & 7.3.1</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* CTA Section - Only show for Androfud */}
        {brand === "androfud" && (
          <section
            className={`py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#0099ff]/10 to-[#000000]/10 border-t border-[#0099ff]-500/30 relative overflow-hidden`}
          >
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-500 rounded-full filter blur-3xl"></div>
            </div>

            <div className="max-w-4xl mx-auto relative z-10 text-center space-y-8 slide-in-up">
              <h2
                className={`text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${content.gradient}`}
              >
                Ready to explore the system?
              </h2>
              <p className="text-xl text-[#0099ff]-300 max-w-2xl mx-auto">
                Join thousands of users and discover premium products and
                exclusive access perfectly tailored for you.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link
                  href="/shop"
                  className={`px-8 py-3 text-center group relative rounded-lg font-semibold text-white bg-gradient-to-r ${content.gradient} shadow-lg shadow-purple-500/50 hover:shadow-xl transition-all duration-300`}
                >
                  <span className="relative z-10">✦ Explore Products</span>
                </Link>
                <Link
                  href="/collections"
                  className="px-8 py-3 text-center group relative rounded-lg font-semibold text-[#0099ff]-300 border-2 border-[#0099ff]-500 hover:bg-purple-500/10 transition-all duration-300"
                >
                  <span className="relative z-10">✦ Join Community</span>
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* Reviews Section - Shows on all brands */}
        <ReviewsSection />
      </main>
    );
  } catch (err) {
    console.error("Page Error:", err);
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#0a0e27]">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4 text-[#a855f7] neon-text">
            Error Loading Page
          </h1>
          <p className="text-[#67e8f9]">Please try again later</p>
        </div>
      </main>
    );
  }
}
