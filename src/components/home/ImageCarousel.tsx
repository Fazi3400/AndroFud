"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const screenshotsByVersion = {
  androfud: [
    { id: 1, src: "/assets/AndroFud/Screenshot%202026-07-22%20003553.png", alt: "Androfud Screenshot 1" },
    { id: 2, src: "/assets/AndroFud/Screenshot%202026-07-22%20003613.png", alt: "Androfud Screenshot 2" },
    { id: 3, src: "/assets/AndroFud/Screenshot%202026-07-22%20003648.png", alt: "Androfud Screenshot 3" },
    { id: 4, src: "/assets/AndroFud/Screenshot%202026-07-22%20003703.png", alt: "Androfud Screenshot 4" },
    { id: 5, src: "/assets/AndroFud/Screenshot%202026-07-22%20003718.png", alt: "Androfud Screenshot 5" },
    { id: 6, src: "/assets/AndroFud/Screenshot%202026-07-22%20003805.png", alt: "Androfud Screenshot 6" },
  ],
  "3.6.3": [
    { id: 1, src: "/assets/BTMOB%203.6.3/Screenshot%202026-07-22%20004249.png", alt: "BTMOB 3.6.3 Screenshot 1" },
    { id: 2, src: "/assets/BTMOB%203.6.3/Screenshot%202026-07-22%20004445.png", alt: "BTMOB 3.6.3 Screenshot 2" },
    { id: 3, src: "/assets/BTMOB%203.6.3/Screenshot%202026-07-22%20004459.png", alt: "BTMOB 3.6.3 Screenshot 3" },
    { id: 4, src: "/assets/BTMOB%203.6.3/Screenshot%202026-07-22%20004510.png", alt: "BTMOB 3.6.3 Screenshot 4" },
    { id: 5, src: "/assets/BTMOB%203.6.3/Screenshot%202026-07-22%20004516.png", alt: "BTMOB 3.6.3 Screenshot 5" },
    { id: 6, src: "/assets/BTMOB%203.6.3/Screenshot%202026-07-22%20004522.png", alt: "BTMOB 3.6.3 Screenshot 6" },
    { id: 7, src: "/assets/BTMOB%203.6.3/Screenshot%202026-07-22%20004528.png", alt: "BTMOB 3.6.3 Screenshot 7" },
    { id: 8, src: "/assets/BTMOB%203.6.3/Screenshot%202026-07-22%20004533.png", alt: "BTMOB 3.6.3 Screenshot 8" },
    { id: 9, src: "/assets/BTMOB%203.6.3/Screenshot%202026-07-22%20004539.png", alt: "BTMOB 3.6.3 Screenshot 9" },
    { id: 10, src: "/assets/BTMOB%203.6.3/Screenshot%202026-07-22%20004549.png", alt: "BTMOB 3.6.3 Screenshot 10" },
  ],
  "4.6.1": [
    { id: 1, src: "/assets/BTMOB%204.6.1/Screenshot%202026-07-22%20002648.png", alt: "BTMOB 4.6.1 Screenshot 1" },
    { id: 2, src: "/assets/BTMOB%204.6.1/Screenshot%202026-07-22%20002700.png", alt: "BTMOB 4.6.1 Screenshot 2" },
    { id: 3, src: "/assets/BTMOB%204.6.1/Screenshot%202026-07-22%20002757.png", alt: "BTMOB 4.6.1 Screenshot 3" },
    { id: 4, src: "/assets/BTMOB%204.6.1/Screenshot%202026-07-22%20002836.png", alt: "BTMOB 4.6.1 Screenshot 4" },
    { id: 5, src: "/assets/BTMOB%204.6.1/Screenshot%202026-07-22%20002849.png", alt: "BTMOB 4.6.1 Screenshot 5" },
    { id: 6, src: "/assets/BTMOB%204.6.1/Screenshot%202026-07-22%20003018.png", alt: "BTMOB 4.6.1 Screenshot 6" },
    { id: 7, src: "/assets/BTMOB%204.6.1/Screenshot%202026-07-22%20003027.png", alt: "BTMOB 4.6.1 Screenshot 7" },
    { id: 8, src: "/assets/BTMOB%204.6.1/Screenshot%202026-07-22%20003034.png", alt: "BTMOB 4.6.1 Screenshot 8" },
    { id: 9, src: "/assets/BTMOB%204.6.1/Screenshot%202026-07-22%20003040.png", alt: "BTMOB 4.6.1 Screenshot 9" },
    { id: 10, src: "/assets/BTMOB%204.6.1/Screenshot%202026-07-22%20003047.png", alt: "BTMOB 4.6.1 Screenshot 10" },
    { id: 11, src: "/assets/BTMOB%204.6.1/Screenshot%202026-07-22%20003105.png", alt: "BTMOB 4.6.1 Screenshot 11" },
    { id: 12, src: "/assets/BTMOB%204.6.1/Screenshot%202026-07-22%20003111.png", alt: "BTMOB 4.6.1 Screenshot 12" },
    { id: 13, src: "/assets/BTMOB%204.6.1/Screenshot%202026-07-22%20003120.png", alt: "BTMOB 4.6.1 Screenshot 13" },
  ],
};

interface ImageCarouselProps {
  version: "androfud" | "3.6.3" | "4.6.1";
}

export function ImageCarousel({ version = "4.6.1" }: ImageCarouselProps) {
  const images = screenshotsByVersion[version];
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#091413] to-[#0d1a16]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Screenshots
          </h2>
          <p className="text-lg text-gray-300">
            See our interface in action
          </p>
        </div>

        <div className="rounded-3xl overflow-hidden shadow-2xl shadow-[#d8b4fe]/50 border border-[#d8b4fe]/30 -mx-10">
          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={{
              640: {
                slidesPerView: 1,
                spaceBetween: 15,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 2,
                spaceBetween: 30,
              },
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            pagination={{ clickable: true }}
            navigation={true}
            loop={true}
            className="mySwiper"
          >
            {images.map((image) => (
              <SwiperSlide key={image.id}>
                <div
                  className="relative w-full bg-contain bg-center bg-no-repeat"
                  style={{
                    backgroundImage: `url(${image.src})`,
                    height: '460px'
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <style>{`
        .swiper-pagination-bullet {
          background: #B0E4CC;
          opacity: 0.5;
        }
        .swiper-pagination-bullet-active {
          background: #B0E4CC;
          opacity: 1;
        }
        .swiper-button-next,
        .swiper-button-prev {
          color: #B0E4CC;
          background: rgba(64, 138, 113, 0.2);
          width: 44px;
          height: 44px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .swiper-button-next:hover,
        .swiper-button-prev:hover {
          background: rgba(64, 138, 113, 0.4);
        }
        .swiper-button-next::after,
        .swiper-button-prev::after {
          font-size: 20px;
        }
      `}</style>
    </section>
  );
}

