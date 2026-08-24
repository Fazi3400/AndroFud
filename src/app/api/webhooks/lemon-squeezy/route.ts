import { verifyLemonSqueezyWebhook } from "@/lib/payments/lemonSqueezy";
import db from "@/lib/supabase/db";
import { orders } from "@/lib/supabase/schema";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = headers().get("x-signature") || "";

  // Verify webhook signature
  const isValid = await verifyLemonSqueezyWebhook(body, signature);

  if (!isValid) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  try {
    const event = JSON.parse(body);

    if (event.meta.event_name === "order:created") {
      const orderId = event.data.attributes.custom?.orderId;

      if (!orderId) {
        console.error("No orderId found in webhook payload:", event.data);
        return NextResponse.json(
          { error: "Missing orderId in webhook payload" },
          { status: 400 },
        );
      }

      // Verify order exists before updating
      if (db) {
        const updateResult = await db
          .update(orders)
          .set({
            payment_status: "paid" as any,
            order_status: "preparing" as any,
            payment_method: "card",
          })
          .where(eq(orders.id, orderId));

        console.log(`✅ Order ${orderId} payment status updated`);
      } else {
        console.warn(
          "Database connection not available on Vercel. Order update skipped.",
        );
      }

      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Lemon Squeezy webhook error:", error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 },
    );
  }
}
