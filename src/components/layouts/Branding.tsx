import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import React from "react";

type Props = { className?: string };

function Branding({ className }: Props) {
  return (
    <Link
      href="/"
      className={cn(
        "flex items-center gap-3 hover:opacity-90 transition-opacity duration-300",
        className,
      )}
    >
      {/* Logo without animation */}
      <Image
        src="/newlogo.png"
        alt="Androfud Logo"
        width={45}
        height={45}
        className="w-11 h-11"
        priority
      />

      <span className="text-2xl font-bold text-transparent bg-gradient-to-r from-[#0099ff] via-[#ec4899] to-[#d946ef] bg-clip-text hover:from-[#d946ef] hover:via-[#f472b6] hover:to-[#d946ef] transition-all duration-300 animate-pulse">
        ANDROFUD
      </span>
    </Link>
  );
}

export default Branding;
