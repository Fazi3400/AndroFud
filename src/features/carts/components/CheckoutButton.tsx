"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/providers/AuthProvider";
import type { CartItems } from "@/features/carts";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type CheckoutButtonProps = React.ComponentProps<typeof Button> & {
  order: CartItems;
  guest: boolean;
};

function CheckoutButton({ order, guest, ...props }: CheckoutButtonProps) {
  const router = useRouter();
  const { toast } = useToast();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [showPaymentMethodDialog, setShowPaymentMethodDialog] = useState(false);

  const handleCheckout = () => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please log in to place an order",
        variant: "destructive",
      });
      router.push("/sign-in?from=/cart");
      return;
    }
    setShowPaymentMethodDialog(true);
  };

  const handlePaymentMethod = (paymentMethod: "card" | "crypto") => {
    if (paymentMethod === "card") {
      router.push("/card-checkout");
    } else {
      router.push("/crypto-checkout");
    }
  };

  return (
    <>
      <Button
        {...props}
        variant="primary"
        className={cn("w-full", props.className)}
        onClick={handleCheckout}
        disabled={isLoading}
      >
        {isLoading ? "Processing..." : "Check out"}
        {isLoading && (
          <Spinner className="ml-3 h-4 w-4 animate-spin" aria-hidden="true" />
        )}
      </Button>

      <Dialog open={showPaymentMethodDialog} onOpenChange={setShowPaymentMethodDialog}>
        <DialogContent className="bg-[#0a0e27] border-[#0099ff] border-opacity-30 w-[50%] max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-white text-center">Choose Payment Method</DialogTitle>
            <DialogDescription className="text-gray-400 text-center">
              Select how you would like to pay for your order
            </DialogDescription>
          </DialogHeader>

          <div className="flex gap-4 flex-row">
            <Button
              onClick={() => handlePaymentMethod("card")}
              variant="primary"
              className="flex-1 h-12 rounded-full px-4 py-2"
              disabled={isLoading}
            >
              <div className="text-center">
                <div className="font-semibold">💳 Card</div>
              </div>
            </Button>

            <Button
              onClick={() => handlePaymentMethod("crypto")}
              variant="primary"
              className="flex-1 h-12 rounded-full px-4 py-2"
              disabled={isLoading}
            >
              <div className="text-center">
                <div className="font-semibold">₿ Crypto</div>
              </div>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default CheckoutButton;
