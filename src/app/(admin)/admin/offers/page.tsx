"use client";

import { useState, useEffect } from "react";
import { adminFetch } from "@/lib/admin-fetch";

interface ProductOffer {
  productName: string;
  baseDiscount: number;
  label: string;
  expiresAt?: string;
  validForDays?: number;
}

interface DbProduct {
  id: string;
  name: string;
  price: number;
}

export default function OffersAdminPage() {
  const [productOffers, setProductOffers] = useState<ProductOffer[]>([]);
  const [allProducts, setAllProducts] = useState<DbProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [countdowns, setCountdowns] = useState<{ [key: string]: string }>({});
  const [newProduct, setNewProduct] = useState({
    productName: "",
    baseDiscount: 30,
    validForDays: 7,
  });

  useEffect(() => {
    fetchOffers();
    fetchProducts();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      updateCountdowns();
    }, 1000);
    return () => clearInterval(interval);
  }, [productOffers]);

  const updateCountdowns = () => {
    const newCountdowns: { [key: string]: string } = {};
    productOffers.forEach((offer: any) => {
      const expiresAt = offer.expiresAt || offer.expires_at;
      if (expiresAt) {
        const expiresDate = new Date(expiresAt);
        const now = new Date();
        const diff = expiresDate.getTime() - now.getTime();

        if (diff <= 0) {
          newCountdowns[offer.productName] = "EXPIRED";
        } else {
          const days = Math.floor(diff / (1000 * 60 * 60 * 24));
          const hours = Math.floor(
            (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
          );
          const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          newCountdowns[offer.productName] = `${days}d ${hours}h ${minutes}m`;
        }
      }
    });
    setCountdowns(newCountdowns);
  };

  const fetchOffers = async () => {
    try {
      const response = await adminFetch("/api/admin/offers");
      const data = await response.json();
      setProductOffers(data.productOffers || []);
      setLoading(false);
      updateCountdowns();
    } catch (error) {
      console.error("Error fetching offers:", error);
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await adminFetch("/api/admin/products-list");
      const data = await response.json();
      const products = data.products || [];
      setAllProducts(products);
      console.log("Fetched products:", products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const updateProductOffer = async (productName: string, discount: number) => {
    setSaving(true);
    try {
      const res = await adminFetch("/api/admin/offers", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "product",
          productName,
          baseDiscount: discount,
        }),
      });
      if (res.ok) {
        setMessage("✅ Updated successfully!");
        setTimeout(() => setMessage(""), 2000);
        fetchOffers();
      }
    } catch (error) {
      setMessage("❌ Error updating");
    } finally {
      setSaving(false);
    }
  };

  const addProductOffer = async () => {
    if (!newProduct.productName.trim()) {
      setMessage("⚠️ Product name required");
      return;
    }
    setSaving(true);
    try {
      const selectedProduct = allProducts.find(
        (p: DbProduct) => p.name === newProduct.productName,
      );

      if (!selectedProduct) {
        setMessage("❌ Product not found in database");
        setSaving(false);
        return;
      }

      const res = await adminFetch("/api/admin/offers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productName: selectedProduct.name,
          baseDiscount: newProduct.baseDiscount,
          validForDays: newProduct.validForDays,
        }),
      });
      if (res.ok) {
        setNewProduct({ productName: "", baseDiscount: 30, validForDays: 7 });
        setMessage(
          `✅ Offer applied to "${selectedProduct.name}" for ${newProduct.validForDays} days!`,
        );
        setTimeout(() => setMessage(""), 3000);
        fetchOffers();
      } else {
        const errorData = await res.json();
        setMessage(`❌ ${errorData.error || "Error adding offer"}`);
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("❌ Error adding offer");
    } finally {
      setSaving(false);
    }
  };

  const deleteProductOffer = async (productName: string) => {
    if (!confirm(`Delete "${productName}"?`)) return;
    setSaving(true);
    try {
      const res = await adminFetch("/api/admin/offers", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productName }),
      });
      if (res.ok) {
        setMessage("✅ Deleted successfully!");
        setTimeout(() => setMessage(""), 2000);
        fetchOffers();
      }
    } catch (error) {
      setMessage("❌ Error deleting");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8 p-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-[#0099ff] mb-2">
          💰 Manage Offers
        </h1>
        <p className="text-[#67e8f9]">
          Set discounts for selected products with automatic expiration
        </p>
      </div>

      {/* Message */}
      {message && (
        <div className="p-4 rounded-lg bg-blue-950/50 border border-[#0099ff]/50 text-[#00f5ff]">
          {message}
        </div>
      )}

      {loading ? (
        <div className="text-center text-[#67e8f9]">Loading...</div>
      ) : (
        <>
          {/* Product Offers */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-[#00f5ff] mb-4">
                🏷️ Product Discounts
              </h2>

              {/* Add Form */}
              <div className="bg-slate-900/50 rounded-xl p-6 border border-[#0099ff]/20 mb-6">
                <div className="space-y-3">
                  <div>
                    <label className="text-[#67e8f9] text-sm mb-2 block">
                      Select Product
                    </label>
                    <select
                      value={newProduct.productName}
                      onChange={(e) =>
                        setNewProduct({
                          ...newProduct,
                          productName: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 bg-slate-800 border border-[#0099ff]/50 rounded-lg text-white focus:border-[#00f5ff] outline-none"
                    >
                      <option value="">-- Choose a product --</option>
                      {allProducts.map((product) => (
                        <option key={product.id} value={product.name}>
                          {product.name} (${product.price})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[#67e8f9] text-sm">
                        Discount %
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={newProduct.baseDiscount}
                        onChange={(e) =>
                          setNewProduct({
                            ...newProduct,
                            baseDiscount: parseInt(e.target.value) || 0,
                          })
                        }
                        className="w-full px-4 py-2 bg-slate-800 border border-[#0099ff]/50 rounded-lg text-white focus:border-[#00f5ff] outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[#67e8f9] text-sm">
                        Valid for Days
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="365"
                        value={newProduct.validForDays}
                        onChange={(e) =>
                          setNewProduct({
                            ...newProduct,
                            validForDays: parseInt(e.target.value) || 7,
                          })
                        }
                        className="w-full px-4 py-2 bg-slate-800 border border-[#0099ff]/50 rounded-lg text-white focus:border-[#00f5ff] outline-none"
                      />
                    </div>
                  </div>
                  <button
                    onClick={addProductOffer}
                    disabled={saving || !newProduct.productName}
                    className="w-full px-6 py-2 bg-gradient-to-r from-[#0099ff] to-[#00f5ff] text-white font-bold rounded-lg hover:shadow-lg transition-all disabled:opacity-50"
                  >
                    {saving ? "..." : "Add Offer"}
                  </button>
                </div>
              </div>

              {/* Product List */}
              <div className="space-y-3">
                {productOffers.length === 0 ? (
                  <p className="text-[#67e8f9] text-center py-8">
                    No active offers. Add one to get started!
                  </p>
                ) : (
                  productOffers.map((offer) => (
                    <div
                      key={offer.productName}
                      className={`rounded-lg p-4 border flex items-center justify-between transition-all ${
                        countdowns[offer.productName] === "EXPIRED"
                          ? "bg-red-950/30 border-red-500/20"
                          : "bg-slate-900/30 border-[#0099ff]/20 hover:border-[#0099ff]/50"
                      }`}
                    >
                      <div>
                        <p className="text-white font-semibold">
                          {offer.productName}
                        </p>
                        <div className="flex gap-4 text-sm mt-1">
                          <p className="text-[#67e8f9]">{offer.label}</p>
                          <p
                            className={`font-bold ${
                              countdowns[offer.productName] === "EXPIRED"
                                ? "text-red-400"
                                : "text-green-400"
                            }`}
                          >
                            ⏱️ {countdowns[offer.productName] || "Loading..."}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={offer.baseDiscount}
                          onChange={(e) =>
                            updateProductOffer(
                              offer.productName,
                              parseInt(e.target.value),
                            )
                          }
                          className="w-20 px-3 py-2 bg-slate-800 border border-[#0099ff]/50 rounded text-white focus:border-[#00f5ff] outline-none"
                        />
                        <button
                          onClick={() => deleteProductOffer(offer.productName)}
                          className="px-4 py-2 bg-red-600/30 text-red-300 rounded-lg hover:bg-red-600/50 transition-all border border-red-500/50"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="bg-cyan-900/20 rounded-lg p-4 border border-cyan-500/30 text-cyan-100 text-sm space-y-2">
            <p>
              <strong>ℹ️ How it works:</strong>
            </p>
            <ul className="space-y-1 text-xs">
              <li>
                • Select the specific product subscription you want to discount
              </li>
              <li>• Set the discount percentage (0-100%)</li>
              <li>• Set how many days the offer is valid</li>
              <li>• Countdown timer shows remaining time</li>
              <li>• Offer automatically expires after the set days</li>
              <li>• Only products with active offers show discounts</li>
            </ul>
          </div>

          {/* Available Products */}
          <div className="bg-blue-900/20 rounded-lg p-4 border border-blue-500/30 text-blue-100 text-sm space-y-3">
            <p>
              <strong>📦 Available Products in Database:</strong>
            </p>
            <div className="max-h-48 overflow-y-auto bg-slate-900/50 rounded p-3 border border-blue-500/20">
              {allProducts.length > 0 ? (
                <ul className="text-xs space-y-1">
                  {allProducts.map((product) => (
                    <li key={product.id} className="text-blue-300">
                      • <span className="font-semibold">{product.name}</span> (
                      ${product.price})
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-blue-400 text-xs">No products found</p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
