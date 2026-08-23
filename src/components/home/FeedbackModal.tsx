"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function FeedbackModal({ isOpen, onClose }: FeedbackModalProps) {
  const router = useRouter();
  const [rating, setRating] = useState(5);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim() || !email.trim() || !feedback.trim()) {
      setError("Please fill in all fields");
      return;
    }

    if (feedback.length < 10) {
      setError("Feedback must be at least 10 characters");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          rating,
          feedback,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to submit feedback");
        setIsSubmitting(false);
        return;
      }

      setSubmitted(true);
      setTimeout(() => {
        onClose();
        setSubmitted(false);
        setName("");
        setEmail("");
        setFeedback("");
        setRating(5);
        router.refresh();
      }, 2000);
    } catch (error) {
      console.error("Error submitting feedback:", error);
      setError("Error submitting feedback");
      setIsSubmitting(false);
    }
  };

  const handleSkip = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 z-40 backdrop-blur-md"
        onClick={handleSkip}
      ></div>

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-gradient-to-br from-slate-900 via-blue-900/40 to-black rounded-3xl shadow-2xl shadow-cyan-500/40 border border-cyan-500/30 w-full max-w-2xl max-h-[90vh] overflow-y-auto p-8 space-y-6 scrollbar-thin scrollbar-thumb-cyan-500 scrollbar-track-slate-900">
          {!submitted ? (
            <>
              {/* Header */}
              <div className="space-y-3">
                <div className="inline-block">
                  <div className="px-4 py-2 rounded-full bg-gradient-to-r from-cyan-600/30 to-blue-600/30 border border-cyan-500/50">
                    <p className="text-xs font-mono text-cyan-400 font-semibold uppercase tracking-widest">Your Feedback Matters</p>
                  </div>
                </div>

                <div>
                  <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 mb-2">
                    Share Your Feedback
                  </h2>
                  <p className="text-cyan-200/70">Help us improve by sharing your thoughts and experiences</p>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Error Message */}
                {error && (
                  <div className="p-4 rounded-lg bg-red-600/20 border border-red-500/50 text-red-300">
                    <p className="text-sm font-semibold">{error}</p>
                  </div>
                )}

                {/* Rating */}
                <div className="space-y-3">
                  <label className="block text-white font-semibold">Your Rating</label>
                  <div className="flex gap-3 justify-center text-5xl">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className={`transition-all duration-200 hover:scale-125 ${
                          star <= rating
                            ? "text-yellow-400 drop-shadow-lg"
                            : "text-gray-600 hover:text-yellow-300"
                        }`}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                  <p className="text-center text-cyan-300 font-semibold">
                    {rating} out of 5 stars
                  </p>
                </div>

                {/* Name */}
                <div className="space-y-2">
                  <label className="block text-white font-semibold">Your Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g., John Doe"
                    className="w-full px-4 py-3 rounded-lg bg-slate-800/50 border border-cyan-500/30 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30 transition-all"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="block text-white font-semibold">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 rounded-lg bg-slate-800/50 border border-cyan-500/30 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30 transition-all"
                  />
                </div>

                {/* Feedback Text */}
                <div className="space-y-2">
                  <label className="block text-white font-semibold">Your Feedback</label>
                  <textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Share your feedback about our products and services..."
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg bg-slate-800/50 border border-cyan-500/30 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30 transition-all resize-none"
                  />
                  <div className="flex justify-between items-center">
                    <p className="text-xs text-cyan-400/60">
                      Be honest and constructive
                    </p>
                    <p className="text-xs text-cyan-400/60">
                      {feedback.length}/500 characters
                    </p>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-3 pt-4 border-t border-cyan-500/10">
                  <button
                    type="button"
                    onClick={handleSkip}
                    className="flex-1 py-3 px-6 rounded-xl font-bold text-lg transition-all duration-300 border-2 border-cyan-500/40 text-cyan-300 hover:border-cyan-400 hover:bg-cyan-500/10 hover:shadow-lg hover:shadow-cyan-500/20"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`flex-1 py-3 px-6 rounded-xl font-bold text-lg transition-all duration-300 ${
                      isSubmitting
                        ? "bg-gray-600 text-gray-400 cursor-not-allowed opacity-60"
                        : "bg-gradient-to-r from-cyan-600 to-blue-600 text-white hover:shadow-2xl hover:shadow-cyan-500/50 hover:scale-105 border border-cyan-400/50"
                    }`}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <span className="animate-spin">⚙️</span> Submitting...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        📤 Submit Feedback
                      </span>
                    )}
                  </button>
                </div>
              </form>
            </>
          ) : (
            <>
              {/* Success Message */}
              <div className="py-12 space-y-6 text-center">
                <div className="text-6xl mb-4">✅</div>
                <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-cyan-300">
                  Thank You!
                </h2>
                <p className="text-cyan-200/80 text-lg">
                  Your feedback has been received successfully. We appreciate your valuable input and will use it to improve our services.
                </p>
                <div className="pt-6">
                  <div className="inline-flex items-center gap-2 text-cyan-400">
                    <span className="animate-spin">⚙️</span>
                    <p>Closing in a moment...</p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
