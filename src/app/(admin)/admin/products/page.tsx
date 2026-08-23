"use client";

import { useState, useEffect } from "react";

interface Product {
  id: string;
  name: string;
  price: number;
  section: string;
  subsection: string;
  description?: string;
}

interface FormData {
  name: string;
  price: number;
  description: string;
  section: "androfud" | "btmob" | "windows" | "";
  subsection: string;
}

const SECTIONS = {
  androfud: { label: "🔵 AndroFud", icon: "📱", color: "from-cyan-500 to-blue-500", subsections: ["plans"] },
  btmob: { label: "🟦 BT MOB", icon: "📡", color: "from-blue-500 to-purple-500", subsections: ["versions"] },
  windows: { label: "🪟 Windows Tools", icon: "💻", color: "from-green-500 to-emerald-500", subsections: ["rats"] },
};

export default function ProductsAdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [selectedSection, setSelectedSection] = useState<"androfud" | "btmob" | "windows">("androfud");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    price: 0,
    description: "",
    section: "androfud",
    subsection: "plans",
  });

  useEffect(() => { fetchProducts(); }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/admin/products");
      const data = await response.json();
      setProducts(data.products || []);
    } catch (error) {
      setMessage("❌ Error fetching products");
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = async () => {
    if (!formData.name.trim() || formData.price <= 0) {
      setMessage("⚠️ Fill all fields");
      return;
    }
    setSaving(true);
    try {
      const method = editingId ? "PUT" : "POST";
      const url = editingId ? `/api/admin/products/${editingId}` : "/api/admin/products";
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          price: parseFloat(formData.price.toString()),
          description: formData.description,
          section: formData.section,
          subsection: formData.subsection,
        }),
      });
      if (response.ok) {
        setMessage(editingId ? "✅ Updated!" : "✅ Added!");
        setTimeout(() => setMessage(""), 2000);
        setFormData({ name: "", price: 0, description: "", section: "androfud", subsection: "plans" });
        setEditingId(null);
        fetchProducts();
      }
    } catch (error) {
      setMessage("❌ Error");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (product: Product) => {
    setEditingId(product.id);
    setFormData({ name: product.name, price: product.price, description: product.description || "", section: product.section as any, subsection: product.subsection });
    setSelectedSection(product.section as any);
  };

  const handleDelete = async (productId: string) => {
    if (!confirm("Delete?")) return;
    try {
      await fetch(`/api/admin/products/${productId}`, { method: "DELETE" });
      fetchProducts();
    } catch (error) {
      setMessage("❌ Error deleting");
    }
  };

  const filteredProducts = products.filter((p) => p.section === selectedSection);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900/20 to-slate-900 p-8">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-4 mb-4">
          <div className="text-5xl">📦</div>
          <div>
            <h1 className="text-5xl font-black bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
              Product Management
            </h1>
            <p className="text-cyan-300/70 text-lg">Manage products for all sections - Only displayed products appear on website</p>
          </div>
        </div>
        <div className="h-1 w-32 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"></div>
      </div>

      {/* Message */}
      {message && (
        <div className="mb-8 p-4 rounded-xl bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/50 text-green-300 font-semibold animate-pulse">
          {message}
        </div>
      )}

      {loading ? (
        <div className="text-center py-20">
          <div className="text-6xl mb-4 animate-bounce">⚙️</div>
          <p className="text-cyan-300 text-xl">Loading products...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Add/Edit Form */}
          <div className="xl:col-span-1">
            <div className="sticky top-8 bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-2xl p-8 border-2 border-cyan-500/30 hover:border-cyan-400/50 transition-all backdrop-blur-sm">
              <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 mb-6 flex items-center gap-2">
                {editingId ? "✏️ Edit" : "➕ Add Product"}
              </h2>

              <div className="space-y-4">
                {/* Section */}
                <div>
                  <label className="block text-cyan-300 text-sm font-bold mb-2">Section</label>
                  <select
                    value={formData.section}
                    onChange={(e) => {
                      const s = e.target.value as any;
                      setFormData({ ...formData, section: s, subsection: SECTIONS[s]?.subsections[0] || "" });
                      setSelectedSection(s);
                    }}
                    className="w-full px-4 py-3 bg-slate-700/50 border-2 border-cyan-500/30 rounded-lg text-white font-semibold focus:border-cyan-400 outline-none transition-all"
                  >
                    <option value="">Choose Section</option>
                    {Object.entries(SECTIONS).map(([k, v]) => (
                      <option key={k} value={k}>{v.label}</option>
                    ))}
                  </select>
                </div>

                {/* Name */}
                <div>
                  <label className="block text-cyan-300 text-sm font-bold mb-2">Product Name</label>
                  <input
                    type="text"
                    placeholder="e.g., Lifetime, v4.6.1, S400"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-700/50 border-2 border-cyan-500/30 rounded-lg text-white placeholder-gray-400 focus:border-cyan-400 outline-none transition-all"
                  />
                </div>

                {/* Price */}
                <div>
                  <label className="block text-cyan-300 text-sm font-bold mb-2">Price ($)</label>
                  <input
                    type="number"
                    placeholder="0"
                    min="0"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                    className="w-full px-4 py-3 bg-slate-700/50 border-2 border-cyan-500/30 rounded-lg text-white placeholder-gray-400 focus:border-cyan-400 outline-none transition-all"
                  />
                </div>

                {/* Button */}
                <button
                  onClick={handleAddProduct}
                  disabled={saving || !formData.section}
                  className="w-full px-6 py-3 mt-6 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-bold rounded-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-cyan-500/50"
                >
                  {saving ? "Processing..." : editingId ? "Update Product" : "Add Product"}
                </button>
              </div>
            </div>
          </div>

          {/* Products List */}
          <div className="xl:col-span-3">
            {/* Section Tabs */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {Object.entries(SECTIONS).map(([key, val]) => (
                <button
                  key={key}
                  onClick={() => {
                    setSelectedSection(key as any);
                    setEditingId(null);
                    setFormData({
                      name: "",
                      price: 0,
                      description: "",
                      section: key as any,
                      subsection: val.subsections[0],
                    });
                  }}
                  className={`p-4 rounded-xl font-bold transition-all transform hover:scale-105 ${
                    selectedSection === key
                      ? `bg-gradient-to-br ${val.color} text-white shadow-lg`
                      : "bg-slate-800/50 text-cyan-300 border-2 border-slate-700 hover:border-cyan-500/50"
                  }`}
                >
                  <div className="text-2xl mb-2">{val.icon}</div>
                  {val.label}
                </button>
              ))}
            </div>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="group bg-gradient-to-br from-slate-800/60 to-slate-900/60 rounded-xl p-6 border-2 border-cyan-500/20 hover:border-cyan-400/50 transition-all hover:shadow-lg hover:shadow-cyan-500/20"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-cyan-300 mb-1">{product.name}</h3>
                        <p className="text-cyan-400/60 text-sm">{product.subsection}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-black text-green-400">${product.price}</p>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-4 border-t border-cyan-500/10">
                      <button
                        onClick={() => handleEdit(product)}
                        className="flex-1 px-3 py-2 bg-blue-600/40 hover:bg-blue-600/60 text-blue-300 rounded-lg text-sm font-semibold transition-all border border-blue-500/50"
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="flex-1 px-3 py-2 bg-red-600/40 hover:bg-red-600/60 text-red-300 rounded-lg text-sm font-semibold transition-all border border-red-500/50"
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-slate-800/30 rounded-xl border-2 border-dashed border-cyan-500/30">
                <div className="text-5xl mb-4">📭</div>
                <p className="text-cyan-300/70 text-lg font-semibold">No products added yet</p>
                <p className="text-cyan-400/50 mt-2">Add products using the form on the left</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
