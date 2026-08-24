"use client";

import { useState, useEffect } from "react";
import { CheckoutModal } from "./CheckoutModal";
import { TrialModal } from "./TrialModal";

interface ProductsSectionProps {
  brand: string;
  content: any;
  brandedProducts: any[];
  selectedRatName?: string;
}

export function ProductsSection({
  brand,
  content,
  brandedProducts,
  selectedRatName,
}: ProductsSectionProps) {
  const [checkoutProduct, setCheckoutProduct] = useState<any>(null);
  const [isTrialModalOpen, setIsTrialModalOpen] = useState(false);
  const [offersData, setOffersData] = useState<any>({
    productOffers: [],
    dayOffers: [],
  });

  useEffect(() => {
    // Fetch offers from API
    const fetchOffers = async () => {
      try {
        const response = await fetch("/api/admin/offers", {
          cache: "no-store",
        });
        if (!response.ok) throw new Error("Failed to fetch offers");
        const data = await response.json();
        setOffersData(data);
        console.log("Fetched offers:", data);
      } catch (error) {
        console.error("Error fetching offers:", error);
        setOffersData({ productOffers: [], dayOffers: [] });
      }
    };
    fetchOffers();
  }, []);

  // Function to get discount for a product
  const getProductDiscount = (
    productName: string,
  ): { discount: number; label: string; countdown: string; isExpired: boolean } => {
    if (!productName) {
      return { discount: 0, label: "", countdown: "", isExpired: false };
    }

    const nameLower = productName.toLowerCase();

    // Try exact match first
    let productOffer = offersData.productOffers?.find(
      (offer: any) =>
        offer?.productName && offer.productName.toLowerCase() === nameLower,
    );

    // If no exact match, try partial matching
    if (!productOffer) {
      productOffer = offersData.productOffers?.find((offer: any) => {
        if (!offer?.productName) return false;
        const offerNameLower = offer.productName.toLowerCase();
        return (
          nameLower.includes(offerNameLower) ||
          offerNameLower.includes(nameLower)
        );
      });
    }

    if (!productOffer) {
      return { discount: 0, label: "", countdown: "", isExpired: false };
    }

    // Check if offer is expired
    const now = new Date();
    const expiresAt = productOffer.expiresAt
      ? new Date(productOffer.expiresAt)
      : null;

    if (expiresAt && expiresAt <= now) {
      return { discount: 0, label: "", countdown: "EXPIRED", isExpired: true };
    }

    // Calculate countdown
    let countdown = "";
    if (expiresAt) {
      const diff = expiresAt.getTime() - now.getTime();
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      countdown = `${days}d ${hours}h left`;
    }

    return {
      discount: Math.min(productOffer.baseDiscount, 70),
      label: productOffer.label,
      countdown,
      isExpired: false,
    };
  };

  // Windows Tools - Show subscription section after Windows Rats
  if (brand === "windowstools") {
    // Mapping for RAT names to product names
    const ratProductMap: { [key: string]: string } = {
      "S400 Rat": "S400",
      "Xworm Rat ORG": "Xworm",
      "Venom Rat": "Venom",
      "Crysome Rat": "Crysome",
      "Neptune Rat 5.4": "Neptune",
      "Wizorm Rat 4.5": "Wizorm",
    };

    // Find all products matching the selected RAT name
    let selectedProducts: any[] = [];

    if (selectedRatName && brandedProducts.length > 0) {
      const searchTerm = ratProductMap[selectedRatName] || selectedRatName;

      // Find all products that match the selected RAT (partial match)
      const matched = brandedProducts
        .filter((item: any) => {
          const productName = item.node?.name || item.name;
          return productName?.toLowerCase().includes(searchTerm.toLowerCase());
        })
        .map((item: any) => item.node || item)
        .sort((a: any, b: any) => (a.price || 0) - (b.price || 0));

      // Deduplicate by name - keep only one product per unique name
      const seen = new Set<string>();
      selectedProducts = matched.filter((product: any) => {
        if (seen.has(product.name)) {
          return false; // Skip duplicates
        }
        seen.add(product.name);
        return true;
      });

      // Debug log
      console.log(
        `[Windows Tools] Selected RAT: ${selectedRatName}, Found: ${selectedProducts.length} products`,
      );
    }

    // Fallback: show first product if no match found
    if (selectedProducts.length === 0 && brandedProducts.length > 0) {
      const firstProduct = brandedProducts[0]?.node || brandedProducts[0];
      selectedProducts = [firstProduct];
      console.log(
        `[Windows Tools] No match found, showing first product: ${firstProduct?.name}`,
      );
    }

    const selected = selectedProducts[0] || null;

    return (
      <>
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-950/40 via-slate-900/40 to-blue-950/40 relative overflow-hidden">
          {/* Background effects */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 blur-3xl"></div>
          </div>

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-16 slide-in-up">
              <h2
                className={`text-5xl md:text-6xl font-black bg-gradient-to-r from-cyan-400 via-blue-300 to-purple-300 bg-clip-text text-transparent mb-4`}
              >
                Subscription Plans
              </h2>
              <div className="h-1 w-32 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 mx-auto mb-6 rounded-full"></div>
              <p className="text-lg text-blue-300/80">
                {selected
                  ? `${selected.name} Pricing`
                  : brandedProducts.length === 0
                    ? "No products available"
                    : "Select a RAT tool to see pricing"}
              </p>
            </div>

            {/* Selected RAT Pricing - Multiple versions if available */}
            {selectedProducts.length > 0 &&
            selectedProducts.some((p: any) => p.price) ? (
              <div className="max-w-6xl mx-auto">
                {selectedProducts.length === 1 ? (
                  // Single Product Layout
                  <div className="group relative rounded-3xl border-2 border-blue-500/40 bg-gradient-to-br from-blue-950/50 via-slate-900/40 to-blue-950/50 overflow-hidden transition-all duration-500 hover:border-cyan-400/80 hover:shadow-2xl hover:shadow-cyan-500/40">
                    {/* Animated background gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    {/* Top glow effect */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/15 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center p-12 relative z-10">
                      {/* Left Side */}
                      <div className="space-y-8 slide-in-up">
                        <div>
                          <h3 className="text-6xl md:text-7xl font-black bg-gradient-to-r from-cyan-400 via-blue-300 to-purple-300 bg-clip-text text-transparent mb-4">
                            {selected.name}
                          </h3>
                          <div className="h-1.5 w-20 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"></div>
                        </div>

                        <div className="bg-blue-950/60 rounded-3xl p-8 border-2 border-blue-600/40 space-y-3">
                          {(() => {
                            const discountInfo = getProductDiscount(
                              selected.name,
                            );
                            const discountPercent = discountInfo.discount;
                            const originalPrice = selected.price;
                            const discountedPrice = Math.round(
                              originalPrice * (1 - discountPercent / 100),
                            );

                            return (
                              <>
                                {discountPercent > 0 && (
                                  <div className="space-y-2">
                                    <div className="inline-block px-4 py-2 bg-red-600/30 border border-red-500/50 rounded-lg text-red-300 font-bold text-sm">
                                      🔥 {discountPercent}% OFF
                                    </div>
                                    {discountInfo.countdown && (
                                      <p className="text-xs text-green-400 font-semibold">
                                        ⏱️ {discountInfo.countdown}
                                      </p>
                                    )}
                                  </div>
                                )}
                                <div className="text-7xl font-black bg-gradient-to-r from-cyan-400 to-blue-300 bg-clip-text text-transparent">
                                  $
                                  {discountPercent > 0
                                    ? discountedPrice
                                    : originalPrice}
                                </div>
                                {discountPercent > 0 && (
                                  <p className="text-sm text-gray-400 line-through">
                                    Original: ${originalPrice}
                                  </p>
                                )}
                              </>
                            );
                          })()}
                          <p className="text-lg text-blue-300/80 font-bold uppercase tracking-wide">
                            💎 Lifetime License Access
                          </p>
                        </div>

                        <div className="bg-blue-950/40 rounded-3xl p-8 border-2 border-blue-600/30 space-y-4">
                          <p className="flex items-center gap-4 text-blue-200 text-lg">
                            <span className="text-3xl text-cyan-400">⚡</span>{" "}
                            Full Access
                          </p>
                          <p className="flex items-center gap-4 text-blue-200 text-lg">
                            <span className="text-3xl text-cyan-400">⭐</span>{" "}
                            Priority Support
                          </p>
                          <p className="flex items-center gap-4 text-blue-200 text-lg">
                            <span className="text-3xl text-cyan-400">🔄</span>{" "}
                            All Updates
                          </p>
                          <p className="flex items-center gap-4 text-blue-200 text-lg">
                            <span className="text-3xl text-cyan-400">🔐</span>{" "}
                            Lifetime License
                          </p>
                        </div>

                        {(() => {
                          const discountInfo = getProductDiscount(
                            selected.name,
                          );
                          const discountPercent = discountInfo.discount;
                          const originalPrice = selected.price;
                          const discountedPrice = Math.round(
                            originalPrice * (1 - discountPercent / 100),
                          );
                          const displayPrice =
                            discountPercent > 0
                              ? discountedPrice
                              : originalPrice;

                          return (
                            <button
                              onClick={() => setCheckoutProduct(selected)}
                              className="w-full px-8 py-5 font-bold rounded-2xl text-xl text-white uppercase tracking-wider bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 hover:shadow-2xl hover:shadow-cyan-500/60 transition-all duration-300 hover:scale-105 relative overflow-hidden group/btn border-2 border-cyan-400/50"
                            >
                              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-500 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                              <span className="relative z-10 flex items-center justify-center gap-2">
                                ✦ Subscribe Now - ${displayPrice}
                              </span>
                            </button>
                          );
                        })()}
                      </div>

                      {/* Right Side - Visual */}
                      <div className="flex items-center justify-center">
                        <div className="text-center space-y-8 bg-gradient-to-br from-blue-950/50 to-purple-950/50 rounded-3xl p-12 border-2 border-blue-600/30 w-full">
                          <div className="text-9xl filter drop-shadow-lg">
                            💻
                          </div>
                          <div>
                            <p className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-300 bg-clip-text text-transparent mb-3">
                              {selected.name}
                            </p>
                            <div className="h-1 w-12 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto rounded-full mb-4"></div>
                            <p className="text-blue-200/80 text-lg leading-relaxed">
                              {selected.description}
                            </p>
                          </div>
                          <div className="pt-6 bg-blue-950/60 rounded-2xl p-4 border border-blue-600/30">
                            <p className="text-blue-300/70 text-sm font-semibold uppercase tracking-wider">
                              🚀 Advanced Windows Tool
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  // Multiple Products Layout (Grid)
                  <div>
                    <div className="mb-12 text-center">
                      <h3 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-3">
                        Available Versions
                      </h3>
                      <p className="text-blue-300/80">
                        Choose your preferred version and unlock ultimate power
                      </p>
                      <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto mt-4 rounded-full"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {selectedProducts.map((product: any, idx: number) => (
                        <div
                          key={idx}
                          className="group relative rounded-3xl border-2 border-blue-500/30 bg-gradient-to-br from-blue-950/40 via-slate-900/30 to-blue-950/40 p-8 hover:border-cyan-400/70 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-500/30 overflow-hidden"
                        >
                          {/* Animated gradient background */}
                          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                          {/* Top glow accent */}
                          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-cyan-500/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                          <div className="space-y-8 relative z-10">
                            <div>
                              <h3 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-300 bg-clip-text text-transparent mb-2">
                                {product.name}
                              </h3>
                              <div className="h-1 w-12 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full"></div>
                            </div>

                            <div className="space-y-2 bg-blue-950/40 rounded-2xl p-6 border border-blue-600/30">
                              <div className="text-6xl font-black bg-gradient-to-r from-cyan-400 to-blue-300 bg-clip-text text-transparent">
                                ${product.price}
                              </div>
                              <p className="text-sm text-blue-300/70 font-semibold uppercase tracking-wide">
                                💎 Lifetime Access
                              </p>
                            </div>

                            <div className="space-y-3 bg-blue-950/20 rounded-2xl p-6 border border-blue-600/20">
                              <p className="flex items-center gap-3 text-blue-200">
                                <span className="text-2xl text-cyan-400">
                                  ⚡
                                </span>{" "}
                                Full Access
                              </p>
                              <p className="flex items-center gap-3 text-blue-200">
                                <span className="text-2xl text-cyan-400">
                                  ⭐
                                </span>{" "}
                                Priority Support
                              </p>
                              <p className="flex items-center gap-3 text-blue-200">
                                <span className="text-2xl text-cyan-400">
                                  🔄
                                </span>{" "}
                                All Updates
                              </p>
                              <p className="flex items-center gap-3 text-blue-200">
                                <span className="text-2xl text-cyan-400">
                                  🔐
                                </span>{" "}
                                Lifetime License
                              </p>
                            </div>

                            <button
                              onClick={() => setCheckoutProduct(product)}
                              className="w-full px-8 py-4 font-bold rounded-2xl text-lg text-white uppercase tracking-wider bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105 relative overflow-hidden group/btn"
                            >
                              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                              <span className="relative z-10 flex items-center justify-center gap-2">
                                ✦ Subscribe Now - ${product.price}
                              </span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : null}

            {/* Fallback: Show all available products if selected not found or no price */}
            {(!selected || !selected.price) && brandedProducts.length > 0 && (
              <div className="max-w-6xl mx-auto">
                <div className="mb-8 text-center">
                  <p className="text-[#67e8f9] text-lg mb-4">
                    Available Plans:
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {brandedProducts.map((edge: any, idx: number) => (
                    <div
                      key={idx}
                      className="card-neon group slide-in-up flex flex-col justify-between rounded-3xl border-2 transition-all duration-500 bg-gradient-to-br from-[#1a1a2e] to-[#0a0a0a] border-[#0099ff]/30 hover:border-[#00f5ff]/80 hover:shadow-2xl hover:shadow-[#0099ff]/40"
                      style={{
                        animation: `curveFloat 3s ease-in-out infinite`,
                        animationDelay: `${idx * 0.2}s`,
                      }}
                    >
                      <div className="p-6 space-y-4">
                        <h3 className="text-lg font-bold text-[#00f5ff] break-words">
                          {edge.node.name}
                        </h3>
                        <div className="mb-6">
                          <div className="text-4xl font-bold text-[#00f5ff] mb-1">
                            ${edge.node.price || "Contact us"}
                          </div>
                          <p className="text-xs opacity-75 text-[#67e8f9]">
                            lifetime access
                          </p>
                        </div>
                        <div className="space-y-2">
                          <p className="flex items-center gap-2 text-[#67e8f9] text-sm">
                            <span className="text-[#00f5ff]">✓</span> Full
                            Access
                          </p>
                          <p className="flex items-center gap-2 text-[#67e8f9] text-sm">
                            <span className="text-[#00f5ff]">✓</span> Priority
                            Support
                          </p>
                          <p className="flex items-center gap-2 text-[#67e8f9] text-sm">
                            <span className="text-[#00f5ff]">✓</span> All
                            Updates
                          </p>
                        </div>
                      </div>
                      <div className="px-6 pb-6 pt-2">
                        <button
                          onClick={() => setCheckoutProduct(edge.node)}
                          className="w-full py-3 font-bold rounded-2xl text-sm bg-gradient-to-r from-[#0099ff] to-[#00f5ff] text-white uppercase hover:shadow-lg hover:shadow-[#0099ff]/60 transition-all duration-300"
                        >
                          ✦ Subscribe
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
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
      </>
    );
  }

  // Other brands - Grid layout
  return (
    <>
      <section
        className={`py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b ${brand === "androfud" ? "from-[#000000] to-[#000000]" : "from-[#0c2d3d] to-[#1e1b4b]"}`}
      >
        <div className="max-w-7xl mx-auto">
          {brandedProducts.length > 0 && (
            <div className="text-center mb-16 slide-in-up">
              <h2
                className={`text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${content.gradient} mb-4`}
              >
                Choose Your Plan
              </h2>
              <p
                className={`text-lg ${brand === "androfud" ? "text-[#0099ff]-300" : "text-[#67e8f9]-300"}`}
              >
                {brand === "androfud"
                  ? "First week discount on all subscriptions"
                  : "Premium access to advanced features"}
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {brandedProducts.slice(0, 4).map((edge: any, idx: number) => (
              <div
                key={idx}
                className={`card-neon group slide-in-up flex flex-col justify-between rounded-3xl border-2 transition-all duration-500 ${brand === "androfud" ? "bg-gradient-to-br from-[#1a1a2e] to-[#0a0a0a] border-[#0099ff]/30 hover:border-[#00f5ff]/80 hover:shadow-2xl hover:shadow-[#0099ff]/40" : "bg-gradient-to-br from-[#1a1a2e] to-[#0a0a0a] border-[#0099ff]/30 hover:border-[#00f5ff]/80 hover:shadow-2xl hover:shadow-[#0099ff]/40"}`}
                style={{
                  animation: `curveFloat 3s ease-in-out infinite`,
                  animationDelay: `${idx * 0.2}s`,
                }}
              >
                <div className="p-6 space-y-4">
                  <div
                    className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${content.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t`}
                  ></div>
                  <h3
                    className={`text-lg font-bold break-words overflow-hidden ${brand === "androfud" ? "text-[#00f5ff]" : "text-[#67e8f9]"}`}
                  >
                    {edge.node.name}
                  </h3>
                  <div className="mb-6 relative">
                    {(() => {
                      const productName = edge.node.name;
                      const discountInfo = getProductDiscount(productName);
                      const discountPercent = discountInfo.discount;
                      const originalPrice = edge.node.price;
                      const discountedPrice = Math.round(
                        originalPrice * (1 - discountPercent / 100),
                      );
                      const originalBeforeDiscount = Math.round(
                        originalPrice / (1 - discountPercent / 100),
                      );

                      return (
                        <>
                          {/* Discount Badge - Only show if discount > 0 */}
                          {discountPercent > 0 && (
                            <div className="absolute -top-3 -right-3 space-y-1">
                              <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                                🔥 {discountPercent}% OFF
                              </div>
                              {discountInfo.countdown && (
                                <p className="text-xs text-green-300 font-semibold text-center">
                                  {discountInfo.countdown}
                                </p>
                              )}
                            </div>
                          )}

                          {/* Original Price - Only show if discount > 0 */}
                          {discountPercent > 0 && (
                            <div
                              className={`text-sm line-through opacity-60 mb-2 ${brand === "androfud" ? "text-[#00f5ff]" : "text-[#67e8f9]"}`}
                            >
                              ${originalBeforeDiscount}
                            </div>
                          )}

                          {/* Discounted Price */}
                          <div
                            className={`text-4xl font-bold mb-1 text-green-400`}
                          >
                            ${discountedPrice}
                          </div>
                          <p
                            className={`text-xs opacity-75 ${brand === "androfud" ? "text-[#00f5ff]" : "text-[#67e8f9]"}`}
                          >
                            {brand === "androfud"
                              ? ""
                              : originalPrice == 750
                                ? "per year"
                                : "per month"}
                          </p>
                        </>
                      );
                    })()}
                  </div>

                  <div className="space-y-3 mb-8">
                    <p
                      className={`flex items-center gap-3 ${brand === "androfud" ? "text-[#00f5ff]" : "text-[#67e8f9]"}`}
                    >
                      <span
                        className={`text-lg ${brand === "androfud" ? "text-[#00f5ff]" : "text-[#67e8f9]"}`}
                      >
                        ✓
                      </span>{" "}
                      Full Access
                    </p>
                    <p
                      className={`flex items-center gap-3 ${brand === "androfud" ? "text-[#00f5ff]" : "text-[#67e8f9]"}`}
                    >
                      <span
                        className={`text-lg ${brand === "androfud" ? "text-[#00f5ff]" : "text-[#67e8f9]"}`}
                      >
                        ✓
                      </span>
                      {brand === "androfud"
                        ? "Custom Dropper"
                        : "Priority Support"}
                    </p>
                    <p
                      className={`flex items-center gap-3 ${brand === "androfud" ? "text-[#00f5ff]" : "text-[#67e8f9]"}`}
                    >
                      <span
                        className={`text-lg ${brand === "androfud" ? "text-[#00f5ff]" : "text-[#67e8f9]"}`}
                      >
                        ✓
                      </span>{" "}
                      All Updates
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2">
                  <button
                    onClick={() => setCheckoutProduct(edge.node)}
                    className={`w-full py-4 font-bold rounded-2xl text-sm group relative text-white uppercase tracking-wide transition-all duration-300 ${brand === "androfud" ? "bg-gradient-to-r from-[#0099ff] to-[#00f5ff] hover:shadow-lg hover:shadow-[#0099ff]/60" : "bg-gradient-to-r from-[#0099ff] to-[#00f5ff] hover:shadow-lg hover:shadow-[#0099ff]/60"}`}
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

            {brand === "androfud" && (
              <div
                className="card-neon group slide-in-up flex flex-col justify-between rounded-3xl border-2 transition-all duration-500 bg-gradient-to-br from-purple-950/40 to-pink-950/40 border-purple-500/30 hover:border-pink-400/80 hover:shadow-2xl hover:shadow-purple-500/40"
                style={{
                  animation: `curveFloat 3s ease-in-out infinite`,
                  animationDelay: `${4 * 0.2}s`,
                }}
              >
                <div className="p-6 space-y-4">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t"></div>
                  <h3 className="text-lg font-bold break-words overflow-hidden text-purple-300">
                    APK Free Trial
                  </h3>
                  <div className="mb-6">
                    <div className="text-4xl font-bold mb-1 text-green-400">
                      FREE
                    </div>
                    <p className="text-xs opacity-75 text-purple-300">
                      Try before you buy
                    </p>
                  </div>

                  <div className="space-y-3 mb-8">
                    <p className="flex items-center gap-3 text-purple-300">
                      <span className="text-lg text-green-400">✓</span> Test on
                      Your APK
                    </p>
                    <p className="flex items-center gap-3 text-purple-300">
                      <span className="text-lg text-green-400">✓</span> Custom
                      Dropper
                    </p>
                    <p className="flex items-center gap-3 text-purple-300">
                      <span className="text-lg text-green-400">✓</span> In 30
                      Seconds
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2">
                  <button
                    onClick={() => setIsTrialModalOpen(true)}
                    className="w-full py-4 font-bold rounded-2xl text-sm group relative text-white uppercase tracking-wide transition-all duration-300 bg-gradient-to-r from-purple-600 to-pink-600 hover:shadow-lg hover:shadow-purple-500/60"
                    style={{
                      animation: `buttonGlow 2s ease-in-out infinite`,
                      animationDelay: `${4 * 0.2}s`,
                    }}
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      ✦ START FREE TRIAL
                    </span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {brandedProducts.length === 0 && (
            <div className="text-center py-12 space-y-4">
              <p
                className={`text-lg ${brand === "androfud" ? "text-[#0099ff]-300" : "text-[#67e8f9]-300"}`}
              >
                Add {brand === "androfud" ? "Androfud" : "BT Mob"} products
                through admin panel to display them here
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

      {/* Trial Modal */}
      <TrialModal
        isOpen={isTrialModalOpen}
        onClose={() => setIsTrialModalOpen(false)}
      />
    </>
  );
}
