"use client";
import Branding from "@/components/layouts/Branding";
import { FloatingContactButton } from "@/components/layouts/FloatingContactButton";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-[#0a0e27]">
      {/* Header */}
      <div className="pt-8 px-4">
        <Branding className="text-2xl text-[#a855f7]" />
      </div>

      {/* Form */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {children}
        </div>
      </main>

      {/* Floating Contact Button */}
      <FloatingContactButton />
    </div>
  );
}

