"use client";

import { motion } from "framer-motion";

const attractions = [
  {
    title: "Karapuzha Dam & Garden",
    distance: "2 km",
    image: "/assets/images/nearbyloco/dam.jpg",
  },
  {
    title: "Kanthanpara Waterfalls",
    distance: "9 km",
    image: "/assets/images/nearbyloco/kanthanpara.jpg",
  },
  {
    title: "Soochippara Waterfalls",
    distance: "12 km",
    image: "/assets/images/nearbyloco/soochipara.jpeg",
  },
  {
    title: "Chembra Peak",
    distance: "14 km",
    image: "/assets/images/nearbyloco/chembra-peak-Wayanad.png",
  },
  {
    title: "Karlad Lake",
    distance: "15 km",
    image: "/assets/images/nearbyloco/karalad.jpg",
  },
  {
    title: "Muthanga Wildlife Sanctuary",
    distance: "17 km",
    image: "/assets/images/nearbyloco/Muthanga.webp",
  },
  {
    title: "Edakkal Caves",
    distance: "18 km",
    image: "/assets/images/nearbyloco/Edakkal.jpg",
  },
  {
    title: "Pookode Glass Bridge",
    distance: "27 km",
    image: "/assets/images/nearbyloco/glassbridge.png",
  },
  {
    title: "Pookkode Lake",
    distance: "27 km",
    image: "/assets/images/nearbyloco/pookode_lake.webp",
  },
  {
    title: "Churam Viewpoint",
    distance: "27 km",
    image: "/assets/images/nearbyloco/churram.jpg",
  },
  {
    title: "En Ooru Tribal Heritage Village",
    distance: "30 km",
    image: "/assets/images/nearbyloco/EN_OORU.jpg",
  },
];

export default function NearbyAttractions() {
  return (
    <section className="py-20 bg-white dark:bg-[#0b0f14] transition-colors duration-300">
      <div className="container mx-auto px-6">

        {/* Heading */}
        <div className="max-w-4xl mx-auto text-center mb-14">

          <span className="uppercase tracking-[0.3em] text-[#8AA05A] text-sm font-semibold">
            Explore Wayanad
          </span>

          <h2 className="mt-4 text-4xl md:text-5xl font-serif text-[#1f2937] dark:text-white">
            Top Attractions Near Karapuzha Waterscapes
          </h2>

          <p className="mt-5 text-gray-600 dark:text-gray-300 leading-8 max-w-3xl mx-auto">
            Explore waterfalls, caves, wildlife sanctuaries, viewpoints and cultural destinations within minutes from your stay.
          </p>

        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

          {attractions.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.03 }}
              className="
                group relative overflow-hidden
                rounded-[26px]
                h-[320px]
                shadow-lg
                hover:shadow-2xl
                transition-all duration-500
              "
            >

              {/* IMAGE */}
              <div
                className="
                  absolute inset-0
                  bg-cover bg-center
                  scale-100 group-hover:scale-110
                  transition-transform duration-700
                "
                style={{ backgroundImage: `url(${item.image})` }}
              />

              {/* DARK OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

              {/* CONTENT */}
              <div className="absolute bottom-0 p-6 w-full text-white">

                {/* Glass badge */}
                <div className="inline-flex items-center mb-3 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs tracking-widest uppercase">
                  {item.distance}
                </div>

                <h3 className="text-xl md:text-2xl font-serif mb-2">
                  {item.title}
                </h3>

                <div className="h-[2px] w-12 bg-[#8AA05A] mb-3 group-hover:w-20 transition-all duration-500" />

                <p className="text-sm text-white/70">
                  Nearby Attraction
                </p>

              </div>

            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
}