"use server";

import db from "@/lib/supabase/db";
import { orders, orderLines } from "@/lib/supabase/schema";
import { eq } from "drizzle-orm";

export const deleteOrderAction = async (orderId: string) => {
  try {
    // First delete all related order_lines
    await db.delete(orderLines).where(eq(orderLines.orderId, orderId));

    // Then delete the order
    const result = await db
      .delete(orders)
      .where(eq(orders.id, orderId))
      .returning();
    return result;
  } catch (error) {
    throw new Error(
      error instanceof Error
        ? error.message
        : `Failed to delete order: ${error}`,
    );
  }
};
