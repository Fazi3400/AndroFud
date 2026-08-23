"use client";

import { useState } from "react";
import { ReviewModal } from "@/components/home/ReviewModal";

interface OrdersClientProps {
  ordersList: any[];
}

export function OrdersClient({ ordersList }: OrdersClientProps) {
  const [reviewModal, setReviewModal] = useState<{
    isOpen: boolean;
    productName: string;
    brand: string;
  }>({
    isOpen: false,
    productName: "",
    brand: "",
  });

  const detectBrand = (productName: string): string => {
    const name = productName.toLowerCase();
    if (name.includes("androfud") || name.includes("dropper")) return "Androfud";
    if (name.includes("btmob") || name.includes("bt mob")) return "BT Mob";
    if (name.includes("windows") || name.includes("s400") || name.includes("venom")) return "Windows Tools";
    return "Androfud";
  };

  const handleReviewClick = (productName: string) => {
    const brand = detectBrand(productName);
    setReviewModal({
      isOpen: true,
      productName,
      brand,
    });
  };

  return (
    <>
      <div className="min-h-screen bg-black space-y-8 py-8">
        {/* Header */}
        <div className="space-y-2 px-4">
          <h1 className="text-4xl font-bold text-[#a855f7]">Orders</h1>
          <p className="text-[#67e8f9]">View and manage your orders</p>
        </div>

        {/* Separator */}
        <div className="h-0.5 bg-gradient-to-r from-[#0099ff] to-transparent"></div>

        {/* Content */}
        <div className="grid grid-cols-12 gap-x-5 px-4">
          <section className="col-span-12">
            {ordersList.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-[#67e8f9] text-lg mb-4">No orders yet</p>
                <p className="text-[#285A48] text-sm">
                  Your orders will appear here once you make a purchase
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {ordersList.map((order: any) => (
                  <div
                    key={order.id}
                    className="bg-[#0d2818] rounded-2xl border-2 border-[#0099ff] p-6 hover:border-[#d8b4fe] transition-colors"
                  >
                    <div className="grid grid-cols-5 gap-4 mb-6">
                      <div>
                        <p className="text-xs text-[#67e8f9] font-medium">Order Placed</p>
                        <p className="text-sm text-[#a855f7]">
                          {new Date(order.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-[#67e8f9] font-medium">Total</p>
                        <p className="text-sm text-[#a855f7]">${Number(order.amount).toFixed(2)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-[#67e8f9] font-medium">Status</p>
                        <p className={`text-sm font-semibold ${
                          order.payment_status === "paid"
                            ? "text-green-400"
                            : "text-yellow-400"
                        }`}>
                          {order.payment_status}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-[#67e8f9] font-medium">Method</p>
                        <p className="text-sm text-[#a855f7]">
                          {order.payment_method === "crypto" ? "₿ Crypto" : "💳 Card"}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-[#67e8f9] font-medium">Order ID</p>
                        <p className="text-sm text-[#a855f7]">#{order.id.substring(0, 8)}</p>
                      </div>
                    </div>

                    {order.order_lines && order.order_lines.length > 0 && (
                      <div className="space-y-3 border-t border-[#0099ff] pt-4">
                        <p className="text-xs text-[#67e8f9] font-medium mb-3">Items</p>
                        {order.order_lines.map((line: any, idx: number) => (
                          <div
                            key={idx}
                            className="flex gap-4 pb-3 border-b border-[#0099ff] last:border-b-0 items-center justify-between"
                          >
                            <div className="flex gap-4 flex-1">
                              <div className="flex-shrink-0">
                                <p className="text-xs text-[#67e8f9] bg-[#1a3a2e] px-2 py-1 rounded">
                                  ×1
                                </p>
                              </div>
                              <div className="flex-1">
                                <p className="text-sm text-[#a855f7]">
                                  {line.products?.name || "Product"}
                                </p>
                                <p className="text-xs text-[#67e8f9]">
                                  ${Number(line.products?.price || 0).toFixed(2)}
                                </p>
                              </div>
                            </div>

                            {/* Review Button */}
                            {order.payment_status === "paid" && (
                              <button
                                onClick={() => handleReviewClick(line.products?.name || "Product")}
                                className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 text-sm whitespace-nowrap"
                              >
                                ⭐ Leave Review
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>

      {/* Review Modal */}
      <ReviewModal
        isOpen={reviewModal.isOpen}
        onClose={() => setReviewModal({ ...reviewModal, isOpen: false })}
        productName={reviewModal.productName}
        brand={reviewModal.brand}
      />
    </>
  );
}
