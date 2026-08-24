"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { useAuth } from "@/providers/AuthProvider";
import useCartStore from "@/features/carts/useCartStore";
import { Shell } from "@/components/layouts/Shell";
import { Spinner } from "@/components/ui/spinner";

export default function CardCheckoutPage() {
  const router = useRouter();
  const { user } = useAuth();
  const guestCartItems = useCartStore((s) => s.cart);
  const removeAllProducts = useCartStore((s) => s.removeAllProducts);
  const hasProcessedRef = useRef(false);

  const [isProcessing, setIsProcessing] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (hasProcessedRef.current) return;
    hasProcessedRef.current = true;

    const processCheckout = async () => {
      try {
        let cartItems: Record<string, { quantity: number }> = {};

        if (user) {
          // Fetch user cart from /api/cart endpoint
          const cartResponse = await fetch("/api/cart");

          if (cartResponse.ok) {
            const cartData = await cartResponse.json();
            cartItems = cartData.cartItems || {};
          } else {
            throw new Error("Failed to fetch cart");
          }
        } else {
          // Use guest cart from zustand
          cartItems = guestCartItems;
        }

        console.log("Card checkout - cart items:", cartItems, "User:", !!user);

        if (!cartItems || Object.keys(cartItems).length === 0) {
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
            paymentMethod: "card",
          }),
        });

        const data = await response.json();
        console.log("API response:", { status: response.status, data });

        if (response.status === 401) {
          // Redirect to login if not authenticated
          console.warn("? Unauthorized - redirecting to login");
          router.push(
            `/sign-in?redirectTo=${encodeURIComponent("/card-checkout")}`,
          );
          return;
        }

        if (!response.ok) {
          throw new Error(data.error || `Checkout failed: ${response.status}`);
        }

        if (data.checkoutUrl) {
          if (!user) {
            removeAllProducts();
          }
          window.location.href = data.checkoutUrl;
        } else {
          throw new Error("No checkout URL received from payment provider");
        }
      } catch (err) {
        console.error("Checkout error:", err);
        setError(err instanceof Error ? err.message : "An error occurred");
        setIsProcessing(false);
      }
    };

    processCheckout();
  }, [user, guestCartItems, router, removeAllProducts]);

  if (isProcessing) {
    return (
      <main className="bg-[#0a0e27] min-h-screen flex items-center justify-center">
        <Shell>
          <div className="flex flex-col items-center gap-4">
            <Spinner className="h-8 w-8 animate-spin text-[#a855f7]" />
            <p className="text-[#a855f7] neon-text">
              Redirecting to payment...
            </p>
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
            <h1 className="text-2xl font-bold text-[#ff00ff]">
              ? Checkout Error
            </h1>
            <p className="text-[#67e8f9]">{error}</p>
            <button
              onClick={() => router.push("/cart")}
              className="px-6 py-2 rounded-full bg-[#0099ff] hover:bg-[#d8b4fe] text-[#0a0e27] font-bold hacker-glow"
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
