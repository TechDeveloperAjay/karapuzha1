"use client";

import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-green-950 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand & Contact */}
          <div className="space-y-6">
            <div className="flex flex-col text-green-50 font-serif leading-tight">
              <span className="text-2xl font-semibold">Karapuzha</span>
              <span className="text-sm tracking-widest uppercase text-green-200">Water Scapes</span>
            </div>
            <p className="text-green-100/80 text-sm leading-relaxed">
              A premium luxury waterfront resort offering private, fully furnished 2-bedroom villas right on the scenic shores of the Karapuzha Reservoir in Wayanad, Kerala.
            </p>
            <div className="flex flex-col space-y-2 text-sm text-green-100">
              <a href="tel:+919876543210" className="hover:text-white transition-colors flex items-center gap-2">
                <span>📞</span> +91 98765 43210
              </a>
              <a href="mailto:info@karapuzhawaterscapes.com" className="hover:text-white transition-colors flex items-center gap-2">
                <span>✉️</span> info@karapuzhawaterscapes.com
              </a>
              <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-2">
                <span>📍</span> Karapuzha, Wayanad, Kerala
              </a>
            </div>
          </div>

          {/* Villas Links */}
          <div>
            <h4 className="text-lg font-serif font-medium mb-6 text-green-50 tracking-wide">Villas</h4>
            <ul className="space-y-3">
              <li><Link href="/rooms" className="text-green-100/80 hover:text-white text-sm transition-colors">Lakeside Villa</Link></li>
              <li><Link href="/rooms" className="text-green-100/80 hover:text-white text-sm transition-colors">Forest Retreat Villa</Link></li>
              <li><Link href="/rooms" className="text-green-100/80 hover:text-white text-sm transition-colors">Panorama Villa</Link></li>
              <li><Link href="/rooms#amenities" className="text-green-100/80 hover:text-white text-sm transition-colors">Resort Amenities</Link></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-serif font-medium mb-6 text-green-50 tracking-wide">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-green-100/80 hover:text-white text-sm transition-colors">Our Story</Link></li>
              <li><Link href="/#experiences" className="text-green-100/80 hover:text-white text-sm transition-colors">Experiences</Link></li>
              <li><Link href="/gallery" className="text-green-100/80 hover:text-white text-sm transition-colors">Gallery</Link></li>
              <li><Link href="/contact" className="text-green-100/80 hover:text-white text-sm transition-colors">Contact & Bookings</Link></li>
            </ul>
          </div>

          {/* Newsletter & Socials */}
          <div>
            <h4 className="text-lg font-serif font-medium mb-6 text-green-50 tracking-wide">Newsletter</h4>
            <p className="text-green-100/80 text-sm leading-relaxed mb-4">
              Subscribe to our newsletter to receive seasonal offers and updates.
            </p>
            <form className="flex flex-col space-y-3" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Your Email Address" 
                className="bg-green-900 border border-green-800 text-white placeholder-green-300/50 px-4 py-2.5 rounded text-sm focus:outline-none focus:ring-1 focus:ring-green-400 w-full"
                required
              />
              <button 
                type="submit" 
                className="bg-white text-green-950 font-medium px-4 py-2.5 rounded text-sm hover:bg-green-50 transition-colors w-full"
              >
                Subscribe
              </button>
            </form>
            
            {/* Social Links placeholder */}
            <div className="flex space-x-4 mt-6">
              <a href="#" className="w-8 h-8 rounded-full bg-green-900 flex items-center justify-center text-sm hover:bg-green-800 transition-colors">f</a>
              <a href="#" className="w-8 h-8 rounded-full bg-green-900 flex items-center justify-center text-sm hover:bg-green-800 transition-colors">📸</a>
              <a href="#" className="w-8 h-8 rounded-full bg-green-900 flex items-center justify-center text-sm hover:bg-green-800 transition-colors">🐦</a>
            </div>
          </div>

        </div>

        {/* Footer Bottom */}
        <div className="pt-8 border-t border-green-900 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-green-100/60 text-xs">
            &copy; {currentYear} Karapuzha Water Scapes. All Rights Reserved.
          </div>
          <div className="text-green-100/60 text-xs font-serif italic">
            Designed for ultimate relaxation.
          </div>
        </div>
      </div>
    </footer>
  );
}
