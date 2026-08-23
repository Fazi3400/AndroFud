"use client";

import { useState } from "react";
import Link from "next/link";

export function FloatingContactButton() {
  const [isOpen, setIsOpen] = useState(false);

  const contactOptions = [
    {
      id: "telegram",
      label: "Direct Telegram",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0C5.373 0 0 5.373 0 12c0 6.627 5.373 12 12 12s12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.328-.373-.115l-6.869 4.332-2.96-.924c-.643-.204-.657-.643.135-.954l11.566-4.458c.54-.197 1.01.132.84.951z" />
        </svg>
      ),
      href: "https://t.me/happy_king_officials",
      color: "from-cyan-600 to-blue-600",
      hoverColor: "hover:shadow-cyan-500/50",
    },
    {
      id: "whatsapp",
      label: "WhatsApp",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.923 1.297c-1.536.994-2.738 2.356-3.487 3.977-.749 1.622-.922 3.429-.5 5.16.422 1.731 1.333 3.287 2.657 4.501 1.324 1.215 3.071 2.044 4.918 2.385 1.847.34 3.771.156 5.515-.565 1.744-.723 3.254-1.976 4.332-3.573 1.078-1.596 1.706-3.502 1.706-5.51 0-2.668-1.075-5.174-2.998-7.061-1.922-1.887-4.514-2.945-7.216-2.945zm0 0" />
        </svg>
      ),
      href: "https://wa.me/19177643914",
      color: "from-green-600 to-emerald-600",
      hoverColor: "hover:shadow-green-500/50",
    },
    {
      id: "channel",
      label: "Public Channel",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
        </svg>
      ),
      href: "https://t.me/androfud",
      color: "from-purple-600 to-pink-600",
      hoverColor: "hover:shadow-purple-500/50",
    },
    {
      id: "contact",
      label: "Contact Us",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
        </svg>
      ),
      href: "mailto:happykingofficials@gmail.com",
      color: "from-orange-600 to-red-600",
      hoverColor: "hover:shadow-orange-500/50",
    },
  ];

  return (
    <div className="fixed bottom-8 right-8 z-40 group">
      {/* Contact Options */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 flex flex-col gap-3 mb-4 animate-in fade-in slide-in-from-bottom-3 duration-300">
          {contactOptions.map((option, idx) => (
            <Link
              key={option.id}
              href={option.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r ${option.color} text-white font-bold text-sm hover:scale-110 transition-all duration-300 ${option.hoverColor} shadow-lg group/option animate-in fade-in slide-in-from-bottom-2 duration-300`}
              style={{ animationDelay: `${idx * 50}ms` }}
            >
              {option.icon}
              <span className="whitespace-nowrap">{option.label}</span>
            </Link>
          ))}
        </div>
      )}

      {/* Main Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-16 h-16 rounded-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-2xl shadow-cyan-500/50 flex items-center justify-center font-bold text-2xl transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-cyan-400/70 ${
          isOpen ? "rotate-45" : ""
        }`}
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      </button>

      {/* Tooltip */}
      <div className="absolute bottom-20 right-16 bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        Contact Us
      </div>
    </div>
  );
}
