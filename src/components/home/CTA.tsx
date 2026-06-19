import Link from "next/link";

export default function CTA() {
  return (
    <section id="cta" className="relative py-32 bg-zinc-900 flex items-center justify-center overflow-hidden">
      {/* Background with overlay */}
      <div 
        className="absolute inset-0 z-0 bg-[url('https://images.unsplash.com/photo-1540541338287-41700207dee6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center bg-no-repeat bg-fixed opacity-30"
      ></div>
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/80 to-zinc-900/40 z-0"></div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <span className="text-sm font-semibold tracking-widest uppercase text-[#D4AF37] mb-6 block drop-shadow">
          Book Your Stay
        </span>
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-medium mb-8 drop-shadow-md">
          Ready to Experience <br className="hidden sm:block" />
          <span className="italic font-light">Wayanad's Best?</span>
        </h2>
        <p className="text-lg sm:text-xl text-[#F5F5DC] font-light mb-12 max-w-2xl mx-auto drop-shadow">
          Reserve your waterfront villa directly today to get the guaranteed best rates and special direct booking perks.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/contact"
            className="w-full sm:w-auto px-8 py-4 border border-[#D4AF37] bg-[#D4AF37] text-zinc-900 font-medium tracking-widest uppercase text-sm transition-all hover:bg-white hover:border-white hover:text-zinc-900 shadow-lg"
          >
            Check Availability
          </Link>
          <a
            href="https://wa.me/919876543210"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-4 border border-white bg-transparent text-white font-medium tracking-widest uppercase text-sm transition-all hover:bg-white hover:text-zinc-900"
          >
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
