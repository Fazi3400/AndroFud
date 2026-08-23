import { env } from "@/env.mjs";

import { CookieOptions, createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient({
  cookieStore,
  isAdmin = false,
}: {
  cookieStore?: Awaited<ReturnType<typeof cookies>>;
  isAdmin?: boolean;
} = {}) {
  const store = cookieStore || (await cookies());

  return createServerClient(
    `https://${env.NEXT_PUBLIC_SUPABASE_PROJECT_REF}.supabase.co`,
    isAdmin ? env.DATABASE_SERVICE_ROLE : env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name: string) {
          return store.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            store.set(name, value, {
              ...options,
              maxAge: options.maxAge,
              path: options.path || "/",
              domain: options.domain,
              secure: options.secure !== false,
              httpOnly: options.httpOnly !== false,
              sameSite: (options.sameSite as any) || "lax",
            });
          } catch (error) {
            console.error("Failed to set cookie:", error);
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            store.set(name, "", {
              ...options,
              maxAge: 0,
              path: options.path || "/",
              domain: options.domain,
              secure: options.secure !== false,
              httpOnly: options.httpOnly !== false,
              sameSite: (options.sameSite as any) || "lax",
            });
          } catch (error) {
            console.error("Failed to remove cookie:", error);
          }
        },
      },
    },
  );
}

export default createClient;
