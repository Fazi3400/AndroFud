import { SettingSidebarNav } from "@/components/layouts/SettingSidebar";
import { Separator } from "@/components/ui/separator";
import { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Forms",
  description: "Advanced form example using react-hook-form and Zod.",
};

const sidebarNavItems = [
  {
    title: "Profile",
    href: "/setting",
  },
  {
    title: "Account",
    href: "/setting/account",
  },
];

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default async function SettingsLayout({
  children,
}: SettingsLayoutProps) {
  const cookieStore = await cookies();
  const supabase = await createClient({ cookieStore });

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect("/sign-in?from=/setting");
  }

  return (
    <>
      <div className="hidden space-y-6 p-10 pb-16 md:block bg-black min-h-screen">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight text-[#a855f7]">
            Settings
          </h2>
          <p className="text-[#67e8f9]">
            Manage your account settings and set e-mail preferences.
          </p>
        </div>
        <Separator className="my-6 bg-[#0099ff]" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            <SettingSidebarNav items={sidebarNavItems} />
          </aside>
          <div className="flex-1 lg:max-w-xl min-h-[30vh]">{children}</div>
        </div>
      </div>
    </>
  );
}
