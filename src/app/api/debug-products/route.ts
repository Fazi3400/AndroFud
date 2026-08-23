import db from "@/lib/supabase/db";
import { products, collections } from "@/lib/supabase/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Check collections
    const allCollections = await db
      .select()
      .from(collections);

    // Check products with windowstools collection
    const windowsProducts = await db
      .select({
        id: products.id,
        name: products.name,
        slug: products.slug,
        price: products.price,
        collectionId: products.collectionId,
      })
      .from(products)
      .where(eq(products.collectionId, (await db.select().from(collections).where(eq(collections.label, "windowstools")).limit(1))[0]?.id || ""));

    return NextResponse.json({
      collections: allCollections,
      windowsProducts,
      message: "Debug data"
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message, stack: err.stack },
      { status: 500 }
    );
  }
}
