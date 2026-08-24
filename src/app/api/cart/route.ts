import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import db from "@/lib/supabase/db";
import { carts } from "@/lib/supabase/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const supabase = createRouteHandlerClient({ cookies });

    // Get current user
    const {
      data: { user },
    } = await supabase.auth.getUser();

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
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = createRouteHandlerClient({ cookies });

    // Get current user
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { productId, quantity } = body;

    if (!productId || !quantity) {
      return NextResponse.json(
        { error: "Missing required fields: productId, quantity" },
        { status: 400 },
      );
    }

    if (quantity < 0) {
      return NextResponse.json(
        { error: "Quantity must be greater than 0" },
        { status: 400 },
      );
    }

    // If quantity is 0, remove from cart; otherwise add/update
    if (quantity === 0) {
      if (db) {
        await db.delete(carts).where(
          eq(carts.userId, user.id) && eq(carts.productId, productId)
        );
      }
    } else {
      if (db) {
        // Upsert - try to update first, if no rows affected then insert
        await db
          .insert(carts)
          .values({
            userId: user.id,
            productId,
            quantity,
          })
          .onConflictDoUpdate({
            target: [carts.userId, carts.productId],
            set: { quantity },
          });
      }
    }

    return NextResponse.json(
      { success: true, message: "Cart updated successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Cart POST error:", error);
    return NextResponse.json(
      { error: "Failed to update cart" },
      { status: 500 },
    );
  }
}
