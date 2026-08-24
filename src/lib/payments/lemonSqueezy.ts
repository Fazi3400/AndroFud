"use server";
import { env } from "@/env.mjs";

const BASE_URL = "https://api.lemonsqueezy.com/v1";

export interface LemonSqueezyCheckoutParams {
  storeId: string;
  variantId: string;
  quantity: number;
  email?: string;
  name?: string;
  custom?: {
    orderId: string;
    amount: string;
  };
  successUrl?: string;
  cancelUrl?: string;
}

export const createLemonSqueezyCheckout = async (
  params: LemonSqueezyCheckoutParams,
) => {
  const {
    storeId,
    variantId,
    quantity,
    email,
    name,
    custom,
    successUrl,
    cancelUrl,
  } = params;

  const checkoutUrl = new URL(
    `https://checkout.lemonsqueezy.com/buy/${storeId}/${variantId}`,
  );

  checkoutUrl.searchParams.append("quantity", quantity.toString());
  if (email) checkoutUrl.searchParams.append("email", email);
  if (name) checkoutUrl.searchParams.append("name", name);
  if (custom) checkoutUrl.searchParams.append("custom", JSON.stringify(custom));
  if (successUrl) checkoutUrl.searchParams.append("success_url", successUrl);
  if (cancelUrl) checkoutUrl.searchParams.append("cancel_url", cancelUrl);

  return {
    checkoutUrl: checkoutUrl.toString(),
  };
};

export const verifyLemonSqueezyWebhook = async (
  body: string,
  signature: string,
): Promise<boolean> => {
  try {
    const crypto = await import("crypto");
    // Use webhook secret if available, otherwise fall back to API key
    const secret = env.LEMON_SQUEEZY_WEBHOOK_SECRET || env.LEMON_SQUEEZY_API_KEY;
    const hash = crypto
      .createHmac("sha256", secret)
      .update(body)
      .digest("hex");

    return hash === signature;
  } catch (error) {
    console.error("Error verifying Lemon Squeezy webhook:", error);
    return false;
  }
};

export const getLemonSqueezyProduct = async (productId: string) => {
  const response = await fetch(`${BASE_URL}/products/${productId}`, {
    headers: {
      Authorization: `Bearer ${env.LEMON_SQUEEZY_API_KEY}`,
      Accept: "application/vnd.api+json",
    },
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch Lemon Squeezy product: ${response.status}`,
    );
  }

  return response.json();
};
