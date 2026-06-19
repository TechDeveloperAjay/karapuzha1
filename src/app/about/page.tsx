import { Metadata } from "next";
import About from "@/components/home/About";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us | Karapuzha Water Scapes",
  description: "Learn more about Karapuzha Water Scapes, a luxury waterfront resort in Wayanad offering premium villas and a serene connection with nature.",
};

export default function AboutPage() {
  return (
    <>
      {/* Page Header */}
      <section className="bg-zinc-900 text-white py-24 sm:py-32 relative flex flex-col items-center justify-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-medium tracking-wide mb-6">
            Our Story
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-[#F5F5DC] font-light">
            Discover the inspiration and history behind Wayanad's most serene waterfront sanctuary.
          </p>
        </div>
        {/* Subtle Background Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-800/50 to-zinc-900 z-0"></div>
      </section>

      {/* Main Content reusing the About component */}
      <About />

      {/* Additional About Page Content (Mission/Vision) */}
      <section className="bg-gray-50 py-24 border-t border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl font-serif font-medium text-zinc-900 mb-8">
            Our Vision
          </h3>
          <p className="text-lg text-zinc-600 font-light leading-relaxed mb-12">
            To create a sanctuary where guests can seamlessly disconnect from the chaos of modern life and reconnect with the profound tranquility of nature, without compromising on luxury or comfort. We strive to preserve the untouched beauty of the Western Ghats while offering an unparalleled hospitality experience.
          </p>
          <Link
            href="/rooms"
            className="inline-block px-8 py-3.5 border border-[#D4AF37] bg-transparent text-zinc-900 font-medium tracking-widest uppercase text-sm transition-all hover:bg-[#D4AF37] hover:text-white"
          >
            Explore Our Villas
          </Link>
        </div>
      </section>
    </>
  );
}
