import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface WishListLayoutProps {
  children: React.ReactNode;
}

export default async function WishListLayout({
  children,
}: WishListLayoutProps) {
  const cookieStore = await cookies();
  const supabase = await createClient({ cookieStore });

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect("/sign-in?from=/wish-list");
  }

  return <>{children}</>;
}
