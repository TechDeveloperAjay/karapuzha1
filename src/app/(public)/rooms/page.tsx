import { Metadata } from "next";
import Rooms from "@/components/home/Rooms";
import Amenities from "@/components/home/Amenities";

export const metadata: Metadata = {
  title: "Luxury Villas | Karapuzha Water Scapes",
  description: "Browse our premium waterfront and forest view villas in Wayanad. Each villa offers unparalleled luxury, privacy, and modern amenities.",
};

export default function RoomsPage() {
  return (
    <>
      <section className="bg-zinc-900 text-white py-24 sm:py-32 relative flex flex-col items-center justify-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-medium tracking-wide mb-6">
            Accommodation
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-[#F5F5DC] font-light">
            Discover a sanctuary of luxury. Our villas are meticulously designed to blend seamlessly with the natural beauty of the Karapuzha Reservoir.
          </p>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-800/50 to-zinc-900 z-0"></div>
      </section>

      <Rooms />
      <Amenities />
    </>
  );
}
