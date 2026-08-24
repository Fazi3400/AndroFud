"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { useAuth } from "@/providers/AuthProvider";
import useCartStore from "@/features/carts/useCartStore";
import { Shell } from "@/components/layouts/Shell";
import { Spinner } from "@/components/ui/spinner";

export default function CryptoCheckoutPage() {
  const router = useRouter();
  const { user } = useAuth();
  const guestCartItems = useCartStore((s) => s.cart);
  const removeAllProducts = useCartStore((s) => s.removeAllProducts);

  const [isProcessing, setIsProcessing] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const hasProcessed = useRef(false);

  useEffect(() => {
    if (hasProcessed.current) return;
    hasProcessed.current = true;

    const processCheckout = async () => {
      try {
        let cartItems: Record<string, { quantity: number }> = {};
        let fromSessionStorage = false;

        // Check if there's a direct checkout from product card
        if (typeof window !== "undefined") {
          const checkoutProductStr = sessionStorage.getItem("checkoutProduct");
          if (checkoutProductStr) {
            try {
              const checkoutProduct = JSON.parse(checkoutProductStr);
              console.log(
                "Using product from sessionStorage:",
                checkoutProduct,
              );
              cartItems[checkoutProduct.id] = {
                quantity: checkoutProduct.quantity || 1,
              };
              fromSessionStorage = true;
              sessionStorage.removeItem("checkoutProduct");
            } catch (e) {
              console.error("Failed to parse sessionStorage product:", e);
            }
          }
        }

        // Only fetch from server if not from sessionStorage
        if (!fromSessionStorage) {
          if (user) {
            const cartResponse = await fetch("/api/cart");
            if (cartResponse.ok) {
              const cartData = await cartResponse.json();
              cartItems = cartData.cartItems || {};
            } else {
              throw new Error("Failed to fetch cart");
            }
          } else {
            cartItems = guestCartItems;
          }
        }

        console.log(
          "Crypto checkout - cart items:",
          cartItems,
          "User:",
          !!user,
        );

        if (Object.keys(cartItems).length === 0) {
          console.warn("No cart items, redirecting to cart");
          router.push("/cart");
          return;
        }

        const response = await fetch("/api/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            orderProducts: cartItems,
            guest: !user,
            paymentMethod: "crypto",
          }),
        });

        const data = await response.json();
        console.log("API response:", { status: response.status, data });

        if (response.status === 401) {
          console.warn("❌ Unauthorized - redirecting to login");
          router.push(
            `/sign-in?redirectTo=${encodeURIComponent("/crypto-checkout")}`,
          );
          return;
        }

        if (!response.ok) {
          throw new Error(data.error || `Checkout failed: ${response.status}`);
        }

        console.log(
          "✅ Payment data received, redirecting to NOWPayments...",
          data,
        );

        // Clear guest cart before redirecting
        if (!user) {
          removeAllProducts();
        }

        // Redirect to NOWPayments hosted payment page
        if (data.hostedPaymentUrl) {
          console.log(
            "✅ Redirecting to NOWPayments hosted page:",
            data.hostedPaymentUrl,
          );
          window.location.href = data.hostedPaymentUrl;
        } else {
          throw new Error("No payment URL received from NOWPayments");
        }
      } catch (err) {
        console.error("❌ Checkout error:", err);
        setError(err instanceof Error ? err.message : "An error occurred");
        setIsProcessing(false);
      }
    };

    processCheckout();
  }, []);

  if (isProcessing) {
    return (
      <main className="bg-[#0a0e27] min-h-screen flex items-center justify-center">
        <Shell>
          <div className="flex flex-col items-center gap-4">
            <Spinner className="h-8 w-8 animate-spin" />
            <p className="text-white">Creating crypto payment...</p>
          </div>
        </Shell>
      </main>
    );
  }

  if (error) {
    return (
      <main className="bg-[#0a0e27] min-h-screen flex items-center justify-center">
        <Shell>
          <div className="text-center space-y-4">
            <h1 className="text-2xl font-bold text-red-500">Payment Error</h1>
            <p className="text-gray-300">{error}</p>
            <button
              onClick={() => router.push("/cart")}
              className="mt-4 px-6 py-2 bg-[#d8b4fe] text-white rounded-full hover:bg-[#0099ff] transition"
            >
              Back to Cart
            </button>
          </div>
        </Shell>
      </main>
    );
  }

  return null;
}
