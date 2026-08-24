"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { env } from "@/env.mjs";

interface Product {
  id: string;
  name: string;
  price: number;
  slug: string;
  images: string[];
  collections: {
    id: string;
    label: string;
    slug: string;
  };
}

interface VersionsSectionProps {
  products: Product[];
}

export default function VersionsSection({ products }: VersionsSectionProps) {
  const [selectedCollection, setSelectedCollection] =
    useState<string>("androfud");

  // Debug: Log all received products and their collections
  console.log("=== VERSIONS SECTION DEBUG ===");
  console.log("Total products received:", products.length);
  console.log("All products:", products);
  products.forEach((product, index) => {
    console.log(`Product ${index}:`, {
      name: product.name,
      collectionLabel: product.collections?.label,
      fullCollections: product.collections,
    });
  });
  console.log("Selected collection:", selectedCollection);

  // Filter products by selected collection
  const filteredProducts = products.filter((product) => {
    const productCollection = product.collections?.label?.toLowerCase();
    const selected = selectedCollection.toLowerCase();
    const matches = productCollection === selected;
    console.log(
      `Checking ${product.name}: "${productCollection}" === "${selected}" = ${matches}`,
    );
    return matches;
  });

  console.log("Filtered products:", filteredProducts);
  console.log("============================\n");

  const isAndrofud = selectedCollection === "androfud";

  return (
    <section
      className={`py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b ${isAndrofud ? "from-[#000000] to-[#000000]" : "from-[#0c2d3d] to-[#1e1b4b]"}`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            <span
              className={`block bg-gradient-to-r ${isAndrofud ? "from-[#0099ff] to-[#000000]" : "from-[#0099ff] to-[#8b5cf6]"} bg-clip-text text-transparent`}
            >
              Versions
            </span>
          </h2>

          {/* Version Tabs */}
          <div className="flex gap-4 justify-center flex-wrap">
            <button
              onClick={() => setSelectedCollection("androfud")}
              className={`px-7 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 ${
                selectedCollection === "androfud"
                  ? "text-white bg-gradient-to-r from-[#0099ff] to-[#000000] hover:shadow-lg hover:shadow-[#a855f7]/50"
                  : "text-[#0099ff]-300 border-2 border-[#0099ff] hover:bg-[#0099ff] hover:bg-opacity-20"
              }`}
            >
              Androfud
            </button>
            <button
              onClick={() => setSelectedCollection("btmob")}
              className={`px-7 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 ${
                selectedCollection === "btmob"
                  ? "text-white bg-gradient-to-r from-[#0099ff] to-[#000000] hover:shadow-lg hover:shadow-[#06b6d4]/50"
                  : "text-[#67e8f9]-300 border-2 border-[#06b6d4] hover:bg-[#06b6d4] hover:bg-opacity-20"
              }`}
            >
              BT Mob
            </button>
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredProducts.map((product) => {
              const images = Array.isArray(product.images)
                ? product.images
                : [];
              const imageUrl =
                images[0] ||
                `${env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/medias/public/placeholder.jpg`;

              return (
                <Link
                  key={product.id}
                  href={`/shop/${product.slug}`}
                  className={`group relative rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 border flex flex-col justify-between min-h-96 ${
                    isAndrofud
                      ? "bg-gradient-to-br from-purple-900/20 to-pink-900/10 border-[#0099ff]-500/30 hover:border-[#0099ff]-500/60 hover:shadow-[#a855f7]/30"
                      : "bg-gradient-to-br from-cyan-900/20 to-blue-900/10 border-[#0099ff]-500/30 hover:border-[#0099ff]-500/60 hover:shadow-[#06b6d4]/30"
                  }`}
                >
                  {/* Image */}
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={imageUrl}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <h3
                      className={`text-lg font-bold transition-colors ${isAndrofud ? "text-[#0099ff]-300 group-hover:text-[#0099ff]-100" : "text-[#67e8f9]-300 group-hover:text-[#67e8f9]-100"}`}
                    >
                      {product.name}
                    </h3>
                    <div
                      className={`flex items-center justify-between pt-4 border-t ${isAndrofud ? "border-[#0099ff]-500/30" : "border-[#0099ff]-500/30"}`}
                    >
                      <span
                        className={`text-sm ${isAndrofud ? "text-[#0099ff]-300" : "text-[#67e8f9]-300"}`}
                      >
                        {product.collections?.label || "No Collection"}
                      </span>
                      <span
                        className={`text-xl font-bold ${isAndrofud ? "text-[#0099ff]-300" : "text-[#67e8f9]-300"}`}
                      >
                        ${product.price}
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <p
              className={`text-lg ${isAndrofud ? "text-[#0099ff]-300" : "text-[#67e8f9]-300"}`}
            >
              No products found for {selectedCollection}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
