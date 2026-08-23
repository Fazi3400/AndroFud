"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import CartNav from "../../features/carts/components/CartNav";
import Branding from "./Branding";
import CartLink from "../../features/carts/components/CartLink";
import { ContactModal } from "./ContactModal";

type Props = {
  adminLayout: boolean;
  onFeedbackClick?: () => void;
};

function MobileNavbar({ adminLayout, onFeedbackClick }: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const navItems = [
    { label: "Live Demo", href: "/live-demo" },
    { label: "BT Mob", href: "/?brand=btmob#features" },
    { label: "Androfud", href: "/?brand=androfud#features" },
    { label: "Windows Tools", href: "/?brand=windowstools#features" },
    { label: "Community", href: "/#community" },
  ];

  return (
    <>
      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
      <div className="md:hidden flex gap-x-4 justify-between items-center h-[64px] px-4">
        <Branding />

        <div className="flex gap-x-4 items-center">
          <Suspense fallback={<CartLink productCount={0} />}>
            {!adminLayout && <CartNav />}
          </Suspense>

          {/* Hamburger Menu */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-[#67e8f9] hover:text-[#0099ff] transition-colors p-2 flex flex-col gap-1.5"
            aria-label="Menu"
          >
            <span className={`block w-6 h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? "rotate-45 translate-y-2" : ""}`}></span>
            <span className={`block w-6 h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? "opacity-0" : ""}`}></span>
            <span className={`block w-6 h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}></span>
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-[#000000]/95 backdrop-blur-md border-b border-[#0099ff]/30 py-4 px-4 space-y-3 animated-in">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="block px-4 py-2 text-[#67e8f9] hover:text-[#0099ff] hover:bg-[#0099ff]/10 rounded-lg transition-all duration-300 font-bold text-sm uppercase tracking-widest"
              >
                {item.label}
              </Link>
            ))}
            <button
              onClick={() => {
                onFeedbackClick?.();
                setIsMenuOpen(false);
              }}
              className="block w-full text-left px-4 py-2 text-indigo-300 hover:text-indigo-200 hover:bg-indigo-500/10 rounded-lg transition-all duration-300 font-bold text-sm uppercase tracking-widest"
            >
              💬 Feedback
            </button>
            <button
              onClick={() => {
                setIsContactModalOpen(true);
                setIsMenuOpen(false);
              }}
              className="block w-full text-left px-4 py-2 text-orange-300 hover:text-orange-200 hover:bg-orange-500/10 rounded-lg transition-all duration-300 font-bold text-sm uppercase tracking-widest"
            >
              Contact Us
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default MobileNavbar;

