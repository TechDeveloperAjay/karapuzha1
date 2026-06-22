"use client";

import Image from "next/image";

const experiences = [
  {
    title: "Dam View",
    subtitle: "Panoramic Karapuzha Scenery",
    description:
      "Enjoy breathtaking views of Karapuzha Dam, surrounded by lush greenery and endless waters.",
    image: "/assets/images/experiences/image_11.jpg",
    distance: "5 Mins Away",
    featured: true,
  },
  {
    title: "Flying Chair",
    subtitle: "Soar Above The Landscape",
    description:
      "Experience thrilling aerial rides while enjoying stunning views of the surroundings.",
    image: "/assets/images/experiences/image_3.jpg",
    distance: "5 Mins Away",
  },
  {
    title: "Zipline",
    subtitle: "Thrilling Reservoir Adventure",
    description:
      "Glide across the skies and take in spectacular reservoir views from above.",
    image: "/assets/images/experiences/image_8.jpg",
    distance: "7 Mins Away",
  },
  {
    title: "Space Tower",
    subtitle: "Adrenaline-Packed Free Fall",
    description:
      "A thrilling vertical ride designed for adventure lovers and thrill seekers.",
    image: "/assets/images/experiences/image_9.jpg",
    distance: "7 Mins Away",
  },
  {
    title: "Flying Cinema",
    subtitle: "Immersive Virtual Experience",
    description:
      "Enjoy an exciting cinematic adventure with motion effects and immersive visuals.",
    image: "/assets/images/experiences/image_13.jpg",
    distance: "10 Mins Away",
  },
  {
    title: "Trampoline Park",
    subtitle: "Family Fun & Endless Energy",
    description:
      "Bounce, jump and enjoy endless fun with family and friends in a safe environment.",
    image: "/assets/images/experiences/image_14.jpg",
    distance: "10 Mins Away",
  },
];

export default function ThingsToDo() {
  const featured = experiences.find((item) => item.featured);
  const others = experiences.filter((item) => !item.featured);

  return (
    <section className="py-24 bg-white dark:bg-[#0b0f14] transition-colors duration-300">
      <div className="container mx-auto px-6">

        {/* Heading */}
        <div className="max-w-4xl mx-auto text-center mb-20">

          <span className="uppercase tracking-[0.3em] text-[#8AA05A] text-sm font-semibold">
            Things To Do Near Us
          </span>

          <h2 className="mt-4 text-5xl md:text-6xl font-serif text-[#1f2937] dark:text-white">
            Explore Adventure Around Karapuzha
          </h2>

          <p className="mt-6 text-lg text-gray-600 dark:text-gray-300 leading-8 max-w-3xl mx-auto">
            From thrilling rides and adrenaline-filled adventures to scenic
            viewpoints and immersive entertainment, discover unforgettable
            experiences just minutes away from Karapuzha Waterscapes.
          </p>
        </div>

        {/* Featured Card */}
        {featured && (
          <div className="mb-10">
            <div className="group relative overflow-hidden rounded-[32px] h-[550px] shadow-[0_20px_60px_rgba(0,0,0,0.12)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.5)]">

              <Image
                src={featured.image}
                alt={featured.title}
                fill
                priority
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              <div className="absolute top-8 left-8">
                <span className="px-5 py-2 rounded-full bg-white/90 dark:bg-black/60 backdrop-blur-sm text-[#8AA05A] font-semibold text-sm shadow-lg">
                  {featured.distance}
                </span>
              </div>

              <div className="absolute bottom-10 left-10 max-w-2xl text-white">
                <p className="uppercase tracking-[0.2em] text-sm text-white/80 mb-2">
                  {featured.subtitle}
                </p>

                <h3 className="text-5xl font-serif mb-4">
                  {featured.title}
                </h3>

                <p className="text-lg text-white/90 leading-8">
                  {featured.description}
                </p>
              </div>

            </div>
          </div>
        )}

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {others.map((item, index) => (
            <div
              key={index}
              className="
                group overflow-hidden rounded-[30px]
                bg-white dark:bg-[#111827]
                shadow-[0_10px_40px_rgba(0,0,0,0.08)]
                dark:shadow-[0_10px_40px_rgba(0,0,0,0.5)]
                hover:shadow-[0_20px_60px_rgba(0,0,0,0.12)]
                dark:hover:shadow-[0_20px_60px_rgba(0,0,0,0.6)]
                transition-all duration-500
              "
            >
              <div className="relative h-[320px] overflow-hidden">

                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                <div className="absolute top-4 left-4">
                  <span className="px-4 py-2 rounded-full bg-white/90 dark:bg-black/60 backdrop-blur-sm text-[#8AA05A] text-xs font-semibold shadow-md">
                    {item.distance}
                  </span>
                </div>

              </div>

              <div className="p-8">

                <p className="uppercase tracking-[0.2em] text-[#8AA05A] text-xs font-semibold mb-3">
                  {item.subtitle}
                </p>

                <h3 className="text-3xl font-serif text-[#1f2937] dark:text-white mb-4">
                  {item.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-300 leading-7">
                  {item.description}
                </p>

              </div>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}