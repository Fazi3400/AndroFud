import db from "@/lib/supabase/db";
import { subscriptions } from "@/lib/supabase/schema";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { z } from "zod";
import { eq } from "drizzle-orm";

const subscriptionSchema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required"),
  description: z.string().min(1, "Description is required"),
  monthlyPrice: z.coerce.number().positive("Monthly price must be positive"),
  yearlyPrice: z.coerce.number().positive("Yearly price must be positive"),
  features: z.array(z.string()).default([]),
  isActive: z.boolean().default(true),
  featured: z.boolean().default(false),
  badge: z.enum(["popular", "recommended", "new"]).optional(),
  icon: z.string().optional(),
});

// GET all subscriptions
export async function GET() {
  try {
    const allSubscriptions = await db.select().from(subscriptions).orderBy(subscriptions.createdAt);
    return NextResponse.json(allSubscriptions);
  } catch (error) {
    console.error("❌ Failed to fetch subscriptions:", error);
    return NextResponse.json(
      { error: "Failed to fetch subscriptions" },
      { status: 500 }
    );
  }
}

// POST - Create new subscription (Admin only)
export async function POST(request: Request) {
  try {
    const supabase = createRouteHandlerClient({ cookies });

    // Check if user is authenticated
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (!user || authError) {
      return NextResponse.json(
        { error: "You must be logged in" },
        { status: 401 }
      );
    }

    // Check if user is admin
    const { data: profile } = await supabase
      .from("profiles")
      .select("is_admin")
      .eq("id", user.id)
      .single();

    if (!profile?.is_admin) {
      return NextResponse.json(
        { error: "Only admins can create subscriptions" },
        { status: 403 }
      );
    }

    const body = await request.json();
    const validation = subscriptionSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.errors },
        { status: 400 }
      );
    }

    const data = validation.data;

    // Check if slug already exists
    const existing = await db
      .select()
      .from(subscriptions)
      .where(eq(subscriptions.slug, data.slug));

    if (existing.length > 0) {
      return NextResponse.json(
        { error: "Slug already exists" },
        { status: 409 }
      );
    }

    const newSubscription = await db
      .insert(subscriptions)
      .values({
        name: data.name,
        slug: data.slug,
        description: data.description,
        monthlyPrice: data.monthlyPrice.toString(),
        yearlyPrice: data.yearlyPrice.toString(),
        features: data.features,
        isActive: data.isActive,
        featured: data.featured,
        badge: data.badge,
        icon: data.icon,
      })
      .returning();

    console.log("✅ Subscription created:", newSubscription[0].id);

    return NextResponse.json(newSubscription[0], { status: 201 });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("❌ Failed to create subscription:", errorMessage);
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
