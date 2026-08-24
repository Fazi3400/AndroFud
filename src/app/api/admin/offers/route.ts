import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

async function checkAdminAuth(request: NextRequest) {
  try {
    const adminPassword = request.headers.get("X-Admin-Password");
    if (adminPassword === process.env.ADMIN_PASSWORD) {
      return { id: "admin", email: "admin" };
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.DATABASE_SERVICE_ROLE;

    if (!supabaseUrl || !serviceRoleKey) {
      return null;
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey, {
      auth: { persistSession: false },
    });

    const authCookie =
      request.cookies.get("sb-auth-token")?.value ||
      request.cookies.get("sb-prwidbcixjusoqyajtav-auth-token")?.value;

    if (!authCookie) {
      return null;
    }

    let session;
    try {
      const parsed = JSON.parse(authCookie);
      session = parsed?.data?.session || parsed?.session;
    } catch {
      return null;
    }

    if (!session?.user?.id) {
      return null;
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("is_admin")
      .eq("id", session.user.id)
      .single();

    return profile?.is_admin ? session.user : null;
  } catch (error) {
    console.error("Auth check failed:", error);
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

    const { data: productOffers, error: productsError } = await supabase
      .from("product_offers")
      .select("*")
      .order("product_name");

    const { data: dayOffers, error: daysError } = await supabase
      .from("day_offers")
      .select("*")
      .order("day");

    if (productsError) {
      console.error("Supabase error:", productsError);
      return NextResponse.json(
        { error: "Failed to fetch offers", details: productsError.message },
        { status: 500 },
      );
    }

    if (daysError) {
      console.error("Supabase error:", daysError);
      return NextResponse.json(
        { error: "Failed to fetch day offers", details: daysError.message },
        { status: 500 },
      );
    }

    // Transform snake_case to camelCase for frontend
    const transformedProducts = (productOffers || []).map((offer: any) => ({
      productName: offer.product_name,
      baseDiscount: offer.base_discount,
      label: offer.label,
      validForDays: offer.valid_for_days,
      createdAt: offer.created_at,
      expiresAt: offer.expires_at,
    }));

    return NextResponse.json({
      productOffers: transformedProducts,
      dayOffers: dayOffers || [],
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

    // Calculate expiration date
    const now = new Date();
    const expiresAt = new Date(now.getTime() + validDays * 24 * 60 * 60 * 1000);

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

    const { error: upsertError } = await supabase.from("product_offers").upsert(
      {
        product_name: productName,
        base_discount: baseDiscount,
        label: label,
        valid_for_days: validDays,
        created_at: now.toISOString(),
        expires_at: expiresAt.toISOString(),
      },
      { onConflict: "product_name" },
    );

    if (upsertError) {
      console.error("Supabase error:", upsertError);
      return NextResponse.json(
        { error: "Failed to add offer", details: upsertError.message },
        { status: 500 },
      );
    }

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

      const label = `${baseDiscount}% OFF`;
      const { error: updateError } = await supabase
        .from("product_offers")
        .update({ base_discount: baseDiscount, label: label })
        .eq("product_name", productName);

      if (updateError) {
        return NextResponse.json(
          { error: updateError.message },
          { status: 500 },
        );
      }

      return NextResponse.json({ productName, baseDiscount, label });
    }

    if (type === "day" && day !== undefined) {
      if (!Number.isInteger(boost) || boost < 0 || boost > 100) {
        return NextResponse.json(
          { error: "Boost must be an integer between 0 and 100" },
          { status: 400 },
        );
      }

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

      const { error: dayError } = await supabase
        .from("day_offers")
        .update({ boost })
        .eq("day", day);

      if (dayError) {
        return NextResponse.json({ error: dayError.message }, { status: 500 });
      }

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
    const body = await request.json();
    const { productName } = body;

    if (!productName) {
      return NextResponse.json(
        { error: "Product name required" },
        { status: 400 },
      );
    }

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

    const { error: deleteError } = await supabase
      .from("product_offers")
      .delete()
      .eq("product_name", productName);

    if (deleteError) {
      return NextResponse.json({ error: deleteError.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting offer:", error);
    return NextResponse.json(
      { error: "Failed to delete offer" },
      { status: 500 },
    );
  }
}
