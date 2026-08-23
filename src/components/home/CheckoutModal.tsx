"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Icons } from "@/components/layouts/icons";
import { useProductDiscount } from "@/hooks/useProductDiscount";

interface CheckoutModalProps {
  productId: string;
  productName: string;
  productPrice: string;
  isOpen: boolean;
  onClose: () => void;
}

export function CheckoutModal({
  productId,
  productName,
  productPrice,
  isOpen,
  onClose,
}: CheckoutModalProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<"crypto" | "card" | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const { getDiscount } = useProductDiscount();

  // Calculate discounted price
  const discountInfo = getDiscount(productName);
  const originalPrice = parseInt(productPrice) || 0;
  const discountedPrice = Math.round(
    originalPrice * (1 - discountInfo.discount / 100)
  );
  const finalPrice = discountInfo.discount > 0 ? discountedPrice : originalPrice;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleCheckout = async () => {
    if (!selectedMethod) return;

    setIsLoading(true);

    try {
      const productData = {
        id: productId,
        name: productName,
        price: finalPrice,
        originalPrice: originalPrice,
        discount: discountInfo.discount,
        quantity: 1,
        paymentMethod: selectedMethod,
      };
      sessionStorage.setItem("checkoutProduct", JSON.stringify(productData));

      if (selectedMethod === "crypto") {
        router.push("/crypto-checkout");
      } else {
        router.push("/card-checkout");
      }

      onClose();
    } catch (error) {
      console.error("Checkout error:", error);
      setIsLoading(false);
    }
  };

  if (!isMounted) return null;

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 z-40 backdrop-blur-md"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-gradient-to-br from-slate-900 via-blue-900/40 to-black rounded-3xl shadow-2xl shadow-cyan-500/40 border border-cyan-500/30 w-full max-w-2xl max-h-[90vh] overflow-y-auto p-8 space-y-8 scrollbar-thin scrollbar-thumb-cyan-500 scrollbar-track-slate-900">

          {/* Header Section */}
          <div className="space-y-6">
            <div className="inline-block">
              <div className="px-4 py-2 rounded-full bg-gradient-to-r from-cyan-600/30 to-blue-600/30 border border-cyan-500/50">
                <p className="text-xs font-mono text-cyan-400 font-semibold uppercase tracking-widest">Secure Checkout</p>
              </div>
            </div>

            <div>
              <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 mb-2">
                Order Summary
              </h2>
              <p className="text-cyan-200/70">Complete your purchase securely</p>
            </div>

            {/* Product Details Card */}
            <div className="bg-gradient-to-br from-blue-950/40 via-slate-900/30 to-black/40 rounded-2xl p-6 border border-cyan-500/20 backdrop-blur-sm">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-cyan-400/70 font-mono uppercase tracking-wider mb-2">Product</p>
                    <h3 className="text-2xl font-bold text-white">{productName}</h3>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-cyan-400/70 font-mono uppercase tracking-wider mb-2">Price</p>
                    {discountInfo.discount > 0 ? (
                      <div className="space-y-1">
                        <p className="text-lg line-through text-cyan-400/50">
                          ${originalPrice}
                        </p>
                        <p className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-emerald-300">
                          ${finalPrice}
                        </p>
                        <p className="text-xs text-green-400 font-bold">
                          Save ${originalPrice - finalPrice} ({discountInfo.discount}% OFF)
                        </p>
                      </div>
                    ) : (
                      <p className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300">
                        ${productPrice}
                      </p>
                    )}
                  </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-cyan-500/0 via-cyan-500/30 to-cyan-500/0"></div>

                {/* Benefits */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-cyan-400">✓</span>
                    <span className="text-sm text-gray-300">Instant Access</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-cyan-400">✓</span>
                    <span className="text-sm text-gray-300">Lifetime License</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-cyan-400">✓</span>
                    <span className="text-sm text-gray-300">24/7 Support</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-cyan-400">✓</span>
                    <span className="text-sm text-gray-300">Free Updates</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Method Selection */}
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-bold text-white mb-1">Payment Method</h3>
              <p className="text-sm text-cyan-400/60">Choose your preferred payment option</p>
            </div>

            <div className="space-y-3">
              {/* Crypto Option */}
              <button
                onClick={() => setSelectedMethod("crypto")}
                className={`w-full group relative overflow-hidden rounded-2xl p-6 border-2 transition-all duration-300 ${
                  selectedMethod === "crypto"
                    ? "border-cyan-400 bg-gradient-to-r from-cyan-600/20 to-blue-600/20 shadow-lg shadow-cyan-500/30"
                    : "border-cyan-500/30 hover:border-cyan-500/60 bg-slate-900/40 hover:bg-slate-900/60"
                }`}
              >
                {/* Animated Background */}
                <div className={`absolute inset-0 opacity-0 ${selectedMethod === "crypto" ? "opacity-20" : "group-hover:opacity-10"} transition-opacity bg-gradient-to-r from-cyan-600 to-blue-600`}></div>

                <div className="relative flex items-center gap-4">
                  <div className={`p-3 rounded-xl transition-all ${
                    selectedMethod === "crypto"
                      ? "bg-gradient-to-br from-cyan-500/40 to-blue-500/40"
                      : "bg-cyan-600/20 group-hover:bg-cyan-600/30"
                  }`}>
                    <Icons.zap className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div className="text-left flex-1">
                    <p className="font-bold text-white text-lg">Cryptocurrency</p>
                    <p className="text-sm text-cyan-400/70">Bitcoin, Ethereum, Litecoin & more</p>
                  </div>
                  {selectedMethod === "crypto" && (
                    <div className="w-6 h-6 rounded-full border-2 border-cyan-400 bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                      <div className="w-2.5 h-2.5 rounded-full bg-cyan-400"></div>
                    </div>
                  )}
                </div>
              </button>

              {/* Card Option */}
              <button
                onClick={() => setSelectedMethod("card")}
                disabled
                className="w-full group relative overflow-hidden rounded-2xl p-6 border-2 border-gray-600/30 bg-slate-900/30 cursor-not-allowed opacity-60 transition-all duration-300"
              >
                <div className="relative flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-gray-600/20">
                    <Icons.billing className="w-6 h-6 text-gray-500" />
                  </div>
                  <div className="text-left flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-gray-400 text-lg">Card Payment</p>
                      <span className="px-2 py-0.5 rounded text-xs font-bold bg-red-600/30 text-red-400 border border-red-500/50">Coming Soon</span>
                    </div>
                    <p className="text-sm text-gray-500">Visa, Mastercard & more</p>
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Important Notice */}
          <div className="relative overflow-hidden rounded-2xl p-6 bg-gradient-to-br from-orange-950/40 to-red-950/30 border border-orange-500/40 backdrop-blur-sm">
            <div className="absolute inset-0 opacity-10 bg-gradient-to-r from-orange-500 to-red-500"></div>

            <div className="relative space-y-4">
              <div className="flex items-start gap-3">
                <span className="text-2xl flex-shrink-0">🔒</span>
                <div>
                  <p className="font-bold text-orange-300 text-lg">Security & Verification</p>
                  <p className="text-sm text-gray-300 leading-relaxed mt-2">
                    After completing your payment, please share your <span className="font-semibold text-orange-200">payment receipt</span> with the owner via Telegram or WhatsApp for account verification and activation.
                  </p>
                </div>
              </div>

              {/* Contact Options */}
              <div className="flex gap-3 pt-2">
                <a
                  href="https://t.me/happy_king_officials"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-600/20 to-blue-600/20 border border-cyan-500/50 text-cyan-300 hover:text-cyan-200 hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-500/40 transition-all duration-300 font-semibold text-sm flex items-center justify-center gap-2 group"
                >
                  <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 6.627 5.373 12 12 12s12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.328-.373-.115l-6.869 4.332-2.96-.924c-.643-.204-.657-.643.135-.954l11.566-4.458c.54-.197 1.01.132.84.951z"/>
                  </svg>
                  <span>Telegram</span>
                </a>

                <a
                  href="https://wa.me/19177643914"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-green-600/20 to-emerald-600/20 border border-green-500/50 text-green-300 hover:text-green-200 hover:border-green-400 hover:shadow-lg hover:shadow-green-500/40 transition-all duration-300 font-semibold text-sm flex items-center justify-center gap-2 group"
                >
                  <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.001 2c5.523 0 10 4.477 10 10s-4.477 10-10 10c-1.746 0-3.396-.448-4.83-1.236l-5.493 1.262 1.262-5.493A9.954 9.954 0 0 1 2.001 12c0-5.523 4.477-10 10-10z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                  </svg>
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-6 border-t border-cyan-500/10">
            <button
              onClick={onClose}
              className="flex-1 py-3 px-6 rounded-xl font-bold text-lg transition-all duration-300 border-2 border-cyan-500/40 text-cyan-300 hover:border-cyan-400 hover:bg-cyan-500/10 hover:shadow-lg hover:shadow-cyan-500/20"
            >
              Cancel
            </button>
            <button
              onClick={handleCheckout}
              disabled={!selectedMethod || isLoading}
              className={`flex-1 py-3 px-6 rounded-xl font-bold text-lg transition-all duration-300 ${
                selectedMethod && !isLoading
                  ? "bg-gradient-to-r from-cyan-600 to-blue-600 text-white hover:shadow-2xl hover:shadow-cyan-500/50 hover:scale-105 border border-cyan-400/50"
                  : "bg-gray-600 text-gray-400 cursor-not-allowed opacity-60"
              }`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="animate-spin">⚙️</span> Processing...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  🚀 Proceed to Payment
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
