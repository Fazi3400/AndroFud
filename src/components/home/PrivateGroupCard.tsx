"use client";

export function PrivateGroupCard() {
  return (
    <>
      <div className="group relative slide-in-up overflow-hidden rounded-2xl p-8 backdrop-blur-md border-2 transition-all duration-500 hover:scale-105 bg-gradient-to-br from-purple-900/30 via-slate-900/20 to-black/30 border-purple-500/60 hover:border-purple-300 hover:shadow-2xl hover:shadow-purple-500/40">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-purple-500 via-pink-500 to-transparent"></div>

        <div className="relative z-10 space-y-4">
          {/* Icon */}
          <div className="relative w-fit">
            <div className="p-5 rounded-xl bg-gradient-to-br from-purple-600/60 to-pink-600/40 group-hover:from-purple-500/80 group-hover:to-pink-500/60 group-hover:scale-125 transition-all duration-300 shadow-lg shadow-purple-600/30 group-hover:shadow-purple-500/60">
              <svg
                className="w-8 h-8 text-purple-200"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
              </svg>
            </div>
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-purple-600/20 to-pink-600/10 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
          </div>

          {/* Title */}
          <h3 className="text-2xl font-black text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-200 group-hover:to-pink-200 transition-all duration-300">
            Private Group
          </h3>

          {/* Price */}
          <div className="text-3xl font-black text-purple-300">Free</div>

          {/* Description */}
          <p className="text-purple-200/85 text-sm leading-relaxed">
            Join our community for exclusive content, discussions, and updates
          </p>

          {/* Quick Benefits List */}
          <div className="space-y-2 py-3 text-xs text-purple-200/75">
            <div className="flex items-center gap-2">
              <span className="text-purple-400">✓</span> All Android RATs
              included
            </div>
            <div className="flex items-center gap-2">
              <span className="text-purple-400">✓</span> Paid tools & updates
            </div>
            <div className="flex items-center gap-2">
              <span className="text-purple-400">✓</span> Advance hacking courses
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex gap-3 mt-4">
            <a
              href="https://t.me/cyberhaxks"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 px-6 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105 text-center"
            >
              Join Telegram
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
