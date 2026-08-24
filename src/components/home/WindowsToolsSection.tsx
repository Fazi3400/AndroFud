"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { WindowsRatsGrid } from "./WindowsRatsGrid";
import { ProductsSection } from "./ProductsSection";

interface WindowsToolsSectionProps {
  gradient: string;
  textColor: string;
  content: any;
  brandedProducts: any[];
}

const ratNameMapping: { [key: string]: string } = {
  S400: "S400 Rat",
  XWORM: "Xworm Rat ORG",
  WIZORM: "Wizorm Rat 4.5",
  CRYSOME: "Crysome Rat",
  "VENOM RAT": "Venom Rat",
  NEPTUNE: "Neptune Rat 5.4",
};

export function WindowsToolsSection({
  gradient,
  textColor,
  content,
  brandedProducts,
}: WindowsToolsSectionProps) {
  // Always initialize with the RAT selector name (not product name)
  // Default to S400 Rat which is the first RAT in the selector
  const [selectedRatName, setSelectedRatName] = useState<string>("S400 Rat");
  const searchParams = useSearchParams();

  // Read rat from URL parameter and scroll to section
  useEffect(() => {
    try {
      const ratParam = searchParams?.get?.("rat");
      if (ratParam && ratNameMapping[ratParam]) {
        setSelectedRatName(ratNameMapping[ratParam]);
        // Scroll to this section after a short delay to allow render
        setTimeout(() => {
          const element = document.getElementById("windowstools-section");
          element?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    } catch (error) {
      console.error("Error reading rat param:", error);
    }
  }, [searchParams]);

  return (
    <div id="windowstools-section">
      <WindowsRatsGrid
        gradient={gradient}
        textColor={textColor}
        selectedRat={selectedRatName}
        onRatSelect={setSelectedRatName}
      />
      <ProductsSection
        brand="windowstools"
        content={content}
        brandedProducts={brandedProducts}
        selectedRatName={selectedRatName}
      />
    </div>
  );
}
