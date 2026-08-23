"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import MainFooter from "@/components/layouts/MainFooter";
import Navbar from "@/components/layouts/MainNavbar";
import { ReactNode } from "react";

type Props = { children: ReactNode };

export default function AdminLayout({ children }: Props) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      // Check if admin password auth was used (stored in localStorage)
      const adminAuth = localStorage.getItem("admin_auth");
      console.log("AdminLayout - checking localStorage admin_auth:", adminAuth);

      if (adminAuth === "true") {
        console.log("AdminLayout - admin_auth found, authorizing");
        setIsAuthorized(true);
      } else {
        console.log("AdminLayout - no admin_auth, redirecting to sign-in");
        router.push("/sign-in?error=Only+authenticated+users+can+access");
      }
      setIsLoading(false);
    };

    // Use setTimeout to ensure localStorage is accessible
    setTimeout(checkAuth, 100);
  }, [router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthorized) {
    return null; // Redirect happened, don't render anything
  }

  return (
    <main>
      <Navbar adminLayout={true} />
      {children}
      <MainFooter />
    </main>
  );
}
