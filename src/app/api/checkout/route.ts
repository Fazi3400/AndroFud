import type { CartItems } from "@/features/carts";
import {
  createNOWPayment,
  getMinimumPaymentAmount,
} from "@/lib/payments/nowPayments";
import { createLemonSqueezyCheckout } from "@/lib/payments/lemonSqueezy";
import db from "@/lib/supabase/db";
import { orders } from "@/lib/supabase/schema";
import { getURL } from "@/lib/utils";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { z } from "zod";
import { orderLines } from "@/lib/supabase/schema";

const checkoutSchema = z.object({
  orderProducts: z.record(
    z.object({
      quantity: z.number().min(1),
    }),
  ),
  guest: z.boolean().optional(), // Ignored - login required
  paymentMethod: z.enum(["card", "crypto"]),
  amount: z.number().optional(),
});

export async function POST(request: Request) {
  const data = await request.json();

  const validation = checkoutSchema.safeParse(data);
  const supabase = createRouteHandlerClient({ cookies });

  if (!validation.success) {
    return NextResponse.json({ error: "Invalid data format" }, { status: 400 });
  }

  try {
    // ✅ REQUIRE LOGIN - No guest checkout allowed
    const userResponse = await supabase.auth.getUser();
    if (!userResponse.data.user) {
      console.warn("❌ Checkout attempted without login");
      return NextResponse.json(
        { error: "You must be logged in to place an order" },
        { status: 401 },
      );
    }

    const userId = userResponse.data.user.id;
    const userEmail = userResponse.data.user.email;

    console.log("✅ Checkout started with data:", {
      productCount: Object.keys(data.orderProducts).length,
      paymentMethod: data.paymentMethod,
      userId,
      email: userEmail,
    });

    // Fetch all products once to calculate amount and build line items
    const productIds = Object.keys(data.orderProducts);
    const { data: products, error: productError } = await supabase
      .from("products")
      .select("id, price")
      .in("id", productIds);

    if (productError) {
      throw new Error(
        `Failed to fetch product prices: ${productError.message}`,
      );
    }

    // Calculate total amount from actual product prices
    let amount = data.amount || 0;
    if (!amount) {
      if (products && products.length > 0) {
        amount = Object.entries(
          data.orderProducts as Record<string, { quantity: number }>,
        ).reduce((sum, [productId, item]) => {
          const product = products.find((p: any) => p.id === productId);
          const price = product ? parseFloat(product.price) : 0;
          return sum + item.quantity * price;
        }, 0);
      }

      console.log("💰 Calculated amount from products:", amount);
    } else {
      console.log("📊 Using provided amount:", amount);
    }

    // Create order in database with logged-in user
    console.log("💾 Creating order in database...");
    const insertedOrder = await db
      .insert(orders)
      .values({
        user_id: userId,
        email: userEmail,
        currency: "cad",
        amount: `${amount}`,
        order_status: "pending",
        payment_status: "unpaid",
        payment_method: data.paymentMethod === "card" ? "card" : "crypto",
      })
      .returning();

    const orderId = insertedOrder[0].id;
    console.log("✅ Order created:", orderId);

    // Insert order lines with actual product prices (reusing fetched products)
    console.log("📝 Creating order lines...");
    const lineItems = Object.entries(
      data.orderProducts as Record<string, { quantity: number }>,
    ).map(([productId, item]) => {
      const product = products?.find((p: any) => p.id === productId);
      const price = product ? product.price : "0";
      return {
        productId,
        quantity: item.quantity,
        price,
        orderId,
      };
    });

    await db.insert(orderLines).values(lineItems);
    console.log("✅ Order lines created");

    const successUrl = `${getURL()}orders/${orderId}`;
    const cancelUrl = `${getURL()}cart`;

    // Route to appropriate payment processor
    if (data.paymentMethod === "card") {
      console.log("💳 Processing card payment...");
      return await handleCardPayment(orderId, amount, successUrl, cancelUrl);
    } else {
      console.log("₿ Processing crypto payment...");
      return await handleCryptoPayment(orderId, amount, successUrl, cancelUrl);
    }
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    console.error("❌ Checkout failed:", errorMessage);
    console.error("Stack:", err instanceof Error ? err.stack : "");

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

async function handleCardPayment(
  orderId: string,
  amount: number,
  successUrl: string,
  cancelUrl: string,
) {
  try {
    const checkoutUrl = `https://checkout.lemonsqueezy.com/buy/test-store?custom[orderId]=${orderId}&custom[amount]=${amount}&success_url=${encodeURIComponent(successUrl)}&cancel_url=${encodeURIComponent(cancelUrl)}`;

    return NextResponse.json({
      paymentMethod: "card",
      checkoutUrl,
    });
  } catch (err) {
    console.error("Card payment error:", err);
    return NextResponse.json(
      { error: "Failed to create card checkout" },
      { status: 500 },
    );
  }
}

async function handleCryptoPayment(
  orderId: string,
  amount: number,
  successUrl: string,
  cancelUrl: string,
) {
  try {
    const ipnUrl = `${getURL()}api/webhooks/nowpayments`;

    // Validate minimum payment amount for crypto (advisory only)
    // Skip if amount is clearly above typical minimums (usually $5-10)
    if (amount < 20) {
      try {
        const minData = await getMinimumPaymentAmount("ETH", "usd");
        const minAmount = parseFloat(minData.min_amount);

        console.log("💵 Minimum payment required:", minAmount, "USD");
        console.log(
          "💵 Order amount:",
          amount,
          "CAD (~",
          Math.round(amount * 0.75),
          "USD)",
        );

        if (amount < minAmount) {
          console.warn("❌ Order amount below minimum for crypto payment");
          return NextResponse.json(
            {
              error: `Minimum payment for crypto is approximately $${minAmount} USD. Your order is $${amount} CAD. Please add more items or use card payment.`,
              minAmount,
              orderAmount: amount,
            },
            { status: 400 },
          );
        }
      } catch (minErr) {
        console.warn("⚠️ Could not validate minimum amount:", minErr);
        // Continue anyway - minimum check is advisory
      }
    }

    const payment = await createNOWPayment({
      price_amount: amount,
      price_currency: "cad",
      order_id: orderId,
      order_description: `Order ${orderId}`,
      ipn_callback_url: ipnUrl,
      success_url: successUrl,
      cancel_url: cancelUrl,
    });

    console.log("✅ Invoice created:", payment.id || payment.payment_id);
    console.log("✅ Full response:", JSON.stringify(payment, null, 2));

    // Use NOWPayments' invoice_url (hosted payment page)
    const hostedPaymentUrl = payment.invoice_url;

    if (!hostedPaymentUrl) {
      throw new Error("No invoice_url received from NOWPayments");
    }

    console.log("✅ Hosted payment URL:", hostedPaymentUrl);

    return NextResponse.json({
      paymentMethod: "crypto",
      paymentId: payment.id || payment.payment_id,
      hostedPaymentUrl,
      payAddress: payment.pay_address,
      payAmount: payment.pay_amount,
      payCurrency: payment.pay_currency,
      priceAmount: payment.price_amount,
      priceCurrency: payment.price_currency,
      paymentStatus: payment.payment_status,
    });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    console.error("❌ Crypto payment error:", errorMessage);

    // Check if it's an amount-related error
    if (
      errorMessage.includes("AMOUNT_MINIMAL_ERROR") ||
      errorMessage.includes("less than minimal")
    ) {
      const match = errorMessage.match(/0\.\d+/);
      const cryptoAmount = match ? match[0] : "unknown";
      return NextResponse.json(
        {
          error: `Payment amount is too low for crypto. Minimum is higher. Please add more items to your order.`,
          details: errorMessage,
        },
        { status: 400 },
      );
    }

    return NextResponse.json(
      {
        error: errorMessage || "Failed to create crypto payment",
      },
      { status: 500 },
    );
  }
}
