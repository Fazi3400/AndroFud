"use client";

interface TrialModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TrialModal({ isOpen, onClose }: TrialModalProps) {
  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/90 z-40 backdrop-blur-xl"
        onClick={onClose}
      ></div>

      <div className="fixed inset-0 z-50 flex flex-col bg-gradient-to-b from-slate-950 via-purple-950 to-black">
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-600 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-20 flex justify-between items-center p-6 border-b border-purple-500/20 bg-black/40">
          <div></div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-purple-600/30 border border-purple-500/50 text-purple-300 hover:bg-purple-600/50 hover:text-purple-200 transition-all flex items-center justify-center font-bold text-xl"
          >
            ×
          </button>
        </div>

        <div className="relative z-10 flex-1 overflow-y-auto w-full">
          <div className="w-full px-4 sm:px-6 py-12">
            <div className="max-w-5xl mx-auto space-y-12">
              <div className="space-y-4 text-center">
                <div className="inline-block">
                  <div className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-600/50 to-pink-600/50 border border-purple-400/60">
                    <p className="text-xs font-bold text-purple-200 uppercase tracking-widest">
                      🎯 Try Before You Buy
                    </p>
                  </div>
                </div>
                <h1 className="text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-pink-200 to-purple-200">
                  Try Androfud Free
                </h1>
                <p className="text-2xl text-purple-100 font-semibold">
                  Get your customized APK in just 30 seconds!
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex gap-4 p-6 rounded-2xl bg-slate-900/50 border border-purple-500/30 hover:border-purple-500/60 transition-all backdrop-blur-sm">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center flex-shrink-0 font-bold text-white text-xl">
                    1
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-white text-lg">
                      Submit Your APK
                    </p>
                    <p className="text-sm text-purple-200/80 mt-1">
                      Upload your APK file to the Telegram bot
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 p-6 rounded-2xl bg-slate-900/50 border border-purple-500/30 hover:border-purple-500/60 transition-all backdrop-blur-sm">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center flex-shrink-0 font-bold text-white text-xl">
                    2
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-white text-lg">
                      Select UI Style
                    </p>
                    <p className="text-sm text-purple-200/80 mt-1">
                      Choose from multiple beautiful UI styles
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 p-6 rounded-2xl bg-slate-900/50 border border-purple-500/30 hover:border-purple-500/60 transition-all backdrop-blur-sm">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center flex-shrink-0 font-bold text-white text-xl">
                    3
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-white text-lg">
                      Enter App Name
                    </p>
                    <p className="text-sm text-purple-200/80 mt-1">
                      Set your custom application name
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 p-6 rounded-2xl bg-slate-900/50 border border-purple-500/30 hover:border-purple-500/60 transition-all backdrop-blur-sm">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center flex-shrink-0 font-bold text-white text-xl">
                    4
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-white text-lg">Select Icon</p>
                    <p className="text-sm text-purple-200/80 mt-1">
                      Choose or upload your app icon
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 p-8 rounded-2xl bg-gradient-to-r from-green-950/60 to-emerald-950/60 border border-green-500/40 backdrop-blur-sm">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-green-600 to-emerald-600 flex items-center justify-center flex-shrink-0 font-bold text-white text-2xl">
                  ⚡
                </div>
                <div className="flex-1">
                  <p className="font-bold text-white text-lg">
                    Get Your APK in 30 Seconds!
                  </p>
                  <p className="text-base text-green-200/80 mt-1">
                    Download your customized APK instantly and test it
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-950/50 to-pink-950/50 border border-purple-500/30">
                  <p className="font-bold text-white text-lg mb-4">
                    What You Get:
                  </p>
                  <div className="space-y-3 text-purple-100">
                    <div className="flex items-center gap-2">
                      <span className="text-purple-300 text-xl">✓</span>
                      <span>Military-Grade Encryption</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-purple-300 text-xl">✓</span>
                      <span>AV Bypass Technology</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-purple-300 text-xl">✓</span>
                      <span>Custom Dropper</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-purple-300 text-xl">✓</span>
                      <span>Works with All RATs</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-gradient-to-r from-cyan-950/50 to-blue-950/50 border border-cyan-500/30">
                  <p className="font-bold text-white text-lg mb-4">
                    Why Try First?
                  </p>
                  <div className="space-y-3 text-cyan-100">
                    <div className="flex items-center gap-2">
                      <span className="text-cyan-300 text-xl">✓</span>
                      <span>No Credit Card Required</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-cyan-300 text-xl">✓</span>
                      <span>Test on Your Own APK</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-cyan-300 text-xl">✓</span>
                      <span>See Quality Before Buying</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-cyan-300 text-xl">✓</span>
                      <span>30 Second Turnaround</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-20 border-t border-purple-500/20 bg-black/60 backdrop-blur-md p-6 flex flex-col sm:flex-row gap-4 justify-center items-center shrink-0">
          <button
            onClick={onClose}
            className="px-8 py-3 rounded-full font-bold border-2 border-purple-500/40 text-purple-300 hover:border-purple-400 hover:bg-purple-500/10 transition-all text-base"
          >
            Close
          </button>
          <a
            href="https://t.me/androfudbot"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 rounded-full font-bold bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-2xl hover:shadow-purple-500/50 transition-all text-base border border-purple-400/50 flex items-center gap-2"
          >
            🤖 Start Trial on Telegram
          </a>
        </div>
      </div>
    </>
  );
}
