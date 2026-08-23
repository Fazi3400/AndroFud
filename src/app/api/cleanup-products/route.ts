import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/supabase/db";
import { products } from "@/lib/supabase/schema";

// Cleanup old products - ONLY RUN ONCE
// This removes all products to start fresh with admin panel only

export async function POST(request: NextRequest) {
  try {
    // Delete ALL products from database
    const result = await db.delete(products).returning();

    return NextResponse.json({
      success: true,
      message: `Deleted ${result.length} products from database`,
      deletedCount: result.length,
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Failed to cleanup products" }, { status: 500 });
  }
}
