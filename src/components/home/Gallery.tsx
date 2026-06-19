import Image from "next/image";
import Link from "next/link";

const galleryImages = [
  "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1540541338287-41700207dee6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
];

export default function Gallery() {
  return (
    <section id="gallery" className="py-24 bg-zinc-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="max-w-2xl">
            <span className="text-sm font-semibold tracking-widest uppercase text-[#D4AF37] mb-4 block">
              Gallery
            </span>
            <h2 className="text-4xl sm:text-5xl font-serif font-medium mb-4">
              Snapshots of Serenity
            </h2>
            <p className="text-lg text-[#F5F5DC] font-light">
              Catch a glimpse of the luxury, nature, and peaceful moments waiting for you at our resort.
            </p>
          </div>
          <Link 
            href="/gallery" 
            className="hidden md:inline-block mt-6 md:mt-0 px-6 py-2 border border-white text-white font-medium tracking-widest uppercase text-sm hover:bg-white hover:text-zinc-900 transition-colors"
          >
            View Full Gallery
          </Link>
        </div>

        {/* Mini Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {galleryImages.map((src, idx) => (
            <div key={idx} className="relative h-72 sm:h-80 w-full overflow-hidden group cursor-pointer">
              <Image 
                src={src}
                alt={`Gallery snapshot ${idx + 1}`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-zinc-900/0 group-hover:bg-zinc-900/40 transition-colors duration-300 flex items-center justify-center">
                <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform scale-50 group-hover:scale-100 text-3xl">
                  +
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile View All button */}
        <div className="mt-10 text-center md:hidden">
          <Link 
            href="/gallery" 
            className="inline-block px-8 py-3.5 border border-[#D4AF37] bg-[#D4AF37] text-zinc-900 font-medium tracking-widest uppercase text-sm w-full"
          >
            View Full Gallery
          </Link>
        </div>

      </div>
    </section>
  );
}
