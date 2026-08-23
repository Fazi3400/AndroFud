import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import db from "@/lib/supabase/db";
import { carts } from "@/lib/supabase/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    
    // Get current user
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch user's cart from database
    const cartItems = await db
      .select()
      .from(carts)
      .where(eq(carts.userId, user.id));

    // Convert to order format
    const orderProducts: Record<string, { quantity: number }> = {};
    cartItems.forEach((item) => {
      orderProducts[item.productId] = {
        quantity: item.quantity,
      };
    });

    return NextResponse.json({ cartItems: orderProducts });
  } catch (error) {
    console.error("Cart API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch cart" },
      { status: 500 }
    );
  }
}
