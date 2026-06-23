import Image from "next/image";
import Link from "next/link";

const rooms = [
  {
    id: "lakeside",
    name: "Lakeside Villa",
    desc: "A beautifully appointed 2-bedroom villa opening directly to views of the Karapuzha Reservoir. Wake to still water and morning mist.",
    image: "/assets/images/room1.png",
    features: ["2 Bedrooms", "Lake View", "Kitchenette", "Garden"],
    occupancy: "Up to 4 guests",
    badge: "Waterfront",
  },
  {
    id: "forest",
    name: "Forest Retreat Villa",
    desc: "Surrounded by lush greenery and natural sounds, this villa offers an immersive forest experience with all modern comforts included.",
    image: "/assets/images/karapuzhaa.png",
    features: ["2 Bedrooms", "Forest View", "Power Backup", "Furnished"],
    occupancy: "Up to 4 guests",
    badge: "Forest View",
  },
  {
    id: "panorama",
    name: "Panorama Villa",
    desc: "Our most spacious offering with panoramic 270° views of the reservoir and hills. Perfect for romantic getaways and special occasions.",
    image: "/assets/images/img1.png",
    features: ["2 Bedrooms", "Panoramic View", "Private Deck", "Wi-Fi"],
    occupancy: "Up to 4 guests",
    badge: "Premium",
  },
];

export default function Rooms() {
  return (
    <section
      id="rooms"
      className="py-24 bg-zinc-50 dark:bg-[#0b0f14] transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-16">

          <span className="text-sm font-semibold tracking-widest uppercase text-[#D4AF37] mb-4 block">
            Accommodation
          </span>

          <h2 className="text-4xl sm:text-5xl font-serif font-medium text-zinc-900 dark:text-white mb-6">
            Waterfront Villas
          </h2>

          <p className="text-lg text-zinc-600 dark:text-zinc-300 font-light">
            Spacious 2-bedroom villas designed for families, couples, and groups who value space, privacy, and stunning water views.
          </p>

        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {rooms.map((room) => (
            <div
              key={room.id}
              className="
                bg-white dark:bg-[#111827]
                rounded-lg overflow-hidden
                shadow-md dark:shadow-[0_10px_40px_rgba(0,0,0,0.5)]
                hover:shadow-xl dark:hover:shadow-[0_20px_60px_rgba(0,0,0,0.6)]
                transition-all duration-300 group
              "
            >

              {/* IMAGE */}
              <div className="relative h-64 w-full overflow-hidden">

                <Image
                  src={room.image}
                  alt={room.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />

                <div className="absolute top-4 left-4 bg-zinc-900/80 dark:bg-black/60 backdrop-blur-sm text-white text-xs tracking-widest uppercase px-3 py-1 rounded">
                  {room.badge}
                </div>

              </div>

              {/* CONTENT */}
              <div className="p-8">

                <h3 className="text-2xl font-serif font-medium text-zinc-900 dark:text-white mb-3">
                  {room.name}
                </h3>

                <p className="text-zinc-600 dark:text-zinc-300 font-light text-sm leading-relaxed mb-6 h-20">
                  {room.desc}
                </p>

                {/* FEATURES */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {room.features.map((feat, i) => (
                    <span
                      key={i}
                      className="
                        text-xs font-medium
                        text-zinc-500 dark:text-zinc-300
                        bg-zinc-100 dark:bg-[#0b0f14]
                        px-2.5 py-1 rounded
                        border border-transparent dark:border-white/10
                      "
                    >
                      {feat}
                    </span>
                  ))}
                </div>

                {/* FOOTER */}
                <div className="flex items-center justify-between pt-4 border-t border-zinc-100 dark:border-white/10">

                  <span className="text-sm text-zinc-500 dark:text-zinc-400">
                    {room.occupancy}
                  </span>

                  <Link
                    href={`/rooms#${room.id}`}
                    className="
                      text-[#D4AF37]
                      hover:text-white dark:hover:text-white
                      font-medium tracking-wide text-sm
                      transition-colors flex items-center gap-1
                    "
                  >
                    View Details <span>&rarr;</span>
                  </Link>

                </div>

              </div>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}