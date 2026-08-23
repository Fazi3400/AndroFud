"use client";

import { useState } from "react";
import Link from "next/link";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  if (!isOpen) return null;

  const contactOptions = [
    {
      id: "telegram",
      title: "Direct Telegram",
      description: "Message us directly on Telegram for quick support",
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0C5.373 0 0 5.373 0 12c0 6.627 5.373 12 12 12s12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.328-.373-.115l-6.869 4.332-2.96-.924c-.643-.204-.657-.643.135-.954l11.566-4.458c.54-.197 1.01.132.84.951z" />
        </svg>
      ),
      link: "https://t.me/happy_king_officials",
      buttonText: "Open Telegram",
      color: "from-cyan-600 to-blue-600",
      borderColor: "border-cyan-500",
    },
    {
      id: "whatsapp",
      title: "WhatsApp",
      description: "Chat with us on WhatsApp for instant communication",
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.923 1.297c-1.536.994-2.738 2.356-3.487 3.977-.749 1.622-.922 3.429-.5 5.16.422 1.731 1.333 3.287 2.657 4.501 1.324 1.215 3.071 2.044 4.918 2.385 1.847.34 3.771.156 5.515-.565 1.744-.723 3.254-1.976 4.332-3.573 1.078-1.596 1.706-3.502 1.706-5.51 0-2.668-1.075-5.174-2.998-7.061-1.922-1.887-4.514-2.945-7.216-2.945zm0 0" />
        </svg>
      ),
      link: "https://wa.me/19177643914",
      buttonText: "Open WhatsApp",
      color: "from-green-600 to-emerald-600",
      borderColor: "border-green-500",
    },
    {
      id: "channel",
      title: "Free Telegram Group",
      description: "Join our free public Telegram group for updates and community discussions",
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
        </svg>
      ),
      link: "https://t.me/androfud",
      buttonText: "Join Public Group",
      color: "from-purple-600 to-pink-600",
      borderColor: "border-purple-500",
    },
  ];

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-gradient-to-br from-[#0d2818] to-[#0a1f15] rounded-3xl shadow-2xl shadow-[#0099ff]/50 border border-[#0099ff]/40 w-full max-w-2xl max-h-[90vh] overflow-y-auto p-8 space-y-8 scrollbar-thin scrollbar-thumb-[#38bdf8] scrollbar-track-[#0a1f15]">
          {/* Header */}
          <div className="space-y-2">
            <h2 className="text-4xl font-black text-white">Get In Touch</h2>
            <p className="text-lg text-[#67e8f9]">
              Choose your preferred way to contact us
            </p>
          </div>

          {/* Contact Options */}
          <div className="space-y-4">
            {contactOptions.map((option) => (
              <div
                key={option.id}
                className={`group relative overflow-hidden rounded-2xl p-6 backdrop-blur-md border-2 transition-all duration-500 hover:scale-105 bg-gradient-to-br from-slate-900/30 via-slate-800/20 to-black/30 ${option.borderColor} hover:shadow-2xl`}
              >
                {/* Top Border Gradient */}
                <div
                  className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${option.color}`}
                ></div>

                <div className="relative z-10 flex items-start gap-4">
                  {/* Icon */}
                  <div
                    className={`p-4 rounded-xl bg-gradient-to-br ${option.color} group-hover:scale-110 transition-transform duration-300 flex-shrink-0 text-white shadow-lg`}
                  >
                    {option.icon}
                  </div>

                  {/* Content */}
                  <div className="flex-1 space-y-3">
                    <h3 className="text-2xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-300 group-hover:to-blue-300 transition-all duration-300">
                      {option.title}
                    </h3>
                    <p className="text-[#67e8f9]/90 leading-relaxed">
                      {option.description}
                    </p>

                    {/* CTA Button */}
                    <Link
                      href={option.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-block mt-4 px-6 py-3 rounded-lg bg-gradient-to-r ${option.color} text-white font-bold hover:shadow-lg transition-all duration-300 hover:scale-105`}
                    >
                      {option.buttonText} →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Email Section */}
          <div className="border-t border-[#0099ff]/20 pt-6">
            <div className="bg-gradient-to-br from-orange-900/20 to-red-900/10 border border-orange-500/30 rounded-2xl p-6 space-y-3">
              <div className="flex items-center gap-3">
                <svg className="w-6 h-6 text-orange-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
                <h3 className="text-lg font-bold text-white">Email Support</h3>
              </div>
              <p className="text-orange-300">
                Send us an email at{" "}
                <a
                  href="mailto:happykingofficials@gmail.com"
                  className="font-bold hover:text-orange-200 transition-colors"
                >
                  happykingofficials@gmail.com
                </a>
              </p>
            </div>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="w-full py-3 px-6 rounded-lg border-2 border-[#0099ff] text-white font-bold hover:bg-[#0099ff]/10 transition-all duration-300"
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
}
