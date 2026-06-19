"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    quote: "Staying here was the highlight of our Kerala trip. Waking up to the view of the misty dam from our private balcony was magical. The staff went above and beyond.",
    author: "Anjali Sharma",
    location: "Mumbai, India",
    rating: 5,
  },
  {
    quote: "Perfect remote working spot! The high-speed internet never dropped, and the generator backup kept me online. Working with a 180-degree view of the lake was therapeutic.",
    author: "Marcus Vance",
    location: "London, UK",
    rating: 5,
  },
  {
    quote: "We booked the Lakeside Villa for a family reunion. The private kitchen and spacious bedrooms were ideal. The kids loved the bird watching trail and campfire.",
    author: "Rahul & Deepa Menon",
    location: "Bangalore, India",
    rating: 5,
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="testimonials" className="py-24 bg-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Trust Bar */}
        <div className="grid grid-cols-3 gap-4 md:gap-8 max-w-4xl mx-auto mb-20 text-center border-b border-zinc-200 pb-12">
          <div>
            <div className="text-3xl md:text-5xl font-serif text-zinc-900 mb-2">1.2k+</div>
            <div className="text-xs uppercase tracking-widest text-zinc-500 font-medium">Happy Guests</div>
          </div>
          <div className="border-l border-r border-zinc-200">
            <div className="text-3xl md:text-5xl font-serif text-[#D4AF37] mb-2">4.9★</div>
            <div className="text-xs uppercase tracking-widest text-zinc-500 font-medium">Google Rating</div>
          </div>
          <div>
            <div className="text-3xl md:text-5xl font-serif text-zinc-900 mb-2">100%</div>
            <div className="text-xs uppercase tracking-widest text-zinc-500 font-medium">Peace of Mind</div>
          </div>
        </div>

        {/* Slider */}
        <div className="max-w-4xl mx-auto relative min-h-[300px]">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 text-8xl text-zinc-200 font-serif opacity-50 z-0">
            &ldquo;
          </div>
          <div className="relative z-10 pt-12 px-4 text-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center"
              >
                <div className="flex gap-1 mb-6 text-[#D4AF37]">
                  {[...Array(testimonials[current].rating)].map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
                <p className="text-xl md:text-2xl font-serif italic text-zinc-700 leading-relaxed mb-8 max-w-3xl">
                  "{testimonials[current].quote}"
                </p>
                <h4 className="text-sm font-semibold tracking-widest uppercase text-zinc-900">
                  {testimonials[current].author}
                </h4>
                <span className="text-xs text-zinc-500 mt-1 uppercase tracking-wider">
                  {testimonials[current].location}
                </span>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-3 mt-12">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                aria-label={`View testimonial ${idx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  current === idx ? "w-8 bg-[#D4AF37]" : "w-2 bg-zinc-300 hover:bg-zinc-400"
                }`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
