"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  brand: string;
}

export function ReviewModal({ isOpen, onClose, productName, brand }: ReviewModalProps) {
  const router = useRouter();
  const [rating, setRating] = useState(5);
  const [name, setName] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !reviewText.trim()) {
      alert("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          rating,
          text: reviewText,
          brand,
          productName,
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        setTimeout(() => {
          onClose();
          setSubmitted(false);
          setName("");
          setReviewText("");
          setRating(5);
          router.refresh();
        }, 2000);
      } else {
        alert("Failed to submit review. Please try again.");
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("Error submitting review");
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
        className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
        onClick={handleSkip}
      ></div>

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-gradient-to-br from-slate-900 via-slate-900/80 to-black rounded-3xl shadow-2xl shadow-cyan-500/30 border border-cyan-500/40 w-full max-w-lg max-h-[90vh] overflow-y-auto p-8 space-y-6 scrollbar-thin scrollbar-thumb-cyan-500 scrollbar-track-slate-900">
          {!submitted ? (
            <>
              {/* Header */}
              <div className="space-y-2">
                <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300">
                  Share Your Experience
                </h2>
                <p className="text-cyan-200/70">
                  Help other users by rating {productName}
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Rating */}
                <div className="space-y-3">
                  <label className="block text-white font-semibold">Rating</label>
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
                    placeholder="e.g., John Smith"
                    className="w-full px-4 py-3 rounded-lg bg-slate-800/50 border border-cyan-500/30 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30 transition-all"
                  />
                </div>

                {/* Review Text */}
                <div className="space-y-2">
                  <label className="block text-white font-semibold">Your Review</label>
                  <textarea
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    placeholder="Share your experience with this product..."
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg bg-slate-800/50 border border-cyan-500/30 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30 transition-all resize-none"
                  />
                  <p className="text-xs text-cyan-400/60">
                    {reviewText.length}/500 characters
                  </p>
                </div>

                {/* Buttons */}
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={handleSkip}
                    className="flex-1 py-3 px-6 rounded-lg border-2 border-cyan-500/50 text-cyan-300 font-semibold hover:border-cyan-400 hover:bg-cyan-500/10 transition-all duration-300"
                  >
                    Skip
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all ${
                      isSubmitting
                        ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:shadow-lg hover:shadow-cyan-500/50"
                    }`}
                  >
                    {isSubmitting ? "Submitting..." : "Submit Review"}
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
                  Your review has been submitted successfully and will appear on the website shortly.
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
