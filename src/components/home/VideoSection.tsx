"use client";

import { useRef } from "react";
import { motion } from "framer-motion";

export default function VideoSection() {
    const videoRef = useRef<HTMLVideoElement | null>(null);

    return (
        <section className="relative py-24 bg-white dark:bg-[#0b0f14] overflow-hidden transition-colors duration-300">

            <div className="max-w-6xl mx-auto px-6">

                {/* TEXT */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.7 }}
                    className="text-center max-w-3xl mx-auto mb-12"
                >

                    <span className="uppercase tracking-[0.3em] text-[#8AA05A] text-sm font-semibold">
                        Experience Karapuzha
                    </span>

                    <h2 className="mt-4 text-4xl md:text-5xl font-serif text-[#1f2937] dark:text-white">
                        A Glimpse of Paradise
                    </h2>

                    <p className="mt-5 text-gray-600 dark:text-gray-300 leading-8">
                        Watch the serene beauty of Karapuzha Waterscapes come alive — where water,
                        forest, and luxury blend into a peaceful escape.
                    </p>

                </motion.div>

                {/* VIDEO CARD */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.8 }}
                    className="
            relative rounded-[28px] overflow-hidden
            shadow-2xl
            bg-black
          "
                >

                    {/* VIDEO */}
                    <video
                        ref={videoRef}
                        className="w-full h-[500px] md:h-[650px] object-cover"
                        src="/assets/images/gallery5.mp4"  // 👈 replace with your file
                        autoPlay
                        muted
                        loop
                        playsInline
                    />

                    {/* DARK OVERLAY */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

                    {/* CONTENT OVER VIDEO */}
                    <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 text-white">

                        <h3 className="text-2xl md:text-3xl font-serif mb-3">
                            Karapuzha Waterscapes Experience
                        </h3>

                        <p className="text-white/80 max-w-2xl leading-7">
                            A cinematic view of our lakeside villas, forest retreats, and the calm
                            reservoir surroundings that define true luxury in Wayanad.
                        </p>

                    </div>

                </motion.div>

            </div>
        </section>
    );
}