"use client";

import { useState, useEffect } from "react";
import { adminFetch } from "@/lib/admin-fetch";

interface ProductOffer {
  productName: string;
  baseDiscount: number;
  label: string;
}

interface DayOffer {
  day: string;
  boost: number;
  label: string;
}

interface DbProduct {
  id: string;
  name: string;
  price: number;
}

export default function OffersAdminPage() {
  const [productOffers, setProductOffers] = useState<ProductOffer[]>([]);
  const [dayOffers, setDayOffers] = useState<DayOffer[]>([]);
  const [allProducts, setAllProducts] = useState<DbProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [newProduct, setNewProduct] = useState({
    productName: "",
    baseDiscount: 30,
  });

  useEffect(() => {
    fetchOffers();
    fetchProducts();
  }, []);

  const fetchOffers = async () => {
    try {
      const response = await adminFetch("/api/admin/offers");
      const data = await response.json();
      setProductOffers(data.productOffers || []);
      setDayOffers(data.dayOffers || []);
      setLoading(false);
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

  const updateDayOffer = async (day: string, boost: number) => {
    setSaving(true);
    try {
      const res = await adminFetch("/api/admin/offers", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "day",
          day,
          boost,
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
      // Find the exact database product that matches the selected product
      const selectedProduct = allProducts.find(
        (p: DbProduct) => p.name === newProduct.productName,
      );

      if (!selectedProduct) {
        setMessage("❌ Product not found in database");
        setSaving(false);
        return;
      }

      // Use the exact database product name
      const res = await adminFetch("/api/admin/offers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productName: selectedProduct.name, // Always use exact database name
          baseDiscount: newProduct.baseDiscount,
        }),
      });
      if (res.ok) {
        setNewProduct({ productName: "", baseDiscount: 30 });
        setMessage(`✅ Offer applied to "${selectedProduct.name}"!`);
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
          Configure product discounts and day-based boosters
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
                  <div className="flex gap-3">
                    <div className="flex-1">
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
                    <button
                      onClick={addProductOffer}
                      disabled={saving || !newProduct.productName}
                      className="px-6 py-2 bg-gradient-to-r from-[#0099ff] to-[#00f5ff] text-white font-bold rounded-lg hover:shadow-lg transition-all disabled:opacity-50 self-end"
                    >
                      {saving ? "..." : "Add"}
                    </button>
                  </div>
                </div>
              </div>

              {/* Product List */}
              <div className="space-y-3">
                {productOffers.map((offer) => (
                  <div
                    key={offer.productName}
                    className="bg-slate-900/30 rounded-lg p-4 border border-[#0099ff]/20 flex items-center justify-between hover:border-[#0099ff]/50 transition-all"
                  >
                    <div>
                      <p className="text-white font-semibold">
                        {offer.productName}
                      </p>
                      <p className="text-[#67e8f9] text-sm">{offer.label}</p>
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
                ))}
              </div>
            </div>
          </div>

          {/* Day Boosts */}
          <div>
            <h2 className="text-2xl font-bold text-purple-300 mb-4">
              📅 Day-Based Boosts
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {dayOffers.map((offer) => (
                <div
                  key={offer.day}
                  className="bg-slate-900/30 rounded-lg p-4 border border-purple-500/20 hover:border-purple-500/50 transition-all"
                >
                  <p className="text-purple-300 font-bold mb-3">{offer.day}</p>
                  <div className="space-y-2">
                    <label className="text-purple-300 text-sm">Boost %:</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={offer.boost}
                      onChange={(e) =>
                        updateDayOffer(offer.day, parseInt(e.target.value))
                      }
                      className="w-full px-3 py-2 bg-slate-800 border border-purple-500/50 rounded text-white focus:border-purple-400 outline-none"
                    />
                    <p className="text-purple-200 text-xs mt-2">
                      {offer.label || "—"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="space-y-6">
            <div className="bg-cyan-900/20 rounded-lg p-4 border border-cyan-500/30 text-cyan-100 text-sm space-y-2">
              <p>
                <strong>ℹ️ How it works:</strong>
              </p>
              <ul className="space-y-1 text-xs">
                <li>• Base Discount: Fixed discount per product</li>
                <li>• Day Boost: Extra % added on specific days</li>
                <li>• Example: 30% + Friday 15% = 45% total</li>
                <li>• Maximum: 70% (auto-capped)</li>
              </ul>
            </div>

            {/* Available Products Info */}
            <div className="bg-blue-900/20 rounded-lg p-4 border border-blue-500/30 text-blue-100 text-sm space-y-3">
              <p>
                <strong>📦 Available Products in Database:</strong>
              </p>
              <div className="max-h-48 overflow-y-auto bg-slate-900/50 rounded p-3 border border-blue-500/20">
                {allProducts.length > 0 ? (
                  <ul className="text-xs space-y-1">
                    {allProducts.map((product) => (
                      <li key={product.id} className="text-blue-300">
                        • <span className="font-semibold">{product.name}</span>{" "}
                        (${product.price})
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-blue-400 text-xs">No products found</p>
                )}
              </div>
              <p className="text-xs text-blue-200">
                Select any product above to create an offer. The offer will
                automatically apply to that exact product in the database.
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
