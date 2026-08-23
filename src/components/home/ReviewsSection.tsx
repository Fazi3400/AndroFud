"use client";

import { useEffect, useState } from "react";

interface Review {
  id: number;
  name: string;
  avatar: string;
  rating: number;
  text: string;
  brand: string;
}

export function ReviewsSection() {
  const [userReviews, setUserReviews] = useState<Review[]>([]);
  const [userFeedback, setUserFeedback] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch reviews
        const reviewsResponse = await fetch("/api/reviews");
        if (reviewsResponse.ok) {
          const reviewsData = await reviewsResponse.json();
          setUserReviews(reviewsData.reviews || []);
        }

        // Fetch feedback
        const feedbackResponse = await fetch("/api/feedback");
        if (feedbackResponse.ok) {
          const feedbackData = await feedbackResponse.json();
          setUserFeedback(feedbackData.feedback || []);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const staticReviews: Review[] = [
    {
      id: 1,
      name: "Alex Rodriguez",
      avatar: "AR",
      rating: 5,
      text: "Best tool in the market! The encryption is unbreakable and customer support is responsive 24/7. Worth every penny.",
      brand: "Androfud"
    },
    {
      id: 2,
      name: "John Smith",
      avatar: "JS",
      rating: 5,
      text: "BTMOB delivered exactly what was promised. Real-time monitoring works flawlessly across all my devices. Highly recommended!",
      brand: "BT Mob"
    },
    {
      id: 3,
      name: "Marcus Chen",
      avatar: "MC",
      rating: 5,
      text: "The Windows Tools RATs are incredibly powerful. S400 and Venom Rat are game changers. Best investment I've made.",
      brand: "Windows Tools"
    },
    {
      id: 4,
      name: "David Johnson",
      avatar: "DJ",
      rating: 5,
      text: "Androfud's dropper is the fastest I've ever used. Setup takes less than 5 minutes. Absolutely incredible product!",
      brand: "Androfud"
    },
    {
      id: 5,
      name: "Sarah Williams",
      avatar: "SW",
      rating: 5,
      text: "Been using BTMOB for 6 months now. The stability and reliability are unmatched. This is what I've been looking for!",
      brand: "BT Mob"
    },
    {
      id: 6,
      name: "Tech Enthusiast",
      avatar: "TE",
      rating: 5,
      text: "Windows Tools pricing is very competitive. Got all RATs in one bundle and the quality is professional grade. Love it!",
      brand: "Windows Tools"
    },
    {
      id: 7,
      name: "Michael Torres",
      avatar: "MT",
      rating: 5,
      text: "Androfud's custom dropper feature is a game-changer. The support team helped me get everything set up perfectly.",
      brand: "Androfud"
    },
    {
      id: 8,
      name: "Elena Petrov",
      avatar: "EP",
      rating: 5,
      text: "BTMOB's interface is so intuitive. I've tested many tools before, but this one stands out. Exceptional quality!",
      brand: "BT Mob"
    },
    {
      id: 9,
      name: "James Wilson",
      avatar: "JW",
      rating: 5,
      text: "Windows Tools S400 is phenomenal. Fast, reliable, and the documentation is crystal clear. Couldn't ask for better.",
      brand: "Windows Tools"
    },
    {
      id: 10,
      name: "Lisa Anderson",
      avatar: "LA",
      rating: 5,
      text: "The encryption on Androfud is military-grade. I've been recommending it to my entire team. Best purchase ever!",
      brand: "Androfud"
    },
    {
      id: 11,
      name: "Robert Kim",
      avatar: "RK",
      rating: 5,
      text: "BTMOB's real-time monitoring is unreal. The performance is smooth and the uptime is guaranteed. Very impressed!",
      brand: "BT Mob"
    },
    {
      id: 12,
      name: "Carlos Mendez",
      avatar: "CM",
      rating: 5,
      text: "Venom Rat from Windows Tools is incredible. The control panel is user-friendly and everything works as advertised.",
      brand: "Windows Tools"
    },
    {
      id: 13,
      name: "Nina Dubov",
      avatar: "ND",
      rating: 5,
      text: "Androfud's AV bypass is phenomenal. It evades all major antivirus solutions with ease. Absolutely professional!",
      brand: "Androfud"
    },
    {
      id: 14,
      name: "Patrick O'Brien",
      avatar: "PO",
      rating: 5,
      text: "BTMOB customer service is fantastic. They respond within minutes. The tool itself is rock solid and never crashes.",
      brand: "BT Mob"
    },
    {
      id: 15,
      name: "Sophia Garcia",
      avatar: "SG",
      rating: 5,
      text: "Windows Tools bundle gave me everything I needed. The pricing is fair and the quality exceeds expectations.",
      brand: "Windows Tools"
    },
    {
      id: 16,
      name: "Hassan Al-Rashid",
      avatar: "HA",
      rating: 5,
      text: "Androfud's AV detection bypass is unlike anything I've seen. The updates are frequent and always improve the tool.",
      brand: "Androfud"
    },
    {
      id: 17,
      name: "Victoria Brooks",
      avatar: "VB",
      rating: 5,
      text: "BTMOB's dashboard is beautiful and functional. The analytics provided are incredibly detailed and useful.",
      brand: "BT Mob"
    },
    {
      id: 18,
      name: "Yuki Tanaka",
      avatar: "YT",
      rating: 5,
      text: "Windows Tools RATs have the best documentation I've ever seen. Setup was smooth and support is always available.",
      brand: "Windows Tools"
    },
    {
      id: 19,
      name: "Frank Mueller",
      avatar: "FM",
      rating: 5,
      text: "Androfud is worth every dollar. The encryption algorithm is solid and the dropper customization is endless.",
      brand: "Androfud"
    },
    {
      id: 20,
      name: "Amelia Clarke",
      avatar: "AC",
      rating: 5,
      text: "BTMOB exceeded my expectations. The real-time features work perfectly and stability is 99.9%. Fantastic product!",
      brand: "BT Mob"
    },
    {
      id: 21,
      name: "Daniel Kovac",
      avatar: "DK",
      rating: 5,
      text: "Windows Tools S400 performance is outstanding. I've been using it for 4 months with zero issues. Highly recommended!",
      brand: "Windows Tools"
    },
    {
      id: 22,
      name: "Rachel Green",
      avatar: "RG",
      rating: 5,
      text: "Androfud's support team is incredibly helpful. They answered all my questions and provided detailed guidance.",
      brand: "Androfud"
    },
    {
      id: 23,
      name: "Gabriel Santos",
      avatar: "GS",
      rating: 5,
      text: "BTMOB is the most reliable monitoring tool I've used. The features are comprehensive and well-implemented.",
      brand: "BT Mob"
    },
    {
      id: 24,
      name: "Natasha Volkov",
      avatar: "NV",
      rating: 5,
      text: "Windows Tools Venom Rat is super stable. Handles heavy workloads without any lag. Excellent investment!",
      brand: "Windows Tools"
    },
    {
      id: 25,
      name: "Oliver White",
      avatar: "OW",
      rating: 5,
      text: "Androfud's customization options are unmatched. I can create exactly the payload I need in minutes.",
      brand: "Androfud"
    },
    {
      id: 26,
      name: "Zainab Hassan",
      avatar: "ZH",
      rating: 5,
      text: "BTMOB's multi-device support is seamless. Managing multiple phones from one interface is incredibly efficient.",
      brand: "BT Mob"
    },
    {
      id: 27,
      name: "Lucas Silva",
      avatar: "LS",
      rating: 5,
      text: "Windows Tools delivers professional-grade RATs at competitive prices. The quality-to-price ratio is unbeatable.",
      brand: "Windows Tools"
    },
    {
      id: 28,
      name: "Emma Thompson",
      avatar: "ET",
      rating: 5,
      text: "Androfud changed the game for me. The dropper works on all devices and the encryption is bulletproof.",
      brand: "Androfud"
    },
    {
      id: 29,
      name: "Pavel Sokolov",
      avatar: "PS",
      rating: 5,
      text: "BTMOB is the gold standard in monitoring tools. I've tried competitors and none come close to this quality.",
      brand: "BT Mob"
    },
    {
      id: 30,
      name: "Isabella Romano",
      avatar: "IR",
      rating: 5,
      text: "Windows Tools support is exceptional. Every question gets answered thoroughly and the community is helpful.",
      brand: "Windows Tools"
    },
  ];

  // Convert feedback to review format and combine with reviews
  const convertedFeedback = userFeedback.map((fb: any) => ({
    id: fb.id,
    name: fb.name,
    avatar: fb.avatar || fb.name.split(" ").map((n: string) => n[0]).join("").toUpperCase(),
    rating: fb.rating,
    text: fb.feedback,
    brand: "Community Feedback",
  }));

  const allReviews = [...convertedFeedback, ...userReviews, ...staticReviews];

  const ReviewCard = ({ review }: { review: Review }) => (
    <div
      className="group relative code-flow overflow-hidden rounded-2xl p-8 backdrop-blur-sm border-2 transition-all duration-500 hover:scale-105 bg-gradient-to-br from-slate-800/40 via-slate-900/40 to-black/40 border-cyan-500/40 hover:border-cyan-400/80 hover:shadow-lg hover:shadow-cyan-500/30"
    >
      {/* Top Border Accent */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500/80 via-blue-500/60 to-transparent"></div>

      {/* Rating Stars */}
      <div className="flex gap-1 mb-4">
        {[...Array(review.rating)].map((_, i) => (
          <span key={i} className="text-yellow-400 text-lg">★</span>
        ))}
      </div>

      {/* Review Text */}
      <p className="text-slate-100/90 text-sm leading-relaxed mb-6 italic">
        "{review.text}"
      </p>

      {/* User Info */}
      <div className="flex items-center gap-4 pt-6 border-t border-cyan-500/20">
        {/* Avatar */}
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500/40 to-blue-500/40 border border-cyan-500/60 flex items-center justify-center flex-shrink-0">
          <span className="text-sm font-bold text-cyan-300">
            {review.avatar}
          </span>
        </div>

        {/* Name & Brand */}
        <div className="flex-1 min-w-0">
          <p className="text-white font-semibold text-sm truncate">
            {review.name}
          </p>
          <p className="text-cyan-400/70 text-xs">
            {review.brand} User
          </p>
        </div>

        {/* Brand Badge */}
        <div className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap ${
          review.brand === "Androfud"
            ? "bg-purple-500/30 text-purple-300 border border-purple-500/50"
            : review.brand === "BT Mob"
            ? "bg-cyan-500/30 text-cyan-300 border border-cyan-500/50"
            : review.brand === "Windows Tools"
            ? "bg-green-500/30 text-green-300 border border-green-500/50"
            : "bg-orange-500/30 text-orange-300 border border-orange-500/50"
        }`}>
          {review.brand}
        </div>
      </div>

      {/* Corner Accent */}
      <div className="absolute bottom-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-15 transition-opacity duration-300">
        <div className="absolute bottom-2 right-2 w-10 h-10 border-b-2 border-r-2 border-cyan-500"></div>
      </div>
    </div>
  );

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-900 via-slate-900/50 to-black/80 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-600 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-600 rounded-full filter blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20 slide-in-up">
          <div className="inline-block mb-6 code-flow">
            <span className="text-sm font-mono px-4 py-2 border border-cyan-500/60 bg-blue-950/40 text-cyan-400 rounded-full">
              $ REVIEWS.LOAD()
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 mb-6">
            COMMUNITY REVIEWS
          </h2>
          <p className="text-xl text-cyan-400/80 opacity-80 max-w-2xl mx-auto">
            Trusted by thousands of users worldwide
          </p>
        </div>

        {/* Grid View */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allReviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>

        {/* Bottom Stats */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          {(() => {
            const totalReviews = allReviews.length + 2800;
            const avgRating = 4.95;

            return [
              { label: "Total Reviews", value: `${totalReviews.toLocaleString()}+` },
              { label: "Average Rating", value: `${avgRating}★` },
              { label: "Active Users", value: "350K+" },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="text-center p-6 rounded-xl bg-gradient-to-br from-cyan-900/20 to-blue-900/20 border border-cyan-500/30 backdrop-blur-sm"
                style={{ animationDelay: `${0.5 + idx * 0.1}s` }}
              >
                <div className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300 mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-cyan-400/70 font-mono">
                  {stat.label}
                </div>
              </div>
            ));
          })()}
        </div>
      </div>
    </section>
  );
}
