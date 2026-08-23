"use server";
import { env } from "@/env.mjs";

const BASE_URL = "https://api.nowpayments.io/v1";

export interface CreatePaymentParams {
  price_amount: number;
  price_currency: string;
  pay_currency?: string;
  order_id: string;
  order_description?: string;
  ipn_callback_url: string;
  success_url?: string;
  cancel_url?: string;
}

export interface PaymentResponse {
  payment_id?: number;
  payment_status?: string;
  pay_address?: string;
  price_amount: number;
  price_currency: string;
  pay_amount?: number;
  actually_paid?: number;
  pay_currency: string;
  order_id: string;
  order_description: string;
  purchase_id?: string;
  created_at?: string;
  updated_at?: string;
  user_id?: number;
  type?: string;
  payment_url?: string;
  invoice_url?: string;
  id?: number;
  invoice_id?: number;
}

export const createNOWPayment = async (
  params: CreatePaymentParams,
): Promise<PaymentResponse> => {
  console.log("🔷 Creating NOWPayment Invoice with params:", {
    price_amount: params.price_amount,
    price_currency: params.price_currency,
    pay_currency: params.pay_currency || "all cryptocurrencies",
    order_id: params.order_id,
  });

  try {
    const response = await fetch(`${BASE_URL}/invoice`, {
      method: "POST",
      headers: {
        "x-api-key": env.NOWPAYMENTS_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        price_amount: params.price_amount,
        price_currency: params.price_currency,
        ...(params.pay_currency && { pay_currency: params.pay_currency }),
        order_id: params.order_id,
        order_description: params.order_description || "Order Payment",
        ipn_callback_url: params.ipn_callback_url,
        success_url: params.success_url,
        cancel_url: params.cancel_url,
      }),
    });

    const responseText = await response.text();
    console.log("🔷 NOWPayments response status:", response.status);
    console.log("🔷 NOWPayments response body:", responseText);

    if (!response.ok) {
      try {
        const error = JSON.parse(responseText);
        throw new Error(
          `NOWPayments error: ${error.message || error.error || response.status}`,
        );
      } catch (e) {
        throw new Error(
          `Failed to create NOWPayment: ${response.status} - ${responseText}`,
        );
      }
    }

    return JSON.parse(responseText);
  } catch (fetchErr) {
    console.error("🔴 Fetch error calling NOWPayments:", fetchErr);
    if (fetchErr instanceof Error) {
      throw new Error(`NOWPayments API call failed: ${fetchErr.message}`);
    }
    throw fetchErr;
  }
};

export const getPaymentStatus = async (payment_id: number) => {
  const response = await fetch(
    `${BASE_URL}/payment/${payment_id}`,
    {
      headers: {
        "x-api-key": env.NOWPAYMENTS_API_KEY,
      },
    },
  );

  if (!response.ok) {
    throw new Error(
      `Failed to get payment status: ${response.status}`,
    );
  }

  return response.json();
};

export const getAvailableCurrencies = async () => {
  const response = await fetch(`${BASE_URL}/currencies`, {
    headers: {
      "x-api-key": env.NOWPAYMENTS_API_KEY,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch currencies: ${response.status}`);
  }

  return response.json();
};

export const getMinimumPaymentAmount = async (
  currency_from: string,
  currency_to: string = "usd",
) => {
  const response = await fetch(
    `${BASE_URL}/min-amount?fromCurrency=${currency_from}&toCurrency=${currency_to}`,
    {
      headers: {
        "x-api-key": env.NOWPAYMENTS_API_KEY,
      },
    },
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch minimum amount: ${response.status}`);
  }

  return response.json();
};

export const verifyNOWPaymentsWebhook = (
  data: string,
  signature: string,
): boolean => {
  try {
    const crypto = require("crypto");
    const payload = JSON.parse(data);
    const sortedPayload = sortObjectKeys(payload);
    const sortedString = JSON.stringify(sortedPayload);

    const hash = crypto
      .createHmac("sha512", env.NOWPAYMENTS_IPN_SECRET_KEY)
      .update(sortedString)
      .digest("hex");

    return hash === signature;
  } catch (error) {
    console.error("Error verifying NOWPayments webhook:", error);
    return false;
  }
};

const sortObjectKeys = (obj: any): any => {
  if (Array.isArray(obj)) {
    return obj.map(sortObjectKeys);
  } else if (obj !== null && typeof obj === "object") {
    return Object.keys(obj)
      .sort()
      .reduce(
        (result, key) => {
          result[key] = sortObjectKeys(obj[key]);
          return result;
        },
        {} as Record<string, any>,
      );
  }
  return obj;
};
