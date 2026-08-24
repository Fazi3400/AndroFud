import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { env } from "@/env.mjs";
import * as schema from "./schema";

// On Vercel, direct database connections are not available
// Only initialize if DATABASE_URL is set (local development)
let db: any = null;

if (env.DATABASE_URL && env.DATABASE_URL !== "") {
  try {
    const client = postgres(env.DATABASE_URL, { prepare: false });
    db = drizzle(client, { schema });
    console.log("✅ Database connection initialized");
  } catch (error) {
    console.error("❌ Failed to initialize database connection:", error);
    console.log("💡 Tip: This is expected on Vercel. Use Supabase REST API instead.");
  }
} else {
  console.log("⚠️ DATABASE_URL not set - direct database operations disabled");
  console.log("💡 Tip: Use Supabase REST API via API routes instead");
}

export default db;
