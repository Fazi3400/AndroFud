import CartSection from "@/features/carts/components/CartSection";
import CartSectionSkeleton from "@/features/carts/components/CartSectionSkeleton";
import { Shell } from "@/components/layouts/Shell";

import Link from "next/link";
import { Suspense } from "react";

async function CartPage() {
  return (
    <main className="bg-[#0a0e27] min-h-screen">
      <Shell>
        <section className="flex justify-between items-center py-8">
          <h1 className="text-4xl font-bold text-[#a855f7] neon-text">Your Cart</h1>
          <Link href="/shop" className="px-7 py-2.5 rounded-full font-semibold text-[#0a0e27] bg-[#0099ff] hover:bg-[#d8b4fe] hover:shadow-lg hover:shadow-[#a855f7]/50 transition-all duration-300 transform hover:scale-105 text-sm hacker-glow">Continue shopping</Link>
        </section>

        <Suspense fallback={<CartSectionSkeleton />}>
          <CartSection />
        </Suspense>
      </Shell>
    </main>
  );
}

export default CartPage;
