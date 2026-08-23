import { SidebarNav } from "@/components/admin/SidebarNav";
import { ScrollArea } from "@/components/ui/scrollArea";
import { dashboardConfig } from "@/config/dashboard";
import { ReactNode } from "react";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  return (
    <div className="mx-auto px-[3rem] max-w-[2500px] pt-[50px] flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10 bg-black border-l border-[#0099ff]">
      <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto border-r border-[#0099ff] bg-black md:sticky md:block">
        <ScrollArea className="py-6 pr-6 lg:py-8">
          <SidebarNav items={dashboardConfig.sidebarNav} />
        </ScrollArea>
      </aside>
      <main className="flex w-full flex-col overflow-hidden pt-[50px] bg-black">
        {children}
      </main>
    </div>
  );
}
