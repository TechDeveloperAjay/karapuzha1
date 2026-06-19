import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Karapuzha Water Scapes",
  description: "Get in touch to book your luxury stay at Karapuzha Water Scapes. Find our location, contact details, and booking information.",
};

export default function ContactPage() {
  return (
    <>
      <section className="bg-zinc-900 text-white py-24 sm:py-32 relative flex flex-col items-center justify-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-medium tracking-wide mb-6">
            Contact & Bookings
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-[#F5F5DC] font-light">
            We are here to help you plan the perfect getaway. Reach out to our team for reservations and inquiries.
          </p>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-800/50 to-zinc-900 z-0"></div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Contact Details */}
            <div>
              <span className="text-sm font-semibold tracking-widest uppercase text-[#D4AF37] mb-4 block">
                Get In Touch
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-medium text-zinc-900 mb-8">
                We'd Love to Hear From You
              </h2>
              
              <div className="space-y-8 mb-12">
                <div className="flex items-start gap-4">
                  <div className="text-2xl mt-1">📍</div>
                  <div>
                    <h4 className="font-semibold text-zinc-900 tracking-wider uppercase text-sm mb-1">Resort Address</h4>
                    <p className="text-zinc-600 font-light">Karapuzha Reservoir Road<br/>Wayanad, Kerala, India - 673591</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="text-2xl mt-1">📞</div>
                  <div>
                    <h4 className="font-semibold text-zinc-900 tracking-wider uppercase text-sm mb-1">Phone Number</h4>
                    <a href="tel:+919876543210" className="text-zinc-600 font-light hover:text-[#D4AF37] transition-colors">+91 98765 43210</a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="text-2xl mt-1">✉️</div>
                  <div>
                    <h4 className="font-semibold text-zinc-900 tracking-wider uppercase text-sm mb-1">Email Address</h4>
                    <a href="mailto:info@karapuzhawaterscapes.com" className="text-zinc-600 font-light hover:text-[#D4AF37] transition-colors">info@karapuzhawaterscapes.com</a>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-zinc-50 p-8 sm:p-10 rounded border border-zinc-100 shadow-sm">
              <h3 className="text-2xl font-serif font-medium text-zinc-900 mb-6">Send us a Message</h3>
              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-zinc-700 mb-2">First Name</label>
                    <input type="text" id="firstName" className="w-full px-4 py-3 bg-white border border-zinc-200 rounded focus:outline-none focus:ring-1 focus:ring-[#D4AF37] focus:border-[#D4AF37] transition-colors" />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-zinc-700 mb-2">Last Name</label>
                    <input type="text" id="lastName" className="w-full px-4 py-3 bg-white border border-zinc-200 rounded focus:outline-none focus:ring-1 focus:ring-[#D4AF37] focus:border-[#D4AF37] transition-colors" />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-zinc-700 mb-2">Email Address</label>
                  <input type="email" id="email" className="w-full px-4 py-3 bg-white border border-zinc-200 rounded focus:outline-none focus:ring-1 focus:ring-[#D4AF37] focus:border-[#D4AF37] transition-colors" />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-zinc-700 mb-2">Message</label>
                  <textarea id="message" rows={5} className="w-full px-4 py-3 bg-white border border-zinc-200 rounded focus:outline-none focus:ring-1 focus:ring-[#D4AF37] focus:border-[#D4AF37] transition-colors"></textarea>
                </div>
                <button type="button" className="w-full px-8 py-4 border border-[#D4AF37] bg-[#D4AF37] text-zinc-900 font-medium tracking-widest uppercase text-sm transition-all hover:bg-zinc-900 hover:border-zinc-900 hover:text-white">
                  Submit Inquiry
                </button>
              </form>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
