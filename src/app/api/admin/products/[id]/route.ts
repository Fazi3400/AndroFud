import { NextRequest, NextResponse } from "next/server";
import { products } from "@/lib/supabase/schema";
import db from "@/lib/supabase/db";
import { eq } from "drizzle-orm";
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

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const user = await checkAdminAuth(request);
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized - Admin access required" },
        { status: 401 },
      );
    }

    const { id } = params;
    const body = await request.json();
    const { name, price, description, section, subsection } = body;

    const slug = name.toLowerCase().replace(/\s+/g, "-");

    const result = await db
      .update(products)
      .set({
        name,
        slug,
        price: price.toString(),
        description,
        section,
        subsection,
      })
      .where(eq(products.id, id))
      .returning();

    if (result.length === 0) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const user = await checkAdminAuth(request);
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized - Admin access required" },
        { status: 401 },
      );
    }

    const { id } = params;

    const result = await db
      .delete(products)
      .where(eq(products.id, id))
      .returning();

    if (result.length === 0) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 },
    );
  }
}
