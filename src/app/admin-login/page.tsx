"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Simple admin authentication
      // You can modify these credentials
      const ADMIN_EMAIL = "admin@androfud.com";
      const ADMIN_PASSWORD = "Admin@123456";

      if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        // Store admin session in localStorage
        localStorage.setItem(
          "adminToken",
          JSON.stringify({
            email,
            loginTime: new Date().toISOString(),
          }),
        );

        // Redirect to admin dashboard
        router.push("/admin");
        router.refresh();
      } else {
        setError("Invalid email or password");
      }
    } catch (err) {
      setError("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#000000] to-[#0a0a0a] flex items-center justify-center px-4 py-12">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-12 space-y-4">
          <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#0099ff] via-[#a855f7] to-[#000000]">
            ADMIN LOGIN
          </h1>
          <p className="text-lg text-[#67e8f9]">Access Your Control Panel</p>
        </div>

        {/* Login Card */}
        <div className="bg-gradient-to-br from-[#0d2818] to-[#0a1f15] rounded-3xl shadow-2xl shadow-[#d8b4fe]/50 border border-[#d8b4fe]/40 p-8 space-y-6">
          {/* Error Message */}
          {error && (
            <div className="p-4 rounded-lg bg-red-500/20 border border-red-500/50 text-red-300 text-sm">
              {error}
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email Input */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-[#67e8f9] uppercase tracking-widest">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@androfud.com"
                className="w-full rounded-2xl bg-transparent border-2 border-[#38bdf8]/60 text-[#ffffff] placeholder-[#38bdf8]/70 focus:border-[#38bdf8] focus:outline-none transition-all duration-300 py-3 px-4"
                disabled={isLoading}
              />
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-[#67e8f9] uppercase tracking-widest">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="w-full rounded-2xl bg-transparent border-2 border-[#38bdf8]/60 text-[#ffffff] placeholder-[#38bdf8]/70 focus:border-[#38bdf8] focus:outline-none transition-all duration-300 py-3 px-4"
                disabled={isLoading}
              />
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-6 py-3 font-bold uppercase tracking-widest text-lg bg-gradient-to-r from-[#0099ff] via-[#0099ff] to-[#0099ff] text-white rounded-2xl hover:shadow-2xl hover:shadow-[#0099ff]/60 transition-all duration-300 disabled:opacity-50"
            >
              {isLoading ? "Logging in..." : "✦ LOGIN"}
            </button>
          </form>

          {/* Divider */}
          <div className="border-t border-[#0099ff]/20"></div>

          {/* Demo Credentials */}
          <div className="bg-[#0099ff]/10 rounded-lg p-4 space-y-2 text-xs">
            <p className="text-[#67e8f9] font-bold">Demo Credentials:</p>
            <p className="text-[#38bdf8]">
              Email: <span className="font-mono">admin@androfud.com</span>
            </p>
            <p className="text-[#38bdf8]">
              Password: <span className="font-mono">Admin@123456</span>
            </p>
          </div>

          {/* Footer Links */}
          <div className="text-center space-y-2 text-sm">
            <p className="text-[#67e8f9]/70">
              Back to{" "}
              <Link
                href="/"
                className="text-[#00f5ff] hover:text-white font-bold transition-colors"
              >
                Website
              </Link>
            </p>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-8 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg text-center text-xs text-yellow-300">
          🔒 Keep your admin credentials secure. Do not share with anyone.
        </div>
      </div>
    </main>
  );
}
