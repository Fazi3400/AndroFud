import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/supabase/db";
import { sql } from "drizzle-orm";
import { createClient } from "@supabase/supabase-js";

async function checkAdminAuth(request: NextRequest) {
  try {
    // Check for admin password in header (additional security)
    const adminPassword = request.headers.get("X-Admin-Password");
    if (adminPassword === process.env.ADMIN_PASSWORD) {
      return { id: "admin", email: "admin" };
    }

    // Get auth cookie from request
    const authCookie =
      request.cookies.get("sb-auth-token")?.value ||
      request.cookies.get("sb-prwidbcixjusoqyajtav-auth-token")?.value;

    if (!authCookie) {
      return null;
    }

    // Create admin client to query user
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.DATABASE_SERVICE_ROLE!,
      {
        auth: {
          persistSession: false,
        },
      },
    );

    // Parse the auth cookie to get user ID
    try {
      const {
        data: { session },
      } = JSON.parse(authCookie);
      if (!session?.user?.id) {
        return null;
      }

      // Check if user is admin
      const { data: profile } = await supabase
        .from("profiles")
        .select("is_admin")
        .eq("id", session.user.id)
        .single();

      return profile?.is_admin ? session.user : null;
    } catch {
      return null;
    }
  } catch {
    return null;
  }
}

export async function GET() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.DATABASE_SERVICE_ROLE;

    if (!supabaseUrl || !serviceRoleKey) {
      return NextResponse.json(
        { error: "Missing Supabase configuration" },
        { status: 500 },
      );
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey, {
      auth: { persistSession: false },
    });

    const { data, error } = await supabase
      .from("product_offers")
      .select("*")
      .order("product_name");

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: "Failed to fetch offers", details: error.message },
        { status: 500 },
      );
    }

    return NextResponse.json({
      productOffers: data || [],
    });
  } catch (error) {
    console.error("Error fetching offers:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch offers",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await checkAdminAuth(request);
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized - Admin access required" },
        { status: 401 },
      );
    }

    const body = await request.json();
    const { productName, baseDiscount, validForDays } = body;

    // Validation
    if (!productName || baseDiscount === undefined) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    if (typeof productName !== "string" || productName.trim().length === 0) {
      return NextResponse.json(
        { error: "Invalid product name" },
        { status: 400 },
      );
    }

    if (
      !Number.isInteger(baseDiscount) ||
      baseDiscount < 0 ||
      baseDiscount > 100
    ) {
      return NextResponse.json(
        { error: "Discount must be an integer between 0 and 100" },
        { status: 400 },
      );
    }

    const validDays = validForDays ? parseInt(validForDays) : 7;
    if (isNaN(validDays) || validDays < 1) {
      return NextResponse.json(
        { error: "Valid for days must be at least 1" },
        { status: 400 },
      );
    }

    const label = `${baseDiscount}% OFF`;
    await db.execute(
      sql`INSERT INTO product_offers (product_name, base_discount, label, valid_for_days) VALUES (${productName}, ${baseDiscount}, ${label}, ${validDays}) ON CONFLICT (product_name) DO UPDATE SET base_discount=${baseDiscount}, label=${label}, valid_for_days=${validDays}`,
    );

    return NextResponse.json(
      { productName, baseDiscount, label, validForDays: validDays },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error adding offer:", error);
    return NextResponse.json({ error: "Failed to add offer" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const user = await checkAdminAuth(request);
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized - Admin access required" },
        { status: 401 },
      );
    }

    const body = await request.json();
    const { type, productName, day, baseDiscount, boost } = body;

    if (type === "product" && productName !== undefined) {
      if (
        !Number.isInteger(baseDiscount) ||
        baseDiscount < 0 ||
        baseDiscount > 100
      ) {
        return NextResponse.json(
          { error: "Discount must be an integer between 0 and 100" },
          { status: 400 },
        );
      }

      const label = `${baseDiscount}% OFF`;
      await db.execute(
        sql`UPDATE product_offers SET base_discount=${baseDiscount}, label=${label} WHERE product_name=${productName}`,
      );
      return NextResponse.json({ productName, baseDiscount, label });
    }

    if (type === "day" && day !== undefined) {
      if (!Number.isInteger(boost) || boost < 0 || boost > 100) {
        return NextResponse.json(
          { error: "Boost must be an integer between 0 and 100" },
          { status: 400 },
        );
      }

      await db.execute(
        sql`UPDATE day_offers SET boost=${boost} WHERE day=${day}`,
      );
      return NextResponse.json({ day, boost });
    }

    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  } catch (error) {
    console.error("Error updating offer:", error);
    return NextResponse.json(
      { error: "Failed to update offer" },
      { status: 500 },
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const user = await checkAdminAuth(request);
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized - Admin access required" },
        { status: 401 },
      );
    }

    const body = await request.json();
    const { productName } = body;

    if (!productName) {
      return NextResponse.json(
        { error: "Product name required" },
        { status: 400 },
      );
    }

    await db.execute(
      sql`DELETE FROM product_offers WHERE product_name=${productName}`,
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting offer:", error);
    return NextResponse.json(
      { error: "Failed to delete offer" },
      { status: 500 },
    );
  }
}
