import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET(request: NextRequest) {
  try {
    // Use Supabase REST API with service role key
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

    // Fetch products from the products table
    const { data, error } = await supabase.from("products").select("*");

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: "Failed to fetch products", details: error.message },
        { status: 500 },
      );
    }

    // Log sections for debugging
    const sections = [...new Set((data || []).map((p: any) => p.section))];
    console.log("Available sections in DB:", sections);
    console.log("Total products:", data?.length || 0);

    return NextResponse.json({ products: data || [] });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch products",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

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
    const { name, price, description, section, subsection } = body;

    // Validation
    if (!name || !price || !section || !subsection) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    if (typeof name !== "string" || name.trim().length === 0) {
      return NextResponse.json(
        { error: "Invalid product name" },
        { status: 400 },
      );
    }

    const parsedPrice = parseFloat(price);
    if (isNaN(parsedPrice) || parsedPrice <= 0) {
      return NextResponse.json(
        { error: "Price must be a positive number" },
        { status: 400 },
      );
    }

    const validSections = ["androfud", "btmob", "windows"];
    if (!validSections.includes(section.toLowerCase())) {
      return NextResponse.json(
        { error: "Invalid section. Must be: androfud, btmob, or windows" },
        { status: 400 },
      );
    }

    if (typeof subsection !== "string" || subsection.trim().length === 0) {
      return NextResponse.json(
        { error: "Invalid subsection" },
        { status: 400 },
      );
    }

    const slug = name.toLowerCase().replace(/\s+/g, "-");

    const newProduct: any = {
      name,
      slug,
      price: parsedPrice.toString(),
      description: description || null,
      section,
      subsection,
      images: [],
      tags: [],
    };

    console.log("Inserting product:", newProduct);

    // Use Supabase to insert product
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.DATABASE_SERVICE_ROLE!,
      {
        auth: { persistSession: false },
      },
    );

    const { data, error: insertError } = await supabase
      .from("products")
      .insert([newProduct])
      .select();

    if (insertError) {
      console.error("Error inserting product:", insertError);
      return NextResponse.json({ error: insertError.message }, { status: 500 });
    }

    console.log("Product inserted:", data);
    return NextResponse.json(data?.[0], { status: 201 });
  } catch (error) {
    console.error("Error creating product:", error);
    const errorMsg = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}
