"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function AuthRedirectPage() {
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const handleRedirect = async () => {
      try {
        // Check if admin password auth was used (stored in localStorage)
        const adminAuth = localStorage.getItem("admin_auth");
        console.log("AuthRedirect - checking adminAuth:", adminAuth);

        if (adminAuth === "true") {
          console.log("AuthRedirect - admin password auth detected, redirecting to /admin");
          // Use window.location for a hard redirect
          window.location.href = "/admin";
          return;
        }

        console.log("AuthRedirect - no admin auth, checking Supabase");

        // Otherwise check Supabase auth
        const {
          data: { user },
          error: authError,
        } = await supabase.auth.getUser();

        console.log("User:", user?.email);
        console.log("Auth Error:", authError);

        if (authError || !user) {
          console.log("No user found, redirecting to sign-in");
          router.push("/sign-in");
          return;
        }

        // Check if user is admin
        const { data: profile } = await supabase
          .from("profiles")
          .select("is_admin")
          .eq("id", user.id)
          .single();

        if (profile?.is_admin) {
          console.log("User is admin, redirecting to /admin");
          router.push("/admin");
        } else {
          console.log("User is not admin, redirecting to home");
          router.push("/");
        }
      } catch (error) {
        console.error("AuthRedirect error:", error);
        router.push("/sign-in");
      }
    };

    handleRedirect();
  }, [router, supabase]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-4 text-gray-600">Redirecting...</p>
      </div>
    </div>
  );
}
