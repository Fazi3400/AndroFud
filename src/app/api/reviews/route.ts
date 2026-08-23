import { NextRequest, NextResponse } from "next/server";

// Store reviews in memory (in production, use a database)
let allReviews: any[] = [];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, rating, text, brand, productName } = body;

    // Validation
    if (!name || !rating || !text || !brand) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: "Rating must be between 1 and 5" },
        { status: 400 }
      );
    }

    if (text.length > 500) {
      return NextResponse.json(
        { error: "Review text must be 500 characters or less" },
        { status: 400 }
      );
    }

    // Create new review
    const newReview = {
      id: allReviews.length + 1000,
      name,
      rating,
      text,
      brand,
      productName,
      avatar: name.split(" ").map(n => n[0]).join(""),
      createdAt: new Date(),
    };

    // Add to reviews list
    allReviews.unshift(newReview);

    // Store in localStorage-like storage (in production, save to database)
    // For now, we'll just return success
    return NextResponse.json(
      {
        success: true,
        message: "Review submitted successfully",
        review: newReview,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error submitting review:", error);
    return NextResponse.json(
      { error: "Failed to submit review" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    return NextResponse.json({
      reviews: allReviews,
      total: allReviews.length,
    });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return NextResponse.json(
      { error: "Failed to fetch reviews" },
      { status: 500 }
    );
  }
}
