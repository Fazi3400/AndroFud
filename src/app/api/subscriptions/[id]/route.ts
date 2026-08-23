import db from "@/lib/supabase/db";
import { subscriptions } from "@/lib/supabase/schema";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { z } from "zod";
import { eq } from "drizzle-orm";

const subscriptionUpdateSchema = z.object({
  name: z.string().min(1).optional(),
  slug: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  monthlyPrice: z.coerce.number().positive().optional(),
  yearlyPrice: z.coerce.number().positive().optional(),
  features: z.array(z.string()).optional(),
  isActive: z.boolean().optional(),
  featured: z.boolean().optional(),
  badge: z.enum(["popular", "recommended", "new"]).optional().nullable(),
  icon: z.string().optional().nullable(),
});

// Helper to check admin status
async function checkAdmin(supabase: any, userId: string): Promise<boolean> {
  const { data: profile } = await supabase
    .from("profiles")
    .select("is_admin")
    .eq("id", userId)
    .single();

  return profile?.is_admin === true;
}

// GET single subscription
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const subscription = await db
      .select()
      .from(subscriptions)
      .where(eq(subscriptions.id, params.id));

    if (subscription.length === 0) {
      return NextResponse.json(
        { error: "Subscription not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(subscription[0]);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("❌ Failed to fetch subscription:", errorMessage);
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

// PATCH - Update subscription (Admin only)
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createRouteHandlerClient({ cookies });

    // Check authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (!user || authError) {
      return NextResponse.json(
        { error: "You must be logged in" },
        { status: 401 }
      );
    }

    // Check admin status
    if (!(await checkAdmin(supabase, user.id))) {
      return NextResponse.json(
        { error: "Only admins can update subscriptions" },
        { status: 403 }
      );
    }

    // Check if subscription exists
    const existing = await db
      .select()
      .from(subscriptions)
      .where(eq(subscriptions.id, params.id));

    if (existing.length === 0) {
      return NextResponse.json(
        { error: "Subscription not found" },
        { status: 404 }
      );
    }

    const body = await request.json();
    const validation = subscriptionUpdateSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.errors },
        { status: 400 }
      );
    }

    const data = validation.data;
    const updateData: Record<string, any> = {};

    // Only include fields that are actually being updated
    if (data.name !== undefined) updateData.name = data.name;
    if (data.slug !== undefined) updateData.slug = data.slug;
    if (data.description !== undefined) updateData.description = data.description;
    if (data.monthlyPrice !== undefined) updateData.monthlyPrice = data.monthlyPrice.toString();
    if (data.yearlyPrice !== undefined) updateData.yearlyPrice = data.yearlyPrice.toString();
    if (data.features !== undefined) updateData.features = data.features;
    if (data.isActive !== undefined) updateData.isActive = data.isActive;
    if (data.featured !== undefined) updateData.featured = data.featured;
    if (data.badge !== undefined) updateData.badge = data.badge;
    if (data.icon !== undefined) updateData.icon = data.icon;

    // Update timestamp
    updateData.updatedAt = new Date().toISOString();

    const updated = await db
      .update(subscriptions)
      .set(updateData)
      .where(eq(subscriptions.id, params.id))
      .returning();

    console.log("✅ Subscription updated:", params.id);

    return NextResponse.json(updated[0]);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("❌ Failed to update subscription:", errorMessage);
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

// DELETE - Remove subscription (Admin only)
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createRouteHandlerClient({ cookies });

    // Check authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (!user || authError) {
      return NextResponse.json(
        { error: "You must be logged in" },
        { status: 401 }
      );
    }

    // Check admin status
    if (!(await checkAdmin(supabase, user.id))) {
      return NextResponse.json(
        { error: "Only admins can delete subscriptions" },
        { status: 403 }
      );
    }

    // Check if subscription exists
    const existing = await db
      .select()
      .from(subscriptions)
      .where(eq(subscriptions.id, params.id));

    if (existing.length === 0) {
      return NextResponse.json(
        { error: "Subscription not found" },
        { status: 404 }
      );
    }

    await db
      .delete(subscriptions)
      .where(eq(subscriptions.id, params.id));

    console.log("✅ Subscription deleted:", params.id);

    return NextResponse.json({ success: true });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("❌ Failed to delete subscription:", errorMessage);
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
