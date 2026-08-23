import { env } from "@/env.mjs";

import { createBrowserClient } from "@supabase/ssr";

let supabaseClient: any = null;

export function createClient() {
  return createBrowserClient(
    `https://${env.NEXT_PUBLIC_SUPABASE_PROJECT_REF}.supabase.co`,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
}

export function getClient() {
  if (typeof window === "undefined") return null;
  if (!supabaseClient) {
    supabaseClient = createClient();
  }
  return supabaseClient;
}

export default getClient;
