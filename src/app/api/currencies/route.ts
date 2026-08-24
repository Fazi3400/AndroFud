import { NextResponse } from "next/server";
import { env } from "@/env.mjs";

const BASE_URL = "https://api.nowpayments.io/v1";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const response = await fetch(`${BASE_URL}/currencies`, {
      method: "GET",
      headers: {
        "x-api-key": env.NOWPAYMENTS_API_KEY,
      },
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("Failed to fetch currencies:", error);
      return NextResponse.json(
        { error: "Failed to fetch available currencies" },
        { status: 500 },
      );
    }

    const data = await response.json();
    console.log("✅ Fetched currencies from NOWPayments");

    return NextResponse.json({
      currencies: data,
    });
  } catch (error) {
    console.error("❌ Error fetching currencies:", error);
    return NextResponse.json(
      { error: "Failed to fetch currencies" },
      { status: 500 },
    );
  }
}
