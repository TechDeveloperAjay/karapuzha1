"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const defaultSlides = [
  {
    id: "default-1",
    src: "/assets/images/room1.png",
    title: "Experience Unrivaled Luxury",
    subtitle:
      "A private sanctuary where elegance meets tranquility on the edge of the reservoir.",
  },
  {
    id: "default-2",
    src: "/assets/images/karapuzhaa.png",
    title: "Awaken to Still Waters",
    subtitle:
      "Immerse yourself in breathtaking panoramic views right from your private villa.",
  },
  {
    id: "default-3",
    src: "/assets/images/room1.png",
    title: "Indulge in Serenity",
    subtitle:
      "Discover the perfect blend of modern comfort and pristine natural beauty.",
  },
];

interface HeroProps {
  initialSlides?: any[];
}

export default function Hero({ initialSlides }: HeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = initialSlides && initialSlides.length > 0
    ? initialSlides.map((slide) => ({
        id: slide._id || Math.random().toString(),
        src: slide.image?.url || "/assets/images/room1.png",
        title: slide.title || "",
        subtitle: slide.subtitle || "",
      }))
    : defaultSlides;

  useEffect(() => {
    const timer = setInterval(() => {
      if (slides.length > 0) {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }
    }, 4000); // 4 seconds is usually better for reading headings
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-zinc-900 dark:bg-black">

      <AnimatePresence mode="popLayout">
        {slides.map(
          (slide, index) =>
            index === currentSlide && (
              <motion.div
                key={slide.id}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1, ease: "easeInOut" }}
                className="absolute inset-0"
              >

                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                  <Image
                    src={slide.src}
                    alt={slide.title}
                    fill
                    priority={index === 0}
                    className="object-cover"
                    sizes="100vw"
                  />

                  {/* Overlay (dark mode aware) */}
                  <div className="absolute inset-0 bg-zinc-900/50 dark:bg-black/60 bg-gradient-to-t from-zinc-900/90 via-zinc-900/30 to-transparent dark:from-black/90 dark:via-black/40" />
                </div>

                {/* Content */}
                <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center sm:px-6 lg:px-8">

                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="max-w-4xl"
                  >

                    <h1 className="mb-6 font-serif text-4xl sm:text-5xl md:text-7xl font-medium tracking-wide text-white drop-shadow-lg">
                      {slide.title}
                    </h1>

                    <p className="mx-auto mb-10 max-w-none sm:whitespace-nowrap text-lg sm:text-xl font-light tracking-wide text-[#F5F5DC] dark:text-gray-300 drop-shadow-md">
                      {slide.subtitle}
                    </p>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">

                      <Link
                        href="/#book"
                        className="
                          w-full sm:w-auto px-8 py-3.5
                          border border-[#D4AF37]
                          bg-[#D4AF37]
                          text-zinc-900
                          font-medium tracking-widest uppercase text-sm
                          transition-all duration-300
                          hover:bg-white hover:border-white hover:text-zinc-900
                          hover:scale-105
                        "
                      >
                        Book Now
                      </Link>

                      <Link
                        href="/contact"
                        className="
                          w-full sm:w-auto px-8 py-3.5
                          border border-white
                          bg-transparent
                          text-white
                          font-medium tracking-widest uppercase text-sm
                          transition-all duration-300
                          hover:bg-white hover:text-zinc-900
                          hover:scale-105
                        "
                      >
                        Get In Touch
                      </Link>

                    </div>

                  </motion.div>
                </div>
              </motion.div>
            )
        )}
      </AnimatePresence>

      {/* Slide Indicators */}
      <div className="absolute bottom-10 left-0 right-0 z-20 flex justify-center gap-3">

        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`
              h-2 rounded-full transition-all duration-300
              ${index === currentSlide
                ? "w-10 bg-[#D4AF37]"
                : "w-2 bg-white/50 hover:bg-white dark:bg-white/30 dark:hover:bg-white"}
            `}
          />
        ))}

      </div>

    </section>
  );
}