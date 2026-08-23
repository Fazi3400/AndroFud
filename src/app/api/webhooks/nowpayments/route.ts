import { verifyNOWPaymentsWebhook } from "@/lib/payments/nowPayments";
import db from "@/lib/supabase/db";
import { orders } from "@/lib/supabase/schema";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = headers().get("x-nowpayments-sig") || "";

  // Verify webhook signature
  const isValid = verifyNOWPaymentsWebhook(body, signature);

  if (!isValid) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  try {
    const event = JSON.parse(body);

    // NOWPayments payment status can be:
    // waiting, confirming, confirmed, sending, finished, failed, expired, refunded
    const paymentStatus = event.payment_status;
    const orderId = event.order_id;

    let orderStatus = "pending";
    let paymentStatusDb = "unpaid";

    switch (paymentStatus) {
      case "finished":
      case "confirmed":
        orderStatus = "preparing";
        paymentStatusDb = "paid";
        break;
      case "failed":
      case "expired":
      case "refunded":
        orderStatus = "canceled";
        paymentStatusDb = "unpaid";
        break;
      case "waiting":
      case "confirming":
      case "sending":
        orderStatus = "pending";
        paymentStatusDb = "unpaid";
        break;
    }

    // Update order with payment details
    await db
      .update(orders)
      .set({
        payment_status: paymentStatusDb as any,
        order_status: orderStatus as any,
        payment_method: "crypto",
      })
      .where(eq(orders.id, orderId));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("NOWPayments webhook error:", error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 },
    );
  }
}
