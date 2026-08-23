import { NextRequest, NextResponse } from "next/server";

// Store feedback in memory (in production, use a database)
let allFeedback: any[] = [];

// Blocked keywords and patterns for spam/scam detection
// Blocked keywords and patterns for feedback validation
const FEEDBACK_BLOCKED_KEYWORDS = [
  // Scam/Fraud indicators
  "scam",
  "fake",
  "fraud",
  "cheater",
  "scammer",
  "money back",
  "refund",
  "chargeback",
  "dispute",
  "ripoff",
  "stolen",
  // External contact information
  "whatsapp",
  "telegram",
  "discord",
  "contact me",
  "dm me",
  "message me",
  "call me",
  "text me",
  "email me",
  "reach me",
  "inbox me",
  "+1",
  "+91",
  "+44",
  "+92",
  // Links and URLs
  "https://",
  "http://",
  "www.",
  ".com",
  ".io",
  ".net",
  ".org",
  ".co.uk",
  ".in",
  ".co",
  // Spam and marketing
  "viagra",
  "cialis",
  "casino",
  "lottery",
  "prize",
  "winner",
  "congratulations",
  "click here",
  "limited time",
  "act now",
  "hurry",
  "free money",
  "easy cash",
  "work from home",
  "make money fast",
  "get rich",
  "buy now",
  "order now",
  // Malicious content
  "malware",
  "virus",
  "trojan",
  "ransomware",
  "exploit",
  "hack",
  "crack",
  "pirate",
  "warez",
  "keygen",
  "nulled",
  "cracked",
  // Offensive/Abusive language
  "fuck",
  "shit",
  "asshole",
  "bitch",
  "damn",
  "hell",
  "crap",
  "bastard",
  "idiot",
  "stupid",
  "dumb",
  "gay",
  "retard",
  "nigger",
  "faggot",
];

function validateFeedback(text: string): { blocked: boolean; reason?: string } {
  const lowerText = text.toLowerCase();

  // Check for blocked keywords
  for (const keyword of FEEDBACK_BLOCKED_KEYWORDS) {
    if (lowerText.includes(keyword)) {
      return { blocked: true, reason: `Feedback contains restricted content: "${keyword}"` };
    }
  }

  // Check for email addresses in feedback
  const emailPattern = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
  if (emailPattern.test(lowerText)) {
    return { blocked: true, reason: "Email addresses are not allowed in feedback" };
  }

  // Check for phone-like patterns
  const phonePattern = /(\+\d{1,3}[\s.-]?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}/g;
  if (phonePattern.test(lowerText)) {
    return { blocked: true, reason: "Phone numbers are not allowed in feedback" };
  }

  // Check for repeated characters (spam behavior)
  const repeatedChars = lowerText.match(/(.)\1{4,}/g);
  if (repeatedChars && repeatedChars.length > 0) {
    return { blocked: true, reason: "Feedback contains suspicious repeated characters" };
  }

  // Check for excessive special characters
  const specialChars = (lowerText.match(/[!@#$%^&*()]/g) || []).length;
  if (specialChars > 5) {
    return { blocked: true, reason: "Feedback contains too many special characters" };
  }

  return { blocked: false };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, rating, feedback } = body;

    // Validation
    if (!name || !email || !rating || !feedback) {
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

    if (feedback.length < 10 || feedback.length > 500) {
      return NextResponse.json(
        { error: "Feedback must be between 10 and 500 characters" },
        { status: 400 }
      );
    }

    // Validate feedback content (strict validation)
    const feedbackValidation = validateFeedback(feedback);
    if (feedbackValidation.blocked) {
      return NextResponse.json(
        { error: feedbackValidation.reason || "Feedback contains restricted content" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Create new feedback entry
    const newFeedback = {
      id: allFeedback.length + 1000,
      name,
      email,
      rating,
      feedback,
      avatar: name.split(" ").map((n: string) => n[0]).join("").toUpperCase(),
      createdAt: new Date(),
      status: "published", // All feedback that passes validation is published
    };

    // Add to feedback list
    allFeedback.unshift(newFeedback);

    return NextResponse.json(
      {
        success: true,
        message: "Feedback submitted successfully",
        feedback: newFeedback,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error submitting feedback:", error);
    return NextResponse.json(
      { error: "Failed to submit feedback" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    return NextResponse.json({
      feedback: allFeedback,
      total: allFeedback.length,
    });
  } catch (error) {
    console.error("Error fetching feedback:", error);
    return NextResponse.json(
      { error: "Failed to fetch feedback" },
      { status: 500 }
    );
  }
}
