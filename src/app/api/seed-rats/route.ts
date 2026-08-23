import db from "@/lib/supabase/db";
import { products, collections } from "@/lib/supabase/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Import medias schema
    const { medias } = await import("@/lib/supabase/schema");

    // Get a valid media ID first
    const mediaResult = await db.select().from(medias).limit(1);
    const validMediaId = mediaResult[0]?.id;

    if (!validMediaId) {
      return NextResponse.json(
        {
          success: false,
          error: "No media found in database. Please upload an image first.",
        },
        { status: 400 }
      );
    }

    // Get windowstools collection (no hyphen - must match brand config)
    const collection = await db
      .select()
      .from(collections)
      .where(eq(collections.label, "windowstools"))
      .limit(1);

    let collectionId = collection[0]?.id;

    if (!collectionId) {
      // Create collection if it doesn't exist
      const newColl = await db
        .insert(collections)
        .values({
          label: "windowstools",
          slug: "windowstools",
          title: "Windows Tools",
          description: "Advanced Windows exploitation tools",
          featuredImageId: validMediaId,
        })
        .returning();

      collectionId = newColl[0]?.id;
    }

    const ratsData = [
      {
        name: "S400 Lifetime Only",
        slug: "s400-lifetime",
        price: "1500",
        description: "S400 RAT - Advanced Windows exploitation tool",
      },
      {
        name: "Xworm Rat ORG",
        slug: "xworm-rat-org",
        price: "1000",
        description: "Xworm RAT - Premium access",
      },
      {
        name: "Neptune Rat 5.4",
        slug: "neptune-rat-54",
        price: "500",
        description: "Neptune RAT 5.4 - Lifetime access",
      },
      {
        name: "Wizorm Rat 4.5",
        slug: "wizorm-rat-45",
        price: "400",
        description: "Wizorm RAT 4.5 - Complete toolkit",
      },
      {
        name: "Venom Rat 6.0.3",
        slug: "venom-rat-603",
        price: "300",
        description: "Venom RAT 6.0.3 - Standard edition",
      },
      {
        name: "Venom Rat 6.0.9 Pro",
        slug: "venom-rat-609-pro",
        price: "600",
        description: "Venom RAT 6.0.9 Pro - Premium features",
      },
      {
        name: "Crysome Rat",
        slug: "crysome-rat",
        price: "800",
        description: "Crysome RAT - Advanced encryption",
      },
    ];

    const added = [];

    for (const rat of ratsData) {
      try {
        const existing = await db
          .select()
          .from(products)
          .where(eq(products.slug, rat.slug))
          .limit(1);

        if (existing.length > 0) {
          added.push({ ...rat, status: "skipped" });
          continue;
        }

        await db.insert(products).values({
          name: rat.name,
          slug: rat.slug,
          price: rat.price,
          description: rat.description,
          collectionId,
          featuredImageId: validMediaId,
          rating: "5",
          tags: ["rat", "windows", "lifetime"],
          images: [],
          featured: false,
          stock: 999,
        });

        added.push({ ...rat, status: "added" });
      } catch (err: any) {
        added.push({ ...rat, status: "error", error: err.message });
      }
    }

    return NextResponse.json({
      success: true,
      collectionId,
      products: added,
      message: `${added.filter((p) => p.status === "added").length} products added`,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
