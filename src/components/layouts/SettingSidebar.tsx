"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";

interface SettingSidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string;
    title: string;
  }[];
}

export function SettingSidebarNav({
  className,
  items,
  ...props
}: SettingSidebarNavProps) {
  const pathname = usePathname();

  return (
    <nav
      className={cn(
        "flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1",
        className,
      )}
      {...props}
    >
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            pathname === item.href
              ? "bg-[#0099ff] hover:bg-[#d8b4fe] text-white"
              : "hover:bg-transparent hover:underline text-white",
            "justify-start",
          )}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  );
}
