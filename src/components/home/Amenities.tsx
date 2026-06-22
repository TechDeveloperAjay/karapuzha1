"use client";

import {
  Wifi,
  ShieldCheck,
  Car,
  Tv,
  Refrigerator,
  Droplets,
  Waves,
  Trees,
  Coffee,
  Utensils,
  AirVent,
  Home,
  MapPinned,
  CookingPot,
} from "lucide-react";

export default function Amenities() {
  const amenities = [
    {
      icon: MapPinned,
      title: "Scenic Dam-View Balconies",
      description:
        "Private balconies overlooking the beautiful Karapuzha Dam.",
    },
    {
      icon: Utensils,
      title: "Travel & Food Assistance",
      description:
        "Assistance with food delivery, taxi bookings and local travel arrangements.",
    },
    {
      icon: Car,
      title: "Ample Parking Space",
      description:
        "Dedicated parking area with plenty of space for all guests.",
    },
    {
      icon: CookingPot,
      title: "Private Kitchenette",
      description:
        "Well-equipped kitchenette with essential utensils and appliances.",
    },
    {
      icon: Trees,
      title: "Outdoor Garden",
      description:
        "Relax in our landscaped garden area with seating and sunbeds.",
    },
    {
      icon: ShieldCheck,
      title: "24×7 CCTV Security",
      description:
        "Round-the-clock surveillance ensuring safety and peace of mind.",
    },
    {
      icon: Wifi,
      title: "Free Wi-Fi & Power Backup",
      description:
        "Stay connected with high-speed Wi-Fi and uninterrupted power backup.",
    },
    {
      icon: Home,
      title: "Fully Furnished 2BHK Villas",
      description:
        "Spacious two-bedroom villas with attached bathrooms and modern comforts.",
    },
    {
      icon: Coffee,
      title: "Clean Linen & Toiletries",
      description:
        "Fresh linen, hot water and essential toiletries provided for every stay.",
    },
    {
      icon: Waves,
      title: "Private Pool Access",
      description:
        "Enjoy exclusive access to a private swimming pool with scenic views.",
    },
    {
      icon: AirVent,
      title: "Air Conditioner",
      description:
        "Air-conditioned interiors designed for maximum comfort.",
    },
    {
      icon: Tv,
      title: "Smart Flat-Screen TV",
      description:
        "Watch your favorite shows and stream content with ease.",
    },
    {
      icon: Coffee,
      title: "Electric Kettle",
      description:
        "Prepare tea or coffee anytime with the in-room electric kettle.",
    },
    {
      icon: Droplets,
      title: "RO Water Purifier",
      description:
        "Clean, purified and safe drinking water available at all times.",
    },
    {
      icon: Refrigerator,
      title: "Refrigerator",
      description:
        "Convenient refrigerator for storing food, beverages and essentials.",
    },
  ];

  return (
    <section className="py-20 bg-[#f8f6f2] dark:bg-black transition-colors duration-500">
      <div className="container mx-auto px-6">

        {/* Heading */}
        <div className="max-w-4xl mx-auto text-center mb-14">

          <span className="uppercase tracking-[0.3em] text-[#8AA05A] text-sm font-semibold">
            Premium Amenities
          </span>

          <h2 className="mt-4 text-4xl md:text-5xl font-serif text-[#1f2937] dark:text-white">
            Everything You Need For A Comfortable Stay
          </h2>

          <p className="mt-6 text-lg text-gray-600 dark:text-zinc-400 leading-8 max-w-3xl mx-auto">
            Experience the perfect blend of comfort, privacy and convenience
            with thoughtfully curated amenities designed for families,
            couples and groups visiting Wayanad.
          </p>

        </div>

        {/* Amenities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

          {amenities.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="
                  group
                  bg-white
                  dark:bg-zinc-900
                  rounded-[28px]
                  p-6
                  border
                  border-[#ece8df]
                  dark:border-zinc-800
                  hover:border-[#8AA05A]/30
                  hover:-translate-y-1
                  hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)]
                  dark:hover:shadow-[0_20px_50px_rgba(0,0,0,0.6)]
                  transition-all
                  duration-300
                "
              >
                <div className="flex items-start gap-5">

                  {/* Icon */}
                  <div
                    className="
                      w-14
                      h-14
                      rounded-2xl
                      bg-[#f8f6f2]
                      dark:bg-zinc-800
                      flex
                      items-center
                      justify-center
                      shrink-0
                      group-hover:bg-[#8AA05A]
                      transition-all
                      duration-300
                    "
                  >
                    <Icon
                      size={26}
                      className="
                        text-[#8AA05A]
                        group-hover:text-white
                        transition-all
                        duration-300
                      "
                    />
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className="text-xl font-medium text-[#1f2937] dark:text-white mb-2">
                      {item.title}
                    </h3>

                    <p className="text-gray-600 dark:text-zinc-400 leading-7">
                      {item.description}
                    </p>
                  </div>

                </div>
              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}