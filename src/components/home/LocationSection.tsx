"use client";

import { MapPin, ArrowUpRight } from "lucide-react";

export default function LocationSection() {
  return (
    <section className="py-16 bg-[#f8f6f2]">
      <div className="container mx-auto px-6">

        <div className="bg-white rounded-[28px] overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.06)]">

          <div className="grid lg:grid-cols-2">

            {/* Map */}
            <div className="h-[320px] lg:h-full">
              <iframe
                src="https://www.google.com/maps?q=Karapuzha+Waterscapes+Wayanad&output=embed"
                width="100%"
                height="100%"
                loading="lazy"
                className="w-full h-full"
              />
            </div>

            {/* Content */}
            <div className="p-8 lg:p-12 flex flex-col justify-center">

              <span className="uppercase tracking-[0.25em] text-[#8AA05A] text-xs font-medium">
                Prime Location
              </span>

              <h2 className="mt-4 text-3xl md:text-4xl font-serif text-[#1f2937] leading-tight">
                Nestled Along The
                <span className="block">
                  Karapuzha Reservoir
                </span>
              </h2>

              <p className="mt-5 text-gray-600 leading-7">
                Experience breathtaking waterfront views and easy
                access to Wayanad's most iconic attractions from
                one of the region's most scenic destinations.
              </p>

              <div className="flex items-start gap-3 mt-6">
                <MapPin
                  size={18}
                  className="text-[#8AA05A] mt-1 shrink-0"
                />

                <p className="text-gray-700 leading-7">
                  Thonikkadavu, Thrikkaippatta,
                  Ezhamchira P.O, Wayanad,
                  Kerala 673577
                </p>
              </div>

              {/* Highlighted CTA */}
              <div className="mt-8">
                <a
                  href="https://maps.google.com/?q=Karapuzha+Waterscapes+Wayanad"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    inline-flex
                    items-center
                    gap-3
                    bg-[#8AA05A]
                    text-white
                    px-7
                    py-4
                    rounded-full
                    font-medium
                    shadow-lg
                    shadow-[#8AA05A]/20
                    hover:scale-105
                    hover:shadow-xl
                    transition-all
                    duration-300
                  "
                >
                  View on Google Maps

                  <ArrowUpRight
                    size={18}
                    className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                  />
                </a>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}