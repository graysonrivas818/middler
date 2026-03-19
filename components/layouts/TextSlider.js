"use client";

import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
const TextSlider = ({ 
  text = "Middler makes painting quotes easy, fast, and 98% accurate — no guesswork, just results."
}) => {
  return (
    <section className="p-5 bg-gradient-to-br from-primary-800 via-[#3a6fff] to-primary mt-5 mb-20">
      <div className="relative w-full">
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 0 }}
          speed={12000}
          loop
          slidesPerView="auto"
          spaceBetween={40}
          className="overflow-clip! *:ease-linear! touch-pan-y!"
        >
          {[...Array(5)].map((_, i) => (
            <SwiperSlide key={i} className="w-auto! backface-hidden!">
              <p className="text-white text-base lg:text-[40px]">
                {text}
              </p>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default TextSlider;
