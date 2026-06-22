import Image from "next/image";

export default function About() {
  return (
    <section
      id="about"
      className="py-24 bg-white dark:bg-[#0b0f14] text-zinc-900 dark:text-white overflow-hidden transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* TEXT CONTENT */}
          <div className="order-2 lg:order-1 relative z-10">

            <span className="text-sm font-semibold tracking-widest uppercase text-[#D4AF37] mb-4 block">
              Our Story
            </span>

            <h2 className="text-4xl sm:text-5xl font-serif font-medium leading-tight mb-8 text-zinc-900 dark:text-white">
              Where the Dam Meets <br className="hidden sm:block" />
              <span className="italic text-zinc-600 dark:text-zinc-300 font-light">
                Untouched Wilderness
              </span>
            </h2>

            <div className="space-y-6 text-lg text-zinc-600 dark:text-zinc-300 font-light leading-relaxed">
              <p>
                Nestled along the serene shores of the Karapuzha Reservoir, Karapuzha Water Scapes is Wayanad&apos;s most intimate luxury retreat. Our fully furnished 2-bedroom waterfront villas are thoughtfully designed to blend contemporary comfort with the raw beauty of the Western Ghats — ideal for families, couples, and remote workers seeking a rare sanctuary where nature and luxury coexist.
              </p>

              <p>
                Wake to the mist rolling over still water. Watch kingfishers dart past your private garden. Unwind in spaces crafted for peace, privacy, and genuine connection with the natural world.
              </p>
            </div>

            {/* STATS */}
            <div className="grid grid-cols-3 gap-4 sm:gap-6 mt-12 pt-12 border-t border-zinc-100 dark:border-white/10">

              <div>
                <div className="text-3xl sm:text-4xl font-serif text-zinc-900 dark:text-white mb-2">
                  2km
                </div>
                <div className="text-xs uppercase tracking-wider text-zinc-500 dark:text-zinc-400 font-medium">
                  From the Dam
                </div>
              </div>

              <div>
                <div className="text-3xl sm:text-4xl font-serif text-zinc-900 dark:text-white mb-2">
                  100%
                </div>
                <div className="text-xs uppercase tracking-wider text-zinc-500 dark:text-zinc-400 font-medium">
                  Private Villas
                </div>
              </div>

              <div>
                <div className="text-3xl sm:text-4xl font-serif text-zinc-900 dark:text-white mb-2">
                  4.9★
                </div>
                <div className="text-xs uppercase tracking-wider text-zinc-500 dark:text-zinc-400 font-medium">
                  Guest Rating
                </div>
              </div>

            </div>
          </div>

          {/* IMAGE COLLAGE */}
          <div className="order-1 lg:order-2 relative h-[500px] sm:h-[600px] w-full">

            <div className="absolute top-0 right-0 w-[85%] h-[75%] z-10">
              <Image
                src="/assets/images/lakeside_villa.png"
                alt="Karapuzha Water Scapes Main View"
                fill
                className="object-cover shadow-2xl rounded-xl"
                sizes="(max-width: 1024px) 85vw, 50vw"
              />
            </div>

            {/* Overlapping smaller image */}
            <div className="
              absolute bottom-0 left-0 w-[55%] h-[55%] z-20
              border-8 border-white dark:border-[#0b0f14]
              bg-white dark:bg-[#0b0f14]
              shadow-xl
              transform -translate-y-4 translate-x-4
            ">
              <div className="relative w-full h-full">
                <Image
                  src="/assets/images/forest_retreat.png"
                  alt="Nature environment in Wayanad"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 55vw, 30vw"
                />
              </div>
            </div>

            {/* Decorative Gold Accent Box */}
            <div className="absolute top-[-20px] right-[-20px] w-32 h-32 border border-[#D4AF37] z-0 hidden lg:block"></div>

          </div>

        </div>
      </div>
    </section>
  );
}