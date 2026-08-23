import { getPaymentStatus } from "@/lib/payments/nowPayments";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const paymentId = request.nextUrl.searchParams.get("paymentId");

    if (!paymentId) {
      return NextResponse.json(
        { error: "Payment ID is required" },
        { status: 400 },
      );
    }

    const paymentStatus = await getPaymentStatus(parseInt(paymentId));
    return NextResponse.json(paymentStatus);
  } catch (error: any) {
    console.error("Error getting payment status:", error);
    return NextResponse.json(
      { error: error.message || "Failed to get payment status" },
      { status: 500 },
    );
  }
}
