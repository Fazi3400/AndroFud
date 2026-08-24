"use client";
import React from "react";
import { Button } from "@/components/ui/button";

type BuyNowButtonProps = {
  productId: string;
};

function BuyNowButton({ productId }: BuyNowButtonProps) {
  return (
    <Button type="submit" variant="primary" className="w-full">
      Buy Now
    </Button>
  );
}

export default BuyNowButton;
