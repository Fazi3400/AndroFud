"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { Suspense, useState } from "react";
import { CartLink, CartNav } from "../../features/carts";
import { UserNav } from "@/features/auth";
import Branding from "./Branding";
import MobileNavbar from "./MobileNavbar";
import { ContactModal } from "./ContactModal";
import { FeedbackModal } from "@/components/home/FeedbackModal";

interface MainNavbarProps {
  adminLayout?: boolean;
}

function MainNavbar({ adminLayout = false }: MainNavbarProps) {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const navItems = [
    { label: "Live Demo", href: "/live-demo" },
    { label: "BT Mob", href: "/?brand=btmob#features" },
    { label: "Androfud", href: "/?brand=androfud#features" },
    { label: "Windows Tools", href: "/?brand=windowstools#features" },
    { label: "Community", href: "/#community" },
    { label: "Contact Us", href: "mailto:happykingofficials@gmail.com" },
  ];

  return (
    <>
      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
      <FeedbackModal isOpen={isFeedbackModalOpen} onClose={() => setIsFeedbackModalOpen(false)} />
      <nav className="bg-gradient-to-r from-[#000000]/95 to-[#000000]/95 backdrop-blur-md fixed z-50 w-full border-b border-[#0099ff]/30 shadow-lg shadow-purple-500/10">
        <div
          className={cn(
            adminLayout ? "mx-auto px-[3rem] max-w-[2500px] py-4" : "container py-4",
          )}
        >
          <div className="hidden md:flex gap-x-12 justify-between items-center">
            {/* Logo & Branding */}
            <div className="flex gap-x-3 items-center flex-shrink-0">
              <Branding />
            </div>

            {/* Center Navigation */}
            {!adminLayout && (
              <div className="flex gap-x-6 items-center">
                {navItems.map((item, idx) =>
                  item.label === "Contact Us" ? (
                    <button
                      key={item.label}
                      onClick={() => setIsContactModalOpen(true)}
                      className={`group relative px-6 py-2 rounded-full font-bold text-sm uppercase tracking-widest transition-all duration-300 overflow-hidden border-2 border-orange-500/50 text-orange-300 hover:border-orange-400 hover:text-orange-200`}
                    >
                      {/* Animated Background */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 bg-gradient-to-r from-orange-600 to-red-600"></div>

                      {/* Glow Effect */}
                      <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 blur transition-opacity duration-300 -z-10 bg-orange-500/50"></div>

                      {/* Text */}
                      <span className="relative z-10 flex items-center gap-2">
                        {item.label}
                        <span className="inline-block opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
                          →
                        </span>
                      </span>
                    </button>
                  ) : (
                    <Link
                      key={item.label}
                      href={item.href}
                      className={`group relative px-6 py-2 rounded-full font-bold text-sm uppercase tracking-widest transition-all duration-300 overflow-hidden border-2 ${
                        idx === 0
                          ? "border-cyan-500/50 text-cyan-300 hover:border-cyan-400 hover:text-cyan-200"
                          : idx === 1
                          ? "border-blue-500/50 text-blue-300 hover:border-blue-400 hover:text-blue-200"
                          : idx === 2
                          ? "border-purple-500/50 text-purple-300 hover:border-purple-400 hover:text-purple-200"
                          : idx === 3
                          ? "border-green-500/50 text-green-300 hover:border-green-400 hover:text-green-200"
                          : "border-pink-500/50 text-pink-300 hover:border-pink-400 hover:text-pink-200"
                      }`}
                    >
                      {/* Animated Background */}
                      <div
                        className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 ${
                          idx === 0
                            ? "bg-gradient-to-r from-cyan-600 to-blue-600"
                            : idx === 1
                            ? "bg-gradient-to-r from-blue-600 to-cyan-600"
                            : idx === 2
                            ? "bg-gradient-to-r from-purple-600 to-pink-600"
                            : idx === 3
                            ? "bg-gradient-to-r from-green-600 to-emerald-600"
                            : "bg-gradient-to-r from-pink-600 to-purple-600"
                        }`}
                      ></div>

                      {/* Glow Effect */}
                      <div
                        className={`absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 blur transition-opacity duration-300 -z-10 ${
                          idx === 0
                            ? "bg-cyan-500/50"
                            : idx === 1
                            ? "bg-blue-500/50"
                            : idx === 2
                            ? "bg-purple-500/50"
                            : idx === 3
                            ? "bg-green-500/50"
                            : "bg-pink-500/50"
                        }`}
                      ></div>

                      {/* Text */}
                      <span className="relative z-10 flex items-center gap-2">
                        {item.label}
                        <span className="inline-block opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
                          →
                        </span>
                      </span>
                    </Link>
                  )
                )}

                {/* Feedback Button */}
                <button
                  onClick={() => setIsFeedbackModalOpen(true)}
                  className="group relative px-6 py-2 rounded-full font-bold text-sm uppercase tracking-widest transition-all duration-300 overflow-hidden border-2 border-indigo-500/50 text-indigo-300 hover:border-indigo-400 hover:text-indigo-200"
                >
                  {/* Animated Background */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 bg-gradient-to-r from-indigo-600 to-purple-600"></div>

                  {/* Glow Effect */}
                  <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 blur transition-opacity duration-300 -z-10 bg-indigo-500/50"></div>

                  {/* Text */}
                  <span className="relative z-10 flex items-center gap-2">
                    💬 Feedback
                    <span className="inline-block opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
                      →
                    </span>
                  </span>
                </button>
              </div>
            )}


          {/* Right Actions */}
          <div className="flex gap-x-6 relative items-center flex-shrink-0">
            <Suspense>
              <UserNav />
            </Suspense>

            <Suspense fallback={<CartLink productCount={0} />}>
              {!adminLayout && <CartNav />}
            </Suspense>
          </div>
        </div>

        <MobileNavbar adminLayout={adminLayout} onFeedbackClick={() => setIsFeedbackModalOpen(true)} />
      </div>
      </nav>
    </>
  );
}

export default MainNavbar;
