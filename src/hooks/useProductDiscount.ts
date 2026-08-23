import { useEffect, useState } from "react";

export interface DiscountInfo {
  discount: number;
  label: string;
  timeBoost: string;
}

export function useProductDiscount() {
  const [offersData, setOffersData] = useState<any>({
    productOffers: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await fetch("/api/admin/offers");
        const data = await response.json();
        setOffersData(data);
      } catch (error) {
        console.error("Error fetching offers:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOffers();
  }, []);

  const getDiscount = (productName: string): DiscountInfo => {
    if (!productName) {
      return { discount: 0, label: "", timeBoost: "" };
    }

    const nameLower = productName.toLowerCase();

    // Exact match only
    const productOffer = offersData.productOffers?.find(
      (offer: any) => offer.productName.toLowerCase() === nameLower
    );

    if (!productOffer) {
      return { discount: 0, label: "", timeBoost: "" };
    }

    // Check if offer is still valid based on duration
    const createdAt = new Date(productOffer.createdAt);
    const validForDays = productOffer.validForDays || 7;
    const expiresAt = new Date(createdAt.getTime() + validForDays * 24 * 60 * 60 * 1000);
    const today = new Date();

    if (today > expiresAt) {
      return { discount: 0, label: "", timeBoost: "" };
    }

    return {
      discount: productOffer.baseDiscount,
      label: productOffer.label,
      timeBoost: `Valid for ${validForDays} days`,
    };
  };

  return { getDiscount, loading, offersData };
}
