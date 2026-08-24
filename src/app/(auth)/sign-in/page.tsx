import { type Metadata } from "next";
import Link from "next/link";

import { SigninForm } from "@/features/auth";
import { ThreeDLoginBackground } from "@/components/auth/ThreeDLoginBackground";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "androfud | Sign In",
  description: "Sign in to androfud",
};

export default function SignInPage() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden bg-[#030712]">
      {/* 3D Animated Background */}
      <ThreeDLoginBackground />

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-md px-4 space-y-8 pointer-events-auto">
        {/* Logo/Branding */}
        <div
          className="text-center"
          style={{
            animation: "slideInUp 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
        >
          <div className="inline-block mb-8">
            <div
              className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#0099ff] via-[#00f5ff] to-[#0099ff] tracking-widest"
              style={{
                animation: "textGlow 3s ease-in-out infinite",
                letterSpacing: "0.15em",
              }}
            >
              ANDROFUD
            </div>
            <div
              className="h-1 w-16 mx-auto mt-2 bg-gradient-to-r from-[#0099ff] to-[#00f5ff] rounded-full"
              style={{ animation: "pulse-glow 2s ease-in-out infinite" }}
            ></div>
          </div>
        </div>

        {/* Header */}
        <div
          className="space-y-3 text-center"
          style={{
            animation:
              "slideInUp 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.1s both",
          }}
        >
          <h1
            className="text-5xl md:text-6xl font-black text-white leading-tight"
            style={{ animation: "textGlow 3s ease-in-out infinite" }}
          >
            Portal Login
          </h1>
          <p
            className="text-[#00f5ff]/80 text-base md:text-lg font-light"
            style={{ animation: "fadeIn 0.8s ease-out 0.3s both" }}
          >
            Access your dark space environment
          </p>
        </div>

        {/* Form Container with Enhanced Styling */}
        <div
          className="relative"
          style={{
            animation:
              "slideInUp 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s both",
          }}
        >
          {/* Animated Background Glow */}
          <div
            className="absolute -inset-0.5 bg-gradient-to-r from-[#0099ff] via-[#00f5ff] to-[#0099ff] rounded-3xl opacity-20 blur-lg animate-pulse"
            style={{ animation: "pulse-glow 3s ease-in-out infinite" }}
          ></div>

          {/* Form Content */}
          <div className="relative bg-gradient-to-br from-[#1a1a2e] via-[#0a0a0a] to-[#0a0a0a] rounded-3xl border-2 border-[#0099ff]/40 p-8 md:p-10 backdrop-blur-xl">
            <Suspense
              fallback={
                <div className="space-y-4">
                  <div className="h-14 bg-gradient-to-r from-[#0099ff] to-[#00f5ff] rounded-full opacity-10 animate-pulse" />
                  <div className="h-14 bg-gradient-to-r from-[#0099ff] to-[#00f5ff] rounded-full opacity-10 animate-pulse" />
                  <div className="h-14 bg-gradient-to-r from-[#0099ff] to-[#00f5ff] rounded-full opacity-10 animate-pulse" />
                </div>
              }
            >
              <SigninForm />
            </Suspense>
          </div>
        </div>

        {/* Divider */}
        <div
          className="flex items-center gap-4"
          style={{ animation: "fadeIn 0.8s ease-out 0.4s both" }}
        >
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#0099ff]/40 to-transparent"></div>
          <span className="text-[#00f5ff]/50 text-sm">or continue below</span>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#0099ff]/40 to-transparent"></div>
        </div>

        {/* Footer Links */}
        <div
          className="space-y-4 pt-4"
          style={{
            animation:
              "slideInUp 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.5s both",
          }}
        >
          <div className="text-center text-sm space-y-3">
            <div>
              <span className="text-[#00f5ff]/60">
                Don&apos;t have an account?{" "}
              </span>
              <Link
                href="/sign-up"
                className="text-[#00f5ff] font-semibold hover:text-white relative group transition-all duration-300"
              >
                <span>Create one</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#0099ff] to-[#00f5ff] group-hover:w-full transition-all duration-300"></span>
              </Link>
            </div>
            <div>
              <Link
                href="/sign-in/reset-password"
                className="text-[#00f5ff]/70 hover:text-[#00f5ff] text-sm relative group transition-all duration-300"
              >
                <span>Forgot your password?</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#0099ff] to-[#00f5ff] group-hover:w-full transition-all duration-300"></span>
              </Link>
            </div>
          </div>
        </div>

        {/* Security Badge */}
        <div
          className="flex items-center justify-center gap-2 text-xs text-[#00f5ff]/50"
          style={{
            animation:
              "slideInUp 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.6s both",
          }}
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
              clipRule="evenodd"
            />
          </svg>
          <span>Enterprise Grade Security | End-to-End Encrypted</span>
        </div>
      </div>
    </div>
  );
}
