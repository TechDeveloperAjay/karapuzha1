import { Metadata } from "next";
import Gallery from "@/components/home/Gallery";

export const metadata: Metadata = {
  title: "Photo Gallery | Karapuzha Water Scapes",
  description: "View our luxury villas, resort amenities, and the breathtaking scenery of Karapuzha Reservoir in Wayanad.",
};

export default function GalleryPage() {
  return (
    <>
      <section className="bg-zinc-900 text-white py-24 sm:py-32 relative flex flex-col items-center justify-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-medium tracking-wide mb-6">
            Gallery
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-[#F5F5DC] font-light">
            Immerse yourself in the visual journey of our resort. A perfect blend of untamed nature and refined luxury.
          </p>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-800/50 to-zinc-900 z-0"></div>
      </section>

      {/* For now, reusing the homepage gallery preview as the base component */}
      <Gallery />
    </>
  );
}
