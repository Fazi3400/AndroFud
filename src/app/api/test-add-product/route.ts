import db from "@/lib/supabase/db";
import { products, collections } from "@/lib/supabase/schema";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Step 1: Create windowstools collection
    console.log("Step 1: Creating/checking collection...");
    const collResult = await db
      .insert(collections)
      .values({
        label: "windowstools",
        slug: "windowstools",
        title: "Windows Tools",
        description: "Windows Tools RATs",
        featuredImageId: "dummy",
      })
      .onConflictDoNothing()
      .returning();

    const existingColl = await db.query.collections.findFirst({
      where: (cols, { eq }) => eq(cols.label, "windowstools"),
    });

    console.log("Collection:", existingColl);

    if (!existingColl?.id) {
      return NextResponse.json(
        { error: "Could not create/find collection" },
        { status: 500 }
      );
    }

    // Step 2: Add one test product
    console.log("Step 2: Adding test product...");
    const prodResult = await db
      .insert(products)
      .values({
        name: "S400 Lifetime Only",
        slug: "s400-lifetime",
        price: "1500",
        description: "Test S400 RAT",
        collectionId: existingColl.id,
        featuredImageId: "dummy",
        rating: "5",
        tags: [],
        images: [],
        featured: false,
        stock: 999,
      })
      .returning();

    console.log("Product created:", prodResult);

    // Step 3: Verify it's there
    console.log("Step 3: Verifying...");
    const allProds = await db.query.products.findMany();
    const allCols = await db.query.collections.findMany();

    return NextResponse.json({
      success: true,
      collection: existingColl,
      product: prodResult[0],
      totalProducts: allProds.length,
      totalCollections: allCols.length,
      allCollections: allCols,
      allProducts: allProds.slice(0, 5),
    });
  } catch (err: any) {
    console.error("Error:", err);
    return NextResponse.json(
      { error: err.message, details: err },
      { status: 500 }
    );
  }
}
